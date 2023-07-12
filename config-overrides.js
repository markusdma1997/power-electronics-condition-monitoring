module.exports = function override(config, env) {
    config.resolve.fallback = {
        "fs": false,
        "child_process": false,
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "https": require.resolve("https-browserify")
    };
    return config;
};