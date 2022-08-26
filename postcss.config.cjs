module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-custom-media')({
      importFrom: './src/assets/props.media.css',
    }),
  ],
}
