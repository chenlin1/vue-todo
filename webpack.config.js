var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
     target: "web",
     entry: path.join(__dirname, 'src/index.js'), //入口文件
     output:{
          path: path.join(__dirname, 'dist'), //输出位置
          filename: 'bundle.js' //输入文件
     },
     module:{
        rules:[
            {
                test:/\.vue$/,//支持正则
                loader:'vue-loader' 
            },
             {
                 test:/\.jsx$/,//支持正则
                 loader:'babel-loader' 
             },
             {
                test:/\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.styl/,
                use: [ 
                    'style-loader', 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader' 
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]--a.[ext]'
                    }
                }]
            }
        ]
   },
   plugins: [
     new webpack.DefinePlugin({
         'process.env': {
             NODE_ENV: isDev ? '"development"' : '"production"'
         }
     }),
     new HtmlwebpackPlugin(),
     new VueLoaderPlugin(),
     new CleanWebpackPlugin()
  ],
}


if (isDev) {
  config.devServer = {
      port: 8000,
    //   host: '0.0.0.0',
      overlay: {
          errors: true,
      },
      open: true,
      hot: true
  }
  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;