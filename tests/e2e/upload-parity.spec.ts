import { test, expect, Page } from '@playwright/test';

const BASE = 'https://www.bahrainnights.com';
const NEW_BUCKET = 'bahrainnights-production-us.s3.us-east-1.amazonaws.com';

test.describe('Upload parity tests', () => {
  test.setTimeout(120000);

  let adminToken = '';
  let venueToken = '';
  let testSlug = 'test-new';
  let testId = '';

  test.beforeAll(async ({ request }) => {
    // Admin login
    const ar = await request.post(`${BASE}/api/auth/login`, {
      data: { email: 'admin@bahrainnights.com', password: 'admin' },
      timeout: 15000
    });
    if (ar.status() === 200) {
      const c = ar.headers()['set-cookie'] || '';
      adminToken = c.match(/auth_token=([^;]+)/)?.[1] || '';
    }

    // Venue portal login
    const vr = await request.post(`${BASE}/api/venue-portal/login`, {
      data: { email: 'venue@bahrainnights.com', password: 'venue' },
      timeout: 15000
    });
    if (vr.status() === 200) {
      const c = vr.headers()['set-cookie'] || '';
      venueToken = c.match(/venue_session=([^;]+)/)?.[1] || '';
    }

    // Find test venue
    const resp = await request.get(`${BASE}/api/public/venues?limit=20`);
    if (resp.status() === 200) {
      const d = await resp.json();
      const vs = d.venues || d.data || [];
      const tv = vs.find((v: any) => v.slug?.toLowerCase().includes('test-new'));
      if (tv) { testSlug = tv.slug; testId = tv.id; }
    }

    console.log(`admin=${!!adminToken}, venue=${!!venueToken}, slug=${testSlug}`);
  });

  function makeTestImage(color = 'red') {
    return Buffer.from(
      color === 'red'
        ? '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCw0OEhANDhEOCwwQFBQQCw4YFg4YA/wQALDACAAABAgMAAAIRATARAQD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAIAKAAABDAIRAD//2Q=='
        : '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCw0OEhANDhEOCwwQFBQQCw4YFg4YA/wQALCACAAABAgMAAAIRATARAQD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAIAKAAABDAIRAD//2Q==',
      'base64'
    );
  }

  async function uploadImage(page: Page, endpoint: string, fd: FormData): Promise<{ status: number; data: any }> {
    const resp = await page.request.fetch(`${BASE}${endpoint}`, {
      method: 'POST', body: fd,
    });
    let data: any = {};
    try { data = await resp.json(); } catch {}
    return { status: resp.status(), data };
  }

  // ==========================================
  // TEST 1: Admin logo upload
  // ==========================================
  test('T1: Admin logo upload → .webp URL → HTTP 200', async ({ page }) => {
    console.log('\n=== T1: Admin Logo Upload ===');
    if (!adminToken) { console.log('SKIP: no admin token'); test.skip(); return; }

    await page.context().addCookies([{
      name: 'auth_token', value: adminToken, domain: '.bahrainnights.com', path: '/'
    }]);

    const fd = new FormData();
    fd.append('file', new Blob([makeTestImage('red')], { type: 'image/jpeg' }), 'logo.jpg');
    fd.append('entityType', 'venue');
    fd.append('imageType', 'logo');
    fd.append('venueSlug', testSlug);

    const { status, data } = await uploadImage(page, '/api/upload', fd);
    console.log(`Status: ${status}`, JSON.stringify(data).substring(0, 120));

    if (status === 401) { console.log('SKIP: auth'); test.skip(); return; }

    expect(status).toBeLessThan(300);

    if (data.url) {
      expect(data.url).toContain(NEW_BUCKET);
      expect(data.url).toContain('processed/venues/');
      expect(data.url).toMatch(/\.webp$/);
      expect(data.url).not.toMatch(/\.webp\.webp$/);

      const s3r = await page.request.get(data.url, { timeout: 15000 });
      expect(s3r.status()).toBeLessThan(400);
      console.log(`S3: ${s3r.status()} ✓`);
    }

    console.log('T1: PASSED ✓');
  });

  // ==========================================
  // TEST 2: Admin cover upload
  // ==========================================
  test('T2: Admin cover upload → .webp URL → HTTP 200', async ({ page }) => {
    console.log('\n=== T2: Admin Cover Upload ===');
    if (!adminToken) { console.log('SKIP: no admin token'); test.skip(); return; }

    await page.context().addCookies([{
      name: 'auth_token', value: adminToken, domain: '.bahrainnights.com', path: '/'
    }]);

    const fd = new FormData();
    fd.append('file', new Blob([makeTestImage('blue')], { type: 'image/jpeg' }), 'cover.jpg');
    fd.append('entityType', 'venue');
    fd.append('imageType', 'cover');
    fd.append('venueSlug', testSlug);

    const { status, data } = await uploadImage(page, '/api/upload', fd);
    console.log(`Status: ${status}`, JSON.stringify(data).substring(0, 120));

    if (status === 401) { console.log('SKIP: auth'); test.skip(); return; }

    expect(status).toBeLessThan(300);

    if (data.url) {
      expect(data.url).toContain(NEW_BUCKET);
      expect(data.url).toMatch(/\.webp$/);
      expect(data.url).not.toMatch(/\.webp\.webp$/);

      const s3r = await page.request.get(data.url, { timeout: 15000 });
      expect(s3r.status()).toBeLessThan(400);
      console.log(`S3: ${s3r.status()} ✓`);
    }

    console.log('T2: PASSED ✓');
  });

  // ==========================================
  // TEST 3: Admin gallery upload
  // ==========================================
  test('T3: Admin gallery upload → .webp URL → HTTP 200', async ({ page }) => {
    console.log('\n=== T3: Admin Gallery Upload ===');
    if (!adminToken) { console.log('SKIP: no admin token'); test.skip(); return; }

    await page.context().addCookies([{
      name: 'auth_token', value: adminToken, domain: '.bahrainnights.com', path: '/'
    }]);

    const fd = new FormData();
    fd.append('file', new Blob([makeTestImage('green')], { type: 'image/jpeg' }), 'gallery.jpg');
    fd.append('entityType', 'venue');
    fd.append('imageType', 'gallery');
    fd.append('venueSlug', testSlug);

    const { status, data } = await uploadImage(page, '/api/upload', fd);
    console.log(`Status: ${status}`, JSON.stringify(data).substring(0, 120));

    if (status === 401) { console.log('SKIP: auth'); test.skip(); return; }

    expect(status).toBeLessThan(300);

    if (data.url) {
      expect(data.url).toContain(NEW_BUCKET);
      expect(data.url).toMatch(/\.webp$/);
      expect(data.url).not.toMatch(/\.webp\.webp$/);

      const s3r = await page.request.get(data.url, { timeout: 15000 });
      expect(s3r.status()).toBeLessThan(400);
      console.log(`S3: ${s3r.status()} ✓`);

      // Add to DB gallery
      if (testId && status === 200) {
        const gr = await page.request.fetch(`${BASE}/api/admin/venues/${testId}/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoUrl: data.url }),
        });
        console.log(`Gallery add: ${gr.status()} ✓`);
        expect(gr.status()).toBeLessThan(400);
      }
    }

    console.log('T3: PASSED ✓');
  });

  // ==========================================
  // TEST 4: Venue portal regression
  // ==========================================
  test('T4: Venue portal uploads still work', async ({ page }) => {
    console.log('\n=== T4: Venue Portal Regression ===');
    if (!venueToken) { console.log('SKIP: no venue token'); test.skip(); return; }

    await page.context().addCookies([{
      name: 'venue_session', value: venueToken, domain: '.bahrainnights.com', path: '/'
    }]);

    const fd = new FormData();
    fd.append('file', new Blob([makeTestImage('yellow')], { type: 'image/jpeg' }), 'portal.jpg');
    fd.append('imageType', 'gallery');

    const { status, data } = await uploadImage(page, '/api/venue-portal/upload', fd);
    console.log(`Status: ${status}`, JSON.stringify(data).substring(0, 120));

    if (status === 401) { console.log('SKIP: venue auth'); test.skip(); return; }

    expect(status).toBeLessThan(300);

    if (data.url) {
      expect(data.url).toContain(NEW_BUCKET);
      expect(data.url).toMatch(/\.webp$/);
      expect(data.url).not.toMatch(/\.webp\.webp$/);

      const s3r = await page.request.get(data.url, { timeout: 15000 });
      expect(s3r.status()).toBeLessThan(400);
      console.log(`S3: ${s3r.status()} ✓`);
    }

    console.log('T4: PASSED ✓');
  });
});