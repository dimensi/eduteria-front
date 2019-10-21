const {
  override,
  addWebpackAlias,
  disableEsLint,
  addPostcssPlugins,
  addBabelPlugins,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  disableEsLint(),
  addWebpackAlias({
    src: path.resolve(__dirname, './src'),
  }),
  addPostcssPlugins([
    require('postcss-nested')(),
    require('postcss-media-minmax')(),
    require('postcss-functions')({
      functions: {
        pxToEm: (px, base) => `${px / base}em`,
      },
    }),
    require('postcss-custom-properties')({ importFrom: path.resolve(__dirname, './src/vars.css') }),
    require('postcss-custom-media')({ importFrom: path.resolve(__dirname, './src/vars.css') }),
    require('postcss-color-function')({ preserveCustomProps: false }),
  ]),
  ...addBabelPlugins(
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  )
)
