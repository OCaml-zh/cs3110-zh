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
# Filter
-->

# 过滤

{{ video_embed | replace("%%VID%%", "FaWtD-LRdpU") }}

<!--
Suppose we wanted to filter out only the even numbers from a list, or the odd
numbers.  Here are some functions to do that:
-->

假设我们想从列表中只过滤出偶数或奇数。以下是一些实现该功能的函数：

```{code-cell} ocaml
(** [even n] is whether [n] is even. *)
let even n =
  n mod 2 = 0

(** [evens lst] is the sublist of [lst] containing only even numbers. *)
let rec evens = function
  | [] -> []
  | h :: t -> if even h then h :: evens t else evens t

let lst1 = evens [1; 2; 3; 4]
```

```{code-cell} ocaml
(** [odd n] is whether [n] is odd. *)
let odd n =
  n mod 2 <> 0

(** [odds lst] is the sublist of [lst] containing only odd numbers. *)
let rec odds = function
  | [] -> []
  | h :: t -> if odd h then h :: odds t else odds t

let lst2 = odds [1; 2; 3; 4]
```

<!--
Functions `evens` and `odds` are nearly the same code: the only essential
difference is the test they apply to the head element. So as we did with `map`
in the previous section, let's factor out that test as a function. Let's name
the function `p` as short for "predicate", which is a fancy way of saying
that it tests whether something is true or false:
-->

函数 `evens` 和 `odds` 几乎是相同的代码：唯一的本质区别是它们应用于头部元素的测试。
所以正如我们在上一节中对 `map` 所做的那样，让我们将该测试提取为一个函数。
让我们将该函数命名为 `p`，作为「谓词」的缩写，这是一种测试某事物是否为真或假的花哨说法：

```{code-cell} ocaml
let rec filter p = function
  | [] -> []
  | h :: t -> if p h then h :: filter p t else filter p t
```

<!--
And now we can reimplement our original two functions:
-->

现在我们可以重新实现我们原来的两个函数：

```{code-cell} ocaml
let evens = filter even
let odds = filter odd
```

<!--
How simple these are! How clear! (At least to the reader who is familiar with
`filter`.)
-->

多么简单！多么清晰！（至少对熟悉 `filter` 的读者来说。）

## 过滤与尾递归

<!--
As we did with `map`, we can create a tail-recursive version of `filter`:
-->

正如我们对 `map` 所做的那样，我们可以创建一个尾递归版本的 `filter`：

```{code-cell} ocaml
let rec filter_aux p acc = function
  | [] -> acc
  | h :: t -> if p h then filter_aux p (h :: acc) t else filter_aux p acc t

let filter p = filter_aux p []

let lst = filter even [1; 2; 3; 4]
```

<!--
And again we discover the output is backwards. Here, the standard library makes
a different choice than it did with `map`. It builds in the reversal to
`List.filter`, which is implemented like this:
-->

我们再次发现输出是反向的。在这里，标准库做出了与 `map` 不同的选择。
它将反转内置到 `List.filter` 中，其实现如下：

```{code-cell} ocaml
let rec filter_aux p acc = function
  | [] -> List.rev acc (* note the built-in reversal *)
  | h :: t -> if p h then filter_aux p (h :: acc) t else filter_aux p acc t

let filter p = filter_aux p []
```

<!--
Why does the standard library treat `map` and `filter` differently on this
point? Good question. Perhaps there has simply never been a demand for a
`filter` function whose time效率 is a constant factor better. Or perhaps
it is just historical accident.
-->

为什么标准库在这一点上对 `map` 和 `filter` 的处理方式不同？好问题。
也许从来没有对时间效率提高常数因子的 `filter` 函数的需求。或者也许这只是历史偶然。

## 其他语言中的过滤

<!--
Again, the idea of filter exists in many programming languages. Here it is in
Python:
-->

同样，过滤的思想存在于许多编程语言中。以下是 Python 中的示例：

```python
>>> print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))
[2, 4]
```
<!--
And in Java:
-->

以及 Java 中的示例：

```java
jshell> Stream.of(1, 2, 3, 4).filter(x -> x % 2 == 0).collect(Collectors.toList())
$1 ==> [2, 4]
```
