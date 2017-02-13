const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const EventEmitter = require('events');
const WebpackSplitHash = require('teld-vue-frame/lib/webpack-split-hash');
const TeldHtmlWebpackPlugin = require('teld-vue-frame/lib/teld-html-webpack-plugin');


//解决最大监听问题
const EE = new EventEmitter();
EE.setMaxListeners(EE.getMaxListeners() + 1);

//定义路径
const ROOT_PATH = path.resolve(__dirname);

//编译前的准备工作
fs.writeFileSync(path.join(ROOT_PATH, 'src/js/frame.js'), fs.readFileSync(path.join(ROOT_PATH, '/node_modules/teld-vue-frame/src/frame.js')));
(function(fileUrl){
    var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        fs.unlinkSync(fileUrl+'/'+file);
    });
    fs.rmdirSync(fileUrl);
})(path.join(ROOT_PATH, 'dist/js'));

// webpack.config.js
module.exports = {
    // entry point of our application
    entry: {
        frame: './src/js/frame',
    },
    // where to place the compiled bundle
    output: {
        publicPath: "dist/js/",
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].js'
        //chunkFilename:'[name].js'
    },
    devtool: "cheap-eval-source-map",
    module: {
        loaders: [
            {
                // use vue-loader for *.vue files
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                // use babel-loader for *.js files
                test: /\.js$/,
                loader: 'babel-loader',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: {mimetype: "image/png"}
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            // {
            //   test: /\.ejs$/,
            //   loader: 'ejs-html'
            // }

        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'vuex': 'vuex/dist/vuex.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'vue-resource': 'vue-resource/dist/vue-resource.js'
        }
    },
    // if you are using babel-loader directly then
    // the babel config block becomes required.
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
    ,

    plugins: [
        new WebpackSplitHash(),
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
        // ,new webpack.optimize.UglifyJsPlugin({
        //       compress: {
        //           warnings: false
        //       }
        //   })
    ]
}