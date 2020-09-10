const path = require('path');
module.exports = {        
        entry: './src/js/app.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist/js'),
        },     
        mode : 'development' ,  // development为开发者环境，production为生产环境变量 ，还有一个为none
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            },
            {
              test: /\.s[ac]ss$/i,  
              //use: [ 'style-loader', 'postcss-loader', 'css-loader','sass-loader'],
              use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        importLoaders:1
                    }
                }, {
                    loader: "postcss-loader"
                },{
                    loader:"sass-loader"
                }
              ] 

              
            },
          ]
        },
      
};