// "fetch": "https://raw.githubusercontent.com/wiki/vsheo/i-love-web/semester-3-sprint-13--checkout-1.md"

import fs from "fs";
import path from "path";
import fetch from "@11ty/eleventy-fetch";

const baseURL = "https://raw.githubusercontent.com/wiki/vsheo/i-love-web/";
const sprintStart = 13;
const sprintEnd = 20;

// const outputDir = path.join(process.cwd(), "fetched-check-outs");
const outputDir = path.join(
    process.cwd(),
    "src",
    "check-outs",
    "fetched-check-outs"
);

// Zorg dat de map bestaat
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Genereer URLs
async function generateUrls() {
    const urls = [];
    for (let sprint = sprintStart; sprint <= sprintEnd; sprint++) {
        let checkoutIndex = 1;

        while (true) {
            const url = `${baseURL}sprint-${sprint}-checkout-${checkoutIndex}.md`;

            try {
                const res = await fetch(url, { type: "text" });

                if (!res) break;
                urls.push(url);
                console.log(`Found: ${url}`);
                checkoutIndex++;
            } catch (err) {
                console.log(`File not found: ${url}, moving to next sprint`);
                break;
            }
        }
    }
    return urls;
}

// Gebruik de URLs om bestanden op te halen en op te slaan
async function fetchMarkdownFiles(urls) {
    for (const url of urls) {
        const mdContent = await fetch(url, {
            duration: "1h",
            type: "text",
        });

        const fileName = path.basename(url);
        const outputPath = path.join(outputDir, fileName);

        // Extract sprint & checkout nummers uit bestandsnaam
        const match = fileName.match(/sprint-(\d+)-checkout-(\d+)/);
        const sprint = match ? match[1] : "unknown";
        const checkout = match ? match[2] : "unknown";

        // Voeg frontmatter toe aan het begin van het bestand
        const frontMatter = `---
title: sprint ${sprint} checkout ${checkout}
layout: base.njk
templateEngineOverride: njk,md
tags: ["sprint ${sprint}"]
---
`;

        // Combineer frontmatter + originele markdown
        const fullContent = frontMatter + mdContent;

        fs.writeFileSync(outputPath, fullContent, "utf-8");
        console.log(
            `Saved ${fileName} with frontmatter to fetched-check-outs/`
        );
    }
}

// Run alles in de juiste volgorde
(async () => {
    const allUrls = await generateUrls();
    await fetchMarkdownFiles(allUrls);
})();
