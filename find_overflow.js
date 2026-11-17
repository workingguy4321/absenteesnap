const { chromium } = require('playwright-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const APP_URL = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

async function check() {
  const browser = await chromium.launch({ executablePath: EDGE_PATH, headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark'
  });

  const page = await context.newPage();
  await page.goto(APP_URL);
  await page.waitForTimeout(400);

  const result = await page.evaluate(() => {
    const windowWidth = window.innerWidth;
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    const elements = Array.from(document.querySelectorAll('*'));
    const overflowList = [];

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > windowWidth + 1) {
        overflowList.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        });
      }
    });

    return { windowWidth, docWidth, scrollWidth, overflowList };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

check().catch(console.error);
