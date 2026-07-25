<!--
# Summary
-->

# 总结

<!--
Lists are a highly useful built-in data structure in OCaml. The language
provides a lightweight syntax for building them, rather than requiring you to
use a library. Accessing parts of a list makes use of pattern matching, a very
powerful feature (as you might expect from its rather lengthy semantics). We'll
see more uses for pattern matching as the course proceeds.
-->

列表是 OCaml 中非常有用的内置【数据结构|Data Structure】。
该语言提供了轻量级的语法来构建它们，而非要求你使用库。
访问列表的部分内容使用了【模式匹配|Pattern Matching】，
这是一个非常强大的功能（正如你从其相当冗长的语义中可能预期的那样）。
随着课程的进行，我们将看到模式匹配的更多用途。

<!--
These built-in lists are implemented as singly-linked lists. That's important to
keep in mind when your needs go beyond small- to medium-sized lists. Recursive
functions on long lists will take up a lot of stack space, so tail recursion
becomes important. And if you're attempting to process really huge lists, you
probably don't want linked lists at all, but instead a data structure that will
do a better job of exploiting memory locality.
-->

这些内置列表被实现为单链表。当你的需求超出中小型列表时，记住这一点很重要。
对长列表的【递归|Recursive】函数会占用大量栈空间，因此【尾递归|Tail Recursion】变得重要。
如果你试图处理非常大的列表，你可能根本不想要链表，
而是一个能更好地利用内存局部性的数据结构。

<!--
OCaml provides data types for variants (one-of types), tuples and products
(each-of types), and options (maybe types). Pattern matching can be used to
access values of each of those data types. And pattern matching can be used in
let expressions and functions.
-->

OCaml 为【变体|Variant】（【择一类型|One-of Type】）、
【元组|Tuple】和【积类型|Product Type】（【兼具类型|Each-of Type】）
以及【选项|Option】（【也许类型|Maybe Type】）提供了数据类型。
【模式匹配|Pattern Matching】可用于访问这些数据类型的值。
模式匹配也可用于 let 表达式和函数。

<!--
Association lists combine lists and tuples to create a lightweight
implementation of dictionaries.
-->

【关联列表|Association List】结合了列表和元组，创建了字典的轻量级实现。

<!--
Variants are a powerful language feature. They are the workhorse of representing
data in a functional language. OCaml variants actually combine several
theoretically independent language features into one: sum types, product types,
recursive types, and parameterized (polymorphic) types. The result is an ability
to express many kinds of data, including lists, options, trees, and even
exceptions.
-->

变体是一种强大的语言特性。它们是函数式语言中表示数据的主力。
OCaml 变体实际上将几个理论上独立的语言特性结合为一个：
【和类型|Sum Type】、【积类型|Product Type】、递归类型和参数化（多态）类型。
其结果是能够表达多种数据，包括列表、选项、树，甚至【异常|Exception】。

## 术语与概念

| 中文             | 英语                           |
| ---------------- | ------------------------------ |
| 代数数据类型     | Algebraic Data Type            |
| 追加             | Append                         |
| 关联列表         | Association List               |
| 作为变体的二叉树 | Bianry Tree as Variants        |
| 绑定             | Binding                        |
| 分支             | Branch                         |
| 携带数据         | Carried Data                   |
| 兜底情况         | Catch-All Cases                |
| cons             | cons                           |
| 常量构造子       | Constant Constructor           |
| 构造子           | Constructor                    |
| 复制             | Copying                        |
| 脱糖             | Desugaring                     |
| 兼具类型         | Each-of Type                   |
| 异常             | Exception                      |
| 作为变体的异常   | Exception As Variants          |
| 异常包           | Exception Packet               |
| 异常模式         | Exception Pattern              |
| 异常值           | Exception Value                |
| 穷尽性           | Exhaustiveness                 |
| 字段             | Field                          |
| 头部             | Head                           |
| 归纳             | Induction                      |
| 叶子             | Leaf                           |
| 列表             | List                           |
| 作为变体的列表   | Lists as Variants              |
| 也许类型         | Maybe Type                     |
| 互递归函数       | Mutually Recursive Functions   |
| 作为变体的自然数 | Natural Numbers as Variants    |
| nil              | nil                            |
| 节点             | Node                           |
| 非常量构造子     | Non-Constant Constructor       |
| 择一类型         | One-of Type                    |
| 选项             | Option                         |
| 作为变体的选项   | Options as Variants            |
| 求值顺序         | Order of Evaluation            |
| 偶对             | Pair                           |
| 参数化变体       | Parameterized Variant          |
| 参数多态         | Parametric Polymorphism        |
| 模式匹配         | Pattern Matching               |
| 前置             | Prepend                        |
| 积类型           | Product Type                   |
| 记录体           | Record                         |
| 递归             | Recursion                      |
| 递归变体         | Recursive Variant              |
| 共享             | Share                          |
| 栈帧             | Stack Frame                    |
| 和类型           | Sum Type                       |
| 语法糖           | Syntactic Sugar                |
| 标签             | Tag                            |
| 尾部             | Tail                           |
| 尾调用           | Tail Call                      |
| 尾递归           | Tail Recursion                 |
| 测试驱动开发     | Test-Driven Development（TDD） |
| 三元组           | Triple                         |
| 元组             | Tuple                          |
| 类型构造子       | Type Constructor               |
| 类型同义词       | Type Synonym                   |
| 变体             | Variant                        |
| 通配符           | Wildcard                       |

## 延伸阅读

<!--
* *Introduction to Objective Caml*, chapters 4, 5.2, 5.3, 5.4, 6, 7, 8.1
* *OCaml from the Very Beginning*, chapters 3, 4, 5, 7, 8, 10, 11
* *Real World OCaml*, chapter 3, 5, 6, 7
-->

* 《Introduction to Objective Caml》，第 4、5.2、5.3、5.4、6、7、8.1 章
* 《OCaml from the Very Beginning》，第 3、4、5、7、8、10、11 章
* 《Real World OCaml》，第 3、5、6、7 章
