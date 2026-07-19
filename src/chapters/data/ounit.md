<!--
# Unit Testing with OUnit
-->

# 使用 OUnit 进行单元测试

```{note}
<!--
This section is a bit of a detour from our study of data types, but it's a good
place to take the detour: we now know just enough to understand how unit testing
can be done in OCaml, and there's no good reason to wait any longer to learn
about it.
-->

本节是我们学习数据类型过程中的一个小插曲，但这是一个合适的插曲位置：
我们现在已经掌握了足够的知识来理解如何在 OCaml 中进行单元测试，
没有理由再推迟学习它了。
```

<!--
Using the toplevel to test functions will only work for very small programs.
Larger programs need *test suites* that contain many *unit tests* and can be
re-run every time we update our code base. A unit test is a test of one small
piece of functionality in a program, such as an individual function.
-->

使用顶层环境测试函数只适用于非常小的程序。
较大的程序需要包含许多【单元测试|Unit Test】的【测试套件|Test Suite】，
并且可以在每次更新代码库时重新运行。
单元测试是对程序中一小部分功能的测试，例如单个函数。

<!--
We've now learned enough features of OCaml to see how to do unit testing with a
library called OUnit. It is a unit testing framework similar to JUnit in Java,
HUnit in Haskell, etc. The basic workflow for using OUnit is as follows:
-->

我们现在已经学习了足够的 OCaml 特性，可以了解如何使用名为 OUnit 的库进行单元测试。
它是一个类似于 Java 中的 JUnit、Haskell 中的 HUnit 等的单元测试框架。
使用 OUnit 的基本工作流程如下：

<!--
* Write a function in a file `f.ml`. There could be many other functions in that
  file too.
-->

* 在文件 `f.ml` 中编写一个函数。该文件中也可以有其他许多函数。

<!--
* Write unit tests for that function in a separate file `test.ml`. That exact
  name is not actually essential.
-->

* 在单独的文件 `test.ml` 中为该函数编写单元测试。这个确切的名称实际上并不是必需的。

<!--
* Build and run `test` to execute the unit tests.
-->

* 构建并运行 `test` 以执行单元测试。

<!--
The [OUnit documentation][ounitdoc] is available on GitHub.
-->

[OUnit 文档][ounitdoc]可在 GitHub 上获取。

[ounitdoc]: https://gildor478.github.io/ounit/ounit2/index.html

## OUnit 示例

<!--
The following example shows you how to create an OUnit test suite. There are
some things in the example that might at first seem mysterious; they are
discussed in the next section.
-->

以下示例展示了如何创建 OUnit 测试套件。
示例中有些内容起初可能看起来有些神秘；这些将在下一节中讨论。

<!--
Create a new directory. In that directory, create a file named `sum.ml`, and put
the following code into it:
-->

创建一个新目录。在该目录中，创建一个名为 `sum.ml` 的文件，并将以下代码放入其中：

```ocaml
let rec sum = function
  | [] -> 0
  | x :: xs -> x + sum xs
```

<!--
Now create a second file named `test.ml`, and put this code into it:
-->

现在创建第二个名为 `test.ml` 的文件，并将以下代码放入其中：

```ocaml
open OUnit2
open Sum

let tests = "test suite for sum" >::: [
  "empty" >:: (fun _ -> assert_equal 0 (sum []));
  "singleton" >:: (fun _ -> assert_equal 1 (sum [1]));
  "two_elements" >:: (fun _ -> assert_equal 3 (sum [1; 2]));
]

let _ = run_test_tt_main tests
```

<!--
Depending on your editor and its configuration, you probably now see some
"Unbound module" errors about OUnit2 and Sum. Don't worry; the code is actually
correct. We just need to set up dune and tell it to link OUnit. Create a `dune`
file and put this in it:
-->

根据你的编辑器及其配置，你现在可能会看到一些关于 OUnit2 和 Sum 的「未绑定模块」错误。
别担心；代码实际上是正确的。我们只需要设置 dune 并告诉它链接 OUnit。
创建一个 `dune` 文件并放入以下内容：

```text
(executable
 (name test)
 (libraries ounit2))
```

<!--
And create a `dune-project` file as usual:
-->

并像往常一样创建一个 `dune-project` 文件：

```text
(lang dune 3.4)
```

<!--
Now build the test suite:
-->

现在构建测试套件：

```console
$ dune build test.exe
```

<!--
Go back to your editor and do anything that will cause it to revisit `test.ml`.
You can close and re-open the window, or make a trivial change in the file
(e.g., add then delete a space). Now the errors should all disappear.
-->

回到你的编辑器，执行任何会让它重新加载 `test.ml` 的操作。
你可以关闭并重新打开窗口，或者在文件中做一个小改动（例如，添加然后删除一个空格）。
现在所有错误应该都消失了。

<!--
Finally, you can run the test suite:
-->

最后，你可以运行测试套件：

```console
$ dune exec ./test.exe
```

<!--
You will get a response something like this:
-->

你将得到类似这样的响应：

```text
...
Ran: 3 tests in: 0.12 seconds.
OK
```

<!--
Now suppose we modify `sum.ml` to introduce a bug by changing the code
in it to the following:
-->

现在假设我们修改 `sum.ml`，通过将代码更改为以下内容来引入一个错误：

```ocaml
let rec sum = function
  | [] -> 1 (* bug *)
  | x :: xs -> x + sum xs
```

<!--
If rebuild and re-execute the test suite, all test cases now fail. The output
tells us the names of the failing cases. Here's the beginning of the output, in
which we've replaced some strings that will be dependent on your own local
computer with `...`:
-->

如果重新构建并执行测试套件，所有测试用例现在都会失败。
输出会告诉我们失败用例的名称。
以下是输出的开头部分，其中我们将依赖于你本地计算机的一些字符串替换为 `...`：

```
FFF
==============================================================================
Error: test suite for sum:2:two_elements.

File ".../_build/oUnit-test suite for sum-...#01.log", line 9, characters 1-1:
Error: test suite for sum:2:two_elements (in the log).

Raised at OUnitAssert.assert_failure in file "src/lib/ounit2/advanced/oUnitAssert.ml", line 45, characters 2-27
Called from OUnitRunner.run_one_test.(fun) in file "src/lib/ounit2/advanced/oUnitRunner.ml", line 83, characters 13-26

not equal
------------------------------------------------------------------------------
```

<!--
The first line of that output
-->

该输出的第一行

```
FFF
```

<!--
tells us that OUnit ran three test cases and all three <u>f</u>ailed.
-->

告诉我们 OUnit 运行了三个测试用例，全部<u>失败</u>了。

<!--
The next interesting line
-->

下一个有趣的行

```
Error: test suite for sum:2:two_elements.
```

<!--
tells us that in the test suite named `test suite for sum` the test case at
index 2 named `two_elements` failed. The rest of the output for that test case
is not particularly interesting; let's ignore it for now.
-->

告诉我们，在名为 `test suite for sum` 的测试套件中，
索引为 2 的名为 `two_elements` 的测试用例失败了。
该测试用例的其余输出并不特别有趣；我们暂时忽略它。

## OUnit 示例解释

<!--
Let's study more carefully what we just did in the previous section. In the test
file, `open OUnit2` brings into scope the many definitions in OUnit2, which is
version 2 of the OUnit framework. And `open Sum` brings into scope the
definitions from `sum.ml`. We'll learn more about scope and the `open` keyword
later in a later chapter.
-->

让我们更仔细地研究一下上一节中所做的内容。在测试文件中，
`open OUnit2` 将 OUnit2 中的许多定义引入【作用域|Scope】，这是 OUnit 框架的版本 2。
`open Sum` 将 `sum.ml` 中的定义引入作用域。
我们将在后面的章节中学习更多关于作用域和 `open` 关键字的内容。

<!--
Then we created a list of test cases:
-->

然后我们创建了一个测试用例列表：

```ocaml
[
  "empty"  >:: (fun _ -> assert_equal 0 (sum []));
  "one"    >:: (fun _ -> assert_equal 1 (sum [1]));
  "onetwo" >:: (fun _ -> assert_equal 3 (sum [1; 2]));
]
```

<!--
Each line of code is a separate test case.  A test case has a string giving it a
descriptive name, and a function to run as the test case.  In between the name
and the function we write `>::`, which is a custom operator defined by the OUnit
framework.  Let's look at the first function from above:
-->

每一行代码都是一个独立的测试用例。一个测试用例有一个描述性的名称字符串，
以及一个作为测试用例运行的函数。在名称和函数之间我们写 `>::`，
这是 OUnit 框架定义的自定义运算符。让我们看一下上面的第一个函数：

```
fun _ -> assert_equal 0 (sum [])
```

<!--
Every test case function receives as input a parameter that OUnit calls a *test
context*. Here (and in many of the test cases we write) we don't actually need
to worry about the context, so we use the underscore to indicate that the
function ignores its input. The function then calls `assert_equal`, which is a
function provided by OUnit that checks to see whether its two arguments are
equal. If so the test case succeeds. If not, the test case fails.
-->

每个测试用例函数都接收一个 OUnit 称为*测试上下文*的参数作为输入。
在这里（以及在我们编写的许多测试用例中），我们实际上不需要担心上下文，
所以我们使用下划线来表示函数忽略其输入。
然后函数调用 `assert_equal`，这是 OUnit 提供的一个函数，
用于检查其两个参数是否相等。如果相等，测试用例成功。如果不相等，测试用例失败。

<!--
Then we created a test suite:
-->

然后我们创建了一个测试套件：

```ocaml
let tests = "test suite for sum" >::: [
  "empty" >:: (fun _ -> assert_equal 0 (sum []));
  "singleton" >:: (fun _ -> assert_equal 1 (sum [1]));
  "two_elements" >:: (fun _ -> assert_equal 3 (sum [1; 2]));
]
```

<!--
The `>:::` operator is another custom OUnit operator. It goes between the name
of the test suite and the list of test cases in that suite.
-->

`>:::` 运算符是另一个自定义 OUnit 运算符。它位于测试套件的名称和该套件中的测试用例列表之间。

<!--
Then we ran the test suite:
-->

然后我们运行了测试套件：

```ocaml
let _ = run_test_tt_main tests
```

<!--
The function `run_test_tt_main` is provided by OUnit. It runs a test suite and
prints the results of which test cases passed vs. which failed to standard
output. The use of `let _ = ` here indicates that we don't care what value the
function returns; it just gets discarded.
-->

函数 `run_test_tt_main` 由 OUnit 提供。它运行测试套件，
并将哪些测试用例通过、哪些失败的结果打印到标准输出。
这里使用 `let _ = ` 表示我们不关心函数返回什么值；它被丢弃了。

## 改进 OUnit 输出

<!--
In our example with the buggy implementation of `sum`, we got the following
output:
-->

在我们包含错误实现的 `sum` 的示例中，我们得到了以下输出：

```
==============================================================================
Error: test suite for sum:2:two_elements.
...
not equal
------------------------------------------------------------------------------
```

<!--
The `not equal` in the OUnit output means that `assert_equal` discovered the two
values passed to it in that test case were not equal. That's not so informative:
we'd like to know *why* they're not equal. In particular, we'd like to know what
the actual output produced by `sum` was for that test case. To find out, we need
to pass an additional argument to `assert_equal`. That argument, whose label is
`printer`, should be a function that can transform the outputs to strings. In
this case, the outputs are integers, so `string_of_int` from the `Stdlib` module
will suffice. We modify the test suite as follows:
-->

OUnit 输出中的 `not equal` 意味着 `assert_equal` 发现该测试用例中传递给它的两个值不相等。
这信息量不大：我们想知道它们*为什么*不相等。
特别是，我们想知道 `sum` 在该测试用例中实际产生了什么输出。
为了找到答案，我们需要向 `assert_equal` 传递一个额外的参数。
该参数的标签是 `printer`，应该是一个可以将输出转换为字符串的函数。
在这种情况下，输出是整数，所以 `Stdlib` 模块中的 `string_of_int` 就足够了。
我们按如下方式修改测试套件：

```ocaml
let tests = "test suite for sum" >::: [
  "empty" >:: (fun _ -> assert_equal 0 (sum []) ~printer:string_of_int);
  "singleton" >:: (fun _ -> assert_equal 1 (sum [1]) ~printer:string_of_int);
  "two_elements" >:: (fun _ -> assert_equal 3 (sum [1; 2]) ~printer:string_of_int);
]
```

<!--
And now we get more informative output:
-->

现在我们得到了更有信息量的输出：

```
==============================================================================
Error: test suite for sum:2:two_elements.
...
expected: 3 but got: 4
------------------------------------------------------------------------------
```

<!--
That output means that the test named `two_elements` asserted the equality of
`3` and `4`. The expected output was `3` because that was the first input to
`assert_equal`, and that function's specification says that in
`assert_equal x y`, the output you (as the tester) are expecting to get should
be `x`, and the output the function being tested actually produces should be
`y`.
-->

该输出意味着名为 `two_elements` 的测试断言了 `3` 和 `4` 相等。
期望输出是 `3`，因为那是 `assert_equal` 的第一个输入，
该函数的规范说明在 `assert_equal x y` 中，
你（作为测试者）期望得到的输出应该是 `x`，
而被测试函数实际产生的输出应该是 `y`。

<!--
Notice how our test suite is accumulating a lot of redundant code. In
particular, we had to add the `printer` argument to several lines. Let's improve
that code by factoring out a function that constructs test cases:
-->

请注意我们的测试套件正在积累大量冗余代码。
特别是，我们不得不在多行中添加 `printer` 参数。
让我们通过提取一个构造测试用例的函数来改进该代码：

```ocaml
let make_sum_test name expected_output input =
  name >:: (fun _ -> assert_equal expected_output (sum input) ~printer:string_of_int)

let tests = "test suite for sum" >::: [
  make_sum_test "empty" 0 [];
  make_sum_test "singleton" 1 [1];
  make_sum_test "two_elements" 3 [1; 2];
]
```

<!--
For output types that are more complicated than integers, you will end up
needing to write your own functions to pass to `printer`. This is similar to
writing `toString()` methods in Java: for complicated types you invent yourself,
the language doesn't know how to render them as strings. You have to provide the
code that does it.
-->

对于比整数更复杂的输出类型，你最终需要编写自己的函数传递给 `printer`。
这类似于在 Java 中编写 `toString()` 方法：
对于你自己发明的复杂类型，语言不知道如何将它们渲染为字符串。
你必须提供完成此任务的代码。

## 异常测试

<!--
We have a little more of OCaml to learn before we can see how to test for
exceptions. You can peek ahead to [the section on exceptions](exceptions) if you
want to know now.
-->

在我们了解如何测试【异常|Exception】之前，还需要再学习一些 OCaml 知识。
如果你现在就想知道，可以提前查看[异常章节](exceptions)。

## 测试驱动开发

<!--
Testing doesn't have to happen strictly after you write code. In *test-driven
development* (TDD), testing comes first! It emphasizes *incremental* development
of code: there is always something that can be tested. Testing is not something
that happens after implementation; instead, *continuous testing* is used to
catch errors early. Thus, it is important to develop unit tests immediately when
the code is written. Automating test suites is crucial so that continuous
testing requires essentially no effort.
-->

测试不必严格在编写代码之后进行。
在【测试驱动开发|Test-Driven Development】（TDD）中，测试优先！
它强调代码的*增量*开发：总是有可以测试的东西。
测试不是在实现之后才发生的事情；
相反，*持续测试*被用来尽早捕获错误。
因此，在编写代码时立即开发单元测试非常重要。
自动化测试套件至关重要，这样持续测试基本上不需要任何努力。

<!--
Here's an example of TDD. We deliberately choose an exceedingly simple function
to implement, so that the process is clear. Suppose we are working with a data
type for days:
-->

这是一个 TDD 的例子。我们故意选择一个非常简单的函数来实现，以便过程清晰。
假设我们正在处理一个表示日期的数据类型：

```ocaml
type day = Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday
```

<!--
And we want to write a function `next_weekday : day -> day` that returns
the next weekday after a given day. We start by writing the most basic,
broken version of that function we can:
-->

我们想编写一个函数 `next_weekday : day -> day`，返回给定日期之后的下一个工作日。
我们从编写最基本的、有问题的版本开始：

```ocaml
let next_weekday d = failwith "Unimplemented"
```

```{note}
<!--
The built-in function `failwith` raises an exception along with the error
message passed to the function.
-->
内置函数 `failwith` 会引发一个异常，并附带传递给该函数的错误消息。
```

<!--
Then we write the simplest unit test we can imagine. For example, we know that
the next weekday after Monday is Tuesday. So we add a test:
-->

然后我们编写能想象到的最简单的单元测试。例如，我们知道周一之后的下一个工作日是周二。
所以我们添加一个测试：

```ocaml
let tests = "test suite for next_weekday" >::: [
  "tue_after_mon"  >:: (fun _ -> assert_equal Tuesday (next_weekday Monday));
]
```

<!--
Then we run the OUnit test suite. It fails, as expected. That's good! Now we
have a concrete goal, to make that unit test pass. We revise `next_weekday` to
make that happen:
-->

然后我们运行 OUnit 测试套件。正如预期的那样，它失败了。很好！
现在我们有了一个具体的目标，就是让该单元测试通过。
我们修改 `next_weekday` 来实现这一点：

```ocaml
let next_weekday d =
  match d with
  | Monday -> Tuesday
  | _ -> failwith "Unimplemented"
```

<!--
We compile and run the test; it passes. Time to add some more tests. The
simplest remaining possibilities are tests involving just weekdays, rather than
weekends. So let's add tests for weekdays.
-->

我们编译并运行测试；它通过了。是时候添加更多测试了。
最简单的剩余可能性是只涉及工作日而非周末的测试。所以让我们为工作日添加测试。

```ocaml
let tests = "test suite for next_weekday" >::: [
  "tue_after_mon"  >:: (fun _ -> assert_equal Tuesday (next_weekday Monday));
  "wed_after_tue"  >:: (fun _ -> assert_equal Wednesday (next_weekday Tuesday));
  "thu_after_wed"  >:: (fun _ -> assert_equal Thursday(next_weekday Wednesday));
  "fri_after_thu"  >:: (fun _ -> assert_equal Friday (next_weekday Thursday));
]
```

<!--
We compile and run the tests; many fail. That's good! We add new
functionality:
-->

我们编译并运行测试；许多失败了。很好！我们添加新功能：

```ocaml
  let next_weekday d =
    match d with
    | Monday -> Tuesday
    | Tuesday -> Wednesday
    | Wednesday -> Thursday
    | Thursday -> Friday
    | _ -> failwith "Unimplemented"
```

<!--
We compile and run the tests; they pass. At this point we could move on to
handling weekends, but we should first notice something about the tests we've
written: they involve repeating a lot of code. In fact, we probably wrote them
by copying-and-pasting the first test, then modifying it for the next three.
That's a sign that we should *refactor* the code. (As we did before with the
`sum` function we were testing.)
-->

我们编译并运行测试；它们通过了。此时我们可以继续处理周末，
但我们应该首先注意到我们编写的测试的一些问题：它们涉及大量重复代码。
事实上，我们可能是通过复制粘贴第一个测试，然后为接下来的三个修改它来编写的。
这是一个我们应该*【重构|Refactor】*代码的信号。（就像我们之前对正在测试的 `sum` 函数所做的那样。）

<!--
Let's abstract a function that creates test cases for `next_weekday`:
-->

让我们抽象一个为 `next_weekday` 创建测试用例的函数：

```ocaml
let make_next_weekday_test name expected_output input =
  name >:: (fun _ -> assert_equal expected_output (next_weekday input))

let tests = "test suite for next_weekday" >::: [
  make_next_weekday_test "tue_after_mon" Tuesday Monday;
  make_next_weekday_test "wed_after_tue" Wednesday Tuesday;
  make_next_weekday_test "thu_after_wed" Thursday Wednesday;
  make_next_weekday_test "fri_after_thu" Friday Thursday;
]
```

<!--
Now we finish the testing and implementation by handling weekends. First we add
some test cases:
-->

现在我们通过处理周末来完成测试和实现。首先我们添加一些测试用例：

```ocaml
  ...
  make_next_weekday_test "mon_after_fri" Monday Friday;
  make_next_weekday_test "mon_after_sat" Monday Saturday;
  make_next_weekday_test "mon_after_sun" Monday Sunday;
  ...
```

<!--
Then we finish the function:
-->

然后我们完成该函数：

```ocaml
let next_weekday d =
  match d with
  | Monday -> Tuesday
  | Tuesday -> Wednesday
  | Wednesday -> Thursday
  | Thursday -> Friday
  | Friday -> Monday
  | Saturday -> Monday
  | Sunday -> Monday
```

<!--
Of course, most people could write that function without errors even if they
didn't use TDD. But rarely do we implement functions that are so simple.
-->

当然，即使不使用 TDD，大多数人也能无错误地编写该函数。但我们很少实现如此简单的函数。

<!--
**Process.** Let's review the process of TDD:
-->

流程。让我们回顾一下 TDD 的流程：

<!--
- Write a failing unit test case. Run the test suite to prove that the test case
  fails.
-->

- 编写一个失败的单元测试用例。运行测试套件以证明该测试用例失败。

<!--
- Implement just enough functionality to make the test case pass. Run the test
  suite to prove that the test case passes.
-->

- 实现足够的功能以使测试用例通过。运行测试套件以证明该测试用例通过。

<!--
- Improve code as needed. In the example above we refactored the test suite, but
  often we'll need to refactor the functionality being implemented.
-->

- 根据需要改进代码。在上面的例子中我们重构了测试套件，
  但通常我们需要重构正在实现的功能。

<!--
- Repeat until you are satisfied that the test suite provides evidence that your
  implementation is correct.
-->

- 重复直到你满意测试套件提供了你的实现正确的证据。
