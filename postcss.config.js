const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV !== "development"
      ? cssnano({ preset: "default" })
      : null,
    process.env.NODE_ENV !== "development"
      ? purgecss({
          content: ["./**/*.tsx"],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        })
      : null,
  ],
};