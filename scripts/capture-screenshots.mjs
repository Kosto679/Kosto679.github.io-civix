import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const billId = process.argv[2] ?? 'bb9e30c4-34b1-492b-b05f-9e9a6b244daa';
const outDir = path.join(__dirname, '..', 'assets', 'screenshots');
const billUrl = `http://127.0.0.1:8081/law/${billId}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

async function dismissBetaModal(p) {
  for (const label of ['Αποδοχή και να μην εμφανιστεί ξανά', 'Αποδοχή και συνέχεια']) {
    const btn = p.getByText(label, { exact: true });
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await p.waitForTimeout(700);
      return;
    }
  }
}

async function scrollApp(p, top) {
  await p.evaluate((scrollTop) => {
    document.querySelectorAll('div').forEach((el) => {
      const style = getComputedStyle(el);
      if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 200) {
        el.scrollTop = scrollTop;
      }
    });
  }, top);
}

await page.goto('http://127.0.0.1:8081/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.screenshot({ path: path.join(outDir, 'home.png') });

await page.goto(billUrl, { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);
await dismissBetaModal(page);
await page.screenshot({ path: path.join(outDir, 'detail.png') });

await scrollApp(page, 900);
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, 'detail-summary.png') });

await page.goto('http://127.0.0.1:8081/settings', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(outDir, 'trust.png') });

await browser.close();
console.log(`Screenshots updated (bill: ${billId})`);
