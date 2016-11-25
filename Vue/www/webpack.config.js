module.exports = {
    node: {
        fs: "empty"
    },
    entry: {
        app: "./app/main"
    },
    output: {
        path: __dirname,
        filename: "./js/app.bundle.js"
    },
    resolve: {
        extensions: ['', '.js']
    }

};