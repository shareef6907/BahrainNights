/**
 * THE BROWSER, RESOLVED THE SAME WAY EVERYWHERE.
 *
 * On a CI runner the browser is the one `npx playwright install` put
 * there, and Playwright finds it by itself.
 *
 * A HARDCODED path to a local macOS build is what made the first CI run
 * of the expiry guard fail with a launch error - and the hero gate
 * "passed" only because it SKIPPED, which hid the same bug.
 *
 * So the path is used only when it actually exists, and Playwright's own
 * resolution is used otherwise.
 */
import { existsSync } from 'fs';

export function resolveBrowserPath(): string | undefined {
  const candidates = [
    `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`,
  ];
  for (const c of candidates) {
    try {
      if (existsSync(c)) return c;
    } catch {
      /* ignore */
    }
  }
  // undefined lets Playwright resolve the browser itself, which is what
  // a CI runner needs.
  return undefined;
}
