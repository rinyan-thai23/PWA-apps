const fs = require('fs');

const jaPath = '003_ai_md_viewer/ja/index.html';
const enPath = '003_ai_md_viewer/en/index.html';

let html = fs.readFileSync(jaPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="ja" class="dark">', '<html lang="en" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - オンラインMarkdownエディタ & 閲覧ツール</title>',
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>'
);

html = html.replace(
  '<meta name="description" content="AIが生成した長文Markdownをドラッグ＆ドロップで即座に直接編集・美しくプレビューできる、完全無料・登録不要のオンラインMarkdownエディタ。">',
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">'
);

// Hreflang for EN
html = html.replace('<link rel="alternate" hreflang="ja" href="./" />', '<link rel="alternate" hreflang="ja" href="../ja/" />');
html = html.replace('<link rel="alternate" hreflang="en" href="../en/" />', '<link rel="alternate" hreflang="en" href="./" />');
html = html.replace('<link rel="alternate" hreflang="x-default" href="../en/" />', '<link rel="alternate" hreflang="x-default" href="./" />');

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: '## で見出し、- でリスト、文字を自由に入力...',",
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">ファイルをポイッと投げて即座に直接編集・閲覧</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>'
);

html = html.replace(
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ エディタ</span>',
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>'
);

// 5. Language selector button & dropdown
const jaFlagSvg = `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Japan">
  <rect width="32" height="24" fill="#ffffff"/>
  <circle cx="16" cy="12" r="6.2" fill="#bc002d"/>
</svg>`;

const usFlagSvg = `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="USA">
  <rect width="32" height="24" fill="#bf0a30"/>
  <rect y="1.85" width="32" height="1.85" fill="#ffffff"/>
  <rect y="5.54" width="32" height="1.85" fill="#ffffff"/>
  <rect y="9.23" width="32" height="1.85" fill="#ffffff"/>
  <rect y="12.92" width="32" height="1.85" fill="#ffffff"/>
  <rect y="16.62" width="32" height="1.85" fill="#ffffff"/>
  <rect y="20.31" width="32" height="1.85" fill="#ffffff"/>
  <rect width="13" height="13" fill="#002868"/>
</svg>`;

// Replace current lang button text
html = html.replace(
  `<span class="hidden md:inline">日本語</span>`,
  `<span class="hidden md:inline">English</span>`
);
html = html.replace(jaFlagSvg, usFlagSvg); // First occurrence (header button)

// Dropdown links update
const oldDropdownInner = `<a href="./" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2"><svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Japan">
  <rect width="32" height="24" fill="#ffffff"/>
  <circle cx="16" cy="12" r="6.2" fill="#bc002d"/>
</svg> <span>日本語</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5  text-indigo-400"></i>
            </a>
            <a href="../en/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2"><svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="USA">
  <rect width="32" height="24" fill="#bf0a30"/>
  <rect y="1.85" width="32" height="1.85" fill="#ffffff"/>
  <rect y="5.54" width="32" height="1.85" fill="#ffffff"/>
  <rect y="9.23" width="32" height="1.85" fill="#ffffff"/>
  <rect y="12.92" width="32" height="1.85" fill="#ffffff"/>
  <rect y="16.62" width="32" height="1.85" fill="#ffffff"/>
  <rect y="20.31" width="32" height="1.85" fill="#ffffff"/>
  <rect width="13" height="13" fill="#002868"/>
</svg> <span>English</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>`;

const newDropdownInner = `<a href="./" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${usFlagSvg} <span>English</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
            </a>
            <a href="../ja/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${jaFlagSvg} <span>日本語</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>`;

html = html.replace(oldDropdownInner, newDropdownInner);

// 6. Focus mode bar exit text
html = html.replace('<span>集中モード終了 (Esc)</span>', '<span>Exit Focus (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="文書内を検索... (Enterで次へ)"', 'placeholder="Search document... (Enter to next)"');
html = html.replace('<span class="hidden sm:inline">ファイルを開く</span>', '<span class="hidden sm:inline">Open File</span>');
html = html.replace('<span class="hidden sm:inline">追加</span>', '<span class="hidden sm:inline">Add</span>');

// 8. Drop Overlay
html = html.replace('ここにMarkdownファイルをドロップ！', 'Drop Markdown Files Here!');
html = html.replace('AIが出力した長文ドキュメントを即座にリッチ展開します✨', 'Instantly render and edit AI-generated long documents✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> AI時代のオンラインMarkdownエディタ',
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era'
);

html = html.replace(
  'AIの長文MD、<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">ポイッと投げて即編集</span>。',
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.'
);

html = html.replace(
  'ChatGPT・Claude・Gemini・DeepSeekが生成した長文設計書やコード、Mermaid図をドラッグ＆ドロップで即展開。直感タイピングでそのまますぐ編集・保存・コピーできます。',
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.'
);

html = html.replace(
  'Markdownファイルをここにドラッグ＆ドロップ',
  'Drag & drop Markdown files here'
);

html = html.replace(
  'またはクリックしてファイルを選択',
  'or click to browse from device'
);

html = html.replace('サンプル設計書で試す', 'Try Sample Spec');
html = html.replace('クリップボードから貼り付け', 'Paste from Clipboard');
html = html.replace('新規作成', 'New Document');
html = html.replace('title="空のドキュメントを作成して直接執筆"', 'title="Create a new blank document to start writing directly"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">文字数</span>', '<span class="text-gray-400 text-[11px]">Characters</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">読了目安</span>', '<span class="text-gray-400 text-[11px]">Read Time</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">見出し数</span>', '<span class="text-gray-400 text-[11px]">Headings</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">コードブロック</span>', '<span class="text-gray-400 text-[11px]">Code Blocks</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid図</span>', '<span class="text-gray-400 text-[11px]">Mermaid</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>テキストコピー</span>', '<span>Copy Text</span>');
html = html.replace('<span>mdダウンロード</span>', '<span>Download MD</span>');
html = html.replace('title="ドキュメント全文（Markdown）をクリップボードにコピー"', 'title="Copy entire document (Markdown) to clipboard"');
html = html.replace('title="編集後のMarkdownファイルをローカルに保存"', 'title="Download edited Markdown file to device"');

// 12. Right Sidebar Quick Format
html = html.replace('クイック書式', 'Quick Format');
html = html.replace('押して挿入', 'Click to apply');
html = html.replace('<span>大見出し</span>', '<span>Heading 1</span>');
html = html.replace('<span>中見出し</span>', '<span>Heading 2</span>');
html = html.replace('<span>小見出し</span>', '<span>Heading 3</span>');
html = html.replace('<span>リスト</span>', '<span>Bullet List</span>');
html = html.replace('<span>引用</span>', '<span>Quote</span>');
html = html.replace('<span>コード</span>', '<span>Code Block</span>');

html = html.replace('title="大見出しに変換 (# )"', 'title="Convert to Heading 1 (# )"');
html = html.replace('title="中見出しに変換 (## )"', 'title="Convert to Heading 2 (## )"');
html = html.replace('title="小見出しに変換 (### )"', 'title="Convert to Heading 3 (### )"');
html = html.replace('title="箇条書きリスト化 (- )"', 'title="Convert to Bullet List (- )"');
html = html.replace('title="引用ブロック化 (> )"', 'title="Convert to Blockquote (> )"');
html = html.replace('title="コードブロック化 (```)"', 'title="Convert to Code Block (```)"');

// 13. Right Sidebar TOC
html = html.replace('目次（TOC）', 'Table of Contents');
html = html.replace('読了進捗', 'Progress');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">見出しがありません</p>', '<p class="text-gray-500 py-2 italic text-center">No headings found</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">目次（TOC）</div>', '<div class="font-bold text-sm">Table of Contents</div>');

// 15. I18N Object in JavaScript
const enI18n = `const I18N = {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      native: "English",
      region: "United States",
      title: "AI Markdown Editor - Online Markdown Editor & Reader",
      desc: "An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.",
      subTitle: "Drop files to instantly edit & read online",
      badgeStatus: "✨ Editor",
      searchPlaceholder: "Search document... (Enter to next)",
      openFile: "Open File",
      dropOverlayTitle: "Drop Markdown Files Here!",
      dropOverlayDesc: "Instantly render and edit AI-generated long documents✨",
      heroTag: "Online Markdown Editor for the AI Era",
      heroTitle1: "Long AI Markdown?",
      heroTitle2: "Drop to Edit & Read Instantly",
      heroTitle3: ".",
      heroDesc: "Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.",
      dropZoneTitle: "Drag & drop Markdown files here",
      dropZoneSub: "or click to browse from device",
      sampleBtn: "Try Sample Spec",
      pasteBtn: "Paste from Clipboard",
      statChar: "Characters",
      statRead: "Read Time",
      statReadUnit: "~{n} min",
      statHead: "Headings",
      statCode: "Code Blocks",
      statMmd: "Mermaid",
      tocTitle: "Table of Contents",
      tocProgress: "Progress",
      tocEmpty: "No headings found",
      addBtn: "Add",
      zenExit: "Exit Focus Mode (Esc)",
      unitChar: " chars",
      unitHeading: " items",
      unitCode: " blocks",
      unitMmd: " diagrams",
      copied: "Copied!",
      saved: "Saved!",
      readingText: "Reading: ",
      alertSelectMd: "Please select a Markdown file (.md, .markdown, .txt).",
      alertSampleFail: "Failed to load sample files.",
      alertSampleErr: "Error loading sample: ",
      alertClipEmpty: "No text found in clipboard.",
      promptClip: "Paste your Markdown text here:",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, enI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings (using replaceAll)
html = html.replaceAll(
  "showToastNotification(`${filename} をダウンロードしました！`);",
  "showToastNotification(`Downloaded ${filename}!`);"
);

html = html.replaceAll(
  "showToastNotification('テキスト（Markdown）をコピーしました！');",
  "showToastNotification('Copied Markdown text to clipboard!');"
);

html = html.replace(
  "const defaultContent = '# 新規ドキュメント\\n\\nここをクリックして自由に文章を書き始めてください。\\n\\n## 見出しのタイピングテスト\\n`## ` と入力してスペースを押すと自動でH2見出しになります。\\n\\n- `- ` で箇条書きリスト\\n- `> ` で引用ブロック\\n- ```` でコード枠\\n';",
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';"
);

html = html.replace(
  "await addDocument('新規ドキュメント.md', defaultContent, true);",
  "await addDocument('New_Document.md', defaultContent, true);"
);

fs.writeFileSync(enPath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/en/index.html!');
