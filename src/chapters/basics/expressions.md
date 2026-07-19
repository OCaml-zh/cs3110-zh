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
# Expressions
-->

# 表达式

<!--
The primary piece of OCaml syntax is the *expression*. Just like programs in
imperative languages are primarily built out of *commands*, programs in
functional languages are primarily built out of expressions. Examples of
expressions include `2+2` and `increment 21`.
-->

OCaml 语法中最基本的组成部分是表达式。正如命令式语言中的程序主要由命令构成，函数式语言中的程序主要由表达式构成。表达式的例子包括`2+2` 和 `increment 21`。

<!--
The OCaml manual has a complete definition of [all the expressions in the
language][exprs]. Though that page starts with a rather cryptic overview, if you
scroll down, you'll come to some English explanations. Don't worry about
studying that page now; just know that it's available for reference.
-->

OCaml 手册里给出了这门语言中[全部表达式][exprs]的完整定义。虽然那个页面一开始是一个相当晦涩的总览，但如果你往下滚动，就会看到一些英文解释。现在不用急着研究那一页；只需要知道它可以作为参考即可。

[exprs]:  https://ocaml.org/manual/expr.html

<!--
The primary task of computation in a functional language is to *evaluate* an
expression to a *value*. A value is an expression for which there is no
computation remaining to be performed. So, all values are expressions, but not
all expressions are values. Examples of values include `2`, `true`, and
`"yay!"`.
-->

在函数式语言中，计算的首要任务是把一个表达式求值为一个值。所谓值，就是一种已经没有剩余计算需要继续执行的表达式。因此，所有值都是表达式，但并不是所有表达式都是值。值的例子包括 `2`、`true` 和 `"yay!"`。

<!--
The OCaml manual also has a definition of [all the values][values], though
again, that page is mostly useful for reference rather than study.
-->

OCaml 手册也给出了[全部值][values]的定义，不过同样地，那一页主要是拿来查阅，而不是拿来系统学习的。

[values]: https://ocaml.org/manual/values.html

<!--
Sometimes an expression might fail to evaluate to a value. There are two reasons
that might happen:
-->

有时候，一个表达式可能无法顺利求值为某个值。出现这种情况主要有两个原因：

<!--
1. Evaluation of the expression raises an exception.
2. Evaluation of the expression never terminates (e.g., it enters an "infinite
   loop").
-->

1. 对该表达式求值时引发了异常。
2. 对该表达式求值永远不会终止（例如，它进入了「无限循环」）。

<!--
## Primitive Types and Values
-->

## 原始类型与值

<!--
The *primitive* types are the built-in and most basic types: integers,
floating-point numbers, characters, strings, and booleans. They will be
recognizable as similar to primitive types from other programming languages.
-->

原始类型是那些内建的、也是最基础的类型：整数、浮点数、字符、字符串以及布尔值。你会很容易认出，它们和其他编程语言里的原始类型相当相似。

<!--
**Type `int`: Integers.** OCaml integers are written as usual: `1`, `2`, etc.
The usual operators are available: `+`, `-`, `*`, `/`, and `mod`. The latter
two are integer division and modulus:
-->

**类型 `int`：整数。** OCaml 的整数写法和通常一样：`1`、`2` 等等。常见的运算符都可用：`+`、`-`、`*`、`/` 和 `mod`。后两者分别表示整数除法与取模：

```{code-cell} ocaml
65 / 60
```

```{code-cell} ocaml
65 mod 60
```

```{code-cell} ocaml
:tags: ["raises-exception"]
65 / 0
```

<!--
OCaml integers range from $-2^{62}$ to $2^{62}-1$ on modern platforms. They are
implemented with 64-bit machine *words*, which is the size of a register on
64-bit processor. But one of those bits is "stolen" by the OCaml implementation,
leading to a 63-bit representation. That bit is used at run time to distinguish
integers from pointers. For applications that need true 64-bit integers, there
is an [`Int64` module][int64] in the standard library. And for applications that
need arbitrary-precision integers, there is a separate [`Zarith`][zarith]
library. But for most purposes, the built-in `int` type suffices and offers the
best performance.
-->

在现代平台上，OCaml 整数的范围是从 $-2^{62}$ 到 $2^{62}-1$。它们是用64 位机器字来实现的，而机器字正是 64 位处理器寄存器的大小。但其中有一位会被 OCaml 的实现「偷走」，于是最终只剩下 63 位表示。运行时会用这一位来区分整数和指针。对于确实需要真正 64 位整数的应用，标准库中有[`Int64` 模块][int64]。而对于需要任意精度整数的应用，则有单独的[`Zarith`][zarith] 库。不过对大多数用途而言，内建的 `int` 类型已经足够，并且性能最好。

[int64]: https://ocaml.org/api/Int64.html
[zarith]: https://github.com/ocaml/Zarith

<!--
**Type `float`: Floating-point numbers.** OCaml floats are [IEEE 754
double-precision floating-point numbers][binary64]. Syntactically, they must
always contain a dot&mdash;for example, `3.14` or `3.0` or even `3.`.  The last
is a `float`; if you write it as `3`, it is instead an `int`:
-->

**类型 `float`：浮点数。** OCaml 的浮点数采用 [IEEE 754 双精度浮点数][binary64] 表示。从语法上说，它们必须始终包含一个点，例如 `3.14`、`3.0`，甚至 `3.`。最后这个也是 `float`；如果你写成 `3`，那它就会变成`int`：

```{code-cell} ocaml
3.
```

```{code-cell} ocaml
3
```

<!--
OCaml deliberately does not support operator overloading. Arithmetic operations
on floats are written with a dot after them. For example, floating-point
multiplication is written `*.` not `*`:
-->

OCaml 刻意不支持运算符重载。对浮点数进行算术运算时，运算符后面都要带一个点。例如，浮点数乘法写作 `*.` 而不是 `*`：

```{code-cell} ocaml
3.14 *. 2.
```

```{code-cell} ocaml
:tags: ["raises-exception"]
3.14 * 2.
```

<!--
OCaml will not automatically convert between `int` and `float`. If you want to
convert, there are two built-in functions for that purpose: `int_of_float` and
`float_of_int`.
-->

OCaml 不会在 `int` 和 `float` 之间自动转换。如果你想进行转换，可以使用两个内建函数：`int_of_float` 和 `float_of_int`。

```{code-cell} ocaml
3.14 *. (float_of_int 2)
```

<!--
As in any language, the floating-point representation is approximate. That can
lead to rounding errors:
-->

和任何语言一样，浮点数表示都是近似的。这会导致舍入误差：

```{code-cell} ocaml
0.1 +. 0.2
```

<!--
The same behavior can be observed in Python and Java, too.  If you haven't
encountered this phenomenon before, here's a [basic guide to floating-point
representation][fp-guide] that you might enjoy reading.
-->

同样的现象在 Python 和 Java 中也能观察到。如果你以前还没遇到过这个问题，这里有一份关于[浮点表示的基础指南][fp-guide]，也许你会想读读看。

[binary64]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
[fp-guide]: https://floating-point-gui.de/basic/

<!--
**Type `bool`: Booleans.** The boolean values are written `true` and `false`.
The usual short-circuit conjunction `&&` and disjunction `||` operators are
available.
-->

**类型 `bool`：布尔值。** 布尔值写作 `true` 和 `false`。常见的短路合取运算符 `&&` 与析取运算符 `||` 也都可用。

<!--
**Type `char`: Characters.** Characters are written with single quotes, such as
`'a'`, `'b'`, and `'c'`. They are represented as bytes &mdash;that is, 8-bit
integers&mdash; in the ISO 8859-1 "Latin-1" encoding. The first half of the
characters in that range are the standard ASCII characters. You can convert
characters to and from integers with `char_of_int` and `int_of_char`.
-->

**类型 `char`：字符。** 字符使用单引号书写，例如 `'a'`、`'b'` 和 `'c'`。它们在 ISO 8859-1「Latin-1」编码中被表示为字节，也就是 8 位整数。这个范围中前一半的字符就是标准 ASCII 字符。你可以使用 `char_of_int` 和`int_of_char` 在字符和整数之间进行转换。

<!--
**Type `string`: Strings.** Strings are sequences of characters. They are
written with double quotes, such as `"abc"`.  The string concatenation operator
is `^`:
-->

**类型 `string`：字符串。** 字符串是字符的序列。它们使用双引号书写，例如 `"abc"`。字符串拼接运算符是 `^`：

```{code-cell} ocaml
"abc" ^ "def"
```

<!--
Object-oriented languages often provide an overridable method for converting
objects to strings, such as `toString()` in Java or `__str__()` in Python. But
most OCaml values are not objects, so another means is required to convert to
strings. For three of the primitive types, there are built-in functions:
`string_of_int`, `string_of_float`, `string_of_bool`.  Strangely,
there is no `string_of_char`, but the library function `String.make` can
be used to accomplish the same goal.
-->

面向对象语言通常会提供一个可覆写的方法，用来把对象转换成字符串，比如Java 中的 `toString()` 或 Python 中的 `__str__()`。但大多数 OCaml 值都不是对象，因此需要用别的方式来完成字符串转换。对于其中三种原始类型，OCaml 提供了内建函数：`string_of_int`、`string_of_float`、`string_of_bool`。比较奇怪的是，并没有 `string_of_char`，不过库函数`String.make` 可以实现同样的目标。

```{code-cell} ocaml
string_of_int 42
```

```{code-cell} ocaml
String.make 1 'z'
```

<!--
Likewise, for the same three primitive types, there are built-in functions to
convert from a string if possible: `int_of_string`, `float_of_string`, and
`bool_of_string`.
-->

类似地，对于同样这三种原始类型，也有把字符串转换回去的内建函数（只要可能的话）：`int_of_string`、`float_of_string` 和 `bool_of_string`。

```{code-cell} ocaml
int_of_string "123"
```

```{code-cell} ocaml
:tags: ["raises-exception"]
int_of_string "not an int"
```

<!--
There is no `char_of_string`, but the individual characters of a string can be
accessed by a 0-based index. The indexing operator is written with a dot and
square brackets:
-->

没有 `char_of_string` 这样的函数，不过你可以用从 0 开始的索引访问字符串中的单个字符。索引运算符写作一个点加方括号：

```{code-cell} ocaml
"abc".[0]
```

```{code-cell} ocaml
"abc".[1]
```

```{code-cell} ocaml
:tags: ["raises-exception"]
"abc".[3]
```

<!--
## More Operators
-->

## 更多运算符

<!--
We've covered most of the built-in operators above, but there are a few more
that you can see in the [OCaml manual][ops].
-->

上面我们已经介绍了大部分内建运算符，不过在 [OCaml 手册][ops] 中你还可以看到另外一些。

<!--
There are two equality operators in OCaml, `=` and `==`, with corresponding
inequality operators `<>` and `!=`. Operators `=` and `<>` examine *structural*
equality whereas `==` and `!=` examine *physical* equality. Until we've studied
the imperative features of OCaml, the difference between them will be tricky to
explain. See the [documentation][stdlib] of `Stdlib.(==)` if you're curious now.
-->

OCaml 中有两个相等运算符：`=` 和 `==`，以及与之对应的不等运算符 `<>`和 `!=`。`=` 与 `<>` 检查的是结构相等，而 `==` 与 `!=` 检查的是物理相等。在我们学习 OCaml 的命令式特性之前，这两者之间的差别还不太容易解释。如果你现在就很好奇，可以先看看 `Stdlib.(==)` 的[文档][stdlib]。

<!--
```{important}
Start training yourself now to use `=` and not to use `==`. This will be
difficult if you're coming from a language like Java where `==` is the usual
equality operator.
```
-->

```{important}
现在就开始训练自己使用 `=`，而非 `==`。如果你来自 Java 这样的语言背景，
其中 `==` 是更常见的相等运算符，那这件事一开始可能会有点困难。
```

[ops]: https://ocaml.org/manual/expr.html#ss%3Aexpr-operators
[stdlib]: https://ocaml.org/api/Stdlib.html

<!--
## Assertions
-->

## 断言

<!--
The expression `assert e` evaluates `e`. If the result is `true`, nothing more
happens, and the entire expression evaluates to a special value called *unit*.
The unit value is written `()` and its type is `unit`. But if the result is
`false`, an exception is raised.
-->

表达式 `assert e` 会先对 `e` 求值。如果结果是 `true`，那么不会发生任何额外的事情，整个表达式会求值得到一个叫做 unit 的特殊值。unit 值写作`()`，它的类型是 `unit`。但如果结果是 `false`，就会引发一个异常。

<!--
One way to test a function `f` is to write a series of assertions like this:
-->

测试函数 `f` 的一种方式，是写出一系列像下面这样的断言：

```ocaml
let () = assert (f input1 = output1)
let () = assert (f input2 = output2)
let () = assert (f input3 = output3)
```

<!--
Those assert that `f input1` should be `output1`, and so forth. The
`let () = ...` part of those is used to handle the unit value returned by each
assertion.
-->

这些断言表达的意思是：`f input1` 应该等于 `output1`，依此类推。其中的`let () = ...` 部分，是用来处理每条断言所返回的 unit 值。

<!--
## If Expressions
-->

## If 表达式

{{ video_embed | replace("%%VID%%", "XJ6QPtlPD7s")}}

<!--
The expression `if e1 then e2 else e3` evaluates to `e2` if `e1` evaluates to
`true`, and to `e3` otherwise. We call `e1` the *guard* of the `if` expression.
-->

表达式 `if e1 then e2 else e3` 的求值规则是：如果 `e1` 求值为 `true`，那么整个表达式求值为 `e2`；否则求值为 `e3`。我们把 `e1` 称为这个`if` 表达式的 guard。

```{code-cell}
if 3 + 5 > 2 then "yay!" else "boo!"
```

<!--
Unlike `if-then-else` *statements* that you may have used in imperative
languages, `if-then-else` *expressions* in OCaml are just like any other
expression; they can be put anywhere an expression can go. That makes them
similar to the ternary operator `? :` that you might have used in other
languages.
-->

和你可能在命令式语言中见过的 `if-then-else` 语句不同，OCaml 里的`if-then-else` 是表达式，它和其他表达式没有本质差别：凡是表达式能出现的地方，它都能出现。这让它有点像你在别的语言里可能见过的三元运算符`? :`。

```{code-cell}
4 + (if 'a' = 'b' then 1 else 2)
```

<!--
`If` expressions can be nested in a pleasant way:
-->

`if` 表达式还可以以一种比较自然的方式嵌套起来：

```ocaml
if e1 then e2
else if e3 then e4
else if e5 then e6
...
else en
```

<!--
You should regard the final `else` as mandatory, regardless of whether you are
writing a single `if` expression or a highly nested `if` expression. If you
omit it you'll likely get an error message that, for now, is inscrutable:
-->

你应当把最后那个 `else` 看作是必不可少的，不管你写的是一个单独的 `if`表达式，还是一个高度嵌套的 `if` 表达式。如果你把它省略掉，那么很可能会得到一条目前还让人摸不着头脑的错误信息：

```{code-cell}
:tags: ["raises-exception"]
if 2 > 3 then 5
```

+++

<!--
**Syntax.** The syntax of an `if` expression:
-->

**语法**

```ocaml
if e1 then e2 else e3
```

<!--
The letter `e` is used here to represent any other OCaml expression; it's an
example of a *syntactic variable* aka *metavariable*, which is not actually a
variable in the OCaml language itself, but instead a name for a certain
syntactic construct. The numbers after the letter `e` are being used to
distinguish the three different occurrences of it.
-->

这里的字母 `e` 用来表示任意 OCaml 表达式；它是一个句法变量，也叫做元变量。它并不是 OCaml 语言本身的变量，而只是某种句法构造的名字。字母`e` 后面的数字，则只是用来区分它的三次不同出现。

<!--
**Dynamic semantics.** The dynamic semantics of an `if` expression:
-->

**动态语义**

<!--
* If `e1` evaluates to `true`, and if `e2` evaluates to a value `v`, then
  `if e1 then e2 else e3` evaluates to `v`

* If `e1` evaluates to `false`, and if `e3` evaluates to a value `v`, then
  `if e1 then e2 else e3` evaluates to `v`.
-->

* 如果 `e1` 求值为 `true`，并且 `e2` 求值为一个值 `v`，那么
  `if e1 then e2 else e3` 就求值为 `v`

* 如果 `e1` 求值为 `false`，并且 `e3` 求值为一个值 `v`，那么
  `if e1 then e2 else e3` 就求值为 `v`。

<!--
We call these *evaluation rules*: they define how to evaluate expressions. Note
how it takes two rules to describe the evaluation of an `if` expression, one for
when the guard is true, and one for when the guard is false. The letter `v` is
used here to represent any OCaml value; it's another example of a metavariable.
Later we will develop a more mathematical way of expressing dynamic semantics,
but for now we'll stick with this more informal style of explanation.
-->

我们把这些叫做求值规则：它们定义了表达式该如何求值。注意，要描述一个`if` 表达式的求值，需要两条规则：一条针对【守卫|guard】为真时，另一条针对守卫为假时。这里的字母 `v` 用来表示任意 OCaml 值；它同样是一个元变量。之后我们会发展出一种更数学化的方式来表达动态语义，但现在先使用这种相对非正式的说明风格。

<!--
**Static semantics.** The static semantics of an `if` expression:
-->

**静态语义**

<!--
* If `e1` has type `bool` and `e2` has type `t` and `e3` has type `t` then
  `if e1 then e2 else e3` has type `t`
-->

* 如果 `e1` 的类型是 `bool`，并且 `e2` 的类型是 `t`，`e3` 的类型也是
  `t`，那么 `if e1 then e2 else e3` 的类型就是 `t`

<!--
We call this a *typing rule*: it describes how to type check an expression. Note
how it only takes one rule to describe the type checking of an `if` expression.
At compile time, when type checking is done, it makes no difference whether the
guard is true or false; in fact, there's no way for the compiler to know what
value the guard will have at run time. The letter `t` here is used to represent
any OCaml type; the OCaml manual also has definition of [all types][types]
(which curiously does not name the base types of the language like `int` and
`bool`).
-->

这叫做类型规则：它描述了如何对一个表达式进行类型检查。注意，描述`if` 守卫为真还是为假并没有区别；事实上，编译器根本无法知道守卫在运行时会取什么值。这里的字母 `t` 用来表示任意 OCaml 类型；OCaml 手册也给出了[全部类型][types]的定义（有趣的是，它并没有把像 `int` 和 `bool` 这样的基础类型单独点出来）。

[types]: https://ocaml.org/manual/types.html

<!--
We're going to be writing "has type" a lot, so let's introduce a more compact
notation for it. Whenever we would write "`e` has type `t`", let's instead write
`e : t`. The colon is pronounced "has type". This usage of colon is consistent
with how the toplevel responds after it evaluates an expression that you enter:
-->

接下来我们会频繁写到「具有类型」这件事，所以先引入一个更紧凑的记号。凡是我们原本会写成「`e` 具有类型 `t`」的地方，以后都改写成 `e : t`。这里的冒号读作「具有类型」。这种写法也和 toplevel 在对你输入的表达式求值之后给出的响应保持一致：

```{code-cell}
let x = 42
```

<!--
In the above example, variable `x` has type `int`, which is what the colon
indicates.
-->

在上面的例子里，变量 `x` 的类型是 `int`，而冒号表达的就是这个意思。

<!--
## Let Expressions
-->

## Let 表达式

{{ video_embed | replace("%%VID%%", "ug3L97FXC6A")}}

<!--
In our use of the word `let` thus far, we've been making definitions in the
toplevel and in `.ml` files. For example,
-->

到目前为止，我们使用 `let` 时，一直是在 toplevel 和 `.ml` 文件里做定义。例如，

```{code-cell}
let x = 42;;
```

<!--
defines `x` to be 42, after which we can use `x` in future definitions at the
toplevel. We'll call this use of `let` a *let definition*.
-->

这会把 `x` 定义为 42，之后我们就可以在 toplevel 后续的定义中继续使用 `x`。我们把这种 `let` 的用法叫做 let 定义。

<!--
There's another use of `let` which is as an expression:
-->

`let` 还有另一种用法，它本身就是一个表达式：

```{code-cell}
let x = 42 in x + 1
```

<!--
Here we're *binding* a value to the name `x` then using that binding inside
another expression, `x+1`. We'll call this use of `let` a *let expression*.
Since it's an expression, it evaluates to a value. That's different than
definitions, which themselves do not evaluate to any value. You can see that if
you try putting a let definition in place of where an expression is expected:
-->

这里我们先把一个值绑定到名字 `x` 上，然后在另一个表达式 `x+1` 中使用这个绑定。我们把这种 `let` 的用法叫做 let 表达式。既然它是一个表达式，那它就会求值得到某个值。这和定义不同，因为定义本身并不会求值得到值。如果你尝试把 let 定义放到本来应当出现表达式的地方，就能看到这一点：

```{code-cell}
:tags: ["raises-exception"]
(let x = 42) + 1
```

<!--
Syntactically, a `let` definition is not permitted on the left-hand side of the
`+` operator, because a value is needed there, and definitions do not evaluate
to values. On the other hand, a `let` expression would work fine:
-->

从语法上说，`+` 运算符左边不允许出现 let 定义，因为那里需要的是一个值，而定义并不会求值得到值。相反，let 表达式就完全没问题：

```{code-cell}
(let x = 42 in x) + 1
```

<!--
Another way to understand let definitions at the toplevel is that they are like
let expression where we just haven't provided the body expression yet.
Implicitly, that body expression is whatever else we type in the future. For
example,
-->

另一种理解 toplevel 中 let 定义的方式是：把它看作一个还没有写出主体表达式的 let 表达式。隐含地说，那个主体表达式就是我们之后还会继续输入的全部内容。例如，

```ocaml
# let a = "big";;
# let b = "red";;
# let c = a ^ b;;
# ...
```

<!--
is understood by OCaml in the same way as
-->

在 OCaml 看来，它和下面这段代码是等价的：

```ocaml
let a = "big" in
let b = "red" in
let c = a ^ b in
...
```

<!--
That latter series of `let` bindings is idiomatically how several variables
can be bound inside a given block of code.
-->

后一种这一串 `let` 绑定，就是在一段给定代码块内部绑定多个变量的惯用方式。

<!--
**Syntax.**
-->

**语法**

```ocaml
let x = e1 in e2
```

<!--
As usual, `x` is an identifier. These identifiers must begin with lower-case,
not upper, and idiomatically are written with `snake_case` not `camelCase`. We
call `e1` the *binding expression*, because it's what's being bound to `x`; and
we call `e2` the *body expression*, because that's the body of code in which the
binding will be in scope.
-->

和往常一样，`x` 是一个标识符。这些标识符必须以小写字母开头，而不是大写；而且按照惯例，它们通常写作 `snake_case`，而不是 `camelCase`。我们把 `e1`称作绑定表达式，因为它就是被绑定给 `x` 的那个表达式；而把 `e2` 称作主体表达式，因为它是那段绑定处于作用域中的代码主体。

<!--
**Dynamic semantics.**

To evaluate `let x = e1 in e2`:
-->

**动态语义**

要对 `let x = e1 in e2` 求值：

<!--
* Evaluate `e1` to a value `v1`.

* Substitute `v1` for `x` in `e2`, yielding a new expression `e2'`.

* Evaluate `e2'` to a value `v2`.

* The result of evaluating the let expression is `v2`.
-->

* 先把 `e1` 求值为某个值 `v1`。

* 在 `e2` 中用 `v1` 替换 `x`，从而得到一个新表达式 `e2'`。

* 再把 `e2'` 求值为某个值 `v2`。

* 整个 let 表达式的求值结果就是 `v2`。

<!--
Here's an example:
-->

下面是一个例子：

```text
    let x = 1 + 4 in x * 3
-->   (evaluate e1 to a value v1)
    let x = 5 in x * 3
-->   (substitute v1 for x in e2, yielding e2')
    5 * 3
-->   (evaluate e2' to v2)
    15
      (result of evaluation is v2)
```

<!--
**Static semantics.**

* If `e1 : t1` and if under the assumption that `x : t1` it holds that
  `e2 : t2`, then `(let x = e1 in e2) : t2`.
-->

**静态语义**

* 如果 `e1 : t1`，并且在假设 `x : t1` 的前提下有 `e2 : t2`，那么
  `(let x = e1 in e2) : t2`。

<!--
We use the parentheses above just for clarity. As usual, the compiler's type
inferencer determines what the type of the variable is, or the programmer could
explicitly annotate it with this syntax:
-->

上面的括号只是为了让写法更清楚。像往常一样，编译器的类型推断器会决定这个变量的类型；当然，程序员也可以显式地用下面这种语法加上类型标注：

```ocaml
let x : t = e1 in e2
```

<!--
## Scope
-->

## 作用域

{{ video_embed | replace("%%VID%%", "_TpTC6eo34M")}}

<!--
`Let` bindings are in effect only in the block of code in which they occur. This
is exactly what you're used to from nearly any modern programming language. For
example:
-->

`let` 绑定只在它所出现的那段代码块中生效。这和你在几乎所有现代编程语言中习惯的行为是完全一致的。例如：

```ocaml
let x = 42 in
  (* y is not meaningful here *)
  x + (let y = "3110" in
         (* y is meaningful here *)
         int_of_string y)
```

<!--
The *scope* of a variable is where its name is meaningful. Variable `y` is in
scope only inside of the `let` expression that binds it above.
-->

变量的作用域，就是它的名字有意义的那片区域。上面的变量 `y` 只在绑定它的那个 `let` 表达式内部处于作用域之中。

<!--
It's possible to have overlapping bindings of the same name. For example:
-->

同一个名字当然也可能有重叠的多次绑定。例如：

```ocaml
let x = 5 in
  ((let x = 6 in x) + x)
```

<!--
But this is darn confusing, and for that reason, it is strongly discouraged
style.
Nonetheless, let's consider what that code means.
-->

不过这种写法非常容易让人困惑，因此是一种强烈不推荐的风格。尽管如此，我们还是来看看这段代码究竟意味着什么。

<!--
To what value does that code evaluate? The answer comes down to how `x` is
replaced by a value each time it occurs. Here are a few possibilities for such
*substitution*:
-->

这段代码会求值为哪个值？答案取决于：每次出现 `x` 时，它究竟会被什么值替换掉。下面是几种可能的替换方式：

```ocaml
(* possibility 1 *)
let x = 5 in
  ((let x = 6 in 6) + 5)

(* possibility 2 *)
let x = 5 in
  ((let x = 6 in 5) + 5)

(* possibility 3 *)
let x = 5 in
  ((let x = 6 in 6) + 6)
```

<!--
The first one is what nearly any reasonable language would do. And most likely
it's what you would guess But, **why?**
-->

第一种是几乎任何讲道理的语言都会做的事。它大概也是你最自然会猜到的结果。可是，**为什么？**

<!--
The answer is something we'll call the *Principle of Name Irrelevance*: the name
of a variable shouldn't intrinsically matter. You're used to this from math. For
example, the following two functions are the same:
-->

答案涉及一个我们称之为*名字无关原则*的东西：变量的名字本身不应该从根本上产生影响。你其实早就在数学中习惯这一点了。例如，下面两个函数是一样的：

\begin{align*} f(x) &= x^2 \\ f(y) &= y^2 \end{align*}

<!--
It doesn't intrinsically matter whether we call the argument to the function
$x$ or $y$; either way, it's still the squaring function.
Therefore, in programs, these two functions should be identical:
-->

我们把函数的参数叫做 $x$ 还是叫做 $y$，本质上并不重要；不管怎样，它依然都是平方函数。因此，在程序里，下面这两个函数也应当被视为相同：

```ocaml
let f x = x * x
let f y = y * y
```

<!--
This principle is more commonly known as *alpha equivalence*: the two functions
are equivalent up to renaming of variables, which is also called *alpha
conversion* for historical reasons that are unimportant here.
-->

这个原则更常见的名字叫做【alpha 等价|alpha equivalence】：两个函数在变量重命名之后仍然等价。而这种重命名，也出于一些此处并不重要的历史原因，被称作【alpha 转换|alpha conversion】。

<!--
According to the Principle of Name Irrelevance, these two expressions should be
identical:
-->

按照名字无关原则，下面这两个表达式应当是相同的：

```ocaml
let x = 6 in x
let y = 6 in y
```

<!--
Therefore, the following two expressions, which have the above expressions
embedded in them, should also be identical:
-->

因此，下面这两个把上述表达式嵌进去的更大表达式，也应当是相同的：

```ocaml
let x = 5 in (let x = 6 in x) + x
let x = 5 in (let y = 6 in y) + x
```

<!--
But for those to be identical, we **must** choose the first of the three
possibilities above. It is the only one that makes the name of the variable be
irrelevant.
-->

而要让它们真的相同，我们**就必须**在前面三种替换方式中选择第一种。只有它才能让变量名真正变得无关紧要。

<!--
There is a term commonly used for this phenomenon: a new binding of a variable
*shadows* any old binding of the variable name. Metaphorically, it's as if the
new binding temporarily casts a shadow over the old binding. But eventually the
old binding could reappear as the shadow recedes.
-->

这个现象有一个常见术语：变量的新绑定会遮蔽该变量名的旧绑定。这个比喻很形象：新绑定暂时给旧绑定投下了一层阴影。不过等阴影退去，旧绑定依旧还在那里。

{{ video_embed | replace("%%VID%%", "4SqMkUwakEA")}}

<!--
Shadowing is not mutable assignment. For example, both of the following
expressions evaluate to 11:
-->

遮蔽并不等于可变赋值。例如，下面这两个表达式都会求值为 11：

```ocaml
let x = 5 in ((let x = 6 in x) + x)
let x = 5 in (x + (let x = 6 in x))
```

<!--
Likewise, the following utop transcript is not mutable assignment, though at
first it could seem like it is:
-->

同样地，下面这个 utop 交互记录也不是可变赋值，虽然它一开始看起来很像：

```ocaml
# let x = 42;;
val x : int = 42
# let x = 22;;
val x : int = 22
```

<!--
Recall that every `let` definition in the toplevel is effectively a nested `let`
expression. So the above is effectively the following:
-->

回忆一下，toplevel 里的每个 `let` 定义，本质上都等价于一个嵌套的 `let`表达式。因此，上面的写法实际上等同于：

```ocaml
let x = 42 in
  let x = 22 in
    ... (* whatever else is typed in the toplevel *)
```

<!--
The right way to think about this is that the second `let` binds an entirely new
variable that just happens to have the same name as the first `let`.
-->

正确的理解方式是：第二个 `let` 绑定的是一个全新的变量，只不过它恰好和第一个 `let` 使用了同样的名字。

<!--
Here is another utop transcript that is well worth studying:
-->

下面还有一段很值得仔细研究的 utop 交互记录：

```ocaml
# let x = 42;;
val x : int = 42
# let f y = x + y;;
val f : int -> int = <fun>
# f 0;;
: int = 42
# let x = 22;;
val x : int = 22
# f 0;;
- : int = 42  (* x did not mutate! *)
```

<!--
To summarize, each let definition binds an entirely new variable. If that new
variable happens to have the same name as an old variable, the new variable
temporarily shadows the old one. But the old variable is still around, and its
value is immutable: it never, ever changes. So even though `let` expressions
might superficially look like assignment statements from imperative languages,
they are actually quite different.
-->

总结一下：每个 let 定义都会绑定一个全新的变量。如果这个新变量恰好和某个旧变量同名，那么它会暂时遮蔽旧变量。但旧变量仍然存在，而且它的值是不可变的：永远、永远不会发生改变。所以，尽管 `let` 表达式在表面上看起来很像命令式语言中的赋值语句，实际上它们截然不同。

<!--
## Type Annotations
-->

## 类型标注

<!--
OCaml automatically infers the type of every expression, with no need for the
programmer to write it manually. Nonetheless, it can sometimes be useful to
manually specify the desired type of an expression. A *type annotation* does
that:
-->

OCaml 会自动推断每个表达式的类型，程序员没有必要手动把它们都写出来。不过，有时候手动指定某个表达式所期望的类型也会很有帮助。类型标注做的就是这件事：

```{code-cell} ocaml
(5 : int)
```

<!--
An incorrect annotation will produce a compile-time error:
-->

如果标注写错了，就会产生编译时错误：

```{code-cell} ocaml
:tags: ["raises-exception"]
(5 : float)
```

<!--
And that example shows why you might use manual type annotations during
debugging.  Perhaps you had forgotten that `5` cannot be treated as a `float`,
and you tried to write:
-->

这个例子也说明了：为什么你在调试时可能会想用手动类型标注。也许你一时忘了 `5` 不能被当作 `float` 使用，于是写出了：

```ocaml
5 +. 1.1
```

<!--
You might try manually specifying that `5` was supposed to be a `float`:
-->

这时你可能会尝试手动说明 `5` 本来应该是一个 `float`：

```{code-cell} ocaml
:tags: ["raises-exception"]
(5 : float) +. 1.1
```

<!--
It's clear that the type annotation has failed. Although that might seem silly
for this tiny program, you might find this technique to be effective as programs
get larger.
-->

现在就很清楚了：这个类型标注失败了。虽然对这样一个小程序来说，这看起来似乎有点可笑，但当程序变大之后，你可能会发现这种技巧真的很有帮助。

<!--
```{important}
Type annotations are **not** *type casts*, such as might be found in C or Java.
They do not indicate a conversion from one type to another. Rather they indicate
a check that the expression really does have the given type.
```
-->

```{important}
类型标注**不是**像 C 或 Java 中那样的类型强制转换。它并不表示把一个类型转换成另一个类型；它表示的只是：检查该表达式是否真的具有给定的类型。
```

<!--
**Syntax.** The syntax of a type annotation:
-->

**语法**

```ocaml
(e : t)
```

<!--
Note that the parentheses are required.
-->

注意，括号是必需的。

<!--
**Dynamic semantics.** There is no run-time meaning for a type annotation.
It goes away during compilation, because it indicates a compile-time check.
There is no run-time conversion.
So, if `(e : t)` compiled successfully, then at run-time it is simply `e`,
and it evaluates as `e` would.
-->

**动态语义**

类型标注没有运行时意义。它会在编译期间被消去，因为它表达的是一种编译时检查。这里并不存在任何运行时转换。所以，如果 `(e : t)` 成功通过编译，那么它在运行时其实就只是 `e`，并且会像 `e` 本来那样求值。

<!--
**Static semantics.**  If `e` has type `t` then `(e : t)` has type `t`.
-->

**静态语义**

如果 `e` 的类型是 `t`，那么 `(e : t)` 的类型也是 `t`。
