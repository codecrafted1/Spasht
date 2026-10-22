const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/3f3fcec6-45cc-47f0-ab06-6b83e5131683');
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function main() {
  console.log('Launching Chrome via puppeteer-core at:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop Viewport (1440x900)
  await page.setViewport({ width: 1440, height: 950 });
  console.log('Navigating to http://127.0.0.1:5173...');
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await new Promise(r => setTimeout(r, 1200)); // wait for fonts and scramble settle

  // Hero Screenshot
  const heroPath = path.join(ARTIFACT_DIR, 'hero_desktop.png');
  await page.screenshot({ path: heroPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Captured:', heroPath);

  // 2. Demo Section Prescription Mode
  await page.evaluate(() => {
    const el = document.getElementById('demo');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const demoPrescriptionPath = path.join(ARTIFACT_DIR, 'demo_prescription.png');
  const demoEl = await page.$('#demo');
  if (demoEl) {
    await demoEl.screenshot({ path: demoPrescriptionPath });
  } else {
    await page.screenshot({ path: demoPrescriptionPath });
  }
  console.log('Captured:', demoPrescriptionPath);

  // 3. Demo Section Lab Mode
  // Click "Sample Lab Report" button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const labBtn = buttons.find(b => b.textContent.includes('Sample Lab Report'));
    if (labBtn) labBtn.click();
  });
  await new Promise(r => setTimeout(r, 1800)); // wait for staged progress animation

  const demoLabPath = path.join(ARTIFACT_DIR, 'demo_lab.png');
  if (demoEl) {
    await demoEl.screenshot({ path: demoLabPath });
  } else {
    await page.screenshot({ path: demoLabPath });
  }
  console.log('Captured:', demoLabPath);

  // 4. Mobile Viewport (390 x 844 iPhone 14 style)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));

  const mobileHeroPath = path.join(ARTIFACT_DIR, 'mobile_390px.png');
  await page.screenshot({ path: mobileHeroPath });
  console.log('Captured:', mobileHeroPath);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
