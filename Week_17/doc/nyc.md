# code coverage (nyc)

## set up

```command
npm install -D nyc
```

add babel-nyc plugin, and config it, [link](https://www.npmjs.com/package/@istanbuljs/nyc-config-babel)


```command
npm i babel-plugin-istanbul @istanbuljs/nyc-config-babel --save-dev
```

```json
// .babelrc
{
    "presets": ["@babel/preset-env"],
    "plugins": ["istanbul"]
}
```

```json
// .nycrc
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```


## run

```json
// package.json

  "scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
  },
```

```command
npm run coverage  
```