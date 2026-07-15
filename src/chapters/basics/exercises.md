<!--
# Exercises
-->

# 练习

{{ solutions }}

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "values")}}

<!--
What is the type and value of each of the following OCaml expressions?
-->

以下每个 OCaml 表达式的【类型|Type】和【值|Value】是什么？

* `7 * (1 + 2 + 3)`
* `"CS " ^ string_of_int 3110`

*提示：在顶层环境中输入每个表达式，它会告诉你答案。注意：`^` 不是幂运算。*

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "operators")}}

<!--
Examine the [table of all operators in the OCaml manual][ops] (you will have to
scroll down to find it on that page).
-->

查看 [OCaml 手册中的所有运算符表][ops]（你需要在该页面上向下滚动才能找到它）。

<!--
* Write an expression that multiplies `42` by `10`.
-->

* 编写一个将 `42` 乘以 `10` 的【表达式|Expression】。

<!--
* Write an expression that divides `3.14` by `2.0`. *Hint: integer and
  floating-point operators are written differently in OCaml.*
-->

* 编写一个将 `3.14` 除以 `2.0` 的表达式。*提示：在 OCaml 中，整数和浮点运算符的写法不同。*

<!--
* Write an expression that computes `4.2` raised to the seventh power. *Note:
  there is no built-in integer exponentiation operator in OCaml (nor is there in
  C, by the way), in part because it is not an operation provided by most CPUs.*
-->

* 编写一个计算 `4.2` 的七次方的表达式。*注意：OCaml 中没有内置的整数幂运算符（顺便说一句，C 语言也没有），部分原因是大多数 CPU 不提供此操作。*

[ops]: https://v2.ocaml.org/manual/expr.html#ss%3Aexpr-operators

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "equality")}}

<!--
* Write an expression that compares `42` to `42` using structural equality.
-->

* 编写一个使用结构相等性比较 `42` 和 `42` 的表达式。

<!--
* Write an expression that compares `"hi"` to `"hi"` using structural equality.
  What is the result?
-->

* 编写一个使用结构相等性比较 `"hi"` 和 `"hi"` 的表达式。结果是什么？

<!--
* Write an expression that compares `"hi"` to `"hi"` using physical equality.
  What is the result?
-->

* 编写一个使用物理相等性比较 `"hi"` 和 `"hi"` 的表达式。结果是什么？

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "assert")}}

<!--
* Enter `assert true;;` into utop and see what happens.
-->

* 在 utop 中输入 `assert true;;`，看看会发生什么。

<!--
* Enter `assert false;;` into utop and see what happens.
-->

* 在 utop 中输入 `assert false;;`，看看会发生什么。

<!--
* Write an expression that asserts 2110 is not (structurally) equal to 3110.
-->

* 编写一个断言 2110（在结构上）不等于 3110 的表达式。

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "if")}}

<!--
Write an if expression that evaluates to `42` if `2` is greater than `1` and
otherwise evaluates to `7`.
-->

编写一个 if 表达式，如果 `2` 大于 `1` 则求值为 `42`，否则求值为 `7`。

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "double fun")}}

<!--
Using the increment function from above as a guide, define a function `double`
that multiplies its input by 2. For example, `double 7` would be `14`. Test your
function by applying it to a few inputs. Turn those test cases into assertions.
-->

以上面的递增函数为指导，定义一个【函数|Function】 `double`，将其输入乘以 2。
例如，`double 7` 应该是 `14`。通过将其应用于几个输入来测试你的函数。
将这些测试用例转换为断言。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "more fun")}}

<!--
* Define a function that computes the cube of a floating-point number. Test your
  function by applying it to a few inputs.
-->

* 定义一个计算浮点数立方的函数。通过将其应用于几个输入来测试你的函数。

<!--
* Define a function that computes the sign (1, 0, or -1) of an integer. Use a
  nested if expression. Test your function by applying it to a few inputs.
-->

* 定义一个计算整数符号（1、0 或 -1）的函数。使用嵌套 if 表达式。通过将其应用于几个输入来测试你的函数。

<!--
* Define a function that computes the area of a circle given its radius. Test
  your function with `assert`.
-->

* 定义一个给定半径计算圆面积的函数。用 `assert` 测试你的函数。

<!--
For the latter, bear in mind that floating-point arithmetic is not exact.
Instead of asserting an exact value, you should assert that the result is "close
enough", e.g., within 1e-5. If that's unfamiliar to you, it would be worthwhile
to read up on [floating-point arithmetic][fparith].
-->

对于后者，请记住浮点算术不是精确的。你应该断言结果「足够接近」，例如在 1e-5 范围内，而非断言精确值。
如果你对此不熟悉，建议阅读[浮点算术][fparith]。

[fparith]: https://floating-point-gui.de/

<!--
A function that take multiple inputs can be defined just by providing additional
names for those inputs as part of the let definition. For example, the following
function computes the average of three arguments:
-->

接受多个输入的函数可以通过在 let 定义中为这些输入提供额外的名称来定义。
例如，以下函数计算三个参数的平均值：

```ocaml
let avg3 x y z = (x +. y +. z) /. 3.
```

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "RMS")}}

<!--
Define a function that computes the *root mean square* of two
numbers&mdash;i.e., $\sqrt{(x^2 + y^2) / 2}$. Test your function with `assert`.
-->

定义一个计算两个数的*均方根*的函数&mdash;&mdash;即 $\sqrt{(x^2 + y^2) / 2}$。用 `assert` 测试你的函数。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "date fun")}}

<!--
Define a function that takes an integer `d` and string `m` as input and returns
`true` just when `d` and `m` form a *valid date*. Here, a valid date has a month
that is one of the following abbreviations: Jan, Feb, Mar, Apr, May, Jun, Jul,
Aug, Sept, Oct, Nov, Dec. And the day must be a number that is between 1 and the
minimum number of days in that month, inclusive. For example, if the month is
Jan, then the day is between 1 and 31, inclusive, whereas if the month is Feb,
then the day is between 1 and 28, inclusive.
-->

定义一个函数，它接受整数 `d` 和字符串 `m` 作为输入，仅当 `d` 和 `m` 构成*有效日期*时返回 `true`。
这里，有效日期的月份是以下缩写之一：Jan、Feb、Mar、Apr、May、Jun、Jul、Aug、Sept、Oct、Nov、Dec。
日期必须是介于 1 和该月最小天数之间的数字（含端点）。
例如，如果月份是 Jan，则日期在 1 到 31 之间（含端点），
而如果月份是 Feb，则日期在 1 到 28 之间（含端点）。

<!--
How terse (i.e., few and short lines of code) can you make your function? You
can definitely do this in fewer than 12 lines.
-->

你的函数能写得多简洁（即代码行数少且短）？你绝对可以在 12 行以内完成。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "fib")}}

<!--
Define a recursive function `fib : int -> int`, such that `fib n` is the `n`th
number in the [Fibonacci sequence][fib], which is 1, 1, 2, 3, 5, 8, 13, ... That
is:
-->

定义一个【递归|Recursive】函数 `fib : int -> int`，使得 `fib n` 是[斐波那契数列][fib]中的第 `n` 个数，即 1、1、2、3、5、8、13、…… 也就是说：

<!--
  - `fib 1 = 1`,
-->

  - `fib 1 = 1`，

<!--
  - `fib 2 = 1`, and
-->

  - `fib 2 = 1`，且

<!--
  - `fib n = fib (n-1) + fib (n-2)` for any `n > 2`.
-->

  - 对于任何 `n > 2`，`fib n = fib (n-1) + fib (n-2)`。

<!--
Test your function in the toplevel.
-->

在顶层环境中测试你的函数。

[fib]: https://en.wikipedia.org/wiki/Fibonacci_number

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "fib fast")}}

<!--
How quickly does your implementation of `fib` compute the 50th Fibonacci number?
If it computes nearly instantaneously, congratulations! But the recursive
solution most people come up with at first will seem to hang indefinitely. The
problem is that the obvious solution computes subproblems repeatedly. For
example, computing `fib 5` requires computing both `fib 3` and `fib 4`, and if
those are computed separately, a lot of work (an exponential amount, in fact) is
being redone.
-->

你的 `fib` 实现计算第 50 个斐波那契数有多快？
如果它几乎是瞬间完成的，恭喜！但大多数人最初想到的递归解决方案似乎会无限期挂起。
问题在于显而易见的解决方案会重复计算子问题。
例如，计算 `fib 5` 需要同时计算 `fib 3` 和 `fib 4`，
如果它们被分别计算，大量工作（实际上是指数级的）会被重复执行。

<!--
Create a function `fib_fast` that requires only a linear amount of work. *Hint:*
write a recursive helper function `h : int -> int -> int -> int`, where
`h n pp p` is defined as follows:
-->

创建一个只需要线性工作量的函数 `fib_fast`。*提示：*
编写一个递归辅助函数 `h : int -> int -> int -> int`，其中 `h n pp p` 定义如下：

<!--
- `h 1 pp p = p`, and
-->

- `h 1 pp p = p`，且

<!--
- `h n pp p = h (n-1) p (pp+p)` for any `n > 1`.
-->

- 对于任何 `n > 1`，`h n pp p = h (n-1) p (pp+p)`。

<!--
The idea of `h` is that it assumes the previous two Fibonacci numbers were `pp`
and `p`, then computes forward `n` more numbers. Hence, `fib n = h n 0 1` for
any `n > 0`.
-->

`h` 的思想是假设前两个斐波那契数是 `pp` 和 `p`，然后向前计算 `n` 个数。
因此，对于任何 `n > 0`，`fib n = h n 0 1`。

<!--
What is the first value of `n` for which `fib_fast n` is negative, indicating
that integer overflow occurred?
-->

`fib_fast n` 为负数的第一个 `n` 值是多少？这表明发生了整数溢出。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "poly types")}}

<!--
What is the type of each of the functions below?  You can ask the toplevel to check
your answers.
-->

以下每个函数的类型是什么？你可以让顶层环境检查你的答案。

```ocaml
let f x = if x then x else x
let g x y = if y then x else x
let h x y z = if x then y else z
let i x y z = if x then y else y
```

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "divide")}}

<!--
Write a function `divide : numerator:float -> denominator:float -> float`. Apply
your function.
-->

编写一个函数 `divide : numerator:float -> denominator:float -> float`。应用你的函数。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "associativity")}}

<!--
Suppose that we have defined `let add x y = x + y`. Which of the following
produces an integer, which produces a function, and which produces an error?
Decide on an answer, then check your answer in the toplevel.
-->

假设我们定义了 `let add x y = x + y`。以下哪个产生整数，哪个产生函数，哪个产生错误？
决定答案，然后在顶层环境中检查你的答案。

* `add 5 1`
* `add 5`
* `(add 5) 1`
* `add (5 1)`

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "average")}}

<!--
Define an infix operator `+/.` to compute the average of two
floating-point numbers.  For example,
-->

定义一个中缀运算符 `+/.` 来计算两个浮点数的平均值。例如，

* `1.0 +/. 2.0 = 1.5`
* `0. +/. 0. = 0.`

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "hello world")}}

<!--
Type the following in utop:
-->

在 utop 中输入以下内容：

<!--
- `print_endline "Hello world!";;`
- `print_string "Hello world!";;`
-->

- `print_endline "Hello world!";;`
- `print_string "Hello world!";;`

<!--
Notice the difference in output from each.
-->

注意每个输出的差异。
