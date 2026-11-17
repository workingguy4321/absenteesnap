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
    hasTouch: true
  });

  const page = await context.newPage();
  await page.goto(APP_URL);

  // Enter the user's quick roll string:
  await page.fill('#quick-roll-input', '1,11,12,18,28,29,30,32,33,3438,45,47,48,52,112,114');
  await page.click('#btn-apply-quick-input');
  await page.waitForTimeout(400);

  // 1. Screenshot of clean main mobile view
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'preview_motion_main.png'),
    fullPage: false
  });
  console.log('✓ Motion main mobile view captured.');

  // 2. Click Copy Report to capture active copied state
  await page.click('#btn-copy-report');
  await page.waitForTimeout(200); // Capture while data-copied and button green
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'preview_motion_copied.png'),
    fullPage: false
  });
  console.log('✓ Copied active animation state captured.');

  // 3. Scroll to Roster section
  await page.locator('.roster-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'preview_motion_roster.png'),
    fullPage: false
  });
  console.log('✓ Roster grid view captured.');

  await browser.close();
}

capture().catch(console.error);
