module.exports = {
  entry: "./index.js",
  output: {
    filename: "build/build.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue-loader" },
    ]
  }
}
