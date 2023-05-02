const webpack = require("webpack");
const compiler = webpack(require('../webpack.config.js'));

function build(cb){
    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stats.toString({
            modules: false,
            colors: true
        }));
        console.log('webpack build success');
        cb?.();
    })
}


module.exports ={
    build
}