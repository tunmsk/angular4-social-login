import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
// import uglify from 'rollup-plugin-uglify';

import * as _angular_core from '@angular/core';

export default {
  entry: 'dist/a4sl-flat.js',
  dest: 'dist/angular4-social-login.js', // output a single application bundle
  sourceMap: true,
  format: 'umd',
  moduleName: 'Angular4SocialLogin',
  external: [
    '@angular/core'
  ],
  globals: {
    '@angular/core': 'ng.core'
  },
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }

    // console.warn everything else
    console.warn(warning.message);
  },
  plugins: [
    commonjs({
      include: ['node_modules/rxjs/**']
    }),
    sourcemaps(),
    nodeResolve({ jsnext: true, module: true })
    // uglify()
  ]
};
