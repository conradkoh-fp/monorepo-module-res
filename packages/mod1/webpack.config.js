const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.ts", // Adjust the path to your main TypeScript file
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {},
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
