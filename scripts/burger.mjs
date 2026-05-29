import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
// closed hamburger
let btn = await page.$('#hamburger');
let box = await btn.boundingBox();
await page.screenshot({ path: '/tmp/burger-closed.png', clip: { x: box.x-6, y: box.y-6, width: box.width+12, height: box.height+12 } });
// open -> X
await btn.click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/burger-x.png', clip: { x: box.x-6, y: box.y-6, width: box.width+12, height: box.height+12 } });
await browser.close();
console.log('done');
