import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const r = await page.$('#reviews'); if (r) await r.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/rev-css.png' });
// check animation is applied + compositor-friendly
const info = await page.$eval('.tcol-track', el => {
  const s = getComputedStyle(el);
  return { name: s.animationName, dur: s.animationDuration, timing: s.animationTimingFunction };
});
console.log(JSON.stringify(info));
await browser.close();
