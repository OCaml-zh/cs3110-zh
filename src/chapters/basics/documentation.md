<!--
# Documentation
-->

# 文档

<!--
OCaml provides a tool called OCamldoc that works a lot like Java's Javadoc tool:
it extracts specially formatted comments from source code and renders them as
HTML, making it easy for programmers to read documentation.
-->

OCaml 提供了一个叫做 OCamldoc 的工具，它很像 Java 的 Javadoc：它会从源代码中提取出特殊格式的注释，并把它们渲染成 HTML，从而让程序员更容易阅读文档。

<!--
## How to Document
-->

## 如何写文档

<!--
Here's an example of an OCamldoc comment:
-->

下面是一个 OCamldoc 注释的例子：

```ocaml
(** [sum lst] is the sum of the elements of [lst]. *)
let rec sum lst = ...
```

<!--
* The double asterisk is what causes the comment to be recognized as an OCamldoc
  comment.

* The square brackets around parts of the comment mean that those parts should
  be rendered in HTML as `typewriter font` rather than the regular font.
-->

* 双星号使这个注释会被识别为 OCamldoc 注释。

* 注释中某些部分外面的方括号，表示这些部分在 HTML 中应当以 `typewriter font` 而不是普通字体显示。

<!--
Also like Javadoc, OCamldoc supports *documentation tags*, such as `@author`,
`@deprecated`, `@param`, `@return`, etc. 
-->

和 Javadoc 一样，OCamldoc 也支持*文档标签*，例如 `@author`、`@deprecated`、`@param`、`@return` 等等。

<!--
For the full range of possible markup inside a OCamldoc comment, see
[the OCamldoc manual](https://ocaml.org/manual/ocamldoc.html).
But what we've covered here is good enough for most documentation that you'll
need to write.
-->

如果你想了解 OCamldoc 注释内部更完整的标记写法，可以参考 [the OCamldoc manual](https://ocaml.org/manual/ocamldoc.html)。不过我们这里讲到的内容，已经足够应付你大多数需要编写的文档了。

<!--
## What to Document
-->

## 文档应该写什么

<!--
The documentation style we favor in this book resembles that of the OCaml
standard library: concise and declarative. As an example, let's revisit the
documentation of `sum`:
-->

本书推崇的文档风格，和 OCaml 标准库的风格很接近：简洁，并且带有陈述性。下面我们再来看一次 `sum` 的文档：

```ocaml
(** [sum lst] is the sum of the elements of [lst]. *)
let rec sum lst = ...
```

<!--
That comment starts with `sum lst`, which is an example application of the
function to an argument. The comment continues with the word "is", thus
declaratively describing the result of the application. (The word "returns"
could be used instead, but "is" emphasizes the mathematical nature of the
function.) That description uses the name of the argument, `lst`, to explain the
result.
-->

这个注释以 `sum lst` 开头，它是该函数应用于某个参数时的一个示例。注释接着用 `is` 这个词，以一种陈述性的方式描述应用结果。（当然也可以用 `returns`，但 `is` 更强调函数的数学性质。）在这段描述中，参数名 `lst` 被直接用来解释结果。

<!--
Note how there is no need to add tags to redundantly describe parameters or
return values, as is often done with Javadoc. Everything that needs to be said
has already been said. We strongly discourage documentation like the following:
-->

注意，这里并不需要再额外加标签去重复描述参数或返回值，而 Javadoc 风格中常常会这样做。需要说的话其实已经都说完了。我们非常不推荐写出像下面这样的文档：

```ocaml
(** Sum a list.
    @param lst The list to be summed.
    @return The sum of the list. *)
let rec sum lst = ...
```

<!--
That poor documentation takes three needlessly hard-to-read lines to say the
same thing as the limpid one-line version.
-->

这种糟糕的文档用三行既没必要、又不易读的话，表达了本来一行清晰注释就能说清楚的同样内容。

<!--
There is one way we might improve the documentation we have so far, which is to
explicitly state what happens with empty lists:
-->

不过，我们目前这段文档还有一种方式可以继续改进，那就是明确说明空列表的情况会发生什么：

```ocaml
(** [sum lst] is the sum of the elements of [lst].
    The sum of an empty list is 0. *)
let rec sum lst = ...
```

<!--
## Preconditions and Postconditions
-->

## 前置条件与后置条件

<!--
Here are a few more examples of comments written in the style we favor.
-->

下面再给出几个采用本书所推崇风格编写的注释示例。

```ocaml
(** [lowercase_ascii c] is the lowercase ASCII equivalent of
    character [c]. *)

(** [index s c] is the index of the first occurrence of
    character [c] in string [s].  Raises: [Not_found]
    if [c] does not occur in [s]. *)

(** [random_int bound] is a random integer between 0 (inclusive)
    and [bound] (exclusive).  Requires: [bound] is greater than 0
    and less than 2^30. *)
```

<!--
The documentation of `index` specifies that the function raises an exception, as
well as what that exception is and the condition under which it is raised. (We
will cover exceptions in more detail in the next chapter.) The documentation of
`random_int` specifies that the function's argument must satisfy a condition.
-->

`index` 的文档说明了该函数会抛出异常，同时也说明了抛出的是什么异常，以及在什么条件下会抛出。（下一章我们会更详细地讨论异常。）而 `random_int` 的文档则说明了：该函数的参数必须满足某个条件。

<!--
In previous courses, you were exposed to the ideas of *preconditions* and
*postconditions*. A precondition is something that must be true before some
section of code; and a postcondition, after.
-->

在之前的课程中，你已经接触过*前置条件*和*后置条件*这两个概念。前置条件指的是：某段代码执行之前必须为真的条件；后置条件则是执行之后必须为真的条件。

<!--
The "Requires" clause above in the documentation of `random_int` is a kind of
precondition. It says that the client of the `random_int` function is
responsible for guaranteeing something about the value of `bound`. Likewise, the
first sentence of that same documentation is a kind of postcondition. It
guarantees something about the value returned by the function.
-->

上面 `random_int` 文档中的 `Requires` 子句，就是一种前置条件。它表示：`random_int` 这个函数的调用者有责任保证 `bound` 的值满足某种要求。类似地，同一段文档中的第一句话则是一种后置条件，它保证了函数返回值满足某种性质。

<!--
The "Raises" clause in the documentation of `index` is another kind of
postcondition. It guarantees that the function raises an exception.
Note that the clause is not a precondition, even though it states a condition in
terms of an input.
-->

`index` 文档中的 `Raises` 子句，则是另一种后置条件。它保证了该函数会抛出某个异常。注意，尽管这个子句是用输入条件来表述的，它依然不是前置条件。

<!--
Note that none of these examples has a "Requires" clause that says something
about the type of an input. If you're coming from a dynamically-typed language,
like Python, this could be a surprise. Python programmers frequently document
preconditions regarding the types of function inputs. OCaml programmers,
however, do not. That's because the compiler itself does the type checking to
ensure that you never pass a value of the wrong type to a function. Consider
`lowercase_ascii` again: although the English comment helpfully identifies the
type of `c` to the reader, the comment does not state a "Requires" clause like
this:
-->

注意，这些示例里都没有出现一个 `Requires` 子句，去说明「输入值的类型必须是什么」。如果你来自 Python 这样的动态类型语言背景，这一点可能会让你有些意外。Python 程序员经常会在文档中说明函数输入类型方面的前置条件。但 OCaml 程序员通常不会这么做。因为编译器本身就会完成类型检查，从而保证你绝不会把错误类型的值传给一个函数。再看一次 `lowercase_ascii`：虽然英语注释中很贴心地向读者指出了 `c` 的类型，但它并不会再写出下面这样的 `Requires` 子句：

```ocaml
(** [lowercase_ascii c] is the lowercase ASCII equivalent of [c].
    Requires: [c] is a character. *)
```

<!--
Such a comment reads as highly unidiomatic to an OCaml programmer, who would
read that comment and be puzzled, perhaps thinking: "Well of course `c` is a
character; the compiler will guarantee that. What did the person who wrote that
really mean? Is there something they or I am missing?"
-->

这种注释在 OCaml 程序员看来会显得极其不地道。一个 OCaml 程序员看到这样的文档，多半会困惑地想：「`c` 当然是字符啊，编译器本来就会保证这一点。写这句话的人真正想表达的到底是什么？是不是他漏掉了什么，或者我漏掉了什么？」
