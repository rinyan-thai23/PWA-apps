# 000_sand_box: 海外トレンド・マイクロWebツール群 (Micro Web Utilities)

このディレクトリには、英語圏のエンジニア・デザイナー・コンテンツ制作者の間で需要の高い「**誰かの小さな悩みを1アクションで解決するマイクロWebツール群（全10種）**」が格納されています。

各ツールはプロジェクトのアーキテクチャ基準に基づき、**英語ポータル (Hub) ＋ 日本語 (ja) / 英語 (en) の2言語構成**、**完全静音・100%クライアントサイド動作**（サーバー通信ゼロ・プライバシー完全保護）、**外部テストサンプルファイルの自動読み込み機能**、および**「一目でどんなデータを入力したらいいかが分かるクイックプリセット」**を備えています。

---

## 🛠️ 作成ツール一覧（全10ツール）

| # | ディレクトリ | ツール名 | 誰の何をどう解決するか |
|---|---|---|---|
| 01 | [`01_ai_token_squeezer`](./01_ai_token_squeezer/) | **AIコンテキスト脱脂機** | 長大なソースコードやログからコメント・空行・インデント・重複を除去し、LLMへの入力トークン消費を40〜65%圧縮・節約する。 |
| 02 | [`02_git_diff_viewer`](./02_git_diff_viewer/) | **即席Git差分ビューア** | `git diff` の生テキストやパッチファイルをブラウザ上でGitHub風の左右2列（Split）または統合（Unified）比較できる。 |
| 03 | [`03_clean_svg_stash`](./03_clean_svg_stash/) | **クリーンSVGクリッパー** | FigmaやIllustratorからエクスポートしたSVGに含まれる不要なXML属性・メタデータを削ぎ落とし、React (JSX) / Vue / CSS Data URIへ即変換する。 |
| 04 | [`04_social_card_simulator`](./04_social_card_simulator/) | **SNSシェア見え方シミュレーター** | 公開前にX (Twitter)、Discord、Slack、FacebookでのOGPリンクカードの表示・文字切れを同時プレビューし、`<head>` 用HTMLタグを自動生成する。 |
| 05 | [`05_secret_leak_blocker`](./05_secret_leak_blocker/) | **機密データ・マスク消去機** | ログやコードに含まれるAPIキー(OpenAI/AWS/Stripe等)、秘密鍵、IP、メール、JWTを自動検知し、安全な伏字にワンクリックでマスキングする。 |
| 06 | [`06_json_to_type_mock`](./06_json_to_type_mock/) | **超速JSON-to-TypeScript型変換＆モック** | APIレスポンスJSONからネストを分解したTypeScript型定義、Zodバリデーションスキーマ、ユニットテスト用モックJSONを即座に生成する。 |
| 07 | [`07_cron_human_translator`](./07_cron_human_translator/) | **Cron式・人間語リアルタイム翻訳＆発火予測** | `*/15 0-6 * * 1-5` などの複雑なCron式を即座に自然な人間語へ翻訳し、直近5回分の正確な実行日時（JST/UTC）をカウントダウン表示する。 |
| 08 | [`08_markdown_table_shaper`](./08_markdown_table_shaper/) | **超速マークダウン表整形＆スプレッドシート相互変換** | ガタガタのMarkdown表の余白パディングを綺麗に揃え、Excel/スプレッドシート(TSV/CSV)からの表生成、HTMLやJSONへの相互変換を行う。 |
| 09 | [`09_regex_speed_sandbox`](./09_regex_speed_sandbox/) | **即席正規表現チェッカー＆抽出機** | 100%ローカルメモリ完結で正規表現をテスト。マッチ箇所のハイライト、キャプチャグループの表抽出、JSON/リスト一括出力を行う。 |
| 10 | [`10_curl_to_fetch_axios`](./10_curl_to_fetch_axios/) | **cURL-to-JS/Pythonコード即時変換** | DevToolsやAPIドキュメントの生cURLコマンドを、JavaScript (`fetch` / `axios`)、Node.js、Python (`requests`) の実行可能コードへ即時変換する。 |

---

## 📁 各ツールの共通設計・アーキテクチャ

```
[各ツールディレクトリ]/
├── index.html        # 英語Language Hub (PWA非該当/Web Utility明記、各言語誘導カード)
├── sample.<ext>      # 外部テスト用サンプルファイル (長大な実データ)
├── README.md         # ツール仕様書 (日本語)
├── en/
│   ├── index.html    # 英語版Webアプリケーション本体
│   └── sample.<ext>  # 英語版テスト用サンプル
└── ja/
    ├── index.html    # 日本語版Webアプリケーション本体
    └── sample.<ext>  # 日本語版テスト用サンプル
```

- **Cloudflare Pages 完全互換**: 静的HTML/CSS/JSのみで構成され、静的ホスティングに即時デプロイ可能。
- **100% クライアントサイド実行**: ユーザーが入力したソースコード、APIキー、ログデータは一切外部サーバーに送信されません。
- **入力サンプルの視覚的明示**: 各ツールの画面上部にワンクリックで試せる実用プリセットボタンを配置し、どんなデータを入力すべきかが直感的に理解可能。
- **即時テスト体験**: すべてのアプリで、アクセスと同時に外部サンプルファイルが非同期フェッチされ、ツールの効果を0秒で体験できます。
