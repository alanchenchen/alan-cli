
 ## 特别声明
 >  本cli是完全fork自大神jrainlau，只是做了非常简单的署名修改，源地址为：https://github.com/jrainlau/scion 。  如有侵权，请联系我删除。

# Usage
Open your terminal and type `alan` or `alan -h` , you'll see the help infomation below:
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

> Note that if you are using `MacOS`, `sudo` was required while using commands `add` and `delete`.

# Commands
### list | l
It shows you the templates list.
```
$ alan list

┌────────────────────┬────────────────┬────────┐
│ Template Name      │ Owner/Name     │ Branch │
├────────────────────┼────────────────┼────────┤
│  simple            │ alan/simple    │ master │
├────────────────────┼────────────────┼────────┤
```

### init | i
After adding new templates, you could use this command to generate your own project by choosing template.
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









