module.exports = {
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {
        browsers: ['last 2 versions', '> 5%'],
      },
      'postcss-flexbugs-fixes': {},
      'autoprefixer': {
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      },
      'postcss-simple-vars': {
        variables: function variables() {
          return require('../src/variables')
        },
        unknown: function unknown(node, name, result) {
          node.warn(result, 'Unknown variable ' + name)
        }
      },
      'postcss-mixins': {
        mixins: require('../src/mixins')
      }
    },
  };