<!--
# Summary
-->

# 总结

<!--
This chapter is one of the most important in the book. It didn't cover any new
language features. Instead, we learned how to use some of the existing features
in ways that might be new, surprising, or challenging. Higher-order programming
and the Abstraction Principle are two ideas that will help make you a better
programmer in any language, not just OCaml. Of course, languages do vary in the
extent to which they support these ideas, with some providing significantly less
assistance in writing higher-order code&mdash;which is one reason we use OCaml
in this course.
-->

本章是本书最重要的章节之一。它没有涵盖任何新的语言特性。
相反，我们学习了如何以可能新颖、令人惊讶或富有挑战性的方式
使用一些现有特性。
【高阶编程|Higher-Order Programming】和
【抽象原则|Abstraction Principle】是两个将帮助你成为
更好的程序员的理念，不仅限于 OCaml，而是适用于任何语言。
当然，不同语言对这些理念的支持程度各不相同，
有些语言在编写高阶代码时提供的帮助明显更少——
这也是我们在本课程中使用 OCaml 的原因之一。

<!--
Map, filter, fold and other functionals are becoming widely recognized as
excellent ways to structure computation. Part of the reason for that is they
factor out the *iteration* over a data structure from the *computation* done at
each element. Languages such as Python, Ruby, and Java 8 now have support for
this kind of iteration.
-->

【映射|Map】、【过滤|Filter】、【折叠|Fold】和其他函数式操作
正被广泛认可为构建计算的优秀方式。
部分原因在于它们将对【数据结构|Data Structure】的*迭代*
与在每个【元素|Element】上进行的*计算*【提取|Factor】开来。
Python、Ruby 和 Java 8 等语言现在都支持这种迭代方式。

<!--
## Terms and Concepts
-->

## 术语与概念

| 中文         | 英语                       |
| ------------ | -------------------------- |
| 抽象原则     | Abstraction Principle      |
| 累加器       | Accumulator                |
| 应用         | Apply                      |
| 结合律       | Associative                |
| 组合         | Compose                    |
| 提取         | Factor                     |
| 过滤         | Filter                     |
| 一阶函数     | First-Order Function       |
| 折叠         | Fold                       |
| 函数式       | Functional                 |
| 广义折叠操作 | Generalized Fold Operation |
| 高阶函数     | Higher-Order Function      |
| 映射         | Map                        |
| 管道         | Pipeline                   |
| 管道化       | Pipelining                 |

<!--
## Further Reading
-->

## 扩展阅读

* *Introduction to Objective Caml*，第 3.1.3、5.3 章
* *OCaml from the Very Beginning*，第 6 章
* *More OCaml: Algorithms, Methods, and Diversions*，第 1 章，
  John Whitington 著。
  本书是 *OCaml from the Very Beginning* 的续作。
* *Real World OCaml*，第 3 章（请注意，本书的 `Core` 库
  与标准库的 `List` 模块不同，
  `map` 和 `fold` 的类型也与我们在这里看到的不同）
* 「Higher Order Functions」，*Functional Programming: Practice and Theory*
  第 6 章。Bruce J. MacLennan，Addison-Wesley，1990。
  我们关于高阶函数和抽象原则的讨论得益于这一章。
* 「Can Programming be Liberated from the von Neumann Style?
  A Functional Style and Its Algebra of Programs.」
  John Backus 1977 年图灵奖演讲的详细版本，
  以[发表文章][backus-turing]的形式呈现。
* 「[Second-order and Higher-order Logic][solhol]」，
  载于 *The Stanford Encyclopedia of Philosophy*。

[solhol]:  http://plato.stanford.edu/entries/logic-higher-order/
[backus-turing]: https://dl.acm.org/doi/pdf/10.1145/359576.359579
