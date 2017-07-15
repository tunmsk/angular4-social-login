new webpack.ContextReplacementPlugin(
  /angular(\\|\/)core(\\|\/)@angular/,
  path.resolve(__dirname, '../src')
)
