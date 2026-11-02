const fs = require('fs');

const enPath = '003_ai_md_viewer/en/index.html';
const dePath = '003_ai_md_viewer/de/index.html';

let html = fs.readFileSync(enPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="en" class="dark">', '<html lang="de" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>',
  '<title>AI Markdown Editor - Online-Markdown-Editor & Betrachter</title>'
);

html = html.replace(
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">',
  '<meta name="description" content="Online-Markdown-Editor zum direkten Bearbeiten und eleganten Anzeigen langer KI-generierter Markdown-Dateien per Drag & Drop. Kostenlos & ohne Registrierung.">'
);

// Hreflang links for DE
const enHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="./" />
  <link rel="alternate" hreflang="x-default" href="./" />`;

const deHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="../en/" />
  <link rel="alternate" hreflang="th" href="../th/" />
  <link rel="alternate" hreflang="zh" href="../zh/" />
  <link rel="alternate" hreflang="es" href="../es/" />
  <link rel="alternate" hreflang="de" href="./" />
  <link rel="alternate" hreflang="fr" href="../fr/" />
  <link rel="alternate" hreflang="x-default" href="../en/" />`;

html = html.replace(enHreflangs, deHreflangs);

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',",
  "placeholder: '## für Überschrift, - für Liste eingeben oder einfach losschreiben...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Dateien ablegen, um sofort online zu bearbeiten und zu lesen</p>'
);

html = html.replace(
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>',
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>'
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

// Replace header lang button (US -> DE)
html = html.replace(
  `<span class="hidden md:inline">English</span>`,
  `<span class="hidden md:inline">Deutsch</span>`
);
html = html.replace(flags.us, flags.de); // First occurrence (header button)

// Language dropdown replacement for DE
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
              <span class="flex items-center gap-2">${flags.de} <span>Deutsch</span></span>
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
            <a href="../zh/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.zh} <span>简体中文</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../es/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.es} <span>Español</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
            <a href="../fr/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.fr} <span>Français</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
          </div>`;

html = html.replace(oldDropdown, newDropdown);

// 6. Focus mode bar exit text
html = html.replace('<span>Exit Focus (Esc)</span>', '<span>Fokusmodus beenden (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="Search document... (Enter to next)"', 'placeholder="Im Dokument suchen... (Enter für nächstes)"');
html = html.replace('<span class="hidden sm:inline">Open File</span>', '<span class="hidden sm:inline">Datei öffnen</span>');
html = html.replace('<span class="hidden sm:inline">Add</span>', '<span class="hidden sm:inline">Hinzufügen</span>');

// 8. Drop Overlay
html = html.replace('Drop Markdown Files Here!', 'Markdown-Dateien hier ablegen!');
html = html.replace('Instantly render and edit AI-generated long documents✨', 'Lange KI-Dokumente sofort rendern und direkt bearbeiten✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era',
  '<i data-lucide="bot" class="w-4 h-4"></i> Online-Markdown-Editor für das KI-Zeitalter'
);

html = html.replace(
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.',
  'Langes KI-Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Ablegen und sofort bearbeiten & lesen</span>.'
);

html = html.replace(
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.',
  'Rendert lange Spezifikationen, Code und Mermaid-Diagramme von ChatGPT, Claude, Gemini & DeepSeek blitzschnell. Müheloses Schreiben im Notion-Stil, Speichern und Kopieren.'
);

html = html.replace(
  'Drag & drop Markdown files here',
  'Markdown-Dateien hierher ziehen'
);

html = html.replace(
  'or click to browse from device',
  'oder klicken, um vom Gerät auszuwählen'
);

html = html.replace('Try Sample Spec', 'Beispieldokument testen');
html = html.replace('Paste from Clipboard', 'Aus Zwischenablage einfügen');
html = html.replace('New Document', 'Neues Dokument');
html = html.replace('title="Create a new blank document to start writing directly"', 'title="Leeres Dokument erstellen und sofort losschreiben"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">Characters</span>', '<span class="text-gray-400 text-[11px]">Zeichen</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Read Time</span>', '<span class="text-gray-400 text-[11px]">Lesezeit</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Headings</span>', '<span class="text-gray-400 text-[11px]">Überschriften</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Code Blocks</span>', '<span class="text-gray-400 text-[11px]">Code-Blöcke</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid</span>', '<span class="text-gray-400 text-[11px]">Mermaid</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>Copy Text</span>', '<span>Text kopieren</span>');
html = html.replace('<span>Download MD</span>', '<span>md herunterladen</span>');
html = html.replace('title="Copy entire document (Markdown) to clipboard"', 'title="Gesamtes Dokument (Markdown) in die Zwischenablage kopieren"');
html = html.replace('title="Download edited Markdown file to device"', 'title="Bearbeitete Markdown-Datei auf das Gerät herunterladen"');

// 12. Right Sidebar Quick Format
html = html.replaceAll('Quick Format', 'Schnellformatierung');
html = html.replaceAll('Click to apply', 'Klicken zum Anwenden');
html = html.replace('<span>Heading 1</span>', '<span>Überschrift 1</span>');
html = html.replace('<span>Heading 2</span>', '<span>Überschrift 2</span>');
html = html.replace('<span>Heading 3</span>', '<span>Überschrift 3</span>');
html = html.replace('<span>Bullet List</span>', '<span>Aufzählung</span>');
html = html.replace('<span>Quote</span>', '<span>Zitat</span>');
html = html.replace('<span>Code Block</span>', '<span>Code-Block</span>');

html = html.replace('title="Convert to Heading 1 (# )"', 'title="In Überschrift 1 umwandeln (# )"');
html = html.replace('title="Convert to Heading 2 (## )"', 'title="In Überschrift 2 umwandeln (## )"');
html = html.replace('title="Convert to Heading 3 (### )"', 'title="In Überschrift 3 umwandeln (### )"');
html = html.replace('title="Convert to Bullet List (- )"', 'title="In Aufzählungsliste umwandeln (- )"');
html = html.replace('title="Convert to Blockquote (> )"', 'title="In Zitatblock umwandeln (> )"');
html = html.replace('title="Convert to Code Block (```)"', 'title="In Code-Block umwandeln (```)"');

// 13. Right Sidebar TOC
html = html.replace('Table of Contents', 'Inhaltsverzeichnis');
html = html.replace('Progress', 'Lesefortschritt');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">No headings found</p>', '<p class="text-gray-500 py-2 italic text-center">Keine Überschriften gefunden</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">Table of Contents</div>', '<div class="font-bold text-sm">Inhaltsverzeichnis</div>');

// 15. I18N Object in JavaScript
const deI18n = `const I18N = {
      code: "de",
      name: "German",
      flag: "🇩🇪",
      native: "Deutsch",
      region: "Germany / DACH",
      title: "AI Markdown Editor - Online-Markdown-Editor & Betrachter",
      desc: "Online-Markdown-Editor zum direkten Bearbeiten und eleganten Anzeigen langer KI-generierter Markdown-Dateien per Drag & Drop. Kostenlos & ohne Registrierung.",
      subTitle: "Dateien ablegen, um sofort online zu bearbeiten und zu lesen",
      badgeStatus: "✨ Editor",
      searchPlaceholder: "Im Dokument suchen... (Enter für nächstes)",
      openFile: "Datei öffnen",
      dropOverlayTitle: "Markdown-Dateien hier ablegen!",
      dropOverlayDesc: "Lange KI-Dokumente sofort rendern und direkt bearbeiten✨",
      heroTag: "Online-Markdown-Editor für das KI-Zeitalter",
      heroTitle1: "Langes KI-Markdown?",
      heroTitle2: "Ablegen und sofort bearbeiten & lesen",
      heroTitle3: ".",
      heroDesc: "Rendert lange Spezifikationen, Code und Mermaid-Diagramme von ChatGPT, Claude, Gemini & DeepSeek blitzschnell. Müheloses Schreiben im Notion-Stil, Speichern und Kopieren.",
      dropZoneTitle: "Markdown-Dateien hierher ziehen",
      dropZoneSub: "oder klicken, um vom Gerät auszuwählen",
      sampleBtn: "Beispieldokument testen",
      pasteBtn: "Aus Zwischenablage einfügen",
      statChar: "Zeichen",
      statRead: "Lesezeit",
      statReadUnit: "~{n} Min.",
      statHead: "Überschriften",
      statCode: "Code-Blöcke",
      statMmd: "Mermaid",
      tocTitle: "Inhaltsverzeichnis",
      tocProgress: "Lesefortschritt",
      tocEmpty: "Keine Überschriften gefunden",
      addBtn: "Hinzufügen",
      zenExit: "Fokusmodus beenden (Esc)",
      unitChar: " Zeichen",
      unitHeading: " Überschriften",
      unitCode: " Blöcke",
      unitMmd: " Diagramme",
      copied: "Kopiert!",
      saved: "Gespeichert!",
      readingText: "Lese: ",
      alertSelectMd: "Bitte wählen Sie Markdown-Dateien (.md, .markdown, .txt) aus.",
      alertSampleFail: "Beispieldateien konnten nicht geladen werden.",
      alertSampleErr: "Fehler beim Laden: ",
      alertClipEmpty: "Kein Text in der Zwischenablage gefunden.",
      promptClip: "Fügen Sie Ihren Markdown-Text hier ein:",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, deI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings
html = html.replaceAll(
  "showToastNotification(`Downloaded ${filename}!`);",
  "showToastNotification(`${filename} erfolgreich heruntergeladen!`);"
);

html = html.replaceAll(
  "showToastNotification('Copied Markdown text to clipboard!');",
  "showToastNotification('Markdown-Text in die Zwischenablage kopiert!');"
);

html = html.replace(
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';",
  "const defaultContent = '# Neues Dokument\\n\\nKlicken Sie hier und beginnen Sie frei zu schreiben.\\n\\n## Überschriften-Eingabetest\\nGeben Sie `## ` ein und drücken Sie die Leertaste, um automatisch eine H2-Überschrift zu erstellen.\\n\\n- `- ` für Aufzählungen\\n- `> ` für Zitate\\n- ```` für Code-Blöcke\\n';"
);

html = html.replace(
  "await addDocument('New_Document.md', defaultContent, true);",
  "await addDocument('Neues_Dokument.md', defaultContent, true);"
);

fs.writeFileSync(dePath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/de/index.html!');
