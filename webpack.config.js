const path = require('path')
const webpack = require('webpack')

//only optimize the output for production, making it easier to debug
const optimizationPlugins = []
if (process.env.NODE_ENV === 'production') {
  optimizationPlugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }))
  optimizationPlugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false },
    comments: false
  }))
}

module.exports = [
//configuration for the client
  {
    context: path.resolve(path.join(__dirname, '/lib')),

    entry: ['regenerator-runtime/runtime', './client.js'],

    output: {
      path: path.resolve(path.join(__dirname, 'public/build')),
      filename: 'bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/build/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?plugins[]=transform-regenerator'
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader', options: {modules: true, localIdentName: '[name]--[local]--[hash:base64:5]'}},
            {loader: 'sass-loader'}
          ]
        }
      ]
    },

    plugins: [
      ...optimizationPlugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
  },

//configuration for the server-side rendering of routes
  {
    name: 'server-side rendering',

    entry: './lib/routes.js',

    target: 'node',

    output: {
        path: path.resolve(path.join(__dirname, 'build')),
        filename: 'server.routes.bundle.js',
        publicPath: './build',
        libraryTarget: 'commonjs2'
    },

    externals: /^[a-z\-0-9]+$/,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            { loader: 'css-loader/locals', options: { modules: true, localIdentName: '[name]--[local]--[hash:base64:5]' } },
            { loader: 'sass-loader' }
          ]
        }
      ]
    }
  }
]
