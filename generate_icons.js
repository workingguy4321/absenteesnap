const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function generateIcons() {
  const iconsDir = path.join(__dirname, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  async function generateIcon(size, filename, isMaskable = false) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1
    });

    const borderRadius = isMaskable ? '0' : '22%';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${isMaskable ? '#1d4ed8' : 'transparent'};
          }
          .icon-bg {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: ${borderRadius};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(29, 78, 216, 0.4);
            position: relative;
            overflow: hidden;
          }
          .badge-symbol {
            font-size: ${Math.round(size * 0.52)}px;
            line-height: 1;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25));
            user-select: none;
          }
        </style>
      </head>
      <body>
        <div class="icon-bg">
          <span class="badge-symbol">📋</span>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html);
    await page.screenshot({
      path: path.join(iconsDir, filename),
      omitBackground: !isMaskable
    });
    await page.close();
    console.log(`Generated ${filename} (${size}x${size})`);
  }

  await generateIcon(192, 'icon-192.png');
  await generateIcon(512, 'icon-512.png');
  await generateIcon(512, 'icon-maskable.png', true);
  await generateIcon(180, 'apple-touch-icon.png');
  await generateIcon(64, 'favicon.png');

  await browser.close();
  console.log('✓ All PWA icons generated successfully in icons/');
}

generateIcons().catch(console.error);
