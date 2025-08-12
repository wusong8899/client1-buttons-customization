const getFlarumWebpackConfig = require('flarum-webpack-config');
const config = getFlarumWebpackConfig();

// Exclude node_modules from Babel to avoid mixing ESM imports into CommonJS deps (e.g., mithril).
const babelRule = (config.module && config.module.rules || []).find(
  (r) => String(r.loader || '').includes('babel-loader')
);

if (babelRule) {
  // Limit transpilation to our source files only.
  const path = require('path');
  babelRule.exclude = /node_modules/;
  babelRule.include = [path.resolve(__dirname, 'src')];
}

module.exports = config;
