const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require("vue-loader");
// const viteFed = require("@originjs/vite-plugin-federation");
//
// const v = viteFed({
//   name: "vite-host-dynamic",
//   remotes: {},
//   shared: ["vue"],
// });
// v.options({});
// v.load("fake-plugin1");

//Just to help us with directories and folders path
const __base = path.resolve(__dirname, ".");
const __src = path.resolve(__base, "src");

module.exports = {
  //Entry: main file that init our application
  entry: path.resolve(__src, "main.js"),

  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
  },

  //Output: result of the bundle after webpack run
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__base, "dist"),
    clean: true,
  },

  // experiments: {
  //   outputModule: true,
  // },

  //Plugins to help and include additionals functionalities to webpack
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./hDemi": path.resolve(__dirname, "./src/utils/h-demi"),
      },
      remotes: {
        app_v3w5: "app2@http://localhost:3002/remoteEntry.js",
        app_v2w4: "app4@http://localhost:3004/remoteEntry.js",
        app_v2w5: "app5@http://localhost:3005/remoteEntry.js",
      },
      shared: { vue: { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      title: "Minimal Vue Webpack",
      favicon: path.resolve(__src, "static", "favicon.ico"),
      template: path.resolve(__src, "templates", "index.html"),
    }),
    new VueLoaderPlugin(),
  ],

  //Webpack dosent know how to handler all type of files and what to do with them, so this section
  //we can capture and configure a specific type of file and determine a loader plugin to process it
  module: {
    rules: [
      //Vue loader. Says to webpack tha files with .vue extension need to be processed by the vue-loader plugin
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      //CSS loaders. Make possible import css files as js modules
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      //Indicates that png files are assets to be processed by webpack
      {
        test: /\.png$/,
        type: "asset/resource",
      },
    ],
  },
};
