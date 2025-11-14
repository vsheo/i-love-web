import fs from "fs";
import path from "path";
import fetch from "@11ty/eleventy-fetch";

const baseURL = "https://raw.githubusercontent.com/wiki/vsheo/i-love-web/";
const sprintStart = 13;
const sprintEnd = 20;

const outputDir = path.join(
  process.cwd(),
  "src",
  "check-outs",
  "fetched-checkouts"
);

// Zorg dat de map bestaat
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function generateUrls() {
  const urls = ['https://raw.githubusercontent.com/wiki/vsheo/i-love-web/Living-standards-S14.md', 'https://raw.githubusercontent.com/wiki/vsheo/i-love-web/Prettier‐code‐formatter.md'];
  for (let sprint = sprintStart; sprint <= sprintEnd; sprint++) {
    let checkoutIndex = 1;
    while (true) {
      const url = `${baseURL}sprint-${sprint}-checkout-${checkoutIndex}.md`;
      try {
        const res = await fetch(url, { type: "text" });
        if (!res) break;
        urls.push(url);
        checkoutIndex++;
      } catch {
        break;
      }
    }
  }
  return urls;
}

async function fetchMarkdownFiles(urls) {
  for (const url of urls) {
    const mdContent = await fetch(url, { duration: "1h", type: "text" });
    const fileName = path.basename(url);
    const outputPath = path.join(outputDir, fileName);

    // Frontmatter toevoegen
    const match = fileName.match(/sprint-(\d+)-checkout-(\d+)/);
    const sprint = match ? match[1] : "unknown";
    const checkout = match ? match[2] : "unknown";

    const frontMatter = `---
title: sprint ${sprint} checkout ${checkout}
layout: base.njk
templateEngineOverride: njk,md
tags: ["sprint ${sprint}"]
---
`;

    fs.writeFileSync(outputPath, frontMatter + mdContent, "utf-8");
    console.log(`Saved ${fileName} with frontmatter`);
  }
}

(async () => {
  const allUrls = await generateUrls();
  await fetchMarkdownFiles(allUrls);
})();
