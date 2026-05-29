import { chromium } from 'playwright';

const browser = await chromium.launch();

async function shoot(mode) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  if (mode === 'dark') {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
  }
  await page.waitForTimeout(2600); // let typewriter finish
  await page.screenshot({ path: `/tmp/m-${mode}-hero.png` });
  // pricing
  const s = await page.$('#services');
  if (s) { await s.scrollIntoViewIfNeeded(); await page.mouse.wheel(0, 300); await page.waitForTimeout(700); }
  await page.screenshot({ path: `/tmp/m-${mode}-pricing.png` });
  // reviews
  const r = await page.$('#reviews');
  if (r) { await r.scrollIntoViewIfNeeded(); await page.waitForTimeout(700); }
  await page.screenshot({ path: `/tmp/m-${mode}-reviews.png` });
  await page.close();
}

await shoot('light');
await shoot('dark');
await browser.close();
console.log('done');
