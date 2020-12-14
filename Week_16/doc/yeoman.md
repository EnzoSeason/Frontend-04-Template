# Yeoman

```command
sudo npm install -g yo
```

## YEOMAN GENERATOR

[YEOMAN GENERATOR](https://yeoman.io/authoring/)

* `package.json` 中的 `name` 必须以 `generator-` 开头，比如 `generator-demo`

* Yeoman 顺次执行 class 的 `methods`

* Run Yeomen 前，必须将 package 加入全局
    ```command
    // create a symlink in the global folder
    // in folder: generator-demo
    
    sudo npm link
    ```

* run: `yo demo`


