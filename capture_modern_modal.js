const { chromium } = require('playwright-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const APP_URL = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const ARTIFACT_DIR = 'C:/Users/sreem/.gemini/antigravity/brain/bc8d8a96-4b9c-4369-a78e-20db8d5acd6e';

async function capture() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark'
  });

  const page = await context.newPage();
  await page.goto(APP_URL);

  // Open settings dialog
  await page.click('#btn-open-settings');
  await page.waitForTimeout(500);

  // Capture modern modal
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'preview_modern_setup_modal.png'),
    fullPage: false
  });
  console.log('✓ Modern Class Setup modal screenshot captured.');

  await browser.close();
}

capture().catch(console.error);
