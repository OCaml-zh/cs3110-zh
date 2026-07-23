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
# Higher-Order Functions
-->

# 高阶函数

<!--
Consider these functions `double` and `square` on integers:
-->

考虑这些对整数操作的函数 `double` 和 `square`：

```{code-cell} ocaml
let double x = 2 * x
let square x = x * x
```

<!--
Let's use these functions to write other functions that quadruple and raise a
number to the fourth power:
-->

让我们使用这些函数来编写其他函数，分别将数字乘以四和求四次方：

```{code-cell} ocaml
let quad x = double (double x)
let fourth x = square (square x)
```

<!--
There is an obvious similarity between these two functions: what they do is
apply a given function twice to a value. By passing in the function to another
function `twice` as an argument, we can abstract this functionality:
-->

这两个函数之间有一个明显的相似之处：它们所做的就是将给定的函数对一个值应用两次。
通过将该函数作为参数传递给另一个函数 `twice`，我们可以抽象出这个功能：

```{code-cell} ocaml
let twice f x = f (f x)
```

<!--
The function `twice` is higher-order: its input `f` is a function.
And&mdash;recalling that all OCaml functions really take only a single
argument&mdash;its output is technically `fun x -> f (f x)`, so `twice` returns
a function hence is also higher-order in that way.
-->

函数 `twice` 是高阶的：它的输入 `f` 是一个函数。
而且&mdash;&mdash;回想一下所有 OCaml 函数实际上只接受单个参数&mdash;&mdash;
它的输出在技术上是 `fun x -> f (f x)`，所以 `twice` 返回一个函数，因此在这方面也是高阶的。

<!--
Using `twice`, we can implement `quad` and `fourth` in a uniform way:
-->

使用 `twice`，我们可以以统一的方式实现 `quad` 和 `fourth`：

```{code-cell} ocaml
let quad x = twice double x
let fourth x = twice square x
```

## 抽象原则

<!--
Above, we have exploited the structural similarity between `quad` and `fourth`
to save work. Admittedly, in this toy example it might not seem like much work.
But imagine that `twice` were actually some much more complicated function.
Then, if someone comes up with a more efficient version of it, every function
written in terms of it (like `quad` and `fourth`) could benefit from that
improvement in efficiency, without needing to be recoded.
-->

在上面，我们利用了 `quad` 和 `fourth` 之间的结构相似性来节省工作。
诚然，在这个简单的例子中，看起来工作量不大。
但想象一下，如果 `twice` 实际上是一个更复杂得多的函数。
那么，如果有人提出了一个更高效的版本，每个基于它编写的函数（如 `quad` 和 `fourth`）
都可以从效率的提升中受益，而无需重新编码。

<!--
Part of being an excellent programmer is recognizing such similarities and
*abstracting* them by creating functions (or other units of code) that implement
them. Bruce MacLennan names this the **Abstraction Principle** in his textbook
*Functional Programming: Theory and Practice* (1990). The Abstraction Principle
says to avoid requiring something to be stated more than once; instead, *factor
out* the recurring pattern. Higher-order functions enable such refactoring,
because they allow us to factor out functions and parameterize functions on
other functions.
-->

成为优秀程序员的一部分是识别这种相似性，并通过创建实现它们的函数（或其他代码单元）
来【抽象|Abstracting】它们。Bruce MacLennan 在他的教科书《Functional Programming: Theory and Practice》
（1990）中将此命名为【抽象原则|Abstraction Principle】。
抽象原则要求避免要求某事物被陈述超过一次,，而是【提取|Factor Out】重复的模式。
高阶函数使得这种重构成为可能，因为它们允许我们提取函数并将函数参数化为其他函数。

<!--
Besides `twice`, here are some more relatively simple examples, indebted also to
MacLennan:
-->

除了 `twice`，以下是一些更相对简单的例子，同样感谢 MacLennan：

**应用** 我们可以编写一个函数，将其第一个输入应用于第二个输入：

```{code-cell} ocaml
let apply f x = f x
```

<!--
Of course, writing `apply f` is a lot more work than just writing `f`.
-->

当然，编写 `apply f` 比只编写 `f` 要多做很多工作。

**管道** 我们之前见过的管道运算符是一个高阶函数：

```{code-cell} ocaml
let pipeline x f = f x
let (|>) = pipeline
let x = 5 |> double
```

**组合** 我们可以编写一个函数来组合两个其他函数：

```{code-cell} ocaml
let compose f g x = f (g x)
```

<!--
This function would let us create a new function that can be applied
many times, such as the following:
-->

这个函数让我们可以创建一个可以被多次应用的新函数，例如：

```{code-cell} ocaml
let square_then_double = compose double square
let x = square_then_double 1
let y = square_then_double 2
```

**两者** 我们可以编写一个函数，将两个函数应用于同一个参数，并返回结果的元组：

```{code-cell} ocaml
let both f g x = (f x, g x)
let ds = both double square
let p = ds 3
```

**条件** 我们可以编写一个函数，根据谓词有条件地选择应用两个函数中的哪一个：

```{code-cell} ocaml
let cond p f g x =
  if p x then f x else g x
```

## 「高阶」的含义

<!--
The phrase "higher order" is used throughout logic and computer science, though
not necessarily with a precise or consistent meaning in all cases.
-->

「【高阶|Higher Order】」一词在逻辑学和计算机科学中广泛使用，
尽管在所有情况下不一定具有精确或一致的含义。

<!--
In logic, *first-order quantification* refers primarily to the universal and
existential ($\forall$ and $\exists$) quantifiers. These let you quantify over
some *domain* of interest, such as the natural numbers. But for any given
quantification, say $\forall x$, the variable being quantified represents an
individual element of that domain, say the natural number 42.
-->

在逻辑学中，【一阶量化|First-Order Quantification】主要指全称量词和存在量词（$\forall$ 和 $\exists$）。
这些量词允许你对某个感兴趣的【定义域|Domain】进行量化，例如自然数。
但对于任何给定的量化，例如 $\forall x$，被量化的变量代表该域中的一个元素，例如自然数 42。

<!--
*Second-order quantification* lets you do something strictly more powerful,
which is to quantify over *properties* of the domain. Properties are assertions
about individual elements, for example, that a natural number is even, or that
it is prime. In some logics we can equate properties with sets of individual,
for example the set of all even naturals. So second-order quantification is
often thought of as quantification over *sets*. You can also think of properties
as being functions that take in an element and return a Boolean indicating
whether the element satisfies the property; this is called the *characteristic
function* of the property.
-->

【二阶量化|Second-Order Quantification】让你做一些严格来说更强大的事情，即对域的*属性*进行量化。
属性是关于单个元素的断言，例如一个自然数是偶数，或者它是素数。
在某些逻辑中，我们可以将属性等同于个体的集合，例如所有偶自然数的集合。
因此二阶量化通常被认为是【集合|Set】上的量化。
你也可以将属性视为接受一个元素并返回一个布尔值的函数，指示该元素是否满足该属性；
这被称为属性的【特征函数|Characteristic Function】。

<!--
*Third-order* logic would allow quantification over properties of properties,
and *fourth-order* over properties of properties of properties, and so forth.
*Higher-order logic* refers to all these logics that are more powerful than
first-order logic; though one interesting result in this area is that all
higher-order logics can be expressed in second-order logic.
-->

**三阶**逻辑允许对属性的属性进行量化，**四阶**对属性的属性的属性进行量化，以此类推。
【高阶逻辑|Higher-Order Logic】指的是所有比一阶逻辑更强大的逻辑；
尽管这个领域有一个有趣的结果是所有高阶逻辑都可以用二阶逻辑表达。

<!--
In programming languages, *first-order functions* similarly refer to functions
that operate on individual data elements (e.g., strings, ints, records,
variants, etc.). Whereas *higher-order function* can operate on functions, much
like higher-order logics can quantify over properties (which are like
functions).
-->

在编程语言中，【一阶函数|First-Order Function】类似地指操作单个数据元素（例如字符串、整数、记录体、变体等）的函数。
而【高阶函数|Higher-Order Function】可以操作函数，就像高阶逻辑可以对属性（类似于函数）进行量化一样。

## 著名的高阶函数

<!--
In the next few sections we'll dive into three of the most famous higher-order
functions: map, filter, and fold. These are functions that can be defined for
many data structures, including lists and trees. The basic idea of each is that:
-->

在接下来的几节中，我们将深入了解三个最著名的高阶函数：map、filter 和 fold。
这些函数可以为许多数据结构定义，包括列表和树。每个函数的基本思想是：

<!--
* *map* transforms elements,
* *filter* eliminates elements, and
* *fold* combines elements.
-->

* 【映射|Map】变换元素，
* 【过滤|Filter】消除元素，以及
* 【折叠|Fold】组合元素。
