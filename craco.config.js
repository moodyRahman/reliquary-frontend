const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@routes": path.resolve(__dirname, 'src/routes/')
    }
  }
};
