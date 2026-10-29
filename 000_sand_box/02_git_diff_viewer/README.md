# 🔍 Instant Git Diff Viewer (02_git_diff_viewer)

即席差分ビューア。  
ターミナルの `git diff` や AI（Cursor, Claude Code等）の修正パッチを貼り付けるだけで、**GitHub Pull Requestと全く同じ美しい左右比較（Split）や統合比較（Unified）を瞬時にレンダリング**する完全クライアントサイドWebツール。

---

## 📁 ディレクトリ構成

```text
02_git_diff_viewer/
├── index.html          # 🌟 ルート: 英語Language Hub (純粋Webツール明記)
├── sample.diff         # 動作確認用サンプルDiff
├── ja/                 # 🇯🇵 日本語版アプリ本体 (index.html, sample.diff)
└── en/                 # 🇺🇸 英語版アプリ本体 (index.html, sample.diff)
```

---

## ✨ 主な機能

- **左右2列（Split）& 統合（Unified）のワンクリック切り替え**
- **複数ファイル一括対応**: `diff --git` に含まれる複数ファイルを自動分解・ファイル別カード化
- **行番号 & 変更ハイライト**: 追加行（`+` 緑）、削除行（`-` 赤）、ハンクヘッダー（`@@` 紫）の視覚的色分け
- **外部サンプルファイル自動読み込み**: 画面を開いた瞬間にリアルなTypeScript & JSONの差分が即座に表示
- **100%クライアントサイド**: 外部通信ゼロ。機密コードやパッチも手元のブラウザ内で安全にプレビュー
- **PWA非該当（純粋なWebユーティリティ）**: インストール不要で即時利用可能
