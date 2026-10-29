# Social Card Simulator (SNSシェア見え方シミュレーター & OGP生成)

## 概要
記事やWebサイト、LPの公開・更新前に、X (旧Twitter)、Discord、Slack、Facebook / LinkedIn などの主要プラットフォームで共有した際にどのようにカード表示（Link Preview / OGP）されるかをローカルブラウザ上でリアルタイムに事前確認できるWebユーティリティです。

タイトルの文字数制限、説明文の「…」省略箇所、画像のアスペクト比崩れを公開前に防止し、サイトの `<head>` にそのまま貼り付け可能なOGP HTMLタグをワンクリックで生成できます。

- **PWA区分**: PWA非該当（Web Utility）
- **プライバシー**: 100% クライアントサイド処理（完全静音・サーバー通信ゼロ）
- **サンプルデータ**: `sample.json` (実用的な長文タイトル・説明文・OGP画像を含んだテストデータ)

## ディレクトリ構成
```
04_social_card_simulator/
├── index.html        # 英語ポータル (Language Hub)
├── sample.json       # 外部テスト用サンプルデータ
├── README.md         # 仕様ドキュメント
├── en/
│   ├── index.html    # 英語版アプリケーション本体
│   └── sample.json   # 英語版テスト用サンプル
└── ja/
    ├── index.html    # 日本語版アプリケーション本体
    └── sample.json   # 日本語版テスト用サンプル
```

## 主な機能
1. **プラットフォーム別リアルタイム表示シミュレーション**:
   - **X (Twitter)**: Large Image Summary Card（ブラックUI、タイトル2行省略、説明文2行省略）
   - **Discord**: パープルアクセント・埋め込みリッチカード（タイトルリンク色、説明文3行省略）
   - **Slack**: ピンク/レッド左ボーダー・リンクアンファーリング形式
   - **Facebook / LinkedIn**: フィードカード形式
2. **文字数最適化インジケーター**:
   - タイトル文字数（推奨60文字カウント & 超過警告）
   - 説明文文字数（推奨120文字カウント & 超過警告）
3. **ローカル画像即時反映**:
   - 画像URL指定のほか、ローカル画像ファイルのドラッグ＆ドロップ（Data URL読み込み）に対応
4. **完全なOGP HTMLメタタグ自動生成**:
   - `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `twitter:card`, `twitter:creator` を即座にクリップボードコピー
5. **外部サンプルの自動非同期読み込み**:
   - 開いた瞬間に `sample.json` をロードし、すぐに各プラットフォームの見え方を比較・体感可能
