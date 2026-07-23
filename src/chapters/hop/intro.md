<!--
# Higher-Order Programming
-->

# 高阶编程

{{ video_embed | replace("%%VID%%", "rTbinjZ9-oc") }}

<!--
Functions are values just like any other value in OCaml. What does that mean
exactly? This means that we can pass functions around as arguments to other
functions, that we can store functions in data structures, that we can return
functions as a result from other functions, and so forth.
-->

【函数|Function】在 OCaml 中与任何其他值一样都是值。这到底意味着什么？
这意味着我们可以将函数作为参数传递给其他函数，可以将函数存储在数据结构中，
可以从其他函数返回函数作为结果，等等。

<!--
*Higher-order functions* either take other functions as input or return other
functions as output (or both). Higher-order functions are also known as
*functionals*, and programming with them could therefore be called *functional
programming*&mdash;indicating what the heart of programming in languages like
OCaml is all about.
-->

【高阶函数|Higher-Order Function】要么接受其他函数作为输入，
要么返回其他函数作为输出（或两者兼有）。高阶函数也被称为【函数式|Functional】，
因此使用它们进行编程可以称为【函数式编程|Functional Programming】
&mdash;&mdash;这表明了 OCaml 等语言编程的核心所在。

<!--
Higher-order functions were one of the more recent adoptions from functional
languages into mainstream languages. The Java 8 Streams library and Python 2.3's
`itertools` modules are examples of that; C++ has also been increasing its
support since at least 2011.
-->

高阶函数是从函数式语言到主流语言采纳的较新特性之一。
Java 8 的 Streams 库和 Python 2.3 的 `itertools` 模块就是这方面的例子；
C++ 自 2011 年以来也在不断增加对它的支持。

```{note}
<!--
C wizards might object the adoption isn't so recent. After all, C has long had
the ability to do higher-order programming through function pointers. But that
ability also depends on the programming pattern of passing an additional
*environment* parameter to provide the values of variables in the function to be
called through the pointer. As we'll see in our later chapter on interpreters,
the essence of (higher-order) functions in a functional language is that they
are really something called a *closure* that obviates the need for that extra
parameter. Bear in mind that the issue is not what is *possible* to compute in a
language&mdash;after all everything is eventually compiled down to machine code,
so we could just write in that exclusively&mdash;but what is *pleasant* to
compute.
-->

C 语言高手可能会反对说这种采纳并不那么新。
1毕竟，C 语言长期以来一直能够通过函数指针进行高阶编程。
但这种能力也依赖于传递额外【环境|Environment】参数来提供通过指针调用的函数中变量值的编程模式。
正如我们将在后面的解释器章节中看到的，
函数式语言中（高阶）函数的本质是它们实际上是一种称为【闭包|Closure】的东西，
从而消除了对额外参数的需求。请记住，问题不在于一种语言**可以**计算什么
&mdash;&mdash;毕竟一切最终都编译成机器码，
所以我们完全可以只用机器码编写&mdash;&mdash;而在于怎样计算是**令人愉悦的**。
```

<!--
In this chapter we will see what all the fuss is about.  Higher-order functions
enable beautiful, general, reusable code.
-->

在本章中，我们将看到这一切的意义所在。高阶函数能够实现优美、通用、可复用的代码。
