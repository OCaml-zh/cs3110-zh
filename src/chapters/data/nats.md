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
# Example: Natural Numbers
-->

# 示例：自然数

<!--
We can define a recursive variant that acts like numbers, demonstrating that we
don't really have to have numbers built into OCaml! (For sake of efficiency,
though, it's a good thing they are.)
-->

我们可以定义一个表现得像数字的【递归|Recursive】【变体|Variant】，
这表明我们并不真的需要将数字内置到 OCaml 中！
（不过，出于效率考虑，它们被内置是件好事。）

<!--
A *natural number* is either *zero* or the *successor* of some other natural
number. This is how you might define the natural numbers in a mathematical logic
course, and it leads naturally to the following OCaml type `nat`:
-->

*【自然数|Natural Number】*要么是*零*，要么是某个其他自然数的*后继*。
这是你在数理逻辑课程中可能定义自然数的方式，它自然地引出了以下 OCaml 类型 `nat`：
```{code-cell} ocaml
type nat = Zero | Succ of nat
```
<!--
We have defined a new type `nat`, and `Zero` and `Succ` are constructors for
values of this type. This allows us to build expressions that have an arbitrary
number of nested `Succ` constructors. Such values act like natural numbers:
-->

我们定义了一个新类型 `nat`，`Zero` 和 `Succ` 是该类型值的【构造子|Constructor】。
这允许我们构建具有任意数量嵌套 `Succ` 构造子的表达式。这样的值表现得像自然数：

```{code-cell} ocaml
let zero = Zero
let one = Succ zero
let two = Succ one
let three = Succ two
let four = Succ three
```

<!--
Now we can write functions to manipulate values of this type.
We'll write a lot of type annotations in the code below to help the reader
keep track of which values are `nat` versus `int`; the compiler, of course,
doesn't need our help.
-->

现在我们可以编写函数来操作该类型的值。
我们将在下面的代码中编写大量类型注解，以帮助读者区分哪些值是 `nat`，哪些是 `int`；
当然，编译器不需要我们的帮助。

```{code-cell} ocaml
let iszero = function
  | Zero -> true
  | Succ _ -> false

let pred = function
  | Zero -> failwith "pred Zero is undefined"
  | Succ m -> m
```

<!--
Similarly, we can define a function to add two numbers:
-->

类似地，我们可以定义一个函数来将两个数相加：

```{code-cell} ocaml
let rec add n1 n2 =
  match n1 with
  | Zero -> n2
  | Succ pred_n -> add pred_n (Succ n2)
```

<!--
We can convert `nat` values to type `int` and vice-versa:
-->

我们可以将 `nat` 值转换为 `int` 类型，反之亦然：
```{code-cell} ocaml
let rec int_of_nat = function
  | Zero -> 0
  | Succ m -> 1 + int_of_nat m

let rec nat_of_int = function
  | i when i = 0 -> Zero
  | i when i > 0 -> Succ (nat_of_int (i - 1))
  | _ -> failwith "nat_of_int is undefined on negative ints"
```

<!--
To determine whether a natural number is even or odd, we can write a
pair of mutually recursive functions:
-->

为了确定一个自然数是偶数还是奇数，我们可以编写一对互递归函数：

```{code-cell} ocaml
let rec even = function Zero -> true | Succ m -> odd m
and odd = function Zero -> false | Succ m -> even m
```
