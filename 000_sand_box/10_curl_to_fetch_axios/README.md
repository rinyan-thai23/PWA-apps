# cURL to Fetch & Axios (cURL即時コード変換機)

## 概要
ブラウザの開発者ツール（Networkタブの「Copy as cURL」）や、API公式ドキュメント（OpenAI、Stripe、GitHubなど）からコピーした生cURLコマンドを、フロントエンド用のJavaScript (`fetch` / `axios`)、Node.js、Python (`requests`) の実行可能コードへ1ミリ秒で即座に変換するWebユーティリティです。

100%ローカルブラウザ上で動作するため、本番APIキーや社内認証トークンを含むcURLコマンドでも外部サーバーに一切送信されず、安全に変換できます。

画面上部には実務で多用される「OpenAI API」「GitHub API」「Stripe API」「単純GET」のクイックプリセットボタンが並び、どんなcURLを入力すればよいかが一目で直感的にわかる設計となっています。

- **PWA区分**: PWA非該当（Web Utility）
- **プライバシー**: 100% クライアントサイド処理（完全静音・サーバー通信ゼロ）
- **サンプルデータ**: `sample.sh` (OpenAI Chat Completions APIの実務cURLスクリプト)

## ディレクトリ構成
```
10_curl_to_fetch_axios/
├── index.html        # 英語ポータル (Language Hub)
├── sample.sh         # 外部テスト用サンプルファイル
├── README.md         # 仕様ドキュメント
├── en/
│   ├── index.html    # 英語版アプリケーション本体
│   └── sample.sh     # 英語版テスト用サンプル
└── ja/
    ├── index.html    # 日本語版アプリケーション本体
    └── sample.sh     # 日本語版テスト用サンプル
```

## 主な機能
1. **多重言語コードへの即時変換**:
   - **JavaScript (Fetch)**: ブラウザ標準のネイティブ `fetch()`
   - **Axios**: 人気のHTTPクライアント `axios.post()` / `axios.get()`
   - **Node.js**: `async/await` スタイルの完全な実行可能コード
   - **Python (Requests)**: `import requests` スタイルのPythonコード
2. **スマートcURLパーサー**:
   - 複数行のバックスラッシュ改行 (`\`) の自動結合
   - `-X` / `--request` (メソッド判定)
   - `-H` / `--header` (ヘッダー抽出)
   - `-d` / `--data` / `--data-raw` (JSONボディ自動検出・整形)
   - `-u` / `--user` (Basic認証のBase64エンコード変換)
3. **リクエスト解析サマリー**:
   - 検出メソッド（GET, POST, PUT, DELETEの色分けバッジ）、対象URL、ヘッダー件数をリアルタイム表示
4. **一目でわかるクイック実用プリセット**:
   - OpenAI、GitHub、Stripe、GETリクエストのサンプルボタンを搭載
5. **外部サンプルの自動非同期読み込み**:
   - 開いた瞬間に `sample.sh` をロードし、すぐにコード変換効果を体感可能
