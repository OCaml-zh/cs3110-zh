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
# Options
-->

# 选项

{{ video_embed | replace("%%VID%%", "lByoIw5wpao") }}

<!--
Suppose you want to write a function that *usually* returns a value of type `t`,
but *sometimes* returns nothing. For example, you might want to define a
function `list_max` that returns the maximum value in a list, but there's not a
sensible thing to return on an empty list:
-->

假设你想编写一个**通常** 返回类型为 `t` 的值，但**有时**不返回任何内容的函数。
例如，你可能想定义一个函数 `list_max`，
它返回列表中的最大值，但对于空列表没有合理的返回值：

```ocaml
let rec list_max = function
  | [] -> ???
  | h :: t -> max h (list_max t)
```

<!--
There are a couple possibilities to consider:
-->

有几种可能性需要考虑：

<!--
 - Return `min_int`? But then `list_max` will only work for integers&mdash; not
   floats or other types.
-->

 - 返回 `min_int`？但这样 `list_max` 将只适用于整数&mdash;&mdash;不适用于浮点数或其他类型。

<!--
 - Raise an exception? But then the user of the function has to remember to
   catch the exception.
-->

 - 引发【异常|Exception】？但这样函数的使用者必须记住捕获该异常。

<!--
 - Return `null`? That works in Java, but by design OCaml does not have a `null`
   value. That's actually a good thing: null pointer bugs are not fun to debug.
-->

 - 返回 `null`？这在 Java 中可行，但 OCaml 的设计没有 `null` 值。
   这实际上是件好事：空指针错误调试起来可不好玩。

```{note}
<!--
Sir Tony Hoare calls his invention of `null` a
["billion-dollar mistake"][null-mistake].
-->
Tony Hoare 爵士将他发明的 `null` 称为[「十亿美元的错误」][null-mistake]。
```

[null-mistake]: https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/

<!--
In addition to those possibilities, OCaml provides something even better called
an *option.* (Haskellers will recognize options as the Maybe monad.)
-->

除了这些可能性之外，OCaml 还提供了更好的东西，称为【选项|Option】。
（Haskell 用户会将选项识别为 Maybe 单子。）

<!--
You can think of an option as being like a closed box. Maybe there's something
inside the box, or maybe box is empty. We don't know which until we open the
box. If there turns out to be something inside the box when we open it, we can
take that thing out and use it. Thus, options provide a kind of "maybe type,"
which ultimately is a kind of one-of type: the box is in one of two states, full
or empty.
-->

你可以把选项想象成一个关闭的盒子。也许盒子里有东西，也许盒子是空的。
在打开盒子之前，我们不知道是哪种情况。
如果打开时发现里面有东西，我们可以把那个东西拿出来使用。
因此，选项提供了一种「也许类型」，它最终是一种「择一类型」：
盒子处于两种状态之一：满的或空的。

<!--
In `list_max` above, we'd like to metaphorically return a box that's empty if
the list is empty, or a box that contains the maximum element of the list if the
list is non-empty.
-->

在上面的 `list_max` 中，我们希望比喻性地返回一个空盒子（如果列表为空），
或者一个包含列表最大元素的盒子（如果列表非空）。

<!--
Here's how we create an option that is like a box with `42` inside it:
-->

以下是我们如何创建一个像里面装着 `42` 的盒子的选项：

```{code-cell} ocaml
Some 42
```

<!--
And here's how we create an option that is like an empty box:
-->

以下是我们如何创建一个像空盒子的选项：

```{code-cell} ocaml
None
```

<!--
The `Some` means there's something inside the box, and it's `42`. The `None`
means there's nothing inside the box.
-->

`Some` 表示盒子里有东西，它是 `42`。`None` 表示盒子里什么都没有。

<!--
Like `list`, we call `option` a *type constructor*: given a type, it produces a
new type; but, it is not itself a type. So for any type `t`, we can write
`t option` as a type. But `option` all by itself cannot be used as a type.
Values of type `t option` might contain a value of type `t`, or they might
contain nothing. `None` has type `'a option` because it's unconstrained what the
type is of the thing inside &mdash; as there isn't anything inside.
-->

与 `list` 一样，我们称 `option` 为【类型构造子|Type Constructor】：
给定一个类型，它会产生一个新类型；但它本身不是一个类型。
因此对于任何类型 `t`，我们可以将 `t option` 写作一个类型。
但 `option` 本身不能用作类型。
类型为 `t option` 的值可能包含一个类型为 `t` 的值，也可能什么都不包含。
`None` 的类型是 `'a option`，因为它内部没有东西，
所以内部东西的类型是不受约束的。

<!--
You can access the contents of an option value `e` using pattern matching.
Here's a function that extracts an `int` from an option, if there is one inside,
and converts it to a string:
-->

你可以使用【模式匹配|Pattern Matching】访问选项值 `e` 的内容。
以下是一个函数，它从选项中提取一个 `int`（如果里面有的话），并将其转换为字符串：

```{code-cell} ocaml
let extract o =
  match o with
  | Some i -> string_of_int i
  | None -> "";;
```

<!--
And here are a couple of example usages of that function:
-->

以下是该函数的一些示例用法：

```{code-cell} ocaml
extract (Some 42);;
extract None;;
```

<!--
Here's how we can write `list_max` with options:
-->

以下是我们如何使用选项来编写 `list_max`：

```{code-cell} ocaml
let rec list_max = function
  | [] -> None
  | h :: t -> begin
      match list_max t with
        | None -> Some h
        | Some m -> Some (max h m)
      end
```

```{tip}
<!--
The `begin`..`end` wrapping the nested pattern match above is not strictly
required here but is not a bad habit, as it will head off potential syntax
errors in more complicated code. The keywords `begin` and `end` are equivalent
to `(` and `)`.
-->

上面包裹嵌套模式匹配的 `begin`..`end` 在这里并非严格必需，
但这不是坏习惯，因为它可以避免在更复杂的代码中出现潜在的语法错误。
关键字 `begin` 和 `end` 等价于 `(` 和 `)`。
```

<!--
In Java, every object reference is implicitly an option. Either there is an
object inside the reference, or there is nothing there. That "nothing" is
represented by the value `null`. Java does not force programmers to explicitly
check for the null case, which leads to null pointer exceptions. OCaml options
force the programmer to include a branch in the pattern match for `None`, thus
guaranteeing that the programmer thinks about the right thing to do when there's
nothing there. So we can think of options as a principled way of eliminating
`null` from the language. Using options is usually considered better coding
practice than raising exceptions, because it forces the caller to do something
sensible in the `None` case.
-->

在 Java 中，每个对象引用隐式地都是一个选项。引用内部要么有一个对象，要么什么都没有。
那个「什么都没有」由值 `null` 表示。
Java 不强制程序员显式检查 null 情况，这会导致空指针异常。
OCaml 的选项强制程序员在模式匹配中包含一个 `None` 分支，
从而保证程序员在什么都没有时考虑正确的处理方式。
因此，我们可以将选项视为从语言中消除 `null` 的一种有原则的方式。
使用选项通常被认为比引发异常更好的编码实践，
因为它强制调用者在 `None` 情况下做一些合理的事情。

<!--
**Syntax and semantics of options.**
-->

**选项的语法和语义**

<!--
 - `t option` is a type for every type `t`.
-->

 - 对于每个类型 `t`，`t option` 是一个类型。

<!--
 - `None` is a value of type `'a option`.
-->

 - `None` 是类型为 `'a option` 的值。

<!--
 - `Some e` is an expression of type `t option` if `e : t`. If `e ==> v` then
   `Some e ==> Some v`
-->

 - 如果 `e : t`，则 `Some e` 是类型为 `t option` 的表达式。如果 `e ==> v`，则 `Some e ==> Some v`
