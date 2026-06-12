import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto('http://127.0.0.1:8000/wheelchairs-sri-lanka.html', { waitUntil: 'networkidle' });

// Scroll to product range
const el = await page.$('#wheelchair-range');
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);

// Screenshot the product range
await el.screenshot({ path: '/tmp/wheelchairs-product-range.png' });

console.log('✓ Screenshot saved');
await browser.close();
