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
              // Nieuw article vóór de heading
              currentArticle = $('<article class="neutral"></article>');
              $(el).before(currentArticle);

              // Voeg de heading in het article
              currentArticle.append($(el));
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

  return {
    dir: {
      input: "src",
      output: "public",
    },
    pathPrefix: "/i-love-web/",
  };
}
