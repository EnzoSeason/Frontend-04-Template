# Git Hooks

在 `.git/hooks` 中， 定义 hooks：

* pre-commit: 做 lint 的操作

* pre-push: 做 check 的操作 

注意添加执行的权限：`chmod +x ./pre-commit`

文件的第一行，提供脚本引擎

```shell
#!/usr/bin/env node
```

## ESLint API

在 Git Hooks 中，使用 ESLint API