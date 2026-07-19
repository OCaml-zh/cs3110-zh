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
# Association Lists
-->

# 关联列表

<!--
A *map* is a data structure that maps *keys* to *values*. Maps are also known as
*dictionaries*. One easy implementation of a map is an *association list*, which
is a list of pairs. Here, for example, is an association list that maps some
shape names to the number of sides they have:
-->

【映射|Map】是一种将【键|Key】映射到【值|Value】的【数据结构|Data Structure】。
映射也被称为【字典|Dictionariy】。映射的一种简单实现是【关联列表|Association List】，
它是一个由偶对组成的列表。例如，以下是一个将一些形状名称映射到其边数的关联列表：

```{code-cell} ocaml
let d = [("rectangle", 4); ("nonagon", 9); ("icosagon", 20)]
```

<!--
Note that an association list isn't so much a built-in data type in OCaml as a
combination of two other types: lists and pairs.
-->

注意，关联列表与其说是 OCaml 中的内置数据类型，
不如说是两种其他类型的组合：列表和偶对。

<!--
Here are two functions that implement insertion and lookup in an association
list:
-->

以下是在关联列表中实现插入和查找的两个函数：

```{code-cell} ocaml
(** [insert k v lst] is an association list that binds key [k] to value [v]
    and otherwise is the same as [lst] *)
let insert k v lst = (k, v) :: lst

(** [lookup k lst] is [Some v] if association list [lst] binds key [k] to
    value [v]; and is [None] if [lst] does not bind [k]. *)
let rec lookup k = function
| [] -> None
| (k', v) :: t -> if k = k' then Some v else lookup k t
```

<!--
The `insert` function simply adds a new map from a key to a value at the front
of the list. It doesn't bother to check whether the key is already in the list.
The `lookup` function looks through the list from left to right. So if there did
happen to be multiple maps for a given key in the list, only the most recently
inserted one would be returned.
-->

`insert` 函数只是在列表前面添加一个新的键到值的映射。它不检查键是否已经在列表中。
`lookup` 函数从左到右遍历列表。因此，如果列表中恰好有多个给定键的映射，
只会返回最近插入的那个。

<!--
Insertion in an association list is therefore constant time, and lookup is
linear time. Although there are certainly more efficient implementations of
dictionaries&mdash;and we'll study some later in this course&mdash;association
lists are a very easy and useful implementation for small dictionaries that
aren't performance critical. The OCaml standard library has functions for
association lists in the [`List` module][list]; look for `List.assoc` and the
functions below it in the documentation. What we just wrote as `lookup` is
actually already defined as `List.assoc_opt`. There is no pre-defined `insert`
function in the library because it's so trivial just to cons a pair on.
-->

因此，关联列表的插入操作是常数时间，查找是线性时间。
尽管字典肯定有更高效的实现&mdash;&mdash;我们将在本课程后面学习一些&mdash;&mdash;
但对于性能要求不高的小型字典来说，关联列表是一种非常简单且有用的实现。
OCaml 标准库在 [`List` 模块][list]中有关联列表的函数；
请在文档中查找 `List.assoc` 及其下方的函数。
我们刚刚编写的 `lookup` 实际上已经定义为 `List.assoc_opt`。
库中没有预定义的 `insert` 函数，因为 cons 一个偶对是如此简单。

[list]: https://ocaml.org/api/List.html
