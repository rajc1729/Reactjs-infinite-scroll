const HtmlWebPackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  context: __dirname,
  entry: ["./src/client/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
  },
  devServer: {
    port: 3000,
    open: true,
    transportMode: "ws",
    injectClient: false,
    proxy: {
      "/api": "http://localhost:8000"
    }
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: false,
      favicon: "./public/favicon.ico"
    })
  ]
};
