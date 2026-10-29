# PWA & Web Apps プロジェクト

本リポジトリは、スマートフォンでのホーム画面追加（PWA）およびPCブラウザで軽快に動作するWebアプリケーション群を開発・管理するプロジェクトです。  
Cloudflare（Cloudflare Pages / Workers）での公開を前提とし、高速・セキュア・多言語展開を標準仕様としています。

---

## 🌐 アーキテクチャ標準ルール（多言語・Hub構成）

本リポジトリ内の各アプリケーションは、グローバル展開・SEO対策・AIエージェントによる正確な情報引用を最大化するため、以下の**「英語Hub ＋ 言語別サブディレクトリ構成」**を標準ルールとして統一します。

```text
各アプリディレクトリ/ (例: 001_wisper_rec_memo/)
├── index.html                 # 🌟 ルート: 英語Language Hub (言語選択・PWA有無・英語Overview)
├── manifest.json              # Webアプリマニフェスト (PWA対応アプリのみ)
├── sw.js                      # Service Worker (PWA対応アプリのみ)
├── icons/                     # アプリアイコン群
├── ja/                        # 🇯🇵 日本語版アプリ本体 (index.html)
├── en/                        # 🇺🇸 英語版アプリ本体 (index.html)
└── [その他言語]/              # 🇹🇭 th, 🇨🇳 zh, 🇪🇸 es など必要に応じて拡張可能
```

### 1. ルート `index.html`（Language Hub）の必須要件
- **言語基準**: **英語（国際共通語）** でスッキリと構成。
- **PWAステータスの明示**:
  - PWA対応アプリ（スマホで持ち歩く録音等）: `PWA: Supported (Installable)` を明記。
  - PC向けWebツール（D&Dビューア等）: `PWA: Not Applicable (Pure Web Utility / Zero Install)` を明記。
- **スリム言語セレクター**:
  - 各言語カードにはWindowsでも100%確実に表示される**高品質ベクターSVG国旗アイコン**を配置。
  - 各言語カード内は母国語（日本語、English、ไทย等）で表記。
  - `navigator.language` によるブラウザ言語自動検出バナーを設置。
- **SEO & AIクローラー向け英語説明セクション**:
  - アプリの価値、主要機能、動作の流れ、FAQ、およびSchema.org構造化データ（JSON-LD）を配置。

### 2. 各言語サブディレクトリ（`ja/`, `en/` 等）の要件
- 実際のアプリケーション本体（UI・ロジック）は各言語ディレクトリ配下に配置。
- ヘッダー等に他言語へワンタップで切り替えられるドロップダウン／リンクを設置。
- 全ページの `<head>` に `rel="alternate" hreflang="..."` 相互リンクを配置し、重複コンテンツ判定を防止。

---

## 📁 ディレクトリ構成

各アプリはプロジェクトルート配下に `3桁の連番_アプリ名` のディレクトリで独立して管理されます。

```text
PWA-apps/
├── README.md                      # プロジェクト全体仕様書・管理ドキュメント（本ファイル）
├── 000_sand_box/                  # 実験・プロトタイプ検証用サンドボックス
├── 001_wisper_rec_memo/           # 001: ボイスメモ文字起こし (Groq Whisper / PWA対応 / 7言語)
│   ├── index.html                 # 英語Language Hub (PWA対応明記・無料枠案内)
│   ├── manifest.json              # PWAマニフェスト
│   ├── sw.js                      # Service Worker
│   ├── icons/                     # アプリアイコン群
│   ├── ja/                        # 🇯🇵 日本語版アプリ本体 (index.html)
│   ├── en/                        # 🇺🇸 英語版アプリ本体 (index.html)
│   ├── th/                        # 🇹🇭 タイ語版アプリ本体 (index.html)
│   ├── zh/                        # 🇨🇳 中国語版アプリ本体 (index.html)
│   ├── es/                        # 🇪🇸 スペイン語版アプリ本体 (index.html)
│   ├── de/                        # 🇩🇪 ドイツ語版アプリ本体 (index.html)
│   └── fr/                        # 🇫🇷 フランス語版アプリ本体 (index.html)
├── 002_vision_camera/             # 002: ビジョンカメラ
└── 003_ai_md_viewer/              # 003: AI Markdown Reader (長文MD専用Webビューア / 7言語対応 / 純粋Webツール)
    ├── index.html                 # 英語Language Hub (PWA非該当明記)
    ├── icons/                     # アプリアイコン群
    ├── ja/                        # 🇯🇵 日本語版 (index.html)
    ├── en/                        # 🇺🇸 英語版 (index.html)
    ├── th/                        # 🇹🇭 タイ語版 (index.html)
    ├── zh/                        # 🇨🇳 中国語版 (index.html)
    ├── es/                        # 🇪🇸 スペイン語版 (index.html)
    ├── de/                        # 🇩🇪 ドイツ語版 (index.html)
    └── fr/                        # 🇫🇷 フランス語版 (index.html)
```

---

## 📱 PWA標準仕様・実装ルール (PWA対象アプリのみ)

1. **Web App Manifest (`manifest.json`)**
   - `name`: アプリの正式名称
   - `short_name`: スマホのホーム画面等に表示される短い名称（12文字以内推奨）
   - `start_url`: 相対パス指定（例: `./ja/index.html` または `./en/index.html`）
   - `display`: `standalone`
   - `background_color` / `theme_color`: アプリの世界観に合わせたテーマカラー設定
   - `icons`: 192x192、512x512（maskable / any）を含むアイコン定義

2. **Service Worker (`sw.js`)**
   - オフライン時でもUIが起動可能な構成

3. **アプリアイコン規格**
   - `icon-192.png` (192×192px)
   - `icon-512.png` (512×512px)
   - `apple-touch-icon.png` (180×180px)
   - `favicon.ico` または `favicon-32.png`

---

## 🚀 アプリ一覧

| No | ディレクトリ名 | アプリ名 | PWA対応 | 概要 | 状態 |
|---|---|---|---|---|---|
| **000** | `000_sand_box` | サンドボックス | - | 新機能・プロトタイプ検証用スペース | 準備中 |
| **001** | `001_wisper_rec_memo` | ボイスメモ文字起こし | **Yes** (PWA) | Groq Whisper APIを利用した超高速音声認識・メモ管理ツール | 多言語Hub化対応中 |
| **002** | `002_vision_camera` | ビジョンカメラ | **Yes** (PWA) | カメラ映像とAIビジョン連携ツール | 開発中 |
| **003** | `003_ai_md_viewer` | AI Markdown Reader | **No** (Web Tool) | AIの長大なMarkdownをドラッグ＆ドロップで美麗・快適に閲覧する専用ビューア | 7言語対応完了 |
