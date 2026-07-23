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
# Fold
-->

# 折叠

<!--
The map function gives us a way to individually transform each element of a
list. The filter function gives us a way to individually decide whether to
keep or throw away each element of a list. But both of those are really just
looking at a single element at a time. What if we wanted to somehow combine all
the elements of a list? That's what the *fold* function is for. It turns out
that there are two versions of it, which we'll study in this section. But to
start, let's look at a related function&mdash;not actually in the standard
library&mdash;that we call *combine*.
-->

【映射|Map】函数为我们提供了一种单独转换列表每个元素的方法。
【过滤|Filter】函数为我们提供了一种单独决定是否保留或丢弃列表每个元素的方法。
但这两者实际上都只是每次查看单个元素。
如果我们想要以某种方式组合列表的所有元素怎么办？这就是【折叠|Fold】函数的用途。
事实证明它有两个版本，我们将在本节中研究。
但首先，让我们看看一个相关函数&mdash;&mdash;实际上不在标准库中&mdash;&mdash;我们称之为*组合*。

## 组合

{{ video_embed | replace("%%VID%%", "uYJVwW2BFPg") }}

<!--
Once more, let's write two functions:
-->

再次，让我们编写两个函数：

```{code-cell} ocaml
(** [sum lst] is the sum of all the elements of [lst]. *)
let rec sum = function
  | [] -> 0
  | h :: t -> h + sum t

let s = sum [1; 2; 3]
```

```{code-cell} ocaml
(** [concat lst] is the concatenation of all the elements of [lst]. *)
let rec concat = function
  | [] -> ""
  | h :: t -> h ^ concat t

let c = concat ["a"; "b"; "c"]
```

<!--
As when we went through similar exercises with map and filter, the functions
share a great deal of common structure. The differences here are:
-->

正如我们对映射和过滤进行类似练习时一样，这些函数共享大量共同结构。这里的区别是：

<!--
* the case for the empty list returns a different initial value, `0` vs `""`
-->

* 空列表的情况返回不同的初始值，`0` 对 `""`

<!--
* the case of a non-empty list uses a different operator to combine the head
  element with the result of the recursive call, `+` vs `^`.
-->

* 非空列表的情况使用不同的运算符来组合头部元素与递归调用的结果，`+` 对 `^`。

<!--
So can we apply the Abstraction Principle again? Sure! But this time we need to
factor out *two* arguments: one for each of those two differences.
-->

那么我们能再次应用【抽象原则|Abstraction Principle】吗？当然！但这次我们需要提取*两个*参数：每个区别各一个。

<!--
To start, let's factor out only the initial value:
-->

首先，让我们只提取初始值：

```{code-cell} ocaml
let rec sum' init = function
  | [] -> init
  | h :: t -> h + sum' init t

let sum = sum' 0

let rec concat' init = function
  | [] -> init
  | h :: t -> h ^ concat' init t

let concat = concat' ""
```
<!--
Now the only real difference left between `sum'` and `concat'` is the operator
used to combine the head with the recursive call on the tail. That operator can
also become an argument to a unified function we call `combine`:
-->

现在 `sum'` 和 `concat'` 之间唯一剩下的真正区别是用于组合头部与尾部递归调用的运算符。该运算符也可以成为我们称为 `combine` 的统一函数的参数：

```{code-cell} ocaml
let rec combine op init = function
  | [] -> init
  | h :: t -> op h (combine op init t)

let sum = combine ( + ) 0
let concat = combine ( ^ ) ""
```

<!--
One way to think of `combine` would be that:
-->

理解 `combine` 的一种方式是：

<!--
- the `[]` value in the list gets replaced by `init`, and
-->

- 列表中的 `[]` 值被替换为 `init`，以及

<!--
- each `::` constructor gets replaced by `op`.
-->

- 每个 `::` 构造子被替换为 `op`。

<!--
For example, `[a; b; c]` is just syntactic sugar for `a :: (b :: (c :: []))`. So
if we replace `[]` with `0` and `::` with `(+)`, we get `a + (b + (c + 0))`.
And that would be the sum of the list.
-->

例如，`[a; b; c]` 只是 `a :: (b :: (c :: []))` 的语法糖。
所以如果我们用 `0` 替换 `[]`，用 `(+)` 替换 `::`，我们得到 `a + (b + (c + 0))`。
这就是列表的和。

<!--
Once more, the Abstraction Principle has led us to an amazingly simple and
succinct expression of the computation.
-->

再次，抽象原则引导我们得到了一个令人惊讶地简单和简洁的计算表达式。

## 右折叠

{{ video_embed | replace("%%VID%%", "WKKkIGncRn8") }}

<!--
The `combine` function is the idea underlying an actual OCaml library function.
To get there, we need to make a couple of changes to the implementation we have
so far.
-->

`combine` 函数是实际 OCaml 库函数背后的思想。要到达那里，我们需要对我们目前的实现做一些更改。

<!--
First, let's rename some of the arguments: we'll change `op` to `f` to emphasize
that really we could pass in any function, not just a built-in operator like
`+`. And we'll change `init` to `acc`, which as usual stands for "accumulator".
That yields:
-->

首先，让我们重命名一些参数：我们将 `op` 改为 `f` 以强调我们实际上可以传入任何函数，而不仅仅是像 `+` 这样的内置运算符。
我们将 `init` 改为 `acc`，它像往常一样代表「【累加器|Accumulator】」。这产生：

```{code-cell} ocaml
let rec combine f acc = function
  | [] -> acc
  | h :: t -> f h (combine f acc t)
```

<!--
Second, let's make an admittedly less well-motivated change. We'll swap the
implicit list argument to `combine` with the `init` argument:
-->

其次，让我们做一个可以说动机不太充分的更改。我们将 `combine` 的隐式列表参数与 `init` 参数交换：

```{code-cell} ocaml
let rec combine' f lst acc = match lst with
  | [] -> acc
  | h :: t -> f h (combine' f t acc)

let sum lst = combine' ( + ) lst 0
let concat lst = combine' ( ^ ) lst ""
```

<!--
It's a little less convenient to code the function this way, because we no
longer get to take advantage of the `function` keyword, nor of partial
application in defining `sum` and `concat`. But there's no algorithmic change.
-->

以这种方式编写函数不太方便，因为我们不再能够利用 `function` 关键字，也不能在定义 `sum` 和 `concat` 时利用偏函数应用。但没有算法上的变化。

<!--
What we now have is the actual implementation of the standard library function
`List.fold_right`. All we have left to do is change the function name
and add a manual type annotation:
-->

我们现在拥有的是标准库函数 `List.fold_right` 的实际实现。我们剩下的就是更改函数名并添加手动类型注解：

```{code-cell} ocaml
let rec fold_right f lst (acc : 'acc) = match lst with
  | [] -> acc
  | h :: t -> f h (fold_right f t acc)
```

<!--
Why is this function called "fold right"? The intuition is that the way it works
is to "fold in" elements of the list from the right to the left, combining each
new element using the operator. For example, `fold_right ( + ) [a; b; c] 0`
results in evaluation of the expression `a + (b + (c + 0))`. The parentheses
associate from the right-most subexpression to the left.
-->

为什么这个函数被称为「右折叠」？直觉是它的工作方式是从右到左「折叠」列表的元素，使用运算符组合每个新元素。
例如，`fold_right ( + ) [a; b; c] 0` 导致表达式 `a + (b + (c + 0))` 的求值。
括号从最右边的子表达式向左结合。

```{tip}
<!--
The manual type annotation is not necessary for a correct implementation of the function.
Its purpose is to provide a nicer type.
Without the annotation, the inferred type of `fold_right` would be `('a -> 'b -> 'b) -> 'a list -> 'b -> 'b`, in which the compiler chooses `'b` as the type of the accumulator.
By manually annotating that argument with a self-descriptive name, we get the more readable type `('a -> 'acc -> 'acc) -> 'a list -> 'acc -> 'acc`.
-->
手动类型注解对于函数的正确实现不是必需的。它的目的是提供更好的类型。
没有注解时，`fold_right` 的推断类型将是 `('a -> 'b -> 'b) -> 'a list -> 'b -> 'b`，其中编译器选择 `'b` 作为累加器的类型。
通过用自描述名称手动注解该参数，我们得到更具可读性的类型 `('a -> 'acc -> 'acc) -> 'a list -> 'acc -> 'acc`。
```

## 尾递归与组合

<!--
Neither `fold_right` nor `combine` are tail recursive: after the recursive call
returns, there is still work to be done in applying the function argument `f` or
`op`. Let's go back to `combine` and rewrite it to be tail recursive. All that
requires is to change the cons branch:
-->

`fold_right` 和 `combine` 都不是尾递归的：在递归调用返回后，应用函数参数 `f` 或 `op` 仍有工作要做。
让我们回到 `combine` 并将其重写为尾递归。这只需要更改 cons 分支：

```{code-cell} ocaml
let rec combine_tr f acc = function
  | [] -> acc
  | h :: t -> combine_tr f (f acc h) t  (* only real change *)
```

<!--
(Careful readers will notice that the type of `combine_tr` is different than the
type of `combine`. We will address that soon.)
-->

（细心的读者会注意到 `combine_tr` 的类型与 `combine` 的类型不同。我们很快会讨论这一点。）

<!--
Now the function `f` is applied to the head element `h` and the accumulator
`acc` *before* the recursive call is made, thus ensuring there's no work
remaining to be done after the call returns.  If that seems a little mysterious,
here's a rewriting of the two functions that might help:
-->

现在函数 `f` 在递归调用*之前*应用于头部元素 `h` 和累加器 `acc`，从而确保调用返回后没有剩余工作要做。
如果这看起来有点神秘，以下是两个函数的重写可能会有所帮助：

```{code-cell} ocaml
let rec combine f acc = function
  | [] -> acc
  | h :: t ->
    let acc' = combine f acc t in
    f h acc'

let rec combine_tr f acc = function
  | [] -> acc
  | h :: t ->
    let acc' = f acc h in
    combine_tr f acc' t
```

<!--
Pay close attention to the definition of `acc'`, the new accumulator, in each
of those versions:
-->

请密切注意每个版本中新累加器 `acc'` 的定义：

<!--
- In the original version, we procrastinate using the head element `h`. First,
  we combine all the remaining tail elements to get `acc'`. Only then do we use
  `f` to fold in the head. So the value passed as the initial value of `acc`
  turns out to be the same for every recursive invocation of `combine`: it's
  passed all the way down to where it's needed, at the right-most element of the
  list, then used there exactly once.
-->

- 在原始版本中，我们延迟使用头部元素 `h`。首先，我们组合所有剩余的尾部元素以获得 `acc'`。只有那时我们才使用 `f` 折叠头部。
  因此作为 `acc` 初始值传递的值对于 `combine` 的每次递归调用都是相同的：它一直传递到需要的地方，即列表的最右边元素，然后在那里恰好使用一次。

<!--
- But in the tail recursive version, we "pre-crastinate" by immediately folding
  `h` in with the old accumulator `acc`. Then we fold that in with all the tail
  elements. So at each recursive invocation, the value passed as the argument
  `acc` can be different.
-->

- 但在尾递归版本中，我们通过立即用旧累加器 `acc` 折叠 `h` 来「预先处理」。然后我们将其与所有尾部元素折叠。
  因此在每次递归调用中，作为参数 `acc` 传递的值可能不同。

<!--
The tail recursive version of combine works just fine for summation (and
concatenation, which we elide):
-->

尾递归版本的 combine 对于求和（以及我们省略的连接）工作得很好：

```{code-cell} ocaml
let sum = combine_tr ( + ) 0
let s = sum [1; 2; 3]
```

<!--
But something possibly surprising happens with subtraction:
-->

但减法可能会发生一些令人惊讶的事情：

```{code-cell} ocaml
let sub = combine ( - ) 0
let s = sub [3; 2; 1]

let sub_tr = combine_tr ( - ) 0
let s' = sub_tr [3; 2; 1]
```

<!--
The two results are different!
-->

两个结果是不同的！

<!--
- With `combine` we compute `3 - (2 - (1 - 0))`. First we fold in `1`, then `2`,
  then `3`. We are processing the list from right to left, putting the initial
  accumulator at the far right.
-->

- 使用 `combine` 我们计算 `3 - (2 - (1 - 0))`。首先我们折叠 `1`，然后 `2`，然后 `3`。我们从右到左处理列表，将初始累加器放在最右边。

<!--
- But with `combine_tr` we compute `(((0 - 3) - 2) - 1)`. We are processing the
  list from left to right, putting the initial accumulator at the far left.
-->

- 但使用 `combine_tr` 我们计算 `(((0 - 3) - 2) - 1)`。我们从左到右处理列表，将初始累加器放在最左边。

<!--
With addition it didn't matter which order we processed the list, because
addition is associative and commutative. But subtraction is not, so the two
directions result in different answers.
-->

对于加法，我们以什么顺序处理列表并不重要，因为加法具有结合律和交换律。但减法不是，所以两个方向导致不同的答案。

<!--
Actually this shouldn't be too surprising if we think back to when we made `map`
be tail recursive. Then, we discovered that tail recursion can cause us to
process the list in reverse order from the non-tail recursive version of the
same function. That's what happened here.
-->

实际上，如果我们回想一下当我们使 `map` 成为尾递归时，这不应该太令人惊讶。
那时我们发现尾递归可能导致我们以与同一函数的非尾递归版本相反的顺序处理列表。这就是这里发生的事情。

## 左折叠

<!--
Our `combine_tr` function is also in the standard library under the name
`List.fold_left`:
-->

我们的 `combine_tr` 函数也存在于标准库中，名为 `List.fold_left`：

```{code-cell} ocaml
let rec fold_left f (acc : 'acc) = function
  | [] -> acc
  | h :: t -> fold_left f (f acc h) t

let sum = fold_left ( + ) 0
let concat = fold_left ( ^ ) ""
```

<!--
We have once more succeeded in applying the Abstraction Principle.
-->

我们再次成功应用了抽象原则。

## 左折叠 vs. 右折叠

<!--
Let's review the differences between `fold_right` and `fold_left`:
-->

让我们回顾一下 `fold_right` 和 `fold_left` 之间的区别：

<!--
- They combine list elements in opposite orders, as indicated by their names.
  Function `fold_right` combines from the right to the left, whereas `fold_left`
  proceeds from the left to the right.
-->

- 它们以相反的顺序组合列表元素，正如它们的名称所示。函数 `fold_right` 从右到左组合，而 `fold_left` 从左到右进行。

<!--
- Function `fold_left` is tail recursive whereas `fold_right` is not.
-->

- 函数 `fold_left` 是尾递归的，而 `fold_right` 不是。

<!--
- The types of the functions are different. In `fold_X` the accumulator argument goes to the `X` of the list argument. That is a choice made by the standard library rather than a necessary implementation difference.
-->

- 函数的类型不同。在 `fold_X` 中，累加器参数位于列表参数的 `X` 侧。这是标准库做出的选择，而非必要的实现差异。

<!--
If you find it hard to keep track of the argument orders, the
[`ListLabels` module][listlabels] in the standard library can help. It uses
labeled arguments to give names to the combining operator (which it calls `f`)
and the initial accumulator value (which it calls `init`). Internally, the
implementation is actually identical to the `List` module.
-->

如果你发现难以跟踪参数顺序，标准库中的 [`ListLabels` 模块][listlabels]可以帮助。
它使用标签参数为组合运算符（它称为 `f`）和初始累加器值（它称为 `init`）命名。
在内部，实现实际上与 `List` 模块相同。

```{code-cell} ocaml
ListLabels.fold_left ~f:(fun x y -> x - y) ~init:0 [1; 2; 3];;
```

```{code-cell} ocaml
ListLabels.fold_right ~f:(fun y x -> x - y) ~init:0 [1; 2; 3];;
```

<!--
Notice how in the two applications of fold above, we are able to write the
arguments in a uniform order thanks to their labels. However, we still have to
be careful about which argument to the combining operator is the list element
vs. the accumulator value.
-->

注意在上面的两个折叠应用中，由于标签，我们能够以统一的顺序编写参数。
然而，我们仍然必须注意组合运算符的哪个参数是列表元素，哪个是累加器值。

[listlabels]: https://ocaml.org/api/ListLabels.html

## 关于标签参数与折叠的题外话

<!--
It's possible to write our own version of the fold functions that would label
the arguments to the combining operator, so we don't even have to remember their
order:
-->

可以编写我们自己的折叠函数版本，为组合运算符的参数添加标签，这样我们甚至不必记住它们的顺序：

```{code-cell} ocaml
let rec fold_left ~op:(f: acc:'a -> elt:'b -> 'a) ~init:acc lst =
  match lst with
  | [] -> acc
  | h :: t -> fold_left ~op:f ~init:(f ~acc:acc ~elt:h) t

let rec fold_right ~op:(f: elt:'a -> acc:'b -> 'b) lst ~init:acc =
  match lst with
  | [] -> acc
  | h :: t -> f ~elt:h ~acc:(fold_right ~op:f t ~init:acc)
```

<!--
But those functions aren't as useful as they might seem:
-->

但这些函数并不像看起来那么有用：

```{code-cell} ocaml
:tags: ["raises-exception"]
let s = fold_left ~op:( + ) ~init:0 [1;2;3]
```

<!--
The problem is that the built-in `+` operator doesn't have labeled arguments,
so we can't pass it in as the combining operator to our labeled functions.
We'd have to define our own labeled version of it:
-->

问题在于内置的 `+` 运算符没有标签参数，所以我们不能将其作为组合运算符传递给我们的标签函数。我们必须定义自己的标签版本：

```
let add ~acc ~elt = acc + elt
let s = fold_left ~op:add ~init:0 [1; 2; 3]
```

<!--
But now we have to remember that the `~acc` parameter to `add` will become
the left-hand argument to `( + )`.  That's not really much of an improvement
over what we had to remember to begin with.
-->

但现在我们必须记住 `add` 的 `~acc` 参数将成为 `( + )` 的左侧参数。
这与我们最初需要记住的相比并没有太大的改进。

## 使用折叠实现其他函数

<!--
Folding is so powerful that we can write many other list functions in terms of
`fold_left` or `fold_right`. For example,
-->

折叠如此强大，以至于我们可以用 `fold_left` 或 `fold_right` 编写许多其他列表函数。例如，

```{code-cell} ocaml
let length lst =
  List.fold_left (fun acc _ -> acc + 1) 0 lst

let rev lst =
  List.fold_left (fun acc x -> x :: acc) [] lst

let map f lst =
  List.fold_right (fun x acc -> f x :: acc) lst []

let filter f lst =
  List.fold_right (fun x acc -> if f x then x :: acc else acc) lst []
```

<!--
At this point it begins to become debatable whether it's better to express the
computations above using folding or using the ways we have already seen. Even
for an experienced functional programmer, understanding what a fold does can
take longer than reading the naive recursive implementation. If you peruse the
[source code of the standard library][list-src], you'll see that none of the
`List` module internally is implemented in terms of folding, which is perhaps
one comment on the readability of fold. On the other hand, using fold ensures
that the programmer doesn't accidentally program the recursive traversal
incorrectly. And for a data structure that's more complicated than lists, that
robustness might be a win.
-->

此时，使用折叠还是使用我们已经见过的方式表达上述计算开始变得有争议。
即使对于有经验的函数式程序员，理解折叠做了什么可能比阅读朴素的递归实现需要更长时间。
如果你浏览[标准库的源代码][list-src]，你会看到 `List` 模块内部没有一个是以折叠实现的，这也许是对折叠可读性的一个评论。
另一方面，使用折叠确保程序员不会意外地错误编程递归遍历。
对于比列表更复杂的数据结构，这种健壮性可能是一个优势。

[list-src]: https://github.com/ocaml/ocaml/blob/trunk/stdlib/list.ml

## 折叠 vs. 递归 vs. 库

<!--
We've now seen three different ways for writing functions that manipulate lists:
-->

我们现在看到了编写操作列表的函数的三种不同方式：

<!--
- directly as a recursive function that pattern matches against the empty list
  and against cons,
-->

- 直接作为对空列表和 cons 进行模式匹配的递归函数，

<!--
- using `fold` functions, and
-->

- 使用 `fold` 函数，以及

<!--
- using other library functions.
-->

- 使用其他库函数。

<!--
Let's try using each of those ways to solve a problem, so that we can appreciate
them better.
-->

让我们尝试使用每种方式来解决一个问题，以便更好地欣赏它们。

<!--
Consider writing a function `lst_and: bool list -> bool`, such that
`lst_and [a1; ...; an]` returns whether all elements of the list are `true`.
That is, it evaluates the same as `a1 && a2 && ... && an`. When applied to an
empty list, it evaluates to `true`.
-->

考虑编写一个函数 `lst_and: bool list -> bool`，使得 `lst_and [a1; ...; an]` 返回列表的所有元素是否都是 `true`。
也就是说，它与 `a1 && a2 && ... && an` 求值相同。当应用于空列表时，它求值为 `true`。

<!--
Here are three possible ways of writing such a function. We give each way a
slightly different function name for clarity.
-->

以下是编写此函数的三种可能方式。为了清晰起见，我们为每种方式提供了略微不同的函数名。

```{code-cell} ocaml
let rec lst_and_rec = function
  | [] -> true
  | h :: t -> h && lst_and_rec t

let lst_and_fold =
  List.fold_left (fun acc elt -> acc && elt) true

let lst_and_lib =
  List.for_all (fun x -> x)
```

<!--
The worst-case running time of all three functions is linear in the length of
the list. But:
-->

所有三个函数的最坏情况运行时间与列表长度成线性关系。但是：

<!--
- The first function, `lst_and_rec` has the advantage that it need not process
  the entire list. It will immediately return `false` the first time they
  discover a `false` element in the list.
-->

- 第一个函数 `lst_and_rec` 的优势在于它不需要处理整个列表。
  它会在第一次发现列表中的 `false` 元素时立即返回 `false`。

<!--
- The second function, `lst_and_fold`, will always process every element of the
  list.
-->

- 第二个函数 `lst_and_fold` 将始终处理列表的每个元素。

<!--
- As for the third function `lst_and_lib`, according to the documentation of
  `List.for_all`, it returns `(p a1) && (p a2) && ... && (p an)`. So like
  `lst_and_rec` it need not process every element.
-->

- 至于第三个函数 `lst_and_lib`，根据 `List.for_all` 的文档，它返回 `(p a1) && (p a2) && ... && (p an)`。所以像 `lst_and_rec` 一样，它不需要处理每个元素。
