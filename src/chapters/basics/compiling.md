<!--
# Compiling OCaml Programs
-->

# 编译 OCaml 程序

<!--
Using OCaml as a kind of interactive calculator can be fun, but we won't get
very far with writing large programs that way. We instead need to store code in
files and compile them.
-->

把 OCaml 当成交互式计算器来玩确实很有趣，但如果你想用这种方式写大型程序，是走不了多远的。我们需要把代码存进文件中，然后对它们进行编译。

<!--
## Storing code in files
-->

## 把代码存进文件

<!--
Open a terminal, create a new directory, and open VS Code in that directory.
For example, you could use the following commands:
-->

打开一个终端，创建一个新目录，然后在那个目录中打开 VS Code。例如，你可以使用下面这些命令：

```console
$ mkdir hello-world
$ cd hello-world
```

```{warning}
<!--
Do not use the root of your Unix home directory as the place you store the file.
The build system we are going to use very soon, dune, might not work right in
the root of your home directory. Instead, you need to use a subdirectory of your
home directory.
-->

不要把文件存放在你的 Unix home 目录根目录下。我们很快就会使用的构建系统 dune，在你的 home 根目录中可能无法正常工作。相反，你需要使用 home 目录中的某个子目录。
```

<!--
Use VS Code to create a new file named `hello.ml`. Enter the following code into
the file:
-->

使用 VS Code 创建一个新文件，命名为 `hello.ml`。然后把下面这段代码写进去：

```ocaml
let _ = print_endline "Hello world!"
```

```{note}
<!--
There is no double semicolon `;;` at the end of that line of code. The double
semicolon is intended for interactive sessions in the toplevel, so that the
toplevel knows you are done entering a piece of code. There's usually no reason
to write it in a .ml file.
-->

这一行代码的末尾没有双分号 `;;`。双分号是给 toplevel 里的交互式会话用的，它让 toplevel 知道你已经输入完了一段代码。在 `.ml` 文件里通常没有理由写它。
```

<!--
The `let _ =` above means that we don't care to give a name (hence the "blank"
or underscore) to code on the right-hand side of the `=`.
-->

上面的 `let _ =` 表示：我们并不打算给 `=` 右边那段代码一个名字（因此使用了「空白」或下划线）。

<!--
Save the file and return to the command line.  Compile the code:
-->

保存文件，然后回到命令行。接着编译这段代码：

```console
$ ocamlc -o hello.byte hello.ml
```

<!--
The compiler is named `ocamlc`. The `-o hello.byte` option says to name the
output executable `hello.byte`. The executable contains compiled OCaml bytecode.
In addition, two other files are produced, `hello.cmi` and `hello.cmo`. We don't
need to be concerned with those files for now. Run the executable:
-->

这个编译器叫做 `ocamlc`。`-o hello.byte` 这个选项表示把输出的可执行文件命名为 `hello.byte`。这个可执行文件中包含的是编译后的 OCaml 字节码。除此之外，还会生成另外两个文件：`hello.cmi` 和 `hello.cmo`。目前我们还不需要关心这两个文件。现在来运行这个可执行文件：

```console
$ ./hello.byte
```

<!--
It should print `Hello world!` and terminate.
-->

它应该会打印出 `Hello world!`，然后结束运行。

<!--
Now change the string that is printed to something of your choice. Save the
file, recompile, and rerun. Try making the code print multiple lines.
-->

现在把输出的字符串改成你自己想写的内容。保存文件，重新编译，再重新运行。也可以试着让这段代码打印出多行内容。

<!--
This edit-compile-run cycle between the editor and the command line is something
that might feel unfamiliar if you're used to working inside IDEs like Eclipse.
Don't worry; it will soon become second nature.
-->

如果你过去习惯于一直待在 Eclipse 这类 IDE 里工作，那么这种在编辑器和命令行之间反复进行「编辑 - 编译 - 运行」的循环，起初可能会让你觉得不太习惯。别担心，它很快就会变成你的第二天性。

<!--
Now let's clean up all those generated files:
-->

现在我们来清理刚才生成出来的那些文件：

```console
$ rm hello.byte hello.cmi hello.cmo
```

<!--
## What about Main?
-->

## 那么 `main` 呢？

<!--
Unlike C or Java, OCaml programs do not need to have a special function named
`main` that is invoked to start the program. The usual idiom is just to have the
very last definition in a file serve as the main function that kicks off
whatever computation is to be done.
-->

和 C 或 Java 不同，OCaml 程序并不需要一个名叫 `main` 的特殊函数来作为程序的入口。通常的习惯用法是：直接让文件中最后一个定义承担起「主函数」的角色，去启动程序需要执行的计算。

<!--
## Dune
-->

## Dune

<!--
In larger projects, we don't want to run the compiler or clean up manually.
Instead, we want to use a *build system* to automatically find and link in
libraries. OCaml has a legacy build system called ocamlbuild, and a newer build
system called Dune. Similar systems include `make`, which has long been used in
the Unix world for C and other languages; and Gradle, Maven, and Ant, which are
used with Java.
-->

在更大的项目中，我们不希望手动运行编译器，也不希望手动清理文件。相反，我们希望使用*构建系统*来自动查找并链接库。OCaml 曾经有一个旧的构建系统，叫做 ocamlbuild；现在则有一个更新的构建系统，叫做 Dune。与它类似的系统还包括 `make`，它长期被 Unix 世界里的 C 和其他语言使用；以及 Java 常用的 Gradle、Maven 和 Ant。

<!--
A Dune *project* is a directory (and its subdirectories) that contain OCaml code
you want to compile. The *root* of a project is the highest directory in its
hierarchy. A project might rely on external *packages* providing additional code
that is already compiled. Usually, packages are installed with OPAM, the OCaml
Package Manager.
-->

Dune *project* 指的是一个包含你想编译的 OCaml 代码的目录（以及其子目录）。一个项目的 *root*，就是这棵目录层级中最高的那个目录。一个项目可能还会依赖一些已经编译好的外部 *package* 来提供额外代码。通常，这些 package 是通过 OCaml 的包管理器 OPAM 安装的。

<!--
Each directory in your project can contain a file named `dune`. That file
describes to Dune how you want the code in that directory (and subdirectories)
to be compiled. Dune files use a functional-programming syntax descended from
LISP called *s-expressions*, in which parentheses are used to show nested data
that form a tree, much like HTML tags do. The syntax of Dune files is documented
in the [Dune manual][dune-man].
-->

你项目中的每一个目录都可以包含一个名为 `dune` 的文件。这个文件用来告诉 Dune：该目录（以及子目录）中的代码应该如何编译。Dune 文件使用一种来自 Lisp 的函数式语法，叫做 *s-表达式*。它用括号表示嵌套数据，从而形成树状结构，这和 HTML 标签有点相似。Dune 文件的具体语法记录在 [Dune manual][dune-man] 中。

[dune-man]: https://dune.readthedocs.io/en/stable/reference/dune/index.html

<!--
### Creating a Dune Project Manually
-->

### 手动创建一个 Dune 项目

<!--
Here is a small example of how to use Dune. In the same directory as `hello.ml`,
create a file named `dune` and put the following in it:
-->

下面是一个使用 Dune 的小例子。在和 `hello.ml` 同一个目录里，创建一个名为 `dune` 的文件，并写入以下内容：

```text
(executable
 (name hello))
```

<!--
That declares an *executable* (a program that can be executed) whose main file
is `hello.ml`.
-->

这表示声明了一个 *executable*（也就是可执行程序），它的主文件是 `hello.ml`。

<!--
Also create a file named `dune-project` and put the following in it:
-->

再创建一个名为 `dune-project` 的文件，并写入以下内容：

```text
(lang dune 3.21)
```

<!--
That tells Dune that this project uses Dune version 3.21, which was current at
the time this version of the textbook was released. This *project* file is
needed in the root directory of every source tree that you want to compile with
Dune. In general, you'll have a `dune` file in every subdirectory of the source
tree but only one `dune-project` file at the root.
-->

这告诉 Dune：这个项目使用的是 Dune 3.21 版本，而这正是本教材这个版本发布时的当前版本。这个 *project* 文件是每一棵你想用 Dune 编译的源码树都必须在根目录中具备的。一般来说，源码树的每个子目录里都可能有一个 `dune` 文件，但根目录中通常只会有一个 `dune-project` 文件。

<!--
Then run this command from the terminal:
-->

然后在终端中运行下面这条命令：

```console
$ dune build hello.exe
```

<!--
Note that the `.exe` extension is used on all platforms by Dune, not just on
Windows. That causes Dune to build a *native* executable rather than a bytecode
executable.
-->

注意，Dune 在所有平台上都会使用 `.exe` 扩展名，而不只是 Windows。这样会让 Dune 构建出一个 *原生* 可执行文件，而不是字节码可执行文件。

<!--
Dune will create a directory `_build` and compile our program inside it. That's
one benefit of the build system over directly running the compiler: instead of
polluting your source directory with a bunch of generated files, they get
cleanly created in a separate directory. Inside `_build` there are many files
that get created by Dune. Our executable is buried a couple of levels down:
-->

Dune 会创建一个 `_build` 目录，并在其中编译我们的程序。这正是构建系统相对于直接运行编译器的一个好处：它不会让你的源码目录被一大堆生成文件污染，而是把这些文件整齐地放进一个独立目录里。在 `_build` 里面，Dune 会生成很多文件。我们的可执行文件则被放在更深几层的路径中：

```console
$ _build/default/hello.exe
Hello world!
```

<!--
But Dune provides a shortcut to having to remember and type all of that.
To build and execute the program in one step, we can simply run:
-->

不过，Dune 也提供了一个捷径，让你不必记住并手敲那一长串路径。要把构建和执行合并成一步，我们只需要运行：

```console
$ dune exec ./hello.exe
Hello world!
```

<!--
Finally, to clean up all the compiled code we just run:
-->

最后，要清理掉所有刚刚编译产生的代码，只需要运行：

```console
$ dune clean
```

<!--
That removes the `_build` directory, leaving just your source code.
-->

这会删除 `_build` 目录，只留下你的源代码。

```{tip}
<!--
When Dune compiles your program, it caches a copy of your source files in
`_build/default`. If you ever accidentally make a mistake that results in loss
of a source file, you might be able to recover it from inside `_build`. Of
course, using source control like git is also advisable.
-->

当 Dune 编译你的程序时，它会在 `_build/default` 中缓存一份源文件副本。如果你哪天不小心犯了个错误，导致源文件丢失，那么也许还能从 `_build` 中把它救回来。当然，使用像 git 这样的版本控制系统仍然是非常值得推荐的。
```

```{warning}
<!--
Do not edit any of the files in the `_build` directory. If you ever get an error about trying to save a file that is read-only, you maybe are attempting to edit a file in the `_build` directory.
-->

不要编辑 `_build` 目录中的任何文件。如果你曾经碰到某个文件无法保存、并提示它是只读的错误，那么你很可能就是误改了 `_build` 目录里的文件。
```

<!--
### Creating a Dune Project Automatically
-->

### 自动创建一个 Dune 项目

<!--
In the terminal, change to a directory where you want to store your work, for example, "~/work". Pick a name for your project, such as "calculator". Run:
-->

在终端中，切换到一个你想存放工作内容的目录，例如 `~/work`。然后为你的项目起个名字，比如 `calculator`。接着运行：

```console
$ dune init project calculator
$ cd calculator
$ code .
```

<!--
You should now have VS Code open and see the files that Dune automatically generated for your project.
-->

这时你应该已经打开了 VS Code，并能看到 Dune 为该项目自动生成的那些文件。

<!--
From the terminal in the `calculator` directory, run:
-->

在 `calculator` 目录中的终端里运行：

```console
$ dune exec bin/main.exe
```

<!--
It will print `Hello, World!`
-->

它会打印出 `Hello, World!`

```{tip}
<!--
If you use ocamlformat to automatically format your source code, note that Dune does not add a `.ocamlformat` file to your project automatically. You might want to add one in the top-level directory, aka the *root*, of your project. That is the directory that has the file named `dune-project` in it.
-->

如果你使用 ocamlformat 来自动格式化源代码，需要注意：Dune 并不会自动为你的项目添加 `.ocamlformat` 文件。你可能会想手动在项目最顶层的目录，也就是 *root* 目录中添加一个。这个目录就是包含 `dune-project` 文件的那个目录。
```

<!--
### Running Dune Continuously
-->

### 持续运行 Dune

<!--
When you run `dune build`, it compiles your project once. You might want to have your code compiled automatically every time you save a file in your project. To accomplish that, run this command:
-->

当你运行 `dune build` 时，它只会把你的项目编译一次。你可能希望每次在项目中保存文件时，代码都能自动重新编译。要做到这一点，可以运行下面这条命令：

```console
$ dune build --watch
```

<!--
Dune will respond that it is waiting for filesystem changes. That means Dune is now running continuously and rebuilding your project every time you save a file in VS Code. To stop Dune, press Control+C.
-->

Dune 会提示它正在等待文件系统变化。这意味着 Dune 现在已经开始持续运行，并且每当你在 VS Code 中保存文件时，它都会自动重新构建项目。要停止 Dune，按 `Control+C` 即可。
