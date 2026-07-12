<!--
# The Present of OCaml
-->

# OCaml 的当下

{{ video_embed | replace("%%VID%%", "JTEwC3HihFc")}}

<!--
OCaml is a functional programming language. The key linguistic abstraction of
functional languages is the mathematical function. A function maps an input to
an output; for the same input, it always produces the same output. That is,
mathematical functions are *stateless*: they do not maintain any extra
information or *state* that persists between usages of the function. Functions
are *first-class*: you can use them as input to other functions, and produce
functions as output. Expressing everything in terms of functions enables a
uniform and simple programming model that is easier to reason about than the
procedures and methods found in other families of languages.
-->

OCaml 是一门函数式编程语言。函数式语言最关键的语言抽象，是数学意义上的函数。函数把输入映射为输出；对于同样的输入，它总会产生同样的输出。也就是说，数学函数是*无状态的*：它不会维护任何会在多次调用之间持续存在的额外信息或*状态*。函数还是*一等的*：你可以把函数作为其他函数的输入，也可以把函数作为输出产生出来。把一切都表达成函数，会得到一种统一而简洁的编程模型；相比其他语言家族中的过程和方法，这种模型更容易推理。

<!--
*Imperative* programming languages such as C and Java involve *mutable* state
that changes throughout execution. *Commands* specify how to compute by
destructively changing that state. Procedures (or methods) can have *side
effects* that update state in addition to producing a return value.
-->

像 C 和 Java 这样的*命令式*编程语言依赖于在执行过程中不断变化的*可变*状态。*命令*通过破坏性地修改这些状态来规定「如何计算」。过程（或方法）除了返回结果之外，还可能带来更新状态的*副作用*。

<!--
The **fantasy of mutability** is that it's easy to reason about: the machine
does this, then this, etc.
-->

关于可变性的**幻想**在于：人们以为它很容易推理，因为机器只是先做这个，再做那个，依次类推。

<!--
The **reality of mutability** is that whereas machines are good at complicated
manipulation of state, humans are not good at understanding it. The essence of
why that's true is that mutability breaks *referential transparency*: the
ability to replace an expression with its value without affecting the result of
a computation. In math, if $f(x)=y$, then you can substitute $y$ anywhere
you see $f(x)$. In imperative languages, you cannot: $f$ might have side
effects, so computing $f(x)$ at time $t$ might result in a different value
than at time $t'$.
-->

可变性的**现实**却是：机器固然擅长复杂的状态操作，人类却并不擅长理解它。其核心原因在于，可变性破坏了*引用透明性*：也就是在不影响计算结果的前提下，用一个表达式的值替换该表达式的能力。在数学里，如果 $f(x)=y$，那么你在任何看到 $f(x)$ 的地方都可以把它替换成 $y$。但在命令式语言里，你做不到，因为 $f$ 可能带有副作用，所以在时刻 $t$ 计算出的 $f(x)$，到了时刻 $t'$ 可能已经不是同一个值了。

<!--
It's tempting to believe that there's a single state that the machine
manipulates, and that the machine does one thing at a time. Computer systems go
to great lengths in attempting to provide that illusion. But it's just that: an
illusion. In reality, there are many states, spread across threads, cores,
processors, and networked computers. And the machine does many things
concurrently. Mutability makes reasoning about distributed state and concurrent
execution immensely difficult.
-->

人们很容易相信：机器只是在操作一个单一的状态，而且一次只做一件事。计算机系统确实花了很大力气来制造这种幻觉。但它终究只是一种幻觉。现实中，状态有很多个，它们分散在线程、核心、处理器以及联网计算机之间；而机器也总是在并发地做很多事情。可变性使得人们对分布式状态与并发执行进行推理变得异常困难。

<!--
*Immutability*, however, frees the programmer from these concerns. It provides
powerful ways to build correct and concurrent programs. OCaml is primarily an
immutable language, like most functional languages. It does support imperative
programming with mutable state, but we won't use those features until many
chapters into the book&mdash;in part because we simply won't need them, and in
part to get you to quit "cold turkey" from a dependence you might not have known
that you had. This freedom from mutability is one of the biggest changes in
perspective that OCaml can give you.
-->

然而，*不可变性*把程序员从这些顾虑中解放了出来。它为构造正确且并发的程序提供了强大手段。像大多数函数式语言一样，OCaml 主要是一门不可变语言。它当然也支持带有可变状态的命令式编程，但在本书后面很多章之前，我们都不会使用这些特性：一方面是因为根本用不着，另一方面也是想让你对这种你也许自己都未曾察觉的依赖来一次「断然戒除」。从可变性中解脱出来，是 OCaml 能带给你的最大视角转变之一。

<!--
## The Features of OCaml
-->

## OCaml 的特性

{{ video_embed | replace("%%VID%%", "T-DIW1dhYzo")}}

<!--
OCaml is a *statically-typed* and *type-safe* programming language. A
statically-typed language detects type errors at compile time; if a type error
is detected, the language won't allow execution of the program. A type-safe
language limits which kinds of operations can be performed on which kinds of
data. In practice, this prevents a lot of silly errors (e.g., treating an
integer as a function) and also prevents a lot of security problems: over half
of the reported break-ins at the Computer Emergency Response Team (CERT, a US
government agency tasked with cybersecurity) were due to buffer overflows,
something that's impossible in a type-safe language.
-->

OCaml 是一门*类型安全*的*静态类型*编程语言。静态类型语言会在编译时检测类型错误；如果发现了类型错误，这门语言就不会允许程序执行。类型安全的语言则会限制「哪一类操作」可以作用于「哪一类数据」。在实践中，这既能避免大量低级错误（例如把整数当成函数来用），也能避免很多安全问题：美国网络安全机构 CERT（Computer Emergency Response Team）所记录的大量入侵事件中，有一半以上都源于缓冲区溢出，而这在类型安全语言中是不可能发生的。

<!--
Some languages, like Python and Racket, are type-safe but *dynamically typed*.
That is, type errors are caught only at run time. Other languages, like C and
C++, are statically typed but not type safe: they check for some type errors,
but don't guarantee the absence of all type errors. That is, there's no
guarantee that a type error won't occur at run time. And still other languages,
like Java, use a combination of static and dynamic typing to achieve type
safety.
-->

有些语言，比如 Python 和 Racket，是类型安全的，但属于*动态类型*：也就是说，类型错误只有在运行时才会被捕获。另一些语言，比如 C 和 C++，则是静态类型的，但并不类型安全：它们会检查某些类型错误，却不能保证所有类型错误都不会发生。换句话说，你无法保证程序在运行时不会遭遇类型错误。还有一些语言，比如 Java，会结合静态类型和动态类型的机制来实现类型安全。

<!--
OCaml supports a number of advanced features, some of which you will have
encountered before, and some of which are likely to be new:
-->

OCaml 支持许多高级特性，其中有些你可能已经见过，有些则很可能对你来说是全新的：

<!--
-   **Algebraic data types:** You can build sophisticated data structures in
    OCaml easily, without fussing with pointers and memory management. *Pattern
    matching*&mdash;a feature we'll soon learn about that enables examining the shape
    of a data structure&mdash;makes them even more convenient.
-->

- **代数数据类型：** 你可以很轻松地在 OCaml 里构造复杂的数据结构，而不必为指针和内存管理操心。*模式匹配*使它们变得更加方便；我们很快就会学到这个特性，它能够让你检查数据结构的形状。

<!--
-   **Type inference:** You do not have to write type information down
    everywhere. The compiler automatically figures out most types. This can make
    the code easier to read and maintain.
-->

- **类型推断：** 你不需要到处手写类型信息。编译器会自动推断出大多数类型。这会让代码更易读，也更容易维护。

<!--
-   **Parametric polymorphism:** Functions and data structures can be
    parameterized over types. This is crucial for being able to re-use code.
-->

- **参数多态：** 函数和数据结构都可以按类型进行参数化。这对于代码复用至关重要。

<!--
-   **Garbage collection:** Automatic memory management relieves you from the
    burden of memory allocation and deallocation, a common source of bugs in
    languages such as C.
-->

- **垃圾回收：** 自动内存管理把你从手动分配和释放内存的负担中解放出来，而这正是 C 等语言中常见的 bug 来源。

<!--
-   **Modules:** OCaml makes it easy to structure large systems through the use
    of modules. Modules are used to encapsulate implementations behind
    interfaces. OCaml goes well beyond the functionality of most languages with
    modules by providing functions (called *functors*) that manipulate modules.
-->

- **模块：** OCaml 通过模块使得大型系统的组织变得容易。模块被用来把实现封装在接口之后。OCaml 在模块方面远远超出了大多数语言的能力，因为它还提供了能操作模块的函数（称为*函子*）。

<!--
## OCaml in Industry
-->

## 工业界中的 OCaml

{{ video_embed | replace("%%VID%%", "eNLm5Xbgmd0")}}

<!--
OCaml and other functional languages are nowhere near as popular as Python, C,
or Java. OCaml's real strength lies in language manipulation (i.e., compilers,
analyzers, verifiers, provers, etc.). This is not surprising, because OCaml
evolved from the domain of theorem proving.
-->

OCaml 和其他函数式语言远没有 Python、C 或 Java 那样流行。OCaml 真正的强项在于语言操作，也就是编译器、分析器、验证器、证明器等系统。这一点并不令人意外，因为 OCaml 正是从定理证明的领域发展出来的。

<!--
That's not to say that functional languages aren't used in industry. There are
many [industry projects using OCaml][ocaml-industry] and
[Haskell][haskell-industry], among other languages. Yaron Minsky (Cornell PhD
'02) even wrote a paper about [using OCaml in the financial industry][minsky].
It explains how the features of OCaml make it a good choice for quickly building
complex software that works.
-->

但这并不意味着函数式语言在工业界没有用武之地。实际上，已经有很多工业项目在使用 [OCaml][ocaml-industry]、[Haskell][haskell-industry] 等语言。Yaron Minsky（康奈尔 2002 届博士）甚至写过一篇关于[在金融行业使用 OCaml][minsky] 的论文。那篇论文解释了：为什么 OCaml 的这些特性，使它成为快速构建复杂且可用软件的一个优秀选择。

[minsky]: http://dx.doi.org/10.1017/S095679680800676X
[ocaml-industry]: https://ocaml.org/learn/companies.html
[haskell-industry]: https://wiki.haskell.org/Haskell_in_industry
