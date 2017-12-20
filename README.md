
 ## 特别声明
 >  本cli是完全fork自大神jrainlau，只是做了非常简单的署名修改，源地址为：https://github.com/jrainlau/scion 。  如有侵权，请联系我删除。

# Usage
打开terminal或 cmd ，输入`alan` or `alan -h` ，你将看到如下信息:
```
  Usage: alan <command>


  Commands:

    add|a      Add a new template
    list|l     List all the templates
    init|i     Generate a new project
    delete|d   Delete a template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> 如果你是在使用 `MacOS`, `sudo`必须要加载 `add`和 `delete`命令前.

# Commands
### list | l
这个命令会展示当前脚手架的模板列表.
```
$ alan list

┌────────────────────┬────────────────┬────────┐
│ Template Name      │ Owner/Name     │ Branch │
├────────────────────┼────────────────┼────────┤
│  simple            │ simple-template│ master │
├────────────────────┼────────────────┼────────┤
│  react             │ react-template │ master │
├────────────────────┼────────────────┼────────┤
```
目前支持两者模板，一个[simple](https://github.com/alanchenchen/simple-template)，一个[react](https://github.com/alanchenchen/react-template)，详情请看模板仓库
### init | i
初始化新项目，初始化过程会有3次问答，Template name是模板名称，`simple`或者`react`，Project name是项目名称，第三个问题是在哪个地方初始化项目，默认是当前目录，建议直接按enter.
```
$ alan init

? Template name: my-first-template
? Project name: my-project
? Where to init the project? ../
⠹ Downloading template...

New project has been initialized successfully!
```
# License
MIT.









