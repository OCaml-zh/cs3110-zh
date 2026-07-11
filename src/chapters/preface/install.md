<!--
# Installing OCaml
-->

# 安装 OCaml

<!--
If all you need is a way to follow along with the code examples in this book,
you don't actually have to install OCaml! The code on each page is executable in
your browser, as described earlier in this [Preface](about).
-->

如果你只是想跟着这本书里的代码示例一起学习，其实并不一定要安装 OCaml！正如本[前言](about)前面提到的，每一页上的代码都可以直接在浏览器中执行。

<!--
If you want to take it a step further but aren't ready to spend time installing
OCaml yourself, we provide a [virtual machine](../appendix/vm) with OCaml
pre-installed inside a Linux OS.
-->

如果你想再往前走一步，但还没准备好亲自花时间安装 OCaml，我们提供了一个[虚拟机](../appendix/vm)，其中已经在 Linux 操作系统里预装好了 OCaml。

<!--
But if you want to do OCaml development on your own, you'll need to install it
on your machine. There's no universally "right" way to do that. The instructions
below are for Cornell's CS 3110 course, which has goals and needs beyond just
OCaml. Nonetheless, you might find them to be useful even if you're not a
student in the course.
-->

但如果你想自己进行 OCaml 开发，那你就需要把它安装到自己的机器上。这个过程并不存在一种放之四海而皆准的「唯一正确」做法。下面的说明是为康奈尔大学的 CS 3110 课程准备的，而这门课的目标和需求并不只局限于 OCaml 本身。尽管如此，即使你不是这门课的学生，这些说明对你也仍然可能有帮助。

<!--
Here's what we're going to install:
-->

下面是我们将要安装的内容：

<!--
- A Unix development environment
- OPAM, the OCaml Package Manager
- An OPAM *switch* with the OCaml compiler and some packages
- The Visual Studio Code editor, with OCaml support
-->

- 一个 Unix 开发环境
- OPAM，也就是 OCaml 的包管理器
- 一个带有 OCaml 编译器和若干包的 OPAM *switch*
- 带有 OCaml 支持的 Visual Studio Code 编辑器

<!--
The installation process will rely heavily on the *terminal*, or text interface
to your computer.  If you're not too familiar with it, you might want to
brush up with a [terminal tutorial][terminal-tutorial].
-->

整个安装过程会大量依赖终端，也就是你电脑上的文本界面。如果你对它还不太熟悉，建议先补一补这份[终端教程][terminal-tutorial]。

[terminal-tutorial]: https://ubuntu.com/tutorials/command-line-for-beginners

```{tip}
<!--
If this is your first time installing development software, it's worth pointing
out that "close doesn't count": trying to proceed past an error usually just
leads to worse errors, and sadness. That's because we're installing a kind of
tower of software, with each level of the tower building on the previous. If
you're not building on a solid foundation, the whole thing might collapse. The
good news is that if you do get an error, you're probably not alone. A quick
google search will often turn up solutions that others have discovered. Of
course, do think critically about suggestions made by random strangers on the
internet.
-->

如果这是你第一次安装开发软件，那有一点很值得提醒：光「差不多」是不行的。遇到错误还硬着头皮往下走，通常只会带来更糟的错误，以及更多沮丧。这是因为我们正在安装的是一座层层叠起的软件塔，每一层都建立在前一层之上。如果底座不稳，整座塔都可能塌掉。好消息是，如果你真的遇到了错误，往往不是只有你一个人遇到。简单搜一下，通常就能找到别人已经发现的解决方案。当然，对于互联网上陌生人给出的建议，也请保持批判性思考。
```

<!--
Let's get started!
-->

开始吧！

<!--
## Unix Development Environment
-->

## Unix 开发环境

```{important}
<!--
**First, upgrade your OS.** If you've been intending to make any major OS
upgrades, do them now. Otherwise when you do get around to upgrading, you might
have to repeat some or all of this installation process. Better to get it out of
the way beforehand.
-->

**首先，升级你的操作系统。** 如果你原本就打算做一些大的系统升级，那现在就做。否则等你以后真的升级系统时，可能不得不把这套安装流程的一部分甚至全部重来一遍。与其如此，不如现在先把这件事解决掉。
```

<!--
### Linux
-->

### Linux

<!--
If you're already running Linux, you're done with this step. Proceed to
[Install OPAM](install-opam), below.
-->

如果你本来就在使用 Linux，那么这一步已经完成了。请直接跳到下面的 [安装 OPAM](install-opam)。

<!--
### Mac
-->

### Mac

<!--
Beneath the surface, macOS is already a Unix-based OS. But you're going to need
some developer tools and a Unix package manager. There are two to pick from:
[Homebrew][homebrew] and [MacPorts][macports]. From the perspective of this
textbook and CS 3110, it doesn't matter which you choose:
-->

从底层来看，macOS 本来就是一个基于 Unix 的操作系统。但你仍然需要一些开发工具和一个 Unix 包管理器。这里有两个选择：[Homebrew][homebrew] 和 [MacPorts][macports]。从本教材和 CS 3110 的角度看，你选哪个都可以：

<!--
- If you're already accustomed to one, feel free to keep using it. Make sure to
  run its update command before continuing with these instructions.
-->

- 如果你已经习惯使用其中一个，那就继续用它。只要记得在继续下面的说明之前先运行它的更新命令。

<!--
- Otherwise, pick one and follow the installation instructions on its website.
  The installation process for Homebrew is typically easier and faster, which
  might nudge you in that direction. If you do choose MacPorts, make sure to
  follow *all* the detailed instructions on its page, including XCode and an X11
  server. **Do not install both Homebrew and MacPorts**; they aren't meant to
  co-exist. If you change your mind later, make sure to uninstall one before
  installing the other.
-->

- 否则，就选一个，然后按照它官网上的安装说明来做。Homebrew 的安装过程通常更简单也更快，所以你可能会因此更倾向于它。如果你选择 MacPorts，一定要按照它页面上的*所有*详细说明来做，包括 XCode 和 X11 server。**不要同时安装 Homebrew 和 MacPorts**；它们本来就不是设计来共存的。如果你以后改变主意了，也请先卸载一个，再去安装另一个。

<!--
After you've finished installing/updating either Homebrew or MacPorts, proceed
to [Install OPAM](install-opam), below.
-->

等你完成 Homebrew 或 MacPorts 的安装或更新之后，继续往下看[安装 OPAM](install-opam)。

[homebrew]: https://brew.sh/
[macports]: https://www.macports.org/install.php

<!--
### Windows
-->

### Windows

<!--
Unix development in Windows is made possible by the Windows Subsystem for Linux
(WSL). If you have a recent version of Windows (build 20262, released November
2020, or newer), WSL is easy to install. If you don't have that recent of a
version, try running Windows Update to get it.
-->

在 Windows 上进行 Unix 开发，主要依赖 Windows Subsystem for Linux，也就是 WSL。如果你的 Windows 版本比较新（2020 年 11 月发布的 build 20262 或更新版本），那么 WSL 很容易安装。如果你的系统没这么新，先试着运行 Windows Update 升级。

```{tip}
<!--
If you get an error about the "virtual machine" while installing WSL, you might
need to enable virtualization in your machine's BIOS. The instructions for that
are dependent on the manufacturer of your machine. Try googling "enable
virtualization [manufacturer] [model]", substituting for the manufacturer and
model of your machine. This [Red Hat Linux][rh-virt] page might also help.
-->

如果你在安装 WSL 时遇到和「虚拟机」有关的报错，那你可能需要在机器的 BIOS 中启用虚拟化。具体操作取决于你电脑的厂商。可以尝试搜索 `enable virtualization [厂商] [型号]`，把其中的厂商和型号替换成你自己的机器信息。这篇 [Red Hat Linux][rh-virt] 页面也可能会有帮助。
```

<!--
**With a recent version of Windows,** and assuming you've never installed WSL
before, here's all you have to do:
-->

**如果你的 Windows 版本较新，** 并且你以前从未安装过 WSL，那么你只需要做下面这些事：

<!--
- Open Windows PowerShell as Administrator. To do that, click Start, type
  PowerShell, and it should come up as the best match. Click "Run as
  Administrator", and click Yes to allow changes.
-->

- 以管理员身份打开 Windows PowerShell。做法是点击开始菜单，输入 `PowerShell`，它通常会作为最匹配结果出现。点击「以管理员身份运行」，然后点击 「Yes」 允许它进行更改。

<!--
- Run `wsl --install`. (Or, if you have already installed WSL but not Ubuntu
  before, then instead run `wsl --install -d Ubuntu`.) When the Ubuntu download
  is completed, it will likely ask you to reboot. Do so. The installation will
  automatically resume after the reboot.
-->

- 运行 `wsl --install`。（如果你已经安装过 WSL，但还没装过 Ubuntu，那么改为运行 `wsl --install -d Ubuntu`。）Ubuntu 下载完成后，系统很可能会要求你重启。照做即可。重启后安装过程会自动继续。

<!--
- You will be prompted to create a Unix username and password. You can use any
  username and password you wish. It has no bearing on your Windows username and
  password (though you are free to re-use those). Do not put a space in your
  username. Do not forget your password. You will need it in the future.
-->

- 系统会提示你创建一个 Unix 用户名和密码。你可以自行选择任意用户名和密码。它和你的 Windows 用户名与密码没有关系（当然你也可以重复使用它们）。用户名中不要带空格，也不要忘记你的密码，后面还会用到。

```{warning}
<!--
*Do not proceed* with these instructions if you were not prompted to create a
Unix username and password. Something has gone wrong. Perhaps your Ubuntu
installation did not complete correctly. Try uninstalling Ubuntu and
reinstalling it through the Windows Start menu.
-->

如果系统**没有**提示你创建 Unix 用户名和密码，**不要继续**下面的说明。说明某个地方出了问题。很可能是你的 Ubuntu 安装没有正确完成。可以试着卸载 Ubuntu，然后通过 Windows 开始菜单重新安装。
```

<!--
Now skip to the "Ubuntu setup" paragraph below.
-->

现在可以直接跳到下面的 「Ubuntu 设置」 一段。

<!--
**Without a recent version of Windows,** you will need to follow
[Microsoft's manual installation instructions][wsl-manual]. WSL2 is preferred
over WSL1 by OCaml (and WSL2 offers performance and functionality improvements),
so install WSL2 if you can.
-->

**如果你的 Windows 版本不够新，** 那你需要按照 [Microsoft 的手动安装说明][wsl-manual] 来做。对于 OCaml 而言，WSL2 优于 WSL1（而且 WSL2 在性能和功能上也更好），所以只要能装，就尽量装 WSL2。

[wsl-manual]: https://docs.microsoft.com/en-us/windows/wsl/install-manual
[rh-virt]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/virtualization_administration_guide/sect-virtualization-troubleshooting-enabling_intel_vt_and_amd_v_virtualization_hardware_extensions_in_bios

<!--
**Ubuntu setup.** These rest of these instructions assume that you installed
Ubuntu (22.04) as the Linux distribution. That is the default distribution in
WSL. In principle other distributions should work, but might require different
commands from this point forward.
-->

**Ubuntu 设置。** 下面剩余的说明默认你安装的是 Ubuntu（22.04）作为 Linux 发行版。这也是 WSL 的默认发行版。理论上其他发行版也能用，但从这一步开始，命令可能会不同。

<!--
Open the Ubuntu app. (It might already be open if you just finished installing
WSL.) You will be at the *Bash prompt*, which looks something like this:
-->

打开 Ubuntu 应用。（如果你刚刚装完 WSL，它可能已经打开了）你会看到 *Bash 提示符*，它看起来大概像这样：

```console
user@machine:~$
```

```{warning}
<!--
If that prompt instead looks like `root@...#`, something is wrong. Did you
create a Unix username and password for Ubuntu in the earlier step above? If so,
the username in this prompt should be the username you chose back then, not
`root`. *Do not proceed* with these instructions if your prompt looks like
`root@...#`. Perhaps you could uninstall Ubuntu and reinstall it.
-->

如果你的提示符看起来是 `root@...#`，那就说明有问题。你在前面的步骤里有没有为 Ubuntu 创建 Unix 用户名和密码？如果有，那么提示符里显示的用户名应该是你当时选的那个用户名，而不是 `root`。如果你的提示符是 `root@...#`，**不要继续**下面的说明。你可能需要卸载 Ubuntu 再重新安装一次。
```

<!--
In the current version of the Windows terminal, Ctrl+Shift+C will copy and
Ctrl+Shift+V will paste into the terminal. Note that you have to include Shift
as part of that keystroke. In older versions of the terminal, you might need to
find an option in the terminal settings to enable those keyboard shortcuts.
-->

在当前版本的 Windows 终端中，`Ctrl+Shift+C` 用于复制，`Ctrl+Shift+V` 用于粘贴。注意，这里的快捷键必须包含 `Shift`。在较老版本的终端中，你可能需要先到终端设置里找到相关选项，启用这些快捷键。

<!--
Run the following command to update the *APT package manager*, which is what
helps to install Unix packages:
-->

运行下面的命令来更新 *APT 包管理器*，它负责帮助你安装 Unix 软件包：

```console
sudo apt update
```

<!--
You will be prompted for the Unix password you chose. The prefix `sudo` means to
run the command as the administrator, aka "super user". In other words, do this
command as super user, hence, "sudo".
-->

系统会提示你输入刚才设置的 Unix 密码。前缀 `sudo` 的意思是以管理员身份运行这条命令，也就是所谓的「超级用户」（`super user`）。换句话说，就是「以超级用户身份执行这条命令」，因此才叫 `sudo`。

```{warning}
<!--
Running commands with `sudo` is potentially dangerous and should not be done
lightly. Do not get into the habit of putting `sudo` in front of commands, and
do not randomly try it without reason.
-->

使用 `sudo` 运行命令具有潜在危险，不能随便使用。不要养成见命令就加 `sudo` 的习惯，也不要在没有明确理由的情况下乱试。
```

<!--
Now run this command to upgrade all the APT software packages:
-->

现在运行下面这条命令，升级所有通过 APT 安装的软件包：

```console
sudo apt upgrade -y
```

<!--
Then install some useful packages that we will need:
-->

然后安装一些我们接下来会用到的实用软件包：

```console
sudo apt install -y zip unzip build-essential
```

<!--
**File Systems.** WSL has its own filesystem that is distinct from the Windows
file system, though there are ways to access each from the other.
-->

**文件系统。** WSL 有自己独立的文件系统，它和 Windows 文件系统是分开的，不过两边都提供了互相访问的方式。

<!--
- When you launch Ubuntu and get the $ prompt, you are in the WSL file system.
  Your home directory there is named `~`, which is a built-in alias for
  `/home/your_ubuntu_user_name`. You can run `explorer.exe .` (note the dot at
  the end of that) to open your Ubuntu home directory in Windows explorer.
-->

- 当你启动 Ubuntu 并看到 `$` 提示符时，你所在的就是 WSL 文件系统。你的 home 目录叫做 `~`，它是 `/home/your_ubuntu_user_name` 的内置别名。你可以运行 `explorer.exe .`（注意最后那个点）来在 Windows 资源管理器里打开你的 Ubuntu home 目录。

<!--
- From Ubuntu, you can access your Windows home directory at the path
  `/mnt/c/Users/your_windows_user_name/`.
-->

- 在 Ubuntu 中，你可以通过路径 `/mnt/c/Users/your_windows_user_name/` 访问你的 Windows home 目录。

<!--
- From Windows Explorer, you can access your Ubuntu home directory under the
  Linux icon in the left-hand list (near "This PC" and "Network"), then
  navigating to Ubuntu &rarr; `home` &rarr; `your_ubuntu_user_name`. Or you can
  go there directly by typing into the Windows Explorer path bar:
  `\\wsl$\Ubuntu\home\your_ubuntu_user_name`.
-->

- 在 Windows 资源管理器里，你可以在左侧列表中的 Linux 图标下（靠近 「此电脑」 和 「网络」）找到你的 Ubuntu home 目录，然后依次进入 Ubuntu &rarr; `home` &rarr; `your_ubuntu_user_name`。你也可以直接在 Windows 资源管理器的路径栏里输入 `\\wsl$\Ubuntu\home\your_ubuntu_user_name` 进入该目录。

<!--
Practice accessing your Ubuntu and Windows home directories now, and make
sure you can recognize which you are in. For advanced information, see
Microsoft's [guide to Windows and Linux file systems][wsl-fs].
-->

现在就练习一下访问 Ubuntu 和 Windows 的 home 目录，并确保你能分辨自己当前到底在哪一个里。更深入的信息可以参考微软的这份[Windows 与 Linux 文件系统指南][wsl-fs]。

<!--
We recommend storing your OCaml development work in your Ubuntu home directory,
not your Windows home directory. By implication, Microsoft also recommends that
in the guide just linked.
-->

我们建议你把 OCaml 开发相关的工作文件放在 Ubuntu 的 home 目录里，而不是 Windows 的 home 目录里。顺带一提，Microsoft 在刚才那份指南中其实也表达了类似建议。

[wsl-fs]: https://docs.microsoft.com/en-us/windows/wsl/filesystems

<!--
(install-opam)=
## Install OPAM
-->

(install-opam)=
## 安装 OPAM

<!--
**Mac.** If you're using Homebrew, run this command:
-->

**Mac.** 如果你使用的是 Homebrew，运行下面这条命令：

```console
brew install opam
```

<!--
If you're using MacPorts, run this command:
-->

如果你使用的是 MacPorts，运行下面这条命令：

```console
sudo port install opam
```

[opam-install]: https://opam.ocaml.org/doc/Install.html

<!--
**Windows.** Run this command from Ubuntu:
-->

**Windows.** 在 Ubuntu 中运行下面这条命令：

```console
sudo apt install opam
```

<!--
**Linux.** Follow the [instructions for your distribution][opam-install].
-->

**Linux.** 按照[适用于你所用发行版的说明][opam-install]来安装。

<!--
## Initialize OPAM
-->

## 初始化 OPAM

```{warning}
<!--
Do not put `sudo` in front of any `opam` commands. That would break your OCaml
installation.
-->

不要在任何 `opam` 命令前面加 `sudo`。那样会把你的 OCaml 安装环境搞坏。
```

<!--
**Linux, Mac, and WSL2.**  Run:
-->

**Linux、Mac 和 WSL2。** 运行：

```console
opam init --bare -a -y
```

<!--
Don't worry if you get a note about making sure `.profile` is "well-sourced" in `.bashrc`. You don't need to do anything about that.
-->

如果你看到一条提示，说要确保 `.profile` 在 `.bashrc` 中被正确加载，不用担心。你不需要为此做任何事。

<!--
If you get a warning that OPAM is out of date, update it by running:
-->

如果你看到 OPAM 已经过时的警告，就运行下面这条命令更新它：

```console
opam update
```

<!--
**WSL1.** Hopefully you are running WSL2, not WSL1. But on WSL1, run:
-->

**WSL1.** 希望你用的是 WSL2，而不是 WSL1。不过如果你确实在用 WSL1，那就运行：

```console
opam init --bare -a -y --disable-sandboxing
```

<!--
It is necessary to disable sandboxing because of an [issue involving OPAM and
WSL1][bwrap].
-->

之所以需要关闭 sandboxing，是因为 [OPAM 和 WSL1 之间存在一个已知问题][bwrap]。

[bwrap]: https://github.com/ocaml/opam-repository/issues/12050

<!--
## Create an OPAM Switch
-->

## 创建一个 OPAM Switch

<!--
A *switch* is a named installation of OCaml with a particular compiler version
and set of packages. You can have many switches and, well, switch between them
&mdash;whence the name. Create a switch for this semester's CS 3110 by running
this command:
-->

*switch* 是一个带名字的 OCaml 安装环境，其中包含某个特定版本的编译器和一组包。你可以拥有多个 switch，并且在它们之间切换，这也正是这个名字的由来。要为本学期的 CS 3110 创建一个 switch，请运行下面这条命令：

```console
opam switch create cs3110-2026sp ocaml-base-compiler.5.3.0
```

```{tip}
<!--
If that command fails saying that the 5.3.0 compiler can't be found, you
probably installed OPAM sometime back in the past and now need to update it. Do
so with `opam update`.
-->

如果这条命令报错，说找不到 5.3.0 编译器，那很可能是因为你之前很早就安装过 OPAM，现在需要更新它。运行 `opam update` 即可。
```

<!--
You might be prompted to run the next command. It won't matter whether you do or
not, because of the very next step we're going to do (i.e., logging out).
-->

系统可能会提示你运行下一条命令。你现在运行或不运行它都没关系，因为我们接下来马上要做的下一步就是注销登录。

```console
eval $(opam env)
```

<!--
Now we need to make sure your OCaml environment was configured correctly.
**Logout from your OS (or just reboot).** Then re-open your terminal
and run this command:
-->

现在我们需要确认你的 OCaml 环境已经被正确配置。**请从你的操作系统中注销（或者直接重启）。** 然后重新打开终端，运行下面这条命令：

```console
opam switch list
```

<!--
You should get output like this:
-->

你应该会看到类似下面这样的输出：

```
#  switch         compiler
→  cs3110-2026sp  ocaml-base-compiler.5.3.0,ocaml-options-vanilla.1
```

<!--
There might be other lines if you happen to have done OCaml development before. There will be another column named "description" whose contents are not shown here. Double check the following:
-->

如果你以前做过 OCaml 开发，这里可能还会有其他几行。输出中还会有一列叫做 「description」，这里只是没有展示出来。请逐项确认下面几点：

<!--
- You **must not** get a warning that "The environment is not in sync with the
  current switch. You should run `eval $(opam env)`". If either of the two
  issues below also occur, you need to resolve this issue first.
-->

- 你**不能**看到这样一条警告：『The environment is not in sync with the current switch. You should run `eval $(opam env)`』。如果下面另外两个问题中也有任何一个出现，你都必须先把这个问题解决掉。

<!--
- There must be a right arrow in the first column next to the current semester's
  switch.
-->

- 当前学期对应的那个 switch 前面，在第一列里必须有一个右箭头。

<!--
- That switch must have the right name and the right compiler version.
-->

- 这个 switch 的名字和编译器版本也都必须正确。

```{warning}
<!--
If you do get that warning about `opam env`, something is wrong. Your shell is
probably not running the OPAM configuration commands that `opam init` was meant
to install. You could try `opam init --reinit` to see whether that fixes it.
Also, make sure you really did log out of your OS (or reboot).
-->

如果你真的看到了那条关于 `opam env` 的警告，那就说明有问题。你的 shell 很可能没有执行 `opam init` 本来应该帮你装好的那些 OPAM 配置命令。你可以试试 `opam init --reinit`，看看能不能修好。另外，也要确认你确实已经从系统中注销过，或者已经重启过。
```

<!--
Continue by installing the OPAM packages we need:
-->

接下来继续安装我们需要的 OPAM 包：

```console
opam install -y utop odoc ounit2 qcheck bisect_ppx menhir ocaml-lsp-server ocamlformat
```

<!--
Make sure to grab that whole line above when you copy it. You will get some
output about editor configuration. Unless you intend to use Emacs or Vim for
OCaml development, you can safely ignore that output. We're going to use VS Code
as the editor in these instructions, so let's ignore it.
-->

复制上面那条命令时，记得整行都要带上。运行过程中你会看到一些和编辑器配置相关的输出。除非你打算用 Emacs 或 Vim 进行 OCaml 开发，否则这些输出都可以放心忽略。我们接下来的说明会使用 VS Code 作为编辑器，所以这里就先忽略它们。

<!--
You should now be able to launch utop, the OCaml Universal Toplevel.
-->

现在你应该已经可以启动 utop，也就是 OCaml Universal Toplevel 了。

```console
utop
```

```{tip}
<!--
You should see a message "Welcome to utop version ... (using OCaml version
5.3.0)!" If the OCaml version is incorrect, then you probably have an
environment issue. See the tip above about the `opam env` command.
-->

你应该会看到类似 「Welcome to utop version ... (using OCaml version 5.3.0)!」 这样的提示信息。如果显示出来的 OCaml 版本不对，那大概率说明你的环境有问题。请回头查看上面关于 `opam env` 命令的提示。
```

<!--
Enter 3110 followed by two semicolons. Press return. The # is the utop prompt;
you do not type it yourself.
-->

输入 `3110`，后面跟两个分号，然后按回车。这里的 `#` 是 utop 的提示符，不需要你自己输入。

```ocaml
# 3110;;
- : int = 3110
```

<!--
Stop to appreciate how lovely `3110` is. Then quit utop. Note that this time you
must enter the extra # before the quit directive.
-->

停下来欣赏一下 `3110` 这个数字是多么可爱。然后退出 utop。注意，这次在退出指令前你必须额外输入那个 `#`。

```ocaml
# #quit;;
```

<!--
A faster way to quit is to type Control+D.
-->

更快的退出方式是按 `Control+D`。

<!--
## Double-Check OCaml
-->

## 再次检查 OCaml

<!--
If you're having any trouble with your installation, follow these double-check
instructions. Some of them repeat the tips we provided above, but we've put them
all here in one place to help diagnose any issues.
-->

如果你的安装过程中遇到了任何问题，请按照下面这些复查说明逐项检查。这里面有一些内容和上面的提示重复了，但我们把它们集中放在一起，是为了方便你排查问题。

<!--
First, **reboot your computer**. We need a clean slate for this double-check
procedure.
-->

首先，**重启你的电脑**。我们需要一个干净的环境来执行这套复查流程。

<!--
Second, run utop, and make sure it works. If it does not, here are some common
issues:
-->

第二，运行 utop，并确认它能正常工作。如果不能，常见原因有下面这些：

<!--
- **Are you in the right Unix prompt?** On Mac, make sure you are in whatever
  Unix shell is the default for your Terminal: don't run bash or zsh or anything
  else manually to change the shell. On Windows, make sure you are in the Ubuntu
  app, not PowerShell or Cmd.
-->

- **你是不是处在正确的 Unix 提示符里？** 在 Mac 上，请确认你所在的是 Terminal 默认使用的 Unix shell：不要手动再运行 `bash`、`zsh` 或其他命令去切换 shell。在 Windows 上，请确认你打开的是 Ubuntu 应用，而不是 PowerShell 或 Cmd。

<!--
- **Is the OPAM environment set?** If utop isn't a recognized command, run
  `eval $(opam env)` then try running utop again. If utop now works, your login
  shell is somehow not running the right commands to automatically activate the
  OPAM environment; you shouldn't have to manually activate the environment with
  the `eval` command. Probably something went wrong earlier when you ran the
  `opam init` command. To fix it, follow the "redo" instructions below.
-->

- **OPAM 环境有没有正确设置？** 如果系统提示找不到 `utop` 命令，请先运行 `eval $(opam env)`，然后再试一次。如果这时 utop 能跑了，那就说明你的登录 shell 没有正确执行那些本该自动激活 OPAM 环境的命令；按理说你不应该每次都手动用 `eval` 去激活环境。问题多半出在你之前运行 `opam init` 的阶段。要修复它，请按照下面的 「redo」 说明来做。

<!--
- **Is your switch listed?** Run `opam switch list` and make sure a switch named
  `cs3110-2026sp` is listed, that it has the 5.3.0 compiler, and that it is the
  active switch (which is indicated with an arrow beside it). If that switch is
  present but not active, run `opam switch cs3110-2026sp` then see whether utop
  works. If that switch is not present, follow the "redo" instructions below.
-->

- **你的 switch 有没有列出来？** 运行 `opam switch list`，确认列表中有一个叫做 `cs3110-2026sp` 的 switch，确认它使用的是 5.3.0 编译器，并且它是当前激活的 switch（前面会有一个箭头标识）。如果这个 switch 存在但没被激活，就运行 `opam switch cs3110-2026sp`，然后再看 utop 是否能工作。如果这个 switch 根本不存在，就按照下面的 「redo」 说明来做。

<!--
**Redo Instructions:** Remove the OPAM directory by running `rm -r ~/.opam`.
Then go back to the OPAM initialization step in the instructions way above, and
proceed forward. Be extra careful to use the exact OPAM commands given above;
sometimes mistakes occur when parts of them are omitted. Finally, double-check
again: reboot and see whether utop still works.
-->

**Redo 说明：** 运行 `rm -r ~/.opam` 删除 OPAM 目录。然后回到上面说明中 OPAM 初始化那一步，从那里重新往后做。请格外小心，务必要使用上文给出的**完整且准确**的 OPAM 命令；有时候错误就是因为复制时漏掉了其中一部分。最后再复查一次：重启机器，然后看 utop 是否还能正常工作。

```{important}
<!--
You want to get to the point where utop immediately works after a reboot,
without having to type any additional commands.
-->

你最终应该达到这样的状态：重启之后，utop 可以立刻正常工作，而不需要你额外再输入任何命令。
```

<!--
## Visual Studio Code
-->

## Visual Studio Code

<!--
Visual Studio Code is a great choice as a code editor for OCaml. (Though if you
are already a power user of Emacs or Vim those are great, too.)
-->

Visual Studio Code 是一个非常适合用来编写 OCaml 代码的编辑器。（当然，如果你本来就是 Emacs 或 Vim 的重度用户，那它们也同样很棒。）

<!--
First, download and install Visual Studio Code (henceforth, VS Code) following Microsoft's instructions for your OS: [Mac instructions][vscode-mac], [Windows instructions][vscode-win], [Linux instructions][vscode-nix].
-->

首先，按照 Microsoft 针对你的操作系统给出的说明下载并安装 Visual Studio Code（下文简称 VS Code）：[Mac 说明][vscode-mac]、[Windows 说明][vscode-win]、[Linux 说明][vscode-nix]。

```{warning}
<!--
On Mac you must follow Microsoft's instructions to install VS Code in your Applications folder. Skipping those instructions will result in issues that do not become apparent until later. Make sure you get it right now.
-->

在 Mac 上，你**必须**按照 Microsoft 的说明把 VS Code 安装到「应用程序」文件夹，也就是 `Applications` 文件夹中。跳过这一步虽然一开始未必立刻出问题，但后面会暴露出麻烦。现在就把这件事做对。
```

<!--
Launch VS Code. Open the extensions pane, either by going to View &rarr;
Extensions, or by clicking on the icon for it in the column of icons on the left
— it looks like four little squares, the top-right of which is separated from
the other three.
-->

启动 VS Code。打开扩展面板，你可以通过菜单 View &rarr; Extensions 进入，也可以点击左侧图标栏中的对应图标，它看起来像四个小方块，其中右上角那个和另外三个是分开的。

<!--
At various points in the following instructions you will be asked to "open the
Command Palette." To do that, go to View → Command Palette. There is also an
operating system specific keyboard shortcut, which you will see to the right of
the words "Command Palette" in that View menu.
-->

在下面的说明中，你会多次看到「打开命令面板」这个操作。要打开它，请进入 View → Command Palette。不同操作系统也都有相应的快捷键，你可以在 View 菜单中 `Command Palette` 右侧看到它。

<!--
Second, follow one of these steps if you are on Windows or Mac:
-->

第二，如果你使用的是 Windows 或 Mac，请按下面相应的一步来做：

<!--
- **Windows only:** Install the "WSL" extension.
-->

- **仅限 Windows：** 安装 「WSL」 扩展。

<!--
- **Mac only:** Open the Command Palette and type "shell command" to find the
  "Shell Command: Install 'code' command in PATH" command. Run it.
-->

- **仅限 Mac：** 打开命令面板，输入 `shell command`，找到 `Shell Command: Install 'code' command in PATH` 这条命令并运行它。

<!--
Third, regardless of your OS, close any open terminals — or just logout or
reboot — to let the new path settings take effect, so that you will later be
able to launch VS Code from the terminal.
-->

第三，不管你用的是哪种操作系统，都请关闭当前所有已经打开的终端，或者直接注销、重启，让新的 PATH 设置生效。这样后面你才能从终端中启动 VS Code。

<!--
Fourth, on **Windows only**, open the Command Palette and run the command "WSL:
Connect to WSL". (If you're on Mac, skip ahead to the next step.) The first time
you do this, it will install some additional software. After that completes, you
will see a "WSL: Ubuntu" indicator in the bottom-left of the VS Code window.
**Make sure that you see "WSL: Ubuntu" there before proceeding with the next
step below.** If you see just an icon that looks like
<sub>&gt;</sub><sup>&lt;</sup> then click it, and choose "Connect to WSL" from
the Command Palette that opens.
-->

第四，**仅限 Windows**，打开命令面板，并运行 `WSL: Connect to WSL` 这条命令。（如果你用的是 Mac，就直接跳到下一步。）第一次这样做时，它会安装一些额外软件。完成之后，你会在 VS Code 窗口左下角看到一个 `WSL: Ubuntu` 标记。**在继续下一步之前，一定要确认你已经在那里看到了 `WSL: Ubuntu`。** 如果你看到的只是一个像 <sub>&gt;</sub><sup>&lt;</sup> 的图标，就点击它，然后在弹出的命令面板中选择 `Connect to WSL`。

<!--
Fifth, again open the VS Code extensions pane. Search for and install the
**"OCaml Platform"** extension from OCaml Labs. Be careful to install the
extension with *exactly* that name.
-->

第五，再次打开 VS Code 的扩展面板。搜索并安装由 OCaml Labs 提供的 **「OCaml Platform」** 扩展。一定要小心，安装的扩展名必须*完全*就是这个名字。

```{warning}
<!--
The extensions named simply "OCaml" or "OCaml and Reason IDE" are not the right
ones. They are both old and no longer maintained by their developers.
-->

名字只是 「OCaml」 或 「OCaml and Reason IDE」 的扩展都**不是**正确的那个。它们都已经很老了，而且开发者也不再维护。
```

[vscode]: https://code.visualstudio.com/
[vscode-mac]: https://code.visualstudio.com/docs/setup/mac
[vscode-win]: https://code.visualstudio.com/docs/setup/windows
[vscode-nix]: https://code.visualstudio.com/docs/setup/linux

<!--
## Double-Check VS Code
-->

## 再次检查 VS Code

<!--
Let's make sure VS Code's OCaml support is working.
-->

我们来确认一下 VS Code 的 OCaml 支持是否已经正常工作。

<!--
- Reboot your computer again. (Yeah, that really shouldn't be necessary. But it
  will detect so many potential mistakes now that it's worth the effort.)
-->

- 再重启一次电脑。（是的，这本来确实不该成为必要步骤。但它现在能帮你暴露出很多潜在错误，所以还是值得做。）

<!--
- Open a fresh new Unix shell. **Windows**: remember that's the Ubuntu, not
  PowerShell or Cmd. **Mac**: remember that you shouldn't be manually switching
  to a different shell by typing `zsh` or `bash`.
-->

- 打开一个全新的 Unix shell。**Windows:** 记住这里指的是 Ubuntu，而不是 PowerShell 或 Cmd。**Mac:** 记住你不应该手动输入 `zsh` 或 `bash` 去切换成别的 shell。

<!--
- Navigate to a directory of your choice, preferably a subdirectory of your home
  directory. For example, you might create a directory for your 3110 work inside
  your home directory:
  ```console
  mkdir ~/3110
  cd ~/3110
  ```
  In that directory open VS Code by running:
  ```console
  code .
  ```
  Go to File &rarr; New File. Save the file with the name `test.ml`. VS Code
  should give it an orange camel icon.
-->

- 进入一个你自己选择的目录，最好是你主目录下面的某个子目录。比如，你可以在主目录里专门建一个用于 3110 的目录：
  ```console
  mkdir ~/3110
  cd ~/3110
  ```
  然后在这个目录中运行下面的命令打开 VS Code：
  ```console
  code .
  ```
  接着进入 File &rarr; New File。把文件保存为 `test.ml`。VS Code 应该会给它显示一个橙色的小骆驼图标。

<!--
- Type the following OCaml code then press Return/Enter:
  ```ocaml
  let x : int = 3110
  ```
  As you type, VS Code should colorize the syntax, suggest some completions, and
  add a little annotation above the line of code. Try changing the `int` you
  typed to `string`. A squiggle should appear under `3110`. Hover over it to see
  the error message. Go to View &rarr; Problems to see it there, too. Add double
  quotes around the integer to make it a string, and the problem will go away.
-->

- 输入下面这段 OCaml 代码，然后按回车：
  ```ocaml
  let x : int = 3110
  ```
  当你输入时，VS Code 应该会给代码做语法高亮、给出一些自动补全建议，并在代码行上方添加一条小注释。试着把你输入的 `int` 改成 `string`。这时 `3110` 下方应该会出现波浪线。把鼠标移上去，你会看到错误信息。你也可以进入 View &rarr; Problems，在那里查看同样的错误。然后给这个整数加上双引号，把它变成字符串，问题就会消失。

<!--
**If you don't observe those behaviors,** something is wrong with your
installation. Here's how to proceed:
-->

**如果你没有观察到这些行为，** 那说明你的安装有问题。接下来请这样排查：

<!--
- Make sure that, from the same Unix prompt as which you launched VS Code, you
  can successfully complete the double-check instructions for your OPAM switch:
  Can you run utop? Is the right switch active? If not, that's the problem you
  need to solve first. Then return to the VS Code issue. It might be fixed now.
-->

- 请确认：在你启动 VS Code 的**同一个** Unix 提示符里，你能够顺利完成前面针对 OPAM switch 的复查说明。你能运行 utop 吗？正确的 switch 是激活状态吗？如果不是，那就先解决这个问题。之后再回来看 VS Code 的问题，它可能已经跟着好了。

<!--
- Make sure that you are on the most current version of VS Code. Run the VS Code palette command "Code: Check for Updates". If you cannot get VS Code to update and you are on Mac, make sure that you followed Microsoft's instructions to install VS Code in your Application folder.
-->

- 请确认你使用的是最新版本的 VS Code。运行 VS Code 命令面板里的 `Code: Check for Updates` 命令。如果你在 Mac 上无法成功更新 VS Code，请确认你是否确实按照 Microsoft 的说明把 VS Code 安装到了 `Applications` 文件夹中。

<!--
- If you're on WSL and VS Code does add syntax highlighting but does not add squiggles as described above, and/or you get an error about "Sandbox initialization failed", then double-check that you see a "WSL" indicator in the bottom left of the VS Code window. If you do, make sure that the "OCaml Platform" extension is installed. If you do not, make sure you installed the "WSL" extension as described above, and that you are launching VS Code from Ubuntu rather than PowerShell or from the Windows GUI.
-->

- 如果你在 WSL 环境中，VS Code 虽然提供了语法高亮，但没有像上面描述的那样出现波浪线，或者你看到了 「Sandbox initialization failed」 的错误，那么请再次确认 VS Code 窗口左下角是否有 「WSL」 标记。如果有，请确认 「OCaml Platform」 扩展已经安装。如果没有，请确认你已经按前面的说明安装了 「WSL」 扩展，并且你是从 Ubuntu 中启动 VS Code，而不是从 PowerShell 或 Windows 图形界面里启动的。

<!--
**If you're still stuck with an issue,** try uninstalling VS Code, rebooting,
and re-doing all the installation instructions above from scratch. Pay close
attention to any warnings or errors.
-->

**如果你仍然卡在某个问题上，** 那就试试卸载 VS Code、重启电脑，然后从头重新做一遍上面的所有安装步骤。过程中要特别留意每一条 warning 或 error。

```{warning}
<!--
While troubleshooting any VS Code issues, **do not hardcode any paths** in the
VS Code settings file, despite any advice you might find online. That is a
band-aid, not a cure of whatever the underlying problem really is. More than
likely, the real problem is an OCaml environment issue that you can investigate
with the OCaml double-check instructions above.
-->

在排查任何 VS Code 问题时，**不要在** VS Code 的设置文件里**硬编码任何路径**，无论你在网上看到什么建议。那只是创可贴，不是真正解决底层问题的办法。更大的可能是，真正的问题仍然出在 OCaml 环境本身，而你应该用上面那套 OCaml 复查说明去查。
```

<!--
## VS Code Settings
-->

## VS Code 设置

<!--
We recommend tweaking a few editor settings. Open the user settings JSON file by
(i) going to View → Command Palette, (ii) typing "user settings json", and (iii)
selecting Open User Settings (JSON). You will see a JSON file that might already have some settings in it. If so, it will look like this:
-->

我们建议你微调一下几个编辑器设置。打开用户设置 JSON 文件的方法是：1. 进入 View → Command Palette；2. 输入 `user settings json`；3. 选择 `Open User Settings (JSON)`。你会看到一个 JSON 文件，其中可能已经有一些现有设置。如果有，它大概会长这样：

```
{
  (your pre-existing settings here)
}
```

<!--
Add these new settings into that outermost set of braces:
-->

把下面这些新设置加到最外层那对花括号里面：

```
{
  "[ocaml][ocaml.interface]": {
    "editor.tabSize": 2,
    "editor.rulers": [ 80 ],
    "editor.formatOnSave": true
  },
  (your pre-existing settings here)
}
```

<!--
Save the file and close the tab.
-->

保存文件，然后关闭这个标签页。

<!--
## Using VS Code Collaboratively
-->

## 在 VS Code 中协作

<!--
VS Code's Live Share extension makes it easy and fun to collaborate
on code with other humans. You can edit code together like collaborating inside
a Google Doc. It even supports a shared voice channel, so there's no need to
spin up a separate Zoom call. To install and use Live Share, follow
[Microsoft's tutorial][liveshare].
-->

VS Code 的 Live Share 扩展让你和其他真人一起协作写代码变得既简单又有趣。你们可以像在 Google Doc 里协作一样一起编辑代码。它甚至还支持共享语音频道，因此没有必要再单独开一个 Zoom 会议。要安装并使用 Live Share，请按照 [Microsoft 的教程][liveshare] 操作。

<!--
If you are a Cornell student, log in with your Microsoft account, not GitHub.
Enter your Cornell NetID email, e.g., `your_netid@cornell.edu`. That will take
you to Cornell's login site. Use the password associated with your NetID.
-->

如果你是康奈尔大学的学生，请使用你的 Microsoft 账号登录，而不是 GitHub 账号。输入你的 Cornell NetID 邮箱，例如 `your_netid@cornell.edu`。系统会把你带到康奈尔的登录页面。请使用与你的 NetID 关联的密码登录。

[liveshare]: https://learn.microsoft.com/en-us/visualstudio/liveshare/
