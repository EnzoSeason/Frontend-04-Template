# Mocha

[mocha](https://mochajs.org/)


## set up

```command
npm install -D mocha
```

To enable ES6, install babel

```command
npm install -D @babel/core @babel/preset-env @babel/register
```

```json
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```

## run tests

```command
./node_modules/.bin/mocha --require @babel/register
```

```json
// package.json

  "scripts": {
    "test": "mocha --require @babel/register"
  },
```
```command
npm run test
```


