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
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {}
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    
    this.npmInstall(["vue"], { 'save-dev': false });
    this.npmInstall(["webpack", "vue-loader"], { 'save-dev': true });
  }
};