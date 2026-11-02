const fs = require('fs');
const html = fs.readFileSync('003_ai_md_viewer/ja/index.html', 'utf8');

// Find all matches of theme-cyber
const idxs = [];
let i = -1;
while ((i = html.indexOf('theme-cyber', i + 1)) !== -1) {
  idxs.push(i);
}

console.log('theme-cyber indices:', idxs);
idxs.forEach(idx => {
  console.log('--- AT INDEX', idx, '---');
  console.log(html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 600)));
});
