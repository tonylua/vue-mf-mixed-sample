const path = require("path");
const ModuleFederationPlugin = require("mf-webpack4");

module.exports = {
  parallel: false,
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimize: false,
    },
    devServer: {
      port: 3004,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app4",
        library: { type: "var", name: "app4" },
        filename: "remoteEntry.js",
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
