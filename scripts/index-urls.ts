import { requestIndexing } from '../src/lib/google-indexing';

async function main() {
  const urls = [
    'https://bahrainnights.com/guides/juffair-bahrain',
    'https://bahrainnights.com/guides/seef-bahrain',
    'https://bahrainnights.com/guides/adliya-bahrain',
    'https://bahrainnights.com/cinema',
    'https://bahrainnights.com/movies'
  ];

  console.log('Submitting URLs to Google Indexing API...');
  const results = await Promise.all(urls.map(url => requestIndexing(url)));

  results.forEach(r => {
    console.log(r.success ? '✓' : '✗', r.url, r.error || '');
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\nSubmitted: ${successCount}/${results.length} URLs`);
}

main().catch(console.error);