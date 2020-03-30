/*模拟数据接口*/

let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("lib", resolve("src/common/library"))
      .set("views", resolve("./views"));

    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // scss 全局化配置
          resources: [
            "./src/common/scss/library/_family.scss", //选择器封装
            "./src/common/scss/library/open-color.scss", //颜色封装
            "./src/common/scss/sandal/_function.scss" //基本函数封装
          ]
        })
        .end();
    });
  },

  devServer: {
    // before(app) {
    //     app.post('/api/countydata', (req, res) => {
    //         res.json(goodsList)
    //     })
    // },
    open: true,
    https: false
  },

  baseUrl: "./",
  outputDir: "dataSreen",
  assetsDir: "public",
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
