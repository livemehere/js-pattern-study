const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
  },
  target: ["web", "es5"],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test:/\.(css|less)$/i,
        use:['style-loader','css-loader','less-loader'],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-react", { runtime: "automatic" }],
              ["@babel/preset-typescript"],
            ],
          },
        },
      }
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
};
