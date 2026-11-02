const fs = require('fs');

const enPath = '003_ai_md_viewer/en/index.html';
const thPath = '003_ai_md_viewer/th/index.html';

let html = fs.readFileSync(enPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="en" class="dark">', '<html lang="th" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>',
  '<title>AI Markdown Editor - โปรแกรมแก้ไขและดู Markdown ออนไลน์</title>'
);

html = html.replace(
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">',
  '<meta name="description" content="โปรแกรมแก้ไข Markdown ออนไลน์ที่ช่วยให้คุณลากและวางเพื่อแก้ไขและดูตัวอย่างไฟล์ Markdown ขนาดยาวที่สร้างโดย AI ได้โดยตรง ฟรีและไม่ต้องลงทะเบียน">'
);

// Hreflang links for TH
const enHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="./" />
  <link rel="alternate" hreflang="x-default" href="./" />`;

const thHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="../en/" />
  <link rel="alternate" hreflang="th" href="./" />
  <link rel="alternate" hreflang="zh" href="../zh/" />
  <link rel="alternate" hreflang="es" href="../es/" />
  <link rel="alternate" hreflang="de" href="../de/" />
  <link rel="alternate" hreflang="fr" href="../fr/" />
  <link rel="alternate" hreflang="x-default" href="../en/" />`;

html = html.replace(enHreflangs, thHreflangs);

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',",
  "placeholder: 'พิมพ์ ## เพื่อสร้างหัวข้อ, - เพื่อสร้างรายการ, หรือเริ่มพิมพ์ข้อความได้อย่างอิสระ...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">ลากและวางไฟล์เพื่อแก้ไขและอ่านออนไลน์ได้ทันที</p>'
);

html = html.replace(
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>',
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ ตัวแก้ไข</span>'
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

// Replace header lang button (US -> TH)
html = html.replace(
  `<span class="hidden md:inline">English</span>`,
  `<span class="hidden md:inline">ไทย</span>`
);
html = html.replace(flags.us, flags.th); // First occurrence (header button)

// Language dropdown replacement for TH
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
              <span class="flex items-center gap-2">${flags.th} <span>ไทย</span></span>
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
            <a href="../zh/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.zh} <span>简体中文</span></span>
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
html = html.replace('<span>Exit Focus (Esc)</span>', '<span>ออกจากโหมดโฟกัส (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="Search document... (Enter to next)"', 'placeholder="ค้นหาในเอกสาร... (กด Enter เพื่อถัดไป)"');
html = html.replace('<span class="hidden sm:inline">Open File</span>', '<span class="hidden sm:inline">เปิดไฟล์</span>');
html = html.replace('<span class="hidden sm:inline">Add</span>', '<span class="hidden sm:inline">เพิ่ม</span>');

// 8. Drop Overlay
html = html.replace('Drop Markdown Files Here!', 'วางไฟล์ Markdown ที่นี่!');
html = html.replace('Instantly render and edit AI-generated long documents✨', 'เปิดและแก้ไขเอกสารขนาดยาวจาก AI ได้อย่างสวยงามทันที✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era',
  '<i data-lucide="bot" class="w-4 h-4"></i> โปรแกรมแก้ไข Markdown ออนไลน์สำหรับยุค AI'
);

html = html.replace(
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.',
  'Markdown ยาวจาก AI?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">วางปุ๊บ แก้ไข & อ่านได้ทันที</span>.'
);

html = html.replace(
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.',
  'แสดงผลสเปก โค้ด และแผนภาพ Mermaid ขนาดยาวจาก ChatGPT, Claude, Gemini & DeepSeek ได้ทันที แก้ไขได้อย่างลื่นไหล บันทึก และคัดลอกได้ทันใจ'
);

html = html.replace(
  'Drag & drop Markdown files here',
  'ลากและวางไฟล์ Markdown ที่นี่'
);

html = html.replace(
  'or click to browse from device',
  'หรือคลิกเพื่อเลือกไฟล์จากอุปกรณ์'
);

html = html.replace('Try Sample Spec', 'ลองสเปกตัวอย่าง');
html = html.replace('Paste from Clipboard', 'วางจากคลิปบอร์ด');
html = html.replace('New Document', 'สร้างเอกสารใหม่');
html = html.replace('title="Create a new blank document to start writing directly"', 'title="สร้างเอกสารเปล่าใหม่เพื่อเริ่มเขียนทันที"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">Characters</span>', '<span class="text-gray-400 text-[11px]">จำนวนตัวอักษร</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Read Time</span>', '<span class="text-gray-400 text-[11px]">เวลาอ่านโดยประมาณ</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Headings</span>', '<span class="text-gray-400 text-[11px]">หัวข้อ</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Code Blocks</span>', '<span class="text-gray-400 text-[11px]">บล็อกโค้ด</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid</span>', '<span class="text-gray-400 text-[11px]">Mermaid</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>Copy Text</span>', '<span>คัดลอกข้อความ</span>');
html = html.replace('<span>Download MD</span>', '<span>ดาวน์โหลด md</span>');
html = html.replace('title="Copy entire document (Markdown) to clipboard"', 'title="คัดลอกเนื้อหาทั้งหมด (Markdown) ไปยังคลิปบอร์ด"');
html = html.replace('title="Download edited Markdown file to device"', 'title="ดาวน์โหลดไฟล์ Markdown ที่แก้ไขแล้วลงเครื่อง"');

// 12. Right Sidebar Quick Format
html = html.replaceAll('Quick Format', 'รูปแบบด่วน');
html = html.replaceAll('Click to apply', 'คลิกเพื่อแทรก');
html = html.replace('<span>Heading 1</span>', '<span>หัวข้อใหญ่</span>');
html = html.replace('<span>Heading 2</span>', '<span>หัวข้อย่อย</span>');
html = html.replace('<span>Heading 3</span>', '<span>หัวข้อย่อยระดับ 3</span>');
html = html.replace('<span>Bullet List</span>', '<span>รายการ</span>');
html = html.replace('<span>Quote</span>', '<span>อ้างอิง</span>');
html = html.replace('<span>Code Block</span>', '<span>บล็อกโค้ด</span>');

html = html.replace('title="Convert to Heading 1 (# )"', 'title="เปลี่ยนเป็นหัวข้อใหญ่ (# )"');
html = html.replace('title="Convert to Heading 2 (## )"', 'title="เปลี่ยนเป็นหัวข้อย่อย (## )"');
html = html.replace('title="Convert to Heading 3 (### )"', 'title="เปลี่ยนเป็นหัวข้อย่อยระดับ 3 (### )"');
html = html.replace('title="Convert to Bullet List (- )"', 'title="เปลี่ยนเป็นรายการแบบจุด (- )"');
html = html.replace('title="Convert to Blockquote (> )"', 'title="เปลี่ยนเป็นบล็อกอ้างอิง (> )"');
html = html.replace('title="Convert to Code Block (```)"', 'title="เปลี่ยนเป็นบล็อกโค้ด (```)"');

// 13. Right Sidebar TOC
html = html.replace('Table of Contents', 'สารบัญ (TOC)');
html = html.replace('Progress', 'ความคืบหน้า');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">No headings found</p>', '<p class="text-gray-500 py-2 italic text-center">ไม่พบหัวข้อ</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">Table of Contents</div>', '<div class="font-bold text-sm">สารบัญ (TOC)</div>');

// 15. I18N Object in JavaScript
const thI18n = `const I18N = {
      code: "th",
      name: "ไทย",
      flag: "🇹🇭",
      native: "ไทย",
      region: "Thailand",
      title: "AI Markdown Editor - โปรแกรมแก้ไขและดู Markdown ออนไลน์",
      desc: "โปรแกรมแก้ไข Markdown ออนไลน์ที่ช่วยให้คุณลากและวางเพื่อแก้ไขและดูตัวอย่างไฟล์ Markdown ขนาดยาวที่สร้างโดย AI ได้โดยตรง ฟรีและไม่ต้องลงทะเบียน",
      subTitle: "ลากและวางไฟล์เพื่อแก้ไขและอ่านออนไลน์ได้ทันที",
      badgeStatus: "✨ ตัวแก้ไข",
      searchPlaceholder: "ค้นหาในเอกสาร... (กด Enter เพื่อถัดไป)",
      openFile: "เปิดไฟล์",
      dropOverlayTitle: "วางไฟล์ Markdown ที่นี่!",
      dropOverlayDesc: "เปิดและแก้ไขเอกสารขนาดยาวจาก AI ได้อย่างสวยงามทันที✨",
      heroTag: "โปรแกรมแก้ไข Markdown ออนไลน์สำหรับยุค AI",
      heroTitle1: "Markdown ยาวจาก AI?",
      heroTitle2: "วางปุ๊บ แก้ไข & อ่านได้ทันที",
      heroTitle3: ".",
      heroDesc: "แสดงผลสเปก โค้ด และแผนภาพ Mermaid ขนาดยาวจาก ChatGPT, Claude, Gemini & DeepSeek ได้ทันที แก้ไขได้อย่างลื่นไหล บันทึก และคัดลอกได้ทันใจ",
      dropZoneTitle: "ลากและวางไฟล์ Markdown ที่นี่",
      dropZoneSub: "หรือคลิกเพื่อเลือกไฟล์จากอุปกรณ์",
      sampleBtn: "ลองสเปกตัวอย่าง",
      pasteBtn: "วางจากคลิปบอร์ด",
      statChar: "จำนวนตัวอักษร",
      statRead: "เวลาอ่านโดยประมาณ",
      statReadUnit: "~{n} นาที",
      statHead: "หัวข้อ",
      statCode: "บล็อกโค้ด",
      statMmd: "Mermaid",
      tocTitle: "สารบัญ (TOC)",
      tocProgress: "ความคืบหน้า",
      tocEmpty: "ไม่พบหัวข้อ",
      addBtn: "เพิ่ม",
      zenExit: "ออกจากโหมดโฟกัส (Esc)",
      unitChar: " ตัวอักษร",
      unitHeading: " รายการ",
      unitCode: " บล็อก",
      unitMmd: " ไดอะแกรม",
      copied: "คัดลอกแล้ว!",
      saved: "บันทึกแล้ว!",
      readingText: "กำลังอ่าน: ",
      alertSelectMd: "กรุณาเลือกไฟล์ Markdown (.md, .markdown, .txt)",
      alertSampleFail: "ไม่สามารถโหลดไฟล์ตัวอย่างได้",
      alertSampleErr: "เกิดข้อผิดพลาดในการโหลดตัวอย่าง: ",
      alertClipEmpty: "ไม่พบข้อความในคลิปบอร์ด",
      promptClip: "วางข้อความ Markdown ของคุณที่นี่:",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, thI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings
html = html.replaceAll(
  "showToastNotification(`Downloaded ${filename}!`);",
  "showToastNotification(`ดาวน์โหลด ${filename} เรียบร้อยแล้ว!`);"
);

html = html.replaceAll(
  "showToastNotification('Copied Markdown text to clipboard!');",
  "showToastNotification('คัดลอกข้อความ (Markdown) ไปยังคลิปบอร์ดแล้ว!');"
);

html = html.replace(
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';",
  "const defaultContent = '# เอกสารใหม่\\n\\nคลิกที่นี่เพื่อเริ่มเขียนข้อความได้อย่างอิสระ\\n\\n## ทดสอบการพิมพ์หัวข้อ\\nพิมพ์ `## ` แล้วกด space เพื่อเปลี่ยนเป็นหัวข้อย่อย H2 อัตโนมัติ\\n\\n- `- ` สำหรับรายการแบบจุด\\n- `> ` สำหรับบล็อกอ้างอิง\\n- ```` สำหรับกล่องโค้ด\\n';"
);

html = html.replace(
  "await addDocument('New_Document.md', defaultContent, true);",
  "await addDocument('เอกสารใหม่.md', defaultContent, true);"
);

fs.writeFileSync(thPath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/th/index.html!');
