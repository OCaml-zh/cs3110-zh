<!--
# The Basics of OCaml
-->

# OCaml 基础

<!--
This chapter will cover some of the basic features of OCaml. But before we dive
in to learning OCaml, let's first talk about a bigger idea: learning languages
in general.
-->

本章将介绍 OCaml 的一些基础特性。但在我们真正开始学习 OCaml 之前，不妨先谈一个更大的话题：如何学习语言本身。

<!--
One of the secondary goals of this course is not just for you to learn a new
programming language, but to improve your skills at learning *how to learn* new
languages.
-->

这门课程的一个次要目标，不只是让你学会一门新的编程语言，更是希望提升你学习「如何学习」新语言的能力。

{{ video_embed | replace("%%VID%%", "A5IHFZtRfBs")}}

<!--
There are five essential components to learning a language: syntax, semantics,
idioms, libraries, and tools.
-->

学习一门语言有五个关键组成部分：语法、语义、习惯用法、库，以及工具。

<!--
**Syntax.** By *syntax*, we mean the rules that define what constitutes a
textually well-formed program in the language, including the keywords,
restrictions on whitespace and formatting, punctuation, operators, etc. One of
the more annoying aspects of learning a new language can be that the syntax
feels odd compared to languages you already know. But the more languages you
learn, the more you'll become used to accepting the syntax of the language for
what it is, rather than wishing it were different. (If you want to see some
languages with really unusual syntax, take a look at [APL][tryapl], which needs
its own extended keyboard, and [Whitespace][whitespace], in which programs
consist entirely of spaces, tabs, and newlines.) You need to understand syntax
just to be able to speak to the computer at all.
-->

**语法。** 所谓*语法*，指的是一门语言中哪些文本形式才算是「格式良好的程序」的规则，其中包括关键字、空白与格式的限制、标点、运算符，等等。学习一门新语言时，一个比较烦人的地方就在于：它的语法常常会让你觉得很别扭，因为它和你早就会的那些语言不太一样。但你学过的语言越多，你就越会习惯于按语言本来的样子去接受它的语法，而不是总想着「它要是能换一种写法就好了」。 （如果你想看看一些语法真的非常奇特的语言，可以去看看 [APL][tryapl]，它甚至需要专门扩展过的键盘；还有 [Whitespace][whitespace]，它的程序完全由空格、制表符和换行组成。）你必须理解语法，才能做到最起码的一件事：和计算机说上话。

<!--
**Semantics.** By *semantics*, we mean the rules that define the behavior of
programs. In other words, semantics is about the meaning of a program&mdash;what
computation a particular piece of syntax represents. Note that although
"semantics" is plural in form, we use it as singular. That's similar to
"mathematics" or "physics".
-->

**语义。** 所谓*语义*，指的是决定程序行为的规则。换句话说，语义讨论的是程序的意义，也就是某段语法究竟表示了什么计算。顺便注意一下，虽然 `semantics` 在形式上是复数，但我们把它当作单数来使用。这一点和 `mathematics` 或 `physics` 很像。

<!--
There are two pieces to semantics, the *dynamic* semantics of a language and the
*static* semantics of a language. The dynamic semantics define the run-time
behavior of a program as it is executed or evaluated. The static semantics
define the compile-time checking that is done to ensure that a program is legal,
beyond any syntactic requirements. The most important kind of static semantics
is probably *type checking*: the rules that define whether a program is
well-typed or not. Learning the semantics of a new language is usually the real
challenge, even though the syntax might be the first hurdle you have to
overcome. You need to understand semantics to say what you mean to the computer,
and you need to say what you mean so that your program performs the right
computation.
-->

语义又分成两个部分：一门语言的*动态语义*和*静态语义*。动态语义定义的是程序在执行或求值时的运行期行为。静态语义定义的是编译期所进行的检查，用来保证一个程序在语法正确之外，也在更深层意义上是合法的。静态语义中最重要的一种，大概就是*类型检查*：也就是用来判断一个程序是否具备良好类型的规则。学习一门新语言时，真正的挑战通常是掌握它的语义，尽管语法也许是你首先要跨过去的第一道坎。你必须理解语义，才能向计算机准确表达你的意思；而只有准确表达了你的意思，你的程序才能执行出正确的计算。

<!--
**Idioms.** By *idioms*, we mean the common approaches to using language
features to express computations. Given that you might express one computation
in many ways inside a language, which one do you choose? Some will be more
natural than others. Programmers who are fluent in the language will prefer
certain modes of expression over others. We could think of this in terms of
using the dominant paradigms in the language effectively, whether they are
imperative, functional, object-oriented, etc. You need to understand idioms to
say what you mean not just to the computer, but to other programmers. When you
write code idiomatically, other programmers will understand your code better.
-->

**习惯用法。** 所谓*习惯用法*，指的是人们通常如何利用一门语言的特性来表达计算。既然同一种计算在一门语言里可能有很多种写法，那你该选哪一种？有些写法会比另一些更自然。真正熟练的程序员，会偏好某些表达方式，而不会选另一些。我们也可以把这理解为：是否能有效运用一门语言中的主导范式，无论它是命令式的、函数式的、面向对象的，等等。你必须理解习惯用法，才能不仅向计算机准确表达意思，也向其他程序员准确表达意思。当你写出的代码符合习惯用法时，其他程序员会更容易理解它。

<!--
**Libraries.** *Libraries* are bundles of code that have already been written
for you and can make you a more productive programmer, since you won't have to
write the code yourself. (It's been said that [laziness is a virtue for a
programmer][lazy].) Part of learning a new language is discovering what
libraries are available and how to make use of them. A language usually provides
a *standard library* that gives you access to a core set of functionality, much
of which you would be unable to code up in the language yourself, such as file
I/O.
-->

**库。** *库* 是别人已经替你写好的代码集合，它能让你成为更高效的程序员，因为你不必什么都自己从头写起。（有人说过，[懒惰是程序员的一种美德][lazy]。）学习一门新语言的一部分内容，就是了解有哪些库可用，以及如何利用它们。一门语言通常会提供一个*标准库*，让你能够使用一组核心功能，而其中很多功能其实是你根本无法只靠这门语言本身手写出来的，例如文件输入输出。

<!--
**Tools.** At the very least any language implementation provides either a
compiler or interpreter as a tool for interacting with the computer using the
language. But there are other kinds of tools: debuggers; integrated development
environments (IDE); and analysis tools for things like performance, memory
usage, and correctness. Learning to use tools that are associated with a
language can also make you a more productive programmer. Sometimes it's easy to
confuse the tool itself for the language; if you've only ever used Eclipse and
Java together for example, it might not be apparent that Eclipse is an IDE that
works with many languages, and that Java can be used without Eclipse.
-->

**工具。** 最起码，任何语言实现都会提供某种工具，让你能用这门语言和计算机交互，这通常要么是编译器，要么是解释器。但工具远不止这些：还有调试器、集成开发环境（IDE），以及用于分析性能、内存使用和正确性的各种分析工具。学会使用与某门语言相关的工具，也会让你成为更高效的程序员。有时人们很容易把工具本身和语言混为一谈；例如，如果你过去一直只把 Eclipse 和 Java 搭配着使用，就未必会意识到：Eclipse 是一个可用于多种语言的 IDE，而 Java 并不依赖 Eclipse 才能使用。

[tryapl]: http://tryapl.org/
[whitespace]: https://web.archive.org/web/20151108084710/http://compsoc.dur.ac.uk/whitespace/tutorial.html
[lazy]: http://wiki.c2.com/?LazinessImpatienceHubris

<!--
When it comes to learning OCaml in this book, our focus is primarily on
semantics and idioms. We'll have to learn syntax along the way, of course, but
it's not the interesting part of our studies. We'll get some exposure to the
OCaml standard library and a couple other libraries, notably OUnit (a unit
testing framework similar to JUnit, HUnit, etc.). Besides the OCaml compiler and
build system, the main tool we'll use is the toplevel, which provides the
ability to interactively experiment with code.
-->

在本书中学习 OCaml 时，我们的重点主要会放在语义与习惯用法上。当然，语法我们也会一路学下去，但那并不是这门课里最有意思的部分。我们还会接触一些 OCaml 标准库，以及另外几种库，尤其是 OUnit（一个和 JUnit、HUnit 等类似的单元测试框架）。除了 OCaml 编译器和构建系统之外，我们会用到的主要工具是 toplevel，它能让你以交互方式实验代码。
