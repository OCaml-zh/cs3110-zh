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
# Advanced Pattern Matching
-->

# 高级模式匹配

<!--
Here are some additional pattern forms that are useful:
-->

以下是一些有用的额外【模式|Pattern】形式：

<!--
* `p1 | ... | pn`: an "or" pattern; matching against it succeeds if a match
  succeeds against any of the individual patterns `pi`, which are tried in order
  from left to right. All the patterns must bind the same variables.
-->

* `p1 | ... | pn`：「或」模式；如果对任何单个模式 `pi` 的匹配成功，则匹配成功，
  这些模式按从左到右的顺序尝试。所有模式必须【绑定|Bind】相同的变量。

<!--
* `(p : t)`: a pattern with an explicit type annotation.
-->

* `(p : t)`：带有显式【类型|Type】注解的模式。

<!--
* `c`: here, `c` means any constant, such as integer literals, string literals,
  and booleans.
-->

* `c`：这里 `c` 表示任何常量，例如整数字面量、字符串字面量和布尔值。

<!--
* `'ch1'..'ch2'`: here, `ch` means a character literal. For example, `'A'..'Z'`
  matches any uppercase letter.
-->

* `'ch1'..'ch2'`：这里 `ch` 表示字符字面量。例如，`'A'..'Z'` 匹配任何大写字母。

<!--
* `p when e`: matches `p` but only if `e` evaluates to `true`.
-->

* `p when e`：匹配 `p`，但仅当 `e` 求值为 `true` 时。

<!--
You can read about [all the pattern forms][patterns] in the manual.
-->

你可以在手册中阅读[所有模式形式][patterns]。

[patterns]: https://ocaml.org/manual/patterns.html

<!--
## Pattern Matching with Let
-->

## 使用 Let 进行模式匹配

<!--
The syntax we've been using so far for let expressions is, in fact, a special
case of the full syntax that OCaml permits. That syntax is:
-->

我们到目前为止使用的 let 表达式语法，实际上是 OCaml 允许的完整语法的一个特例。该语法是：

```ocaml
let p = e1 in e2
```

<!--
That is, the left-hand side of the binding may in fact be a pattern, not just an
identifier. Of course, variable identifiers are on our list of valid patterns,
so that's why the syntax we've studied so far is just a special case.
-->

也就是说，绑定的左侧实际上可以是一个【模式|Pattern】，而不仅仅是一个标识符。
当然，变量标识符在我们的有效模式列表中，这就是为什么我们到目前为止研究的语法只是一个特例。

<!--
Given this syntax, we revisit the semantics of let expressions.
-->

鉴于此语法，我们重新审视 let 表达式的语义。

<!--
**Dynamic semantics.**
-->

动态语义

<!--
To evaluate `let p = e1 in e2`:
-->

求值 `let p = e1 in e2`：

<!--
1. Evaluate `e1` to a value `v1`.
-->

1. 将 `e1` 求值为值 `v1`。

<!--
2. Match `v1` against pattern `p`. If it doesn't match, raise the exception
   `Match_failure`. Otherwise, if it does match, it produces a set $b$ of
   bindings.
-->

2. 将 `v1` 与模式 `p` 进行匹配。如果不匹配，引发异常 `Match_failure`。
   否则，如果匹配成功，它会产生一组绑定 $b$。

<!--
3. Substitute those bindings $b$ in `e2`, yielding a new expression `e2'`.
-->

3. 将这些绑定 $b$ 代入 `e2`，产生一个新表达式 `e2'`。

<!--
4. Evaluate `e2'` to a value `v2`.
-->

4. 将 `e2'` 求值为值 `v2`。

<!--
5. The result of evaluating the let expression is `v2`.
-->

5. let 表达式的求值结果是 `v2`。

<!--
**Static semantics.**
-->

**静态语义**

<!--
* If all the following hold then `(let p = e1 in e2) : t2`:
-->

* 如果以下条件全部成立，则 `(let p = e1 in e2) : t2`：

<!--
  - `e1 : t1`
-->

  - `e1 : t1`

<!--
  - the pattern variables in `p` are `x1..xn`
-->

  - `p` 中的【模式变量|Pattern Variable】是 `x1..xn`

<!--
  - `e2 : t2` under the assumption that for all `i` in `1..n` it holds that
    `xi : ti`,
-->

  - 在假设对所有 `i` 在 `1..n` 中都有 `xi : ti` 的前提下，`e2 : t2`

<!--
**Let definitions.**
-->

**Let 定义**

<!--
As before, a let definition can be understood as a let expression whose body has
not yet been given. So their syntax can be generalized to
-->

和之前一样，let 定义可以理解为一个尚未给出主体的 let 表达式。因此它们的语法可以推广为

```ocaml
let p = e
```

<!--
and their semantics follow from the semantics of let expressions, as before.
-->

它们的语义由 let 表达式的语义推导而来，和之前一样。

<!--
## Pattern Matching with Functions
-->

## 使用函数进行模式匹配

<!--
The syntax we've been using so far for functions is also a special case of the
full syntax that OCaml permits. That syntax is:
-->

我们到目前为止使用的函数语法也是 OCaml 允许的完整语法的一个特例。该语法是：

```ocaml
let f p1 ... pn = e1 in e2   (* function as part of let expression *)
let f p1 ... pn = e          (* function definition at toplevel *)
fun p1 ... pn -> e           (* anonymous function *)
```

<!--
The truly primitive syntactic form we need to care about is `fun p -> e`. Let's
revisit the semantics of anonymous functions and their application with that
form; the changes to the other forms follow from those below:
-->

我们真正需要关心的基本句法形式是 `fun p -> e`。
让我们用该形式重新审视【匿名函数|Anonymous Function】及其应用的语义；
其他形式的更改由以下内容推导而来：

<!--
**Static semantics.**
-->

**静态语义**

<!--
* Let `x1..xn` be the pattern variables appearing in `p`. If by assuming that
  `x1 : t1` and `x2 : t2` and ... and `xn : tn`, we can conclude that `p : t`
  and ` e : u`, then `fun p -> e : t -> u`.
-->

* 设 `x1..xn` 是出现在 `p` 中的【模式变量|Pattern Variable】。
  如果假设 `x1 : t1` 且 `x2 : t2` 且 ... 且 `xn : tn`，
  我们可以得出 `p : t` 且 `e : u`，则 `fun p -> e : t -> u`。

<!--
* The type checking rule for application is unchanged.
-->

* 【函数应用|Function Application】的类型检查规则不变。

<!--
**Dynamic semantics.**
-->

**动态语义**

<!--
* The evaluation rule for anonymous functions is unchanged.
-->

* 匿名函数的求值规则不变。

<!--
* To evaluate `e0 e1`:
-->

* 求值 `e0 e1`：

<!--
  1. Evaluate `e0` to an anonymous function `fun p -> e`, and
     evaluate `e1` to value `v1`.
-->

  1. 将 `e0` 求值为匿名函数 `fun p -> e`，并将 `e1` 求值为值 `v1`。

<!--
  2. Match `v1` against pattern `p`. If it doesn't match, raise the exception
     `Match_failure`. Otherwise, if it does match, it produces a set $b$ of
     bindings.
-->

  2. 将 `v1` 与模式 `p` 进行匹配。如果不匹配，引发异常 `Match_failure`。
     否则，如果匹配成功，它会产生一组绑定 $b$。

<!--
  3. Substitute those bindings $b$ in `e`, yielding a new expression `e'`.
-->

  3. 将这些绑定 $b$ 代入 `e`，产生一个新表达式 `e'`。

<!--
  4. Evaluate `e'` to a value `v`, which is the result of evaluating `e0 e1`.
-->

  4. 将 `e'` 求值为值 `v`，这就是 `e0 e1` 的求值结果。

<!--
## Pattern Matching Examples
-->

## 模式匹配示例

{{ video_embed | replace("%%VID%%", "3ExRHHqfWm4") }}

<!--
Here are several ways to get a Pok&eacute;mon's hit points:
-->

以下是获取宝可梦生命值的几种方法：

```{code-cell} ocaml
(* Pokemon types *)
type ptype = TNormal | TFire | TWater

(* A record to represent Pokemon *)
type mon = { name : string; hp : int; ptype : ptype }

(* OK *)
let get_hp m = match m with { name = n; hp = h; ptype = t } -> h

(* better *)
let get_hp m = match m with { name = _; hp = h; ptype = _ } -> h

(* better *)
let get_hp m = match m with { name; hp; ptype } -> hp

(* better *)
let get_hp m = match m with { hp; _ } -> hp

(* best *)
let get_hp m = m.hp
```

<!--
Here's how to get the first and second components of a pair:
-->

以下是获取元组第一个和第二个分量的方法：

```{code-cell} ocaml
let fst (x, _) = x

let snd (_, y) = y
```
<!--
Both `fst` and `snd` are actually already defined for you in the standard
library.
-->

`fst` 和 `snd` 实际上已经在【标准库|Standard Library】中为你定义好了。

<!--
Finally, here are several ways to get the 3rd component of a triple:
-->

最后，以下是获取三元组第三个分量的几种方法：

```{code-cell} ocaml
(* OK *)
let thrd t = match t with x, y, z -> z

(* good *)
let thrd t =
  let x, y, z = t in
  z

(* better *)
let thrd t =
  let _, _, z = t in
  z

(* best *)
let thrd (_, _, z) = z
```

<!--
The standard library does not define any functions for triples, quadruples, etc.
-->

标准库没有为三元组、四元组等定义任何函数。
