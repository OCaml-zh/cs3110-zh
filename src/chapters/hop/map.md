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
# Map
-->

# 映射

{{ video_embed | replace("%%VID%%", "qz7kn2pIl3M") }}

<!--
Here are two functions we might want to write:
-->

以下是我们可能想要编写的两个函数：

```{code-cell} ocaml
(** [add1 lst] adds 1 to each element of [lst]. *)
let rec add1 = function
  | [] -> []
  | h :: t -> (h + 1) :: add1 t

let lst1 = add1 [1; 2; 3]
```

```{code-cell} ocaml
(** [concat_bang lst] concatenates "!" to each element of [lst]. *)
let rec concat_bang = function
  | [] -> []
  | h :: t -> (h ^ "!") :: concat_bang t

let lst2 = concat_bang ["sweet"; "salty"]
```

<!--
There's a lot of similarity between those two functions:
-->

这两个函数有很多相似之处：

<!--
- They both pattern match against a list.
- They both return the same value for the base case of the empty list.
- They both recurse on the tail in the case of a non-empty list.
-->

- 它们都对列表进行模式匹配。
- 它们对空列表的基本情况返回相同的值。
- 它们在非空列表的情况下对尾部进行递归。

<!--
In fact the only difference (other than their names) is what they do for the
head element: add versus concatenate. Let's rewrite the two functions to make
that difference even more explicit:
-->

实际上唯一的区别（除了它们的名称）是它们对头部元素的操作：加法 vs. 连接。
让我们重写这两个函数以使这个区别更加明显：

```{code-cell} ocaml
(** [add1 lst] adds 1 to each element of [lst]. *)
let rec add1 = function
  | [] -> []
  | h :: t ->
    let f = fun x -> x + 1 in
    f h :: add1 t

(** [concat_bang lst] concatenates "!" to each element of [lst]. *)
let rec concat_bang = function
  | [] -> []
  | h :: t ->
    let f = fun x -> x ^ "!" in
    f h :: concat_bang t
```

<!--
Now the only difference between the two functions (again, other than their
names) is the body of helper function `f`. Why repeat all that code when there's
such a small difference between the functions? We might as well *abstract* that
one helper function out from each main function and make it an argument:
-->

现在两个函数之间唯一的区别（再说一遍，除了它们的名称）是辅助函数 `f` 的主体。
当函数之间的差异如此之小时，为什么要重复所有这些代码呢？
我们不妨从每个主函数中**抽象**出那个辅助函数，使其成为一个参数：

```{code-cell} ocaml
let rec add1' f = function
  | [] -> []
  | h :: t -> f h :: add1' f t

(** [add1 lst] adds 1 to each element of [lst]. *)
let add1 = add1' (fun x -> x + 1)

let rec concat_bang' f = function
  | [] -> []
  | h :: t -> f h :: concat_bang' f t

(** [concat_bang lst] concatenates "!" to each element of [lst]. *)
let concat_bang = concat_bang' (fun x -> x ^ "!")
```

<!--
But now there really is no difference at all between `add1'` and `concat_bang'`
except for their names. They are totally duplicated code. Even their types are
now the same, because nothing about them mentions integers or strings. We might
as well just keep only one of them and come up with a good new name for it. One
possibility could be `transform`, because they transform a list by applying a
function to each element of the list:
-->

但现在 `add1'` 和 `concat_bang'` 之间除了名称之外真的没有任何区别了。
它们是完全重复的代码。甚至它们的类型现在也相同，因为它们没有提及整数或字符串。
我们不妨只保留其中一个，并为它想一个好的新名称。
一种可能性是 `transform`，因为它们通过将函数应用于列表的每个元素来转换列表：

```{code-cell} ocaml
let rec transform f = function
  | [] -> []
  | h :: t -> f h :: transform f t

(** [add1 lst] adds 1 to each element of [lst]. *)
let add1 = transform (fun x -> x + 1)

(** [concat_bang lst] concatenates "!" to each element of [lst]. *)
let concat_bang = transform (fun x -> x ^ "!")
```

````{note}
<!--
Instead of
-->
与以下写法不同

```ocaml
let add1 lst = transform (fun x -> x + 1) lst
```

<!--
above we wrote
-->
上面我们写的是

```ocaml
let add1 = transform (fun x -> x + 1)
```

<!--
This is another way of being higher order, but it's one we already learned
about under the guise of partial application.  The latter way of writing
the function partially applies `transform` to just one of its two
arguments, thus returning a function.  That function is bound to the
name `add1`.
-->
这是变为高阶函数的另一种方式，但我们已经在偏函数应用的幌子下学习过了。
后一种编写方式将 `transform` 偏函数应用于它的两个参数中的一个，从而返回一个函数。
该函数被绑定到名称 `add1`。
````

<!--
Indeed, the C++ library does call the equivalent function `transform`. But OCaml
and many other languages (including Java and Python) use the shorter word *map*,
in the mathematical sense of how a function maps an input to an output. So let's
make one final change to that name:
-->

实际上，C++ 库确实将等效的函数称为 `transform`。
但 OCaml 和许多其他语言（包括 Java 和 Python）使用更短的词【映射|Map】，
这个名字来源于数学中函数如何将输入映射到输出。所以让我们对该名称做最后一次更改：

```{code-cell} ocaml
let rec map f = function
  | [] -> []
  | h :: t -> f h :: map f t

(** [add1 lst] adds 1 to each element of [lst]. *)
let add1 = map (fun x -> x + 1)

(** [concat_bang lst] concatenates "!" to each element of [lst]. *)
let concat_bang = map (fun x -> x ^ "!")
```

<!--
We have now successfully applied the Abstraction Principle: the common structure
has been factored out. What's left clearly expresses the computation, at least
to the reader who is familiar with `map`, in a way that the original versions do
not as quickly make apparent.
-->

我们现在成功应用了【抽象原则|Abstraction Principle】：提取出共同的结构。
剩下的内容清晰地表达了计算，至少对熟悉 `map` 的读者来说，以原始版本不能快速明了的方式。

{{ video_embed | replace("%%VID%%", "hynjCGMpcFk")}}

## 副作用

<!--
The `map` function exists already in OCaml's standard library as `List.map`, but
with one small difference from the implementation we discovered above.  First,
let's see what's potentially wrong with our own implementation, then we'll look
at the standard library's implementation.
-->

`map` 函数已经存在于 OCaml 的标准库中，名为 `List.map`，
但与我们上面发现的实现有一个小的区别。首先，让我们看看自己的实现可能有什么问题，
然后再看看标准库的实现。

<!--
We've seen before in our discussion of [exceptions](../data/exceptions) that the
OCaml language specification does not generally specify evaluation order of
subexpressions, and that the current language implementation generally evaluates
right-to-left. Because of that, the following (rather contrived) code actually
causes the list elements to be printed in what might seem like reverse order:
-->

我们在之前关于[异常](../data/exceptions)的讨论中已经看到，
OCaml 语言规范通常不指定子表达式的求值顺序，而当前的语言实现通常从右到左求值。
因此，以下（相当人为的）代码实际上会导致列表元素以看似相反的顺序打印：

```{code-cell} ocaml
let p x = print_int x; print_newline(); x + 1

let lst = map p [1; 2]
```

<!--
Here's why:
-->

原因如下：

<!--
- Expression `map p [1; 2]` evaluates to `p 1 :: map p [2]`.
- The right-hand side of that expression is then evaluated to
  `p 1 :: (p 2 :: map p [])`. The application of `p` to `1` has not
  yet occurred.
- The right-hand side of `::` is again evaluated next, yielding
  `p 1 :: (p 2 :: [])`.
- Then `p` is applied to `2`, and finally to `1`.
-->

- 表达式 `map p [1; 2]` 求值为 `p 1 :: map p [2]`。
- 该表达式的右侧随后被求值为 `p 1 :: (p 2 :: map p [])`。`p` 对 `1` 的应用尚未发生。
- `::` 的右侧再次被求值，产生 `p 1 :: (p 2 :: [])`。
- 然后 `p` 被应用于 `2`，最后应用于 `1`。

<!--
That is likely surprising to anyone who is predisposed to thinking that
evaluation would occur left-to-right.  The solution is to use a `let`
expression to cause the evaluation of the function application to occur
before the recursive call:
-->

这对于倾向于认为求值会从左到右发生的人来说可能是令人惊讶的。
解决方案是使用 `let` 表达式来使函数应用的求值在递归调用之前发生：

```{code-cell} ocaml
let rec map f = function
  | [] -> []
  | h :: t -> let h' = f h in h' :: map f t

let lst2 = map p [1; 2]
```

<!--
Here's why that works:
-->

以下是它工作的方式：

<!--
- Expression `map p [1; 2]` evaluates to `let h' = p 1 in h' :: map p [2]`.
- The binding expression `p 1` is evaluated, causing `1` to be printed
  and `h'` to be bound to `2`.
- The body expression `h' :: map p [2]` is then evaluated, which
  leads to `2` being printed next.
-->

- 表达式 `map p [1; 2]` 求值为 `let h' = p 1 in h' :: map p [2]`。
- 绑定表达式 `p 1` 被求值，导致 `1` 被打印，`h'` 被绑定到 `2`。
- 主体表达式 `h' :: map p [2]` 随后被求值，导致接下来打印 `2`。

<!--
So that's how the standard library defines `List.map`. We should use it instead
of re-defining the function ourselves from now on. But it's good that we have
discovered the function "from scratch" as it were, and that if needed we could
quickly re-code it.
-->

这就是标准库定义 `List.map` 的方式。从现在开始，我们应该使用它而非自己重新定义该函数。
但我们从头开始发现这个函数是好的，如果需要我们可以快速重新编码它。

<!--
The bigger lesson to take away from this discussion is that when evaluation
order matters, we need to use `let` to ensure it. When does it matter? Only when
there are side effects. Printing and exceptions are the two we've seen so far.
Later we'll add mutability.
-->

从这次讨论中得出的更大教训是，当求值顺序很重要时，我们需要使用 `let` 来确保它。
什么时候重要？只有当存在副作用时。打印和异常是我们目前看到的两种副作用。
稍后我们将添加可变性。

## 映射与尾递归

<!--
Astute readers will have noticed that the implementation of `map` is not tail
recursive. That is to some extent unavoidable. Here's a tempting but awful way
to create a tail-recursive version of it:
-->

敏锐的读者会注意到 `map` 的实现不是【尾递归|Tail Recursive】的。
这在某种程度上是不可避免的。以下是创建其尾递归版本的一种诱人但糟糕的方式：

```{code-cell} ocaml
let rec map_tr_aux f acc = function
  | [] -> acc
  | h :: t -> map_tr_aux f (acc @ [f h]) t

let map_tr f = map_tr_aux f []

let lst = map_tr (fun x -> x + 1) [1; 2; 3]
```

<!--
To some extent that works: the output is correct, and `map_tr_aux` is tail
recursive. The subtle flaw is the subexpression `acc @ [f h]`. Recall that
append is a linear-time operation on singly-linked lists. That is, if there are
$n$ list elements then append takes time $O(n)$. So at each recursive call we
perform a $O(n)$ operation. And there will be $n$ recursive calls, one for each
element of the list. That's a total of $n \cdot O(n)$ work, which is $O(n^2)$.
So we achieved tail recursion, but at a high cost: what ought to be a
linear-time operation became quadratic time.
-->

在某种程度上这是可行的：输出是正确的，`map_tr_aux` 是尾递归的。
微妙的缺陷是子表达式 `acc @ [f h]`。回想一下，追加是对单链表的线性时间操作。
也就是说，如果有 $n$ 个列表元素，那么追加需要 $O(n)$ 时间。
因此在每次递归调用中，我们执行一个 $O(n)$ 操作。
将会有 $n$ 次递归调用，每个列表元素一次。这是总共 $n \cdot O(n)$ 的工作量，即 $O(n^2)$。
所以我们实现了尾递归，但代价很高：本应是线性时间的操作变成了二次时间。

<!--
In an attempt to fix that, we could use the constant-time cons operation instead
of the linear-time append operation:
-->

为了尝试修复这个问题，我们可以使用常数时间的 cons 操作而非线性时间的追加操作：

```{code-cell} ocaml
let rec map_tr_aux f acc = function
  | [] -> acc
  | h :: t -> map_tr_aux f (f h :: acc) t

let map_tr f = map_tr_aux f []

let lst = map_tr (fun x -> x + 1) [1; 2; 3]
```

<!--
And to some extent that works: it's tail recursive and linear time. The
not-so-subtle flaw this time is that the output is backwards. As we take each
element off the front of the input list, we put it on the front of the output
list, but that reverses their order.
-->

在某种程度上这是可行的：它是尾递归且线性时间的。这次不那么微妙的缺陷是输出是反向的。
当我们从输入列表的前面取出每个元素时，我们将其放在输出列表的前面，但这颠倒了它们的顺序。

```{note}
<!--
To understand why the reversal occurs, it might help to think of the input and
output lists as people standing in a queue:
-->
要理解为什么会发生反转，将输入和输出列表想象成排队的人可能会有所帮助：

<!--
- Input: Alice, Bob.
- Output: empty.
-->

- 输入：Alice、Bob。
- 输出：空。

<!--
Then we remove Alice from the input and add her to the output:
-->
然后我们从输入中移除 Alice 并将她添加到输出中：

<!--
- Input: Bob.
- Output: Alice.
-->

- 输入：Bob。
- 输出：Alice。

<!--
Then we remove Bob from the input and add him to the output:
-->
然后我们从输入中移除 Bob 并将他添加到输出中：

<!--
- Input: empty.
- Output: Bob, Alice.
-->

- 输入：空。
- 输出：Bob、Alice。

<!--
The point is that with singly-linked lists, we can only operate on the head of
the list and still be constant time. We can't move Bob to the back of the output
without making him walk past Alice&mdash;and anyone else who might be standing
in the output.
-->

关键在于，对于单链表，我们只能在常数时间内操作列表的头部。
我们无法在不让 Bob 走过 Alice&mdash;&mdash;以及可能站在输出中的任何其他人&mdash;&mdash;的情况下将 Bob 移动到输出的后面。
```

<!--
For that reason, the standard library calls this function `List.rev_map`, that
is, a (tail-recursive) map function that returns its output in reverse order.
-->

因此，标准库将此函数称为 `List.rev_map`，即一个以反向顺序返回输出的（尾递归的）映射函数。

```{code-cell} ocaml
let rec rev_map_aux f acc = function
  | [] -> acc
  | h :: t -> rev_map_aux f (f h :: acc) t

let rev_map f = rev_map_aux f []

let lst = rev_map (fun x -> x + 1) [1; 2; 3]
```

<!--
If you want the output in the "right" order, that's easy: just apply `List.rev`
to it:
-->

如果你想要「正确」顺序的输出，这很简单：只需对其应用 `List.rev`：

```{code-cell} ocaml
let lst = List.rev (List.rev_map (fun x -> x + 1) [1; 2; 3])
```

<!--
Since `List.rev` is both linear time and tail recursive, that yields a complete
solution. We get a linear-time and tail-recursive map computation. The expense
is that it requires two passes through the list: one to transform, the other to
reverse. We're not going to do better than this efficiency with a singly-linked
list. Of course, there are other data structures that implement lists, and we'll
come to those eventually. Meanwhile, recall that we generally don't have to
worry about tail recursion (which is to say, about stack space) until lists have
10,000 or more elements.
-->

由于 `List.rev` 既是线性时间又是尾递归的，这产生了一个完整的解决方案。
我们得到了一个线性时间和尾递归的映射计算。代价是它需要对列表进行两次遍历：
一次用于转换，另一次用于反转。
我们无法在单链表上比这效率更好。当然，还有其他实现列表的数据结构，我们最终会接触到它们。
同时，回想一下，我们通常不需要担心尾递归（也就是说，栈空间），直到列表有 10,000 个或更多元素。

<!--
Why doesn't the standard library provide this all-in-one function? Maybe it will
someday if there's good enough reason. But you might discover in your own
programming there's not a lot of need for it. In many cases, we can either do
without the tail recursion, or be content with a reversed list.
-->

为什么标准库不提供这个一体化的函数？如果有足够好的理由，也许有一天会的。
但你可能会在自己的编程中发现对它的需求不大。
在许多情况下，我们可以要么不需要尾递归，要么满足于一个反转的列表。

<!--
The bigger lesson to take away from this discussion is that there can be a
tradeoff between time and space efficiency for recursive functions. By
attempting to make a function more space efficient (i.e., tail recursive), we
can accidentally make it asymptotically less time efficient (i.e., quadratic
instead of linear), or if we're clever keep the asymptotic time efficiency the
same (i.e., linear) at the cost of a constant factor (i.e., processing twice).
-->

从这次讨论中得出的更大教训是，递归函数在时间和空间效率之间可能存在权衡。
通过尝试使函数更节省空间（即尾递归），我们可能会意外地使其在渐近时间效率上降低（即二次而非线性），
或者如果我们聪明的话，以常数因子（即处理两次）为代价保持渐近时间效率相同（即线性）。

## 其他语言中的映射

<!--
We mentioned above that the idea of map exists in many programming languages.
Here's an example from Python:
-->

我们在上面提到过映射的思想存在于许多编程语言中。以下是 Python 的一个例子：

```python
>>> print(list(map(lambda x: x + 1, [1, 2, 3])))
[2, 3, 4]
```

<!--
We have to use the `list` function to convert the result of the `map` back to a
list, because Python for sake of efficiency produces each element of the `map`
output as needed. Here again we see the theme of "when does it get evaluated?"
returning.
-->

我们必须使用 `list` 函数将 `map` 的结果转换回列表，
因为 Python 为了效率会根据需要产生 `map` 输出的每个元素。
这里我们再次看到了「什么时候被求值？」这个主题的回归。

<!--
In Java, map is part of the `Stream` abstraction that was added in Java 8. Since
there isn't a built-in Java syntax for lists or streams, it's a little more
verbose to give an example. Here we use a factory method `Stream.of` to create a
stream:
-->

在 Java 中，映射是 Java 8 中添加的 `Stream` 抽象的一部分。
由于 Java 没有内置的列表或流语法，给出一个例子会更冗长一些。
这里我们使用工厂方法 `Stream.of` 来创建一个流：

```java
jshell> Stream.of(1, 2, 3).map(x -> x + 1).collect(Collectors.toList())
$1 ==> [2, 3, 4]
```

<!--
Like in the Python example, we have to use something to convert the stream back
into a list. In this case it's the `collect` method.
-->

就像在 Python 示例中一样，我们必须使用某些东西将流转换回列表。
在这种情况下，它是 `collect` 方法。
