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
# Example: Trees
-->

# 示例：树

{{ video_embed | replace("%%VID%%", "WV9DGpRTAE0") }}

<!--
Trees are a very useful data structure. A *binary tree*, as you'll recall from
CS 2110, is a node containing a value and two children that are trees. A binary
tree can also be an empty tree, which we also use to represent the absence of a
child node.
-->

树是一种非常有用的【数据结构|Data Structure】。
*【二叉树|Binary Tree】*，正如你从 CS 2110 中回忆的那样，
是一个包含一个值和两个子树的【节点|Node】。
二叉树也可以是空树，我们也用它来表示子节点的缺失。

## 元组表示

<!--
Here is a definition for a binary tree data type:
-->

以下是二叉树数据类型的定义：

```{code-cell} ocaml
type 'a tree =
| Leaf
| Node of 'a * 'a tree * 'a tree
```

<!--
A node carries a data item of type `'a` and has a left and right subtree.  A leaf
is empty.  Compare this definition to the definition of a list and notice how
similar their structure is:
-->

节点携带类型为 `'a` 的数据项，并有一个左子树和右子树。
【叶子|Leaf】是空的。将此定义与列表的定义进行比较，注意它们的结构有多相似：

```ocaml
type 'a tree =                        type 'a mylist =
  | Leaf                                | Nil
  | Node of 'a * 'a tree * 'a tree      | Cons of 'a * 'a mylist
```

<!--
The only essential difference is that `Cons` carries one sublist, whereas `Node`
carries two subtrees.
-->

唯一的本质区别是 `Cons` 携带一个子列表，而 `Node` 携带两个子树。

<!--
Here is code that constructs a small tree:
-->

以下是构建一棵小树的代码：

```{code-cell} ocaml
(* the code below constructs this tree:
         4
       /   \
      2     5
     / \   / \
    1   3 6   7
*)
let t =
  Node(4,
    Node(2,
      Node(1, Leaf, Leaf),
      Node(3, Leaf, Leaf)
    ),
    Node(5,
      Node(6, Leaf, Leaf),
      Node(7, Leaf, Leaf)
    )
  )
```

<!--
The *size* of a tree is the number of nodes in it (that is, `Node`s, not
`Leaf`s). For example, the size of tree `t` above is 7. Here is a function
`size : 'a tree -> int` that returns the number of nodes in a tree:
-->

树的*大小*是其中节点的数量（即 `Node`，而非 `Leaf`）。
例如，上面树 `t` 的大小是 7。以下是一个函数 `size : 'a tree -> int`，它返回树中的节点数：

```
let rec size = function
  | Leaf -> 0
  | Node (_, l, r) -> 1 + size l + size r
```

## 记录表示

<!--
Next, let's revise our tree type to use a record type to represent a tree node.
In OCaml we have to define two mutually recursive types, one to represent a tree
node, and one to represent a (possibly empty) tree:
-->

接下来，让我们修改树类型以使用【记录|Record】类型来表示树节点。
在 OCaml 中，我们必须定义两个互递归的类型，一个表示树节点，一个表示（可能为空的）树：

```{code-cell} ocaml
type 'a tree =
  | Leaf
  | Node of 'a node

and 'a node = {
  value: 'a;
  left: 'a tree;
  right: 'a tree
}
```

<!--
Here's an example tree:
-->

以下是一棵示例树：

```{code-cell} ocaml
(* represents
      2
     / \
    1   3  *)
let t =
  Node {
    value = 2;
    left = Node {value = 1; left = Leaf; right = Leaf};
    right = Node {value = 3; left = Leaf; right = Leaf}
  }
```

<!--
We can use pattern matching to write the usual algorithms for recursively
traversing trees. For example, here is a recursive search over the tree:
-->

我们可以使用【模式匹配|Pattern Matching】来编写递归【遍历|Traversal】树的常用算法。
例如，以下是对树的递归搜索：

```{code-cell} ocaml
(** [mem x t] is whether [x] is a value at some node in tree [t]. *)
let rec mem x = function
  | Leaf -> false
  | Node {value; left; right} -> value = x || mem x left || mem x right
```

<!--
The function name `mem` is short for "member"; the standard library often uses a
function of this name to implement a search through a collection data structure
to determine whether some element is a member of that collection.
-->

函数名 `mem` 是「member」的缩写；标准库经常使用这个名称的函数来实现对集合数据结构的搜索，
以确定某个元素是否是该集合的成员。

<!--
Here's a function that computes the *preorder* traversal of a tree, in which
each node is visited before any of its children, by constructing a list in which
the values occur in the order in which they would be visited:
-->

以下是一个计算树的*【前序|Preorder】*遍历的函数，其中每个节点在其任何子节点之前被访问，
通过构建一个值按访问顺序出现的列表：

```{code-cell} ocaml
let rec preorder = function
  | Leaf -> []
  | Node {value; left; right} -> [value] @ preorder left @ preorder right
```

```{code-cell} ocaml
preorder t
```

<!--
Although the algorithm is beautifully clear from the code above, it takes
quadratic time on unbalanced trees because of the `@` operator.  That
problem can be solved by introducing an extra argument `acc` to accumulate
the values at each node, though at the expense of making the code less clear:
-->

尽管从上面的代码中可以清晰地看出算法，但由于 `@` 运算符，它在不平衡树上需要二次时间。
这个问题可以通过引入一个额外的参数 `acc` 来累积每个节点的值来解决，
尽管代价是使代码变得不那么清晰：

```{code-cell} ocaml
let preorder_lin t =
  let rec pre_acc acc = function
    | Leaf -> acc
    | Node {value; left; right} -> value :: (pre_acc (pre_acc acc right) left)
  in pre_acc [] t
```

<!--
The version above uses exactly one `::` operation per `Node` in the tree,
making it linear time.
-->

上面的版本对树中的每个 `Node` 恰好使用一次 `::` 运算，使其成为线性时间。
