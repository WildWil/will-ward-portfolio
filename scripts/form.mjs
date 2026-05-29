import { chromium } from 'playwright';
const browser = await chromium.launch();

// --- SUCCESS path (mock endpoint returns success) ---
let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route('https://api.web3forms.com/submit', route =>
  route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'ok' }) }));
await page.goto('http://localhost:4321/#contact', { waitUntil: 'networkidle' });
await page.fill('#name', 'Test Person');
await page.fill('#email', 'test@example.com');
await page.fill('#message', 'I need a website for my bakery.');
await page.click('.form-submit');
await page.waitForTimeout(600);
const successVisible = await page.isVisible('#form-success');
const formHidden = await page.getAttribute('#contact-form', 'hidden');
const sc = await page.$('#contact'); if (sc) await sc.scrollIntoViewIfNeeded();
await page.screenshot({ path: '/tmp/form-success.png' });
console.log('SUCCESS state -> panel visible:', successVisible, '| form hidden:', formHidden !== null);
await page.close();

// --- ERROR path (mock endpoint returns failure) ---
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route('https://api.web3forms.com/submit', route =>
  route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'bad' }) }));
await page.goto('http://localhost:4321/#contact', { waitUntil: 'networkidle' });
await page.fill('#name', 'Test'); await page.fill('#email', 't@e.com'); await page.fill('#message', 'hi');
await page.click('.form-submit');
await page.waitForTimeout(600);
const errText = await page.textContent('#form-status');
const btnDisabled = await page.getAttribute('.form-submit', 'disabled');
console.log('ERROR state -> message:', JSON.stringify(errText?.trim()), '| button re-enabled:', btnDisabled === null);
await page.close();

await browser.close();
