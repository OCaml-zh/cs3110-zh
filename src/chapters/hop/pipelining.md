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
# Pipelining
-->

# 管道化

<!--
Suppose we wanted to compute the sum of squares of the numbers from 0 up to $n$.
How might we go about it? Of course (math being the best form of optimization),
the most efficient way would be a closed-form formula:
-->

假设我们想计算从 0 到 $n$ 的平方和。
我们该怎么做呢？当然（数学是最好的优化方式），
最高效的方法是使用闭合形式公式：

$$
\frac{n (n+1) (2n+1)}{6}
$$

<!--
But let's imagine you've forgotten that formula. In an imperative language you
might use a `for` loop:
-->

但假设你忘了那个公式。在【命令式语言|Imperative Language】中，
你可能会使用 `for` 循环：

```python
# Python
def sum_sq(n):
	sum = 0
	for i in range(0, n+1):
		sum += i * i
	return sum
```

<!--
The equivalent (tail) recursive code in OCaml would be:
-->

等价的（尾）递归 OCaml 代码如下：

```{code-cell} ocaml
let sum_sq n =
  let rec loop i sum =
    if i > n then sum
    else loop (i + 1) (sum + i * i)
  in loop 0 0
```

<!--
Another, clearer way of producing the same result in OCaml uses higher-order
functions and the pipeline operator:
-->

另一种更清晰的方式在 OCaml 中产生相同结果，
它使用【高阶函数|Higher-Order Function】和【管道运算符|Pipeline Operator】：

```{code-cell} ocaml
let rec ( -- ) i j = if i > j then [] else i :: i + 1 -- j
let square x = x * x
let sum = List.fold_left ( + ) 0

let sum_sq n =
  0 -- n              (* [0;1;2;...;n]   *)
  |> List.map square  (* [0;1;4;...;n*n] *)
  |> sum              (*  0+1+4+...+n*n  *)
```

<!--
The function `sum_sq` first constructs a list containing all the numbers `0..n`.
Then it uses the pipeline operator `|>` to pass that list through
`List.map square`, which squares every element. Then the resulting list is
pipelined through `sum`, which adds all the elements together.
-->

函数 `sum_sq` 首先构造一个包含所有数字 `0..n` 的列表。
然后它使用管道运算符 `|>` 将该列表传递给 `List.map square`，
将每个元素平方。接着将结果列表通过管道传递给 `sum`，
将所有元素相加。

<!--
The other alternatives that you might consider are somewhat uglier:
-->

你可能会考虑的其他替代方案则稍显丑陋：

```{code-cell} ocaml
(* Maybe worse: a lot of extra [let..in] syntax and unnecessary names
   for intermediate values we don't care about. *)
let sum_sq n =
  let l = 0 -- n in
  let sq_l = List.map square l in
  sum sq_l

(* Maybe worse: have to read the function applications from right to left
   rather than top to bottom, and extra parentheses. *)
let sum_sq n =
  sum (List.map square (0--n))
```

<!--
The downside of all of these compared to the original tail recursive version is
that they are wasteful of space&mdash;linear instead of constant&mdash;and take
a constant factor more time. So as is so often the case in programming, there is
a tradeoff between clarity and efficiency of code.
-->

与最初的【尾递归|Tail Recursive】版本相比，
所有这些方法的缺点是它们浪费【空间|Space】——
是线性的而非常量的——并且多花费一个常数因子的时间。
因此，正如编程中常见的情况一样，
代码的清晰度和效率之间存在一种【权衡|Tradeoff】。

<!--
Note that the inefficiency is *not* from the pipeline operator itself, but from
having to construct all those unnecessary intermediate lists. So don't get the
idea that pipelining is intrinsically bad. In fact, it can be quite useful. When
we get to the chapter on modules, we'll use it quite often with some of the data
structures we study there.
-->

请注意，低效率并非来自管道运算符本身，
而是来自必须构造所有那些不必要的中间列表。
所以不要认为【管道化|Pipelining】本质上是坏的。
事实上，它可以非常有用。
当我们进入【模块|Module】章节时，
我们将在那里研究的一些【数据结构|Data Structure】中经常使用它。
