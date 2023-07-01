module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
        "fs": false,
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/")
    };
    return config;
};