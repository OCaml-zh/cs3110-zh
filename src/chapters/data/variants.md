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
# Variants
-->

# 变体

<!--
A *variant* is a data type representing a value that is one of several
possibilities. At their simplest, variants are like enums from C or Java:
-->

【变体|Variant】是一种【数据类型|Data Type】，表示一个值是多种可能性中的一种。
最简单的变体类似于 C 或 Java 中的枚举：

```{code-cell} ocaml
type day = Sun | Mon | Tue | Wed | Thu | Fri | Sat
let d = Tue
```

<!--
The individual names of the values of a variant are called *constructors* in
OCaml. In the example above, the constructors are `Sun`, `Mon`, etc. This is a
somewhat different use of the word constructor than in C++ or Java.
-->

变体各个值的名称在 OCaml 中称为【构造子|Constructor】。
在上面的例子中，构造子是 `Sun`、`Mon` 等。
这里的「构造子」一词的用法与 C++ 或 Java 中的有所不同。

<!--
For each kind of data type in OCaml, we've been discussing how to build and
access it. For variants, building is easy: just write the name of the
constructor. For accessing, we use pattern matching. For example:
-->

对于 OCaml 中的每种数据类型，我们一直在讨论如何构建和访问它。
对于变体，构建很简单：只需写出构造子的名称。
对于访问，我们使用【模式匹配|Pattern Matching】。例如：

```{code-cell} ocaml
let int_of_day d =
  match d with
  | Sun -> 1
  | Mon -> 2
  | Tue -> 3
  | Wed -> 4
  | Thu -> 5
  | Fri -> 6
  | Sat -> 7
```

<!--
There isn't any kind of automatic way of mapping a constructor name to an `int`,
like you might expect from languages with enums.
-->

不同于你在支持枚举的语言中期望的那样，OCaml
中没有任何自动的方式能够将构造子名称映射到 `int`，

<!--
**Syntax.**
-->

**语法**

<!--
Defining a variant type:
-->

定义变体类型：

```ocaml
type t = C1 | ... | Cn
```

<!--
The constructor names must begin with an uppercase letter.  OCaml
uses that to distinguish constructors from variable identifiers.
-->

构造子名称必须以大写字母开头。OCaml 以此来区分构造子和变量标识符。

<!--
The syntax for writing a constructor value is simply its name, e.g., `C`.
-->

写出构造子值的语法就是其名称本身，例如 `C`。

<!--
**Dynamic semantics.**
-->

**动态语义**

<!--
* A constructor is already a value.  There is no computation to perform.
-->

* 构造子本身已经是值。无需执行任何计算。

<!--
**Static semantics.**
-->

**静态语义**

<!--
* If `t` is a type defined as `type t = ... | C | ...`, then `C : t`.
-->

* 如果 `t` 是定义为 `type t = ... | C | ...` 的类型，则 `C : t`。

## 作用域

<!--
Suppose there are two types defined with overlapping constructor names, for
example,
-->

假设有两个类型定义了重叠的构造子名称，例如

```{code-cell} ocaml
type t1 = C | D
type t2 = D | E
let x = D
```

<!--
When `D` appears after these definitions, to which type does it refer? That is,
what is the type of `x` above? The answer is that the type defined later wins.
So `x : t2`. That is potentially surprising to programmers, so within any given
scope (e.g., a file or a module, though we haven't covered modules yet) it's
idiomatic whenever overlapping constructor names might occur to prefix them with
some distinguishing character. For example, suppose we're defining types to
represent Pok&eacute;mon:
-->

当 `D` 出现在这些定义之后时，它指的是哪个类型？
也就是说，上面 `x` 的类型是什么？答案是后定义的类型获胜，
因此这里是 `x : t2`。这对程序员来说可能出乎意料，
因此在任何给定的【作用域|Scope】（例如文件或模块，虽然我们还未涉及模块）中，
惯用做法是在可能出现重叠构造子名称时，为它们添加一些区分字符作为前缀。
例如，假设我们正在定义表示宝可梦的类型：

```{code-cell} ocaml
type ptype =
  TNormal | TFire | TWater

type peff =
  ENormal | ENotVery | ESuper
```

<!--
Because "Normal" would naturally be a constructor name for both the type of a
Pok&eacute;mon and the effectiveness of a Pok&eacute;mon attack, we add an extra
character in front of each constructor name to indicate whether it's a type or
an effectiveness.
-->

因为「Normal」很自然地会成为宝可梦类型和宝可梦攻击效果的构造子名称，
所以我们在每个构造子名称前添加一个额外字符，以表示它是类型还是效果。

<!--
## Pattern Matching
-->

## 模式匹配

<!--
Each time we introduced a new kind of data type, we need to introduce the new
patterns associated with it. For variants, this is easy. We add the following
new pattern form to the list of legal patterns:
-->

每次引入一种新的数据类型时，我们都需要引入与之关联的新模式。
对于变体，这很简单。我们将以下新模式形式添加到合法模式列表中：

<!--
* a constructor name `C`
-->

* 构造子名称 `C`

<!--
And we extend the definition of when a pattern matches a value and produces a
binding as follows:
-->

然后我们将模式何时匹配值并产生【绑定|Binding】的定义扩展如下：

<!--
* The pattern `C` matches the value `C` and produces no bindings.
-->

* 模式 `C` 匹配值 `C`，不产生任何绑定。

```{note}
<!--
Variants are considerably more powerful than what we have seen here. We'll
return to them again soon.
-->

变体比我们在这里看到的要强大得多。我们很快会再次讨论它们。
```
