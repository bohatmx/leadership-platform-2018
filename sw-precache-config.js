/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    'index.html',
    'manifest.json',
    'firebase-messaging-sw.js',
    'bower_components/webcomponentsjs/custom-elements-es5-adapter.js',
    'bower_components/webcomponentsjs/webcomponents-loader.js',
    'images/manifest/icon-48x48.png',
    'images/manifest/icon-57x57.png',
    'images/manifest/icon-72x72.png',
    'images/manifest/icon-96x96.png',
    'images/manifest/icon-114x114.png',
    'images/manifest/icon-144x144.png',
    'images/manifest/icon-192x192.png',
    'images/manifest/icon-512x512.png',
    'images/glp-logo.png',
    'images/google-plus.png',
    'images/favicon.ico',
    'data/jquery.min.js'
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/],
  runtimeCaching: [
    {
      urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    },
  ],
};
