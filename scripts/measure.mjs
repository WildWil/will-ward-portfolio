import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const r = await page.$('#reviews'); if (r) await r.scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const data = await page.$eval('.tcol-track', el => {
  const cards = el.querySelectorAll('.tcard');
  const n = cards.length;            // total = 2 copies
  const half = n / 2;
  const trackH = el.scrollHeight;
  const firstTop = cards[0].getBoundingClientRect().top;
  const copy2Top = cards[half].getBoundingClientRect().top;
  const copyDist = copy2Top - firstTop;   // distance from copy1-start to copy2-start
  return { totalCards: n, trackH, copyDist, halfTrack: trackH/2, diff: (copyDist - trackH/2).toFixed(2) };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
