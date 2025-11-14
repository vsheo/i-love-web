import { load } from "cheerio";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addWatchTarget("./src/assets/");

  eleventyConfig.addTransform(
    "wrapContentAfterHeadings",
    (content, outputPath) => {
      if (outputPath && outputPath.endsWith(".html")) {
        const $ = load(content);

        $("main").each((_, mainEl) => {
          let currentArticle = null;
          const children = $(mainEl).children().toArray();

          children.forEach((el) => {
            const tag = el.tagName.toLowerCase();

            if (/h[1-6]/.test(tag)) {
              currentArticle = $('<article class="neutral"></article>');
              $(el).after(
                '<span class="grid-spacer" aria-hidden="true"></span>'
              );
              $(el).after(currentArticle);
            } else if (tag === "pre") {
              currentArticle = null;

              const newArticle = $('<article class="neutral"></article>');
              $(el).after(newArticle);
              currentArticle = newArticle;
            } else if (currentArticle) {
              currentArticle.append($(el));
            }
          });
        });

        return $.html();
      }

      return content;
    }
  );

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "public",
    },
    pathPrefix: "/i-love-web/",
  };
}
