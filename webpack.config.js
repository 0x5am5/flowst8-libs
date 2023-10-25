const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["flowst8Libz"]: "./src/flowst8Libz.js",
    ["FSEasyScrollNav"]: "./src/easyScrollNav.js",
    ["FSEasyInfiniteSlider"]: "./src/easyInfiniteSlider.js",
    ["FSEasyLazyLoadYouTube"]: "./src/easyLazyLoadYouTube.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true,
  },
};
