// entry point (file name + path ) ==> next the module depencencies
// default configuration - src/index.js
// once - minification, transpilation, reference resolution, bundling is done
// output path and the name of the file <bundle.js>
// all modules that webpack is dependent on is termed as loaders needs

let path = require('path'), //path module of node framework
  HtmlWebpackPlugin = require('html-webpack-plugin'), //to load the index html file on request
  config = {
    output: {
      path: path.join(__dirname, '/dist'), //dist - distribution
      filename: 'bundle.js',
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 9090,
      historyApiFallback: true, //localhost:9090/user
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /nodeModules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          exclude: /nodeModules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/',
            name: '[name].[ext]',
            url: true,
            publicPath: './app/images/',
          },
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })], //localhost:9090 - loads this html
  };

module.exports = config;
