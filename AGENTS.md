# 翻译规范

- 按段落翻译，用 `<!--` 和 `-->` 注释掉英文段落后，在下面添加翻译。例如：

  ```
  <!--
  English sentence.
  -->

  中文句子。
  ```

- 代码的部分则保留不翻译。
- 全文使用直角引号「」而非弯引号“”作为中文引号。
- 术语在正文中第一次出现时，使用 `【中文|English】` 的格式，英文部分使用 Title Case。
    例如 `【类型|Type】`。
- 所有 *斜体* 术语都替换成 `【中文|English】` 的格式。
- Markdown 标题也要注释掉然后翻译，所有的标题都不添加 `【】`。
- 翻译结果每80个字符左右换行，尽可能在空格或标点符号后换行，尤其注意汉字之间**不要**断行！
- 术语参考项目根目录下的 `GLOSSARY.md` 文件。如果遇到文件中没有的术语，
  请先尝试根据英文进行合理翻译，并在翻译后补充到 `GLOSSARY.md` 文件中。
- 习惯用法上使用「而非」代替「而不是」。

# 项目结构

- 这是 CS 3110 教材 *OCaml Programming: Correct + Efficient + Beautiful* 的中文翻译项目。
- 构建工具为 [Jupyter Book](https://jupyterbook.org)，源文件格式为 MyST Markdown。
- 所有待翻译的章节在 `src/chapters/` 下，按主题分目录（`basics/`、`data/`、`hop/`、`modules/` 等）。
- 目录结构由 `src/_toc.yml` 定义；书籍配置在 `src/_config.yml`。
- `src/cover.md` 是封面/首页。
- `GLOSSARY.md` 是术语表，翻译时必须同步更新。

# 构建与验证

- 环境依赖：Python 3.9+、`jupyter-book==0.15.1`、`ghp-import`（见 `requirements.txt` 和 `environment.yml`）。
- 构建 HTML：`make html`（需要 conda 环境 `textbook` 和 OPAM switch `textbook`）。
- CI 构建：`make html-ci`（跳过 notebook 执行，适合纯翻译验证）。
- 严格模式（warnings 当 errors）：`make html-strict`。
- 链接检查：`make linkcheck`。
- 本地预览：`make localserver` 后访问 `http://localhost:8080`。
- 构建产物在 `src/_build/html/`。

# 翻译文件的特殊格式

- 每个 `.md` 文件头部有 YAML frontmatter（jupytext、kernelspec 等），**不要修改**。
- OCaml 代码单元格用 ```` ```{code-cell} ocaml```` 标记，这些是可执行的，翻译时保留原样。
- 普通代码块用 ```` ```ocaml ```` 或 ```` ``` ````，同样不翻译。
- 视频嵌入宏 `{{ video_embed | replace("%%VID%%", "...") }}` 保持原样不动。
- MyST 指令（如 ```` ```{tip} ````、```` ```{warning} ````）保持原样，只翻译其中的文本内容。
- 章节内的 `[videos]:` 等链接引用定义保持原样。
