# JSON to Type & Mock (超速JSON-to-TypeScript型変換＆モック生成)

## 概要
バックエンドAPIのレスポンスJSONやサードパーティWebhook、設定JSONを貼り付けるだけで、TypeScriptの型定義（`interface` または `type`）、Zodバリデーションスキーマ、ユニットテスト・Storybook用のダミーモックJSON（3件配列）を1ミリ秒で即座に生成するWebユーティリティです。

100%クライアントサイド処理で、機密データを含む本番APIレスポンスでも外部サーバーに一切送信されません。

- **PWA区分**: PWA非該当（Web Utility）
- **プライバシー**: 100% クライアントサイド処理（完全静音・サーバー通信ゼロ）
- **サンプルデータ**: `sample.json` (実用的なEコマース注文・決済・配送・顧客情報を含むネストJSON)

## ディレクトリ構成
```
06_json_to_type_mock/
├── index.html        # 英語ポータル (Language Hub)
├── sample.json       # 外部テスト用サンプルJSON
├── README.md         # 仕様ドキュメント
├── en/
│   ├── index.html    # 英語版アプリケーション本体
│   └── sample.json   # 英語版テスト用サンプル
└── ja/
    ├── index.html    # 日本語版アプリケーション本体
    └── sample.json   # 日本語版テスト用サンプル
```

## 主な機能
1. **TypeScript型定義の自動生成**:
   - ネストされたオブジェクトを自動分解し、意味のある型名（例: `PricingSummary`, `Customer`, `Item` 等）で分割出力
   - `interface` と `type` のワンクリック切り替え
   - イミュータブルな `readonly` プロパティ付与オプション
   - `export` キーワードの付与トグル
2. **Zodランタイムバリデーションスキーマ生成**:
   - `z.object({ ... })` による完全なZodスキーマの自動出力
   - `z.infer<typeof ...>` 型定義の同時出力
3. **テスト用モックJSON自動合成**:
   - 入力されたJSONの構造・プロパティ名（`email`, `date`, `id` 等）を解釈し、テストに使えるダミーデータを複数件配列として自動合成
4. **JSON整形 (Format) & エラー検知**:
   - 構文エラーをリアルタイムで検知し、インラインバナーでエラー位置を通知
5. **外部サンプルの自動非同期読み込み**:
   - 開いた瞬間に `sample.json` をロードし、すぐに型生成とモック合成を体感可能
