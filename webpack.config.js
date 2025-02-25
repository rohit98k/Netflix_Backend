const path = require("path");

module.exports = {
    entry: "./src/index.js", // adjust as needed
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        fallback: {
            path: require.resolve("path-browserify"),
            fs: false, // if you don't need file system functionality in the browser
            crypto: require.resolve("crypto-browserify"),
            assert: require.resolve("assert/"),
            vm: require.resolve("vm-browserify"),
            buffer: require.resolve("buffer/"),
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
            querystring: require.resolve("querystring-es3"),
            os: require.resolve("os-browserify/browser"),
            http: require.resolve("stream-http"),
            net: false, // if not needed; net is usually a Node-only module
            string_decoder: require.resolve("string_decoder/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader", // if you need to transpile your code
            },
        ],
    },
};
