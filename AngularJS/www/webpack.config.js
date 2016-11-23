module.exports = {
    node: {
        fs: "empty"
    },
    entry: {
        app: "./app/main",

        // load addintional libs (disabled for now)
        /*
        vendors: [
            //__dirname + "/node_modules/angular2/bundles/angular2-polyfills.js"
            __dirname + "/node_modules/core-js/client/shim.min.js",
            __dirname + "/node_modules/zone.js/dist/zone.js",
            __dirname + "/node_modules/reflect-metadata/Reflect.js",
            __dirname + "/node_modules/systemjs/dist/system.src.js"
        ]*/
    },
    output: {
        path: __dirname,
        filename: "./js/app.bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts/,
            loaders: ['ts-loader'],
            exclude: /node_modules/
        }]
    }
};