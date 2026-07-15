<!--
# Data and Types
-->

# 数据与类型

<!--
In this chapter, we'll examine some of OCaml's built-in data types, including
lists, variants, records, tuples, and options. Many of those are likely to feel
familiar from other programming languages. In particular,
-->

在本章中，我们将研究 OCaml 的一些内置【数据类型|Data Type】，
包括【列表|List】、【变体|Variant】、【记录|Record】、【元组|Tuple】和【选项|Option】。
其中许多类型可能会让你感到似曾相识，尤其是：

<!--
- **lists** and **tuples**, might feel similar to Python; and
-->

- 【列表|LIst】和【元组|Tuple】，可能与 Python 中的类似；

<!--
- **records** and **variants**, might feel similar to `struct` and `enum` types
  from C or Java.
-->

- 【记录|Record】和【变体|Variant】，可能感觉与 C 或 Java 中的 `struct` 和 `enum` 类型类似。

<!--
Because of that familiarity, we call these *standard* data types. We'll learn
about *pattern matching*, which is a feature that's less likely to be familiar.
-->

由于这种熟悉感，我们称这些为【标准|Standard】数据类型。
我们将学习【模式匹配|Pattern Matching】，这是一个可能不太熟悉的功能。

<!--
Almost immediately after we learn about lists, we'll pause our study of standard
data types to learn about unit testing in OCaml with OUnit, a unit testing
framework similar to those you might have used in other languages. OUnit relies
on lists, which is why we couldn't cover it before now.
-->

在学习列表之后，我们将暂停对标准数据类型的学习，
转而学习使用 OUnit 进行 OCaml【单元测试|Unit Testing】。
OUnit 是一个类似于你在其他语言中可能使用过的单元测试框架。
OUnit 依赖于列表，这就是为什么我们之前无法涵盖它的原因。

<!--
Later in the chapter, we study some OCaml data types that are unlikely to be as
familiar from other languages. They include:
-->

在本章后面，我们将研究一些在其他语言中可能不太常见的 OCaml 数据类型。它们包括：

<!--
- **options**, which are loosely related to `null` in Java;
-->

- 【选项|Option】，与 Java 中的 `null` 有松散的关联；

<!--
- **association lists**, which are an amazingly simple implementation
  of maps (aka dictionaries) based on lists and tuples;
-->

- 【关联列表|Association list】，这是一种基于列表和元组的、极其简单的【映射|Map】（又称字典）实现；

<!--
- **algebraic data types**, which are arguably the most important
  kind of type in OCaml, and indeed are the power behind many
  of the other built-in types; and
-->

- 【代数数据类型|Algebraic Data Type】，可以说这是 OCaml 中最重要的类型，
  它确实是许多其他内置类型背后的力量；

<!--
- **exceptions**, which are a special kind of algebraic data type.
-->

- 【异常|Exception】，这是一种特殊的代数数据类型。
