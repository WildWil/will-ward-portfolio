import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
const result = await page.evaluate(async () => {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: '7a1f935d-9a7b-4395-9e28-acedf891e6df', name: 'probe', email: 'p@p.com', message: 'probe', subject: 'probe' }),
    });
    return { ok: res.ok, status: res.status, body: await res.text() };
  } catch (e) { return { error: String(e) }; }
});
console.log(JSON.stringify(result));
await browser.close();
