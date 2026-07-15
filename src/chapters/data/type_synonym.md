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
# Type Synonyms
-->

# 类型同义词

<!--
A *type synonym* is a new name for an already existing type. For example, here
are some type synonyms that might be useful in representing some types from
linear algebra:
-->

【类型同义词|Type Synonym】是已有类型的新名称。例如，以下是一些类型同义词，
它们在线性代数的某些类型表示中可能会很有用：

```{code-cell} ocaml
type point = float * float
type vector = float list
type matrix = float list list
```

<!--
Anywhere that a `float * float` is expected, you could use `point`, and
vice-versa. The two are completely exchangeable for one another. In the
following code, `get_x` doesn't care whether you pass it a value that is
annotated as one vs. the other:
-->

任何需要 `float * float` 的地方，你都可以使用 `point`，反之亦然。
两者完全可以互换。在下面的代码中，`get_x` 不关心你传递给它的值是用哪种形式注解的：

```{code-cell} ocaml
let get_x = fun (x, _) -> x

let p1 : point = (1., 2.)
let p2 : float * float = (1., 3.)

let a = get_x p1
let b = get_x p2
```

<!--
Type synonyms are useful because they let us give descriptive names to complex
types. They are a way of making code more self-documenting.
-->

类型同义词很有用，因为它们允许我们为复杂类型提供描述性的名称。
这是一种使代码更具自文档化特性的方式。
