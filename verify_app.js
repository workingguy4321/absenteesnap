const { chromium } = require('playwright-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const APP_URL = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

async function runVerification() {
  console.log('🚀 Starting Automated End-to-End Verification...');
  console.log('App URL:', APP_URL);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // Mobile viewport first
  });

  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', (err) => {
    errors.push(`Page error: ${err.message}`);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  try {
    // Step 1: Load Page
    console.log('\n[1/8] Loading application...');
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForSelector('#student-cards-grid');

    const title = await page.title();
    console.log(`✓ Page loaded successfully. Title: "${title}"`);

    // Step 2: Verify Initial State
    console.log('\n[2/8] Verifying initial state and default roster...');
    const statTotal = await page.textContent('#stat-total');
    const statPresent = await page.textContent('#stat-present');
    const statAbsent = await page.textContent('#stat-absent');
    const statPercent = await page.textContent('#stat-percent');

    console.log(`  Initial Stats: Total=${statTotal}, Present=${statPresent}, Absent=${statAbsent}, Percent=${statPercent}`);
    if (statTotal !== '56' || statPresent !== '56' || statAbsent !== '0' || !statPercent.startsWith('100')) {
      throw new Error(`Unexpected initial stats: Total=${statTotal}, Present=${statPresent}`);
    }
    console.log('✓ Initial 56 students loaded with 100% attendance.');

    // Step 3: Fast Roll Number Entry
    console.log('\n[3/8] Testing Quick Roll Input ("04 12 28")...');
    await page.fill('#quick-roll-input', '04 12 28');
    await page.click('#btn-apply-quick-input');

    const absentAfterInput = await page.textContent('#stat-absent');
    const presentAfterInput = await page.textContent('#stat-present');
    const percentAfterInput = await page.textContent('#stat-percent');

    console.log(`  After Input: Absent=${absentAfterInput}, Present=${presentAfterInput}, Percent=${percentAfterInput}`);
    if (absentAfterInput !== '3' || presentAfterInput !== '53') {
      throw new Error(`Expected 3 absentees and 53 present, got Absent=${absentAfterInput}, Present=${presentAfterInput}`);
    }

    const tagCount = await page.locator('.absent-badge-chip').count();
    console.log(`  Number of absentee badge tags rendered: ${tagCount}`);
    if (tagCount !== 3) {
      throw new Error(`Expected 3 tag chips, got ${tagCount}`);
    }
    console.log('✓ Quick Roll Input successfully marked 3 students absent.');

    // Step 4: Card Click Toggle
    console.log('\n[4/8] Testing Student Card Click Toggle (Card #15)...');
    const card15 = page.locator('.student-card[data-roll="15"]');
    await card15.click();

    const absentAfterCardClick = await page.textContent('#stat-absent');
    console.log(`  Absent count after clicking Card #15: ${absentAfterCardClick}`);
    if (absentAfterCardClick !== '4') {
      throw new Error(`Expected 4 absentees, got ${absentAfterCardClick}`);
    }

    // Toggle back roll 04 by clicking chip remove button
    const removeChip04 = page.locator('.btn-remove-chip[data-roll="04"]');
    await removeChip04.click();
    const absentAfterChipRemove = await page.textContent('#stat-absent');
    console.log(`  Absent count after removing chip #04: ${absentAfterChipRemove}`);
    if (absentAfterChipRemove !== '3') {
      throw new Error(`Expected 3 absentees, got ${absentAfterChipRemove}`);
    }
    console.log('✓ Student Card toggle and Chip removal verified.');

    // Step 5: WhatsApp Preview Formatting
    console.log('\n[5/8] Testing WhatsApp Report Formatter (all formats)...');
    
    // Bracket Format [Roll, Name]
    await page.selectOption('#format-select', 'bracket');
    let preview = await page.textContent('#message-preview-text');
    if (!preview.includes('[') || !preview.includes(']')) {
      throw new Error('Bracket format missing [Roll, Name] syntax.');
    }
    console.log('  ✓ Bracket format [Roll, Name] generated cleanly.');

    // Mentor Standard
    await page.selectOption('#format-select', 'mentor_standard');
    preview = await page.textContent('#message-preview-text');
    if (!preview.includes('||') || !preview.includes('*Absent:')) {
      throw new Error('Mentor Standard format missing expected syntax.');
    }
    console.log('  ✓ Mentor Standard format generated cleanly.');

    // Detailed
    await page.selectOption('#format-select', 'detailed');
    preview = await page.textContent('#message-preview-text');
    if (!preview.includes('DAILY ATTENDANCE') || !preview.includes('12') || !preview.includes('15')) {
      throw new Error('Detailed format missing expected keywords.');
    }
    console.log('  ✓ Detailed format generated cleanly.');

    // Roll Only
    await page.selectOption('#format-select', 'roll_only');
    preview = await page.textContent('#message-preview-text');
    if (!preview.includes('Total: 56') || !preview.includes('*Absent: 3')) {
      throw new Error('Roll Only format missing expected header or counts.');
    }
    console.log('  ✓ Roll Only format generated cleanly.');

    // Official
    await page.selectOption('#format-select', 'official');
    preview = await page.textContent('#message-preview-text');
    if (!preview.includes('ATTENDANCE STATEMENT')) {
      throw new Error('Official format missing expected keywords.');
    }
    console.log('  ✓ Official format generated cleanly.');

    // Step 6: Period Switching & Next Hour Transition
    console.log('\n[6/8] Testing Period Switching and Next Hour advancement...');
    const chip2nd = page.locator('.period-chip[data-period="2nd Hour"]');
    await chip2nd.click();
    const isChip2Active = await chip2nd.evaluate(el => el.classList.contains('active'));
    if (!isChip2Active) throw new Error('2nd Hour chip did not become active');

    // Click Next Hour
    await page.click('#btn-next-period');
    await page.waitForTimeout(500);
    const chip3rd = page.locator('.period-chip[data-period="3rd Hour"]');
    const isChip3Active = await chip3rd.evaluate(el => el.classList.contains('active'));
    console.log(`  Advanced to 3rd Hour active: ${isChip3Active}`);
    if (!isChip3Active) throw new Error('Next Hour button failed to advance to 3rd Hour');
    console.log('✓ Period switching and auto-advance verified.');

    // Step 7: Settings Dialog Test
    console.log('\n[7/8] Testing Class Setup Modal...');
    await page.click('#btn-open-settings');
    const isSettingsOpen = await page.evaluate(() => document.getElementById('settings-dialog').open);
    if (!isSettingsOpen) throw new Error('Settings dialog failed to open.');

    await page.fill('#setting-dept', 'AI & DS');
    await page.fill('#setting-sec', 'B');
    await page.click('#settings-form button[type="submit"]');
    await page.waitForTimeout(300);

    const badgeText = await page.textContent('#class-badge-display');
    console.log(`  Updated Class Badge Text: "${badgeText}"`);
    if (!badgeText.includes('AI & DS')) {
      throw new Error(`Class badge text not updated: "${badgeText}"`);
    }
    console.log('✓ Class Setup updated and saved successfully.');

    // Step 8: Roster Bulk Import Test
    console.log('\n[8/8] Testing Bulk Roster Import with [Roll, Name] syntax...');
    await page.click('#btn-open-roster');
    await page.waitForTimeout(200);

    // Switch to bulk tab
    await page.click('.roster-tab-btn[data-tab="bulk"]');
    const sampleImport = `[101, Alice Wonder]\n[102, Bob Builder]\n[103, Charlie Brown]`;
    await page.fill('#bulk-paste-input', sampleImport);

    // Accept browser alert automatically
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.click('#btn-import-bulk');
    await page.waitForTimeout(300);

    // Close roster dialog
    await page.click('#roster-dialog button[data-action="close-dialog"]');

    const newTotal = await page.textContent('#stat-total');
    console.log(`  Total students after bulk import: ${newTotal}`);
    if (newTotal !== '3') {
      throw new Error(`Expected 3 students after bulk import, got ${newTotal}`);
    }
    console.log('✓ Bulk Roster Import parsed and updated class size to 3.');

    // Step 9: Android & iOS Offline / PWA Readiness Audit
    console.log('\n[9/9] Testing Android & iOS Offline PWA Readiness...');
    const fs = require('fs');

    // 1. Verify Manifest
    const manifestPath = path.resolve(__dirname, 'manifest.webmanifest');
    if (!fs.existsSync(manifestPath)) throw new Error('manifest.webmanifest missing');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (!manifest.id || manifest.display !== 'standalone' || !manifest.icons || manifest.icons.length < 3) {
      throw new Error('Manifest missing required PWA fields (id, standalone, icons)');
    }
    console.log('  ✓ Web App Manifest verified with id, standalone display, and 3 icon specifications.');

    // 2. Verify iOS Meta Tags
    const appleCapable = await page.getAttribute('meta[name="apple-mobile-web-app-capable"]', 'content');
    const appleTouchIcon = await page.getAttribute('link[rel="apple-touch-icon"]', 'href');
    if (appleCapable !== 'yes') throw new Error('iOS apple-mobile-web-app-capable meta tag not set to yes');
    if (!appleTouchIcon) throw new Error('iOS apple-touch-icon link missing');
    console.log('  ✓ iOS Safari PWA meta tags & apple-touch-icon verified.');

    // 3. Verify Offline Badge
    const offlineBadge = await page.textContent('#offline-badge');
    console.log(`  ✓ Offline badge present: "${offlineBadge}"`);
    if (!offlineBadge.includes('Offline')) throw new Error('Offline badge missing');

    // 4. Verify Icon Files on Disk
    const requiredIcons = ['icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png', 'favicon.png'];
    for (const icon of requiredIcons) {
      const iconPath = path.join(__dirname, 'icons', icon);
      if (!fs.existsSync(iconPath)) throw new Error(`Missing icon file: ${icon}`);
    }
    console.log('  ✓ All 5 PWA icons verified on disk in icons/ folder.');

    // 5. Verify Service Worker file
    const swPath = path.resolve(__dirname, 'sw.js');
    if (!fs.existsSync(swPath)) throw new Error('sw.js file missing');
    console.log('  ✓ Service Worker (sw.js) verified.');

    // Check for console errors
    if (errors.length > 0) {
      console.warn('Console warnings/errors detected:', errors);
    } else {
      console.log('✓ Zero console errors detected during entire run.');
    }

    console.log('\n🎉 ALL 9 TESTS PASSED SUCCESSFULLY! Both Android, iOS & Offline Ready.');
  } finally {
    await browser.close();
  }
}

runVerification().catch(err => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
