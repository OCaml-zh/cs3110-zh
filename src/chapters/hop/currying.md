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
# Currying
-->

# 柯里化

<!--
We've already seen that an OCaml function that takes two arguments of types `t1`
and `t2` and returns a value of type `t3` has the type `t1 -> t2 -> t3`. We use
two variables after the function name in the let expression:
-->

我们已经看到，一个接受两个类型分别为 `t1` 和 `t2` 的参数
并返回类型为 `t3` 的值的 OCaml 函数，其类型为 `t1 -> t2 -> t3`。
我们在 let 表达式中的函数名后使用两个变量：

```{code-cell} ocaml
let add x y = x + y
```

<!--
Another way to define a function that takes two arguments is to write a function
that takes a tuple:
-->

定义一个接受两个参数的函数的另一种方式是编写一个接受【元组|Tuple】的函数：

```{code-cell} ocaml
let add' t = fst t + snd t
```

<!--
Instead of using `fst` and `snd`, we could use a tuple pattern in the
definition of the function, leading to a third implementation:
-->

不使用 `fst` 和 `snd`，我们可以在函数定义中使用元组【模式|Pattern】，
从而得到第三种实现：

```{code-cell} ocaml
let add'' (x, y) = x + y
```

<!--
Functions written using the first style (with type `t1 -> t2 -> t3`) are called
*curried* functions, and functions using the second style (with type
`t1 * t2 -> t3`) are called *uncurried*. Metaphorically, curried functions are
"spicier" because you can partially apply them (something you can't do with
uncurried functions: you can't pass in half of a pair). Actually, the term curry
does not refer to spices, but to a logician named [Haskell Curry][curry] (one of
a very small set of people with programming languages named after both their
first and last names).
-->

使用第一种风格（类型为 `t1 -> t2 -> t3`）编写的函数称为
【柯里化|Curried】函数，
使用第二种风格（类型为 `t1 * t2 -> t3`）编写的函数称为
【反柯里化|Uncurried】函数。
形象地说，柯里化函数「【更辣|Spicier】」，
因为你可以对它们进行【偏函数应用|Partial Application】
（而反柯里化函数做不到这一点：你无法传入偶对的一半）。
实际上，curry 一词并非指香料，
而是指一位名叫 [Haskell Curry][curry] 的逻辑学家
（他是极少数名和姓都被用于命名编程语言的人之一）。

[curry]: https://en.wikipedia.org/wiki/Haskell_Curry

<!--
Sometimes you will come across libraries that offer an uncurried version of a
function, but you want a curried version of it to use in your own code; or vice
versa. So it is useful to know how to convert between the two kinds of
functions, as we did with `add` above.
-->

有时你会遇到提供反柯里化版本函数的库，
但你想在自己的代码中使用柯里化版本；或者反过来。
因此，了解如何在这两种函数之间进行转换是很有用的，
就像我们上面对 `add` 所做的那样。

<!--
You could even write a couple of higher-order functions to do the conversion
for you:
-->

你甚至可以编写几个【高阶函数|Higher-Order Function】来为你完成转换：

```{code-cell} ocaml
let curry f x y = f (x, y)
let uncurry f (x, y) = f x y
```

```{code-cell} ocaml
let uncurried_add = uncurry add
let curried_add = curry add''
```
