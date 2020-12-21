var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async initPackages() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
    ]);

    const pkgJson = {
        "name": answers.name.replace(/\s+/g, '-').toLowerCase(),
        "version": "1.0.0",
        "description": "",
        "scripts": {
          "build": "webpack",
          "dev": "webpack serve",
          "test": "mocha --require @babel/register",
          "coverage": "nyc mocha"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {}
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    
    this.npmInstall(["vue"], { 'save-dev': false });
    this.npmInstall(["webpack", "webpack-cli", "webpack-dev-server",
      "vue-loader", "vue-template-compiler", 'vue-style-loader',
      "babel-loader", "@babel/core", "@babel/preset-env", "@babel/register",
      "mocha", "nyc", "babel-plugin-istanbul", "@istanbuljs/nyc-config-babel",
      'css-loader', 'copy-webpack-plugin'], { 'save-dev': true });
  }

  copyFiles() {
    this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
    );

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
    );

    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
    );

    this.fs.copyTpl(
      this.templatePath('hello.vue'),
      this.destinationPath('src/hello.vue'),
    );

    this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('src/index.html'),
    );

    this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('src/main.js'),
    );

    this.fs.copyTpl(
        this.templatePath('hello.vue'),
        this.destinationPath('src/hello.vue'),
    );

    this.fs.copyTpl(
      this.templatePath('calcul.js'),
      this.destinationPath('src/calcul.js'),
    );

    this.fs.copyTpl(
      this.templatePath('test.spec.js'),
      this.destinationPath('test/calcul.js'),
    );
  } 
};