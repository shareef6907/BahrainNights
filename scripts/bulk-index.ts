#!/usr/bin/env npx tsx
/**
 * Bulk Google Indexing API Script
 * 
 * Reads URLs from sitemap.xml and submits them to Google Indexing API
 * Handles 200/day quota limit by tracking submitted URLs
 * 
 * Usage: npm run index-urls
 */

import * as fs from 'fs';
import * as path from 'path';
import { SignJWT, importPKCS8 } from 'jose';

const SITEMAP_URL = 'https://www.bahrainnights.com/sitemap.xml';
const INDEXING_API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/indexing';
const DAILY_LIMIT = 200;

// Paths
const KEY_FILE_PATH = path.join(process.cwd(), 'config', 'google-indexing-key.json');
const TRACKING_FILE_PATH = path.join(process.cwd(), 'config', 'indexing-tracker.json');

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  project_id: string;
}

interface TrackingData {
  submittedUrls: string[];
  lastRun: string;
  totalSubmitted: number;
}

interface IndexingResult {
  url: string;
  success: boolean;
  error?: string;
}

// Load service account key
function loadServiceAccountKey(): ServiceAccountKey {
  if (!fs.existsSync(KEY_FILE_PATH)) {
    throw new Error(`Service account key not found at ${KEY_FILE_PATH}`);
  }
  const keyData = fs.readFileSync(KEY_FILE_PATH, 'utf-8');
  return JSON.parse(keyData);
}

// Load or initialize tracking data
function loadTrackingData(): TrackingData {
  if (fs.existsSync(TRACKING_FILE_PATH)) {
    const data = fs.readFileSync(TRACKING_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }
  return {
    submittedUrls: [],
    lastRun: '',
    totalSubmitted: 0,
  };
}

// Save tracking data
function saveTrackingData(data: TrackingData): void {
  fs.writeFileSync(TRACKING_FILE_PATH, JSON.stringify(data, null, 2));
}

// Get access token using service account
async function getAccessToken(key: ServiceAccountKey): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const privateKey = await importPKCS8(key.private_key, 'RS256');
  
  const jwt = await new SignJWT({
    scope: SCOPE,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .setIssuer(key.client_email)
    .setSubject(key.client_email)
    .setAudience(TOKEN_ENDPOINT)
    .sign(privateKey);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await response.json();
  return tokenData.access_token;
}

// Fetch sitemap and extract URLs
async function fetchSitemapUrls(): Promise<string[]> {
  console.log('📄 Fetching sitemap from', SITEMAP_URL);
  
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status}`);
  }
  
  const xml = await response.text();
  const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(match => 
    match.replace('<loc>', '').replace('</loc>', '').trim()
  );
  
  console.log(`✅ Found ${urls.length} URLs in sitemap`);
  return urls;
}

// Submit a single URL to Google Indexing API
async function submitUrl(url: string, accessToken: string, verbose = false): Promise<IndexingResult> {
  try {
    const response = await fetch(INDEXING_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });

    if (!response.ok) {
      const error = await response.text();
      if (verbose) {
        console.log(`\n  ❌ Error for ${url}: ${error.substring(0, 200)}`);
      }
      return { url, success: false, error };
    }

    return { url, success: true };
  } catch (error) {
    return { 
      url, 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Ping search engines with sitemap
async function pingSitemaps(): Promise<void> {
  console.log('\n📡 Pinging search engines with sitemap...');
  
  const sitemapUrl = encodeURIComponent(SITEMAP_URL);
  
  // Ping Google
  try {
    const googleResponse = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);
    console.log(`  Google: ${googleResponse.ok ? '✅ Success' : '❌ Failed'}`);
  } catch (error) {
    console.log('  Google: ❌ Error');
  }
  
  // Ping Bing
  try {
    const bingResponse = await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`);
    console.log(`  Bing: ${bingResponse.ok ? '✅ Success' : '❌ Failed'}`);
  } catch (error) {
    console.log('  Bing: ❌ Error');
  }
}

// Main function
async function main(): Promise<void> {
  console.log('🚀 Google Indexing API - Bulk URL Submission\n');
  console.log('='.repeat(50));
  
  try {
    // Load service account key
    console.log('\n🔑 Loading service account key...');
    const key = loadServiceAccountKey();
    console.log(`  Project: ${key.project_id}`);
    console.log(`  Service Account: ${key.client_email}`);
    
    // Get access token
    console.log('\n🔐 Getting access token...');
    const accessToken = await getAccessToken(key);
    console.log('  ✅ Token obtained');
    
    // Load tracking data
    const tracking = loadTrackingData();
    console.log(`\n📊 Tracking Data:`);
    console.log(`  Previously submitted: ${tracking.submittedUrls.length} URLs`);
    console.log(`  Last run: ${tracking.lastRun || 'Never'}`);
    
    // Fetch sitemap URLs
    const allUrls = await fetchSitemapUrls();
    
    // Filter out already submitted URLs
    const submittedSet = new Set(tracking.submittedUrls);
    const pendingUrls = allUrls.filter(url => !submittedSet.has(url));
    
    console.log(`\n📋 URL Status:`);
    console.log(`  Total in sitemap: ${allUrls.length}`);
    console.log(`  Already submitted: ${submittedSet.size}`);
    console.log(`  Pending: ${pendingUrls.length}`);
    
    if (pendingUrls.length === 0) {
      console.log('\n✅ All URLs have already been submitted!');
      await pingSitemaps();
      return;
    }
    
    // Submit up to DAILY_LIMIT URLs
    const urlsToSubmit = pendingUrls.slice(0, DAILY_LIMIT);
    console.log(`\n📤 Submitting ${urlsToSubmit.length} URLs (daily limit: ${DAILY_LIMIT})...\n`);
    
    let successCount = 0;
    let failCount = 0;
    const errors: { url: string; error: string }[] = [];
    
    for (let i = 0; i < urlsToSubmit.length; i++) {
      const url = urlsToSubmit[i];
      // Show verbose errors for first 3 failures
      const result = await submitUrl(url, accessToken, failCount < 3);
      
      if (result.success) {
        successCount++;
        tracking.submittedUrls.push(url);
        process.stdout.write(`\r  Progress: ${i + 1}/${urlsToSubmit.length} (✅ ${successCount} / ❌ ${failCount})`);
      } else {
        failCount++;
        errors.push({ url, error: result.error || 'Unknown error' });
        process.stdout.write(`\r  Progress: ${i + 1}/${urlsToSubmit.length} (✅ ${successCount} / ❌ ${failCount})`);
      }
      
      // Small delay to be nice to the API
      if (i < urlsToSubmit.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('\n');
    
    // Update tracking data
    tracking.lastRun = new Date().toISOString();
    tracking.totalSubmitted = tracking.submittedUrls.length;
    saveTrackingData(tracking);
    
    // Summary
    console.log('='.repeat(50));
    console.log('📊 SUMMARY');
    console.log('='.repeat(50));
    console.log(`  ✅ Successfully submitted: ${successCount}`);
    console.log(`  ❌ Failed: ${failCount}`);
    console.log(`  📈 Total submitted (all time): ${tracking.totalSubmitted}`);
    console.log(`  ⏳ Remaining: ${pendingUrls.length - urlsToSubmit.length}`);
    
    if (errors.length > 0) {
      console.log(`\n❌ Errors (first 5):`);
      errors.slice(0, 5).forEach(e => {
        console.log(`  - ${e.url}`);
        console.log(`    Error: ${e.error.substring(0, 100)}`);
      });
    }
    
    // Ping search engines
    await pingSitemaps();
    
    console.log('\n✅ Done!\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run
main();
