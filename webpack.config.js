import WebExtPlugin from 'web-ext-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildMode = 'development';

export default [
  {
    mode: buildMode,
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(__dirname, 'src', 'manifest.json'),
            to: resolve(__dirname, 'dist', 'manifest.json'),
          },
          {
            from: resolve(__dirname, 'src', 'icons'),
            to: resolve(__dirname, 'dist', 'icons'),
          },
        ],
      }),
    ],
    entry: resolve(__dirname, 'src', 'background', 'background.js'),
    output: {
      path: resolve(__dirname, 'dist', 'background'),
      filename: 'background.js',
      clean: true,
    },
    devtool: 'source-map',
  },
  {
    mode: buildMode,
    plugins: [
      new WebExtPlugin({
        sourceDir: resolve(__dirname, 'dist'),
        startUrl: 'about:debugging#/runtime/this-firefox',
        devtools: true,
        browserConsole: true,
      }),
      new HtmlWebpackPlugin({
        title: 'popup',
        filename: 'popup.html',
        template: resolve(__dirname, 'src', 'popup', 'popup.html'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    entry: resolve(__dirname, 'src', 'popup', 'popup.js'),
    output: {
      path: resolve(__dirname, 'dist', 'popup'),
      filename: 'popup.js',
      clean: true,
    },
    devtool: 'source-map',
  },
  {
    mode: buildMode,
    plugins: [
      new HtmlWebpackPlugin({
        title: 'options',
        filename: 'options.html',
        template: resolve(
          __dirname,
          'src',
          'options',
          'options.html',
        ),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    entry: resolve(__dirname, 'src', 'options', 'options.js'),
    output: {
      path: resolve(__dirname, 'dist', 'options'),
      filename: 'options.js',
      clean: true,
    },
    devtool: 'source-map',
  },
  {
    mode: buildMode,
    plugins: [
      new HtmlWebpackPlugin({
        title: 'sidebar',
        filename: 'sidebar.html',
        template: resolve(
          __dirname,
          'src',
          'sidebar',
          'sidebar.html',
        ),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    entry: resolve(__dirname, 'src', 'sidebar', 'sidebar.js'),
    output: {
      path: resolve(__dirname, 'dist', 'sidebar'),
      filename: 'sidebar.js',
      clean: true,
    },
    devtool: 'source-map',
  },
];
