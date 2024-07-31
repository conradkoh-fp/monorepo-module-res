const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.ts", // Adjust the path to your main TypeScript file
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      mod2: path.resolve(__dirname, "../mod2/src"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
