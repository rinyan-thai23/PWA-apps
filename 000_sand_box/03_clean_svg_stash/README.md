# Clean SVG Stash (クリーンSVGクリッパー & JSX変換)

## 概要
FigmaやAdobe Illustrator、Sketchなどのデザインツールからコピー＆ペーストしたSVGコードに含まれる大量のゴミタグ（`<metadata>`, `sketch:type`, `xmlns:*`, コメント, 空の `<defs>`, インラインスタイル）を瞬時にクリーンアップし、軽量なSVG、React (JSX)、Vue 3、CSS Data URIへ即座に変換・出力するWebユーティリティです。

- **PWA区分**: PWA非該当（Web Utility）
- **プライバシー**: 100% クライアントサイド処理（完全静音・サーバー通信ゼロ）
- **サンプルデータ**: `sample.svg` (Figmaエクスポート特有の膨大なメタデータとゴミ属性を含んだ実用サンプル)

## ディレクトリ構成
```
03_clean_svg_stash/
├── index.html        # 英語ポータル (Language Hub)
├── sample.svg        # 外部テスト用サンプルSVGファイル
├── README.md         # 仕様ドキュメント
├── en/
│   ├── index.html    # 英語版アプリケーション本体
│   └── sample.svg    # 英語版テスト用サンプル
└── ja/
    ├── index.html    # 日本語版アプリケーション本体
    └── sample.svg    # 日本語版テスト用サンプル
```

## 主な機能
1. **即座の自動サニタイズ**:
   - `<?xml ... ?>`, `<!DOCTYPE ...>`, `<metadata>`, コメントの完全除去
   - Figma / Illustrator / Inkscape 独自の名前空間（`sketch:type`, `inkscape:*`, `data-name` 等）の除去
   - `width`/`height` 寸法を自動検出しレスポンシブな `viewBox` へ正規化
   - 空の `<defs>`, `<title>`, `<desc>` のクリーンアップ
2. **リアルタイム・サイズ比較**:
   - 元のファイルサイズ vs 最適化後サイズ
   - 削減パーセンテージ（約40%〜70%削減）の即時表示
3. **4種類の書き出し＆コピー形式**:
   - **Clean SVG**: 余計な属性を削ぎ落としたプレーンなSVG
   - **React (JSX)**: `class` → `className`, `fill-rule` → `fillRule` 等の属性キャメルケース化およびインラインスタイルのオブジェクト化
   - **Vue 3 SFC**: `<template>` ラップのシングルファイルコンポーネント形式
   - **CSS Data URI**: `background-image: url("data:image/svg+xml,...");` 形式
4. **プレビュー表示**:
   - チェッカー透明背景 / ダーク背景 / ライト背景のワンクリック切り替え
5. **外部サンプルの自動非同期読み込み**:
   - 開いた瞬間に `sample.svg` をフェッチし、即座に最適化効果を体感可能
