// One-off check: switching tabs must NOT scroll the page back to the top.
import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });

// Scroll well past the tabs row.
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(300);
const before = await page.evaluate(() => window.scrollY);

// Click the "Meme coins" tab.
await page.getByRole("button", { name: "Meme coins" }).first().click();
await page.waitForTimeout(600);
const after = await page.evaluate(() => window.scrollY);
const url = page.url();

console.log(JSON.stringify({ before, after, url, pass: after > 500 && url.includes("tab=") }));

await browser.close();
