System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "main.js",
      "defaultExtension": "js"
    },
    "rxjs": {
      "defaultExtension": "js"
    },
    "angular2-in-memory-web-api": {
      "defaultExtension": "js"
    },
    "@angular/common": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/compiler": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/core": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/http": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser-dynamic": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/router": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/router-deprecated": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/testing": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/upgrade": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "angulartics2": {
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular": "node_modules/@angular",
    "angular2": "npm:angular2@2.0.0-beta.17",
    "angular2-in-memory-web-api": "node_modules/angular2-in-memory-web-api",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.6",
    "es6-shim": "github:es-shims/es6-shim@0.35.1",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "rxjs": "node_modules/rxjs",
    "zone.js": "npm:zone.js@0.6.12",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:angular2@2.0.0-beta.17": {
      "reflect-metadata": "npm:reflect-metadata@0.1.2",
      "rxjs": "npm:rxjs@5.0.0-beta.7",
      "zone.js": "npm:zone.js@0.6.12"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:reflect-metadata@0.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-beta.7": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:zone.js@0.6.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
