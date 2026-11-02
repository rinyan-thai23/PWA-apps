const fs = require('fs');

const enPath = '003_ai_md_viewer/en/index.html';
const zhPath = '003_ai_md_viewer/zh/index.html';

let html = fs.readFileSync(enPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="en" class="dark">', '<html lang="zh" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>',
  '<title>AI Markdown Editor - 在线 Markdown 编辑器 & 预览工具</title>'
);

html = html.replace(
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">',
  '<meta name="description" content="专为 AI 生成的长篇 Markdown 设计的在线编辑器与预览工具。一拖即开，直接编辑、优雅排版，无需注册、完全免费。">'
);

// Hreflang links for ZH
const enHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="./" />
  <link rel="alternate" hreflang="x-default" href="./" />`;

const zhHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="../en/" />
  <link rel="alternate" hreflang="th" href="../th/" />
  <link rel="alternate" hreflang="zh" href="./" />
  <link rel="alternate" hreflang="es" href="../es/" />
  <link rel="alternate" hreflang="de" href="../de/" />
  <link rel="alternate" hreflang="fr" href="../fr/" />
  <link rel="alternate" hreflang="x-default" href="../en/" />`;

html = html.replace(enHreflangs, zhHreflangs);

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',",
  "placeholder: '输入 ## 插入标题，- 插入列表，或直接自由输入文字...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">拖放文件即刻在线编辑与阅读</p>'
);

html = html.replace(
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>',
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ 编辑器</span>'
);

// 5. Flag SVGs
const flags = {
  th: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Thailand">
  <rect width="32" height="24" fill="#A51931"/>
  <rect y="4" width="32" height="16" fill="#F4F5F8"/>
  <rect y="8" width="32" height="8" fill="#2D2A4A"/>
</svg>`,
  us: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="USA">
  <rect width="32" height="24" fill="#bf0a30"/>
  <rect y="1.85" width="32" height="1.85" fill="#ffffff"/>
  <rect y="5.54" width="32" height="1.85" fill="#ffffff"/>
  <rect y="9.23" width="32" height="1.85" fill="#ffffff"/>
  <rect y="12.92" width="32" height="1.85" fill="#ffffff"/>
  <rect y="16.62" width="32" height="1.85" fill="#ffffff"/>
  <rect y="20.31" width="32" height="1.85" fill="#ffffff"/>
  <rect width="13" height="13" fill="#002868"/>
</svg>`,
  ja: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Japan">
  <rect width="32" height="24" fill="#ffffff"/>
  <circle cx="16" cy="12" r="6.2" fill="#bc002d"/>
</svg>`,
  zh: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="China">
  <rect width="32" height="24" fill="#de2910"/>
  <polygon points="5.33,2 6.4,5.2 9.6,5.2 7,7.2 8,10.4 5.33,8.4 2.67,10.4 3.67,7.2 1.07,5.2 4.27,5.2" fill="#ffde00"/>
</svg>`,
  es: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Spain">
  <rect width="32" height="24" fill="#AA151B"/>
  <rect y="6" width="32" height="12" fill="#F1BF00"/>
</svg>`,
  de: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="Germany">
  <rect width="32" height="8" fill="#000000"/>
  <rect y="8" width="32" height="8" fill="#DD0000"/>
  <rect y="16" width="32" height="8" fill="#FFCE00"/>
</svg>`,
  fr: `<svg viewBox="0 0 32 24" class="flag-icon flag-icon-sm" xmlns="http://www.w3.org/2000/svg" aria-label="France">
  <rect width="10.67" height="24" fill="#002395"/>
  <rect x="10.67" width="10.66" height="24" fill="#FFFFFF"/>
  <rect x="21.33" width="10.67" height="24" fill="#ED2939"/>
</svg>`
};

// Replace header lang button (US -> ZH)
html = html.replace(
  `<span class="hidden md:inline">English</span>`,
  `<span class="hidden md:inline">简体中文</span>`
);
html = html.replace(flags.us, flags.zh); // First occurrence (header button)

// Language dropdown replacement for ZH
const oldDropdown = `<div id="langMenuDropdown" class="hidden absolute right-0 mt-2 w-40 rounded-xl border border-gray-700/80 bg-gray-900/95 backdrop-blur-md shadow-2xl py-1 z-50 text-gray-200">
            <a href="./" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.us} <span>English</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
            </a>
            <a href="../ja/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.ja} <span>日本語</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
          </div>`;

const newDropdown = `<div id="langMenuDropdown" class="hidden absolute right-0 mt-2 w-44 rounded-xl border border-gray-700/80 bg-gray-900/95 backdrop-blur-md shadow-2xl py-1 z-50 text-gray-200">
            <a href="./" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.zh} <span>简体中文</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
            </a>
            <a href="../en/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.us} <span>English</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../ja/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.ja} <span>日本語</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../th/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.th} <span>ไทย</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../es/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.es} <span>Español</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../de/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.de} <span>Deutsch</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../fr/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.fr} <span>Français</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
          </div>`;

html = html.replace(oldDropdown, newDropdown);

// 6. Focus mode bar exit text
html = html.replace('<span>Exit Focus (Esc)</span>', '<span>退出专注模式 (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="Search document... (Enter to next)"', 'placeholder="在文档中搜索... (回车查找下一个)"');
html = html.replace('<span class="hidden sm:inline">Open File</span>', '<span class="hidden sm:inline">打开文件</span>');
html = html.replace('<span class="hidden sm:inline">Add</span>', '<span class="hidden sm:inline">添加</span>');

// 8. Drop Overlay
html = html.replace('Drop Markdown Files Here!', '将 Markdown 文件拖放到此处！');
html = html.replace('Instantly render and edit AI-generated long documents✨', '瞬间将长篇 AI 文档呈现并直接编辑✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era',
  '<i data-lucide="bot" class="w-4 h-4"></i> 面向 AI 时代的在线 Markdown 编辑器'
);

html = html.replace(
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.',
  '冗长的 AI 文档？<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">一拖即开，直接编辑与阅读</span>。'
);

html = html.replace(
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.',
  '瞬间渲染 ChatGPT、Claude、Gemini、DeepSeek 生成的漫长架构设计、代码段和 Mermaid 图表。如同 Notion 般直观输入，随时编辑、保存与复制。'
);

html = html.replace(
  'Drag & drop Markdown files here',
  '将 Markdown 文件拖放到此处'
);

html = html.replace(
  'or click to browse from device',
  '或点击浏览本地文件'
);

html = html.replace('Try Sample Spec', '尝试示例设计文档');
html = html.replace('Paste from Clipboard', '从剪贴板粘贴');
html = html.replace('New Document', '新建文档');
html = html.replace('title="Create a new blank document to start writing directly"', 'title="创建空白文档并直接开始书写"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">Characters</span>', '<span class="text-gray-400 text-[11px]">字符数</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Read Time</span>', '<span class="text-gray-400 text-[11px]">预估阅读</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Headings</span>', '<span class="text-gray-400 text-[11px]">标题数</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Code Blocks</span>', '<span class="text-gray-400 text-[11px]">代码块</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid</span>', '<span class="text-gray-400 text-[11px]">Mermaid 图表</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>Copy Text</span>', '<span>复制文本</span>');
html = html.replace('<span>Download MD</span>', '<span>下载 md</span>');
html = html.replace('title="Copy entire document (Markdown) to clipboard"', 'title="将文档全文（Markdown）复制到剪贴板"');
html = html.replace('title="Download edited Markdown file to device"', 'title="将编辑后的 Markdown 文件保存到本地"');

// 12. Right Sidebar Quick Format
html = html.replaceAll('Quick Format', '快捷格式');
html = html.replaceAll('Click to apply', '点击应用');
html = html.replace('<span>Heading 1</span>', '<span>一级标题</span>');
html = html.replace('<span>Heading 2</span>', '<span>二级标题</span>');
html = html.replace('<span>Heading 3</span>', '<span>三级标题</span>');
html = html.replace('<span>Bullet List</span>', '<span>无序列表</span>');
html = html.replace('<span>Quote</span>', '<span>引用</span>');
html = html.replace('<span>Code Block</span>', '<span>代码块</span>');

html = html.replace('title="Convert to Heading 1 (# )"', 'title="转换为一级标题 (# )"');
html = html.replace('title="Convert to Heading 2 (## )"', 'title="转换为二级标题 (## )"');
html = html.replace('title="Convert to Heading 3 (### )"', 'title="转换为三级标题 (### )"');
html = html.replace('title="Convert to Bullet List (- )"', 'title="转换为无序列表 (- )"');
html = html.replace('title="Convert to Blockquote (> )"', 'title="转换为引用块 (> )"');
html = html.replace('title="Convert to Code Block (```)"', 'title="转换为代码块 (```)"');

// 13. Right Sidebar TOC
html = html.replace('Table of Contents', '目录 (TOC)');
html = html.replace('Progress', '阅读进度');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">No headings found</p>', '<p class="text-gray-500 py-2 italic text-center">未找到标题</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">Table of Contents</div>', '<div class="font-bold text-sm">目录 (TOC)</div>');

// 15. I18N Object in JavaScript
const zhI18n = `const I18N = {
      code: "zh",
      name: "Chinese",
      flag: "🇨🇳",
      native: "简体中文",
      region: "China / Global",
      title: "AI Markdown Editor - 在线 Markdown 编辑器 & 预览工具",
      desc: "专为 AI 生成的长篇 Markdown 设计的在线编辑器与预览工具。一拖即开，直接编辑、优雅排版，无需注册、完全免费。",
      subTitle: "拖放文件即刻在线编辑与阅读",
      badgeStatus: "✨ 编辑器",
      searchPlaceholder: "在文档中搜索... (回车查找下一个)",
      openFile: "打开文件",
      dropOverlayTitle: "将 Markdown 文件拖放到此处！",
      dropOverlayDesc: "瞬间将长篇 AI 文档呈现并直接编辑✨",
      heroTag: "面向 AI 时代的在线 Markdown 编辑器",
      heroTitle1: "冗长的 AI 文档？",
      heroTitle2: "一拖即开，直接编辑与阅读",
      heroTitle3: "。",
      heroDesc: "瞬间渲染 ChatGPT、Claude、Gemini、DeepSeek 生成的漫长架构设计、代码段和 Mermaid 图表。如同 Notion 般直观输入，随时编辑、保存与复制。",
      dropZoneTitle: "将 Markdown 文件拖放到此处",
      dropZoneSub: "或点击浏览本地文件",
      sampleBtn: "尝试示例设计文档",
      pasteBtn: "从剪贴板粘贴",
      statChar: "字符数",
      statRead: "预估阅读",
      statReadUnit: "约 {n} 分钟",
      statHead: "标题数",
      statCode: "代码块",
      statMmd: "Mermaid 图表",
      tocTitle: "目录 (TOC)",
      tocProgress: "阅读进度",
      tocEmpty: "未找到标题",
      addBtn: "添加",
      zenExit: "退出专注模式 (Esc)",
      unitChar: " 字符",
      unitHeading: " 处",
      unitCode: " 块",
      unitMmd: " 图",
      copied: "已复制!",
      saved: "已保存!",
      readingText: "正在阅读: ",
      alertSelectMd: "请选择 Markdown 文件 (.md, .markdown, .txt)",
      alertSampleFail: "加载示例文件失败",
      alertSampleErr: "加载示例出错: ",
      alertClipEmpty: "剪贴板中未找到文本",
      promptClip: "在此粘贴 Markdown 文本:",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, zhI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings
html = html.replaceAll(
  "showToastNotification(`Downloaded ${filename}!`);",
  "showToastNotification(`已成功下载 ${filename}！`);"
);

html = html.replaceAll(
  "showToastNotification('Copied Markdown text to clipboard!');",
  "showToastNotification('已将文本（Markdown）复制到剪贴板！');"
);

html = html.replace(
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';",
  "const defaultContent = '# 新建文档\\n\\n点击此处即可自由开始书写文章。\\n\\n## 标题输入测试\\n输入 `## ` 并按下空格，将自动转换为 H2 二级标题。\\n\\n- `- ` 无序列表\\n- `> ` 引用块\\n- ```` 代码块\\n';"
);

html = html.replace(
  "await addDocument('New_Document.md', defaultContent, true);",
  "await addDocument('新建文档.md', defaultContent, true);"
);

fs.writeFileSync(zhPath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/zh/index.html!');
