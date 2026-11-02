const fs = require('fs');

const targetPath = '003_ai_md_viewer/ja/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Insert Turndown & TipTap module in <head>
if (!html.includes('turndown.min.js')) {
  const insertPos = html.indexOf('<!-- Marked (Markdown Parser) -->');
  const scripts = `<!-- Turndown (HTML to Markdown Parser for TipTap) -->
  <script src="https://cdn.jsdelivr.net/npm/turndown@7.1.3/dist/turndown.min.js"></script>

  <!-- TipTap Core & StarterKit (Notion-style WYSIWYG) -->
  <script type="module">
    import { Editor } from 'https://esm.sh/@tiptap/core@2.1.13';
    import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2.1.13';
    import Placeholder from 'https://esm.sh/@tiptap/extension-placeholder@2.1.13';

    window.__initTipTapEditor = function(element, initialContent) {
      return new Editor({
        element: element,
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: '## で見出し、- でリスト、文字を自由に入力...',
          }),
        ],
        content: initialContent || '<p></p>',
        autofocus: 'end',
      });
    };
    window.__TipTapReady = true;
    window.dispatchEvent(new CustomEvent('tiptap-ready'));
  </script>

  `;
  html = html.substring(0, insertPos) + scripts + html.substring(insertPos);
}

// 2. Insert TipTap CSS in <style>
if (!html.includes('.ProseMirror {')) {
  const styleClosePos = html.indexOf('</style>');
  const tipTapCss = `
    /* TipTap Notion-style Editor Styles */
    .ProseMirror {
      outline: none;
      min-height: 480px;
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--text-main);
    }
    .ProseMirror p { margin-bottom: 1.1rem; }
    .ProseMirror h1 {
      font-size: 2.1rem;
      font-weight: 800;
      color: var(--h1-color, #ffffff);
      margin: 1.8rem 0 0.8rem 0;
      letter-spacing: -0.025em;
    }
    .ProseMirror h2 {
      font-size: 1.55rem;
      font-weight: 700;
      color: var(--h2-color, #f8fafc);
      margin: 1.6rem 0 0.7rem 0;
      letter-spacing: -0.02em;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.3rem;
    }
    .ProseMirror h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--h3-color, #38bdf8);
      margin: 1.3rem 0 0.5rem 0;
    }
    .ProseMirror ul, .ProseMirror ol {
      padding-left: 1.6rem;
      margin-bottom: 1.1rem;
    }
    .ProseMirror li { margin-bottom: 0.35rem; }
    .ProseMirror blockquote {
      border-left: 3px solid var(--accent-color, #6366f1);
      padding-left: 1rem;
      color: var(--text-muted);
      margin: 1.1rem 0;
      font-style: italic;
    }
    .ProseMirror pre {
      background: var(--code-bg, #0d1117);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.88rem;
      color: var(--h2-color, #38bdf8);
      overflow-x: auto;
      margin-bottom: 1.1rem;
    }
    .ProseMirror code {
      background: rgba(99, 102, 241, 0.15);
      color: #f43f5e;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.88em;
      font-family: ui-monospace, monospace;
    }
    .ProseMirror hr {
      border: none;
      border-top: 1px solid var(--border-color);
      margin: 2rem 0;
    }
    .ProseMirror p.is-editor-empty:first-child::before {
      color: var(--text-muted);
      opacity: 0.6;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
`;
  html = html.substring(0, styleClosePos) + tipTapCss + html.substring(styleClosePos);
}

// 3. Insert Edit button in header toolbar (before toggleSearchBtn)
if (!html.includes('id="toggleEditBtn"')) {
  const searchBtnPos = html.indexOf('<!-- Search Trigger -->');
  const editBtnHtml = `<!-- Notion Edit Mode Trigger -->
        <button id="toggleEditBtn" class="px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 border border-indigo-500/30 bg-indigo-500/10 transition flex items-center gap-1.5 text-xs font-semibold shadow-sm" title="編集モード切り替え (Ctrl+E)">
          <i data-lucide="edit-3" class="w-3.5 h-3.5 text-indigo-400" id="editIcon"></i>
          <span id="editBtnText">編集</span>
        </button>

        `;
  html = html.substring(0, searchBtnPos) + editBtnHtml + html.substring(searchBtnPos);
}

// 4. Insert "新規作成 (Notion風エディタ)" button in emptyState
if (!html.includes('id="createNewDocBtn"')) {
  const sampleBtnPos = html.indexOf('<button id="loadSampleBtn"');
  const createBtnHtml = `<button id="createNewDocBtn" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
              ✍️ 新規作成 (Notion風エディタ)
            </button>
            `;
  html = html.substring(0, sampleBtnPos) + createBtnHtml + html.substring(sampleBtnPos);
}

// 5. Insert edit button in aiSummaryCard
if (!html.includes('id="summaryEditBtn"')) {
  const printBtnPos = html.indexOf('<button id="printBtn"');
  const summaryEditHtml = `<button id="summaryEditBtn" class="px-2.5 py-1.5 rounded-lg text-indigo-300 hover:text-white bg-indigo-500/15 hover:bg-indigo-500/30 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1 transition" title="このドキュメントを編集 (Ctrl+E)">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              <span>編集</span>
            </button>
            `;
  html = html.substring(0, printBtnPos) + summaryEditHtml + html.substring(printBtnPos);
}

// 6. Insert editorWrapper after <article id="mainContent">
if (!html.includes('id="editorWrapper"')) {
  const articleClosePos = html.indexOf('</article>');
  const editorWrapperHtml = `

        <!-- Notion-style TipTap Editor Area (Hidden by default) -->
        <div id="editorWrapper" class="hidden pb-24">
          <!-- Editor Info & Action Toolbar -->
          <div class="mb-4 p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-sm" style="background-color: var(--bg-card); border-color: var(--border-color);">
            <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              <span class="inline-flex items-center gap-1 font-semibold text-indigo-400">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> タイピング操作:
              </span>
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400"># </span> 大見出し
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400">## </span> 中見出し
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400">### </span> 小見出し
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400">- </span> 箇条書き
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400">&gt; </span> 引用
              <span class="px-1.5 py-0.5 rounded bg-gray-800/80 border border-gray-700/60 font-mono text-[11px] text-sky-400">\`\`\`</span> コード枠
            </div>
            <div class="flex items-center gap-2">
              <button id="editorCopyMdBtn" class="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition flex items-center gap-1" title="現在のMarkdownをコピー">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">MDコピー</span>
              </button>
              <button id="editorCancelBtn" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 transition">
                キャンセル (Esc)
              </button>
              <button id="editorSaveBtn" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>保存して閲覧 (Ctrl+S)</span>
              </button>
            </div>
          </div>

          <!-- TipTap Mount Point -->
          <div id="tiptapEditorMount" class="p-6 sm:p-8 rounded-2xl border min-h-[560px] focus:outline-none shadow-inner" style="background-color: var(--bg-card); border-color: var(--border-color);">
          </div>
        </div>`;
  html = html.substring(0, articleClosePos + 10) + editorWrapperHtml + html.substring(articleClosePos + 10);
}

// 7. Insert TipTap JavaScript controller logic before closing </script>
if (!html.includes('let tiptapInstance = null;')) {
  const scriptClosePos = html.lastIndexOf('</script>');
  const tiptapControllerJs = `
    // ==========================================
    // TipTap Notion-style Editor Integration
    // ==========================================
    let tiptapInstance = null;
    let isEditingMode = false;
    let turndownService = null;

    function initTurndown() {
      if (typeof TurndownService !== 'undefined' && !turndownService) {
        turndownService = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced',
          bulletListMarker: '-'
        });
      }
    }

    function convertHtmlToMarkdown(htmlContent) {
      initTurndown();
      if (turndownService) {
        return turndownService.turndown(htmlContent);
      }
      // Fallback
      let md = htmlContent;
      md = md.replace(/<h1>(.*?)<\\/h1>/gi, '# $1\\n\\n');
      md = md.replace(/<h2>(.*?)<\\/h2>/gi, '## $1\\n\\n');
      md = md.replace(/<h3>(.*?)<\\/h3>/gi, '### $1\\n\\n');
      md = md.replace(/<blockquote><p>(.*?)<\\/p><\\/blockquote>/gi, '> $1\\n\\n');
      md = md.replace(/<pre><code>([\\s\\S]*?)<\\/code><\\/pre>/gi, '\`\`\`\\n$1\\n\`\`\`\\n\\n');
      md = md.replace(/<p>(.*?)<\\/p>/gi, '$1\\n\\n');
      return md.trim();
    }

    async function enterEditMode() {
      if (isEditingMode) return;

      // もしドキュメントが何もない場合は新規作成
      if (!activeDocId || documents.length === 0) {
        createNewDocAndEdit();
        return;
      }

      const doc = documents.find(d => d.id === activeDocId);
      if (!doc) return;

      isEditingMode = true;

      // UI表示切り替え
      document.getElementById('mainContent').classList.add('hidden');
      document.getElementById('aiSummaryCard').classList.add('hidden');
      document.getElementById('editorWrapper').classList.remove('hidden');

      const badge = document.getElementById('badgeStatus');
      badge.textContent = '✨ 編集モード (Notion風)';
      badge.className = 'hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';

      const toggleBtn = document.getElementById('toggleEditBtn');
      if (toggleBtn) {
        toggleBtn.classList.add('bg-indigo-600', 'text-white');
        toggleBtn.classList.remove('bg-indigo-500/10', 'text-gray-300');
        document.getElementById('editBtnText').textContent = '閲覧に戻る';
      }

      // TipTapの初期化またはコンテンツ設定
      const mountEl = document.getElementById('tiptapEditorMount');
      const initialHtml = marked.parse(doc.rawMarkdown || '');

      if (!tiptapInstance) {
        if (window.__initTipTapEditor) {
          tiptapInstance = window.__initTipTapEditor(mountEl, initialHtml);
        } else {
          window.addEventListener('tiptap-ready', () => {
            tiptapInstance = window.__initTipTapEditor(mountEl, initialHtml);
          }, { once: true });
        }
      } else {
        tiptapInstance.commands.setContent(initialHtml);
        tiptapInstance.commands.focus('end');
      }

      lucide.createIcons();
    }

    async function saveAndExitEditMode() {
      if (!isEditingMode) return;

      if (!activeDocId || documents.length === 0) {
        isEditingMode = false;
        return;
      }

      const doc = documents.find(d => d.id === activeDocId);
      if (!doc) return;

      if (tiptapInstance) {
        const editorHtml = tiptapInstance.getHTML();
        const newMarkdown = convertHtmlToMarkdown(editorHtml);

        // ドキュメントを新しいMarkdownで再コンパイル
        const updatedDoc = compileMarkdownToDoc(doc.title, newMarkdown);
        doc.rawMarkdown = updatedDoc.rawMarkdown;
        doc.preprocessedHtml = updatedDoc.preprocessedHtml;
        doc.headingsData = updatedDoc.headingsData;
        doc.stats = updatedDoc.stats;
      }

      isEditingMode = false;

      // UI復元
      document.getElementById('editorWrapper').classList.add('hidden');
      document.getElementById('mainContent').classList.remove('hidden');
      document.getElementById('aiSummaryCard').classList.remove('hidden');

      const badge = document.getElementById('badgeStatus');
      badge.textContent = '閲覧中';
      badge.className = 'hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';

      const toggleBtn = document.getElementById('toggleEditBtn');
      if (toggleBtn) {
        toggleBtn.classList.remove('bg-indigo-600', 'text-white');
        toggleBtn.classList.add('bg-indigo-500/10', 'text-gray-300');
        document.getElementById('editBtnText').textContent = '編集';
      }

      // ドキュメント再描画
      await switchDocument(activeDocId);
      launchConfetti();
      showToastNotification('ドキュメントを保存・更新しました！');
    }

    function cancelEditMode() {
      if (!isEditingMode) return;
      isEditingMode = false;

      document.getElementById('editorWrapper').classList.add('hidden');
      document.getElementById('mainContent').classList.remove('hidden');
      document.getElementById('aiSummaryCard').classList.remove('hidden');

      const badge = document.getElementById('badgeStatus');
      badge.textContent = '閲覧中';
      badge.className = 'hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';

      const toggleBtn = document.getElementById('toggleEditBtn');
      if (toggleBtn) {
        toggleBtn.classList.remove('bg-indigo-600', 'text-white');
        toggleBtn.classList.add('bg-indigo-500/10', 'text-gray-300');
        document.getElementById('editBtnText').textContent = '編集';
      }
    }

    async function createNewDocAndEdit() {
      const defaultContent = '# 新規ドキュメント\\n\\nここをクリックして自由に文章を書き始めてください。\\n\\n## 見出しのタイピングテスト\\n\`## \` と入力してスペースを押すと自動でH2見出しになります。\\n\\n- \`- \` で箇条書きリスト\\n- \`> \` で引用ブロック\\n- \`\`\`\` でコード枠\\n';
      const doc = await addDocument('新規ドキュメント.md', defaultContent, true);
      await enterEditMode();
    }

    function showToastNotification(message) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-8 right-8 bg-emerald-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-2xl z-50 transition-all duration-300 flex items-center gap-2 transform translate-y-4 opacity-0 pointer-events-none';
      toast.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>' + escapeHtml(message) + '</span>';
      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }

    // イベントリスナー接続
    document.addEventListener('DOMContentLoaded', () => {
      initTurndown();

      const toggleEditBtn = document.getElementById('toggleEditBtn');
      if (toggleEditBtn) {
        toggleEditBtn.addEventListener('click', () => {
          if (isEditingMode) {
            saveAndExitEditMode();
          } else {
            enterEditMode();
          }
        });
      }

      const summaryEditBtn = document.getElementById('summaryEditBtn');
      if (summaryEditBtn) {
        summaryEditBtn.addEventListener('click', enterEditMode);
      }

      const createNewDocBtn = document.getElementById('createNewDocBtn');
      if (createNewDocBtn) {
        createNewDocBtn.addEventListener('click', createNewDocAndEdit);
      }

      const editorSaveBtn = document.getElementById('editorSaveBtn');
      if (editorSaveBtn) {
        editorSaveBtn.addEventListener('click', saveAndExitEditMode);
      }

      const editorCancelBtn = document.getElementById('editorCancelBtn');
      if (editorCancelBtn) {
        editorCancelBtn.addEventListener('click', cancelEditMode);
      }

      const editorCopyMdBtn = document.getElementById('editorCopyMdBtn');
      if (editorCopyMdBtn) {
        editorCopyMdBtn.addEventListener('click', async () => {
          if (tiptapInstance) {
            const md = convertHtmlToMarkdown(tiptapInstance.getHTML());
            try {
              await navigator.clipboard.writeText(md);
              showToastNotification('Markdownをクリップボードにコピーしました！');
            } catch (e) {
              console.error(e);
            }
          }
        });
      }

      // ショートカットキー (Ctrl+E で編集トグル, Ctrl+S で保存, Esc でキャンセル)
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
          e.preventDefault();
          if (isEditingMode) {
            saveAndExitEditMode();
          } else {
            enterEditMode();
          }
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && isEditingMode) {
          e.preventDefault();
          saveAndExitEditMode();
        } else if (e.key === 'Escape' && isEditingMode) {
          e.preventDefault();
          cancelEditMode();
        }
      });
    });
`;
  html = html.substring(0, scriptClosePos) + tiptapControllerJs + html.substring(scriptClosePos);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated 003_ai_md_viewer/ja/index.html with TipTap Notion editor!');
