<!--
# The Past of OCaml
-->

# OCaml 的过去

<!--
Genealogically, OCaml comes from the line of programming languages whose
grandfather is Lisp and includes other modern languages such as Clojure, F#,
Haskell, and Racket.
-->

从谱系上看，OCaml 出自一个以 Lisp 为祖先的编程语言家族；这个家族中还包括 Clojure、F#、Haskell 和 Racket 等现代语言。

<!--
OCaml originates from work done by Robin Milner and others at the Edinburgh
Laboratory for Computer Science in Scotland. They were working on theorem
provers in the late 1970s and early 1980s. Traditionally, theorem provers were
implemented in languages such as Lisp. Milner kept running into the problem that
the theorem provers would sometimes put incorrect "proofs" (i.e., non-proofs)
together and claim that they were valid. So he tried to develop a language that
only allowed you to construct valid proofs. ML, which stands for "Meta
Language", was the result of that work. The type system of ML was carefully
constructed so that you could only construct valid proofs in the language. A
theorem prover was then written as a program that constructed a proof.
Eventually, this "Classic ML" evolved into a full-fledged programming language.
-->

OCaml 起源于 Robin Milner 及其同事在苏格兰爱丁堡计算机科学实验室所做的工作。他们在 1970 年代末到 1980 年代初研究定理证明器。传统上，定理证明器通常是用 Lisp 之类的语言实现的。Milner 不断遇到这样一个问题：定理证明器有时会把错误的「证明」（也就是说，根本不是证明的东西）拼凑在一起，然后宣称它们是有效的。因此，他试图设计一种语言，使你只能在其中构造出有效证明。ML，也就是「Meta Language」，正是这项工作的成果。ML 的类型系统经过了精心设计，以确保你只能在该语言中构造有效证明。随后，定理证明器就被写成了一个「构造证明」的程序。最终，这种「经典 ML」演化成了一门完整的编程语言。

<!--
In the early '80s, there was a schism in the ML community with the French on one
side and the British and US on another. The French went on to develop CAML and
later Objective CAML (OCaml) while the Brits and Americans developed Standard
ML. The two dialects are quite similar. Microsoft introduced its own variant of
OCaml called F# in 2005.
-->

到了 1980 年代初，ML 社区发生了分裂：一边是法国学派，另一边是英国和美国学派。法国人后来发展出了 CAML，之后又发展出 Objective CAML（也就是 OCaml）；而英国人与美国人则发展出了 Standard ML。这两种方言相当相似。2005 年，Microsoft 推出了它自己的 OCaml 变体，名为 F#。

<!--
Milner received the Turing Award in 1991 in large part for his work on ML.
The [ACM website for his award][turing-milner] includes this praise:
-->

Milner 在 1991 年获得图灵奖，很大程度上正是因为他在 ML 上的工作。ACM 在他的[获奖介绍页面][turing-milner]中给出了这样一段评价：

<!--
> ML was way ahead of its time. It is built on clean and well-articulated
> mathematical ideas, teased apart so that they can be studied
> independently and relatively easily remixed and reused. ML has
> influenced many practical languages, including Java, Scala, and
> Microsoft's F#. Indeed, no serious language designer should ignore this
> example of good design.
-->

> ML 远远走在了它所处时代的前面。它建立在清晰且表达良好的数学思想之上，而这些思想又被巧妙拆解，使它们既可以被独立研究，也可以相对容易地被重新组合与复用。ML 影响了许多实用语言，包括 Java、Scala，以及 Microsoft 的 F#。事实上，任何严肃的语言设计者都不应该忽视这个优秀设计的典范。

[turing-milner]: https://amturing.acm.org/award_winners/milner_1569367.cfm
