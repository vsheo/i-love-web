export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addWatchTarget("./src/css/");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "public",
        },
    };
};
