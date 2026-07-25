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
# Algebraic Data Types
-->

# 代数数据类型

<!--
Thus far, we have seen variants simply as enumerating a set of constant values,
such as:
-->

到目前为止，我们看到的【变体|Variant】只是枚举一组常量值，例如：

```ocaml
type day = Sun | Mon | Tue | Wed | Thu | Fri | Sat

type ptype = TNormal | TFire | TWater

type peff = ENormal | ENotVery | Esuper
```

<!--
But variants are far more powerful than this.
-->

但变体的功能远不止于此。

<!--
## Variants that Carry Data
-->

## 携带数据的变体

{{ video_embed | replace("%%VID%%", "u6P5XdRta04")}}

<!--
As a running example, here is a variant type `shape` that does more than just
enumerate values:
-->

作为一个贯穿示例，这里有一个变体类型 `shape`，它不仅仅是枚举值：

```{code-cell} ocaml
type point = float * float
type shape =
  | Point of point
  | Circle of point * float (* center and radius *)
  | Rect of point * point (* lower-left and upper-right corners *)
```

<!--
This type, `shape`, represents a shape that is either a point, a circle, or a
rectangle. A point is represented by a constructor `Point` that *carries* some
additional data, which is a value of type `point`. A circle is represented by a
constructor `Circle` that carries two pieces of data: one of type `point` and
the other of type `float`. Those data represent the center of the circle and its
radius. A rectangle is represented by a constructor `Rect` that carries two more
points.
-->

类型 `shape` 表示一个形状，它可以是点、圆或矩形。
点由【构造子|Constructor】 `Point` 表示，它*携带*一些额外数据，即类型为 `point` 的值。
圆由构造子 `Circle` 表示，它携带两部分数据：一部分类型为 `point`，另一部分类型为 `float`。
这些数据表示圆的中心和半径。
矩形由构造子 `Rect` 表示，它携带另外两个点。

{{ video_embed | replace("%%VID%%", "K_eA-8LhlVY")}}
{{ video_embed | replace("%%VID%%", "SpuQfO_597E")}}

<!--
Here are a couple functions that use the `shape` type:
-->

以下是使用 `shape` 类型的几个函数：

```{code-cell} ocaml
let area = function
  | Point _ -> 0.0
  | Circle (_, r) -> Float.pi *. (r ** 2.0)
  | Rect ((x1, y1), (x2, y2)) ->
      let w = x2 -. x1 in
      let h = y2 -. y1 in
      w *. h

let center = function
  | Point p -> p
  | Circle (p, _) -> p
  | Rect ((x1, y1), (x2, y2)) -> ((x2 +. x1) /. 2.0, (y2 +. y1) /. 2.0)
```

<!--
The `shape` variant type is the same as those we've seen before in that it is
defined in terms of a collection of constructors. What's different than before
is that those constructors carry additional data along with them. Every value of
type `shape` is formed from exactly one of those constructors. Sometimes we call
the constructor a *tag*, because it tags the data it carries as being from that
particular constructor.
-->

`shape` 变体类型与我们之前看到的类型相同，它是由一组构造子定义的。
与之前不同的是，这些构造子携带了额外的数据。
类型为 `shape` 的每个值都恰好由这些构造子之一形成。
有时我们称构造子为*【标签|Tag】*，因为它将其携带的数据标记为来自该特定构造子。

<!--
Variant types are sometimes called *tagged unions*. Every value of the type is
from the set of values that is the union of all values from the underlying types
that the constructor carries. For example, with the `shape` type, every value is
tagged with either `Point` or `Circle` or `Rect` and carries a value from:
-->

变体类型有时被称为*【标签联合|Tagged Union】*。
该类型的每个值都来自构造子所携带的底层类型的所有值的并集。
例如，对于 `shape` 类型，每个值都被标记为 `Point`、`Circle` 或 `Rect`，并携带来自以下集合的值：

<!--
- the set of all `point` values, unioned with
- the set of all `point * float` values, unioned with
- the set of all `point * point` values.
-->

- 所有 `point` 值的集合，与
- 所有 `point * float` 值的集合，与
- 所有 `point * point` 值的集合的并集。

<!--
Another name for these variant types is an *algebraic data type*. "Algebra" here
refers to the fact that variant types contain both sum and product types, as
defined in the previous lecture. The sum types come from the fact that a value
of a variant is formed by *one of* the constructors. The product types come from
that fact that a constructor can carry tuples or records, whose values have a
sub-value from *each of* their component types.
-->

这些变体类型的另一个名称是【代数数据类型|Algebraic Data Type】。
这里的「代数」指的是变体类型既包含【和类型|Sum Type】也包含【积类型|Product Type】，
正如前面讲座中所定义的那样。和类型来源于变体的值由构造子*之一*形成这一事实。
积类型来源于构造子可以携带元组或记录体，
其值具有来自*每个*组件类型的子值。

<!--
Using variants, we can express a type that represents the union of several other
types, but in a type-safe way. Here, for example, is a type that represents
either a `string` or an `int`:
-->

使用变体，我们可以表达一个表示多个其他类型并集的类型，但是以类型安全的方式。
例如，以下是一个表示 `string` 或 `int` 的类型：

```{code-cell} ocaml
type string_or_int =
  | String of string
  | Int of int
```
<!--
If we wanted to, we could use this type to code up lists (e.g.) that contain
either strings or ints:
-->

如果我们愿意，我们可以使用这个类型来编写包含字符串或整数的列表：

```{code-cell} ocaml
type string_or_int_list = string_or_int list

let rec sum : string_or_int list -> int = function
  | [] -> 0
  | String s :: t -> int_of_string s + sum t
  | Int i :: t -> i + sum t

let lst_sum = sum [String "1"; Int 2]
```

<!--
Variants thus provide a type-safe way of doing something that might before have
seemed impossible.
-->

因此，变体提供了一种类型安全的方式来实现之前看起来不可能的事情。

<!--
Variants also make it possible to discriminate which tag a value was constructed
with, even if multiple constructors carry the same type. For example:
-->

变体还使得能够区分值是由哪个标签构造的，即使多个构造子携带相同的类型。例如：

```{code-cell} ocaml
type t = Left of int | Right of int
let x = Left 1
let double_right = function
  | Left i -> i
  | Right i -> 2 * i
```

<!--
## Syntax and Semantics
-->

## 语法和语义

{{ video_embed | replace("%%VID%%", "3A_PNz5njt0")}}

<!--
**Syntax.**
-->

**语法**

<!--
To define a variant type:
-->

定义变体类型：

```ocaml
type t = C1 [of t1] | ... | Cn [of tn]
```

<!--
The square brackets above denote that `of ti` is optional. Every constructor may
individually either carry no data or carry data. We call constructors that carry
no data *constant*; and those that carry data, *non-constant*.
-->

上面的方括号表示 `of ti` 是可选的。每个构造子可以单独地不携带数据或携带数据。
我们称不携带数据的构造子为*常量*；携带数据的为*非常量*。

<!--
To write an expression that is a variant:
-->

编写变体表达式：

```ocaml
C e
```

<!--
Or:
-->

或者：

```ocaml
C
```

<!--
depending on whether the constructor name `C` is non-constant or constant.
-->

取决于构造子名称 `C` 是非常量还是常量。

<!--
**Dynamic semantics.**
-->

**动态语义**

<!--
* If `e ==> v` then `C e ==> C v`, assuming `C` is non-constant.
* `C` is already a value, assuming `C` is constant.
-->

* 如果 `e ==> v`，则 `C e ==> C v`，假设 `C` 是非常量的。
* `C` 本身已经是值，假设 `C` 是常量的。

<!--
**Static semantics.**
-->

**静态语义**

<!--
* If `t = ... | C | ...` then `C : t`.
* If `t = ... | C of t' | ...` and if `e : t'` then `C e : t`.
-->

* 如果 `t = ... | C | ...`，则 `C : t`。
* 如果 `t = ... | C of t' | ...` 且 `e : t'`，则 `C e : t`。

<!--
**Pattern matching.**
-->

**模式匹配**

<!--
We add the following new pattern form to the list of legal patterns:
-->

我们将以下新模式形式添加到合法模式列表中：

<!--
* `C p`
-->

* `C p`

<!--
And we extend the definition of when a pattern matches a value and produces
a binding as follows:
-->

并且我们扩展模式何时匹配值并产生绑定的定义如下：

<!--
* If `p` matches `v` and produces bindings $b$, then `C p` matches `C v` and
  produces bindings $b$.
-->

* 如果 `p` 匹配 `v` 并产生绑定 $b$，则 `C p` 匹配 `C v` 并产生绑定 $b$。

<!--
## Catch-all Cases
-->

## 兜底情况

<!--
One thing to beware of when pattern matching against variants is what *Real
World OCaml* calls "catch-all cases". Here's a simple example of what can go
wrong. Let's suppose you write this variant and function:
-->

在对变体进行【模式匹配|Pattern Matching】时，需要注意的一件事是《Real World OCaml》
所称的「兜底情况」。以下是一个简单的例子，说明可能出现的问题。假设你编写了这个变体和函数：

```{code-cell} ocaml
type color = Blue | Red

(* a thousand lines of code in between *)

let string_of_color = function
  | Blue -> "blue"
  | _ -> "red"
```

<!--
Seems fine, right?  But then one day you realize there are more colors
in the world.  You need to represent green.  So you go back and add green
to your variant:
-->

看起来没问题，对吧？但有一天你意识到世界上还有更多颜色。
你需要表示绿色。所以你回去在变体中添加绿色：

```{code-cell} ocaml
type color = Blue | Red | Green

(* a thousand lines of code in between *)

let string_of_color = function
  | Blue -> "blue"
  | _ -> "red"
```

<!--
But because of the thousand lines of code in between, you forget that
`string_of_color` needs updating.  And now, all the sudden, you are
red-green color blind:
-->

但由于中间有千行代码，你忘记了 `string_of_color` 需要更新。
而现在，突然之间，你变成了红绿色盲：

```{code-cell} ocaml
string_of_color Green
```

<!--
The problem is the *catch-all* case in the pattern match inside
`string_of_color`: the final case that uses the wildcard pattern to match
anything. Such code is not robust against future changes to the variant type.
-->

问题在于 `string_of_color` 内部模式匹配中的*兜底*情况：
使用【通配符|Wildcard】模式匹配任何内容的最后一个分支。
这样的代码对于变体类型的未来更改不够健壮。

<!--
If, instead, you had originally coded the function as follows, life would be
better:
-->

如果你最初将函数编写如下，情况会更好：

```{code-cell} ocaml
let string_of_color = function
  | Blue -> "blue"
  | Red  -> "red"
```

<!--
The OCaml type checker now alerts you that you haven't yet updated
`string_of_color` to account for the new constructor.
-->

OCaml 类型检查器现在会提醒你尚未更新 `string_of_color` 以考虑新的构造子。

<!--
The moral of the story is: catch-all cases lead to buggy code. Avoid using them.
-->

这个故事的寓意是：兜底情况会导致有错误的代码。避免使用它们。

<!--
## Recursive Variants
-->

## 递归变体

{{ video_embed | replace("%%VID%%", "gDh217oAfnY")}}

<!--
Variant types may mention their own name inside their own body. For example,
here is a variant type that could be used to represent something similar to
`int list`:
-->

变体类型可以在其自身内部提及自己的名称。例如，
以下是一个变体类型，可用于表示类似于 `int list` 的东西：

```{code-cell} ocaml
type intlist = Nil | Cons of int * intlist

let lst3 = Cons (3, Nil)  (* similar to 3 :: [] or [3] *)
let lst123 = Cons(1, Cons(2, lst3)) (* similar to [1; 2; 3] *)

let rec sum (l : intlist) : int =
  match l with
  | Nil -> 0
  | Cons (h, t) -> h + sum t

let rec length : intlist -> int = function
  | Nil -> 0
  | Cons (_, t) -> 1 + length t

let empty : intlist -> bool = function
  | Nil -> true
  | Cons _ -> false
```

<!--
Notice that in the definition of `intlist`, we define the `Cons` constructor to
carry a value that contains an `intlist`. This makes the type `intlist` be
*recursive*: it is defined in terms of itself.
-->

注意在 `intlist` 的定义中，我们将 `Cons` 构造子定义为携带一个包含 `intlist` 的值。
这使得类型 `intlist` 是*【递归|Recursive】*的：它是根据自身定义的。

<!--
Types may be mutually recursive if you use the `and` keyword:
-->

如果使用 `and` 关键字，类型可以是互递归的：

```{code-cell} ocaml
type node = {value : int; next : mylist}
and mylist = Nil | Node of node
```

<!--
Any such mutual recursion must involve at least one variant or record type
that the recursion "goes through".  For example, the following is not allowed:
-->

任何这样的互递归必须涉及至少一个变体或【记录体|Record】类型作为递归的「通道」。
例如，以下形式是不允许的：

```{code-cell} ocaml
:tags: ["raises-exception"]
type t = u and u = t
```

<!--
But this is:
-->

但这是可以的：

```{code-cell} ocaml
type t = U of u and u = T of t
```

<!--
Record types may also be recursive:
-->

记录体类型也可以是递归的：

```{code-cell} ocaml
type node = {value : int; next : node}
```

<!--
But plain old type synonyms may not be:
-->

但普通的类型同义词不能是递归的：

```{code-cell} ocaml
:tags: ["raises-exception"]
type t = t * t
```

<!--
Although `node` is a legal type definition, there is no way to construct a value
of that type because of the circularity involved: to construct the very first
`node` value in existence, you would already need a value of type `node` to
exist. Later, when we cover imperative features, we'll see a similar idea used
(but successfully) for mutable linked lists.
-->

虽然 `node` 是一个合法的类型定义，但由于涉及循环性，无法构造该类型的值：
要构造第一个存在的 `node` 值，你已经需要一个类型为 `node` 的值存在。
稍后，当我们介绍命令式特性时，我们将看到类似的思想被用于可变链表（但会成功）。

<!--
## Parameterized Variants
-->

## 参数化变体

<!--
Variant types may be *parameterized* on other types.  For example,
the `intlist` type above could be generalized to provide lists (coded
up ourselves) over any type:
-->

变体类型可以被*参数化*为其他类型。例如，
上面的 `intlist` 类型可以被推广为提供任何类型的列表（我们自己编码的）：

```{code-cell} ocaml
type 'a mylist = Nil | Cons of 'a * 'a mylist

let lst3 = Cons (3, Nil)  (* similar to [3] *)
let lst_hi = Cons ("hi", Nil)  (* similar to ["hi"] *)
```

<!--
Here, `mylist` is a *type constructor* but not a type: there is no way to write
a value of type `mylist`. But we can write value of type `int mylist` (e.g.,
`lst3`) and `string mylist` (e.g., `lst_hi`). Think of a type constructor as
being like a function, but one that maps types to types, rather than values to
value.
-->

这里，`mylist` 是一个*【类型构造子|Type Constructor】*但不是一个类型：
无法编写类型为 `mylist` 的值。
但我们可以编写类型为 `int mylist`（例如 `lst3`）和 `string mylist`（例如 `lst_hi`）的值。
将类型构造子想象成一个函数，但它将类型映射到类型，而非将值映射到值。

<!--
Here are some functions over `'a mylist`:
-->

以下是一些处理 `'a mylist` 的函数：

```{code-cell} ocaml
let rec length : 'a mylist -> int = function
  | Nil -> 0
  | Cons (_, t) -> 1 + length t

let empty : 'a mylist -> bool = function
  | Nil -> true
  | Cons _ -> false
```
<!--
Notice that the body of each function is unchanged from its previous definition
for `intlist`. All that we changed was the type annotation. And that could even
be omitted safely:
-->

注意每个函数的主体与其之前对 `intlist` 的定义没有变化。
我们改变的只是类型注解。而类型注解甚至可以安全地省略：

```{code-cell} ocaml
let rec length = function
  | Nil -> 0
  | Cons (_, t) -> 1 + length t

let empty = function
  | Nil -> true
  | Cons _ -> false
```

<!--
The functions we just wrote are an example of a language feature called
**parametric polymorphism**. The functions don't care what the `'a` is in
`'a mylist`, hence they are perfectly happy to work on `int mylist` or
`string mylist` or any other `(whatever) mylist`. The word "polymorphism" is
based on the Greek roots "poly" (many) and "morph" (form). A value of type
`'a mylist` could have many forms, depending on the actual type `'a`.
-->

我们刚才编写的函数是一种称为【参数多态|Parametric Polymorphism】的语言特性的示例。
这些函数不关心 `'a mylist` 中的 `'a` 是什么，
因此它们完全可以处理 `int mylist` 或 `string mylist` 或任何其他 `(whatever) mylist`。
「多态」一词源于希腊语词根「poly」（许多）和「morph」（形式）。
类型为 `'a mylist` 的值可以有多种形式，取决于实际类型 `'a`。

<!--
As soon, though, as you place a constraint on what the type `'a` might be, you
give up some polymorphism. For example,
-->

然而，一旦你对类型 `'a` 可能是什么施加约束，你就会放弃一些多态性。例如，

```{code-cell} ocaml
let rec sum = function
  | Nil -> 0
  | Cons (h, t) -> h + sum t
```

<!--
The fact that we use the `( + )` operator with the head of the list constrains
that head element to be an `int`, hence all elements must be `int`. That means
`sum` must take in an `int mylist`, not any other kind of `'a mylist`.
-->

我们对列表头部使用 `( + )` 运算符这一事实，将该头部元素约束为 `int`，
因此所有元素都必须是 `int`。这意味着 `sum` 必须接收 `int mylist`，而非任何其他类型的 `'a mylist`。

<!--
It is also possible to have multiple type parameters for a parameterized type,
in which case parentheses are needed:
-->

参数化类型也可以有多个类型参数，在这种情况下需要使用括号：

```{code-cell} ocaml
type ('a, 'b) pair = {first : 'a; second : 'b}
let x = {first = 2; second = "hello"}
```

<!--
## Polymorphic Variants
-->

## 多态变体

<!--
Thus far, whenever you've wanted to define a variant type, you have had to give
it a name, such as `day`, `shape`, or `'a mylist`:
-->

到目前为止，每当你想定义一个变体类型时，你都必须给它一个名称，例如 `day`、`shape` 或 `'a mylist`：

```{code-cell} ocaml
type day = Sun | Mon | Tue | Wed | Thu | Fri | Sat

type shape =
  | Point of point
  | Circle of point * float
  | Rect of point * point

type 'a mylist = Nil | Cons of 'a * 'a mylist
```

<!--
Occasionally, you might need a variant type only for the return value of a
single function. For example, here's a function `f` that can either return an
`int` or $\infty$; you are forced to define a variant type to represent that
result:
-->

有时，你可能只需要一个变体类型来表示单个函数的返回值。
例如，这里有一个函数 `f`，它可以返回 `int` 或 $\infty$；
你被迫定义一个变体类型来表示该结果：

```{code-cell} ocaml
type fin_or_inf = Finite of int | Infinity

let f = function
  | 0 -> Infinity
  | 1 -> Finite 1
  | n -> Finite (-n)
```

<!--
The downside of this definition is that you were forced to define
`fin_or_inf` even though it won't be used throughout much of your program.
-->

这个定义的缺点是你被迫定义了 `fin_or_inf`，尽管它不会在程序的大部分地方使用。

<!--
There's another kind of variant in OCaml that supports this kind of programming:
*polymorphic variants*. Polymorphic variants are just like variants, except:
-->

OCaml 中有另一种变体支持这种编程方式：*【多态变体|Polymorphic Variant】*。
多态变体与普通变体类似，除了：

<!--
1. You don't have to declare their type or constructors before using them.
-->

1. 你不必在使用前声明它们的类型或构造子。

<!--
2. There is no name for a polymorphic variant type. (So another name for this
   feature could have been "anonymous variants".)
-->

2. 多态变体类型没有名称。（所以这个特性的另一个名称可以是「匿名变体」。）

<!--
3. The constructors of a polymorphic variant start with a backquote character.
-->

3. 多态变体的构造子以反引号字符开头。

<!--
Using polymorphic variants, we can rewrite `f`:
-->

使用多态变体，我们可以重写 `f`：

```{code-cell} ocaml
let f = function
  | 0 -> `Infinity
  | 1 -> `Finite 1
  | n -> `Finite (-n)
```

<!--
This type says that `f` either returns `` `Finite n`` for some `n : int` or
`` `Infinity``. The square brackets do not denote a list, but rather a set of
possible constructors. The `>` sign means that any code that pattern matches
against a value of that type must *at least* handle the constructors
`` `Finite`` and `` `Infinity``, and possibly more. For example, we could write:
-->

该类型表示 `f` 要么返回某个 `n : int` 的 `` `Finite n``，要么返回 `` `Infinity``。
方括号不表示列表，而是一组可能的构造子。
`>` 符号意味着任何对该类型值进行模式匹配的代码都必须*至少*处理构造子
`` `Finite`` 和 `` `Infinity``，也可能更多。例如，我们可以编写：

```{code-cell} ocaml
match f 3 with
  | `NegInfinity -> "negative infinity"
  | `Finite n -> "finite"
  | `Infinity -> "infinite"
```

<!--
It's perfectly fine for the pattern match to include constructors other than
`` `Finite`` or `` `Infinity``, because `f` is guaranteed never to return any
constructors other than those.
-->

模式匹配包含 `` `Finite`` 或 `` `Infinity`` 以外的构造子是完全可以的，
因为 `f` 保证永远不会返回这些构造子以外的任何构造子。

<!--
There are other, more compelling uses for polymorphic variants that we'll see
later in the course. They are particularly useful in libraries. For now, we
generally will steer you away from extensive use of polymorphic variants,
because their types can become difficult to manage.
-->

在本课程后面，我们还会看到多态变体的其他更有说服力的用途。
它们在库中特别有用。目前，我们通常会引导你避免广泛使用多态变体，
因为它们的类型可能变得难以管理。

<!--
## Built-in Variants
-->

## 内置变体

<!--
OCaml's built-in list data type is really a recursive, parameterized variant. It
is defined as follows:
-->

OCaml 内置的列表数据类型实际上是一个递归的、参数化的变体。它定义如下：

```{code-cell} ocaml
:tags: ["remove-output"]
type 'a list = [] | ( :: ) of 'a * 'a list
```

<!--
So `list` is really just a type constructor, with (value) constructors
`[]` (which we pronounce "nil") and `::` (which we pronounce "cons").
-->

所以 `list` 实际上只是一个类型构造子，
带有（值）构造子 `[]`（读作「nil」）和 `::`（读作「cons」）。

<!--
OCaml's built-in option data type is also really a parameterized variant. It's
defined as follows:
-->

OCaml 内置的 option 数据类型实际上也是一个参数化的变体。它定义如下：

```{code-cell} ocaml
:tags: ["remove-output"]
type 'a option = None | Some of 'a
```

<!--
So `option` is really just a type constructor, with (value) constructors
`None` and `Some`.
-->

所以 `option` 实际上只是一个类型构造子，带有（值）构造子 `None` 和 `Some`。

<!--
You can see both `list` and `option` defined in the [core OCaml library][core].
-->

你可以在 [OCaml 核心库][core]中看到 `list` 和 `option` 的定义。

[core]: https://ocaml.org/manual/core.html
