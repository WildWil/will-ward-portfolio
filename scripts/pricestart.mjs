import { chromium } from 'playwright';
const browser = await chromium.launch();
// Mobile: should start on featured (Standard, index 1)
let page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/#services', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const s = await page.$('#services'); if (s) await s.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const active = await page.$$eval('.pricing-dot', ds => ds.findIndex(d => d.hasAttribute('data-active')));
console.log('MOBILE initial active dot (expect 1):', active);
await page.screenshot({ path: '/tmp/price-start.png' });
await page.close();
// Desktop: should NOT scroll/jump; page top stays at 0 on load (no forced scroll)
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const scrollY = await page.evaluate(() => window.scrollY);
console.log('DESKTOP window.scrollY on load (expect 0):', scrollY);
await browser.close();
