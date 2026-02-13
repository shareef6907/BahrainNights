declare module 'puppeteer-extra' {
  import puppeteer from 'puppeteer';
  const puppeteerExtra: typeof puppeteer & {
    use: (plugin: unknown) => void;
  };
  export default puppeteerExtra;
}

declare module 'puppeteer-extra-plugin-stealth' {
  const StealthPlugin: () => unknown;
  export default StealthPlugin;
}
