const ModuleFederationPlugin = require("mf-webpack4");
const webpack = require("webpack");

module.exports = {
  parallel: false,
  productionSourceMap: false,
  publicPath: "http://localhost:3004/",
  configureWebpack: {
    optimization: {},
    output: {
      filename: "[name].js",
      // chunkFilename: "[name]-[chunkhash].js",
      path: `${__dirname}/dist`,
    },
    devServer: {
      hot: true,
      open: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      historyApiFallback: true,
      port: 3004,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app4",
        filename: "remoteEntry.js",
        library: { type: "var", name: "app4" },
        // library: { type: "umd" },
        exposes: {
          "./vue2": "./node_modules/vue/dist/vue",
          "./Hello": "./src/components/HelloWorld.vue",
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config
      .plugin("limitSplitChunks")
      .use(webpack.optimize.LimitChunkCountPlugin, [{ maxChunks: 1 }]);
  },
  css: {
    sourceMap: true,
    extract: false,
  },
};
