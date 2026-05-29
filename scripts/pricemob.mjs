import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/#services', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const s = await page.$('#services'); if (s) await s.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/price-mob-1.png' });
// swipe: scroll the carousel right
await page.$eval('.pricing-grid', el => el.scrollLeft = el.scrollWidth * 0.4);
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/price-mob-2.png' });
// confirm it's actually scrollable horizontally
const info = await page.$eval('.pricing-grid', el => ({ scrollW: el.scrollWidth, clientW: el.clientWidth, scrollable: el.scrollWidth > el.clientWidth }));
console.log(JSON.stringify(info));
await browser.close();
