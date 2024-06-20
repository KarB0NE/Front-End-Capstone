require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
    // new HtmlWebpackPlugin({
    //   title: "Alakazam",
    //   favicon: "./client/dist/favicon.ico",
    // }),
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
  // devServer: {
  //   index: "",
  //   proxy: {
  //     context: () => true,
  //     target: "http://localhost:3000",
  //   },
  // },
// };

/**
 *
 * NOTE: About React Fast Refresh:
 *
 * You can enable fast-refresh for this project by enabling the
 * commented lines of code in this file, above and in .babelrc
 *
 * This will change the build so that the client is served by
 * webpack-dev-server and, as such, it should not be loaded via
 * the Express server:
 *
 * - The client will be viewable at http://localhost:8080/
 * - All API requests being sent by the client will be
 *   automatically routed to http://localhost:3000
 * - Since API requests are proxied, the server must still be
 *   running for the React app to compile and run correctly.
 *
 * Since that last requirement _may_ be prohibitive to
 * completing the assigned tasks, the fast-refresh
 * option has been disabled by default.
 *
 */
