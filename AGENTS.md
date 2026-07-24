# 翻译规范

- 按段落翻译，用 `<!--` 和 `-->` 注释掉英文段落后，在下面添加翻译。例如：

  ```
  <!--
  English sentence.
  -->

  中文句子。
  ```

- 英文标题 `##English` 也要注释掉，然后在下面添加翻译，所有的标题都不添加 `【】`。例如：

  ```
  <!--
  ##English Title
  -->

  ##中文标题
  ```

- 像 `**English.**` 这种单独一行的标题也要注释掉，然后在下一段落翻译成 `**中文**`，
- 代码的部分和特殊标记则保留不翻译。
- 全文使用直角引号 `「」` 而非弯引号 `“”` 作为中文引号。
- 术语在正文中第一次出现时，使用 `【中文|English】` 的格式，英文部分使用 Title Case。
    例如 `【类型|Type】`。
- 所有正文中的 `*斜体*` 和 `**粗体**` 术语，都要替换成 `【中文|English】` 的格式，
  例如 `*English*` 和 `**English**` 都要替换成 `【中文|English】`，**记得去掉前后的粗体 `**` 和斜体 `*` 标记！**
  注意要保留 `**` 粗体标记。
  - 错误示范：`*【一阶函数|First-Order Function】*`、`**【抽象原则|Abstraction Principle】**`
  - 正确示范：`【一阶函数|First-Order Function】`、`【抽象原则|Abstraction Principle】`
  - 错误示范 ：`*高阶函数*`
  - 正确示范：`【高阶函数|High-Order Function】`
- 非术语的 `*斜体*` 句子（如强调语气），翻译后变为 `**粗体**`。
- 翻译结果每80个字符左右换行，尽可能在空格或标点符号后换行，尤其注意汉字之间**不要**断行！
- 术语参考项目根目录下的 `GLOSSARY.md` 文件。如果遇到文件中没有的术语，
  请先尝试根据英文进行合理翻译，并在翻译后补充到 `GLOSSARY.md` 文件中。
- 习惯用法上使用「而非」代替「而不是」。
- `summary.md` 中的 "Terms and Concepts" 一节，术语列表统一做成 `| 中文 | 英语 |` 的对照表形式，
  英语使用 Title Case。例如：

  ```
  | 中文 | 英语 |
  | ---- | ---- |
  | 类型 | Type |
  | 模式匹配 | Pattern Matching |
  ```

## 项目结构

- 这是 CS 3110 教材 *OCaml Programming: Correct + Efficient + Beautiful* 的中文翻译项目。
- 构建工具为 [Jupyter Book](https://jupyterbook.org)，源文件格式为 MyST Markdown。
- 所有待翻译的章节在 `src/chapters/` 下，按主题分目录（`basics/`、`data/`、`hop/`、`modules/` 等）。
- 目录结构由 `src/_toc.yml` 定义；书籍配置在 `src/_config.yml`。
- `src/cover.md` 是封面/首页。
- `GLOSSARY.md` 是术语表，翻译时必须同步更新。
