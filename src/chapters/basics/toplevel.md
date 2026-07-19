---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.10.3
kernelspec:
  display_name: OCaml
  language: OCaml
  name: ocaml-jupyter
---

<!--
# The OCaml Toplevel
-->

# OCaml 顶层

{{ video_embed | replace("%%VID%%", "3fzrFY-2ZQ8")}}

<!--
The *toplevel* is like a calculator or command-line interface to OCaml. It's
similar to JShell for Java, or the interactive Python interpreter. The toplevel
is handy for trying out small pieces of code without going to the trouble of
launching the OCaml compiler. But don't get too reliant on it, because creating,
compiling, and testing large programs will require more powerful tools. Some
other languages would call the toplevel a *REPL*, which stands for
read-eval-print-loop: it reads programmer input, evaluates it, prints the
result, and then repeats.
-->

*toplevel* 就像是 OCaml 的计算器或命令行界面。它和 Java 的 JShell，或者 Python 的交互式解释器很相似。toplevel 很适合拿来尝试一些小段代码，而不必专门去启动 OCaml 编译器。但也不要对它过于依赖，因为一旦你要创建、编译和测试大型程序，就需要更强大的工具了。在其他一些语言里，toplevel 会被称作 *REPL*，即 read-eval-print-loop：它读取程序员的输入，对其求值，打印结果，然后重复这一过程。

<!--
In a terminal window, type `utop` to start the toplevel. Press Control-D to exit
the toplevel. You can also enter `#quit;;` and press return. Note that you must
type the `#` there: it is in addition to the `#` prompt you already see.
-->

在终端窗口中输入 `utop` 即可启动 toplevel。按 `Control-D` 可以退出 toplevel。你也可以输入 `#quit;;` 然后按回车。注意，这里的 `#` 必须手动输入；它是在你已经看到的那个 `#` 提示符之外额外再输入的一个字符。

<!--
## Types and values
-->

## 类型与值

<!--
You can enter expressions into the OCaml toplevel. End an expression with a
double semicolon `;;` and press the return key. OCaml will then evaluate the
expression, tell you the resulting value, and the value's type. For example:
-->

你可以在 OCaml toplevel 中输入表达式。用双分号 `;;` 结束一个表达式，然后按回车。OCaml 随后会对该表达式求值，并告诉你所得的值以及这个值的类型。例如：

```ocaml
# 42;;
- : int = 42
```

<!--
Let's dissect that response from utop, reading right to left:
-->

我们来拆解一下 utop 的这个响应，从右往左读：

<!--
* `42` is the value.
* `int` is the type of the value.
* The value was not given a name, hence the symbol `-`.
-->

* `42` 是这个值。
* `int` 是这个值的类型。
* 这个值没有被赋予名字，因此显示为符号 `-`。

<!--
That utop interaction was "hardcoded" as part of this book. We had to type in
all the characters: the `#`, the `-`, etc. But the infrastructure used to write
this book actually enables us to write code that is evaluated by OCaml at the
time the book is translated into HTML or PDF. From now on, that's usually what
we will do.  It looks like this:
-->

刚才那段 utop 交互是作为本书内容被「硬编码」进去的。也就是说，其中所有字符，包括 `#`、`-` 等等，都是我们手动敲出来的。不过，这本书使用的基础设施其实支持另一种方式：我们可以直接写下由 OCaml 在生成 HTML 或 PDF 时自动求值的代码。从现在开始，我们通常都会采用那种方式。它看起来像这样：

```{code-cell} ocaml
42
```

<!--
The first code block with the `42` in it is the code we asked OCaml to run. If
you want to enter that into utop, you can copy and paste it. There's an icon in
the top right of the block to do that easily. Just remember to add the double
semicolon at the end. The second code block, which is indented a little, is the
output from OCaml as the book was being translated.
-->

第一个含有 `42` 的代码块，就是我们要求 OCaml 执行的代码。如果你想把它输入到 utop 中，可以直接复制粘贴。代码块右上角有一个图标，能方便你完成这件事。只要记得在末尾再补上双分号即可。第二个稍微缩进了一点的代码块，则是本书在生成时由 OCaml 给出的输出。

```{tip}
<!--
If you're viewing this in a web browser, look to the top right for a download
icon. Choose the `.md` option, and you'll see the original
[MyST Markdown][myst] source code for this page of the book. You'll see that the
output from the second example above is not actually present in the source code.
That's good! It means that the output stays consistent with whatever current
version of the OCaml compiler we use to build the book. It also means that any
compilation errors can be detected as part of building the book, instead of
lurking for you, dear reader, to find them.
-->

如果你是在浏览器里阅读本书，请看看右上角的下载图标。选择 `.md` 选项之后，你就会看到这一页原始的 [MyST Markdown][myst] 源代码。你会发现，上面第二个示例中的输出实际上并不在源代码里。这样很好！这意味着输出会始终与我们当前用来构建本书的 OCaml 编译器版本保持一致；也意味着任何编译错误都可以在构建本书时就被发现，而不必潜伏起来，等你这位亲爱的读者来撞见。
```

[myst]: https://myst-parser.readthedocs.io/en/latest/

{{ video_embed | replace("%%VID%%", "eRnG4gwOTlI")}}

<!--
You can bind values to names with a `let` definition, as follows:
-->

你可以通过 `let` 定义把值绑定到名字上，例如：

```{code-cell} ocaml
let x = 42
```

<!--
Again, let's dissect that response, this time reading left to right:
-->

我们再来拆解一下这个响应，这次从左往右看：

<!--
* A value was bound to a name, hence the `val` keyword.
* `x` is the name to which the value was bound.
* `int` is the type of the value.
* `42` is the value.
-->

* 一个值被绑定到了某个名字上，因此出现了 `val` 关键字。
* `x` 是这个值所绑定到的名字。
* `int` 是这个值的类型。
* `42` 是这个值本身。

<!--
You can pronounce the entire output as "`x` has type `int` and equals `42`."
-->

你可以把整个输出读作：「`x` 的类型是 `int`，它的值等于 `42`。」

<!--
## Functions
-->

## 函数

<!--
A function can be defined at the toplevel using syntax like this:
-->

你可以在 toplevel 中用如下语法定义函数：

```{code-cell} ocaml
let increment x = x + 1
```

<!--
Let's dissect that response:
-->

我们来拆解一下这个响应：

<!--
* `increment` is the identifier to which the value was bound.
* `int -> int` is the type of the value. This is the type of functions that take
  an `int` as input and produce an `int` as output. Think of the arrow `->` as a
  kind of visual metaphor for the transformation of one value into another
  value&mdash;which is what functions do.
* The value is a function, which the toplevel chooses not to print (because it
  has now been compiled and has a representation in memory that isn't easily
  amenable to pretty printing). Instead, the toplevel prints `<fun>`, which is
  just a placeholder.
-->

* `increment` 是这个值所绑定到的标识符。
* `int -> int` 是这个值的类型。这表示一种函数类型：输入一个 `int`，输出一个 `int`。你可以把箭头 `->` 看成一种视觉隐喻，表示一个值被变换成另一个值，这也正是函数所做的事情。
* 这个值本身是一个函数，而 toplevel 选择不把它真正打印出来（因为它现在已经被编译，并且在内存中的表示形式并不容易美观地展示）。因此，toplevel 会打印 `<fun>`，它只是一个占位符。

```{note}
<!--
`<fun>` itself is not a value. It just indicates an unprintable function value.
-->

`<fun>` 本身并不是一个值。它只是用来表示「这里有一个无法直接打印的函数值」。
```

<!--
You can "call" functions with syntax like this:
-->

你可以用下面这样的语法来「调用」函数：

```{code-cell} ocaml
increment 0
```

```{code-cell} ocaml
increment(21)
```

```{code-cell} ocaml
increment (increment 5)
```

<!--
But in OCaml the usual vocabulary is that we "apply" the function rather than
"call" it.
-->

不过在 OCaml 中，更常见的说法并不是「调用」函数，而是把函数「应用」到参数上。

<!--
Note how OCaml is flexible about whether you write the parentheses or not, and
whether you write whitespace or not. One of the challenges of first learning
OCaml can be figuring out when parentheses are actually required. So if you find
yourself having problems with syntax errors, one strategy is to try adding some
parentheses. The preferred style, though, is usually to omit parentheses when
they are not needed. So, `increment 21` is better than `increment(21)`.
-->

注意，OCaml 对你是否写括号、是否写空格都相当灵活。刚开始学习 OCaml 时，一个难点就在于弄清楚：到底什么时候括号才是真正必须的。因此，如果你发现自己老是遇到语法错误，一个策略就是试着多加几个括号。不过，更推荐的风格通常是在不需要时省略括号。所以，`increment 21` 会比 `increment(21)` 更好。

<!--
## Loading code in the toplevel
-->

## 在 toplevel 中加载代码

<!--
In addition to allowing you to define functions, the toplevel will also accept
*directives* that are not OCaml code but rather tell the toplevel itself to do
something. All directives begin with the `#` character. Perhaps the most common
directive is `#use`, which loads all the code from a file into the toplevel,
just as if you had typed the code from that file into the toplevel.
-->

除了允许你定义函数之外，toplevel 还接受一些*指令*。这些指令并不是 OCaml 代码，而是告诉 toplevel 自己去做某些事情。所有指令都以 `#` 字符开头。也许最常见的指令就是 `#use`，它会把某个文件中的全部代码加载进 toplevel，就好像你把那个文件里的代码逐行敲进了 toplevel 一样。

<!--
For example, suppose you create a file named `mycode.ml`. In that file put the
following code:
-->

例如，假设你创建了一个名为 `mycode.ml` 的文件，并在其中写入下面这段代码：

```ocaml
let inc x = x + 1
```

<!--
Start the toplevel. Try entering the following expression, and observe the
error:
-->

启动 toplevel。然后尝试输入下面这个表达式，并观察报错：

```{code-cell} ocaml
:tags: ["raises-exception"]
inc 3
```

<!--
The error occurs because the toplevel does not yet know anything about a
function named `inc`. Now issue the following directive to the toplevel:
-->

这个错误出现，是因为 toplevel 目前还不知道有一个名叫 `inc` 的函数。现在对 toplevel 输入下面这条指令：

```ocaml
# #use "mycode.ml";;
```

<!--
Note that the first `#` character above indicates the toplevel prompt to you.
The second `#` character is one that you type to tell the toplevel that you are
issuing a directive. Without that character, the toplevel would think that you
are trying to apply a function named `use`.
-->

注意，上面第一个 `#` 是展示给你的 toplevel 提示符。第二个 `#` 才是你要自己输入的那个字符，用来告诉 toplevel：你正在发出一条指令。如果没有这个字符，toplevel 会以为你是在尝试应用一个名叫 `use` 的函数。

<!--
Now try again:
-->

现在再试一次：

```{code-cell} ocaml
:tags: ["remove-cell"]
let inc x = x + 1
```

```{code-cell} ocaml
inc 3
```

<!--
## Workflow in the toplevel
-->

## 在 toplevel 中的工作流

<!--
The best workflow when using the toplevel with code stored in files is:
-->

当你把代码保存在文件里，同时又配合 toplevel 使用时，最好的工作流是：

<!--
* Edit the code in the file.
* Load the code in the toplevel with `#use`.
* Interactively test the code.
* Exit the toplevel.  **Warning:** do not skip this step.
-->

* 在文件中编辑代码。
* 使用 `#use` 把代码加载进 toplevel。
* 以交互方式测试代码。
* 退出 toplevel。**警告：** 不要跳过这一步。

```{tip}
<!--
Suppose you wanted to fix a bug in your code. It's tempting to not exit the
toplevel, edit the file, and re-issue the `#use` directive into the same
toplevel session. Resist that temptation. The "stale code" that was loaded from
an earlier `#use` directive in the same session can cause surprising things to
happen&mdash;surprising when you're first learning the language, anyway. So
**always exit the toplevel before re-using a file.**
-->

假设你想修复代码里的一个 bug。你很容易会想：那我就不退出 toplevel 了，直接改文件，然后在同一个 toplevel 会话里重新执行一次 `#use` 指令。请克制住这种冲动。在同一个会话中，较早一次 `#use` 加载进来的「陈旧代码」可能会引发一些令人意外的现象，尤其是在你刚开始学习这门语言的时候。所以，**每次重新使用文件之前，都一定要先退出 toplevel。**
```
