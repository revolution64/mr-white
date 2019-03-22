const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "./src/styles/main.scss"],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    inline: true,
    port: 3000,
    historyApiFallback: true,
    watchContentBase: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'ttf-loader',
            options: {
              name: './font/[hash].[ext]',
            },
          },
        ]
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        options: {
          presets: ["react", "stage-0", "es2015"],
          plugins: ["transform-class-properties", "transform-decorators-legacy"]
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
