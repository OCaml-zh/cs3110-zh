<!--
# Exercises
-->

# 练习

{{ solutions }}

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "list expressions")}}

<!--
* Construct a list that has the integers 1 through 5 in it. Use the square
  bracket notation for lists.
-->

* 构造一个包含整数 1 到 5 的【列表|List】。使用方括号记法。

<!--
* Construct the same list, but do not use the square bracket notation. Instead,
  use `::` and `[]`.
-->

* 构造相同的列表，但不使用方括号记法。改用 `::` 和 `[]`。

<!--
* Construct the same list again. This time, the following expression must appear
  in your answer: `[2; 3; 4]`. Use the `@` operator, and do not use `::`.
-->

* 再次构造相同的列表。这次，你的答案中必须出现以下表达式：`[2; 3; 4]`。使用 `@` 运算符，且不使用 `::`。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "product")}}

<!--
Write a function `product` that returns the product of all the elements in a
list. The product of all the elements of an empty list is `1`.
-->

编写一个函数 `product`，返回列表中所有元素的乘积。空列表的所有元素的乘积是 `1`。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "concat")}}

<!--
Write a function that concatenates all the strings in a list. The concatenation
of all the strings in an empty list is the empty string `""`.
-->

编写一个函数，连接列表中的所有字符串。空列表中所有字符串的连接是空字符串 `""`。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "product test")}}

<!--
Unit test the function `product` that you wrote in an exercise above.
-->

对你在上面练习中编写的函数 `product` 进行单元测试。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "patterns")}}

<!--
Using pattern matching, write three functions, one for each of the following
properties. Your functions should return `true` if the input list has the
property and `false` otherwise.
-->

使用【模式匹配|Pattern Matching】编写三个函数，每个函数对应以下属性之一。
如果输入列表具有该属性，你的函数应返回 `true`，否则返回 `false`。

<!--
* the list's first element is `"bigred"`
-->

* 列表的第一个元素是 `"bigred"`

<!--
* the list has exactly two or four elements; do not use the `length` function
-->

* 列表恰好有两个或四个元素；不要使用 `length` 函数

<!--
* the first two elements of the list are equal
-->

* 列表的前两个元素相等

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "library")}}

<!--
Consult the [`List` standard library][listdoc] to solve these exercises:
-->

查阅 [`List` 标准库][listdoc]来解决这些练习：

<!--
* Write a function that takes an `int list` and returns the fifth element of
  that list, if such an element exists. If the list has fewer than five
  elements, return `0`. *Hint: `List.length` and `List.nth`.*
-->

* 编写一个函数，接受一个 `int list` 并返回该列表的第五个元素（如果存在）。如果列表少于五个元素，返回 `0`。*提示：`List.length` 和 `List.nth`。*

<!--
* Write a function that takes an `int list` and returns the list sorted in
  descending order. *Hint: `List.sort` with `Stdlib.compare` as its first
  argument, and `List.rev`.*
-->

* 编写一个函数，接受一个 `int list` 并返回按降序排列的列表。*提示：`List.sort` 以 `Stdlib.compare` 作为第一个参数，以及 `List.rev`。*

[listdoc]: https://ocaml.org/api/List.html

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "library test")}}

<!--
Write a couple OUnit unit tests for each of the functions you wrote in the
previous exercise.
-->

为你在上一个练习中编写的每个函数编写几个 OUnit 单元测试。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "library puzzle")}}

<!--
* Write a function that returns the last element of a list. Your function may
  assume that the list is non-empty. *Hint: Use two library functions, and do
  not write any pattern matching code of your own.*
-->

* 编写一个返回列表最后一个元素的函数。你的函数可以假设列表非空。*提示：使用两个库函数，不要编写任何模式匹配代码。*

<!--
* Write a function `any_zeros : int list -> bool` that returns `true` if and
  only if the input list contains at least one `0`. *Hint: use one library
  function, and do not write any pattern matching code of your own.*
-->

* 编写一个函数 `any_zeros : int list -> bool`，当且仅当输入列表包含至少一个 `0` 时返回 `true`。*提示：使用一个库函数，不要编写任何模式匹配代码。*

<!--
Your solutions will be only one or two lines of code each.
-->

你的解决方案每个只有一两行代码。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "take drop")}}

<!--
* Write a function `take : int -> 'a list -> 'a list` such that `take n lst`
  returns the first `n` elements of `lst`. If `lst` has fewer than `n` elements,
  return all of them.
-->

* 编写一个函数 `take : int -> 'a list -> 'a list`，使得 `take n lst` 返回 `lst` 的前 `n` 个元素。如果 `lst` 的元素少于 `n` 个，返回所有元素。

<!--
* Write a function `drop : int -> 'a list -> 'a list` such that `drop n lst`
  returns all but the first `n` elements of `lst`. If `lst` has fewer than `n`
  elements, return the empty list.
-->

* 编写一个函数 `drop : int -> 'a list -> 'a list`，使得 `drop n lst` 返回 `lst` 除前 `n` 个元素之外的所有元素。如果 `lst` 的元素少于 `n` 个，返回空列表。

<!--------------------------------------------------------------------------->
{{ ex4 | replace("%%NAME%%", "take drop tail")}}

<!--
Revise your solutions for `take` and `drop` to be tail recursive, if they aren't
already. Test them on long lists with large values of `n` to see whether they
run out of stack space. To construct long lists, use the `--` operator from
the [lists](lists) section.
-->

如果你的 `take` 和 `drop` 解决方案还不是尾递归的，请修改它们。
在长列表和大值 `n` 上测试它们，看看是否会耗尽栈空间。
要构造长列表，请使用[列表](lists)部分中的 `--` 运算符。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "unimodal")}}

<!--
Write a function `is_unimodal : int list -> bool` that takes an integer list and
returns whether that list is unimodal. A *unimodal list* is a list that
monotonically increases to some maximum value then monotonically decreases after
that value. Either or both segments (increasing or decreasing) may be empty. A
constant list is unimodal, as is the empty list.
-->

编写一个函数 `is_unimodal : int list -> bool`，接受一个整数列表并返回该列表是否是单峰的。
*单峰列表*是一个单调递增到某个最大值然后在该值之后单调递减的列表。
两个部分（递增或递减）中的一个或两个都可以为空。常量列表是单峰的，空列表也是。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "powerset")}}

<!--
Write a function `powerset : int list -> int list list` that takes a set *S*
represented as a list and returns the set of all subsets of *S*. The order of
subsets in the powerset and the order of elements in the subsets do not matter.
-->

编写一个函数 `powerset : int list -> int list list`，接受一个表示为列表的集合 *S*，并返回 *S* 的所有子集的集合。幂集中子集的顺序和子集中元素的顺序无关紧要。

<!--
*Hint:* Consider the recursive structure of this problem. Suppose you already
have `p`, such that `p = powerset s`. How could you use `p` to compute
`powerset (x :: s)`?
-->

*提示：* 考虑这个问题的递归结构。假设你已经有了 `p`，使得 `p = powerset s`。你如何使用 `p` 来计算 `powerset (x :: s)`？

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "print int list rec")}}

<!--
Write a function `print_int_list : int list -> unit` that prints its input list,
one number per line. For example, `print_int_list [1; 2; 3]` should result in
this output:
-->

编写一个函数 `print_int_list : int list -> unit`，打印其输入列表，每行一个数字。例如，`print_int_list [1; 2; 3]` 应该产生以下输出：

```
1
2
3
```

<!--
Here is some code to get you started:
-->

以下是一些入门代码：

```ocaml
let rec print_int_list = function
| [] -> ()
| h :: t -> (* fill in here *); print_int_list t
```

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "print int list iter")}}

<!--
Write a function `print_int_list' : int list -> unit` whose specification is the
same as `print_int_list`. Do not use the keyword `rec` in your solution, but
instead to use the [List module][list] function `List.iter`. Here is some code
to get you started:
-->

编写一个函数 `print_int_list' : int list -> unit`，其规范与 `print_int_list` 相同。
不要在解决方案中使用关键字 `rec`，而是使用 [List 模块][list]的函数 `List.iter`。以下是一些入门代码：

```ocaml
let print_int_list' lst =
  List.iter (fun x -> (* fill in here *)) lst
```

[list]: https://ocaml.org/api/List.html

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "student")}}

<!--
Assume the following type definition:
-->

假设以下类型定义：

```ocaml
type student = {first_name : string; last_name : string; gpa : float}
```

<!--
Give OCaml expressions that have the following types:
-->

给出具有以下类型的 OCaml 表达式：

<!--
* `student`
-->

* `student`

<!--
* `student -> string * string` (a function that extracts the student's name)
-->

* `student -> string * string`（一个提取学生姓名的函数）

<!--
* `string -> string -> float -> student` (a function that creates a student
  record)
-->

* `string -> string -> float -> student`（一个创建学生记录的函数）

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "pokerecord")}}

<!--
Here is a variant that represents a few Pok&eacute;mon types:
-->

以下是表示几种宝可梦类型的变体：

```ocaml
type poketype = Normal | Fire | Water
```

<!--
* Define the type `pokemon` to be a record with fields `name` (a string), `hp`
  (an integer), and `ptype` (a `poketype`).
-->

* 定义类型 `pokemon` 为一个记录，包含字段 `name`（字符串）、`hp`（整数）和 `ptype`（`poketype`）。

<!--
* Create a record named `charizard` of type `pokemon` that represents a
  Pok&eacute;mon with 78 HP and Fire type.
-->

* 创建一个名为 `charizard` 的类型为 `pokemon` 的记录，表示一个拥有 78 HP 和火属性的宝可梦。

<!--
* Create a record named `squirtle` of type `pokemon` that represents a
  Pok&eacute;mon with 44 HP and Water type.
-->

* 创建一个名为 `squirtle` 的类型为 `pokemon` 的记录，表示一个拥有 44 HP 和水属性的宝可梦。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "safe hd and tl")}}

<!--
Write a function `safe_hd : 'a list -> 'a option` that returns `Some x` if the
head of the input list is `x`, and `None` if the input list is empty.
-->

编写一个函数 `safe_hd : 'a list -> 'a option`，如果输入列表的头部是 `x` 则返回 `Some x`，如果输入列表为空则返回 `None`。

<!--
Also write a function `safe_tl : 'a list -> 'a list option` that returns the
tail of the list, or `None` if the list is empty.
-->

同时编写一个函数 `safe_tl : 'a list -> 'a list option`，返回列表的尾部，如果列表为空则返回 `None`。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "pokefun")}}

<!--
Write a function `max_hp : pokemon list -> pokemon option` that, given a list of
`pokemon`, finds the Pok&eacute;mon with the highest HP.
-->

编写一个函数 `max_hp : pokemon list -> pokemon option`，给定一个 `pokemon` 列表，找到 HP 最高的宝可梦。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "date before")}}

<!--
Define a *date-like triple* to be a value of type `int * int * int`. Examples of
date-like triples include `(2013, 2, 1)` and `(0, 0, 1000)`. A *date* is a
date-like triple whose first part is a positive year (i.e., a year in the common
era), second part is a month between 1 and 12, and third part is a day between 1
and 31 (or 30, 29, or 28, depending on the month and year). `(2013, 2, 1)` is a
date; `(0, 0, 1000)` is not.
-->

定义*日期样三元组*为类型 `int * int * int` 的值。日期样三元组的例子包括 `(2013, 2, 1)` 和 `(0, 0, 1000)`。
*日期*是一个日期样三元组，其第一部分是正年份（即公元纪年），第二部分是 1 到 12 之间的月份，第三部分是 1 到 31 之间的日期（或 30、29、28，取决于月份和年份）。`(2013, 2, 1)` 是日期；`(0, 0, 1000)` 不是。

<!--
Write a function `is_before` that takes two dates as input and evaluates to
`true` or `false`. It evaluates to `true` if the first argument is a date that
comes before the second argument. (If the two dates are the same, the result is
`false`.)
-->

编写一个函数 `is_before`，接受两个日期作为输入，求值为 `true` 或 `false`。
如果第一个参数是在第二个参数之前的日期，它求值为 `true`。（如果两个日期相同，结果是 `false`。）

<!--
Your function needs to work correctly only for dates, not for arbitrary
date-like triples. However, you will probably find it easier to write your
solution if you think about making it work for arbitrary date-like triples. For
example, it's easier to forget about whether the input is truly a date, and
simply write a function that claims (for example) that January 100, 2013 comes
before February 34, 2013&mdash;because any date in January comes before any date
in February, but a function that says that January 100, 2013 comes after
February 34, 2013 is also valid. You may ignore leap years.
-->

你的函数只需要对日期正确工作，而不需要对任意日期样三元组工作。
然而，如果你考虑使其对任意日期样三元组工作，你可能会发现更容易编写解决方案。
例如，更容易忘记输入是否真的是日期，而 simply 编写一个函数（例如）声称 2013 年 1 月 100 日在 2013 年 2 月 34 日之前&mdash;&mdash;
因为 1 月的任何日期都在 2 月的任何日期之前，
但一个说 2013 年 1 月 100 日在 2013 年 2 月 34 日之后的函数也是有效的。你可以忽略闰年。

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "earliest date")}}

<!--
Write a function `earliest : (int*int*int) list -> (int * int * int) option`. It
evaluates to `None` if the input list is empty, and to `Some d` if date `d` is
the earliest date in the list. *Hint: use `is_before`.*
-->

编写一个函数 `earliest : (int*int*int) list -> (int * int * int) option`。
如果输入列表为空，它求值为 `None`，如果日期 `d` 是列表中最早的日期，它求值为 `Some d`。*提示：使用 `is_before`。*

<!--
As in the previous exercise, your function needs to work correctly
only for dates, not for arbitrary date-like triples.
-->

与上一个练习一样，你的函数只需要对日期正确工作，而不需要对任意日期样三元组工作。

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "assoc list")}}

<!--
Use the functions `insert` and `lookup` from the
[section on association lists](assoc_list) to construct an association list that
maps the integer 1 to the string "one", 2 to "two", and 3 to "three". Lookup the
key 2. Lookup the key 4.
-->

使用[关联列表](assoc_list)部分中的函数 `insert` 和 `lookup` 来构造一个关联列表，将整数 1 映射到字符串 "one"，2 映射到 "two"，3 映射到 "three"。查找键 2。查找键 4。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "cards")}}

<!--
* Define a variant type `suit` that represents the four suits, &clubs; &diams;
  &hearts; &spades;, in a [standard 52-card deck][cards]. All the constructors
  of your type should be constant.
-->

* 定义一个变体类型 `suit`，表示[标准 52 张扑克牌][cards]中的四种花色：&clubs; &diams; &hearts; &spades;。你的类型的所有构造子都应该是常量。

<!--
* Define a type `rank` that represents the possible ranks of a card: 2, 3, ...,
  10, Jack, Queen, King, or Ace. There are many possible solutions; you are free
  to choose whatever works for you. One is to make `rank` be a synonym of `int`,
  and to assume that Jack=11, Queen=12, King=13, and Ace=1 or 14. Another is to
  use variants.
-->

* 定义一个类型 `rank`，表示牌的可能点数：2、3、……、10、Jack、Queen、King 或 Ace。有很多可能的解决方案；你可以自由选择适合你的方式。一种是将 `rank` 作为 `int` 的同义词，并假设 Jack=11、Queen=12、King=13、Ace=1 或 14。另一种是使用变体。

<!--
* Define a type `card` that represents the suit and rank of a single card. Make
  it a record with two fields.
-->

* 定义一个类型 `card`，表示单张牌的花色和点数。将其作为包含两个字段的记录。

<!--
* Define a few values of type `card`: the Ace of Clubs, the Queen of Hearts, the
  Two of Diamonds, the Seven of Spades.
-->

* 定义几个类型为 `card` 的值：梅花 A、红桃 Q、方块 2、黑桃 7。

[cards]: https://en.wikipedia.org/wiki/Standard_52-card_deck

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "matching")}}

<!--
For each pattern in the list below, give a value of type `int option list` that
does *not* match the pattern and is not the empty list, or explain why that's
impossible.
-->

对于下面列表中的每个模式，给出一个类型为 `int option list` 的值，该值*不*匹配该模式且不是空列表，或者解释为什么不可能。

 - `Some x :: tl`
 - `[Some 3110; None]`
 - `[Some x; _]`
 - `h1 :: h2 :: tl`
 - `h :: tl`

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "quadrant")}}

<image style="float: right;"
       src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cartesian_coordinates_2D.svg/300px-Cartesian_coordinates_2D.svg.png"
       alt="Quadrant 1: x, and y both positive.  Quadrant 2: x negative, y positive.  Quadrant 3: both x and y negative.  Quadrant 4: x positive, y negative."
       />

<!--
Complete the `quadrant` function below, which should return the quadrant of the
given `x, y` point according to the diagram on the right (borrowed from
[Wikipedia](https://en.wikipedia.org/wiki/File:Cartesian_coordinates_2D.svg)).
Points that lie on an axis do not belong to any quadrant. *Hints: (a) define a
helper function for the sign of an integer, (b) match against a pair.*
-->

完成下面的 `quadrant` 函数，它应该根据右边的图表（借用自[维基百科](https://en.wikipedia.org/wiki/File:Cartesian_coordinates_2D.svg)）返回给定 `x, y` 点所在的象限。位于轴上的点不属于任何象限。*提示：(a) 为整数的符号定义一个辅助函数，(b) 对元组进行匹配。*

```ocaml
type quad = I | II | III | IV
type sign = Neg | Zero | Pos

let sign (x:int) : sign =
  ...

let quadrant : int*int -> quad option = fun (x,y) ->
  match ... with
    | ... -> Some I
    | ... -> Some II
    | ... -> Some III
    | ... -> Some IV
    | ... -> None
```

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "quadrant when")}}

<!--
Rewrite the quadrant function to use the `when` syntax. You won't need your
helper function from before.
-->

重写 quadrant 函数以使用 `when` 语法。你不需要之前的辅助函数。

```ocaml
let quadrant_when : int*int -> quad option = function
    | ... when ... -> Some I
    | ... when ... -> Some II
    | ... when ... -> Some III
    | ... when ... -> Some IV
    | ... -> None
```

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "depth")}}

<!--
Write a function `depth : 'a tree -> int` that returns the number of nodes in
any longest path from the root to a leaf. For example, the depth of an empty
tree (simply `Leaf`) is `0`, and the depth of tree `t` above is `3`. *Hint:
there is a library function `max : 'a -> 'a -> 'a` that returns the maximum of
any two values of the same type.*
-->

编写一个函数 `depth : 'a tree -> int`，返回从根到叶子的任何最长路径中的节点数。
例如，空树（只是 `Leaf`）的深度是 `0`，上面树 `t` 的深度是 `3`。
*提示：有一个库函数 `max : 'a -> 'a -> 'a`，返回相同类型的任意两个值的最大值。*

<!--------------------------------------------------------------------------->
{{ ex3 | replace("%%NAME%%", "shape")}}

<!--
Write a function `same_shape : 'a tree -> 'b tree -> bool` that determines
whether two trees have the same shape, regardless of whether the values they
carry at each node are the same. *Hint: use a pattern match with three branches,
where the expression being matched is a pair of trees.*
-->

编写一个函数 `same_shape : 'a tree -> 'b tree -> bool`，确定两棵树是否具有相同的形状，无论它们在每个节点上携带的值是否相同。
*提示：使用具有三个分支的模式匹配，其中被匹配的表达式是一对树。*

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "list max exn")}}

<!--
Write a function `list_max : int list -> int` that returns the maximum integer
in a list, or raises `Failure "empty"` if the list is empty.
-->

编写一个函数 `list_max : int list -> int`，返回列表中的最大整数，如果列表为空则引发 `Failure "empty"`。

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "list max exn string")}}

<!--
Write a function `list_max_string : int list -> string` that returns a string
containing the maximum integer in a list, or the string `"empty"` (note, not the
exception `Failure "empty"` but just the string `"empty"`) if the list is empty.
*Hint: `string_of_int` in the standard library will do what its name suggests.*
-->

编写一个函数 `list_max_string : int list -> string`，返回包含列表中最大整数的字符串，如果列表为空则返回字符串 `"empty"`（注意，不是异常 `Failure "empty"`，而只是字符串 `"empty"`）。
*提示：标准库中的 `string_of_int` 会做其名称所暗示的事情。*

<!--------------------------------------------------------------------------->
{{ ex1 | replace("%%NAME%%", "list max exn ounit")}}

<!--
Write two OUnit tests to determine whether your solution to **list max exn**,
above, correctly raises an exception when its input is the empty list, and
whether it correctly returns the max value of the input list when that list is
non-empty.
-->

编写两个 OUnit 测试，以确定你上面的 **list max exn** 解决方案在输入为空列表时是否正确引发异常，以及在列表非空时是否正确返回输入列表的最大值。

<!--------------------------------------------------------------------------->
{{ ex4 | replace("%%NAME%%", "is_bst")}}

<!--
Write a function `is_bst : ('a*'b) tree -> bool` that returns `true` if and only
if the given tree satisfies the binary search tree invariant. An efficient
version of this function that visits each node at most once is somewhat tricky
to write. *Hint: write a recursive helper function that takes a tree and either
gives you (i) the minimum and maximum value in the tree, or (ii) tells you that
the tree is empty, or (iii) tells you that the tree does not satisfy the
invariant. Your `is_bst` function will not be recursive, but will call your
helper function and pattern match on the result. You will need to define a new
variant type for the return type of your helper function.*
-->

编写一个函数 `is_bst : ('a*'b) tree -> bool`，当且仅当给定的树满足二叉搜索树不变量时返回 `true`。
这个函数的高效版本（最多访问每个节点一次）编写起来有些棘手。
*提示：编写一个递归辅助函数，它接受一棵树并给你 (i) 树中的最小值和最大值，或 (ii) 告诉你树为空，或 (iii) 告诉你树不满足不变量。
你的 `is_bst` 函数将不是递归的，但会调用你的辅助函数并对结果进行模式匹配。
你需要为辅助函数的返回类型定义一个新的变体类型。*

<!--------------------------------------------------------------------------->
{{ ex2 | replace("%%NAME%%", "quadrant poly")}}

<!--
Modify your definition of quadrant to use polymorphic variants.  The
types of your functions should become these:
-->

修改你的 quadrant 定义以使用多态变体。你的函数的类型应该变成这些：

```ocaml
val sign : int -> [> `Neg | `Pos | `Zero ]
val quadrant : int * int -> [> `I | `II | `III | `IV ] option
```
