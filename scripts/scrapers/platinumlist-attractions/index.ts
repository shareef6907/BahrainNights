import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

import { scrapeAttractions } from './scraper';

// Run the scraper
scrapeAttractions()
  .then(() => {
    console.log('\nAttractions scraper finished successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nAttractions scraper failed:', error);
    process.exit(1);
  });
