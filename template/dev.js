/**
 * Created by chendong on 2019/1/8.
 */
var path = require('path');
var webpack = require('teld-webpack');
var WebpackDevServer = require('webpack-dev-server/lib/Server');

var config = require("./webpack.config.js");
config.plugins.push(new webpack.HotModuleReplacementPlugin())
//config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    /*我们写入配置的地方*/
    contentBase: path.join(__dirname, "dist/js/"),
    inline:true,
    hot:true,
    quiet: false,
    noInfo: true,
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },
    filename: "bundle.js",
    publicPath: "dist/js/",
    disableHostCheck:true
});
server.listen(30001,"127.0.0.1",function () {
    console.log("监听：http://127.0.0.1:30001")
})
