const ModuleFederationPlugin = require("mf-webpack4");

module.exports = {
  parallel: false,
  productionSourceMap: false,
  publicPath: "http://localhost:3004/",
  // chainWebpack: (config) => {
  //   config.output.publicPath = "auto";
  // },
  configureWebpack: {
    optimization: {
      minimize: false,
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name]-[chunkhash].js",
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
  css: {
    sourceMap: true,
    extract: false,
  },
};
