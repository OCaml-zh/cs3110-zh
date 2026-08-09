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
# Functions
-->

# 函数

<!--
Since OCaml is a functional language, there's a lot to cover about functions.
Let's get started.
-->

既然 OCaml 是一门函数式语言，那么关于函数就有很多内容需要学习。我们开始吧。

<!--
```{important}
Methods and functions are not the same idea. A method is a component of an
object, and it implicitly has a receiver that is usually accessed with a keyword
like `this` or `self`. OCaml functions are not methods: they are not components
of objects, and they do not have a receiver.

Some might say that all methods are functions, but not all functions are
methods. Some might even quibble with that, making a distinction between
functions and procedures. The latter would be functions that do not return any
meaningful value, such as a `void` return type in Java or `None` return value in
Python.

So if you're coming from an object-oriented background, be careful about the
terminology. **Everything here is strictly a function, not a method.**
```
-->

```{important}
【方法|Method】和函数不是同一个概念。方法是对象的一个组成部分，并且会隐含地带有一个【接收者|Receiver】；这个接收者通常通过 `this` 或 `self` 之类的关键字访问。OCaml 中的函数不是方法：它们不是对象的组成部分，也没有接收者。

有些人可能会说，所有方法都是函数，但并非所有函数都是方法。还有人甚至会进一步区分函数和【过程|Procedure】，认为后者是不返回任何有意义值的函数，例如 Java 中返回 `void` 的函数，或者 Python 中返回 `None` 的函数。

所以，如果你来自面向对象背景，一定要小心术语。**这里讨论的全部都是严格意义上的函数，而非方法。**
```

<!--
## Function Definitions
-->

## 函数定义

{{ video_embed | replace("%%VID%%", "vCxIlagS7kA")}}

<!--
The following code
```ocaml
let x = 42
```
has an expression in it (`42`) but is not itself an expression. Rather, it is a
*definition*. Definitions bind values to names, in this case the value `42`
being bound to the name `x`. The OCaml manual describes
[definitions][definitions] (see the third major grouping titled "*definition*"
on that page), but that manual page is again primarily for reference not for
study. Definitions are not expressions, nor are expressions
definitions&mdash;they are distinct syntactic classes.
-->

下面这段代码

```ocaml
let x = 42
```

其中包含一个表达式（`42`），但它自身并非表达式。它其实是一个【定义|Definition】。定义把值绑定到名字上；在这个例子里，就是把值 `42` 绑定到名字 `x` 上。OCaml 手册中介绍了[定义][definitions]（请看该页面中第三个主要分组，标题叫作 `definition`），不过那一页同样主要用于参考，而非系统学习。定义不是表达式，表达式也不是定义；它们属于两种不同的句法类别。

[definitions]: https://ocaml.org/manual/modules.html

<!--
For now, let's focus on one particular kind of definition, a *function
definition*. Non-recursive functions are defined like this:
-->

现在，我们先只关注一种特定的定义：【函数定义|Function Definition】。非递归函数是这样定义的：

```ocaml
let f x = ...
```

{{ video_embed | replace("%%VID%%", "_x82qitu2R8")}}

<!--
Recursive functions are defined like this:
-->

【递归函数|Recursive Function】则是这样定义的：

```ocaml
let rec f x = ...
```

<!--
The difference is just the `rec` keyword. It's probably a bit surprising that
you explicitly have to add a keyword to make a function recursive, because most
languages assume by default that they are. OCaml doesn't make that assumption,
though. (Nor does the Scheme family of languages.)
-->

它们的区别只在于 `rec` 关键字。你可能会觉得有点奇怪：为了让一个函数变成递归函数，居然还要显式加一个关键字，因为大多数语言默认就允许这么做。不过 OCaml 并不做这种假设。（Scheme 家族语言也不这么做。）

<!--
One of the best known recursive functions is the factorial function. In OCaml,
it can be written as follows:
-->

最著名的递归函数之一就是阶乘函数。在 OCaml 中，它可以写成这样：

```{code-cell} ocaml
(** [fact n] is [n!].
    Requires: [n >= 0]. *)
let rec fact n = if n = 0 then 1 else n * fact (n - 1)
```

<!--
We provided a specification comment above the function to document the
precondition (`Requires`) and postcondition (`is`) of the function.
-->

我们在函数上方给出了一段规格注释，用来记录这个函数的【前置条件|Precondition】（`Requires`）与【后置条件|Postcondition】（`is`）。

<!--
Note that, as in many languages, OCaml integers are not the "mathematical"
integers but are limited to a fixed number of bits. The [manual][man] specifies
that (signed) integers are at least 31 bits, but they could be wider. As
architectures have grown, so has that size. In current implementations, OCaml
integers are 63 bits. So if you test on large enough inputs, you might begin to
see strange results. The problem is machine arithmetic, not OCaml. (For
interested readers: why 31 or 63 instead of 32 or 64? The OCaml garbage
collector needs to distinguish between integers and pointers. The runtime
representation of these therefore steals one bit to flag whether a word is an
integer or a pointer.)
-->

注意，和很多语言一样，OCaml 中的整数并不是数学意义上的「整数全集」，而是受固定的位数限制。[手册][man]说明，（带符号）整数至少有 31 位，但也可能更宽。随着体系结构位宽的增加，这个大小也在增加。在当前实现中，OCaml 的整数是 63 位。因此，如果你用足够大的输入来测试，就可能开始看到一些奇怪的结果。问题出在【机器算术|Machine Arithmetic】，而非 OCaml 本身。（顺便给感兴趣的读者解释一下：为什么是 31 或 63，而非 32 或 64？因为 OCaml 的垃圾回收器需要区分整数与指针，因此运行时表示会借用一位，用来标记一个机器字到底是整数还是指针。）

[man]: https://ocaml.org/manual/values.html#sss:values:integer

<!--
Here's another recursive function:
-->

下面是另一个递归函数：

```{code-cell} ocaml
(** [pow x y] is [x] to the power of [y].
     Requires: [y >= 0]. *)
let rec pow x y = if y = 0 then 1 else x * pow x (y - 1)
```

<!--
Note how we didn't have to write any types in either of our functions: the OCaml
compiler infers them for us automatically. The compiler solves this *type
inference* problem algorithmically, but we could do it ourselves, too. It's like
a mystery that can be solved by our mental power of deduction:
-->

注意，我们在这两个函数里都不需要手写任何类型：OCaml 编译器会自动为我们推断出来。编译器是通过算法来解决这种【类型推断|Type Inference】问题的，但我们自己其实也能做。它有点像一个可以通过推理来破解的谜题：

<!--
* Since the `if` expression can return `1` in the `then` branch, we know by the
  typing rule for `if` that the entire `if` expression has type `int`.

* Since the `if` expression has type `int`, the function's return type must be
  `int`.

* Since `y` is compared to `0` with the equality operator, `y` must be an `int`.

* Since `x` is multiplied with another expression using the `*` operator, `x`
  must be an `int`.
-->

* 因为 `if` 表达式在 `then` 分支中会返回 `1`，所以根据 `if` 的类型规则，整个 `if` 表达式的类型必须是 `int`。

* 既然这个 `if` 表达式的类型是 `int`，那么函数的返回类型也必然是 `int`。

* 因为 `y` 用相等运算符与 `0` 比较，所以 `y` 必须是 `int`。

* 因为 `x` 使用 `*` 运算符和另一个表达式相乘，所以 `x` 也必须是 `int`。

<!--
If we wanted to write down the types for some reason, we could do that:
```ocaml
let rec pow (x : int) (y : int) : int = ...
```
The parentheses are mandatory when we write the *type annotations* for `x` and
`y`. We will generally leave out these annotations, because it's simpler to let
the compiler infer them. There are other times when you'll want to explicitly
write down types. One particularly useful time is when you get a type error from
the compiler that you don't understand. Explicitly annotating the types can help
with debugging such an error message.
-->

如果出于某种原因，我们想把类型显式写下来，也完全可以：

```ocaml
let rec pow (x : int) (y : int) : int = ...
```

当我们给 `x` 和 `y` 写【类型标注|Type Annotation】时，括号是必需的。一般来说，我们通常会省略这些标注，因为让编译器自动推断会更简单。不过有些时候你会希望显式写出类型。其中一个特别有用的场景，就是你遇到一个看不懂的类型错误时。显式标出类型，往往有助于调试这种错误信息。

<!--
**Syntax.**
The syntax for function definitions:
```ocaml
let rec f x1 x2 ... xn = e
```
The `f` is a metavariable indicating an identifier being used as a function
name. These identifiers must begin with a lowercase letter. The remaining
[rules for lowercase identifiers][lowercase] can be found in the manual. The
names `x1` through `xn` are metavariables indicating argument identifiers. These
follow the same rules as function identifiers. The keyword `rec` is required if
`f` is to be a recursive function; otherwise it may be omitted.
-->

**语法**

函数定义的语法如下：

```ocaml
let rec f x1 x2 ... xn = e
```

这里的 `f` 是一个元变量，表示某个被用作函数名的【标识符|Identifier】。这些标识符必须以小写字母开头。其余关于[小写标识符的规则][lowercase]可以在手册中找到。名字 `x1` 到 `xn` 也是元变量，表示参数标识符。它们遵循和函数标识符相同的规则。如果 `f` 是一个递归函数，那么关键字 `rec` 就是必需的；否则它可以省略。

[lowercase]: https://ocaml.org/manual/lex.html#lowercase-ident

<!--
Note that syntax for function definitions is actually simplified compared to
what OCaml really allows. We will learn more about some augmented syntax for
function definition in the next couple of weeks. But for now, this simplified
version will help us focus.
-->

注意，这里的函数定义语法经过了简化，并未涵盖 OCaml 实际允许的所有写法。接下来几周里，我们还会学到一些更丰富的函数定义语法。不过目前，这种简化版本更有助于我们集中注意力。

<!--
Mutually recursive functions can be defined with the `and` keyword:
```ocaml
let rec f x1 ... xn = e1
and g y1 ... yn = e2
```
-->

【互递归|Mutually Recursive】函数可以用 `and` 关键字来定义：

```ocaml
let rec f x1 ... xn = e1
and g y1 ... yn = e2
```

<!--
For example:
-->

例如：

```{code-cell} ocaml
(** [even n] is whether [n] is even.
    Requires: [n >= 0]. *)
let rec even n =
  n = 0 || odd (n - 1)

(** [odd n] is whether [n] is odd.
    Requires: [n >= 0]. *)
and odd n =
  n <> 0 && even (n - 1);;
```

{{ video_embed | replace("%%VID%%", "W0rO84YXIXo")}}

<!--
The syntax for function types is:
```ocaml
t -> u
t1 -> t2 -> u
t1 -> ... -> tn -> u
```
The `t` and `u` are metavariables indicating types. Type `t -> u` is the type of
a function that takes an input of type `t` and returns an output of type `u`. We
can think of `t1 -> t2 -> u` as the type of a function that takes two inputs,
the first of type `t1` and the second of type `t2`, and returns an output of
type `u`. Likewise for a function that takes `n` arguments.
-->

【函数类型|Function Type】的语法如下：

```ocaml
t -> u
t1 -> t2 -> u
t1 -> ... -> tn -> u
```

这里的 `t` 和 `u` 是表示类型的元变量。类型 `t -> u` 表示一种函数：它接受一个类型为 `t` 的输入，并返回一个类型为 `u` 的输出。我们可以把 `t1 -> t2 -> u` 理解为这样一种函数：它接受两个输入，第一个输入类型为 `t1`，第二个输入类型为 `t2`，并返回一个类型为 `u` 的输出。接受 `n` 个参数的函数也可以同理理解。

<!--
**Dynamic semantics.** There is no dynamic semantics of function definitions.
There is nothing to be evaluated. OCaml just records that the name `f` is bound
to a function with the given arguments `x1..xn` and the given body `e`. Only
later, when the function is applied, will there be some evaluation to do.
-->

**动态语义**

函数定义本身没有动态语义。这里并没有什么需要求值的东西。OCaml 只是记录：名字 `f` 被绑定到了一个函数，这个函数有给定的参数 `x1..xn` 和给定的函数体 `e`。只有以后当这个函数被应用时，才真正会发生求值。

<!--
**Static semantics.** The static semantics of function definitions:

* For non-recursive functions: if by assuming that `x1 : t1` and `x2 : t2` and ...
  and `xn : tn`, we can conclude that `e : u`, then
  `f : t1 -> t2 -> ... -> tn -> u`.
* For recursive functions: if by assuming that `x1 : t1` and `x2 : t2` and ...
  and `xn : tn` and `f : t1 -> t2 -> ... -> tn -> u`, we can conclude that
  `e : u`, then `f : t1 -> t2 -> ... -> tn -> u`.
-->

**静态语义**

函数定义的静态语义如下：

* 对于非递归函数：如果在假设 `x1 : t1`、`x2 : t2`、……、`xn : tn` 的条件下，我们能够推出 `e : u`，那么就有 `f : t1 -> t2 -> ... -> tn -> u`。

* 对于递归函数：如果在假设 `x1 : t1`、`x2 : t2`、……、`xn : tn`，并且还假设 `f : t1 -> t2 -> ... -> tn -> u` 的条件下，我们能够推出 `e : u`，那么就有 `f : t1 -> t2 -> ... -> tn -> u`。

<!--
Note how the type checking rule for recursive functions assumes that the
function identifier `f` has a particular type, then checks to see whether the
body of the function is well-typed under that assumption. This is because `f` is
in scope inside the function body itself (just like the arguments are in scope).
-->

注意，递归函数的【类型检查规则|Type-Checking Rule】会先假设函数标识符 `f` 具有某个特定类型，然后再检查函数体在这个假设之下是否类型正确。这是因为 `f` 本身就在函数体的作用域内部（就像参数本身也在作用域中一样）。

<!--
## Anonymous Functions
-->

## 匿名函数

{{ video_embed | replace("%%VID%%", "JwoIIrj0bcM")}}

<!--
We already know that we can have values that are not bound to names.
The integer `42`, for example, can be entered at the toplevel without
giving it a name:
-->

我们已经知道，值并不一定非得绑定到某个名字上。例如，整数 `42` 就可以在顶层环境中直接输入，而不必给它起名字：

```{code-cell} ocaml
42
```

<!--
Or we can bind it to a name:
-->

当然，我们也可以把它绑定到某个名字上：

```{code-cell} ocaml
let x = 42
```

<!--
Similarly, OCaml functions do not have to have names; they may be *anonymous*.
For example, here is an anonymous function that increments its input:
`fun x -> x + 1`. Here, `fun` is a keyword indicating an anonymous function, `x`
is the argument, and `->` separates the argument from the body.
-->

类似地，OCaml 中的函数也不一定非要有名字；它们可以是【匿名函数|Anonymous Function】。例如，`fun x -> x + 1` 就是一个把输入加一的匿名函数。这里，`fun` 是表示匿名函数的关键字，`x` 是参数，而 `->` 把参数与函数体分隔开来。

<!--
We now have two ways we could write an increment function:
-->

于是，我们现在有两种方式可以写出一个加一函数：

```{code-cell} ocaml
let inc x = x + 1
let inc = fun x -> x + 1
```

<!--
They are syntactically different but semantically equivalent. That is, even
though they involve different keywords and put some identifiers in different
places, they mean the same thing.
-->

它们在语法上不同，但在语义上等价。也就是说，尽管它们使用了不同的关键字，并且把某些标识符放在了不同的位置，它们表达的含义是一样的。

{{ video_embed | replace("%%VID%%", "zHHCD7MOjmw")}}

<!--
Anonymous functions are also called *lambda expressions*, a term that comes from
the *lambda calculus*, which is a mathematical model of computation in the same
sense that Turing machines are a model of computation. In the lambda calculus,
`fun x -> e` would be written $\lambda x . e$. The $\lambda$ denotes an
anonymous function.
-->

匿名函数也叫作【Lambda 表达式|Lambda Expression】。这个术语来自【Lambda 演算|Lambda Calculus】，它和图灵机一样，都是一种计算的数学模型。在 Lambda 演算中，`fun x -> e` 会写成 $\lambda x.e$。其中的 $\lambda$ 就表示一个匿名函数。

<!--
It might seem a little mysterious right now why we would want functions that
have no names. Don't worry; we'll see good uses for them later in the course,
especially when we study so-called "higher-order programming". In particular, we
will often create anonymous functions and pass them as input to other functions.
-->

你现在也许会觉得有点神秘：为什么我们会想要没有名字的函数？别担心，之后的课程里我们会看到它们非常有价值的用途，尤其是在学习所谓【高阶编程|Higher-Order Programming】的时候。特别是，我们经常会创建匿名函数，并把它们作为输入传给其他函数。

<!--
**Syntax.**
```ocaml
fun x1 ... xn -> e
```
-->

**语法**

```ocaml
fun x1 ... xn -> e
```

<!--
**Static semantics.**

* If by assuming that
  `x1 : t1` and `x2 : t2` and ... and `xn : tn`, we can conclude that `e : u`,
  then `fun x1 ... xn -> e : t1 -> t2 -> ... -> tn -> u`.
-->

**静态语义**

* 如果在假设 `x1 : t1`、`x2 : t2`、……、`xn : tn` 的前提下，我们能够推出 `e : u`，那么就有 `fun x1 ... xn -> e : t1 -> t2 -> ... -> tn -> u`。

<!--
**Dynamic semantics.** An anonymous function is already a value. There is no
computation to be performed.
-->

**动态语义**

匿名函数本身已经是一个值了。这里没有任何计算需要执行。

<!--
## Function Application
-->

## 函数应用

{{ video_embed | replace("%%VID%%", "fgCTDhXAYnQ")}}

<!--
Here we cover a somewhat simplified syntax of function application compared to
what OCaml actually allows.
-->

这里我们会介绍一种经过简化的函数应用语法，它比 OCaml 实际允许的完整语法稍微简单一些。

<!--
**Syntax.**
```ocaml
e0 e1 e2 ... en
```
The first expression `e0` is the function, and it is applied to arguments `e1`
through `en`. Note that parentheses are not required around the arguments to
indicate function application, as they are in languages in the C family,
including Java.
-->

**语法**

```ocaml
e0 e1 e2 ... en
```

第一个表达式 `e0` 是函数，它被应用到参数 `e1` 到 `en` 上。注意，这里不需要像 C 家族语言（包括 Java）那样，用括号把参数包起来以表示函数应用。

<!--
**Static semantics.**

* If `e0 : t1 -> ... -> tn -> u` and `e1 : t1` and ... and `en : tn`
  then `e0 e1 ... en : u`.
-->

**静态语义**

* 如果 `e0 : t1 -> ... -> tn -> u`，并且 `e1 : t1`、……、`en : tn`，那么 `e0 e1 ... en : u`。

<!--
**Dynamic semantics.**

To evaluate `e0 e1 ... en`:
-->

**动态语义**

要对 `e0 e1 ... en` 求值：

<!--
1. Evaluate `e0` to a function. Also evaluate the argument expressions `e1`
   through `en` to values `v1` through `vn`.

   For `e0`, the result might be an anonymous function `fun x1 ... xn ->
   e` or a name `f`. In the latter case, we need to find the definition of `f`,
   which we can assume to be of the form `let rec f x1 ... xn =
   e`.  Either way, we now know the argument names `x1` through `xn` and the
   body `e`.

2. Substitute each value `vi` for the corresponding argument name `xi` in the
   body `e` of the function. That substitution results in a new expression `e'`.

3. Evaluate `e'` to a value `v`, which is the result of evaluating
   `e0 e1 ... en`.
-->

1. 先把 `e0` 求值为一个函数，同时把参数表达式 `e1` 到 `en` 求值为值 `v1` 到 `vn`。

   对于 `e0` 来说，结果可能是一个匿名函数 `fun x1 ... xn -> e`，也可能是一个名字 `f`。在后一种情况下，我们需要去找到 `f` 的定义，而它可以假设具有 `let rec f x1 ... xn = e` 这种形式。无论是哪一种，现在我们都已经知道参数名 `x1` 到 `xn`，以及函数体 `e`。

2. 在函数体 `e` 中，用每个值 `vi` 去替换对应的参数名 `xi`。这个替换会产生一个新表达式 `e'`。

3. 再把 `e'` 求值为某个值 `v`，它就是 `e0 e1 ... en` 的求值结果。

<!--
If you compare these evaluation rules to the rules for `let` expressions, you
will notice they both involve substitution. This is not an accident. In fact,
anywhere `let x = e1 in e2` appears in a program, we could replace it with
`(fun x -> e2) e1`. They are syntactically different but semantically
equivalent. In essence, `let` expressions are just syntactic sugar for anonymous
function application.
-->

如果你把这些求值规则和 `let` 表达式的规则做个比较，就会发现它们都涉及替换。这不是巧合。事实上，只要程序里出现了 `let x = e1 in e2`，我们都可以把它替换成 `(fun x -> e2) e1`。它们在语法上不同，但在语义上等价。从本质上说，`let` 表达式只是匿名函数应用的一层【语法糖|Syntactic Sugar】。

<!--
## Pipeline
-->

## 管道

{{ video_embed | replace("%%VID%%", "arS9kEqCFEU")}}

<!--
There is a built-in infix operator in OCaml for function application called the
*pipeline* operator, written `|>`. Imagine that as depicting a triangle pointing
to the right. The metaphor is that values are sent through the pipeline from
left to right. For example, suppose we have the increment function `inc` from
above as well as a function `square` that squares its input:
-->

OCaml 为函数应用提供了一个内置的中缀运算符，叫作【管道运算符|Pipeline Operator】，写作 `|>`。你可以把它想象成一个朝右的三角形。这个隐喻表达的是：值会从左到右流经管道。例如，假设我们已经有了上面的加一函数 `inc`，再加上一个把输入平方的函数 `square`：

```{code-cell} ocaml
let square x = x * x
```

<!--
Here are two equivalent ways of squaring `6`:
-->

下面有两种等价的方式来得到 6 的平方：

```{code-cell} ocaml
square (inc 5);;
5 |> inc |> square;;
```

<!--
The latter uses the pipeline operator to send `5` through the `inc` function,
then send the result of that through the `square` function. This is a nice,
idiomatic way of expressing the computation in OCaml. The former way is arguably
not as elegant: it involves writing extra parentheses and requires the reader's
eyes to jump around, rather than move linearly from left to right. The latter
way scales up nicely when the number of functions being applied grows, whereas
the former way requires more and more parentheses:
-->

后一种写法使用管道运算符，先让 `5` 流经 `inc` 函数，再把得到的结果流经 `square` 函数。这是一种非常自然、也很符合 OCaml 习惯的表达方式。前一种写法就没那么优雅了：它需要多写括号，也要求读者的视线来回跳跃，而非从左往右线性地读过去。并且，随着所应用函数数量的增加，后一种写法仍然清晰，而前一种写法则会需要越来越多的括号：

```{code-cell} ocaml
5 |> inc |> square |> inc |> inc |> square;;
square (inc (inc (square (inc 5))));;
```

<!--
It might feel weird at first, but try using the pipeline operator in your own
code the next time you find yourself writing a big chain of function
applications.
-->

一开始你也许会觉得这种写法有点怪，但下次当你发现自己又写出一长串函数应用时，不妨试着在自己的代码里用一用管道运算符。

<!--
Since `e1 |> e2` is just another way of writing `e2 e1`, we don't need to state
the semantics for `|>`: it's just the same as function application. These two
programs are another example of expressions that are syntactically different but
semantically equivalent.
-->

由于 `e1 |> e2` 只是 `e2 e1` 的另一种写法，所以我们不需要再单独说明 `|>` 的语义：它和函数应用完全一样。这两种写法再次展示了：表达式可以在语法上不同，但在语义上等价。

<!--
## Polymorphic Functions
-->

## 多态函数

{{ video_embed | replace("%%VID%%", "UWmxYBEKzN8")}}

<!--
The *identity* function is the function that simply returns its input:
-->

【恒等函数|Identity Function】就是那个简单地返回其输入的函数：

```{code-cell} ocaml
let id x = x
```

<!--
Or equivalently as an anonymous function:
-->

或者等价地写成匿名函数：

```{code-cell} ocaml
let id = fun x -> x
```

<!--
The `'a` is a *type variable*: it stands for an unknown type, just like a
regular variable stands for an unknown value. Type variables always begin with a
single quote. Commonly used type variables include `'a`, `'b`, and `'c`, which
OCaml programmers typically pronounce in Greek: alpha, beta, and gamma.
-->

其中的 `'a` 是一个【类型变量|Type Variable】：它代表某个未知类型，就像普通变量代表某个未知值一样。类型变量总是以单引号开头。常见的类型变量包括 `'a`、`'b` 和 `'c`，OCaml 程序员通常按希腊字母的名称把它们读作阿尔法、贝塔和伽马。

<!--
We can apply the identity function to any type of value we like:
-->

我们可以把恒等函数应用到任何自己想要的值上：

```{code-cell} ocaml
id 42;;
id true;;
id "bigred";;
```

<!--
Because you can apply `id` to many types of values, it is a *polymorphic*
function: it can be applied to many (*poly*) forms (*morph*).
-->

由于你可以把 `id` 应用于很多不同类型的值，所以它是一个【多态|Polymorphic】函数：它可以作用于多种形式。

<!--
With manual type annotations, it's possible to give a more restrictive type
to a polymorphic function than the type the compiler automatically infers.
For example:
-->

借助手工类型标注，我们可以给一个多态函数赋予比编译器自动推断结果更受限制的类型。例如：

```{code-cell} ocaml
let id_int (x : int) : int = x
```

<!--
That's the same function as `id`, except for the two manual type annotations.
Because of those, we cannot apply `id_int` to a `bool` like we did `id`:
-->

除了这两个手写的类型标注之外，它和 `id` 是同一个函数。正因为有了这些标注，我们就不能像使用 `id` 那样，把 `id_int` 应用于一个 `bool`：

```{code-cell} ocaml
:tags: ["raises-exception"]
id_int true
```

<!--
Another way of writing `id_int` would be in terms of `id`:
-->

用 `id` 来写 `id_int`，也可以这么做：

```{code-cell} ocaml
let id_int' : int -> int = id
```

<!--
In effect, we took a value of type `'a -> 'a`, and we bound it to a name whose
type was manually specified as being `int -> int`. You might ask, why does that
work? They aren't the same types, after all.
-->

从效果上看，我们拿了一个类型为 `'a -> 'a` 的值，并把它绑定到一个类型被手工指定为 `int -> int` 的名字上。你也许会问：这为什么行得通？毕竟它们又不是同一个类型。

<!--
One way to think about this is in terms of **behavior.** The type of `id_int`
specifies one aspect of its behavior: given an `int` as input, it promises to
produce an `int` as output. It turns out that `id` also makes the same promise:
given an `int` as input, it too will return an `int` as output. Now `id` also
makes many more promises, such as: given a `bool` as input, it will return a
`bool` as output. So by binding `id` to a more restrictive type `int -> int`, we
have thrown away all those additional promises as irrelevant. Sure, that's
information lost, but at least no promises will be broken.  It's always
going to be safe to use a function of type `'a -> 'a` when what we needed
was a function of type `int -> int`.
-->

理解这一点的一种方式，是从【行为|Behavior】的角度去看。`id_int` 的类型说明了它行为的一个方面：给它一个 `int` 作为输入，它承诺会返回一个 `int` 作为输出。而事实上，`id` 也做出了同样的承诺：如果输入是 `int`，它同样会返回 `int`。当然，`id` 还做出了更多承诺，比如：如果输入是 `bool`，它也会返回 `bool`。所以，当我们把 `id` 绑定到一个更受限制的类型 `int -> int` 上时，我们只是把那些多出来的承诺统统丢掉了，因为在这里它们并不重要。没错，这样做确实丢失了一些信息，但至少不会违背任何承诺。当我们需要的是 `int -> int` 类型的函数时，使用一个 `'a -> 'a` 类型的函数总是安全的。

<!--
The converse is not true. If we needed a function of type `'a -> 'a` but tried
to use a function of type `int -> int`, we'd be in trouble as soon as someone
passed an input of another type, such as `bool`. To prevent that trouble, OCaml
does something potentially surprising with the following code:
-->

反过来则不成立。如果我们需要的是一个 `'a -> 'a` 类型的函数，却试图用一个 `int -> int` 类型的函数来代替，那么只要有人传入别的类型（例如 `bool`），我们立刻就会陷入麻烦。为了防止这种情况，OCaml 对下面这段代码会做一件也许有点出人意料的事：

```{code-cell} ocaml
let id' : 'a -> 'a = fun x -> x + 1
```

<!--
Function `id'` is actually the increment function, not the identity function. So
passing it a `bool` or `string` or some complicated data structure is not safe;
the only data `+` can safely manipulate are integers. OCaml therefore
*instantiates* the type variable `'a` to `int`, thus preventing us from
applying `id'` to non-integers:
-->

函数 `id'` 其实是一个加一函数，而非恒等函数。因此，把 `bool`、`string` 或某种复杂数据结构传给它都不安全；`+` 唯一能够安全处理的数据就是整数。所以，OCaml 会把类型变量 `'a`【实例化|Instantiation】为 `int`，从而阻止我们把 `id'` 应用到非整数上：

```{code-cell} ocaml
:tags: ["raises-exception"]
id' true
```

<!--
That leads us to another, more mechanical, way to think about all of this in
terms of **application**. By that we mean the very same notion of how a function
is applied to arguments: when evaluating the application `id 5`, the argument
`x` is *instantiated* with value `5`. Likewise, the `'a` in the type of `id` is
being instantiated with type `int` at that application. So if we write
-->

这又引出了另一种更机械化的理解方式，也就是从【函数应用|Function Application】的角度来看待整件事。这里说的「应用」，正是函数如何被作用到参数上的那个概念：当我们求值 `id 5` 时，参数 `x` 被值 `5` 实例化了。同样地，`id` 类型中的 `'a` 在这次应用中也被实例化成了 `int`。因此，如果我们写下

```{code-cell} ocaml
let id_int' : int -> int = id
```

<!--
we are in fact instantiating the `'a` in the type of `id` with the type `int`.
And just as there is no way to "unapply" a function&mdash;for example, given `5`
we can't compute backwards to `id 5`&mdash;we can't unapply that type
instantiation and change `int` back to `'a`.
-->

那么我们实际上就是把 `id` 类型中的 `'a` 实例化为了 `int`。而且，正如函数本身没有办法「反向应用」一样——例如，给你一个 `5`，你没法再倒推回 `id 5`——我们也没法把这种类型实例化「反过来取消」，再把 `int` 改回 `'a`。

<!--
To make that precise, suppose we have a `let` definition [or expression]:
-->

为了更精确地说明这件事，假设我们有一个 `let` 定义（或者表达式）：

```ocaml
let x = e [in e']
```

<!--
and that OCaml infers `x` has a type `t` that includes some type variables `'a`,
`'b`, etc. Then we are permitted to instantiate those type variables. We can do
that by applying the function to arguments that reveal what the type
instantiations should be (as in `id 5`) or by a type annotation (as in
`id_int'`), among other ways. But we have to be consistent with the
instantiation. For example, we cannot take a function of type `'a -> 'b -> 'a`
and instantiate it at type `int -> 'b -> string`, because the instantiation of
`'a` is not the same type in each of the two places it occurred:
-->

并且 OCaml 推断出 `x` 的类型是 `t`，其中包含一些类型变量 `'a`、`'b` 等等。那么我们就被允许对这些类型变量进行实例化。我们既可以通过把函数应用到能暴露出具体类型的参数上（例如 `id 5`），也可以通过类型标注（例如 `id_int'`）来完成实例化，此外还有别的方式。但无论如何，实例化必须保持一致。例如，我们不能把一个类型为 `'a -> 'b -> 'a` 的函数实例化为 `int -> 'b -> string`，因为 `'a` 在它出现的两个位置上并没有被实例化成同一个类型：

```{code-cell} ocaml
:tags: ["raises-exception"]
let first x y = x;;
let first_int : int -> 'b -> int = first;;
let bad_first : int -> 'b -> string = first;;
```

<!--
## Labeled and Optional Arguments
-->

## 标签参数与可选参数

<!--
The type and name of a function usually give you a pretty good idea of what the
arguments should be. However, for functions with many arguments (especially
arguments of the same type), it can be useful to label them. For example, you
might guess that the function `String.sub` returns a substring of the given
string (and you would be correct). You could type in `String.sub` to find its
type:
-->

一个函数的类型和名字，通常已经能让你大致猜出它的参数该是什么。不过对于参数很多的函数（尤其是多个参数类型还一样的时候），给参数加标签会很有帮助。例如，你也许能猜到函数 `String.sub` 会返回给定字符串的一个子串（而且你猜得没错）。你可以把 `String.sub` 输入出来看看它的类型：

```{code-cell} ocaml
String.sub;;
```

<!--
But it's not clear from the type how to use it&mdash;you're forced to consult
the documentation.
-->

但仅从这个类型本身，并不容易看出它到底该怎么用——你只好去查文档。

<!--
OCaml supports labeled arguments to functions. You can declare this kind of
function using the following syntax:
-->

OCaml 支持函数的【标签参数|Labeled Argument】。你可以用下面这种语法来声明这样的函数：

```{code-cell} ocaml
let f ~name1:arg1 ~name2:arg2 = arg1 + arg2;;
```

<!--
This function can be called by passing the labeled arguments in either order:
-->

这个函数在调用时，可以把标签参数按任意顺序传入：

```ocaml
f ~name2:3 ~name1:4
```

<!--
Labels for arguments are often the same as the variable names for them. OCaml
provides a shorthand for this case. The following are equivalent:
-->

参数标签往往就和对应的变量名相同。OCaml 为这种情况提供了简写。下面这两种写法是等价的：

```ocaml
let f ~name1:name1 ~name2:name2 = name1 + name2
let f ~name1 ~name2 = name1 + name2
```

<!--
Use of labeled arguments is largely a matter of taste. They convey extra
information, but they can also add clutter to types.
-->

是否使用标签参数，在很大程度上取决于个人风格。它们能传达额外信息，但也会让类型签名显得更臃肿。

<!--
The syntax to write both a labeled argument and an explicit type annotation for
it is:
-->

如果你想同时写出标签参数和它的显式类型标注，语法是这样的：

```ocaml
let f ~name1:(arg1 : int) ~name2:(arg2 : int) = arg1 + arg2
```

<!--
It is also possible to make some arguments optional. When called without an
optional argument, a default value will be provided. To declare such a function,
use the following syntax:
-->

某些参数还可以被声明为【可选参数|Optional Argument】。如果调用时没有传入该参数，那么函数会采用默认值。要声明这样的函数，可以用下面的语法：

```{code-cell} ocaml
let f ?name:(arg1=8) arg2 = arg1 + arg2
```

<!--
You can then apply the function with or without the argument:
-->

之后你既可以带着这个参数调用函数，也可以不带：

```{code-cell} ocaml
f ~name:2 7
```

```{code-cell} ocaml
f 7
```

<!--
## Partial Application
-->

## 部分应用

{{ video_embed | replace("%%VID%%", "85xVK0wmDTw")}}

<!--
We could define an addition function as follows:
-->

我们可以像下面这样定义一个加法函数：

```{code-cell} ocaml
let add x y = x + y
```

<!--
Here's a rather similar function:
-->

下面还有一个和它非常相似的函数：

```{code-cell} ocaml
let addx x = fun y -> x + y
```

<!--
Function `addx` takes an integer `x` as input and returns a *function* of type
`int -> int` that will add `x` to whatever is passed to it.
-->

函数 `addx` 接收一个整数 `x` 作为输入，并返回一个类型为 `int -> int` 的函数。这个返回出来的函数会把 `x` 加到它之后收到的输入上。

<!--
The type of `addx` is `int -> int -> int`. The type of `add` is also
`int -> int -> int`. So from the perspective of their types, they are the same
function. But the form of `addx` suggests something interesting: we can apply it
to just a single argument.
-->

`addx` 的类型是 `int -> int -> int`。`add` 的类型也同样是 `int -> int -> int`。所以从类型角度看，它们是同一个函数。但 `addx` 的写法暗示了一件很有意思的事情：我们可以只向它提供一个参数。

```{code-cell} ocaml
let add5 = addx 5
```

```{code-cell} ocaml
add5 2
```

<!--
It turns out the same can be done with `add`:
-->

结果发现，对 `add` 也完全可以这么做：

```{code-cell} ocaml
let add5 = add 5
```

```{code-cell} ocaml
add5 2;;
```

<!--
What we just did is called *partial application*: we partially applied the
function `add` to one argument, even though you would normally think of it as a
multi-argument function. This works because the following three functions are
*syntactically different* but *semantically equivalent*. That is, they are
different ways of expressing the same computation:
-->

我们刚才做的事情叫作【部分应用|Partial Application】：虽然你通常会把 `add` 看成一个多参数函数，但我们实际上只把它应用到了一个参数上。这之所以可行，是因为下面这三个函数虽然*语法不同*，但*语义等价*。也就是说，它们只是表达同一个计算的不同方式：

```ocaml
let add x y = x + y
let add x = fun y -> x + y
let add = fun x -> (fun y -> x + y)
```

<!--
So `add` is really a function that takes an argument `x` and returns a function
`(fun y -> x + y)`. Which leads us to a deep truth...
-->

所以，`add` 实际上是一个接受参数 `x` 并返回函数 `(fun y -> x + y)` 的函数。这就把我们带向了一个更深的真相……

<!--
## Function Associativity
-->

## 函数的结合性

<!--
Are you ready for the truth?  Take a deep breath.  Here goes...

**Every OCaml function takes exactly one argument.**
-->

你准备好面对真相了吗？深吸一口气。真相来了……

**每一个 OCaml 函数都恰好只接受一个参数。**

<!--
Why? Consider `add`: although we can write it as `let add x y = x + y`, we know
that's semantically equivalent to `let add = fun x -> (fun y -> x + y)`. And in
general,
-->

为什么？想想 `add`：虽然我们可以把它写成 `let add x y = x + y`，但我们已经知道，这在语义上等价于 `let add = fun x -> (fun y -> x + y)`。一般地，

```ocaml
let f x1 x2 ... xn = e
```

<!--
is semantically equivalent to
-->

它在语义上等价于

```ocaml
let f =
  fun x1 ->
    (fun x2 ->
       (...
          (fun xn -> e)...))
```

<!--
So even though you think of `f` as a function that takes `n` arguments, in
reality it is a function that takes 1 argument and returns a function.
-->

所以，尽管你习惯于把 `f` 想成一个接受 `n` 个参数的函数，但实际上，它是一个接受 1 个参数并返回另一个函数的函数。

<!--
The type of such a function

```ocaml
t1 -> t2 -> t3 -> t4
```

really means the same as

```ocaml
t1 -> (t2 -> (t3 -> t4))
```

That is, function types are *right associative*: there are implicit parentheses
around function types, from right to left. The intuition here is that a function
takes a single argument and returns a new function that expects the remaining
arguments.
-->

这样的函数类型

```ocaml
t1 -> t2 -> t3 -> t4
```

真正的意思其实等同于

```ocaml
t1 -> (t2 -> (t3 -> t4))
```

也就是说，函数类型是【右结合|Right Associative】的：其中隐含的括号从右向左结合。这里的直觉是：一个函数接受一个参数，然后返回一个等待接收其余参数的新函数。

<!--
Function application, on the other hand, is *left associative*: there
are implicit parentheses around function applications, from left to right.
So

```ocaml
e1 e2 e3 e4
```

really means the same as

```ocaml
((e1 e2) e3) e4
```

The intuition here is that the left-most expression grabs the next
expression to its right as its single argument.
-->

而函数应用则是【左结合|Left Associative】的：其中隐含的括号从左向右结合。所以

```ocaml
e1 e2 e3 e4
```

真正的意思等同于

```ocaml
((e1 e2) e3) e4
```

这里的直觉是：最左边的表达式会抓取它右边紧接着的那个表达式，作为自己的唯一参数。

<!--
## Operators as Functions
-->

## 运算符作为函数

{{ video_embed | replace("%%VID%%", "OVKOx8UiwxM")}}

<!--
The addition operator `+` has type `int -> int -> int`. It is normally written
*infix*, e.g., `3 + 4`. By putting parentheses around it, we can make it a
*prefix* operator:
-->

加法运算符 `+` 的类型是 `int -> int -> int`。它通常以【中缀运算符|Infix Operator】的形式书写，例如 `3 + 4`。如果我们给它加上括号，就可以把它变成【前缀运算符|Prefix Operator】：

```{code-cell} ocaml
( + )
```

```{code-cell} ocaml
( + ) 3 4;;
```

```{code-cell} ocaml
let add3 = ( + ) 3
```

```{code-cell} ocaml
add3 2
```

<!--
The same technique works for any built-in operator.
-->

同样的技巧适用于任何内置运算符。

<!--
Normally the spaces are unnecessary. We could write `(+)` or `( + )`, but it is
best to include them. Beware of multiplication, which *must* be written as
`( * )`, because `(*)` would be parsed as beginning a comment.
-->

通常来说，空格其实不是必需的。我们既可以写 `(+)`，也可以写 `( + )`，不过最好还是带上空格。需要特别注意乘法，它*必须*写成 `( * )`，因为 `(*)` 会被解析为注释的开始。

<!--
We can even define our own new infix operators, for example:
```ocaml
let ( ^^ ) x y = max x y
```
And now `2 ^^ 3` evaluates to `3`.

The rules for which punctuation can be used to create infix operators are not
necessarily intuitive. Nor is the relative precedence with which such operators
will be parsed. So be careful with this usage.
-->

我们甚至还可以定义自己的新中缀运算符，例如：

```ocaml
let ( ^^ ) x y = max x y
```

现在，`2 ^^ 3` 就会求值为 `3`。

至于哪些标点符号可以用来创建中缀运算符，这套规则并不一定直观。类似地，这些运算符被解析时的相对【优先级|Precedence】也不那么直观。因此，在使用这种写法时请格外小心。

<!--
## Tail Recursion
-->

## 尾递归

<!--
Consider the following seemingly uninteresting function, which counts from 1 to
`n`:
-->

考虑下面这个乍看之下并不起眼的函数，它从 1 数到 `n`：

```{code-cell} ocaml
(** [count n] is [n], computed by adding 1 to itself [n] times.  That is,
    this function counts up from 1 to [n]. *)
let rec count n =
  if n = 0 then 0 else 1 + count (n - 1)
```

<!--
Counting to 10 is no problem:
-->

数到 10 完全没问题：

```{code-cell} ocaml
count 10
```

<!--
Counting to 100,000 is no problem either:
-->

数到 100,000 也没问题：

```{code-cell} ocaml
count 100_000
```

<!--
But try counting to 1,000,000 and you'll get the following error:
```
Stack overflow during evaluation (looping recursion?).
```
What's going on here?
-->

但如果你尝试数到 1,000,000，就会看到下面这个错误：

```text
Stack overflow during evaluation (looping recursion?).
```

这是怎么回事？

<!--
**The Call Stack.** The issue is that the *call stack* has a limited size. You
probably learned in one of your introductory programming classes that most
languages implement function calls with a stack. That stack contains one element
for each function call that has been started but has not yet completed. Each
element stores information like the values of local variables and which
instruction in the function is currently being executed. When the evaluation of
one function body calls another function, a new element is pushed on the call
stack, and it is popped off when the called function completes.
-->

**调用栈。** 问题在于，【调用栈|Call Stack】的大小是有限的。你大概在某门入门编程课中已经学过：大多数语言都用栈来实现函数调用。对于每一个已经开始但尚未完成的函数调用，栈里都会有一个对应元素。每个元素里保存着局部变量的值、当前正在执行函数中的哪一条指令等信息。当某个函数体的求值过程中又调用了另一个函数时，就会有一个新元素被压入调用栈；而当被调用的函数执行完成时，这个元素又会被弹出。

<!--
The size of the stack is usually limited by the operating system. So if the
stack runs out of space, it becomes impossible to make another function call.
Normally this doesn't happen, because there's no reason to make that many
successive function calls before returning. In cases where it does happen,
there's good reason for the operating system to make that program stop: it might
be in the process of eating up *all* the memory available on the entire
computer, thus harming other programs running on the same computer. The `count`
function isn't likely to do that, but this function would:
-->

栈的大小通常由操作系统限制。因此，一旦栈空间耗尽，就不可能再继续进行新的函数调用了。正常情况下这不会发生，因为一般没有理由在返回之前连续做出那么多层函数调用。但如果真的发生了，操作系统让程序停下来的理由其实很充分：程序可能正在逐步吃掉整台计算机上的*全部*可用内存，从而伤害同机运行的其他程序。`count` 函数不太可能发展成那样，但下面这个函数就有可能：

```{code-cell} ocaml
let rec count_forever n = 1 + count_forever n
```

<!--
So the operating system for safety's sake limits the call stack size. That means
eventually `count` will run out of stack space on a large enough input. Notice
how that choice is really independent of the programming language. So this same
issue can and does occur in languages other than OCaml, including Python and
Java. You're just less likely to have seen it manifest there, because you
probably never wrote quite as many recursive functions in those languages.
-->

因此，出于安全考虑，操作系统会限制调用栈的大小。这意味着当输入足够大时，`count` 迟早会耗尽栈空间。注意，这个问题其实与具体编程语言无关。所以，同样的问题完全可能，也确实会出现在 OCaml 之外的语言里，包括 Python 和 Java。你之所以较少在那些语言里见过它，只是因为你大概并没有在那些语言中写过这么多递归函数。

<!--
**Tail Recursion.** There is a solution to this issue that was described in a
[1977 paper about LISP by Guy Steele][lisp-tailcall]. The solution, *tail-call
optimization*, requires some cooperation between the programmer and the
compiler. The programmer does a little rewriting of the function, which the
compiler then notices and applies an optimization. Let's see how it works.
-->

**尾递归。** 这个问题有一个解决方案，它最早由 Guy Steele 在一篇[1977 年关于 LISP 的论文][lisp-tailcall]中描述。这个方案叫作【尾调用优化|Tail-Call Optimization】，它需要程序员和编译器之间进行一点配合：程序员先稍微改写函数，编译器再识别出这种改写，并据此应用优化。下面我们来看看它是怎么工作的。

[lisp-tailcall]: https://dl.acm.org/doi/pdf/10.1145/800179.810196

<!--
Suppose that a recursive function `f` calls itself then returns the result of
that recursive call. Our `count` function does *not* do that:
-->

假设一个递归函数 `f` 调用它自己，然后直接返回那次递归调用的结果。我们的 `count` 函数*并非*这样做的：

```{code-cell} ocaml
let rec count n =
  if n = 0 then 0 else 1 + count (n - 1)
```

<!--
Rather, after the recursive call `count (n - 1)`, there is computation
remaining: the computer still needs to add `1` to the result of that call.
-->

相反，在递归调用 `count (n - 1)` 之后，还有计算没有完成：计算机还得把 `1` 加到这次调用的结果上。

<!--
But we as programmers could rewrite the `count` function so that it does *not*
need to do any additional computation after the recursive call. The trick is
to create a helper function with an extra parameter:
-->

但作为程序员，我们可以把 `count` 改写成这样一种形式：在递归调用之后*无需*做任何额外计算。诀窍就是创建一个带有额外参数的辅助函数：

```{code-cell} ocaml
let rec count_aux n acc =
  if n = 0 then acc else count_aux (n - 1) (acc + 1)

let count_tr n = count_aux n 0
```

<!--
Function `count_aux` is almost the same as our original `count`, but it adds an
extra parameter named `acc`, which is idiomatic and stands for "accumulator".
The idea is that the value we want to return from the function is slowly, with
each recursive call, being accumulated in it. The "remaining computation"
&mdash;the addition of 1&mdash; now happens *before* the recursive call not
*after*.  When the base case of the recursion finally arrives, the function
now returns `acc`, where the answer has been accumulated.
-->

函数 `count_aux` 和原本的 `count` 几乎一样，只不过它多了一个额外参数 `acc`。这个名字很符合惯例，表示【累加器|Accumulator】。其思想是：函数最终想返回的那个值，会随着每一次递归调用，逐步积累到它里面。「剩余的计算」——也就是加上 1 这件事——现在发生在递归调用*之前*，而非*之后*。当递归终于到达基本情况时，函数直接返回 `acc`，因为答案已经积累在那里面了。

<!--
But the original base case of 0 still needs to exist in the code somewhere.
And it does, as the original value of `acc` that is passed to `count_aux`.
Now `count_tr` (we'll get to why the name is "tr" in just a minute) works
as a replacement for our original `count`.
-->

不过，原来那个基本情况中的 0 仍然需要在代码的某个地方存在。它确实还在，只是现在变成了传给 `count_aux` 的 `acc` 的初始值。于是 `count_tr`（这个名字里为什么有个 `tr`，我们一会儿就会解释）就成了原始 `count` 的替代版本。

<!--
At this point we've completed the programmer's responsibility, but it's probably
not clear why we went through this effort. After all `count_aux` will still call
itself recursively too many times as `count` did, and eventually overflow the
stack.
-->

到这里为止，程序员这边该做的事情已经做完了。但你可能还不清楚：我们为什么要费这番功夫。毕竟，`count_aux` 不还是会像 `count` 一样递归调用自己很多次，最终把栈撑爆吗？

<!--
That's where the compiler's responsibility kicks in. A good compiler (and the
OCaml compiler is good this way) can notice when a recursive call is in *tail
position*, which is a technical way of saying "there's no more computation to be
done after it returns". The recursive call to `count_aux` is in tail position;
the recursive call to `count` is not. Here they are again so you can compare
them:
-->

这时候就轮到编译器发挥作用了。一个优秀的编译器（而 OCaml 编译器在这一点上就很优秀）能够识别某个递归调用是否处在【尾位置|Tail Position】。所谓尾位置，从技术上说，就是「在它返回之后已经没有别的计算需要继续做了」。`count_aux` 中的递归调用就在尾位置；而 `count` 中的递归调用则不在。把它们再放在一起比较一次：

```{code-cell} ocaml
:tags: ["remove-output"]
let rec count n =
  if n = 0 then 0 else 1 + count (n - 1)

let rec count_aux n acc =
  if n = 0 then acc else count_aux (n - 1) (acc + 1)
```

<!--
Here's why tail position matters: **A recursive call in tail position does not
need a new stack frame. It can just reuse the existing stack frame.** That's
because there's nothing left of use in the existing stack frame! There's no
computation left to be done, so none of the local variables, or next instruction
to execute, etc. matter any more. None of that memory ever needs to be read
again, because that call is effectively already finished. So instead of wasting
space by allocating another stack frame, the compiler "recycles" the space used
by the previous frame.
-->

尾位置之所以重要，原因就在于：**处在尾位置的递归调用不需要新的【栈帧|Stack Frame】，它可以直接复用现有栈帧。** 这是因为，现有栈帧里已经没有任何还用得上的东西了！既然没有剩余计算需要继续执行，那么局部变量、下一条要执行的指令等等，都已经不再重要。那些内存以后根本不会再被读取，因为从效果上讲，这次调用其实已经完成了。所以，编译器不会浪费空间去再分配一个新的栈帧，而是会把前一个栈帧的空间「回收再利用」。

<!--
This is the *tail-call optimization*. It can even be applied in cases beyond
recursive functions if the calling function's stack frame is suitably compatible
with the callee. And, it's a big deal. The tail-call optimization reduces the
stack space requirements from linear to constant. Whereas `count` needed $O(n)$
stack frames, `count_aux` needs only $O(1)$, because the same frame gets reused
over and over again for each recursive call. And that means `count_tr` actually
can count to 1,000,000:
-->

这就是【尾调用优化|Tail-Call Optimization】。如果调用方函数的栈帧与被调用方足够兼容，它甚至还能被应用在递归函数之外的场景里。而且，这是一件大事。尾调用优化把栈空间需求从线性降低到了常数。`count` 需要 $O(n)$ 个栈帧，而 `count_aux` 只需要 $O(1)$，因为同一个栈帧会在每次递归调用中被不断重复利用。这也就意味着，`count_tr` 真的可以数到 1,000,000：

```{code-cell} ocaml
count_tr 1_000_000
```

<!--
Finally, why did we name this function `count_tr`? The "tr" stands for *tail
recursive*. A tail recursive function is a recursive function whose recursive
calls are all in tail position. In other words, it's a function that (unless
there are other pathologies) will not exhaust the stack.
-->

最后，为什么我们把这个函数命名为 `count_tr`？其中的 `tr` 表示【尾递归|Tail Recursive】。尾递归函数指的是：它的所有递归调用都处在尾位置。换句话说，除非还有其他异常情况，它就是一种不会耗尽栈空间的函数。

<!--
**The Importance of Tail Recursion.** Sometimes beginning functional programmers
fixate a bit too much upon it. If all you care about is writing the first draft
of a function, you probably don't need to worry about tail recursion. It's
pretty easy to make it tail recursive later if you need to, just by adding an
accumulator argument. Or maybe you should rethink how you have designed the
function. Take `count`, for example: it's kind of dumb. But later we'll see
examples that aren't dumb, such as iterating over lists with thousands of
elements.
-->

**尾递归的重要性。** 刚开始学习函数式编程的人，有时会对它过度执着。如果你现在关心的只是先把一个函数的初稿写出来，那么大概不必一开始就为尾递归担心。等以后真的有需要时，再通过增加一个累加器参数把它改成尾递归，通常都不难。或者，也许你应该反过来重新思考这个函数的设计。拿 `count` 来说，它本来就有点傻。不过之后我们会看到一些一点都不傻的例子，比如遍历一个有成千上万元素的列表。

<!--
It is important that the compiler support the optimization. Otherwise, the
transformation you do to the code as a programmer makes no difference. Indeed,
most compilers do support it, at least as an option. Java is a notable
exception.
-->

编译器是否支持这种优化非常重要。否则，你作为程序员对代码做出的这种改写根本不会带来任何差别。事实上，大多数编译器都支持它，至少会把它作为某种选项提供。Java 则是一个著名的例外。

<!--
**The Recipe for Tail Recursion.** In a nutshell, here's how we made a function
be tail recursive:

1. Change the function into a helper function. Add an extra argument: the
   accumulator, often named `acc`.
1. Write a new "main" version of the function that calls the helper. It passes
   the original base case's return value as the initial value of the
   accumulator.
1. Change the helper function to return the accumulator in the base case.
1. Change the helper function's recursive case. It now needs to do the extra
   work on the accumulator argument, before the recursive call. This is the only
   step that requires much ingenuity.
-->

**尾递归的配方。** 简而言之，我们把一个函数改造成尾递归的步骤如下：

1. 把原函数改写成一个辅助函数。给它增加一个额外参数：累加器，通常命名为 `acc`。
2. 再写一个新的「主」版本函数，用它来调用辅助函数。它会把原始基本情况的返回值，作为累加器的初始值传进去。
3. 把辅助函数的基本情况改成直接返回累加器。
4. 修改辅助函数的递归情况。现在它必须在递归调用之前，就先把额外工作做在累加器参数上。这也是唯一一个真正需要你动脑筋的步骤。

<!--
**An Example: Factorial.** Let's transform this factorial function to be
tail recursive:
-->

**一个例子：阶乘。** 下面我们把这个阶乘函数改写成尾递归形式：

```{code-cell} ocaml
(** [fact n] is [n] factorial. *)
let rec fact n =
  if n = 0 then 1 else n * fact (n - 1)
```

<!--
First, we change its name and add an accumulator argument:
```ocaml
let rec fact_aux n acc = ...
```
-->

首先，我们改掉它的名字，并加上一个累加器参数：

```ocaml
let rec fact_aux n acc = ...
```

<!--
Second, we write a new "main" function that calls the helper with the original
base case as the accumulator:
```ocaml
let fact_tr n = fact_aux n 1
```
-->

第二，我们写一个新的「主」函数，用原本基本情况中的值作为累加器初值，去调用辅助函数：

```ocaml
let fact_tr n = fact_aux n 1
```

<!--
Third, we change the helper function to return the accumulator in the base case:
```ocaml
if n = 0 then acc ...
```
-->

第三，我们把辅助函数的基本情况改成返回累加器：

```ocaml
if n = 0 then acc ...
```

<!--
Finally, we change the recursive case:
```ocaml
else fact_aux (n - 1) (n * acc)
```
-->

最后，我们修改递归情况：

```ocaml
else fact_aux (n - 1) (n * acc)
```

<!--
Putting it all together, we have:
-->

把这些拼在一起，就得到：

```{code-cell} ocaml
let rec fact_aux n acc =
  if n = 0 then acc else fact_aux (n - 1) (n * acc)

let fact_tr n = fact_aux n 1
```

<!--
It was a nice exercise, but maybe not worthwhile.  Even before we exhaust the
stack space, the computation suffers from integer overflow:
-->

这确实是个不错的练习，但未必真的值得。因为甚至在栈空间耗尽之前，这个计算就已经会先遭遇【整数溢出|Integer Overflow】了：

```{code-cell} ocaml
fact 50
```

<!--
To solve that problem, we turn to OCaml's big integer library,
[Zarith][zarith]. Here we use a few OCaml features that are beyond anything
we've seen so far, but hopefully nothing terribly surprising. (If you want to
follow along with this code, first install Zarith in OPAM with
`opam install zarith`.)
-->

要解决这个问题，我们得转向 OCaml 的【大整数|Big Integer】库 [Zarith][zarith]。这里会用到一些我们目前还没正式学过的 OCaml 特性，不过希望它们也不会太令人意外。（如果你想跟着这段代码一起动手，请先在 OPAM 中运行 `opam install zarith` 来安装 Zarith。）

[zarith]: https://antoinemine.github.io/Zarith/doc/latest/Z.html

```{code-cell} ocaml
:tags: ["remove-cell"]
#use "topfind";;
```

```{code-cell} ocaml
:tags: ["remove-output"]
#require "zarith.top";;
```

```{code-cell} ocaml
let rec zfact_aux n acc =
  if Z.equal n Z.zero then acc else zfact_aux (Z.pred n) (Z.mul acc n);;

let zfact_tr n = zfact_aux n Z.one;;

zfact_tr (Z.of_int 50)
```

<!--
If you want you can use that code to compute `zfact_tr 1_000_000` without stack
or integer overflow, though it will take several minutes.
-->

如果你愿意，你甚至可以用这段代码去计算 `zfact_tr (Z.of_int 1_000_000)`，既不会栈溢出，也不会整数溢出，只不过它大概要运行几分钟。

<!--
The chapter on modules will explain the OCaml features we used above in detail,
but for now:
-->

关于上面用到的这些 OCaml 特性，我们会在模块那一章中详细解释。现在先简单说明一下：

<!--
- `#require` loads the library, which provides a module named `Z`. Recall that
  $\mathbb{Z}$ is the symbol used in mathematics to denote the integers.

- `Z.n` means the name `n` defined inside of `Z`.

- The type `Z.t` is the library's name for the type of big integers.

- We use library values `Z.equal` for equality comparison, `Z.zero` for 0,
  `Z.pred` for predecessor (i.e., subtracting 1), `Z.mul` for multiplication,
  `Z.one` for 1, and `Z.of_int` to convert a primitive integer to a big integer.
-->

- `#require` 会加载这个库，而它提供了一个名为 `Z` 的模块。回想一下，$\mathbb{Z}$ 在数学中正是用来表示整数集合的符号。

- `Z.n` 表示模块 `Z` 内部定义的名字 `n`。

- 类型 `Z.t` 是这个库用来表示大整数类型的名字。

- 我们使用库中的值 `Z.equal` 来做相等比较，`Z.zero` 表示 0，`Z.pred` 表示前驱（也就是减 1），`Z.mul` 表示乘法，`Z.one` 表示 1，而 `Z.of_int` 用来把 OCaml 的原语整数转换成大整数。
