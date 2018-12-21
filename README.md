
# alan-cli

![](https://img.shields.io/npm/v/alan-cli.svg)
![](https://img.shields.io/npm/dt/alan-cli.svg)
![](https://img.shields.io/github/license/alanchenchen/alan-cli.svg)

A simple CLI for creating your projects
> Author：Alan Chen

> E-mail: 739709491@qq.com

> version: 1.1.1

> date: 2018/08/08

<!-- ## 特别声明
>  本cli是完全fork自大神jrainlau，只是做了非常简单的署名修改，源地址为：https://github.com/jrainlau/scion 。  如有侵权，请联系我删除。 -->
## Feature
一款轻量的前端CLI工具，支持自定义添加模板，删除模板，和初始化项目。不仅仅局限于webpack模板，初始化项目其实就是将模板对应的github仓库拷贝到本地。目前CLI内置了3款webpack模板，用于解决多种开发场景配置繁琐的问题。

## Usage
全局安装alan-cli。`npm install -g alan-cli`

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

## Commands
### list | l
这个命令会展示当前脚手架的模板列表.
```
$ alan list
┌───────────────┬──────────────────────────┬───────────────────────────────┬────────┐
│ Template Name │ Description              │ Owner/Name                    │ Branch │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ simple        │ building mutiple entries │ alanchenchen/simple-template  │ master │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ react         │ building react SPA       │ alanchenchen/react-template   │ master │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ library       │ building npm library     │ alanchenchen/library-template │ master │
└───────────────┴──────────────────────────┴───────────────────────────────┴────────┘
```
目前内置了3个模板,详情请看模板仓库 :
  * [simple](https://github.com/alanchenchen/simple-template)
  * [react](https://github.com/alanchenchen/react-template)
  * [library](https://github.com/alanchenchen/library-template)

### init | i
初始化新项目，初始化过程会有3次问答，Template name是模板名称，选择`simple`，`react`或者`library`，Project name是项目名称，第三个问题是在哪个地方初始化项目，默认是当前目录，建议直接按enter.
```
$ alan init

? Template name: simple    building mutiple entries
? Project name: demo
? Where to init the project: ./
New project has been initialized successfully!
      cd demo
      npm install or yarn
```

### add|a
如果你有自定义的模板，也可以自定义添加到本地。甚至你可以直接将github某一仓库模板添加到本地模板列表。模板添加后会自动展示出当前模板列表
```
$ alan add

? Set the custom name of the template: library
? Set the short description of the template: building npm library
? Owner/name of the template: alanchenchen/library-template
? Branch of the template: master
┌───────────────┬──────────────────────────┬───────────────────────────────┬────────┐
│ Template Name │ Description              │ Owner/Name                    │ Branch │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ simple        │ building mutiple entries │ alanchenchen/simple-template  │ master │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ react         │ building react SPA       │ alanchenchen/react-template   │ master │
├───────────────┼──────────────────────────┼───────────────────────────────┼────────┤
│ library       │ building npm library     │ alanchenchen/library-template │ master │
└───────────────┴──────────────────────────┴───────────────────────────────┴────────┘
```

## Thanks to
* [scion](https://github.com/jrainlau/scion)







