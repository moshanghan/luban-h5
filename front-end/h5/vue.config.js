/*
 * @Author: ly525
 * @Date: 2019-12-14 22:43:55
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 11:44:14
 * @FilePath: /luban-h5/front-end/h5/vue.config.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
const path = require('path')
const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// const isProd = process.env.NODE_ENV === 'production'
const target = 'http://localhost:1337'
const engineOutputDir = path.join(__dirname, '../../back-end/h5-api/public/engine-assets')
const mainAppOutputDir = path.join(__dirname, '../../back-end/h5-api/build-editor')
const coreEditorOutputDir = path.join(__dirname, '../../front-end/h5/src/components/core/dist')

let page
switch (process.env.PAGE) {
  case 'ENGINE':
    page = {
      entry: 'src/engine-entry.js',
      // template: 'public/engine.html',
      // filename: 'engine.html',
      // title: 'Engine Page',
      outputDir: engineOutputDir
    }
    break
  case 'CORE_EDITOR':
    page = {
      entry: 'src/components/core/index.js',
      outputDir: coreEditorOutputDir
    }
    break
  case 'EDITOR':
  default:
    page = {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      // outputDir: 'dist',
      outputDir: mainAppOutputDir,
      // publicPath: isProd ? '/main/' : '/'
      plugins: [
        new MonacoWebpackPlugin()
      ]
    }
}

let configureWebpack = {
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'core': path.join(__dirname, 'src/components/core')
    }
  },
  plugins: [
    // https://github.com/moment/moment/issues/2416
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /(zh-cn)$/)
  ],
  externals: {
  }
}

console.log(process.env.PAGE === 'ENGINE')

module.exports = {
  outputDir: page.outputDir,
  publicPath: page.publicPath,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: { index: page },
  devServer: {
    proxy: {
      '^/upload|content-manager|users-permissions|works|scripts|admin|psd-files|workforms|third-libs|engine-assets/': {
        target,
        changeOrigin: true,
        ws: false
      },
      '^/nCoV': {
        target: 'https://lab.isaaclin.cn'
      }
    }
  },
  configureWebpack,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          // './src/theme'
        ]
      }
    },
    extract: false
  },
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/favicon.ico',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: 'img/icons/favicon.ico'
    }
  }
}
