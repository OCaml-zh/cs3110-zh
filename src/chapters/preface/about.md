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
thebe-kernel: ocaml-jupyter
---

<!--
# About This Book
-->

# 关于本书

<!--
**Reporting Errors.** If you find an error, please report it! Or if you have a
suggestion about how to rewrite some part of the book, let us know. Just go to
the page of the book for which you'd like to make a suggestion, click on the
GitHub icon (it looks like a cat) near the top right of the page, and click
"open issue" or "suggest edit". The latter is a little heavier weight, because
it requires you to fork the textbook repository with GitHub. But for minor edits
that will be appreciated and lead to much quicker uptake of suggestions.
-->

**勘误反馈。** 如果你发现了错误，请务必告诉我们！如果你对本书某一部分的改写方式有建议，也欢迎联系我们。你只需要进入想提出建议的那一页，点击页面右上角附近的 GitHub 图标（看起来像一只猫），然后点击 「open issue」 或 「suggest edit」。后者会稍微重一些，因为它要求你先在 GitHub 上 fork 教材仓库。不过对于小修改来说，这种方式会很受欢迎，也能让建议更快被采纳。

<!--
**Background.** This book is used at Cornell for a third-semester programming
course. Most students have had one semester of introductory programming in
Python, followed by one semester of object-oriented programming in Java.
Frequent comparisons are therefore made to those two languages. Readers who have
studied similar languages should have no difficulty following along. The book
does not assume any prior knowledge of functional programming, but it does
assume that readers have prior experience programming in some mainstream
imperative language. Knowledge of discrete mathematics at the level of a
standard first-semester CS course is also assumed.
-->

**背景。** 这本书在康奈尔大学被用于一门第三学期的程序设计课程。大多数学生此前都上过一学期的 Python 入门编程课程，以及一学期的 Java 面向对象编程课程。因此，书中会经常把内容和这两门语言进行比较。学过类似语言的读者读起来一般不会有困难。本书不预设你已经学过函数式编程，但默认你已经有某种主流命令式语言的编程经验。同时也默认你具备标准计算机科学第一学期课程水平的离散数学知识。

<!--
**Videos.** You will find over 200 YouTube videos embedded throughout this
book. The videos usually provide an introduction to material, upon which the
textbook then expands. These videos were produced during pandemic when the
Cornell course that uses this textbook, CS 3110, had to be asynchronous. The
student response to them was overwhelmingly positive, so they are now being made
public as part of the textbook. But just so you know, they were not produced by
a professional A/V team&mdash;just a guy in his basement who was learning as he
went.
-->

**视频。** 这本书中嵌入了两百多个 YouTube 视频。这些视频通常先对相关内容做一个引入，然后教材正文再在此基础上展开讲解。这些视频制作于疫情期间，当时使用本教材的康奈尔课程 CS 3110 不得不改为异步授课。学生对这些视频的反馈极其积极，因此现在它们也作为教材的一部分公开发布。不过也提前说明一下：这些视频并不是由专业视听团队制作的，而只是一个人在自家地下室里一边学一边录出来的。

<!--
The videos mostly use the versions of OCaml and its ecosystem that were current
in Fall 2020. Current versions you are using are likely to look different from
the videos, but don't be alarmed: the underlying ideas are the same. The most
visible difference is likely to be the VS Code plugin for OCaml. In Fall 2020
the badly-aging "OCaml and Reason IDE" plugin was still being used. It has since
been superseded by the "OCaml Platform" plugin.
-->

这些视频大多使用的是 2020 年秋季当时最新版的 OCaml 及其生态。你现在实际使用的版本看起来很可能会和视频里不一样，但不用担心：底层思想是相同的。最显眼的差别大概会出现在 VS Code 的 OCaml 插件上。2020 年秋季时，大家还在使用已经明显老化的 「OCaml and Reason IDE」 插件；如今它已经被 「OCaml Platform」 插件取代了。

<!--
The textbook and videos sometimes cover topics in different orders.
The videos are placed in the textbook nearest to the topic they cover. To watch
the videos in their original order, start with this [YouTube playlist][videos].
-->

教材和视频有时会以不同的顺序覆盖主题。书中的视频会被放在离其对应主题最近的位置。如果你想按照视频最初录制时的顺序观看，可以从这个 [YouTube 播放列表][videos] 开始。

[videos]: https://www.youtube.com/playlist?list=PLre5AT9JnKShBOPeuiD9b-I4XROIJhkIU

<!--
**Collaborative Annotations.** At the right margin of each page, you will find
an annotation feature provided by [hypothes.is][hypothesis]. You can use this to
highlight and make private notes as you study the text. You can form study
groups to share your annotations, or share them publicly. Check out these
[tips for how to annotate effectively][tips].
-->

**协作批注。** 在每一页的右侧边栏，你都会看到由 [hypothes.is][hypothesis] 提供的批注功能。你可以在阅读时用它来高亮文本并做私人笔记。你也可以和同学组成学习小组来共享批注，或者直接公开分享。可以参考这份[如何高效做批注的建议][tips]。

[hypothesis]: https://web.hypothes.is/
[tips]: https://web.hypothes.is/annotation-tips-for-students/

<!--
**Executable Code.** Many pages of this book have OCaml code embedded in them.
The output of that code is already shown in the book. Here's an example:
-->

**可执行代码。** 本书的很多页面都嵌入了 OCaml 代码。这些代码的输出已经直接显示在书里。下面是一个例子：

```{code-cell} ocaml
print_endline "Hello world!"
```

<!--
You can also edit and re-run the code yourself to experiment and check your
understanding.  Look for the icon near the top right of the page that looks
like a rocket ship.  In the drop-down menu you'll find two ways to interact
with the code:
-->

你也可以亲自编辑并重新运行这些代码，用来做实验并检验自己的理解。请找到页面右上角附近那个像火箭一样的图标。在它的下拉菜单里，你会看到两种与代码交互的方式：

<!--
- *Binder* will launch the site [mybinder.org](https://mybinder.org), which is a
  free cloud-based service for "reproducible, interactive, shareable environments
  for science at scale." All the computation happens in their cloud servers, but
  the UI is provided through your browser. It will take a little while for the
  textbook page to open in Binder. Once it does, you can edit and run the code
  in a [*Jupyter notebook*][jupyter]. Jupyter notebooks are documents (usually
  ending in the `.ipynb` extension) that can be viewed in web browsers and used
  to write narrative content as well as code. They became popular in data
  science communities (especially Python, R, and Julia) as a way of sharing
  analyses. Now many languages can run in Jupyter notebooks, including OCaml.
  Code and text are written in *cells* in a Jupyter notebook. Look at the "Cell"
  menu in it for commands to run cells. Note that Shift-Enter is usually a
  hotkey for running the cell that has focus.
-->

- *Binder* 会启动 [mybinder.org](https://mybinder.org)。这是一个免费的云端服务，主打「可复现、可交互、可分享的大规模科研环境」。所有计算都发生在它们的云服务器上，但界面是通过浏览器提供给你的。教材页面在 Binder 里打开需要一点时间。页面打开后，你就可以在 [*Jupyter notebook*][jupyter] 中编辑和运行代码。Jupyter notebook 是一种文档（通常以 `.ipynb` 为扩展名），可以在网页浏览器中查看，也可以同时书写叙述性内容和代码。它最早在数据科学社区中流行起来，尤其是在 Python、R 和 Julia 社区里，常被用来分享分析过程。现在很多语言都能在 Jupyter notebook 中运行，包括 OCaml。Jupyter notebook 里的代码和文字都是写在 *cell* 里的。你可以查看其中的 「Cell」 菜单来找到运行 cell 的命令。通常 `Shift-Enter` 是运行当前焦点所在 cell 的快捷键。

<!--
- *Live Code* will actually do about the same thing, except that instead of
  leaving the current textbook page and taking you off to Binder, it will modify
  the code cells on the page to be editable. It takes some time for the
  connection to be made behind the scenes, during which you will see "Waiting
  for kernel". After the connection has been made, you can edit all the code
  cells on the page and re-run them. If the connection fails, then first launch
  the Binder site; this can take a long time. After it succeeds and loads the
  textbook page as a Jupyter notebook, you can close Binder, reload the textbook
  page, and launch Live Code again. It should now be successful at connecting
  relatively quickly.
-->

- *Live Code* 做的事情其实差不多，只不过它不会让你离开当前教材页面跳转到 Binder，而是会直接把当前页面上的代码单元变成可编辑状态。后台建立连接需要一点时间，在这期间你会看到 「Waiting for kernel」。连接建立后，你就可以编辑页面上的所有代码单元并重新运行它们。如果连接失败，那就先启动 Binder 站点；这一步可能会花比较久。等它成功加载出教材页面对应的 Jupyter notebook 后，你可以关闭 Binder，重新加载教材页面，再次启动 Live Code。这样通常就能比较快地成功连上了。

<!--
Try interacting with the cell above now to make it print a string of your choice.
How about: `"Camels are bae."`
-->

现在就试着和上面的 cell 交互一下，让它打印出你自己选的一段字符串吧。比如：`"Camels are bae."`

```{tip}
<!--
When you write "real" OCaml code, this is not the interface you'll be using.
You'll write code in an editor such as Visual Studio Code or Emacs, and you'll
compile it from a terminal. Binder and Live Code are just for interacting
seamlessly with the textbook.
-->

当你真正开始写「正式的」OCaml 代码时，你并不会使用这里这种界面。你会在 Visual Studio Code 或 Emacs 之类的编辑器中写代码，然后在终端里编译它。Binder 和 Live Code 只是为了让你能更顺滑地和这本教材交互。
```

<!--
**Downloadable Pages.** Each page of this book is downloadable in a variety of
formats. The download icon is at the top right of each page. You'll always find
the original source code of the page, which is usually [Markdown][md]&mdash;or
more precisely [MyST Markdown][myst], which is an extension of Markdown for
technical writing. Each page is also individually available as PDF, which simply
prints from your browser. For the entire book as a PDF, see the paragraph about
that below.
-->

**可下载页面。** 本书的每一页都可以下载成多种格式。下载图标位于每一页的右上角。你总能拿到该页面的原始源文件，它通常是 [Markdown][md]，更准确地说，是 [MyST Markdown][myst]，这是一个面向技术写作的 Markdown 扩展。每一页也都可以单独导出成 PDF，本质上就是通过浏览器打印得到。至于整本书的 PDF，请见下文对应段落。

<!--
Pages with OCaml code cells embedded in them can also be downloaded as Jupyter
notebooks. To run those locally on your own machine (instead of in the cloud on
Binder), you'll need to install Jupyter. The easiest way of doing that is
typically to install [Anaconda][anaconda]. Then you'll need to install
[OCaml Jupyter][ocaml-jupyter], which requires that you already have OCaml
installed. To be clear, there's no need to install Jupyter or to use notebooks.
It's just another way to interact with this textbook beyond reading it.
-->

嵌有 OCaml 代码单元的页面也可以下载成 Jupyter notebook。要想在你自己的机器上本地运行这些 notebook（而不是在 Binder 的云端运行），你需要先安装 Jupyter。通常最简单的做法是安装 [Anaconda][anaconda]。然后你还需要安装 [OCaml Jupyter][ocaml-jupyter]，而这又要求你已经先装好了 OCaml。说明白一点：你并不一定需要安装 Jupyter，也不一定需要使用 notebook。它只是除了阅读之外，和这本教材交互的另一种方式。

[md]: https://en.wikipedia.org/wiki/Markdown
[myst]: https://myst-parser.readthedocs.io/en/latest/
[jupyter]: https://jupyter.org/
[anaconda]: https://www.anaconda.com/
[ocaml-jupyter]: https://github.com/akabe/ocaml-jupyter

<!--
**Exercises and Solutions.** At the end of each chapter except the first, you
will find a section of exercises. The exercises are annotated with a difficulty
rating:
-->

**习题与解答。** 除第一章外，每一章的结尾都有一个习题部分。习题会标注难度等级：

<!--
* One star [&starf;]: easy exercises that should take only a minute or two.
-->

* [&starf;] 一星：比较简单的习题，通常只需要一两分钟。

<!--
* Two stars [&starf;&starf;]: straightforward exercises that should take a few
  minutes.
-->

* [&starf;&starf;] 两星：比较直接的习题，大概需要几分钟。

<!--
* Three stars [&starf;&starf;&starf;]: exercises that might require anywhere
  from five to twenty minutes or so.
-->

* [&starf;&starf;&starf;] 三星：可能需要五到二十分钟左右的习题。

<!--
* Four [&starf;&starf;&starf;&starf;] or more stars: challenging or
  time-consuming exercises provided for students who want to dig deeper into the
  material.
-->

* [&starf;&starf;&starf;&starf;] 四星及以上：更有挑战性、也更耗时的习题，面向希望更深入钻研材料的学生。

<!--
It's possible we've misjudged the difficulty of a problem from time to time. Let
us know if you think an annotation is off.
-->

我们有时也可能会误判某道题的难度。如果你觉得某个难度标注不太对，欢迎告诉我们。

<!--
Please do not post your solutions to the exercises anywhere, especially not in
public repositories where they could be found by search engines. {{ solutions }}
-->

请不要把你的习题解答发布到任何地方，尤其不要放到会被搜索引擎索引到的公开仓库里。{{ solutions }}

<!--
**PDF.** A <a href="../../ocaml_programming.pdf">full PDF version of this
book</a> is available. It does not contain the embedded videos, annotations, or
other features that the HTML version has. It might also have typesetting errors.
At this time, no tablet (ePub, etc.) version is available, but most tablets will
let you import PDFs.
-->

**PDF。** 你可以获取这本书的<a href="../../ocaml_programming.pdf">完整 PDF 版本</a>。它不包含 HTML 版本里的嵌入视频、批注或其他交互功能，也可能还存在一些排版错误。目前暂时没有平板阅读格式（如 ePub 等）的版本，不过大多数平板设备都支持导入 PDF。
