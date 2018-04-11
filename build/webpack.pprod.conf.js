var fs = require('fs')
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

var env = config.pprodbuild.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.pprodbuild.productionSourceMap,
      extract: true
    }).concat([
      {
        loader: 'string-replace-loader',
        test: /\.(js|vue|json)$/,
        exclude: /node_modules/,
        options: {
          multiple: [
            { search: 'moodysbackend.wedeploy.io', replace: 'moodysbackendpprod.wedeploy.io', flags: 'g' },
            { search: 'moodies-1ad4f', replace: 'moodies-pprod', flags: 'g' },
            { search: 'AIzaSyD9XdghOe4dGAeA4tiJ83Bu0CnUpnO5UMw', replace: 'AIzaSyBSXAzQ-vm5swmpO2jES0rciHDIweAIerA', flags: 'g' }
          ]
        }
      }
    ])
  },
  devtool: config.pprodbuild.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.pprodbuild.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.pprodbuild.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-pprod.js'), 'utf-8')}</script>`
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.pprodbuild.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'moodies-app',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css,svg,eot,ttf,woff,png,jpg,jpeg}'],
      minify: true,
      importScripts: [
        /* './static/sw/config.js', */
        './static/sw/push-handler.js',
        './static/sw/notif-click-handler.js'
      ],
      stripPrefix: 'dist/',
      runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/code\.getmdl\.io\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/api\.adorable\.io\//,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/www\.gravatar\.com\//,
        handler: 'networkFirst'
      }]
    })
  ]
})

if (config.pprodbuild.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.pprodbuild.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.pprodbuild.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig