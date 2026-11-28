/**
 * THE BROWSER, RESOLVED THE SAME WAY EVERYWHERE.
 *
 * On a CI runner the browser is the one `npx playwright install` put
 * there, and Playwright finds it by itself. The local CLI is the same
 * version as the code's `playwright-core` (the repo now pins ONE version
 * of Playwright, so there is one browser build, not two).
 *
 * A HARDCODED path to a local macOS build is what made the first CI runs
 * of the expiry guard fail with a launch error - and the hero gate
 * "passed" only because it SKIPPED, which hid the same bug.
 *
 * So the path is used only when it actually exists, and Playwright's own
 * resolution is used otherwise, which is what a CI runner needs.
 */
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

function macLocalBuild(): string | undefined {
  const cache = join(process.env.HOME || '', 'Library/Caches/ms-playwright');
  try {
    // Any chromium-* or chromium_headless_shell-* the local CLI installed.
    const dirs = readdirSync(cache).filter(
      (d) => d.startsWith('chromium') && !d.startsWith('chromium_headless')
    );
    // The highest build number, which is the one the current CLI wants.
    dirs.sort((a, b) => {
      const na = Number(a.replace(/\D+/g, '')) || 0;
      const nb = Number(b.replace(/\D+/g, '')) || 0;
      return nb - na;
    });
    for (const d of dirs) {
      const p = join(
        cache,
        d,
        'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
      );
      if (existsSync(p)) return p;
    }
  } catch {
    /* not macOS, or the cache is not there - let Playwright decide */
  }
  return undefined;
}

export function resolveBrowserPath(): string | undefined {
  return macLocalBuild();
}
