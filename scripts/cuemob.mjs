import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// Is the cue below the image (no overlap)? Compare bounding boxes.
const box = await page.evaluate(() => {
  const img = document.querySelector('.browser-frame');
  const cue = document.querySelector('.scroll-cue');
  const ib = img.getBoundingClientRect(), cb = cue.getBoundingClientRect();
  return { imgBottom: Math.round(ib.bottom), cueTop: Math.round(cb.top), cueVisible: cb.width > 0, overlap: cb.top < ib.bottom };
});
console.log(JSON.stringify(box));
// full hero screenshot
await page.screenshot({ path: '/tmp/cue-mobile.png', clip: { x:0, y:0, width:390, height: Math.min(1300, (await page.evaluate(()=>document.querySelector('.scroll-cue').getBoundingClientRect().bottom+30))) } });
await browser.close();
