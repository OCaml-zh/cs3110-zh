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
# Lists
-->

# 列表

{{ video_embed | replace("%%VID%%", "x8oLIEtSRBs")}}

<!--
An OCaml list is a sequence of values all of which have the same type. They are
implemented as singly-linked lists. These lists enjoy a first-class status in
the language: there is special support for easily creating and working with
lists. That's a characteristic that OCaml shares with many other functional
languages. Mainstream imperative languages, like Python, have such support these
days too. Maybe that's because programmers find it so pleasant to work directly
with lists as a first-class part of the language, rather than having to go
through a library (as in C and Java).
-->

OCaml 【列表|List】是由具有相同【类型|Type】的值组成的【序列|Sequence】。
它们实现为【单链表|Singly-Linked List】。这些列表在语言中享有
【一等|First-Class】地位：语言提供了特殊支持，以便轻松创建和使用列表。
这是 OCaml 与许多其他【函数式语言|Functional Language】共有的特征。
主流【命令式语言|Imperative Language】（如 Python）如今也有这样的支持。
也许这是因为程序员觉得，直接把列表作为语言的一等部分来使用非常愉快，
而非必须通过一个【库|Library】（如 C 和 Java 中那样）来使用。

<!--
## Building Lists
-->

## 构建列表

{{ video_embed | replace("%%VID%%", "I9u4kFPM7YI")}}

<!--
**Syntax.**  There are three syntactic forms for building lists:
-->

**语法**

有三种构建列表的语法形式：

```ocaml
[]
e1 :: e2
[e1; e2; ...; en]
```

<!--
The empty list is written `[]` and is pronounced "nil", a name that comes from
Lisp. Given a list `lst` and element `elt`, we can prepend `elt` to `lst` by
writing `elt :: lst`. The double-colon operator is pronounced "cons", a name
that comes from an operator in Lisp that <u>cons</u>tructs objects in memory.
"Cons" can also be used as a verb, as in "I will cons an element onto the list."
The first element of a list is usually called its *head* and the rest of the
elements (if any) are called its *tail*.
-->

【空列表|Empty List】写作 `[]`，读作「nil」，这个名称来自 Lisp。
给定一个列表 `lst` 和【元素|Element】 `elt`，我们可以通过写 `elt :: lst`，
将 `elt` 【前置|Prepend】到 `lst`。双冒号运算符读作「cons」，
这个名称来自 Lisp 中的一个运算符，它在内存中【cons|构造】对象。
「Cons」也可以用作动词，如「我将 cons 一个元素到某个列表」。
列表的第一个元素通常称为它的【头部|Head】，
而其余元素（如果有的话）称为它的【尾部|Tail】。

<!--
The cons operator `::` is right associative, meaning that `e1 :: e2 :: e3` is
understood as `e1 :: (e2 :: e3)`, not as `(e1 :: e2) :: e3`.
-->

cons 运算符 `::` 是【右结合|Right Associative】的，这意味着
`e1 :: e2 :: e3` 被理解为 `e1 :: (e2 :: e3)`，而非
`(e1 :: e2) :: e3`。

<!--
The square bracket syntax is convenient but unnecessary. Any list
`[e1; e2; ...; en]` could instead be written with the more primitive nil and
cons syntax: `e1 :: e2 :: ... :: en :: []`. When a pleasant syntax can be
defined in terms of a more primitive syntax within the language, we call the
pleasant syntax *syntactic sugar*: it makes the language "sweeter". Transforming
the sweet syntax into the more primitive syntax is called *desugaring*.
-->

【方括号语法|Square Bracket Syntax】很方便，但并非必要。任何列表
`[e1; e2; ...; en]` 都可以改用更【原语|Primitive】的 nil 和 cons
语法来写：`e1 :: e2 :: ... :: en :: []`。当一种好用的语法可以在语言中
用更原语的语法来定义时，我们称这种好用的语法为【语法糖|Syntactic Sugar】：
它让语言变得「更甜」。将这种甜美的语法转换为更原始语法的过程称为
【脱糖|Desugaring】。

<!--
Because the elements of the list can be arbitrary expressions, lists can be
nested as deeply as we like, e.g., `[[[]]; [[1; 2; 3]]]`.
-->

因为列表的元素可以是任意表达式，所以列表可以按
我们喜欢的深度嵌套，例如 `[[[]]; [[1; 2; 3]]]`。

<!--
<!--
**Dynamic semantics.**
-->

**动态语义**
-->

**动态语义**

<!--
* `[]` is already a value.
 * If `e1` evaluates to `v1`, and if `e2` evaluates to `v2`, then `e1 :: e2`
  evaluates to `v1 :: v2`.
-->

* `[]` 本身就是一个值。
  * 若 `e1` 求值为 `v1`，且 `e2` 求值为 `v2`，则 `e1 :: e2` 求值为 `v1 :: v2`。

<!--
As a consequence of those rules and how to desugar the square-bracket notation
for lists, we have the following derived rule:
-->

基于这些规则以及如何对列表的方括号记法脱糖，我们有以下推导规则：

<!--
 * If `ei` evaluates to `vi` for all `i` in `1..n`, then `[e1; ...; en]`
  evaluates to `[v1; ...; vn]`.
-->

 * 若对于 `1..n` 中的所有的 `i`，`ei` 求值为 `vi`，则 `[e1; ...; en]` 求值为 `[v1; ...; vn]`。

<!--
It's starting to get tedious to write "evaluates to" in all our evaluation
rules. So let's introduce a shorter notation for it. We'll write `e ==> v` to
mean that `e` evaluates to `v`. Note that `==>` is not a piece of OCaml syntax.
Rather, it's a notation we use in our description of the language, kind of like
metavariables. Using that notation, we can rewrite the latter two rules above:

 * If `e1 ==> v1`, and if `e2 ==> v2`, then `e1 :: e2 ==> v1 :: v2`.
 * If `ei ==> vi` for all `i` in `1..n`, then `[e1; ...; en] ==> [v1; ...; vn]`.
-->

在所有【求值规则|Evaluation Rule】中都写「求值为」开始变得有些冗长。
所以我们为它引入一种更短的记法。我们会写 `e ==> v`，表示 `e` 求值为 `v`。
注意，`==>` 不是 OCaml 语法的一部分。相反，它是我们在描述语言时
使用的一种记法，有点像【元变量|Metavariable】。使用这种记法，我们可以把
上面的后两条规则改写为：

 * 若 `e1 ==> v1`，且 `e2 ==> v2`，则 `e1 :: e2 ==> v1 :: v2`。
 * 若对于 `1..n` 中的所有 `i`，`ei ==> vi`，则 `[e1; ...; en] ==> [v1; ...; vn]`。

<!--
**Static semantics.**
-->

**静态语义**

<!--
All the elements of a list must have the same type. If that element type is `t`,
then the type of the list is `t list`. You should read such types from right to
left: `t list` is a list of `t`'s, `t list list` is a list of list of `t`'s,
etc. The word `list` itself here is not a type: there is no way to build an
OCaml value that has type simply `list`. Rather, `list` is a *type constructor*:
given a type, it produces a new type. For example, given `int`, it produces the
type `int list`. You could think of type constructors as being like functions
that operate on types, instead of functions that operate on values.
-->

列表的所有元素都必须具有相同类型。如果该元素类型是 `t`，那么列表的类型
就是 `t list`。你应该从右到左阅读这样的类型：`t list` 是 `t` 的列表，
`t list list` 是 `t` 的列表的列表，依此类推。这里的单词 `list` 本身
不是类型：无法构造一个类型仅仅是 `list` 的 OCaml 【值|Value】。相反，
`list` 是一个【类型构造子|Type Constructor】：给定一个类型，它会产生
一个新类型。例如，给定 `int`，它会产生类型 `int list`。你可以把类型构造子
看作类似于函数的东西，只不过它们操作类型，而非操作值。

<!--
The type-checking rules:

* `[] : 'a list`
* If `e1 : t` and `e2 : t list` then `e1 :: e2 : t list`. In case the colons
  and their precedence is confusing, the latter means `(e1 :: e2) : t list`.
-->

【类型检查规则|Type-Checking Rule】：

* `[] : 'a list`
* 若 `e1 : t` 且 `e2 : t list`，则 `e1 :: e2 : t list`。如果冒号及其
  【优先级|Precedence】让人困惑，后者的意思是 `(e1 :: e2) : t list`。

<!--
In the rule for `[]`, recall that `'a` is a type variable: it stands for an
unknown type. So the empty list is a list whose elements have an unknown type.
If we cons an `int` onto it, say `2 :: []`, then the compiler infers that for
that particular list, `'a` must be `int`. But if in another place we cons a
`bool` onto it, say `true :: []`, then the compiler infers that for that
particular list, `'a` must be `bool`.
-->

在 `[]` 的规则中，回忆一下，`'a` 是一个【类型变量|Type Variable】：
它代表一个【未知类型|Unknown Type】。所以空列表是一个元素具有未知类型的
列表。如果我们把一个 `int` cons 到它上面，比如 `2 :: []`，那么
编译器会【推断|Infer】出，对于这个特定列表，`'a` 必须是 `int`。
但如果在另一个地方，我们把一个 `bool` cons 到它上面，比如
`true :: []`，那么编译器会推断出，对于那个特定列表，`'a` 必须是 `bool`。

<!--
## Accessing Lists
-->

## 访问列表

{{ video_embed | replace("%%VID%%", "AkrlDpHN_zE")}}

```{note}
<!--
The video linked above also uses records and tuples as examples. Those are
covered in a [later section](records_tuples) of this book.
-->

上面链接的视频还使用了【记录|Record】和【元组|Tuple】作为例子。
本书的[后续小节](records_tuples)会介绍它们。
```

{{ video_embed | replace("%%VID%%", "sO9wxUxajS4")}}

<!--
There are really only two ways to build a list, with nil and cons. So if we want
to take apart a list into its component pieces, we have to say what to do with
the list if it's empty, and what to do if it's non-empty (that is, a cons of one
element onto some other list). We do that with a language feature called
*pattern matching*.
-->

构造列表实际上只有两种方式：nil 和 cons。因此，如果我们想把一个列表拆成
它的组件，【空|Empty】列表时该怎么做，【非空|Non-Empty】列表时该怎么做
（也就是把一个元素 cons 到某个其他列表上），这些情况都必须说明。
我们用一种称为【模式匹配|Pattern Matching】的语言特性来做到这一点。

<!--
Here's an example of using pattern matching to compute the sum of a list:
-->

下面是一个使用模式匹配来计算列表之【和|Sum】的例子：

```{code-cell} ocaml
let rec sum lst =
  match lst with
  | [] -> 0
  | h :: t -> h + sum t
```

<!--
This function says to take the input `lst` and see whether it has the same shape
as the empty list. If so, return 0. Otherwise, if it has the same shape as the
list `h :: t`, then let `h` be the first element of `lst`, and let `t` be the
rest of the elements of `lst`, and return `h + sum t`. The choice of variable
names here is meant to suggest "head" and "tail" and is a common idiom, but we
could use other names if we wanted. Another common idiom is:
-->

这个函数表示：接受输入 `lst`，查看它是否具有与空列表相同的【形状|Shape】。
如果是，则返回 0。否则，如果它具有与列表 `h :: t`
相同的形状，那么让 `h` 作为 `lst` 的第一个元素，让 `t` 作为 `lst`
的其余元素，并返回 `h + sum t`。这里选择这些【变量名|Variable Name】是为了
暗示「【头部|Head】」和「【尾部|Tail】」，这是一种常见【习语|Idiom】，
但如果愿意，我们也可以使用其他名称。另一种常见习语是：

```{code-cell} ocaml
let rec sum xs =
  match xs with
  | [] -> 0
  | x :: xs' -> x + sum xs'
```

<!--
That is, the input list is a list of xs (pronounced EX-uhs), the head element is
an x, and the tail is xs' (pronounced EX-uhs prime).
-->

也就是说，输入列表是一个由 xs（读作 EX-uhs）组成的列表，头部元素是一个
x，而尾部是 xs'（读作 EX-uhs prime）。

<!--
Syntactically it isn't necessary to use so many lines to define `sum`. We could
do it all on one line:
-->

从【语法|Syntax】上说，定义 `sum` 并不需要使用这么多行。我们可以把它全部
写在一行上：

```{code-cell} ocaml
let rec sum xs = match xs with | [] -> 0 | x :: xs' -> x + sum xs'
```

<!--
Or, noting that the first `|` after `with` is optional regardless of how many
lines we use, we could also write:
-->

或者，注意无论我们使用多少行，`with` 后的第一个 `|` 都是
【可选|Optional】的，所以我们也可以写成：

```{code-cell} ocaml
let rec sum xs = match xs with [] -> 0 | x :: xs' -> x + sum xs'
```

<!--
The multi-line format is what we'll usually use in this book, because it helps
the human eye understand the syntax a bit better. OCaml code formatting tools,
though, are moving toward the single-line format whenever the code is short
enough to fit on just one line.
-->

【多行格式|Multi-Line Format】是本书通常会使用的格式，因为它有助于人眼
更好地理解语法。不过，当代码短到足以放在一行中时，OCaml
【代码格式化工具|Code Formatting Tool】会将它转换为【单行格式|Single-Line Format】。

<!--
Here's another example of using pattern matching to compute the length of a
list:
-->

下面是另一个使用模式匹配来计算列表【长度|Length】的例子：

```{code-cell} ocaml
let rec length lst =
  match lst with
  | [] -> 0
  | h :: t -> 1 + length t
```

<!--
Note how we didn't actually need the variable `h` in the right-hand side of the
pattern match. When we want to indicate the presence of some value in a pattern
without actually giving it a name, we can write `_` (the underscore character):
-->

注意，在模式匹配的【右侧|Right-Hand Side】中，我们实际上并不需要变量 `h`。
当我们想要表示某个值在【模式|Pattern】中存在，但并不实际给它命名时，
可以写 `_`（下划线字符）：

```{code-cell} ocaml
let rec length lst =
  match lst with
  | [] -> 0
  | _ :: t -> 1 + length t
```

<!--
That function is actually built-in as part of the OCaml standard library `List`
module. Its name there is `List.length`. That "dot" notation indicates the
function named `length` inside the module named `List`, much like the dot
notation used in many other languages.
-->

这个函数实际上是 OCaml 【标准库|Standard Library】 `List`
【模块|Module】中的内置函数。它在那里的名字是 `List.length`。
这种「点」记法表示名为 `List` 的模块中名为 `length` 的函数，
很像许多其他语言中使用的点记法。

<!--
And here's a third example that appends one list onto the beginning of
another list:
-->

下面是第三个例子，它把一个列表【追加|Append】到另一个列表的开头：

```{code-cell} ocaml
let rec append lst1 lst2 =
  match lst1 with
  | [] -> lst2
  | h :: t -> h :: append t lst2
```

<!--
For example, `append [1; 2] [3; 4]` is `[1; 2; 3; 4]`. That function is actually
available as a built-in operator `@`, so we could instead write
`[1; 2] @ [3; 4]`.
-->

例如，`append [1; 2] [3; 4]` 是 `[1; 2; 3; 4]`。
这个函数实际上也可以作为内置运算符 `@` 使用，所以我们可以改写为 `[1; 2] @ [3; 4]`。

{{ video_embed | replace("%%VID%%", "VDRTatjSl0E")}}

<!--
As a final example, we could write a function to determine whether
a list is empty:
-->

作为最后一个例子，我们可以编写一个函数，来判断列表是否为空：

```{code-cell} ocaml
let empty lst =
  match lst with
  | [] -> true
  | h :: t -> false
```

<!--
But there is a much better way to write the same function without pattern matching:
-->

但还有一种好得多的方式，可以不用模式匹配来编写同一个函数：

```{code-cell} ocaml
let empty lst =
  lst = []
```

<!--
Note how all the recursive functions above are similar to doing proofs by
induction on the natural numbers: every natural number is either 0 or is 1
greater than some other natural number $n$, and so a proof by induction has a
base case for 0 and an inductive case for $n + 1$. Likewise, all our functions
have a base case for the empty list and a recursive case for the list that has
one more element than another list. This similarity is no accident. There is a
deep relationship between induction and recursion; we'll explore that
relationship in more detail later in the book.
-->

注意，上面的所有【递归函数|Recursive Function】都类似于对【自然数|Natural Number】
做【归纳法证明|Proof By Induction】：
每个自然数要么是 0，要么比某个其他自然数 $n$ 大 1，
因此归纳法证明有一个针对 0 的【基本情况|Base Case】，
以及一个针对 $n + 1$ 的【归纳情况|Inductive Case】。
类似地，我们的所有函数都有一个针对空列表的基本情况，
以及一个针对比另一个列表多一个元素的列表的【递归情况|Recursive Case】。
这种相似性并非偶然。【归纳|Induction】和【递归|Recursion】之间有着深刻的关系；
本书后面会更详细地探讨这种关系。

<!--
By the way, there are two library functions `List.hd` and `List.tl` that return
the head and tail of a list. It is not good, idiomatic OCaml to apply these
directly to a list. The problem is that they will raise an exception when
applied to the empty list, and you will have to remember to handle that
exception. Instead, you should use pattern matching: you'll then be forced to
match against both the empty list and the non-empty list (at least), which will
prevent exceptions from being raised, thus making your program more robust.
-->

顺便说一下，有两个【库函数|Library Function】 `List.hd` 和 `List.tl`，
它们返回列表的头部和尾部。把它们直接应用于列表，并不是好的、
符合习语的 OCaml 写法。问题在于，当它们被应用于空列表时，
会【引发|Raise】一个【异常|Exception】，而你必须记得【处理|Handle】那个异常。
相反，你应该使用模式匹配：这样你就会被迫同时匹配空列表和非空列表（至少如此），
这将防止异常被引发，从而让你的程序更加【健壮|Robust】。

<!--
## (Not) Mutating Lists
-->

## （不）修改列表

<!--
Lists are immutable. There's no way to change an element of a list from one
value to another. Instead, OCaml programmers create new lists out of old lists.
For example, suppose we wanted to write a function that returned the same list
as its input list, but with the first element (if there is one) incremented by
one. We could do that:
-->

列表是【不可变|Immutable】的。没有办法把列表中的一个元素从一个值改成另一个值。
相反，OCaml 程序员会从旧列表创建新列表。例如，假设我们想编写一个函数，
它返回与输入列表相同的列表，但第一个元素（如果存在）增加 1。我们可以这样做：

```ocaml
let inc_first lst =
  match lst with
  | [] -> []
  | h :: t -> h + 1 :: t
```

<!--
Now you might be concerned about whether we're being wasteful of space. After
all, there are at least two ways the compiler could implement the above code:

1. Copy the entire tail list `t` when the new list is created in the pattern
   match with cons, such that the amount of memory in use just increased by an
   amount proportionate to the length of `t`.

2. Share the tail list `t` between the old list and the new list, such that the
   amount of memory in use does not increase&mdash;beyond the one extra piece of
   memory needed to store `h + 1`.
-->

现在你可能会担心我们是否在浪费空间。毕竟，编译器至少可以用两种方式实现上面的代码：

1. 在模式匹配中用 cons 创建新列表时，复制整个尾部列表 `t`，
   使得正在使用的内存数量增加一个与 `t` 的长度成比例的量。

2. 在旧列表和新列表之间【共享|Share】尾部列表 `t`，
   使得正在使用的内存数量不会增加&mdash;除了存储 `h + 1` 所需的那一小块额外内存之外。

<!--
In fact, the compiler does the latter. So there's no need for concern. The
reason that it's quite safe for the compiler to implement sharing is exactly
that list elements are immutable. If they were instead mutable, then we'd start
having to worry about whether the list I have is shared with the list you have,
and whether changes I make will be visible in your list. So immutability makes
it easier to reason about the code, and makes it safe for the compiler to
perform an optimization.
-->

事实上，编译器采用的是后一种方式，所以没有必要担心。编译器实现共享之所以相当安全，
原因正是列表元素不可变。如果它们反而是【可变|Mutable】的，
那么我们就会开始担心我的列表是否与你的列表共享，以及我做出的改变是否会在你的列表中可见。
因此，【不可变性|Immutability】让代码更容易【推理|Reason About】，
也能让编译器安全地执行【优化|Optimization】。

<!--
## Pattern Matching with Lists
-->

## 对列表进行模式匹配

<!--
We saw above how to access lists using pattern matching. Let's look more
carefully at this feature.
-->

上面我们看到了如何使用模式匹配来访问列表。下面更仔细地看看这个特性。

**语法**

```ocaml
match e with
| p1 -> e1
| p2 -> e2
| ...
| pn -> en
```

<!--
Each of the clauses `pi -> ei` is called a *branch* or a *case* of the pattern
match. The first vertical bar in the entire pattern match is optional.
-->

每个 `pi -> ei` 【子句|Clause】都称为模式匹配的一个【分支|Branch】或【情况|Case】。
整个模式匹配中的第一个竖线是可选的。

<!--
The `p`'s here are a new syntactic form called a *pattern*. For now, a pattern
may be:

* a variable name, e.g., `x`
* the underscore character `_`, which is called the *wildcard*
* the empty list `[]`
* `p1 :: p2`
* `[p1; ...; pn]`
-->

这里的 `p` 是一种新的【句法形式|Syntactic Form】，称为模式。目前，模式可以是：

* 变量名，例如 `x`
* 下划线字符 `_`，它称为【通配符|Wildcard】
* 空列表 `[]`
* `p1 :: p2`
* `[p1; ...; pn]`

<!--
No variable name may appear more than once in a pattern. For example, the
pattern `x :: x` is illegal. The wildcard may occur any number of times.
-->

同一个变量名不能在一个模式中出现超过一次。例如，模式 `x :: x` 是【非法|Illegal】的。
通配符可以出现任意多次。

<!--
As we learn more of data structures available in OCaml, we'll expand
the possibilities for what a pattern may be.
-->

随着我们学习 OCaml 中更多可用的【数据结构|Data Structure】，
我们会扩展模式可能具有的形式。

**动态语义**

{{ video_embed | replace("%%VID%%", "sz72NP4u4DQ")}}

<!--
Pattern matching involves two inter-related tasks: determining whether a pattern
matches a value, and determining what parts of the value should be associated
with which variable names in the pattern. The former task is intuitively about
determining whether a pattern and a value have the same *shape*. The latter task
is about determining the *variable bindings* introduced by the pattern. For
example, consider the following code:
-->

模式匹配涉及两个相互关联的任务：确定一个模式是否【匹配|Match】一个值，
以及确定值的哪些部分应该与模式中的哪些变量名相关联。直观上，
前一个任务是确定模式和值是否具有相同形状。
后一个任务是确定模式引入的【变量绑定|Variable Binding】。例如，考虑下面的代码：

```{code-cell} ocaml
match 1 :: [] with
| [] -> false
| h :: t -> h >= 1 && List.length t = 0
```

<!--
When evaluating the right-hand side of the second branch, `h` is bound to `1`
and `t` is bound to `[]`. Let's write `h->1` to mean the variable binding saying
that `h` has value `1`; this is not a piece of OCaml syntax, but rather a
notation we use to reason about the language. So the variable bindings produced
by the second branch would be `h->1, t->[]`.
-->

在对第二个分支的右侧求值时，`h` 被【绑定|Bind】到 `1`，而 `t` 被绑定到 `[]`。
我们写 `h->1` 来表示这个变量绑定，即 `h` 具有值 `1`；这不是 OCaml 语法的一部分，
而是我们用于推理语言的一种记法。所以第二个分支产生的变量绑定将是 `h->1, t->[]`。

<!--
Using that notation, here is a definition of when a pattern matches a value and
the bindings that match produces:
-->

使用这种记法，下面定义了模式何时匹配一个值，以及这次匹配会产生哪些绑定：

<!--
 * The pattern `x` matches any value `v` and produces the variable binding
   `x->v`.
-->

 * 模式 `x` 匹配任意值 `v`，并产生变量绑定 `x->v`。

<!--
 * The pattern `_` matches any value and produces no bindings.
-->

 * 模式 `_` 匹配任意值，并且不产生绑定。

<!--
 * The pattern `[]` matches the value `[]` and produces no bindings.
-->

 * 模式 `[]` 匹配值 `[]`，并且不产生绑定。

<!--
* If `p1` matches `v1` and produces a set $b_1$ of bindings, and if `p2` matches
  `v2` and produces a set $b_2$ of bindings, then `p1 :: p2` matches `v1 :: v2`
  and produces the set $b_1 \cup b_2$ of bindings. Note that `v2` must be a list
  (since it's on the right-hand side of `::`) and could have any length: 0
  elements, 1 element, or many elements. Note that the union $b_1 \cup b_2$ of
  bindings will never have a problem where the same variable is bound separately
  in both $b_1$ and $b_2$ because of the syntactic restriction that no variable
  name may appear more than once in a pattern.
-->

* 如果 `p1` 匹配 `v1` 并产生一个绑定集合 $b_1$，且 `p2` 匹配 `v2` 并产生一个绑定集合 $b_2$，
  那么 `p1 :: p2` 匹配 `v1 :: v2`，并产生绑定【集合|Set】 $b_1 \cup b_2$。
  注意，`v2` 必须是一个列表（因为它位于 `::` 的右侧），
  且可以具有任意长度：0 个元素、1 个元素或多个元素。注意，绑定的【并集|Union】
  $b_1 \cup b_2$ 永远不会出现同一个变量分别在 $b_1$ 和 $b_2$ 中被绑定的问题，
  因为有一个【句法限制|Syntactic Restriction】：同一个变量名不能在一个模式中出现超过一次。

<!--
* If for all `i` in `1..n`, it holds that `pi` matches `vi` and produces the set
  $b_i$ of bindings, then `[p1; ...; pn]` matches `[v1; ...; vn]` and produces
  the set $\bigcup_i b_i$ of bindings. Note that this pattern specifies the
  exact length the list must be.
-->

* 如果对于 `1..n` 中的所有 `i`，`pi` 匹配 `vi` 并产生绑定集合 $b_i$，
  那么 `[p1; ...; pn]` 匹配 `[v1; ...; vn]`，并产生绑定集合 $\bigcup_i b_i$。
  注意，这个模式指定了列表必须具有的【精确长度|Exact Length】。

<!--
Now we can say how to evaluate `match e with p1 -> e1 | ... | pn -> en`:
-->

现在我们可以说明如何对 `match e with p1 -> e1 | ... | pn -> en` 求值：

<!--
  * Evaluate `e` to a value `v`.
-->

  * 将 `e` 求值为值 `v`。

<!--
  * Attempt to match `v` against `p1`, then against `p2`, and so on, in the order
    they appear in the match expression.
-->

  * 尝试按它们在【匹配表达式|Match Expression】中出现的顺序，
    将 `v` 先与 `p1` 匹配，再与 `p2` 匹配，依此类推。

<!--
* If `v` does not match against any of the patterns, then evaluation of the
  match expression raises a `Match_failure` exception. We haven't yet discussed
  exceptions in OCaml, but you're surely familiar with them from other
  languages. We'll come back to exceptions near the end of this chapter, after
  we've covered some of the other built-in data structures in OCaml.
-->

* 如果 `v` 不匹配任何模式，那么匹配表达式的求值会引发 `Match_failure` 异常。
  我们还没有讨论 OCaml 中的异常，但你肯定已经从其他语言中熟悉它们了。
  在介绍完 OCaml 中其他一些内置数据结构之后，我们会在本章末尾回到异常。

<!--
  * Otherwise, let `pi` be the first pattern that matches, and let $b$ be the
    variable bindings produced by matching `v` against `pi`.
-->

  * 否则，令 `pi` 为第一个匹配的模式，并令 $b$ 为将 `v` 与 `pi` 匹配所产生的变量绑定。

<!--
  * Substitute those bindings $b$ inside `ei`, producing a new expression `e'`.
-->

  * 在 `ei` 内【替换|Substitute】这些绑定 $b$，产生一个新的【表达式|Expression】 `e'`。

<!--
  * Evaluate `e'` to a value `v'`.
-->

  * 将 `e'` 求值为值 `v'`。

<!--
  * The result of the entire match expression is `v'`.
-->

  * 整个匹配表达式的【结果|Result】是 `v'`。

<!--
For example, here's how this match expression would be evaluated:
-->

例如，以下展示了该匹配表达式是如何求值的：

```{code-cell} ocaml
match 1 :: [] with
| [] -> false
| h :: t -> h = 1 && t = []
```

<!--
* `1 :: []` is already a value.

* `[]` does not match ``1 :: []``.

* `h :: t` does match `1 :: []` and produces variable bindings
   {`h->1`,`t->[]`}, because:

  - `h` matches `1` and produces the variable binding `h->1`.

  - `t` matches `[]` and produces the variable binding `t->[]`.

* Substituting {`h->1`,`t->[]`} inside `h = 1 && t = []`
  produces a new expression `1 = 1 && [] = []`.

* Evaluating `1 = 1 && [] = []` yields the value `true`. We omit the
  justification for that fact here, but it follows from other evaluation rules
  for built-in operators and function application.

* So the result of the entire match expression is `true`.
-->

* `1 :: []` 已经是一个值。

* `[]` 不匹配 ``1 :: []``。

* `h :: t` 确实匹配 `1 :: []`，并产生变量绑定 {`h->1`,`t->[]`}，因为：

  - `h` 匹配 `1`，并产生变量绑定 `h->1`。

  - `t` 匹配 `[]`，并产生变量绑定 `t->[]`。

* 在 `h = 1 && t = []` 内替换 {`h->1`,`t->[]`}，会产生一个新的表达式 `1 = 1 && [] = []`。

* 对 `1 = 1 && [] = []` 求值会产生值 `true`。这里我们省略这个事实的
  【论证|Justification】，但它来自内置运算符和【函数应用|Function Application】的其他求值规则。

* 所以整个匹配表达式的结果是 `true`。

<!--
**Static semantics.**
-->

**静态语义**

<!--
* If `e : ta` and for all `i`, it holds that `pi : ta` and `ei : tb`,
  then `(match e with p1 -> e1 | ... | pn -> en) : tb`.
-->

* 如果 `e : ta`，且对于所有 `i`，都有 `pi : ta` 和 `ei : tb`，
  那么 `(match e with p1 -> e1 | ... | pn -> en) : tb`。

<!--
That rule relies on being able to judge whether a pattern has a particular type.
As usual, type inference comes into play here. The OCaml compiler infers the
types of any pattern variables as well as all occurrences of the wildcard
pattern. As for the list patterns, they have the same type-checking rules as
list expressions.
-->

这条规则依赖于能够【判断|Judge】一个模式是否具有某个【特定类型|Particular Type】。
和往常一样，【类型推断|Type Inference】在这里发挥作用。OCaml 编译器会推断任何
【模式变量|Pattern Variable】的类型，以及通配符模式所有出现位置的类型。至于列表模式，
它们具有与【列表表达式|List Expression】相同的类型检查规则。

<!--
**Additional Static Checking.**
-->

**额外的静态检查**

{{ video_embed | replace("%%VID%%", "aLQJpk9vXD4")}}

<!--
In addition to that type-checking rule, there are two other checks the compiler
does for each match expression.
-->

除了那条类型检查规则之外，编译器还会对每个匹配表达式进行另外两项检查。

<!--
First, **exhaustiveness:** the compiler checks to make sure that there are
enough patterns to guarantee that at least one of them matches the expression
`e`, no matter what the value of that expression is at run time. This ensures
that the programmer did not forget any branches. For example, the function below
will cause the compiler to emit a warning:
-->

首先是【穷尽性|Exhaustiveness】：编译器会检查是否有足够的模式，
以保证无论表达式 `e` 在运行时的值是什么，至少有一个模式能与之匹配。
这确保了程序员不会遗漏任何分支。例如，下面的函数会导致编译器发出警告：

```{code-cell} ocaml
let head lst = match lst with h :: _ -> h
```

<!--
By presenting that warning to the programmer, the compiler is helping the
programmer to defend against the possibility of `Match_failure` exceptions at
runtime.
-->

通过向程序员展示该警告，编译器帮助程序员防范在运行时引发 `Match_failure` 异常的可能性。

```{note}
<!--
Sorry about how the output from the cell above gets split into many lines in the
HTML. That is currently an [open issue with JupyterBook][issue], the framework
used to build this book.
-->

抱歉，上面单元格的输出在 HTML 中被拆成了很多行。
这目前是 [JupyterBook 的一个未解决问题][issue]，JupyterBook 是用于构建本书的框架。

[issue]: https://github.com/executablebooks/jupyter-book/issues/973
```

<!--
Second, **unused branches:** the compiler checks to see whether any of the
branches could never be matched against because one of the previous branches is
guaranteed to succeed. For example, the function below will cause the compiler
to emit a warning:
-->

其次，【未使用的分支|Unused Branches】：编译器会检查是否有分支
永远不会被匹配到，因为前面的某个分支保证会成功。例如，下面的函数
会导致编译器发出警告：

```{code-cell} ocaml
let rec sum lst =
  match lst with
  | h :: t -> h + sum t
  | [ h ] -> h
  | [] -> 0
```

<!--
The second branch is unused because the first branch will match anything the
second branch matches.
-->

第二个分支未被使用，因为第一个分支能匹配第二个分支所能匹配的任何内容。

<!--
Unused match cases are usually a sign that the programmer wrote something other
than what they intended. So by presenting that warning, the compiler is helping
the programmer to detect latent bugs in their code.
-->

未使用的【匹配|Match】分支通常是程序员写出与其意图不符的代码的信号。
因此，通过显示该警告，编译器正在帮助程序员检测代码中的潜在错误。

<!--
Here's an example of one of the most common bugs that causes an unused match
case warning. Understanding it is also a good way to check your understanding of
the dynamic semantics of match expressions:
-->

下面是一个最常见的导致「未使用匹配分支」警告的错误示例。
理解它也是检验你对【匹配表达式|Match Expression】的【动态语义|Dynamic Semantics】
掌握程度的好方法：

```{code-cell} ocaml
let length_is lst n =
  match List.length lst with
  | n -> true
  | _ -> false
```

<!--
The programmer was thinking that if the length of `lst` is equal to `n`, then
this function will return `true`, and otherwise will return `false`. But in fact
this function *always* returns `true`. Why? Because the pattern variable `n` is
distinct from the function argument `n`. Suppose that the length of `lst` is 5.
Then the pattern match becomes: `match 5 with n -> true | _ -> false`. Does `n`
match 5? Yes, according to the rules above: a variable pattern matches any value
and here produces the binding `n->5`. Then evaluation applies that binding to
`true`, substituting all occurrences of `n` inside of `true` with 5. Well, there
are no such occurrences. So we're done, and the result of evaluation is just
`true`.
-->

程序员的想法是，如果 `lst` 的长度等于 `n`，那么这个函数将返回 `true`，
否则返回 `false`。但实际上这个函数**总是**返回 `true`。为什么呢？
因为【模式变量|Pattern Variable】`n` 与函数参数 `n` 是不同的。
假设 `lst` 的长度为 5。那么模式匹配就变成了：
`match 5 with n -> true | _ -> false`。`n` 能匹配 5 吗？
能，根据上面的规则：【变量模式|Variable Pattern】能匹配任何值，
并在这里产生【绑定|Binding】`n->5`。然后求值将该绑定应用到 `true`，
将 `true` 内部所有出现的 `n` 替换为 5。然而，
并没有这样的出现。所以求值完成，结果就是 `true`。

<!--
What the programmer really meant to write was:
-->

程序员真正想写的是：

```{code-cell} ocaml
let length_is lst n =
  match List.length lst with
  | m -> m = n
```

<!--
or better yet:
-->

或更好的是：

```{code-cell} ocaml
let length_is lst n =
  List.length lst = n
```

<!--
## Deep Pattern Matching
-->

## 深度模式匹配

<!--
Patterns can be nested.  Doing so can allow your code to look deeply into the
structure of a list.  For example:
-->

【模式|Pattern】可以【嵌套|Nested】。这样做可以让你的代码深入观察列表的结构。例如：

* `_ :: []` 匹配所有恰好有一个元素的列表

* `_ :: _` 匹配所有至少有一个元素的列表

* `_ :: _ :: []` 匹配所有恰好有两个元素的列表

* `_ :: _ :: _ :: _` 匹配所有至少有三个元素的列表

<!--
## Immediate Matches
-->

## 立即匹配

{{ video_embed | replace("%%VID%%", "VgVP8Tin6yY")}}

<!--
When you have a function that immediately pattern-matches against its final
argument, there's a nice piece of syntactic sugar you can use to avoid writing
extra code. Here's an example: instead of
-->

当你的函数对最后一个参数立即进行【模式匹配|Pattern Matching】时，
有一种巧妙的【语法糖|Syntactic Sugar】可以让你避免编写额外的代码。
下面是一个例子：与其写成

```{code-cell} ocaml
let rec sum lst =
  match lst with
  | [] -> 0
  | h :: t -> h + sum t
```

<!--
you can write
-->

你也可以写成

```{code-cell} ocaml
let rec sum = function
  | [] -> 0
  | h :: t -> h + sum t
```

<!--
The word `function` is a keyword. Notice that we're able to leave out the line
containing `match` as well as the name of the argument, which was never used
anywhere else but that line. In such cases, though, it's especially important in
the specification comment for the function to document what that argument is
supposed to be, since the code no longer gives it a descriptive name.
-->

`function` 是一个【关键字|Keyword】。注意，我们可以省略包含 `match` 的那一行，
以及参数的名称——该参数除了那一行之外从未在其他地方使用。
然而，在这种情况下，在函数的规范注释中记录该参数的含义就尤为重要，
因为代码不再为其提供描述性的名称。

<!--
## OCamldoc and List Syntax
-->

## OCamldoc 与列表语法

<!--
OCamldoc is a documentation generator similar to Javadoc. It extracts comments
from source code and produces HTML (as well as other output formats). The
[standard library web documentation][std-web] for the List module is generated
by OCamldoc from the [standard library source code][std-src] for that module,
for example.
-->

OCamldoc 是一个类似于 Javadoc 的【文档生成器|Documentation Generator】。
它从源代码中提取注释并生成 HTML（以及其他输出格式）。
例如，List 模块的[标准库在线文档][std-web]就是由 OCamldoc
从该模块的[标准库源代码][std-src]生成的。

```{warning}
<!--
There is a syntactic convention with square brackets in OCamldoc that can be
confusing with respect to lists.
-->

OCamldoc 中关于方括号的语法约定可能会与列表产生混淆。

<!--
In an OCamldoc comment, source code is surrounded by square brackets. That code
will be rendered in typewriter face and syntax-highlighted in the output HTML.
The square brackets in this case do not indicate a list.
-->

在 OCamldoc 注释中，源代码由方括号包围。该代码将以等宽字体呈现，
并在输出的 HTML 中进行语法高亮。此处的方括号并不表示列表。
```

<!--
For example, here is the comment for `List.hd` in the standard library source
code:
-->

例如，以下是标准库源代码中 `List.hd` 的注释：

```ocaml
(** Return the first element of the given list. Raise
   [Failure "hd"] if the list is empty. *)
```

<!--
The `[Failure "hd"]` does not mean a list containing the exception
`Failure "hd"`. Rather it means to typeset the expression `Failure "hd"` as
source code, as you can see [here][std-web].
-->

`[Failure "hd"]` 并非表示包含异常 `Failure "hd"` 的列表，
而是表示将表达式 `Failure "hd"` 以源代码的形式排版，
如[此处][std-web]所示。

<!--
This can get especially confusing when you want to talk about lists as part of
the documentation. For example, here is a way we could rewrite that comment:
-->

当你想在文档中讨论列表时，这尤其容易引起混淆。
例如，以下是我们可以重写该注释的一种方式：

<!--
```ocaml
(** [hd lst] returns the first element of [lst].
    Raises [Failure "hd"] if [lst = []]. *)
```
-->

```ocaml
(** [hd lst] 返回 [lst] 的第一个元素。
    当 [lst = []] 时引发 [Failure "hd"] 异常。 *)
```

<!--
In `[lst = []]`, the outer square brackets indicate source code as part of a
comment, whereas the inner square brackets indicate the empty list.
-->

在 `[lst = []]` 中，外层方括号表示注释中的源代码，
而内层方括号表示空列表。

[std-web]: https://ocaml.org/api/List.html
[std-src]: https://github.com/ocaml/ocaml/blob/trunk/stdlib/list.mli

<!--
## List Comprehensions
-->

## 列表推导式

<!--
Some languages, including Python and Haskell, have a syntax called
*comprehension* that allows lists to be written somewhat like set comprehensions
from mathematics. The earliest example of comprehensions seems to be the
functional language NPL, which was designed in 1977.
-->

一些语言，包括 Python 和 Haskell，拥有一种称为【推导式|Comprehension】的语法，
允许以类似于数学中集合推导式的方式来编写列表。
推导式最早的实例似乎是 1977 年设计的函数式语言 NPL。

<!--
OCaml doesn't have built-in syntactic support for comprehensions. Though some
extensions were developed, none seem to be supported any longer. The primary
tasks accomplished by comprehensions (filtering out some elements, and
transforming others) are actually well-supported already by *higher-order
programming*, which we'll study in a later chapter, and the pipeline operator,
which we've already learned. So an additional syntax for comprehensions was
never really needed.
-->

OCaml 没有内置的推导式语法支持。尽管曾经开发过一些扩展，
但似乎都已经不再被支持了。推导式完成的主要任务
（过滤某些元素以及转换其他元素）实际上已经由【高阶编程|Higher-Order Programming】
（我们将在后续章节中学习）和【管道运算符|Pipeline Operator】（我们已经学过）很好地支持了。
因此，推导式的额外语法从未真正被需要过。

<!--
## Tail Recursion
-->

## 尾递归

<!--
Recall that a function is *tail recursive* if it calls itself recursively but
does not perform any computation after the recursive call returns, and
immediately returns to its caller the value of its recursive call. Consider
these two implementations, `sum` and `sum_tr` of summing a list:
-->

回顾一下，如果一个函数递归地调用自身，但在【递归调用|Recursive Call】返回后不执行任何计算，
并且立即将递归调用的值返回给调用者，则该函数是【尾递归|Tail Recursive】的。
请看以下列表求和的两个实现 `sum` 和 `sum_tr`：

```{code-cell} ocaml
let rec sum (l : int list) : int =
  match l with
  | [] -> 0
  | x :: xs -> x + (sum xs)

let rec sum_plus_acc (acc : int) (l : int list) : int =
  match l with
  | [] -> acc
  | x :: xs -> sum_plus_acc (acc + x) xs

let sum_tr : int list -> int =
  sum_plus_acc 0
```

<!--
Observe the following difference between the `sum` and `sum_tr` functions above:
In the `sum` function, which is not tail recursive, after the recursive call
returned its value, we add `x` to it. In the tail recursive `sum_tr`, or rather
in `sum_plus_acc`, after the recursive call returns, we immediately return the
value without further computation.
-->

请观察上述 `sum` 和 `sum_tr` 函数之间的区别：在非尾递归的 `sum` 函数中，
【递归调用|Recursive Call】返回值后，我们会将 `x` 加到该值上。
而在尾递归的 `sum_tr` 中——或者更准确地说在 `sum_plus_acc` 中——
递归调用返回后，我们立即返回该值，不再进行额外计算。

<!--
If you're going to write functions on really long lists, tail recursion becomes
important for performance. So when you have a choice between using a
tail-recursive vs. non-tail-recursive function, you are likely better off using
the tail-recursive function on really long lists to achieve space efficiency.
For that reason, the List module documents which functions are tail recursive
and which are not.
-->

如果你要对非常长的列表编写函数，【尾递归|Tail Recursive】对性能就变得很重要。
因此，当你可以在尾递归和非尾递归函数之间做选择时，
对于非常长的列表，使用尾递归函数可能更优，以实现空间效率。
正因如此，List 模块会记录哪些函数是尾递归的，哪些不是。

<!--
But that doesn't mean that a tail-recursive implementation is strictly better.
For example, the tail-recursive function might be harder to read. (Consider
`sum_plus_acc`.) Also, there are cases where implementing a tail-recursive
function entails having to do a pre- or post-processing pass to reverse the
list. On small- to medium-sized lists, the overhead of reversing the list (both
in time and in allocating memory for the reversed list) can make the
tail-recursive version less time efficient. What constitutes "small" vs. "big"
here? That's hard to say, but maybe 10,000 is a good estimate, according to the
[standard library documentation of the `List` module][list].
-->

但这并不意味着尾递归的实现总是更好。例如，尾递归函数可能更难阅读
（比如 `sum_plus_acc`）。此外，有时实现尾递归函数需要进行预处理或后处理来反转列表。
对于中小型列表，反转列表的开销（包括时间和分配反转列表所需的内存）
可能会使尾递归版本的时间效率更低。这里「小」和「大」的界限是什么？
这很难说，但根据 [`List` 模块的标准库文档][list]，10,000 可能是一个合理的估计。

[list]: https://ocaml.org/api/List.html

<!--
Here is a useful tail-recursive function to produce a long list:
-->

下面是一个有用的尾递归函数，它用来产生一个长列表：

```{code-cell} ocaml
(** [from i j l] is the list containing the integers from [i] to [j],
    inclusive, followed by the list [l].
    Example:  [from 1 3 [0] = [1; 2; 3; 0]] *)
let rec from i j l = if i > j then l else from i (j - 1) (j :: l)

(** [i -- j] is the list containing the integers from [i] to [j], inclusive. *)
let ( -- ) i j = from i j []

let long_list = 0 -- 1_000_000
```

<!--
It would be worthwhile to study the definition of `--` to convince yourself that
you understand (i) how it works and (ii) why it is tail recursive.
-->

值得研究一下 `--` 的定义，以确信你理解 (i) 它是如何工作的，
以及 (ii) 为什么它是【尾递归|Tail Recursive】的。

<!--
You might in the future decide you want to create such a list again. Rather than
having to remember where this definition is, and having to copy it into your
code, here's an easy way to create the same list using a built-in library
function:
-->

你将来可能还想再次创建这样的列表。与其记住这个定义在哪里并将其复制到代码中，
不如使用【库函数|Library Function】中内置的简便方法来创建相同的列表：

```{code-cell} ocaml
List.init 1_000_000 Fun.id
```

<!--
Expression `List.init len f` creates the list `[f 0; f 1; ...; f (len - 1)]`,
and it does so tail recursively if `len` is bigger than 10,000. Function
`Fun.id` is simply the identify function `fun x -> x`.
-->

表达式 `List.init len f` 可创建列表 `[f 0; f 1; ...; f (len - 1)]`，
如果 `len` 大于 10,000，它会以尾递归方式完成。
函数 `Fun.id` 就是【恒等函数|Identity Function】`fun x -> x`。
