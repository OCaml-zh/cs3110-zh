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
# Beyond Lists
-->

# 列表之外

{{ video_embed | replace("%%VID%%", "5Yyk-l-cUNI")}}

<!--
Functionals like map and fold are not restricted to lists. They make sense for
nearly any kind of data collection. For example, recall this tree
representation:
-->

像【映射|Map】和【折叠|Fold】这样的【高阶函数|Higher-Order Function】并不局限于列表。
它们对几乎任何【数据集合|Data Collection】都有意义。
例如，回顾一下这个【树|Tree】的表示：

```{code-cell} ocaml
type 'a tree =
  | Leaf
  | Node of 'a * 'a tree * 'a tree
```

<!--
## Map on Trees
-->

## 树的映射

<!--
This one is easy.  All we have to do is apply the function `f` to the
value `v` at each node:
-->

这个很简单。我们只需要将函数 `f` 应用于每个【节点|Node】上的值 `v`：

```{code-cell} ocaml
let rec map_tree f = function
  | Leaf -> Leaf
  | Node (v, l, r) -> Node (f v, map_tree f l, map_tree f r)
```

<!--
## Fold on Trees
-->

## 树的折叠

<!--
This one is only a little harder. Let's develop a fold functional for `'a tree`
similar to our `fold_right` over `'a list`. One way to think of
`List.fold_right` would be that the `[]` value in the list gets replaced by the
`acc` argument, and each `::` constructor gets replaced by an application of the
`f` argument. For example, `[a; b; c]` is syntactic sugar for
`a :: (b :: (c :: []))`. So if we replace `[]` with `0` and `::` with `( + )`,
we get `a + (b + (c + 0))`. Along those lines, here's a way we could rewrite
`fold_right` that will help us think a little more clearly:
-->

这个只是稍微难一些。让我们为 `'a tree` 开发一个类似于
`'a list` 的 `fold_right` 的折叠高阶函数。
理解 `List.fold_right` 的一种方式是：
列表中的 `[]` 值被替换为参数 `acc`，
每个 `::` 构造子被替换为参数 `f` 的一次应用。
例如，`[a; b; c]` 是 `a :: (b :: (c :: []))` 的【语法糖|Syntactic Sugar】。
因此，如果我们将 `[]` 替换为 `0`，将 `::` 替换为 `( + )`，
就会得到 `a + (b + (c + 0))`。
沿着这个思路，以下是我们重写 `fold_right` 的一种方式，
可以帮助我们更清晰地思考：

```{code-cell} ocaml
type 'a mylist =
  | Nil
  | Cons of 'a * 'a mylist

let rec fold_mylist f acc = function
  | Nil -> acc
  | Cons (h, t) -> f h (fold_mylist f acc t)
```

<!--
The algorithm is the same. All we've done is to change the definition of lists
to use constructors written with alphabetic characters instead of punctuation,
and to change the argument order of the fold function.
-->

算法是一样的。我们所做的只是将列表的定义改为使用字母字符而非标点符号的构造子，
并更改了折叠函数的参数顺序。

<!--
For trees, we'll want the initial value of `acc` to replace each `Leaf`
constructor, just like it replaced `[]` in lists. And we'll want each `Node`
constructor to be replaced by the operator. But now the operator will need to be
*ternary* instead of *binary*&mdash;that is, it will need to take three
arguments instead of two&mdash;because a tree node has a value, a left child,
and a right child, whereas a list cons had only a head and a tail.
-->

对于树，我们希望 `acc` 的初始值替换每个 `Leaf` 构造子，
就像它在列表中替换 `[]` 一样。
我们还希望每个 `Node` 构造子被运算符替换。
但现在该运算符需要是【三元|Ternary】的而非【二元|Binary】的——
也就是说，它需要接受三个参数而非两个——
因为一个树节点有一个值、一个左子树和一个右子树，
而一个列表的 cons 只有一个【头部|Head】和一个【尾部|Tail】。

<!--
Inspired by those observations, here is the fold function on trees:
-->

受这些观察的启发，以下是树的折叠函数：

```{code-cell} ocaml
let rec fold_tree f acc = function
  | Leaf -> acc
  | Node (v, l, r) -> f v (fold_tree f acc l) (fold_tree f acc r)
```

<!--
If you compare that function to `fold_mylist`, you'll note it very nearly
identical. There's just one more recursive call in the second pattern-matching
branch, corresponding to the one more occurrence of `'a tree` in the definition
of that type.
-->

如果你将该函数与 `fold_mylist` 进行比较，
你会发现它们几乎完全相同。
只是在第二个模式匹配分支中多了一次递归调用，
对应于该类型定义中多出的一次 `'a tree` 的出现。

<!--
We can then use `fold_tree` to implement some of the tree functions we've
previously seen:
-->

然后我们可以使用 `fold_tree` 来实现之前见过的一些树函数：

```{code-cell} ocaml
let size t = fold_tree (fun _ l r -> 1 + l + r) 0 t
let depth t = fold_tree (fun _ l r -> 1 + max l r) 0 t
let preorder t = fold_tree (fun x l r -> [x] @ l @ r) [] t
```

<!--
Why did we pick `fold_right` and not `fold_left` for this development? Because
`fold_left` is tail recursive, which is something we're never going to achieve
on binary trees. Suppose we process the left branch first; then we still have to
process the right branch before we can return. So there will always be work left
to do after a recursive call on one branch. Thus, on trees an equivalent to
`fold_right` is the best which we can hope for.
-->

为什么我们选择 `fold_right` 而非 `fold_left` 来进行这个推导？
因为 `fold_left` 是【尾递归|Tail Recursive】的，
而这在二叉树上是永远无法实现的。
假设我们先处理左分支；那么在返回之前仍然需要处理右分支。
因此，在对一个分支进行递归调用之后，总会有剩余的工作要做。
所以在树上，等价于 `fold_right` 的版本是我们所能期望的最佳方案。

<!--
The technique we used to derive `fold_tree` works for any OCaml variant type
`t`:
-->

我们用来推导 `fold_tree` 的技术适用于任何 OCaml 【变体|Variant】类型 `t`：

<!--
* Write a recursive `fold` function that takes in one argument for each
  constructor of `t`.
-->

* 编写一个递归的 `fold` 函数，为 `t` 的每个构造子各接受一个参数。

<!--
* That `fold` function matches against the constructors, calling itself
  recursively on any value of type `t` that it encounters.
-->

* 该 `fold` 函数对构造子进行匹配，对遇到的任何类型为 `t` 的值递归调用自身。

<!--
* Use the appropriate argument of `fold` to combine the results of all recursive
  calls as well as all data not of type `t` at each constructor.
-->

* 使用 `fold` 的相应参数来组合所有递归调用的结果，
  以及每个构造子中所有非类型 `t` 的数据。

<!--
This technique constructs something called a *catamorphism*, aka a *generalized
fold operation*. To learn more about catamorphisms, take a course on category
theory.
-->

这种技术构造出的东西叫做【态射|Catamorphism】，
也称为【广义折叠操作|Generalized Fold Operation】。
要了解更多关于态射的内容，请学习范畴论课程。

<!--
## Filter on Trees
-->

## 树的过滤

<!--
This one is perhaps the hardest to design.  The problem is: if we decide
to filter a node, what should we do with its children?
-->

这可能是最难设计的。问题在于：如果我们决定过滤一个节点，
我们应该如何处理它的子节点？

<!--
- We could recurse on the children. If after filtering them only one child
  remains, we could promote it in place of its parent. But what if both children
  remain, or neither? Then we'd somehow have to reshape the tree. Without
  knowing more about how the tree is intended to be used&mdash;that is, what
  kind of data it represents&mdash;we are stuck.
-->

- 我们可以对子节点进行递归。如果过滤后只剩下一个子节点，
  我们可以将其提升到父节点的位置。
  但如果两个子节点都保留下来，或者一个都不剩呢？
  那么我们就必须以某种方式重塑树的结构。
  如果不了解树的预期用途——也就是说，它表示什么种类的数据——
  我们就无从下手。

<!--
- Instead, we could just eliminate the children entirely. So the decision
  to filter a node means pruning the entire subtree rooted at that node.
-->

- 相反，我们可以直接将子节点全部删除。
  因此，过滤一个节点的决定意味着【剪枝|Pruning】以该节点为根的整个【子树|Subtree】。

<!--
The latter is easy to implement:
-->

后者很容易实现：

```{code-cell} ocaml
let rec filter_tree p = function
  | Leaf -> Leaf
  | Node (v, l, r) ->
    if p v then Node (v, filter_tree p l, filter_tree p r) else Leaf
```
