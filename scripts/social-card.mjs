import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
const backdrop = (
  await readFile("public/assets/images/forest-arena.webp")
).toString("base64");
const font = (
  await readFile("public/assets/fonts/cinzel-latin-600-normal.woff2")
).toString("base64");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<html><head><style>@font-face{font-family:Cinzel;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;background:#111b16;color:#eee8d9;text-align:center;font-family:Georgia,serif}.art{position:absolute;inset:0;background:linear-gradient(#07130d40,#0a1710bc 45%,#111b16),url(data:image/webp;base64,${backdrop}) center 7%/cover}main{position:relative;height:630px;border:1px solid #d8bc7b40;margin:14px;height:602px;padding-top:150px}small{font:12px system-ui;letter-spacing:5px;color:#e8d4a8;text-transform:uppercase}h1{font:106px/1.15 Cinzel;margin:18px 0 26px;letter-spacing:2px}p{font-size:30px;margin:0}footer{font:15px system-ui;margin-top:45px;color:#d2c9b1;letter-spacing:2px}</style></head><body><div class="art"></div><main><small>A roguelike army defense game</small><h1>Briarwatch</h1><p>Hold the line. Protect the King.</p><footer>COMING SOON &nbsp; · &nbsp; iOS &nbsp; · &nbsp; Android &nbsp; · &nbsp; Steam</footer></main></body></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "public/assets/social-preview.jpg",
    type: "jpeg",
    quality: 88,
  });
  console.log(
    "Social preview: 1200×630, original game artwork + website typography.",
  );
} finally {
  await browser.close();
}
