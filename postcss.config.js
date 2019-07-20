module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer')({
      'browsers': ['> 1%', 'last 2 versions', 'ie 11']
    })
  ]
}
