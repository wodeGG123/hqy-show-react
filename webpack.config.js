const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options
  entry: "./src/component/pages/index.js", // string | object | array
  output: {
    path: path.resolve(__dirname, "dist"), // string
    filename: "bundle.js", // string
    publicPath: "/dist/", // string
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!sass-loader'
      })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
      })
      },
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015","react"]
        },
      },
      {
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192'
　　　　},


    ],
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {//配置alias之后再import的地方就可以直接引入，不需要输入很长的路径了
      "module": path.resolve(__dirname, "app/third/module.js"),
    },
  },
  devServer: {
    contentBase: './', // boolean | string | array, static file location
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
}
