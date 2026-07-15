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
# Exceptions
-->

# 异常

{{ video_embed | replace("%%VID%%", "0zZNEJvcZqg") }}

<!--
OCaml has an exception mechanism similar to many other programming languages. A
new type of OCaml exception is defined with this syntax:
-->

OCaml 的【异常|Exception】机制类似于许多其他编程语言。新的 OCaml 异常类型使用以下语法定义：

```ocaml
exception E of t
```

<!--
where `E` is a constructor name and `t` is a type. The `of t` is optional.
Notice how this is similar to defining a constructor of a variant type. For
example:
-->

其中 `E` 是【构造子|Constructor】名称，`t` 是【类型|Type】。`of t` 是可选的。
注意这与定义【变体|Variant】类型的构造子有多相似。例如：

```{code-cell} ocaml
exception A
exception B
exception Code of int
exception Details of string
```

<!--
To create an exception value, use the same syntax you would for creating a
variant value. Here, for example, is an exception value whose constructor is
`Failure`, which carries a `string`:
-->

要创建异常值，请使用与创建变体值相同的语法。例如，这里是一个异常值，
其构造子是 `Failure`，携带一个 `string`：

```{code-cell} ocaml
Failure "something went wrong"
```

<!--
This constructor is [pre-defined in the standard library][stdlib-exn] and is one of the more common exceptions that
OCaml programmers use.
-->

该构造子在[标准库][stdlib-exn]中预定义，是 OCaml 程序员较常使用的异常之一。

[stdlib-exn]: https://ocaml.org/manual/core.html#ss:predef-exn

<!--
To raise an exception value `e`, simply write
-->

要引发异常值 `e`，只需编写

```ocaml
raise e
```

<!--
There is a convenient function `failwith : string -> 'a` in the standard library
that raises `Failure`. That is, `failwith s` is equivalent to
`raise (Failure s)`.
-->

标准库中有一个便捷函数 `failwith : string -> 'a`，它会引发 `Failure`。
即 `failwith s` 等价于 `raise (Failure s)`。

{{ video_embed | replace("%%VID%%", "XTdT1zdF2IY") }}

<!--
To catch an exception, use this syntax:
-->

要捕获异常，请使用以下语法：

```ocaml
try e with
| p1 -> e1
| ...
| pn -> en
```

<!--
The expression `e` is what might raise an exception. If it does not, the entire
`try` expression evaluates to whatever `e` does. If `e` does raise an exception
value `v`, that value `v` is matched against the provided patterns, exactly
like `match` expression.
-->

表达式 `e` 是可能引发异常的部分。如果不引发异常，整个 `try` 表达式求值为 `e` 的结果。
如果 `e` 确实引发了异常值 `v`，该值 `v` 将与提供的模式进行匹配，就像 `match` 表达式一样。

<!--
## Exceptions are Extensible Variants
-->

## 异常是可扩展变体

<!--
All exception values have type `exn`, which is a variant defined in the
[core][core]. It's an unusual kind of variant, though, called an *extensible*
variant, which allows new constructors of the variant to be defined after the
variant type itself is defined. See the OCaml manual for more information about
[extensible variants][extvar] if you're interested.
-->

所有异常值的类型都是 `exn`，它是在[核心库][core]中定义的变体。
这是一种不寻常的变体，称为【可扩展变体|Extensible Variant】，
它允许在变体类型本身定义之后再定义新的构造子。
如果你感兴趣，请参阅 OCaml 手册了解更多关于[可扩展变体][extvar]的信息。

[core]: https://ocaml.org/manual/core.html
[extvar]: https://ocaml.org/manual/extn.html

<!--
## Exception Semantics
-->

## 异常语义

<!--
Since they are just variants, the syntax and semantics of exceptions is already
covered by the syntax and semantics of variants&mdash;with one exception (pun
intended), which is the dynamic semantics of how exceptions are raised and
handled.
-->

由于异常只是变体，异常的语法和语义已经由变体的语法和语义涵盖&mdash;&mdash;
有一个例外（双关语），即异常如何被引发和处理的动态语义。

<!--
**Dynamic semantics.** As we originally said, every OCaml expression either
-->

**动态语义** 正如我们最初所说，每个 OCaml 表达式要么

<!--
* evaluates to a value
-->

* 求值为一个值

<!--
* raises an exception
-->

* 引发一个异常

<!--
* or fails to terminate (i.e., an "infinite loop").
-->

* 或无法终止（即「无限循环」）。

<!--
So far we've only presented the part of the dynamic semantics that handles the
first of those three cases. What happens when we add exceptions? Now, evaluation
of an expression either produces a value or produces an *exception packet*.
Packets are not normal OCaml values; the only pieces of the language that
recognizes them are `raise` and `try`. The exception value produced by (e.g.)
`Failure "oops"` is part of the exception packet produced by
`raise (Failure "oops")`, but the packet contains more than just the exception
value; there can also be a stack trace, for example.
-->

到目前为止，我们只介绍了处理这三种情况中第一种的动态语义部分。
当我们添加异常时会发生什么？现在，表达式的求值要么产生一个值，要么产生一个*异常包*。
异常包不是正常的 OCaml 值；识别它们的唯一语言部件是 `raise` 和 `try`。
例如，`Failure "oops"` 产生的异常值是 `raise (Failure "oops")` 产生的异常包的一部分，
但异常包不仅仅包含异常值；例如，还可以包含堆栈跟踪。

<!--
For any expression `e` other than `try`, if evaluation of a subexpression of `e`
produces an exception packet `P`, then evaluation of `e` produces packet `P`.
-->

对于 `try` 以外的任何表达式 `e`，如果 `e` 的子表达式求值产生异常包 `P`，则 `e` 的求值产生包 `P`。

<!--
But now we run into a problem for the first time: what order are subexpressions
evaluated in? Sometimes the answer to that question is provided by the semantics
we have already developed. For example, with let expressions, we know that the
binding expression must be evaluated before the body expression. So the
following code raises `A`:
-->

但我们第一次遇到了一个问题：子表达式按什么顺序求值？
有时这个问题的答案由我们已经发展的语义提供。
例如，对于 let 表达式，我们知道绑定表达式必须在主体表达式之前求值。
所以下面的代码引发 `A`：

```{code-cell} ocaml
:tags: ["raises-exception"]
let _ = raise A in raise B;;
```

<!--
And with functions, OCaml does not officially specify the evaluation order of a function
and its argument, but the current implementation evaluates the argument before the function.
So the following code also raises `A`, in addition to producing some compiler warnings
that the first expression will never actually be applied as a function to an
argument:
-->

对于函数，OCaml 并未正式指定函数及其参数的求值顺序，但当前实现在函数之前对参数求值。
因此下面的代码也会引发 `A`，同时还会产生一些编译器警告，说明第一个表达式永远不会作为函数应用于参数：

```{code-cell} ocaml
:tags: ["raises-exception", "hide-output"]
(raise B) (raise A)
```

<!--
It makes sense that both those pieces of code would raise the same exception,
given that we know `let x = e1 in e2` is syntactic sugar for `(fun x -> e2) e1`.
-->

鉴于我们知道 `let x = e1 in e2` 是 `(fun x -> e2) e1` 的【语法糖|Syntactic Sugar】，
这两段代码引发相同的异常是合理的。

<!--
But what does the following code raise as an exception?
-->

但下面的代码会引发什么异常呢？

```{code-cell} ocaml
:tags: ["raises-exception", "hide-output"]
(raise A, raise B)
```

<!--
The answer is nuanced. The language specification does not stipulate what order
the components of pairs should be evaluated in. Nor did our semantics exactly
determine the order. (Though you would be forgiven if you thought it was left to
right.) So programmers actually cannot rely on that order. The current
implementation of OCaml, as it turns out, evaluates right to left. So the code
above actually raises `B`. If you really want to force the evaluation order, you
need to use let expressions:
-->

答案是微妙的。语言规范没有规定元组的分量应该按什么顺序求值。
我们的语义也没有确切地确定顺序。（虽然你认为是从左到右也是可以理解的。）
所以程序员实际上不能依赖这个顺序。事实证明，OCaml 的当前实现是从右到左求值。
所以上面的代码实际上引发 `B`。
如果你真的想强制求值顺序，你需要使用 let 表达式：

```{code-cell} ocaml
:tags: ["raises-exception"]
let a = raise A in
let b = raise B in
(a, b)
```

<!--
That code is guaranteed to raise `A` rather than `B`.
-->

该代码保证引发 `A` 而非 `B`。

<!--
One interesting corner case is what happens when a raise expression itself has
a subexpression that raises:
-->

一个有趣的边界情况是，当 raise 表达式本身有一个会引发异常的子表达式时会发生什么：

```{code-cell} ocaml
:tags: ["raises-exception"]
exception C of string;;
exception D of string;;
raise (C (raise (D "oops")))
```

<!--
That code ends up raising `D`, because the first thing that has to happen is to
evaluate `C (raise (D "oops"))` to a value. Doing that requires evaluating
`raise (D "oops")` to a value. Doing that causes a packet containing `D "oops"` to
be produced, and that packet then propagates and becomes the result of
evaluating `C (raise (D "oops"))`, hence the result of evaluating
`raise (C (raise (D "oops")))`.
-->

该代码最终引发 `D`，因为首先必须将 `C (raise (D "oops"))` 求值为一个值。
这需要将 `raise (D "oops")` 求值为一个值。
这样做会导致包含 `D "oops"` 的包被产生，然后该包传播并成为 `C (raise (D "oops"))` 的求值结果，
从而成为 `raise (C (raise (D "oops")))` 的求值结果。

<!--
Once evaluation of an expression produces an exception packet `P`, that packet
propagates until it reaches a `try` expression:
-->

一旦表达式的求值产生异常包 `P`，该包会传播直到遇到 `try` 表达式：

```ocaml
try e with
| p1 -> e1
| ...
| pn -> en
```

<!--
The exception value inside `P` is matched against the provided patterns using
the usual evaluation rules for pattern matching&mdash;with one exception (again,
pun intended). If none of the patterns matches, then instead of producing
`Match_failure` inside a new exception packet, the original exception packet `P`
continues propagating until the next `try` expression is reached.
-->

`P` 内部的异常值使用【模式匹配|Pattern Matching】的通常求值规则与提供的模式进行匹配
&mdash;&mdash;有一个例外（又是双关语）。
如果没有模式匹配，则不会在新的异常包中产生 `Match_failure`，
而是原始异常包 `P` 继续传播直到遇到下一个 `try` 表达式。

<!--
## Pattern Matching
-->

## 模式匹配

<!--
There is a pattern form for exceptions.  Here's an example
of its usage:
-->

有一种用于异常的模式形式。以下是其用法示例：

```{code-cell} ocaml
match List.hd [] with
  | [] -> "empty"
  | _ :: _ -> "non-empty"
  | exception (Failure s) -> s
```

<!--
Note that the code above is just a standard `match` expression, not a `try`
expression. It matches the value of `List.hd []` against the three provided
patterns. As we know, `List.hd []` will raise an exception containing the value
`Failure "hd"`. The *exception pattern* `exception (Failure s)` matches that
value. So the above code will evaluate to `"hd"`.
-->

注意上面的代码只是一个标准的 `match` 表达式，而非 `try` 表达式。
它将 `List.hd []` 的值与三个提供的模式进行匹配。
我们知道，`List.hd []` 会引发包含值 `Failure "hd"` 的异常。
*【异常模式|Exception Pattern】* `exception (Failure s)` 匹配该值。
所以上面的代码将求值为 `"hd"`。

<!--
Exception patterns are a kind of syntactic sugar. Consider this code for example:
-->

异常模式是一种语法糖。例如，考虑这段代码：

```ocaml
match e with
  | p1 -> e1
  | exception p2 -> e2
  | p3 -> e3
  | exception p4 -> e4
```

<!--
We can rewrite the code to eliminate the exception pattern:
-->

我们可以重写代码以消除异常模式：

```ocaml
try
  match e with
    | p1 -> e1
    | p3 -> e3
with
  | p2 -> e2
  | p4 -> e4
```

<!--
In general if there are both exception and non-exception patterns, evaluation
proceeds as follows: try evaluating `e`. If it produces an exception packet,
use the exception patterns from the original match expression to handle that
packet. If it doesn't produce an exception packet but instead produces a
non-exception value, use the non-exception patterns from the original match
expression to match that value.
-->

一般来说，如果同时存在异常和非异常模式，求值过程如下：
尝试对 `e` 求值。如果它产生异常包，使用原始 match 表达式中的异常模式来处理该包。
如果它不产生异常包而是产生非异常值，使用原始 match 表达式中的非异常模式来匹配该值。

<!--
## Exceptions and OUnit
-->

## 异常与 OUnit

<!--
If it is part of a function's specification that it raises an exception, you
might want to write OUnit tests that check whether the function correctly does
so. Here's how to do that:
-->

如果函数的规范中包含引发异常的部分，你可能想编写 OUnit
测试来检查函数是否正确地做到了这一点。以下是具体方法：

```ocaml
open OUnit2

let tests = "suite" >::: [
    "empty" >:: (fun _ -> assert_raises (Failure "hd") (fun () -> List.hd []));
  ]

let _ = run_test_tt_main tests
```

<!--
The expression `assert_raises exn (fun () -> e)` checks to see whether
expression `e` raises exception `exn`. If so, the OUnit test case succeeds,
otherwise it fails.
-->

表达式 `assert_raises exn (fun () -> e)` 检查表达式 `e` 是否引发异常 `exn`。
如果是，OUnit 测试用例成功，否则失败。

<!--
Note that the second argument of `assert_raises` is a *function* of type `unit
-> 'a`, sometimes called a "thunk". It may seem strange to write a function with
this type---the only possible input is `()`---but this is a common pattern in
functional languages to suspend or delay the evaluation of a program. In this
case, we want `assert_raises` to evaluate `List.hd []` when it is ready. If we
evaluated `List.hd []` immediately, `assert_raises` would not be able to check
if the right exception is raised. We'll learn more about thunks in a later
chapter.
-->

注意 `assert_raises` 的第二个参数是一个类型为 `unit -> 'a` 的**函数**，有时称为「thunk」。
编写这种类型的函数可能看起来很奇怪&mdash;&mdash;唯一可能的输入是 `()`&mdash;&mdash;
但这是函数式语言中挂起或延迟程序求值的常见模式。
在这种情况下，我们希望 `assert_raises` 在准备好时对 `List.hd []` 求值。
如果我们立即对 `List.hd []` 求值，`assert_raises` 将无法检查是否引发了正确的异常。
我们将在后面的章节中学习更多关于 thunk 的内容。

```{warning}
<!--
A common error is to forget the `(fun () -> ...)` around `e`. If you make this
mistake, the program may still typecheck but the OUnit test case will fail:
without the extra anonymous function, the exception is raised before
`assert_raises` ever gets a chance to handle it.
-->
一个常见的错误是忘记在 `e` 周围加上 `(fun () -> ...)`。
如果你犯了这个错误，程序仍然可能通过类型检查，但 OUnit 测试用例将失败：
没有额外的【匿名函数|Anonymous Function】，异常会在 `assert_raises` 有机会处理之前就被引发。
```
