const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@routes": path.resolve(__dirname, 'src/routes/'),
      "@components":path.resolve(__dirname, "src/components")
    },
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: 'babel-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
  }
};
