const path = require("path");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");

// Function to generate entry points dynamically
const generateEntries = (baseDir, relativeDir = "") => {
  const entries = {};

  // Helper function to add entries recursively
  const addEntries = (dir, prefix = "") => {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      const entryName = path.join(prefix, file);

      if (fs.statSync(fullPath).isDirectory()) {
        // If it's a directory, recurse into it
        addEntries(fullPath, entryName);
      } else if (/^index\.(ts|tsx)$/i.test(file)) {
        // Improved regex to match index.ts or index.tsx files (case-insensitive)
        entries[path.join(relativeDir, prefix)] = fullPath;
      }
    });
  };

  // Start adding entries from the base directory
  addEntries(baseDir);
  return entries;
};

// Define base directories for components and utils
const componentsDir = path.resolve(__dirname, "src/components");
const utilsDir = path.resolve(__dirname, "src/utils");

// Generate externals from peerDependencies in package.json
const peerDependencies = require("./package.json").peerDependencies;
const externals = Object.keys(peerDependencies || {}).reduce((acc, dep) => {
  acc[dep] = dep;
  return acc;
}, {});

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    // Dynamically generate entry points for components and utils
    entry: {
      ...generateEntries(componentsDir, "components"),
      ...generateEntries(utilsDir, "utils"),
      index: "./src/index.ts", // Main entry point
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name]/index.js", // Output filename pattern
      library: {
        type: "module", // Use ESM
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"], // Resolve these extensions
    },
    externals, // Automatically externalize peer dependencies
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Match .ts and .tsx files
          use: "ts-loader", // Use ts-loader for TypeScript files
          exclude: /node_modules/, // Exclude node_modules directory
        },
      ],
    },
    plugins: [new TypescriptDeclarationPlugin({})],
    optimization: {
      minimize: !isDevelopment, // Minimize in production mode
      minimizer: [new TerserPlugin()],
      // splitChunks: {
      //   chunks: "all", // Enable code splitting for all chunks
      // },
    },
    devServer: {
      static: path.join(__dirname, "dist"), // Serve files from dist directory
      compress: true, // Enable gzip compression
      port: 3000, // Development server port
      hot: true, // Enable Hot Module Replacement
      open: true, // Open the browser after server had been started
      watchFiles: ["src/**/*"], // Watch for changes in the src directory
    },
    devtool: isDevelopment ? "inline-source-map" : false, // Use source maps in development mode
    experiments: {
      outputModule: true, // Enable the `module` output target for ESM
    },
  };
};
