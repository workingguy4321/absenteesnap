const { chromium } = require('playwright-core');
const path = require('path');
const http = require('http');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 8089;
const DIR = __dirname;

// Simple local HTTP server so Service Worker can register and test offline caching
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Service-Worker-Allowed': '/'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

async function runOfflineTest() {
  await new Promise(r => server.listen(PORT, r));
  console.log(`📡 Local test server running on http://localhost:${PORT}`);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  console.log('[1/4] Visiting app to install and prime offline cache...');
  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.waitForTimeout(1000); // Wait for service worker install

  console.log('[2/4] Shutting down network server & switching context to 100% OFFLINE...');
  server.close(); // Server is dead! Zero network possible
  await context.setOffline(true); // Browser offline mode active

  console.log('[3/4] Reloading page in pure OFFLINE mode...');
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('#student-cards-grid');

  const title = await page.title();
  console.log(`  ✓ Successfully loaded from Service Worker cache while offline! Title: "${title}"`);

  console.log('[4/4] Interacting with app while offline...');
  await page.fill('#quick-roll-input', '11, 28, 48');
  await page.click('#btn-apply-quick-input');
  await page.waitForTimeout(200);

  const absentText = await page.textContent('#stat-absent');
  console.log(`  ✓ Absent count marked while offline: ${absentText} (Expected: 3)`);
  if (absentText !== '3') throw new Error(`Expected 3 absentees while offline, got ${absentText}`);

  // Test copy-paste report generation offline
  const preview = await page.textContent('#message-preview-text');
  console.log('  ✓ Generated Report Output while completely offline:\n' + preview);

  if (!preview.includes('[11,') || !preview.includes('[28,') || !preview.includes('[48,')) {
    throw new Error('Offline report formatting failed');
  }

  console.log('\n🎉 100% OFFLINE TEST PASSED! The app functions completely without internet or server.');

  await browser.close();
}

runOfflineTest().catch(err => {
  console.error('❌ Offline test failed:', err);
  if (server.listening) server.close();
  process.exit(1);
});
