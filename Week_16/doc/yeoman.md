# Yeoman

工具，用于自定义项目的初始化

```command
sudo npm install -g yo
```

## Generator

[link](https://yeoman.io/authoring/)

* `npm install yeoman-generator`

* `package.json` 中的 `name` 必须以 `generator-` 开头，比如 `generator-demo`

* Yeoman 顺次执行 class 的 `methods`

* Run Yeomen 前，必须将 package 加入全局
    ```command
    // create a symlink in the global folder
    // in folder: generator-demo
    
    sudo npm link
    ```

* run: `yo demo`

## User interactions

[link](https://yeoman.io/authoring/user-interactions.html)

使用 `this.prompt` 获得用户在命令行中的输入

```javascript
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);
```

结果保存在 `answer` 中

## File system

[link](https://yeoman.io/authoring/file-system.html)

* 在 `app` 中创建 `templates`, 放所有的模版放

    ```html
    <html>
        <head>
            <title><%= title %></title>
        </head>
    </html>
    ```

* 创建新项目

    ```javascript
    // app/index.js writing function
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: answers.name + 'is cool ? ' + answers.cool }
    );
    ```

* 执行

    ```command
    cd yeoman-test
    yo yemoman-demo
    ```

    结果： `yeoman-test/public` 中， 生成了 `index.html`

## Managing Dependencies

[link](https://yeoman.io/authoring/dependencies.html)


