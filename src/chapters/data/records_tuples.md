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
# Records and Tuples
-->

# 记录与元组

{{ video_embed | replace("%%VID%%", "E3d1IFMU558") }}

<!--
Singly-linked lists are a great data structure, but what if you want a fixed
number of elements, instead of an unbounded number? Or what if you want the
elements to have distinct types? Or what if you want to access the elements by
name instead of by number? Lists don't make any of those possibilities easy.
Instead, OCaml programmers use records and tuples.
-->

单链表是一种很棒的【数据结构|Data Structure】，但如果你想要固定数量的元素而非无界数量呢？
或者如果你想要元素具有不同的类型呢？或者如果你想要按名称而非按编号访问元素呢？
列表不能轻松实现这些可能性。相反，OCaml 程序员使用【记录|Record】和【元组|Tuple】。

## 记录

<!--
A *record* is a composite of other types of data, each of which is named. OCaml
records are much like structs in C. Here's an example of a record type
definition `mon` for a Pok&eacute;<u>mon</u>, re-using the `ptype` definition
from the [variants](variants) section:
-->

*【记录|Record】*是其他类型数据的复合，每个数据都有名称。OCaml 记录类似于 C 语言中的结构体。
以下是一个记录类型定义 `mon` 的例子，用于宝可梦，复用了[变体](variants)部分的 `ptype` 定义：
```{code-cell} ocaml
type ptype = TNormal | TFire | TWater
type mon = {name : string; hp : int; ptype : ptype}
```
<!--
This type defines a record with three *fields* named `name`, `hp` (hit points),
and `ptype`. The type of each of those fields is also given. Note that `ptype`
can be used as both a type name and a field name; the *namespace* for those is
distinct in OCaml.
-->

该类型定义了一个具有三个*【字段|Field】*的记录，分别命名为 `name`、`hp`（生命值）和 `ptype`。
每个字段的类型也都给出了。注意 `ptype` 可以同时用作类型名和字段名；它们的*【命名空间|Namespace】*在 OCaml 中是不同的。

<!--
To build a value of a record type, we write a record expression, which looks
like this:
-->

要构建记录类型的值，我们编写一个记录表达式，它看起来像这样：
```{code-cell} ocaml
{name = "Charmander"; hp = 39; ptype = TFire}
```
<!--
So in a type definition we write a colon between the name and the type of a
field, but in an expression we write an equals sign.
-->

因此在类型定义中，我们在字段的名称和类型之间写冒号，但在表达式中我们写等号。

<!--
To access a record and get a field from it, we use the dot notation that you
would expect from many other languages. For example:
-->

要访问记录并从中获取字段，我们使用你在许多其他语言中会期望的点记法。例如：
```{code-cell} ocaml
let c = {name = "Charmander"; hp = 39; ptype = TFire};;
c.hp
```

<!--
It's also possible to use pattern matching to access record fields:
-->

也可以使用【模式匹配|Pattern Matching】来访问记录字段：
```{code-cell} ocaml
match c with {name = n; hp = h; ptype = t} -> h
```
<!--
The `n`, `h`, and `t` here are pattern variables. There is a syntactic sugar
provided if you want to use the same name for both the field and a pattern
variable:
-->

这里的 `n`、`h` 和 `t` 是【模式变量|Pattern Variable】。
如果你想对字段和模式变量使用相同的名称，有一种【语法糖|Syntactic Sugar】：
```{code-cell} ocaml
match c with {name; hp; ptype} -> hp
```
<!--
Here, the pattern `{name; hp; ptype}` is sugar for
`{name = name; hp = hp; ptype = ptype}`. In each of those subexpressions, the
identifier appearing on the left-hand side of the equals is a field name, and
the identifier appearing on the right-hand side is a pattern variable.
-->

这里，模式 `{name; hp; ptype}` 是 `{name = name; hp = hp; ptype = ptype}` 的语法糖。
在每个子表达式中，等号左侧出现的标识符是字段名，右侧出现的标识符是模式变量。

{{ video_embed | replace("%%VID%%", "gXlWHvEoIvg")}}

**语法**

<!--
A record expression is written:
-->

记录表达式写作：

```ocaml
{f1 = e1; ...; fn = en}
```

<!--
The order of the `fi=ei` inside a record expression is irrelevant.
For example, `{f = e1; g = e2}` is entirely equivalent to `{g = e2; f = e1}`.
-->

记录表达式内部 `fi=ei` 的顺序无关紧要。例如，`{f = e1; g = e2}` 与 `{g = e2; f = e1}` 完全等价。

<!--
A field access is written:
-->

字段访问写作：

```ocaml
e.f
```

<!--
where `f` must be an identifier of a field name, not an expression. That
restriction is the same as in any other language with similar
features---&mdash;for example, Java field names. If you really do want to
*compute* which identifier to access, then actually you want a different data
structure: a *map* (also known by many other names: a *dictionary* or
*association list* or *hash table* etc., though there are subtle differences
implied by each of those terms.)
-->

其中 `f` 必须是字段名的标识符，而非表达式。
这个限制与任何具有类似特性的语言相同&mdash;&mdash;例如 Java 字段名。
如果你真的想*计算*要访问哪个标识符，那么实际上你需要的是另一种数据结构：
*【映射|Map】*（也有许多其他名称：*字典*或*关联列表*或*哈希表*等，尽管每个术语都暗示着微妙的差异。）

**动态语义**

<!--
* If for all `i` in `1..n`, it holds that `ei ==> vi`, then
  `{f1 = e1; ...; fn = en} ==> {f1 = v1; ...; fn = vn}`.
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `ei ==> vi`，则 `{f1 = e1; ...; fn = en} ==> {f1 = v1; ...; fn = vn}`。

<!--
* If `e ==> {...; f = v; ...}` then `e.f ==> v`.
-->

* 如果 `e ==> {...; f = v; ...}`，则 `e.f ==> v`。

**静态语义**

<!--
A record type is written:
-->

记录类型写作：

```ocaml
{f1 : t1; ...; fn : tn}
```

<!--
The order of the `fi:ti` inside a record type is irrelevant. For example,
`{f : t1; g : t2}` is entirely equivalent to `{g:t2;f:t1}`.
-->

记录类型内部 `fi:ti` 的顺序无关紧要。例如，`{f : t1; g : t2}` 与 `{g:t2;f:t1}` 完全等价。

<!--
Note that record types must be defined before they can be used.  This
enables OCaml to do better type inference than would be possible if
record types could be used without definition.
-->

注意，记录类型必须在使用之前定义。这使得 OCaml 能够进行比记录类型无需定义即可使用时更好的类型推断。

<!--
The type checking rules are:
-->

类型检查规则是：

<!--
* If for all `i` in `1..n`, it holds that `ei : ti`, and if `t` is defined to be
  `{f1 : t1; ...; fn : tn}`, then `{f1 = e1; ...; fn = en} : t`. Note that the
  set of fields provided in a record expression must be the full set of fields
  defined as part of the record's type (but see below regarding *record copy*).
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `ei : ti`，且如果 `t` 被定义为 `{f1 : t1; ...; fn : tn}`，则 `{f1 = e1; ...; fn = en} : t`。
  注意，记录表达式中提供的字段集必须是记录类型定义中的完整字段集（但请参阅下面关于*记录复制*的内容）。

<!--
* If `e : t1` and if `t1` is defined to be `{...; f : t2; ...}`, then
  `e.f : t2`.
-->

* 如果 `e : t1` 且 `t1` 被定义为 `{...; f : t2; ...}`，则 `e.f : t2`。

**记录复制**

<!--
Another syntax is also provided to construct a new record out of an old record:
-->

还提供了另一种语法来从旧记录构造新记录：

```ocaml
{e with f1 = e1; ...; fn = en}
```

<!--
This doesn't mutate the old record. Rather, it constructs a new record with new
values. The set of fields provided after the `with` does not have to be the full
set of fields defined as part of the record's type. In the newly-copied record,
any field not provided as part of the `with` is copied from the old record.
-->

这不会修改旧记录。相反，它构造一个具有新值的新记录。
`with` 之后提供的字段集不必是记录类型定义中的完整字段集。
在新复制的记录中，任何未作为 `with` 一部分提供的字段都从旧记录中复制。

<!--
Record copy is syntactic sugar. It's equivalent to writing
-->

记录复制是【语法糖|Syntactic Sugar】。它等价于编写

```ocaml
{ f1 = e1;   ...; fn = en;
  g1 = e.g1; ...; gn = e.gn }
```

<!--
where the set of `gi` is the set of all fields of the record's type minus the
set of `fi`.
-->

其中 `gi` 的集合是记录类型的所有字段集减去 `fi` 的集合。

**模式匹配**

<!--
We add the following new pattern form to the list of legal patterns:
-->

我们将以下新模式形式添加到合法模式列表中：

<!--
* `{f1 = p1; ...; fn = pn}`
-->

* `{f1 = p1; ...; fn = pn}`

<!--
And we extend the definition of when a pattern matches a value and produces a
binding as follows:
-->

并且我们扩展模式何时匹配值并产生【绑定|Binding】的定义如下：

<!--
* If for all `i` in `1..n`, it holds that `pi` matches `vi` and produces
  bindings $b_i$, then the record pattern `{f1 = p1; ...; fn = pn}` matches the
  record value `{f1 = v1; ...; fn = vn; ...}` and produces the set $\bigcup_i
  b_i$ of bindings. Note that the record value may have more fields than the
  record pattern does.
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `pi` 匹配 `vi` 并产生绑定 $b_i$，则记录模式 `{f1 = p1; ...; fn = pn}` 匹配记录值 `{f1 = v1; ...; fn = vn; ...}` 并产生绑定集合 $\bigcup_i b_i$。注意，记录值可能比记录模式具有更多字段。

<!--
As a syntactic sugar, another form of record pattern is provided:
`{f1; ...; fn}`. It is desugared to `{f1 = f1; ...; fn = fn}`.
-->

作为语法糖，提供了另一种形式的记录模式：`{f1; ...; fn}`。它被脱糖为 `{f1 = f1; ...; fn = fn}`。

## 元组

<!--
Like records, *tuples* are a composite of other types of data. But instead of
naming the *components*, they are identified by position. Here are some examples
of tuples:
-->

与记录一样，*【元组|Tuple】*也是其他类型数据的复合。但与命名*分量*不同，它们通过位置来标识。以下是一些元组的例子：

```ocaml
(1, 2, 10)
(true, "Hello")
([1; 2; 3], (0.5, 'X'))
```

<!--
A tuple with two components is called a *pair*. A tuple with three components is
called a *triple*. Beyond that, we usually just use the word *tuple* instead of
continuing a naming scheme based on numbers.
-->

具有两个分量的元组称为*元组*。具有三个分量的元组称为*三元组*。除此之外，我们通常只使用*元组*这个词，而非继续基于数字的命名方案。

```{tip}
<!--
Beyond about three components, it's arguably better to use records instead of
tuples, because it becomes hard for a programmer to remember which component was
supposed to represent what information.
-->
超过大约三个分量后，使用记录而非元组可能更好，因为程序员很难记住哪个分量应该代表什么信息。
```

<!--
Building of tuples is easy: just write the tuple, as above. Accessing again
involves pattern matching, for example:
-->

构建元组很容易：只需编写元组，如上所述。访问同样涉及模式匹配，例如：
```{code-cell} ocaml
match (1, 2, 3) with (x, y, z) -> x + y + z
```

{{ video_embed | replace("%%VID%%", "4QNzC2KZ5I4")}}

**语法**

<!--
A tuple is written
-->

元组写作

```ocaml
(e1, e2, ..., en)
```

<!--
The parentheses are not entirely mandatory &mdash;often your code can
successfully parse without them&mdash; but they are usually considered to be
good style to include.
-->

括号并非完全强制&mdash;&mdash;通常你的代码可以在没有它们的情况下成功解析&mdash;&mdash;但通常认为包含它们是好的风格。

**动态语义**

<!--
* If for all `i` in `1..n` it holds that `ei ==> vi`, then
  `(e1, ..., en) ==> (v1, ..., vn)`.
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `ei ==> vi`，则 `(e1, ..., en) ==> (v1, ..., vn)`。

**静态语义**

<!--
Tuple types are written using a new type constructor `*`, which is different
than the multiplication operator. The type `t1 * ... * tn` is the type of tuples
whose first component has type `t1`, ..., and nth component has type `tn`.
-->

元组类型使用新的类型构造子 `*` 编写，它与乘法运算符不同。类型 `t1 * ... * tn` 是第一个分量类型为 `t1`、……、第 n 个分量类型为 `tn` 的元组类型。

<!--
* If for all `i` in `1..n` it holds that `ei : ti`, then
  `(e1, ..., en) : t1 * ... * tn`.
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `ei : ti`，则 `(e1, ..., en) : t1 * ... * tn`。

**模式匹配**

<!--
We add the following new pattern form to the list of legal patterns:
-->

我们将以下新模式形式添加到合法模式列表中：

<!--
* `(p1, ..., pn)`
-->

* `(p1, ..., pn)`

<!--
The parentheses are again not entirely mandatory but usually are idiomatic to
include.
-->

括号同样并非完全强制，但通常包含它们是惯用的。

<!--
And we extend the definition of when a pattern matches a value and produces a
binding as follows:
-->

并且我们扩展模式何时匹配值并产生绑定的定义如下：

<!--
* If for all `i` in `1..n`, it holds that `pi` matches `vi` and produces
  bindings $b_i$, then the tuple pattern `(p1, ..., pn)` matches the tuple value
  `(v1, ..., vn)` and produces the set $\bigcup_i b_i$ of bindings. Note that
  the tuple value must have exactly the same number of components as the tuple
  pattern does.
-->

* 如果对于所有 `i` 在 `1..n` 中，都有 `pi` 匹配 `vi` 并产生绑定 $b_i$，则元组模式 `(p1, ..., pn)` 匹配元组值 `(v1, ..., vn)` 并产生绑定集合 $\bigcup_i b_i$。注意，元组值必须与元组模式具有完全相同数量的分量。

## 变体 vs. 元组和记录

{{ video_embed | replace("%%VID%%", "9kyOH1kpmjk") }}

{{ video_embed | replace("%%VID%%", "oMOO-cWrHuw") }}

```{note}
<!--
The second video above uses more advanced examples of variants that will be
studied in a [later section](algebraic_data_types).
-->
上面第二个视频使用了更高级的变体示例，将在[后面的章节](algebraic_data_types)中学习。
```

<!--
The big difference between variants and the types we just learned (records and
tuples) is that a value of a variant type is *one of* a set of possibilities,
whereas a value of a tuple or record type provides *each of* a set of
possibilities. Going back to our examples, a value of type `day` is **one of**
`Sun` or `Mon` or etc. But a value of type `mon` provides **each of** a `string`
and an `int` and `ptype`. Note how, in those previous two sentences, the word
"or" is associated with variant types, and the word "and" is associated with
tuple and record types. That's a good clue if you're ever trying to decide
whether you want to use a variant, or a tuple or record: if you need one piece
of data *or* another, you want a variant; if you need one piece of data *and*
another, you want a tuple or record.
-->

【变体|Variant】与我们刚刚学到的类型（记录和元组）之间的最大区别是，变体类型的值是*一组*可能性中的*一个*，而元组或记录类型的值提供*一组*可能性中的*每一个*。
回到我们的例子，类型为 `day` 的值是 `Sun` 或 `Mon` 等中的**一个**。但类型为 `mon` 的值提供 `string`、`int` 和 `ptype` 的**每一个**。
注意在前面两句话中，「或」与变体类型相关联，「和」与元组和记录类型相关联。
如果你曾经试图决定是使用变体还是元组或记录，这是一个很好的线索：如果你需要一个数据*或*另一个，你需要变体；如果你需要一个数据*和*另一个，你需要元组或记录。

<!--
One-of types are more commonly known as *sum types*, and each-of types as
*product types*. Those names come from set theory. Variants are like
[disjoint union][disjun], because each value of a variant comes from one of many
underlying sets (and thus far each of those sets is just a single constructor
hence has cardinality one). Disjoint union is indeed sometimes written with a
summation operator $\Sigma$. Tuples/records are like
[Cartesian product][cartprod], because each value of a tuple or record contains
a value from each of many underlying sets. Cartesian product is usually written
with a product operator, $\times$ or $\Pi$.
-->

择一类型更常被称为*【和类型|Sum Type】*，兼具类型被称为*【积类型|Product Type】*。这些名称来自集合论。
变体类似于[不相交并集][disjun]，因为变体的每个值来自多个底层集合之一（到目前为止每个集合只是一个构造子，因此基数为一）。不相交并集确实有时用求和算子 $\Sigma$ 表示。
元组/记录类似于[笛卡尔积][cartprod]，因为元组或记录的每个值包含来自多个底层集合中的每一个的值。笛卡尔积通常用乘积算子 $\times$ 或 $\Pi$ 表示。

[disjun]: https://en.wikipedia.org/wiki/Disjoint_union
[cartprod]: https://en.wikipedia.org/wiki/Cartesian_product
