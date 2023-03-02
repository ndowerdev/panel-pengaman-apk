/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-01d9f47c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/_...all_-06f31ea9.js",
    "revision": null
  }, {
    "url": "assets/_id_-ca56ebfb.js",
    "revision": null
  }, {
    "url": "assets/404-763d23b3.js",
    "revision": null
  }, {
    "url": "assets/app-089f73da.js",
    "revision": null
  }, {
    "url": "assets/block-e32748c2.js",
    "revision": null
  }, {
    "url": "assets/dashboard-43aff7d8.js",
    "revision": null
  }, {
    "url": "assets/helper-59ed4e43.js",
    "revision": null
  }, {
    "url": "assets/home-a2de2da7.js",
    "revision": null
  }, {
    "url": "assets/index-479b5c4a.js",
    "revision": null
  }, {
    "url": "assets/index-49804d3e.css",
    "revision": null
  }, {
    "url": "assets/InputText-29ac9812.js",
    "revision": null
  }, {
    "url": "assets/login-8e1fa504.js",
    "revision": null
  }, {
    "url": "assets/route-block-83d24a4e.js",
    "revision": null
  }, {
    "url": "assets/settings-a5cddf96.js",
    "revision": null
  }, {
    "url": "assets/TheDivider-38e5eb48.js",
    "revision": null
  }, {
    "url": "assets/virtual_pwa-register-3e357add.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-295a6886.js",
    "revision": null
  }, {
    "url": "auth/login.html",
    "revision": "038c471dd19f9c28fefbfa05fd638f58"
  }, {
    "url": "dash.html",
    "revision": "038c471dd19f9c28fefbfa05fd638f58"
  }, {
    "url": "dash/app/block.html",
    "revision": "038c471dd19f9c28fefbfa05fd638f58"
  }, {
    "url": "dash/app/settings.html",
    "revision": "038c471dd19f9c28fefbfa05fd638f58"
  }, {
    "url": "index.html",
    "revision": "038c471dd19f9c28fefbfa05fd638f58"
  }, {
    "url": "favicon.svg",
    "revision": "a795ab195c26601ea433babed25a7d0d"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "5eaf74d1c43d30e0af743b68a3f48504"
  }, {
    "url": "pwa-192x192.png",
    "revision": "65f6c00ff3d88d8371df0480c1ba0272"
  }, {
    "url": "pwa-512x512.png",
    "revision": "20a2db7d5040eb315e6acf49c6983de9"
  }, {
    "url": "manifest.webmanifest",
    "revision": "37e8d18026b05432f623fc5efac2b4b1"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
