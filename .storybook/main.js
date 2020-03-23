const pkg = require('../package.json')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    /** Unique classname */
    const CLASSNAME = pkg.name + pkg.version.replace(/\./g, '_')

    // Replace in css files
    config.module.rules.push({
      test: /\.css$/,
      loader: 'string-replace-loader',
      options: {
        search: 'CLASSNAME',
        replace: CLASSNAME,
        flags: 'g'
      }
    })

    // Replace in js files
    config.plugins.push(
      new webpack.DefinePlugin({
        CLASSNAME: JSON.stringify(CLASSNAME)
      })
    )

    // Return the altered config
    return config
  }
}
