# PWA Apps プロジェクト

本リポジトリは、スマートフォンでのホーム画面追加（PWA）およびPCブラウザで軽快に動作するWebアプリケーション群を開発・管理するプロジェクトです。

---

## 📁 ディレクトリ構成

各アプリはプロジェクトルート配下に `3桁の連番_アプリ名` のディレクトリで独立して管理されます。

```text
PWA-apps/
├── README.md                      # プロジェクト全体仕様書・管理ドキュメント（本ファイル）
├── 001_wisper_rec_memo/           # 001: ボイスメモ文字起こしアプリ (Groq Whisper)
│   ├── index.html                 # メインUI・ロジック
│   ├── manifest.json              # Webアプリマニフェスト (PWA設定)
│   ├── sw.js                      # Service Worker (オフラインキャッシュ等)
│   └── icons/                     # アプリアイコン (192x192, 512x512 等)
└── ...（今後のアプリを追加）
```

---

## 📱 PWA標準仕様・実装ルール

本プロジェクトで作成する各アプリケーションは、以下のPWA標準を満たす構成とします。

1. **Web App Manifest (`manifest.json`)**
   - `name`: アプリの正式名称
   - `short_name`: スマホのホーム画面等に表示される短い名称（12文字以内推奨）
   - `start_url`: 相対パス指定（例: `./index.html`）
   - `display`: `standalone`（ブラウザのURLバーを表示せずネイティブアプリ風に起動）
   - `background_color` / `theme_color`: アプリの世界観に合わせたテーマカラー設定
   - `icons`: 192x192、512x512（maskable / any）を含むアイコン定義

2. **Service Worker (`sw.js`)**
   - 静的リソース（HTML, CSS, JS, アイコン）の事前キャッシュ
   - ネットワークファースト / キャッシュファースト等の適切なキャッシュ戦略
   - オフライン時でもUIが起動可能な構成

3. **HTML Head設定 (`index.html`)**
   - モバイル向けビューポート指定（`viewport-fit=cover` 等）
   - `<link rel="manifest" href="manifest.json">`
   - Apple iOS向け設定（`<meta name="apple-mobile-web-app-capable" content="yes">`, `<link rel="apple-touch-icon" ...>`）
   - テーマカラー用 `<meta name="theme-color">`

4. **アプリアイコン規格**
   - `icon-192.png` (192×192px)
   - `icon-512.png` (512×512px)
   - `apple-touch-icon.png` (180×180px)
   - `favicon.ico` または `favicon-32.png`

---

## 🚀 アプリ一覧

| No | ディレクトリ名 | アプリ名 | 概要 | 状態 |
|---|---|---|---|---|
| **001** | `001_wisper_rec_memo` | ボイスメモ文字起こし | Groq Whisper APIを利用した超高速音声認識・メモ管理ツール | PWA化完了 |
