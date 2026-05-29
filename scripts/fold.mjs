import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w,h,tag] of [[1440,820,'desktop'],[390,844,'mobile']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/fold-${tag}.png` }); // viewport only (the fold)
  await page.close();
}
await browser.close();
console.log('done');
