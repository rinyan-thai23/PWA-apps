const fs = require('fs');

const enPath = '003_ai_md_viewer/en/index.html';
const esPath = '003_ai_md_viewer/es/index.html';

let html = fs.readFileSync(enPath, 'utf8').replace(/\r\n/g, '\n');

// 1. html lang
html = html.replace('<html lang="en" class="dark">', '<html lang="es" class="dark">');

// 2. SEO Meta & Title
html = html.replace(
  '<title>AI Markdown Editor - Online Markdown Editor & Reader</title>',
  '<title>AI Markdown Editor - Editor y Visor de Markdown Online</title>'
);

html = html.replace(
  '<meta name="description" content="An online Markdown editor to directly edit and beautifully preview long AI-generated Markdown files with instant drag-and-drop. Free & no signup required.">',
  '<meta name="description" content="Editor de Markdown online para editar directamente y previsualizar de forma hermosa archivos Markdown largos generados por IA con arrastrar y soltar. Gratis y sin registro.">'
);

// Hreflang links for ES
const enHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="./" />
  <link rel="alternate" hreflang="x-default" href="./" />`;

const esHreflangs = `<link rel="alternate" hreflang="ja" href="../ja/" />
  <link rel="alternate" hreflang="en" href="../en/" />
  <link rel="alternate" hreflang="th" href="../th/" />
  <link rel="alternate" hreflang="zh" href="../zh/" />
  <link rel="alternate" hreflang="es" href="./" />
  <link rel="alternate" hreflang="de" href="../de/" />
  <link rel="alternate" hreflang="fr" href="../fr/" />
  <link rel="alternate" hreflang="x-default" href="../en/" />`;

html = html.replace(enHreflangs, esHreflangs);

// 3. TipTap Placeholder
html = html.replace(
  "placeholder: 'Type ## for heading, - for list, or start typing freely...',",
  "placeholder: 'Escribe ## para encabezado, - para lista, o comienza a escribir libremente...',"
);

// 4. Header Subtitle & Status Badge
html = html.replace(
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Drop files to instantly edit & read online</p>',
  '<p class="text-xs text-gray-400 truncate" id="docSubTitle">Suelta archivos para editar y leer online al instante</p>'
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

// Replace header lang button (US -> ES)
html = html.replace(
  `<span class="hidden md:inline">English</span>`,
  `<span class="hidden md:inline">Español</span>`
);
html = html.replace(flags.us, flags.es); // First occurrence (header button)

// Language dropdown replacement for ES
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
              <span class="flex items-center gap-2">${flags.es} <span>Español</span></span>
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
html = html.replace('<span>Exit Focus (Esc)</span>', '<span>Salir del modo enfoque (Esc)</span>');

// 7. Header Actions (Search, Theme, Open File)
html = html.replace('placeholder="Search document... (Enter to next)"', 'placeholder="Buscar en el documento... (Enter para siguiente)"');
html = html.replace('<span class="hidden sm:inline">Open File</span>', '<span class="hidden sm:inline">Abrir archivo</span>');
html = html.replace('<span class="hidden sm:inline">Add</span>', '<span class="hidden sm:inline">Añadir</span>');

// 8. Drop Overlay
html = html.replace('Drop Markdown Files Here!', '¡Suelta los archivos Markdown aquí!');
html = html.replace('Instantly render and edit AI-generated long documents✨', 'Renderiza y edita al instante documentos largos generados por IA✨');

// 9. Empty State Copy & Buttons
html = html.replace(
  '<i data-lucide="bot" class="w-4 h-4"></i> Online Markdown Editor for the AI Era',
  '<i data-lucide="bot" class="w-4 h-4"></i> Editor de Markdown online para la era de la IA'
);

html = html.replace(
  'Long AI Markdown?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Drop to Edit & Read Instantly</span>.',
  '¿Markdown largo de IA?<br class="sm:hidden"><span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Suelta para editar y leer al instante</span>.'
);

html = html.replace(
  'Instantly render long specs, code, and Mermaid diagrams from ChatGPT, Claude, Gemini & DeepSeek. Edit frictionlessly with intuitive Notion-style typing, save, and copy.',
  'Renderiza al instante especificaciones, código y diagramas Mermaid generados por ChatGPT, Claude, Gemini y DeepSeek. Edita fluidamente con escritura intuitiva estilo Notion, guarda y copia.'
);

html = html.replace(
  'Drag & drop Markdown files here',
  'Arrastra y suelta archivos Markdown aquí'
);

html = html.replace(
  'or click to browse from device',
  'o haz clic para buscar en tu dispositivo'
);

html = html.replace('Try Sample Spec', 'Probar documento de muestra');
html = html.replace('Paste from Clipboard', 'Pegar del portapapeles');
html = html.replace('New Document', 'Nuevo documento');
html = html.replace('title="Create a new blank document to start writing directly"', 'title="Crear un documento en blanco para empezar a escribir directamente"');

// 10. Document Viewer Metrics
html = html.replace('<span class="text-gray-400 text-[11px]">Characters</span>', '<span class="text-gray-400 text-[11px]">Caracteres</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Read Time</span>', '<span class="text-gray-400 text-[11px]">Tiempo de lectura</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Headings</span>', '<span class="text-gray-400 text-[11px]">Encabezados</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Code Blocks</span>', '<span class="text-gray-400 text-[11px]">Bloques de código</span>');
html = html.replace('<span class="text-gray-400 text-[11px]">Mermaid</span>', '<span class="text-gray-400 text-[11px]">Mermaid</span>');

// 11. Right Sidebar Top Buttons
html = html.replace('<span>Copy Text</span>', '<span>Copiar texto</span>');
html = html.replace('<span>Download MD</span>', '<span>Descargar md</span>');
html = html.replace('title="Copy entire document (Markdown) to clipboard"', 'title="Copiar documento completo (Markdown) al portapapeles"');
html = html.replace('title="Download edited Markdown file to device"', 'title="Descargar archivo Markdown editado en el dispositivo"');

// 12. Right Sidebar Quick Format
html = html.replaceAll('Quick Format', 'Formato rápido');
html = html.replaceAll('Click to apply', 'Clic para aplicar');
html = html.replace('<span>Heading 1</span>', '<span>Encabezado 1</span>');
html = html.replace('<span>Heading 2</span>', '<span>Encabezado 2</span>');
html = html.replace('<span>Heading 3</span>', '<span>Encabezado 3</span>');
html = html.replace('<span>Bullet List</span>', '<span>Lista de viñetas</span>');
html = html.replace('<span>Quote</span>', '<span>Cita</span>');
html = html.replace('<span>Code Block</span>', '<span>Bloque de código</span>');

html = html.replace('title="Convert to Heading 1 (# )"', 'title="Convertir en Encabezado 1 (# )"');
html = html.replace('title="Convert to Heading 2 (## )"', 'title="Convertir en Encabezado 2 (## )"');
html = html.replace('title="Convert to Heading 3 (### )"', 'title="Convertir en Encabezado 3 (### )"');
html = html.replace('title="Convert to Bullet List (- )"', 'title="Convertir en lista de viñetas (- )"');
html = html.replace('title="Convert to Blockquote (> )"', 'title="Convertir en bloque de cita (> )"');
html = html.replace('title="Convert to Code Block (```)"', 'title="Convertir en bloque de código (```)"');

// 13. Right Sidebar TOC
html = html.replace('Table of Contents', 'Tabla de contenidos');
html = html.replace('Progress', 'Progreso');
html = html.replace('<p class="text-gray-500 py-2 italic text-center">No headings found</p>', '<p class="text-gray-500 py-2 italic text-center">No se encontraron encabezados</p>');

// 14. Mobile TOC Modal
html = html.replace('<div class="font-bold text-sm">Table of Contents</div>', '<div class="font-bold text-sm">Tabla de contenidos</div>');

// 15. I18N Object in JavaScript
const esI18n = `const I18N = {
      code: "es",
      name: "Spanish",
      flag: "🇪🇸",
      native: "Español",
      region: "Spain / LatAm",
      title: "AI Markdown Editor - Editor y Visor de Markdown Online",
      desc: "Editor de Markdown online para editar directamente y previsualizar de forma hermosa archivos Markdown largos generados por IA con arrastrar y soltar. Gratis y sin registro.",
      subTitle: "Suelta archivos para editar y leer online al instante",
      badgeStatus: "✨ Editor",
      searchPlaceholder: "Buscar en el documento... (Enter para siguiente)",
      openFile: "Abrir archivo",
      dropOverlayTitle: "¡Suelta los archivos Markdown aquí!",
      dropOverlayDesc: "Renderiza y edita al instante documentos largos generados por IA✨",
      heroTag: "Editor de Markdown online para la era de la IA",
      heroTitle1: "¿Markdown largo de IA?",
      heroTitle2: "Suelta para editar y leer al instante",
      heroTitle3: ".",
      heroDesc: "Renderiza al instante especificaciones, código y diagramas Mermaid generados por ChatGPT, Claude, Gemini y DeepSeek. Edita fluidamente con escritura intuitiva estilo Notion, guarda y copia.",
      dropZoneTitle: "Arrastra y suelta archivos Markdown aquí",
      dropZoneSub: "o haz clic para buscar en tu dispositivo",
      sampleBtn: "Probar documento de muestra",
      pasteBtn: "Pegar del portapapeles",
      statChar: "Caracteres",
      statRead: "Tiempo de lectura",
      statReadUnit: "~{n} min",
      statHead: "Encabezados",
      statCode: "Bloques de código",
      statMmd: "Mermaid",
      tocTitle: "Tabla de contenidos",
      tocProgress: "Progreso",
      tocEmpty: "No se encontraron encabezados",
      addBtn: "Añadir",
      zenExit: "Salir del modo enfoque (Esc)",
      unitChar: " caracteres",
      unitHeading: " secciones",
      unitCode: " bloques",
      unitMmd: " diagramas",
      copied: "¡Copiado!",
      saved: "¡Guardado!",
      readingText: "Leyendo: ",
      alertSelectMd: "Por favor selecciona archivos Markdown (.md, .markdown, .txt)",
      alertSampleFail: "Error al cargar los archivos de muestra.",
      alertSampleErr: "Error de muestra: ",
      alertClipEmpty: "No hay texto en el portapapeles.",
      promptClip: "Pega tu texto Markdown aquí:",
      sampleFile1: "sample.md",
      sampleFile2: "sample_frontend.md"
    };`;

const oldI18nRegex = /const I18N = \{[\s\S]*?\};\s*let documents = \[\];/;
html = html.replace(oldI18nRegex, esI18n + '\n\n    let documents = [];');

// 16. Toast notifications and JS strings
html = html.replaceAll(
  "showToastNotification(`Downloaded ${filename}!`);",
  "showToastNotification(`¡${filename} descargado con éxito!`);"
);

html = html.replaceAll(
  "showToastNotification('Copied Markdown text to clipboard!');",
  "showToastNotification('¡Texto Markdown copiado al portapapeles!');"
);

html = html.replace(
  "const defaultContent = '# New Document\\n\\nClick here and start writing freely.\\n\\n## Heading Typing Test\\nType `## ` and press space to transform into an H2 heading.\\n\\n- `- ` for bullet list\\n- `> ` for blockquote\\n- ```` for code block\\n';",
  "const defaultContent = '# Nuevo Documento\\n\\nHaz clic aquí y comienza a escribir libremente.\\n\\n## Prueba de escritura de encabezados\\nEscribe `## ` y presiona espacio para transformar en un encabezado H2.\\n\\n- `- ` para lista con viñetas\\n- `> ` para bloque de cita\\n- ```` para bloque de código\\n';"
);

html = html.replace(
  "await addDocument('New_Document.md', defaultContent, true);",
  "await addDocument('Nuevo_Documento.md', defaultContent, true);"
);

fs.writeFileSync(esPath, html, 'utf8');
console.log('Successfully generated complete 003_ai_md_viewer/es/index.html!');
