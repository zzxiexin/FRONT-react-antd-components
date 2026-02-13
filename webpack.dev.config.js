const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './demo/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist-demo'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  // 开发环境主题变量
                  'primary-color': '#1890ff',
                  'success-color': '#52c41a',
                  'warning-color': '#fa8c16',
                  'error-color': '#f5222d',
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      title: '动态主题组件库演示',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist-demo'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  devtool: 'source-map',
};
