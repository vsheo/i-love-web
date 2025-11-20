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
      const $ = load(content, { decodeEntities: false }); // behoud speciale tekens

      const main = $("main");
      if (main.length) {
        let currentArticle = null;
        const children = main.children().toArray();

        children.forEach((el) => {
          const tag = el.tagName.toLowerCase();

          if (/h[1-2]/.test(tag)) {
            currentArticle = $('<article class="neutral"></article>');
            $(el).before(currentArticle);
            currentArticle.append($(el));
          } else if (currentArticle) {
            currentArticle.append($(el));
          }
        });

        // Escaping van code blocks binnen <main>
        main.find("pre > code").each((_, el) => {
          const code = $(el).html();
          $(el).text(code); // veilig tonen
        });

        // Alleen de inhoud van main vervangen
        $("main").html(main.html());
      }

      return $.root().html(); // of content met aangepaste main
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
