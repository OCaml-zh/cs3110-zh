<!--
# Better Programming Through OCaml
-->

# 通过 OCaml 学会更好的程序设计

<!--
Do you already know how to program in a mainstream language like Python or Java?
Good. This book is for you. It's time to learn how to program better. It's time
to learn a functional language, OCaml.
-->

你已经会用 Python 或 Java 这样的主流语言编程了吗？很好。这本书就是写给你的。现在是时候学习如何写出更好的程序了。现在也是时候学习一门函数式语言：OCaml。

{{ video_embed | replace("%%VID%%", "MUcka_SvhLw")}}

<!--
Functional programming provides a different perspective on programming than what
you have experienced so far. Adapting to that perspective requires letting go
of old ideas: assignment statements, loops, classes and objects, among others.
That won't be easy.
-->

函数式编程为程序设计提供了一种与你至今所接触到的完全不同的视角。要适应这种视角，你就必须放下一些旧观念：赋值语句、循环、类、对象，等等。这不会是一件轻松的事。

<!--
> <i>Nan-in (南隠), a Japanese master during the Meiji era (1868-1912), received a
> university professor who came to inquire about Zen. Nan-in served tea. He
> poured his visitor's cup full, and then kept on pouring. The professor watched
> the overflow until he no longer could restrain himself. "It is overfull. No
> more will go in!" "Like this cup," Nan-in said, "you are full of your own
> opinions and speculations. How can I show you Zen unless you first empty your
> cup?"</i>
-->

> <i>南隐（Nan-in，南隠）是明治时代（1868–1912）的一位日本禅师。有一次，一位大学教授前来向他请教禅。南隐为他奉茶，把客人的茶杯倒满之后，却仍继续往里倒。教授眼看茶水溢出，终于忍不住说道：「已经满了，再也倒不进去了！」南隐说：「就像这只杯子一样，你的心中装满了自己的意见和臆测。如果你不先把杯子倒空，我又怎么能向你展示禅呢？」</i>

<!--
I believe that learning OCaml will make you a better programmer. Here's why:
-->

我相信，学习 OCaml 会让你成为一名更好的程序员。原因如下：

<!--
- You will experience the freedom of *immutability*, in which the values of
  so-called "variables" cannot change. Goodbye, debugging.
-->

- 你将体验到*不可变性*的自由：也就是那些所谓「变量」的值其实不能改变。再见了，调试。

<!--
- You will improve at *abstraction*, which is the practice of avoiding
  repetition by factoring out commonality. Goodbye, bloated code.
-->

- 你将提升自己在*抽象*方面的能力，也就是通过抽取共性来避免重复。再见了，臃肿的代码。

<!--
- You will be exposed to a *type system* that you will at first hate because it
  rejects programs you think are correct. But you will come to love it, because
  you will humbly realize it was right and your programs were wrong. Goodbye,
  failing tests.
-->

- 你将接触到一种*类型系统*。一开始你会讨厌它，因为它会拒绝那些你自以为正确的程序。但之后你会爱上它，因为你会谦逊地意识到：它是对的，而你的程序是错的。再见了，失败的测试。

<!--
- You will be exposed to some of the *theory and implementation of programming
  languages*, helping you to understand the foundations of what you are saying
  to the computer when you write code. Goodbye, mysterious and magic
  incantations.
-->

- 你还将接触到一些*编程语言的理论与实现*，从而帮助你理解：当你写代码时，你究竟是在以什么样的基础对计算机说话。再见了，神秘又像咒语一样的写法。

<!--
All of those ideas can be learned in other contexts and languages. But OCaml
provides an incredible opportunity to bundle them all together. **OCaml will
change the way you think about programming.**
-->

所有这些思想当然也可以在别的语境和别的语言中学到。但 OCaml 提供了一个惊人的机会，把它们打包在一起交给你。**OCaml 会改变你思考程序设计的方式。**

<!--
```{epigraph}
"A language that doesn't affect the way you think about programming is not worth
knowing."

-- Alan J. Perlis (1922-1990), first recipient of the Turing Award
```
-->

```{epigraph}
「如果一门语言不能改变你对程序设计思维方式，就不值得学习。」

-- Alan J. Perlis（1922–1990），首位图灵奖得主
```

<!--
Moreover, OCaml is beautiful. OCaml is elegant, simple, and graceful. Aesthetics
do matter. Code isn't written just to be executed by machines. It's also written
to communicate to humans. Elegant code is easier to read and maintain. It isn't
necessarily easier to write.
-->

此外，OCaml 本身也是美的。OCaml 优雅、简洁而流畅。审美确实重要。代码写出来并不只是为了让机器执行，它同样也是写给人看的。优雅的代码更容易阅读，也更容易维护。只是它不一定更容易写出来。

<!--
The OCaml code you write can be stylish and tasteful. At first, this might not
be apparent. You are learning a new language after all&mdash;you wouldn't expect
to appreciate Sanskrit poetry on day 1 of Introductory Sanskrit. In fact, you'll
likely feel frustrated for a while as you struggle to express yourself in a new
language. So give it some time. After you've mastered OCaml, you might be
surprised at how ugly those other languages you already know end up feeling when
you return to them.
-->

你写出来的 OCaml 代码可以很有风格，也可以很有品味。起初这一点也许并不明显。毕竟你是在学习一门新语言；就像你不会指望自己在梵语入门课第一天就懂得欣赏梵语诗歌一样。事实上，在努力用一门新语言表达自己的过程中，你大概会有一段时间感到挫败。所以，给它一点时间吧。等你真正掌握了 OCaml，再回头去看那些你原本已经会用的语言时，你也许会惊讶地发现：它们怎么竟然显得这么丑。
