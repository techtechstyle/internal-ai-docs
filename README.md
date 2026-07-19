# internal-ai-docs

社内 AI ナレッジベースのリポジトリです。入口は [docs/README.md](docs/README.md)。

## 現在の状態

| フェーズ | 状態 |
| --- | --- |
| 1. 最小構成(構造・テンプレート・憲章) | ✅ 本リポジトリ |
| 2. textlint 導入 | ✅ 正式導入済み(2026-07-18)。VS Code 連携+導入研修を整備 |
| 3. CI・混成読者対応 | 🔶 実装済み・実地確認待ち(2026-07-19)。詳細は下記「フェーズ3」参照 |
| 4. 鮮度管理 bot | 未着手 |

フェーズ1の完了条件: ✅ 達成(2026-07-18)。運用マニュアル v1.6 から3本を型分離して移行済み。

**運用マニュアル v1.6 からの移行は完了しました**(2026-07-19。旧マニュアルの改訂履歴を除く全内容)。今後の更新は、本リポジトリの `docs/` 配下と `ROADMAP.md` を正本として行います。詳細は下表を参照してください。

## 移行状況(運用マニュアル v1.6 → 本リポジトリ)

| 元 | 移行先 | 状態 |
| --- | --- | --- |
| 第1章(1-1〜1-4) | explanation/what-is-claude-code.md | ✅ 移行済み |
| 第2章(2-1・2-2) | how-to/setup-claude-code.md | ✅ 移行済み |
| 5-1(黄金律) | explanation/what-is-claude-code.md(追記) | ✅ 移行済み |
| 5-2・5-3 | reference/context-commands.md | ✅ 移行済み |
| 5-4(切り分け順序) | reference/context-commands.md(追記) | ✅ 移行済み |
| 付録A 用語集 | glossary.md | ✅ 統合済み(24語) |
| 第8章 8-1・8-2・8-4 | reference/claude-md-rules.md | ✅ 移行済み |
| 第8章 8-3 | how-to/declutter-claude-md.md | ✅ 移行済み |
| 1-5 契約プラン | reference/claude-plans.md | ✅ 移行済み |
| 2-3 研修活用 | explanation/what-is-claude-code.md(追記)+ tutorials/get-started-with-claude-code.md(NOTE) | ✅ 移行済み(統合) |
| 第7章 7-1・7-2 | reference/security-rules.md | ✅ 移行済み |
| 第7章 7-3・7-4 | explanation/prompt-injection-and-hooks.md | ✅ 移行済み |
| 第3章 3-1(方針) | explanation/what-is-claude-code.md(追記) | ✅ 移行済み |
| 第3章 3-1(構成)・3-2・3-3 | reference/shared-config-structure.md | ✅ 移行済み |
| 第4章 4-1・4-2 | how-to/run-standard-workflow.md | ✅ 移行済み |
| 第4章 4-3 | reference/prompt-patterns.md | ✅ 移行済み |
| 第6章 6-1(使い分け判断表)・6-2(description書式)・6-3(サブエージェント書式) | reference/skills-and-subagents.md | ✅ 移行済み |
| 第6章 6-2(スキル作成・配布手順) | how-to/create-and-share-a-skill.md | ✅ 移行済み |
| 第6章 6-4(MCP連携追加手順) | how-to/add-mcp-integration.md | ✅ 移行済み |
| 第9章 導入ロードマップ | `ROADMAP.md`(リポジトリルート) | ✅ 移行済み(配置はSG-ADR-003、本文も移行完了) |
| 第10章 利用状況の計測と報告(10-1・10-2) | reference/usage-reporting.md | ✅ 移行済み |
| 付録B FAQ(Q1〜3:切り分け系) | reference/troubleshooting-flowchart.md | ✅ 移行済み(統合) |
| 付録B FAQ(Q4:機密情報の扱い) | reference/security-rules.md(追記) | ✅ 移行済み |
| 付録B FAQ(Q5:利用料金) | reference/usage-reporting.md(追記) | ✅ 移行済み |
| 付録B FAQ(Q6:MCP/プラグイン申請) | reference/security-rules.md(追記) | ✅ 移行済み |
| 付録B FAQ(Q7:ヘッドレス/CI) | reference/security-rules.md(追記) | ✅ 移行済み(導入ロードマップへのリンクも追加済み) |
| 付録C 切り分けフロー(図) | reference/troubleshooting-flowchart.md | ✅ 移行済み(付録Bと統合、表形式に変換) |
| 付録D 公式参考資料 | reference/official-sources.md(公式ドキュメント一覧) | ✅ 移行済み |
| 付録D 改訂履歴(旧マニュアルの版歴) | — | 対象外(旧文書自体のメタ情報のため、新ナレッジベースには非移行) |

## フェーズ2: textlint 正式導入(完了・2026-07-18)

- リポジトリルートに `package.json`(`npm run lint:text` / `lint:text:fix`)と `.textlintrc.json` を配置済みです。
- `.vscode/settings.json` + `.vscode/extensions.json` により、リポジトリを開くと textlint 拡張機能(`3w36zj6.textlint`)のインストールを促し、Markdown 編集中にリアルタイムで指摘を表示します。
- 個人のセットアップ手順: [VS Code で textlint を有効にする](docs/how-to/setup-textlint-vscode.md)
- 導入研修(30分・ハンズオン): [textlint と一緒に文書を書く](docs/tutorials/textlint-onboarding.md)

知っておくこと: `textlint-filter-rule-comments` の追加インストールを忘れると、`.textlintrc.json` の `filters.comments` が読み込めず、エラーもなく「No rules found」と表示されて何もチェックされません。`package.json` の devDependencies に含めているため、`npm install` すれば発生しません。

## フェーズ3: CI・混成読者対応(実装済み・実地確認待ち・2026-07-19)

- `.github/workflows/docs-lint.yml`: docsの変更を含むPRで自動実行するCIです。textlint・frontmatterスキーマ検査・内部リンクチェック(lychee)をします(詳細設計書 §7.4)。
- `.github/pull_request_template.md`: docs PR 用チェックリスト(詳細設計書 §7.6)。
- `scripts/check-frontmatter.js`(`npm run lint:frontmatter`): frontmatterを検査するスクリプトです。4型の全文書について必須キー・audience値・owner・freshness-classとreview-byの整合・ロールバッジ整合を確認します。`npm run lint` でtextlintとまとめて実行されます。
- ロールバッジ・前提知識ブロック・glossary.md(24語、初版基準の20語を上回る)は既に全文書に適用済みです。運用マニュアル移行の過程で対応し、2026-07-19の通し読みレビューで確認済みです。

**残タスク(人手作業・Hide側)**:
- 本リポジトリを実際にGitHubへpushし、テスト用PRを1件出してCIが発火することを確認する。
- 事務メンバー向けのGitHub Web UI編集研修(30分、SG-ADR-000)を実施する。

上記2点が完了した時点で、詳細設計書 第10章のフェーズ3完了条件をすべて満たします。

