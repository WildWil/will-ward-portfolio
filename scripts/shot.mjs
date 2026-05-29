import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4321/';
const out = process.argv[3] || '/tmp/pw';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

// Full page
await page.screenshot({ path: `${out}-full.png`, fullPage: true });

// Scroll through pricing so ContainerScroll animates to its settled state
const services = await page.$('#services');
if (services) {
  await services.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}-pricing.png` });
}

// Reviews
const reviews = await page.$('#reviews');
if (reviews) {
  await reviews.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}-reviews.png` });
}

await browser.close();
console.log('done');
