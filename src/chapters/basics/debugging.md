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
# Debugging
-->

# 调试

<!--
Debugging is a last resort when everything else has failed. Let's take a
step back and think about everything that comes *before* debugging.
-->

调试是在其他一切手段都失败之后才采取的最后方案。让我们先退一步，想一想：在调试之前，其实还有哪些事情可以做。

<!--
## Defenses against Bugs
-->

## 对抗 Bug 的防线

<!--
According to
[Rob Miller](https://stellar.mit.edu/S/course/6/fa08/6.005/courseMaterial/topics/topic3/lectureNotes/Debugging/Debugging.pdf),
there are four defenses against bugs:
-->

根据 [Rob Miller](https://stellar.mit.edu/S/course/6/fa08/6.005/courseMaterial/topics/topic3/lectureNotes/Debugging/Debugging.pdf) 的说法，对抗 bug 有四道防线：

<!--
1.  **The first defense against bugs is to make them impossible.**
-->

1. **对抗 bug 的第一道防线，是让 bug 根本不可能出现。**

<!--
    Entire classes of bugs can be eradicated by choosing to program in languages
    that guarantee *[memory
    safety](http://www.pl-enthusiast.net/2014/07/21/memory-safety/)* (that no
    part of memory can be accessed except through a *pointer* (or reference)
    that is valid for that region of memory) and *[type
    safety](http://www.pl-enthusiast.net/2014/08/05/type-safety/)* (that no
    value can be used in a way inconsistent with its type). The OCaml type
    system, for example, prevents programs from buffer overflows and meaningless
    operations (like adding a boolean to a float), whereas the C type system
    does not.
-->

   通过选择那些能够保证[*内存安全*](http://www.pl-enthusiast.net/2014/07/21/memory-safety/) （也就是只有通过对该内存区域有效的*指针*或引用，才能访问其内容）以及[*类型安全*](http://www.pl-enthusiast.net/2014/08/05/type-safety/)（也就是任何值都不能以违反其类型的方式被使用）的语言来编程，整整一大类 bug 都可以被彻底消灭。例如，OCaml 的类型系统能够防止缓冲区溢出和毫无意义的操作（比如把布尔值加到浮点数上），而 C 的类型系统就做不到这一点。

<!--
2.  **The second defense against bugs is to use tools that find them.**
-->

2. **对抗 bug 的第二道防线，是使用能帮你发现它们的工具。**

<!--
    There are automated source-code analysis tools, like
    [FindBugs](http://findbugs.sourceforge.net/), which can find many common
    kinds of bugs in Java programs, and
    [SLAM](http://research.microsoft.com/en-us/projects/slam/), which is used to
    find bugs in device drivers. The subfield of CS known as *formal methods*
    studies how to use mathematics to specify and verify programs, that is, how
    to prove that programs have no bugs. We'll study verification later in this
    course.
-->

   有许多自动化的源代码分析工具，比如 [FindBugs](http://findbugs.sourceforge.net/)，它可以找出 Java 程序中许多常见的 bug；还有 [SLAM](http://research.microsoft.com/en-us/projects/slam/)，它被用来寻找设备驱动中的 bug。计算机科学中有一个叫做*形式化方法*的子领域，研究如何用数学方式来规定和验证程序，也就是如何证明程序没有 bug。我们会在这门课后面学习验证。

<!--
    *Social methods* such as code reviews and pair programming are also useful
    tools for finding bugs. Studies at IBM in the 1970s-1990s suggested that
    code reviews can be remarkably effective. In one study (Jones, 1991), code
    inspection found 65% of the known coding errors and 25% of the known
    documentation errors, whereas testing found only 20% of the coding errors
    and none of the documentation errors.
-->

   代码评审和结对编程这样的*社会性方法*，也是发现 bug 的有用工具。IBM 在 1970 到 1990 年代的研究表明，代码评审的效果可能惊人地好。在其中一项研究（Jones，1991）中，代码检查发现了 65% 已知的编码错误和 25% 已知的文档错误，而测试只发现了 20% 的编码错误，并且一个文档错误都没发现。

<!--
3.  **The third defense against bugs is to make them immediately visible.**
-->

3. **对抗 bug 的第三道防线，是让它们一出现就立刻暴露出来。**

<!--
    The earlier a bug appears, the easier it is to diagnose and fix. If
    computation instead proceeds past the point of the bug, then that further
    computation might obscure where the failure really occurred. *Assertions* in
    the source code make programs "fail fast" and "fail loudly", so that bugs
    appear immediately, and the programmer knows exactly where in the source
    code to look.
-->

   bug 越早暴露，诊断和修复就越容易。如果程序继续越过 bug 所在的位置向前运行，那么之后的计算过程反而可能掩盖真正出错的地方。源代码中的*断言*能让程序「尽早失败」并且「大声失败」，从而让 bug 立刻现形，也让程序员清楚知道源码里该看哪里。

<!--
4.  **The fourth defense against bugs is extensive testing.**
-->

4. **对抗 bug 的第四道防线，是充分测试。**

<!--
    How can you know whether a piece of code has a particular bug? Write tests
    that would expose the bug, then confirm that your code doesn't fail those
    tests. *Unit tests* for a relatively small piece of code, such as an
    individual function or module, are especially important to write at the same
    time as you develop that code. Running of those tests should be automated,
    so that if you ever break the code, you find out as soon as possible.
    (That's really Defense 3 again.)
-->

   你怎么知道一段代码里是否存在某个特定 bug 呢？写出能够暴露这个 bug 的测试，然后确认你的代码不会在这些测试上失败。对较小代码单元（例如某个函数或模块）所写的*单元测试*，尤其应当在开发代码的同时就写出来。这些测试的运行还应当自动化，这样一旦你将来把代码改坏，就能尽早发现。（其实这又回到了第三道防线。）

<!--
After all those defenses have failed, a programmer is forced to resort to
debugging.
-->

当这些防线全都失守之后，程序员才被迫诉诸调试。

<!--
## How to Debug
-->

## 如何调试

<!--
So you've discovered a bug. What next?
-->

那么，当你发现了一个 bug，接下来该怎么办？

<!--
1.  **Distill the bug into a small test case.** Debugging is hard work, but the
    smaller the test case, the more likely you are to focus your attention on
    the piece of code where the bug lurks. Time spent on this distillation can
    therefore be time saved, because you won't have to re-read lots of code.
    Don't continue debugging until you have a small test case!
-->

1. **把 bug 提炼成一个小测试用例。** 调试是很辛苦的工作，但测试用例越小，你的注意力就越可能集中在 bug 藏身的那一小段代码上。因此，花在提炼测试用例上的时间，往往最后会帮你省下更多时间，因为你不必反复重读大量代码。在你得到一个小测试用例之前，不要继续往下调试！

<!--
2.  **Employ the scientific method.** Formulate a hypothesis as to why the bug
    is occurring. You might even write down that hypothesis in a notebook, as if
    you were in a Chemistry lab, to clarify it in your own mind and keep track
    of what hypotheses you've already considered. Next, design an experiment to
    affirm or deny that hypothesis. Run your experiment and record the result.
    Based on what you've learned, reformulate your hypothesis. Continue until
    you have rationally, scientifically determined the cause of the bug.
-->

2. **采用科学方法。** 针对 bug 为什么会出现，先提出一个假设。你甚至可以像在化学实验室里那样，把这个假设写进笔记本里，这样既能帮助你理清思路，也能记录自己已经考虑过哪些假设。接着，设计一个实验去证实或证伪这个假设。运行实验并记录结果。再根据你刚学到的东西，重新修正假设。不断重复，直到你以一种理性、科学的方式确定 bug 的真正成因。

<!--
3.  **Fix the bug.** The fix might be a simple correction of a typo. Or it might
    reveal a design flaw that causes you to make major changes. Consider whether
    you might need to apply the fix to other locations in your code base—for
    example, was it a copy and paste error? If so, do you need to refactor your
    code?
-->

3. **修复 bug。** 修复可能只是改正一个简单的拼写错误；也可能会暴露出一个设计缺陷，从而迫使你做出较大改动。你还要考虑，这次修复是否也需要应用到代码库中的其他地方，比如它是不是一次复制粘贴错误造成的？如果是，那么你是否需要重构代码？

<!--
4.  **Permanently add the small test case to your test suite.** You wouldn't
    want the bug to creep back into your code base. So keep track of that small
    test case by keeping it as part of your unit tests. That way, any time you
    make future changes, you will automatically be guarding against that same
    bug. Repeatedly running tests distilled from previous bugs is a part of
    *regression testing*.
-->

4. **把那个小测试用例永久加入你的测试集。** 你当然不会希望这个 bug 又悄悄回到代码库中。所以，应该把刚才那个小测试用例保留下来，并作为单元测试的一部分。这样一来，无论你未来什么时候修改代码，都会自动地继续防范同一个 bug。反复运行那些从历史 bug 中提炼出来的测试，是*回归测试*的一部分。

<!--
## Debugging in OCaml
-->

## 在 OCaml 中调试

<!--
Here are a couple tips on how to debug&mdash;if you are forced into it&mdash;in
OCaml.
-->

如果你真的被迫进入调试模式，下面有几个关于如何在 OCaml 中调试的小建议。

<!--
- **Print statements.** Insert a print statement to ascertain the value of a
  variable. Suppose you want to know what the value of `x` is in the following
  function:
-->

- **打印语句。** 插入一条打印语句，来确认某个变量的值。假设你想知道下面这个函数中的 `x` 究竟是什么值：

```ocaml
let inc x = x + 1
```

<!--
  Just add the line below to print that value:
-->

  那就只需要加上下面这一行，把这个值打印出来：

```ocaml
let inc x =
  let () = print_int x in
  x + 1
```

<!--
- **Function traces.** Suppose you want to see the *trace* of recursive calls
  and returns for a function. Use the `#trace` directive:
-->

- **函数跟踪。** 假设你想看到一个函数递归调用与返回时的*跟踪轨迹*。可以使用 `#trace` 指令：

```ocaml
# let rec fib x = if x <= 1 then 1 else fib (x - 1) + fib (x - 2);;
# #trace fib;;
```

<!--
  If you evaluate `fib 2`, you will now see the following output:
-->

  现在如果你求值 `fib 2`，就会看到下面的输出：

```text
fib <-- 2
fib <-- 0
fib --> 1
fib <-- 1
fib --> 1
fib --> 2
```

<!--
  To stop tracing, use the `#untrace` directive.
-->

  如果想停止跟踪，就使用 `#untrace` 指令。

<!--
- **Debugger.** OCaml has a debugging tool `ocamldebug`. You can find a
  [tutorial](https://ocaml.org/learn/tutorials/debug.html#The-OCaml-debugger) on
  the OCaml website. Unless you are using Emacs as your editor, you will
  probably find this tool to be harder to use than just inserting print
  statements.
-->

- **调试器。** OCaml 有一个调试工具，叫做 `ocamldebug`。你可以在 OCaml 官网找到一份 [tutorial](https://ocaml.org/learn/tutorials/debug.html#The-OCaml-debugger)。除非你使用 Emacs 作为编辑器，否则你很可能会发现：这个工具还不如直接插几条打印语句来得顺手。

<!--
## Defensive Programming
-->

## 防御式编程

<!--
As we discussed earlier in the section on debugging, one defense against bugs is
to make any bugs (or errors) immediately visible. That idea connects with idea
of preconditions.
-->

正如我们先前在调试那一节中讨论过的，对抗 bug 的一种方式，是让任何 bug（或错误）都能立刻显现出来。而这个思路，和前置条件的概念密切相关。

<!--
Consider this specification of `random_int`:
-->

来看下面这个 `random_int` 的规格：

```ocaml
(** [random_int bound] is a random integer between 0 (inclusive)
    and [bound] (exclusive).  Requires: [bound] is greater than 0
    and less than 2^30. *)
```

<!--
If the client of `random_int` passes a value of `bound` that violates the
"Requires" clause, such as `-1`, the implementation of `random_int` is free to
do anything whatsoever. All bets are off when the client violates the
precondition.
-->

如果 `random_int` 的调用者传入了一个违反 `Requires` 子句的 `bound` 值，比如 `-1`，那么 `random_int` 的实现从此就可以为所欲为。只要调用者违反了前置条件，一切后果都不再有保证。

<!--
But the most helpful thing for `random_int` to do is to immediately expose the
fact that the precondition was violated. After all, chances are that the client
didn't *mean* to violate it.
-->

不过，对 `random_int` 来说，最有帮助的做法是：立刻暴露出「前置条件已被违反」这个事实。毕竟，大多数情况下，调用者并不是*故意*违反它的。

<!--
So the implementor of `random_int` would do well to check whether the
precondition is violated, and if so, raise an exception. Here are three
possibilities of that kind of *defensive programming:*
-->

因此，`random_int` 的实现者最好检查一下前置条件是否被违反；如果被违反了，就抛出一个异常。下面是三种这样的*防御式编程*做法：

```ocaml
(* possibility 1 *)
let random_int bound =
  assert (bound > 0 && bound < 1 lsl 30);
  (* proceed with the implementation of the function *)

(* possibility 2 *)
let random_int bound =
  if not (bound > 0 && bound < 1 lsl 30)
  then invalid_arg "bound";
  (* proceed with the implementation of the function *)

(* possibility 3 *)
let random_int bound =
  if not (bound > 0 && bound < 1 lsl 30)
  then failwith "bound";
  (* proceed with the implementation of the function *)
```

<!--
The second possibility is probably the most informative to the client, because
it uses the built-in function `invalid_arg` to raise the well-named exception
`Invalid_argument`. In fact, that's exactly what the standard library
implementation of this function does.
-->

第二种做法大概对调用者来说信息最充分，因为它使用了内建函数 `invalid_arg`，从而抛出一个名字很贴切的异常 `Invalid_argument`。事实上，这也正是标准库中该函数实现所采用的方式。

<!--
The first possibility is probably most useful when you are trying to debug your
own code, rather than choosing to expose a failed assertion to a client.
-->

第一种做法大概在你调试自己的代码时最有用，而不是在你想把断言失败直接暴露给调用者的时候。

<!--
The third possibility differs from the second only in the name (`Failure`) of
the exception that is raised. It might be useful in situations where the
precondition involves more than just a single invalid argument.
-->

第三种做法和第二种的区别，只在于抛出的异常名字不同：它用的是 `Failure`。在某些场景下，如果前置条件涉及的并不只是某一个单独的非法参数，那么这种做法也许会有用。

<!--
In this example, checking the precondition is computationally cheap. In other
cases, it might require a lot of computation, so the implementer of the function
might prefer not to check the precondition, or only to check some inexpensive
approximation to it.
-->

在这个例子里，检查前置条件的计算成本很低。但在其他情况下，它可能会非常昂贵，因此函数实现者也许会选择根本不检查前置条件，或者只检查一个成本较低的近似条件。

<!--
Sometimes programmers worry unnecessarily that defensive programming will be too
expensive&mdash;either in terms of the time it costs them to implement the
checks initially, or in the run-time costs that will be paid in checking
assertions. These concerns are far too often misplaced. The time and money it
costs society to repair faults in software suggests that we could all afford to
have programs that run a little more slowly.
-->

有时候，程序员会不必要地担心防御式编程太昂贵：要么担心一开始实现这些检查会花太多时间，要么担心运行期检查断言会带来额外成本。但这种顾虑往往是错位的。整个社会为修复软件缺陷所花费的时间与金钱表明：我们其实完全承受得起让程序稍微跑慢一点。

<!--
Finally, the implementer might even choose to eliminate the precondition and
restate it as a postcondition:
-->

最后，实现者甚至可以选择去掉这个前置条件，改把它写成一个后置条件：

```ocaml
(** [random_int bound] is a random integer between 0 (inclusive)
    and [bound] (exclusive).  Raises: [Invalid_argument "bound"]
    unless [bound] is greater than 0 and less than 2^30. *)
```

<!--
Now instead of being free to do whatever when `bound` is too big or too small,
`random_int` must raise an exception. For this function, that's probably the
best choice.
-->

现在，当 `bound` 过大或过小时，`random_int` 就不再能随意做任何事情，而是必须抛出异常。对于这个函数来说，这大概才是最好的选择。

<!--
In this course, we're not going to force you to program defensively. But if
you're savvy, you'll start (or continue) doing it anyway. The small amount of
time you spend coding up such defenses will save you hours of time in debugging,
making you a more productive programmer.
-->

在这门课里，我们不会强迫你一定要做防御式编程。但如果你足够聪明，你自然会开始（或者继续）这样做。你花在这些防线上的那一点点时间，往往会帮你省下几个小时的调试时间，从而让你成为一个更高效的程序员。
