const webpack = require('webpack');

module.exports = {
  // Ваша текущая конфигурация Webpack
  plugins: [
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': JSON.stringify(true),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
    })
  ]
};
