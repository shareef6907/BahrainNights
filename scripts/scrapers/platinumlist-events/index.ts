import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

import { scrapeEvents } from './scraper';

// Run the scraper
scrapeEvents()
  .then(() => {
    console.log('\nEvents scraper finished successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nEvents scraper failed:', error);
    process.exit(1);
  });
