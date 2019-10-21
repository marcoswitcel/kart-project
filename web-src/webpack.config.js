const path = require('path');

module.exports = {
  entry: './source/index.js',
  output: {
    filename: 'awesome-kart.js',
    path: path.resolve(__dirname, 'public'),
  },
  watch: true
};