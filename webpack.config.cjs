const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // the entry point of your app
  output: {
    path: path.resolve(__dirname, 'build'), // the output directory
    filename: 'bundle.js' // the name of the bundled file
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   process: JSON.stringify({ env: { 'REACT_APP_USERNAME': 'sowmya' } })
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // files to apply the loader to
        exclude: /node_modules/, // files to exclude
        use: {
          loader: 'babel-loader', // the loader to use
          options: {
            presets: ['@babel/preset-react'] // the preset to use
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
