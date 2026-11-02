const fs = require('fs');

const enPath = '003_ai_md_viewer/en/index.html';
const frPath = '003_ai_md_viewer/fr/index.html';

let html = fs.readFileSync(enPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="en" class="dark">', '<html lang="fr" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>',
  '<title>AI Markdown Editor - Éditeur et Lecteur de Markdown en Ligne</title>'
);

html = html.replace(
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">',
  '<meta name="description" content="Éditeur de Markdown en ligne pour modifier directement et prévisualiser élégamment les longs fichiers Markdown générés par l\'IA via glisser-déposer. Gratuit et sans inscription.">'
);

// Hreflang links for FR
const enHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="./" />
  <link rel="alternate" hreflang="x-default" href="./" />`;

const frHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="../en/" />
  <link rel="alternate" hreflang="th" href="../th/" />
  <link rel="alternate" hreflang="zh" href="../zh/" />
  <link rel="alternate" hreflang="es" href="../es/" />
  <link rel="alternate" hreflang="de" href="../de/" />
  <link rel="alternate" hreflang="fr" href="./" />
  <link rel="alternate" hreflang="x-default" href="../en/" />`;

html = html.replace(enHreflangs, frHreflangs);

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',",
  "placeholder: 'Tapez ## pour un titre, - pour une liste, ou commencez à écrire librement...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Glissez des fichiers pour éditer et lire en ligne instantanément</p>'
);

html = html.replace(
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Editor</span>',
  '<span id="badgeStatus" class="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">✨ Éditeur</span>'
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

// Replace header lang button (US -> FR)
html = html.replace(
  `<span class="hidden md:inline">English</span>`,
  `<span class="hidden md:inline">Français</span>`
);
html = html.replace(flags.us, flags.fr); // First occurrence (header button)

// Language dropdown replacement for FR
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
              <span class="flex items-center gap-2">${flags.fr} <span>Français</span></span>
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
            <a href="../de/" class="w-full text-left px-3.5 py-2 hover:bg-indigo-500/10 flex items-center justify-between text-xs transition">
              <span class="flex items-center gap-2">${flags.de} <span>Deutsch</span></span>
              <i data-lucide="check" class="w-3.5 h-3.5 hidden text-indigo-400"></i>
            </a>
          </div>`;

html = html.replace(oldDropdown, newDropdown);

// 6. Focus mode bar exit text
html = html.replace('<span>Exit Focus (Esc)</span>', '<span>Quitter le mode focus (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="Search document... (Enter to next)"', 'placeholder="Rechercher dans le document... (Entrée pour suivant)"');
html = html.replace('<span class="hidden sm:inline">Open File</span>', '<span class="hidden sm:inline">Ouvrir le fichier</span>');
html = html.replace('<span class="hidden sm:inline">Add</span>', '<span class="hidden sm:inline">Ajouter</span>');

// 8. Drop Overlay
html = html.replace('Drop Markdown Files Here!', 'Déposez les fichiers Markdown ici !');
html = html.replace('Instantly render and edit AI-generated long documents✨', 'Rendez et modifiez instantanément les longs documents générés par l\'IA✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era',
  '<i data-lucide="bot" class="w-4 h-4"></i> Éditeur Markdown en ligne pour l\'ère de l\'IA'
);

html = html.replace(
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.',
  'Longs Markdown d\'IA ?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Déposez pour éditer & lire instantanément</span>.'
);

html = html.replace(
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.',
  'Affichez instantanément les spécifications, le code et les diagrammes Mermaid générés par ChatGPT, Claude, Gemini et DeepSeek. Éditez avec fluidité grâce à une saisie intuitive style Notion, enregistrez et copiez.'
);

html = html.replace(
  'Drag & drop Markdown files here',
  'Glissez-déposez des fichiers Markdown ici'
);

html = html.replace(
  'or click to browse from device',
  'ou cliquez pour parcourir vos fichiers'
);

html = html.replace('Try Sample Spec', 'Tester le document d\'exemple');
html = html.replace('Paste from Clipboard', 'Coller depuis le presse-papiers');
html = html.replace('New Document', 'Nouveau document');
html = html.replace('title="Create a new blank document to start writing directly"', 'title="Créer un nouveau document vierge pour commencer à écrire directement"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">Characters</span>', '<span class="text-gray-400 text-[11px]">Caractères</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Read Time</span>', '<span class="text-gray-400 text-[11px]">Temps de lecture</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Headings</span>', '<span class="text-gray-400 text-[11px]">Titres</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Code Blocks</span>', '<span class="text-gray-400 text-[11px]">Blocs de code</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid</span>', '<span class="text-gray-400 text-[11px]">Mermaid</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>Copy Text</span>', '<span>Copier le texte</span>');
html = html.replace('<span>Download MD</span>', '<span>Télécharger md</span>');
html = html.replace('title="Copy entire document (Markdown) to clipboard"', 'title="Copier l\'intégralité du document (Markdown) dans le presse-papiers"');
html = html.replace('title="Download edited Markdown file to device"', 'title="Télécharger le fichier Markdown modifié sur votre appareil"');

// 12. Right Sidebar Quick Format
html = html.replaceAll('Quick Format', 'Formatage rapide');
html = html.replaceAll('Click to apply', 'Cliquer pour appliquer');
html = html.replace('<span>Heading 1</span>', '<span>Titre 1</span>');
html = html.replace('<span>Heading 2</span>', '<span>Titre 2</span>');
html = html.replace('<span>Heading 3</span>', '<span>Titre 3</span>');
html = html.replace('<span>Bullet List</span>', '<span>Liste à puces</span>');
html = html.replace('<span>Quote</span>', '<span>Citation</span>');
html = html.replace('<span>Code Block</span>', '<span>Bloc de code</span>');

html = html.replace('title="Convert to Heading 1 (# )"', 'title="Convertir en Titre 1 (# )"');
html = html.replace('title="Convert to Heading 2 (## )"', 'title="Convertir en Titre 2 (## )"');
html = html.replace('title="Convert to Heading 3 (### )"', 'title="Convertir en Titre 3 (### )"');
html = html.replace('title="Convert to Bullet List (- )"', 'title="Convertir en liste à puces (- )"');
html = html.replace('title="Convert to Blockquote (> )"', 'title="Convertir en bloc de citation (> )"');
html = html.replace('title="Convert to Code Block (```)"', 'title="Convertir en bloc de code (```)"');

// 13. Right Sidebar TOC
html = html.replace('Table of Contents', 'Table des matières');
html = html.replace('Progress', 'Progression');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">No headings found</p>', '<p class="text-gray-500 py-2 italic text-center">Aucun titre trouvé</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">Table of Contents</div>', '<div class="font-bold text-sm">Table des matières</div>');

// 15. I18N Object in JavaScript
const frI18n = `const I18N = {
      code: "fr",
      name: "French",
      flag: "🇫🇷",
      native: "Français",
      region: "France / Global",
      title: "AI Markdown Editor - Éditeur et Lecteur de Markdown en Ligne",
      desc: "Éditeur de Markdown en ligne pour modifier directement et prévisualiser élégamment les longs fichiers Markdown générés par l'IA via glisser-déposer. Gratuit et sans inscription.",
      subTitle: "Glissez des fichiers pour éditer et lire en ligne instantanément",
      badgeStatus: "✨ Éditeur",
      searchPlaceholder: "Rechercher dans le document... (Entrée pour suivant)",
      openFile: "Ouvrir le fichier",
      dropOverlayTitle: "Déposez les fichiers Markdown ici !",
      dropOverlayDesc: "Rendez et modifiez instantanément les longs documents générés par l'IA✨",
      heroTag: "Éditeur Markdown en ligne pour l'ère de l'IA",
      heroTitle1: "Longs Markdown d'IA ?",
      heroTitle2: "Déposez pour éditer & lire instantanément",
      heroTitle3: ".",
      heroDesc: "Affichez instantanément les spécifications, le code et les diagrammes Mermaid générés par ChatGPT, Claude, Gemini et DeepSeek. Éditez avec fluidité grâce à une saisie intuitive style Notion, enregistrez et copiez.",
      dropZoneTitle: "Glissez-déposez des fichiers Markdown ici",
      dropZoneSub: "ou cliquez pour parcourir vos fichiers",
      sampleBtn: "Tester le document d'exemple",
      pasteBtn: "Coller depuis le presse-papiers",
      statChar: "Caractères",
      statRead: "Temps de lecture",
      statReadUnit: "~{n} min",
      statHead: "Titres",
      statCode: "Blocs de code",
      statMmd: "Mermaid",
      tocTitle: "Table des matières",
      tocProgress: "Progression",
      tocEmpty: "Aucun titre trouvé",
      addBtn: "Ajouter",
      zenExit: "Quitter le mode focus (Esc)",
      unitChar: " caractères",
      unitHeading: " sections",
      unitCode: " blocs",
      unitMmd: " diagrammes",
      copied: "Copié !",
      saved: "Enregistré !",
      readingText: "Lecture en cours : ",
      alertSelectMd: "Veuillez sélectionner des fichiers Markdown (.md, .markdown, .txt)",
      alertSampleFail: "Échec du chargement des fichiers d'exemple.",
      alertSampleErr: "Erreur lors du chargement : ",
      alertClipEmpty: "Aucun texte dans le presse-papiers.",
      promptClip: "Collez votre texte Markdown ici :",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, frI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings
html = html.replaceAll(
  "showToastNotification(`Downloaded ${filename}!`);",
  "showToastNotification(`${filename} téléchargé avec succès !`);"
);

html = html.replaceAll(
  "showToastNotification('Copied Markdown text to clipboard!');",
  "showToastNotification('Texte Markdown copié dans le presse-papiers !');"
);

html = html.replace(
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';",
  "const defaultContent = '# Nouveau Document\\n\\nCliquez ici et commencez à écrire librement.\\n\\n## Test de saisie de titres\\nTapez `## ` et appuyez sur espace pour transformer automatiquement en titre H2.\\n\\n- `- ` pour une liste à puces\\n- `> ` pour une citation\\n- ```` pour un bloc de code\\n';"
);

html = html.replace(
  "await addDocument('New_Document.md', defaultContent, true);",
  "await addDocument('Nouveau_Document.md', defaultContent, true);"
);

fs.writeFileSync(frPath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/fr/index.html!');
