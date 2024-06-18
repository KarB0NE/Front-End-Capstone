require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i, // For Tailwind
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"), // Use require to load Tailwind plugin
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "client/dist"),
    },

    devServer: {
      // ... other devServer options
      watchFiles: ['src/**/*'], // Watch for changes in the 'src' folder
      hot: true,  // Enable Hot Module Replacement (HMR)
      liveReload: true, // Enable live reload
    },

    onBeforeSetupMiddleware: async (devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      await new Promise((resolve, reject) => {
        // Spawning a new process to run 'tailwindcss -w' in parallel
        const childProcess = require('child_process').spawn(
          'npx tailwindcss -i ./client/src/index.css -o ./client/dist/main.css --watch',
          { shell: true, stdio: 'inherit' }
        );

        childProcess.on('error', (err) => {
          reject(err);
        });

        childProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`tailwindcss exited with code ${code}`));
          } else {
            resolve();
          }
        });
      });
    }
  },
  plugins: [
    // new ReactRefreshPlugin(), // See note below...
    new HtmlWebpackPlugin({
      title: "Alakazam",
      favicon: "./client/dist/favicon.ico",
    }),
    // This will allow you to refer to process.env variables
    // within client-side files at build-time:
    new webpack.DefinePlugin({
      "process.env": {
        AUTH_SECRET: JSON.stringify(process.env.AUTH_SECRET),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
};