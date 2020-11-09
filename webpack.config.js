const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js',
  },
  target: 'node-webkit', // must target to node-webkit
  resolve: {
    modules: ['./src/js', 'node_modules'],
    extensions: ['.js'],
    alias: {
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true, esModule: false },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [path.join(__dirname, '/src/css/app.sass')],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: ['css-loader', 'sass-loader?indentedSyntax'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
}
