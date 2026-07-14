const docs = document.querySelectorAll('section > p');
const term = /【([^】]+?)\|(.+?)】/gu;
const bold = /【(.+?)】/gu;

// 添加术语样式
docs.forEach((el) => {
  let content = el.innerHTML;
  content = content.replace(
    term,
`<div class="term">
  <div class="term-zh">$1</div>
  <div class="term-en">$2</div>
</div>`,
  );
  content = content.replace(bold, "<strong>$1</strong>");
  el.innerHTML = content;
});

// 调整术语大小
const terms = document.getElementsByClassName("term-zh");
for (const term of terms) {
  const len = term.innerText.length;
  console.log(len);
  term.parentElement.style.width = len + "em";
}

// 移除多余的空格
const newline = /(?<=[，。、：；」）】])\n(?!\n)/gu;
// const space = /\s*(<.+?>\p{Script=Han}.*?<\/.+?>)\s*/gu;
const paras = document.querySelectorAll(".doc");
for (const p of paras) {
  p.innerHTML = p.innerHTML.replace(newline, "");
  // p.innerHTML = p.innerHTML.replace(space, "$1");
}
