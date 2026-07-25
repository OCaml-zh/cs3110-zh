<!--
# Exercises
-->

# 练习

{{ solutions }}

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "twice, no arguments")}}

<!--
Consider the following definitions:
-->
考虑以下定义：

```ocaml
let double x = 2 * x
let square x = x * x
let twice f x = f (f x)
let quad = twice double
let fourth = twice square
```

<!--
Use the toplevel to determine what the types of `quad` and `fourth` are. Explain
how it can be that `quad` is not syntactically written as a function that takes
an argument, and yet its type shows that it is in fact a function.
-->

使用顶层环境确定 `quad` 和 `fourth` 的类型。
解释为什么 `quad` 在语法上并没有写成一个接受参数的函数，
但其类型却表明它实际上是一个函数。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "mystery operator 1")}}

<!--
What does the following operator do?
-->
以下运算符做什么？

```ocaml
let ( $ ) f x = f x
```

<!--
*Hint: investigate `square $ 2 + 2` vs. `square 2 + 2`.*
-->

**提示：研究 `square $ 2 + 2` 与 `square 2 + 2` 的区别。**

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "mystery operator 2")}}

<!--
What does the following operator do?
-->

以下运算符做什么？

```ocaml
let ( @@ ) f g x = x |> g |> f
```

<!--
*Hint: investigate `String.length @@ string_of_int` applied to `1`, `10`, `100`,
etc.*
-->

**提示：研究 `String.length @@ string_of_int` 应用于 `1`、`10`、`100`
等值时的结果。**

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "repeat")}}

<!--
Generalize `twice` to a function `repeat`, such that `repeat f n x` applies `f`
to `x` a total of `n` times. That is,
-->

将 `twice` 推广为一个函数 `repeat`，
使得 `repeat f n x` 将 `f` 应用于 `x` 共 `n` 次。即：

* `repeat f 0 x` 返回 `x`
* `repeat f 1 x` 返回 `f x`
* `repeat f 2 x` 返回 `f (f x)`（与 `twice f x` 相同）
* `repeat f 3 x` 返回 `f (f (f x))`
* ...

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "product")}}

<!--
Use `fold_left` to write a function `product_left` that computes the product of
a list of floats. The product of the empty list is `1.0`. *Hint: recall how we
implemented `sum` in just one line of code in lecture.*
-->

使用 `fold_left` 编写一个函数 `product_left`，
计算浮点数列表的乘积。空列表的乘积为 `1.0`。
**提示：回忆我们在课堂上如何仅用一行代码实现了 `sum`。**

<!--
Use `fold_right` to write a function `product_right` that computes the product
of a list of floats. *Same hint applies.*
-->

使用 `fold_right` 编写一个函数 `product_right`，
计算浮点数列表的乘积。**同样的提示适用。**

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "terse product")}}

<!--
How terse can you make your solutions to the **product** exercise? *Hints: you
need only one line of code for each, and you do not need the `fun` keyword. For
`fold_left`, your function definition does not even need to explicitly take a
list argument. If you use `ListLabels`, the same is true for `fold_right`.*
-->

你能把 **product** 练习的解决方案写得多简洁？
**提示：每个函数只需要一行代码，且不需要 `fun` 关键字。
对于 `fold_left`，你的函数定义甚至不需要显式接受列表参数。
如果使用 `ListLabels`，`fold_right` 同样如此。**

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "sum_cube_odd")}}

<!--
Write a function `sum_cube_odd n` that computes the sum of the cubes of all the
odd numbers between `0` and `n` inclusive. Do not write any new recursive
functions. Instead, use the functionals map, fold, and filter, and the `( -- )`
operator (defined in the discussion of pipelining).
-->

编写一个函数 `sum_cube_odd n`，
计算 `0` 到 `n`（含）之间所有奇数的立方和。
不要编写任何新的递归函数。
而是使用函数式操作【映射|Map】、【折叠|Fold】和【过滤|Filter】，
以及 `( -- )` 运算符（在【管道化|Pipelining】的讨论中定义的）。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "sum_cube_odd pipeline")}}

<!--
Rewrite the function `sum_cube_odd` to use the pipeline operator `|>`.
-->

重写函数 `sum_cube_odd`，使用【管道运算符|Pipeline Operator】 `|>`。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "exists")}}

<!--
Consider writing a function `exists: ('a -> bool) -> 'a list -> bool`, such that
`exists p [a1; ...; an]` returns whether at least one element of the list
satisfies the predicate `p`. That is, it evaluates the same as
`(p a1) || (p a2) || ... || (p an)`. When applied to an empty list, it evaluates
to `false`.
-->

考虑编写一个函数 `exists: ('a -> bool) -> 'a list -> bool`，
使得 `exists p [a1; ...; an]` 返回列表中是否至少有一个
元素满足【谓词|Predicate】 `p`。
即，它与 `(p a1) || (p a2) || ... || (p an)` 的求值结果相同。
当应用于空列表时，它返回 `false`。

<!--
Write three solutions to this problem, as we did above:
-->

如上所述，为这个问题编写三种解决方案：

<!--
* `exists_rec`, which must be a recursive function that does not use the `List`
  module,
* `exists_fold`, which uses either `List.fold_left` or `List.fold_right`, but
  not any other `List` module functions nor the `rec` keyword, and
* `exists_lib`, which uses any combination of `List` module functions other than
  `fold_left` or `fold_right`, and does not use the `rec` keyword.
-->

* `exists_rec`，必须是一个不使用 `List` 模块的【递归函数|Recursive Function】，
* `exists_fold`，使用 `List.fold_left` 或 `List.fold_right`，
  但不使用任何其他 `List` 模块函数，也不使用 `rec` 关键字，
* `exists_lib`，使用 `List` 模块中除 `fold_left` 和 `fold_right`
  之外的任意函数组合，且不使用 `rec` 关键字。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "account balance")}}

<!--
Write a function which, given a list of numbers representing debits, deducts
them from an account balance, and finally returns the remaining amount in the
balance. Write three versions: `fold_left`, `fold_right`, and a direct recursive
implementation.
-->

编写一个函数，给定一个表示借方金额的数字列表，
从账户余额中扣除这些金额，最后返回余额中的剩余金额。
编写三个版本：`fold_left`、`fold_right` 和直接递归实现。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "library uncurried")}}

<!--
Here is an uncurried version of `List.nth`:
-->

以下是 `List.nth` 的【非柯里化|Uncurried】版本：

```ocaml
let uncurried_nth (lst, n) = List.nth lst n
```

<!--
In a similar way, write uncurried versions of these library functions:
-->

以类似方式，编写以下库函数的非柯里化版本：

  - `List.append`
  - `Char.compare`
  - `Stdlib.max`

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "map composition")}}

<!--
Show how to replace any expression of the form `List.map f (List.map g lst)`
with an equivalent expression that calls `List.map` only once.
-->

展示如何将任何形式为 `List.map f (List.map g lst)` 的表达式
替换为仅调用一次 `List.map` 的等价表达式。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "more list fun")}}

<!--
Write functions that perform the following computations. Each function that you
write should use one of `List.fold`, `List.map` or `List.filter`. To choose
which of those to use, think about what the computation is doing: combining,
transforming, or filtering elements.
-->

编写执行以下计算的函数。
你编写的每个函数应使用 `List.fold`、`List.map` 或 `List.filter` 中的一个。
要选择使用哪一个，请思考计算在做什么：
组合、变换还是过滤元素。

<!--
* Find those elements of a list of strings whose length is strictly greater than
  3.
* Add `1.0` to every element of a list of floats.
* Given a list of strings `strs` and another string `sep`, produce the string
  that contains every element of `strs` separated by `sep`. For example, given
  inputs `["hi";"bye"]` and `","`, produce `"hi,bye"`, being sure not to produce
  an extra comma either at the beginning or end of the result string.
-->

* 找出字符串列表中长度严格大于 3 的元素。
* 给浮点数列表的每个元素加上 `1.0`。
* 给定一个字符串列表 `strs` 和另一个字符串 `sep`，
  生成一个包含 `strs` 中所有元素、以 `sep` 分隔的字符串。
  例如，给定输入 `["hi";"bye"]` 和 `","`，
  生成 `"hi,bye"`，注意不要在结果字符串的开头或结尾产生多余的逗号。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "association list keys")}}

<!--
Recall that an association list is an implementation of a dictionary in terms of
a list of pairs, in which we treat the first component of each pair as a key and
the second component as a value.
-->

回忆一下，【关联列表|Association List】是字典的一种实现方式，
它使用偶对列表，其中我们将每个偶对的【分量|Component】视为【键|Key】，
第二个分量视为值。

<!--
Write a function `keys: ('a * 'b) list -> 'a list` that returns a list of the
unique keys in an association list. Since they must be unique, no value should
appear more than once in the output list. The order of values output does not
matter. How compact and efficient can you make your solution? Can you do it in
one line and linearithmic space and time? *Hint: `List.sort_uniq`.*
-->

编写一个函数 `keys: ('a * 'b) list -> 'a list`，
返回关联列表中唯一的键列表。
由于它们必须唯一，输出列表中不应有任何值出现超过一次。
输出值的顺序无关紧要。
你能把解决方案做得多紧凑高效？
你能在一行内以线性对数的空间和时间复杂度完成吗？
**提示：`List.sort_uniq`。**

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "valid matrix")}}

<!--
A mathematical *matrix* can be represented with lists. In *row-major*
representation, this matrix
-->

数学中的【矩阵|Matrix】可以用列表来表示。
在【行优先|Row-Major】表示中，矩阵

$$ \begin{bmatrix} 1 & 1 & 1 \\ 9 & 8 & 7 \end{bmatrix} $$

<!--
would be represented as the list `[[1; 1; 1]; [9; 8; 7]]`. Let's represent a
*row vector* as an `int list`. For example, `[9; 8; 7]` is a row vector.
-->

将被表示为列表 `[[1; 1; 1]; [9; 8; 7]]`。
我们将【行向量|Row Vector】表示为 `int list`。
例如，`[9; 8; 7]` 是一个行向量。

<!--
A *valid* matrix is an `int list list` that has at least one row, at least one
column, and in which every column has the same number of rows. There are many
values of type `int list list` that are invalid, for example,
-->

*有效*矩阵是一个 `int list list`，
它至少有一行、至少有一列，且每列的行数相同。
有许多类型为 `int list list` 的值是无效的，例如：

* `[]`
* `[[1; 2]; [3]]`

<!--
Implement a function `is_valid_matrix: int list list -> bool` that returns
whether the input matrix is valid. Unit test the function.
-->

实现一个函数 `is_valid_matrix: int list list -> bool`，
返回输入矩阵是否有效。对该函数进行【单元测试|Unit Testing】。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "row vector add")}}

<!--
Implement a function `add_row_vectors: int list -> int list -> int list` for the
element-wise addition of two row vectors. For example, the addition of
`[1; 1; 1]` and `[9; 8; 7]` is `[10; 9; 8]`. If the two vectors do not have the
same number of entries, the behavior of your function is
*unspecified*&mdash;that is, it may do whatever you like. *Hint: there is an
elegant one-line solution using `List.map2`.* Unit test the function.
-->

实现一个函数 `add_row_vectors: int list -> int list -> int list`，
用于两个行向量的逐元素加法。
例如，`[1; 1; 1]` 和 `[9; 8; 7]` 的加法结果为 `[10; 9; 8]`。
如果两个向量的元素数量不同，
则函数的行为是*未指定*的——也就是说，它可以做任何你想做的事。
**提示：有一个使用 `List.map2` 的优雅单行解决方案。**
对该函数进行单元测试。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "matrix add")}}

<!--
Implement a function `add_matrices: int list list -> int list list -> int list
list` for [matrix addition][matadd]. If the two input matrices are not the same
size, the behavior is unspecified. *Hint: there is an elegant one-line solution
using `List.map2` and `add_row_vectors`.* Unit test the function.
-->

实现一个函数 `add_matrices: int list list -> int list list -> int list list`，
用于[矩阵加法][matadd]。
如果两个输入矩阵的大小不同，则行为未指定。
**提示：有一个使用 `List.map2` 和 `add_row_vectors` 的优雅单行解决方案。**
对该函数进行单元测试。

[matadd]: http://mathworld.wolfram.com/MatrixAddition.html

<!--------------------------------------------------------------------------->
{{ ex4 | replace("%%NAME%%", "matrix multiply")}}

<!--
Implement a function `multiply_matrices: int list list -> int list list -> int
list list` for [matrix multiplication][matmult]. If the two input matrices are
not of sizes that can be multiplied together, the behavior is unspecified. Unit
test the function. *Hint: define functions for matrix transposition and row
vector dot product.*
-->

实现一个函数 `multiply_matrices: int list list -> int list list -> int list list`，
用于[矩阵乘法][matmult]。
如果两个输入矩阵的大小不能相乘，则行为未指定。
对该函数进行单元测试。
**提示：定义矩阵【转置|Transpose】和行向量【点积|Dot Product】的函数。**

[matmult]: http://mathworld.wolfram.com/MatrixMultiplication.html
