import { load } from "cheerio";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css-js");
  eleventyConfig.addWatchTarget("./src/css-js/");

  eleventyConfig.addTransform("wrapContentAfterHeadings", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      const $ = load(content);

      $("main").each((_, mainEl) => {
        let currentArticle = null;
        const children = $(mainEl).children().toArray();

        children.forEach((el) => {
          const tag = el.tagName.toLowerCase();

          if (/h[1-6]/.test(tag)) {
            // start nieuw article **na de heading**
            currentArticle = $("<article></article>");
            $(el).after(currentArticle);

            // voeg eventueel grid-spacer direct na heading
            $(el).after('<span class="grid-spacer" aria-hidden="true"></span>');

          } else if (currentArticle) {
            // alles na de heading tot volgende heading in hetzelfde article
            currentArticle.append($(el));
          }
        });
      });

      return $.html();
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}

