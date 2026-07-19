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
# Printing
-->

# 输出

<!--
OCaml has built-in printing functions for a few of the built-in primitive
types: `print_char`, `print_string`, `print_int`, and `print_float`. There's
also a `print_endline` function, which is like `print_string`, but also outputs
a newline.
-->

OCaml 为少数几种内建原始类型提供了内建输出函数：`print_char`、`print_string`、`print_int` 和 `print_float`。另外还有一个 `print_endline` 函数，它和 `print_string` 类似，但会额外输出一个换行符。

```{code-cell} ocaml
print_endline "Camels are bae"
```

<!--
## Unit
-->

## Unit

<!--
Let's look at the types of a couple of those functions:
-->

我们来看其中几个函数的类型：

```{code-cell} ocaml
print_endline
```

```{code-cell} ocaml
print_string
```

<!--
They both take a string as input and return a value of type `unit`, which we
haven't seen before. There is only one value of this type, which is written `()`
and is also pronounced "unit". So `unit` is like `bool`, except there is one
fewer value of type `unit` than there is of `bool`.
-->

它们都接受一个字符串作为输入，并返回一个 `unit` 类型的值，而这是我们之前还没见过的类型。这个类型只有一个值，写作 `()`，读作 「unit」。所以 `unit` 有点像 `bool`，只不过 `unit` 类型的值比 `bool` 类型少一个。

<!--
Unit is used when you need to take an argument or return a value, but there's no
interesting value to pass or return. It is the equivalent of `void` in Java, and
is similar to `None` in Python. Unit is often used when you're writing or using
code that has side effects. Printing is an example of a side effect: it changes
the world and can't be undone.
-->

当你需要接受一个参数或返回一个值，但实际上并没有什么有意义的值可传或可返回时，就会用到 unit。它相当于 Java 里的 `void`，也和 Python 中的 `None` 有些相似。unit 常常出现在那些带有副作用的代码中。输出就是一种副作用：它改变了外部世界，而且无法撤销。

<!--
## Semicolon
-->

## 分号

<!--
If you want to print one thing after another, you could sequence some print
functions using nested `let` expressions:
-->

如果你想一个接一个地输出若干东西，那么可以用嵌套的 `let` 表达式把几个输出函数串起来：

```{code-cell} ocaml
let _ = print_endline "Camels" in
let _ = print_endline "are" in
print_endline "bae"
```

<!--
The `let _ = e` syntax above is a way of evaluating `e` but not binding
its value to any name.  Indeed, we know the value each of those `print_endline`
functions will return: it will always be `()`, the unit value. So there's
no good reason to bind it to a variable name.  We could also write `let () = e`
to indicate we know it's just a unit value that we don't care about:
-->

上面的 `let _ = e` 语法表示：对 `e` 求值，但不把它的值绑定到任何名字上。实际上，我们早就知道每个 `print_endline` 函数会返回什么：它总是返回 `()`，也就是 unit 值。所以确实没有什么理由把它绑定到某个变量名上。我们也可以写成 `let () = e`，用来表示我们知道它只是一个无关紧要的 unit 值：

```{code-cell} ocaml
let () = print_endline "Camels" in
let () = print_endline "are" in
print_endline "bae"
```

<!--
But either way the boilerplate of all the `let..in` is annoying to have to
write! So there's a special syntax that can be used to chain
together multiple functions that return unit. The expression `e1; e2` first
evaluates `e1`, which should evaluate to `()`, then discards that value, and
evaluates `e2`. So we could rewrite the above code as:
-->

但不管怎么写，这一串 `let..in` 样板代码都很烦人！因此，OCaml 提供了一种特殊语法，可以把多个返回 unit 的函数串起来。表达式 `e1; e2` 会先对 `e1` 求值，而它应当求出 `()`；接着丢弃这个值，再对 `e2` 求值。所以我们可以把上面的代码改写成：

```{code-cell} ocaml
print_endline "Camels";
print_endline "are";
print_endline "bae"
```

<!--
That is more idiomatic OCaml code, and it also looks more natural to imperative
programmers.
-->

这更符合 OCaml 的习惯写法，而且对命令式编程背景的程序员来说，看起来也更自然。

```{warning}
<!--
There is no semicolon after the final `print_endline` in that example. A common
mistake is to put a semicolon *after* each print statement. Instead, the
semicolons go strictly *between* statements. That is, semicolon is a statement
*separator* not a statement *terminator*. If you were to add a semicolon at the
end, you could get a syntax error depending on the surrounding code.
-->

注意，在那个例子中，最后一个 `print_endline` 后面并没有分号。一个常见错误是把分号写在每条输出语句*后面*。其实，分号只应严格放在语句*之间*。也就是说，分号是语句的*分隔符*，不是语句的*终止符*。如果你在最后也加上一个分号，那么根据周围代码的不同，可能会导致语法错误。
```

<!--
## Ignore
-->

## Ignore

<!--
If `e1` does not have type `unit`, then `e1; e2` will give a warning, because
you are discarding a potentially useful value. If that is truly your intent, you
can call the built-in function `ignore : 'a -> unit` to convert any value to
`()`: 
-->

如果 `e1` 的类型不是 `unit`，那么 `e1; e2` 就会给出一个警告，因为你正在丢弃一个本来可能有用的值。如果你确实就是这么打算的，那么可以调用内建函数 `ignore : 'a -> unit`，把任何值都转换成 `()`：

```{code-cell} ocaml
(ignore 3); 5
```

<!--
Actually `ignore` is easy to implement yourself:
-->

其实 `ignore` 自己实现起来也很容易：

```{code-cell} ocaml
let ignore x = ()
```

<!--
Or you can even write underscore to indicate the function takes in a value but
does not bind that value to a name. That means the function can never use that
value in its body. But that's okay: we want to ignore it.
-->

你甚至还可以直接写下划线，来表示这个函数虽然接收一个值，但不会把它绑定到任何名字上。这意味着该函数在函数体中永远不可能使用这个值。不过这没关系：我们本来就是想忽略它。

```{code-cell} ocaml
let ignore _ = ()
```

<!--
## Printf
-->

## Printf

<!--
For complicated text outputs, using the built-in functions for primitive type
printing quickly becomes tedious. For example, suppose you wanted to write a
function to print a statistic:
-->

如果输出的文本稍微复杂一些，那么只靠内建的原始类型输出函数很快就会变得繁琐。比如，假设你想写一个函数来输出某个统计量：

```{code-cell} ocaml
(** [print_stat name num] prints [name: num]. *)
let print_stat name num =
  print_string name;
  print_string ": ";
  print_float num;
  print_newline ()
```

```{code-cell} ocaml
print_stat "mean" 84.39
```

<!--
How could we shorten `print_stat`? In Java you might use the overloaded `+`
operator to turn all objects into strings:
-->

怎样才能把 `print_stat` 写得更短一点呢？在 Java 里，你也许会使用重载的 `+` 运算符，把各种对象都拼接成字符串：

```java
void print_stat(String name, double num) {
   System.out.println(name + ": " + num);
}
```

<!--
But OCaml values are not objects, and they do not have a `toString()` method
they inherit from some root `Object` class. Nor does OCaml permit overloading of
operators.
-->

但 OCaml 中的值不是对象，它们也没有一个从某个根 `Object` 类继承来的 `toString()` 方法。OCaml 也不允许运算符重载。

<!--
Long ago though, FORTRAN invented a different solution that other languages like
C and Java and even Python support. The idea is to use a *format specifier* to
&mdash;as the name suggest&mdash; specify how to format output. The name this
idea is best known under is probably "printf", which refers to the name of the C
library function that implemented it. Many other languages and libraries still
use that name, including OCaml's `Printf` module.
-->

不过很早以前，FORTRAN 就发明了另一种解决方案，后来像 C、Java，甚至 Python 等语言也都支持。这个思路是用一种 *format specifier*，顾名思义，就是用来指定输出该如何格式化。这个思路最出名的名字，大概就是 「printf」，它来自实现这一机制的那个 C 库函数名。许多其他语言和库至今仍沿用这个名字，包括 OCaml 的 `Printf` 模块。

<!--
Here's how we'd use `printf` to re-implement `print_stat`:
-->

下面就是我们如何用 `printf` 来重写 `print_stat`：

```{code-cell} ocaml
let print_stat name num =
  Printf.printf "%s: %F\n%!" name num
```

```{code-cell} ocaml
print_stat "mean" 84.39
```

<!--
The first argument to function `Printf.printf` is the format specifier. It
*looks* like a string, but there's more to it than that. It's actually
understood by the OCaml compiler in quite a deep way. Inside the format
specifier there are:
-->

函数 `Printf.printf` 的第一个参数就是格式说明符。它*看起来*像字符串，但事情并不止如此。OCaml 编译器会以一种相当深入的方式理解它。在这个格式说明符内部，有：

<!--
- plain characters, and

- conversion specifiers, which begin with `%`.
-->

- 普通字符，以及
- 以 `%` 开头的转换说明符。

<!--
There are about two dozen conversion specifiers available, which you can read
about in the [documentation of `Printf`][printf-doc]. Let's pick apart the
format specifier above as an example.
-->

可用的转换说明符大约有二十多种，你可以在 [`Printf` 的文档][printf-doc] 中读到它们。下面我们以前面的格式说明符为例，把它拆开来看。

[printf-doc]: https://ocaml.org/api/Printf.html

<!--
- It starts with `"%s"`, which is the conversion specifier for strings.  That means
  the next argument to `printf` must be a `string`, and the contents of that string
  will be output.
-->

- 它以 `"%s"` 开头，这是字符串的转换说明符。这意味着 `printf` 的下一个参数必须是一个 `string`，而这个字符串的内容会被输出出来。

<!--
- It continues with `": "`, which are just plain characters.  Those are inserted
  into the output.
-->

- 接着是 `": "`，它们只是普通字符，会被直接插入输出中。

<!--
- It then has another conversion specifier, `%F`. That means the next argument of
  `printf` must have type `float`, and will be output in the same format that
  OCaml uses to print floats.
-->

- 然后又出现了一个转换说明符 `%F`。这意味着 `printf` 的下一个参数必须具有 `float` 类型，并且会按照 OCaml 打印浮点数时使用的那种格式输出。

<!--
- The newline `"\n"` after that is another plain character sequence.
-->

- 再后面的换行符 `"\n"` 则又是一段普通字符序列。

<!--
- Finally, the conversion specifier `"%!"` means to *flush the output buffer*.
  As you might have learned in earlier programming classes, output is often
  *buffered*, meaning that it doesn't all happen at once or right away. Flushing
  the buffer ensures that anything still sitting in the buffer gets output
  immediately. This specifier is special in that it doesn't actually need
  another argument to `printf`.
-->

- 最后，转换说明符 `"%!"` 的意思是*刷新输出缓冲区*。正如你在之前的编程课里可能学过的，输出通常都是*带缓冲*的，也就是说，它不会立刻、一次性全部发生。刷新缓冲区会确保当前仍停留在缓冲区中的内容立刻被真正输出。这个说明符的特别之处在于：它实际上并不需要再额外给 `printf` 提供一个参数。

<!--
If the type of an argument is incorrect with respect to the conversion specifier,
OCaml will detect that.  Let's add a type annotation to force `num` to be an
`int`, and see what happens with the float conversion specifier `%F`:
-->

如果某个参数的类型与转换说明符不匹配，OCaml 会检测到这一点。下面我们给 `num` 加一个类型标注，强迫它成为 `int`，然后看看当它遇到浮点数转换说明符 `%F` 时会发生什么：

```{code-cell} ocaml
:tags: ["raises-exception"]
let print_stat name (num : int) =
  Printf.printf "%s: %F\n%!" name num
```

<!--
To fix that, we can change to the conversion specifier for `int`, which is `%i`:
-->

要修正它，我们可以改用 `int` 对应的转换说明符 `%i`：

```{code-cell} ocaml
let print_stat name num =
  Printf.printf "%s: %i\n%!" name num
```

<!--
Another very useful variant of `printf` is `sprintf`, which collects the output
in string instead of printing it:
-->

`printf` 的另一个非常有用的变体是 `sprintf`，它不会把结果打印出来，而是把输出收集到字符串中：

```{code-cell} ocaml
let string_of_stat name num =
  Printf.sprintf "%s: %F" name num
```

```{code-cell} ocaml
string_of_stat "mean" 84.39
```
