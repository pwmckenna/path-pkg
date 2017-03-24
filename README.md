# path-pkg

Get package.json info for the package the path is in.

### Install

```
npm install path-pkg
```

### Usage

##### Babel

```js
var pathPkg = require('path-pkg');
require('babel-register')({
  only: function (filename) {
      return pathPkg(filename).author === 'Patrick Williams';
  }
});
```

##### Webpack 1.x.x

```js
{
  ...
  module: {
    loaders: [{
      test: function (filename) {
        // Uses the babel loader for both this app's code, but also any npm
        // dependencies that you wrote.
        return pathPkg(filename).author === 'Patrick Williams' && new RegExp(/\.js$/).test(filename);
      },
      loader: 'babel'
    }]
  }
  ...
}
```

##### Webpack 2.x.x

```js
{
  ...
  module: {
    rules: [{
      test: {
        and: [filename => pathPkg(filename).author === 'Patrick Williams', /\.jsx?$/]
      },
      use: 'babel-loader'
    }]
  }
  ...
}
```
