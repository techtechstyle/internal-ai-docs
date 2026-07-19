# 導入ロードマップ(4段階)

このロードマップは、Claude Code のチーム展開を4つのステージで進めるための、進捗を管理する文書です。読者向けの知識文書ではないため、`docs/` 配下の4型構造には含めず、リポジトリ直下に置いています([スタイルガイド §3.4](docs/_style/style-guide.md)・SG-ADR-003)。

## 個人運用の間の最小セット

チーム展開前の個人運用の間は、ステージ0〜1のうち次の4つだけ実施すれば十分です。これらはチーム移行時に、ステージ0〜1の成果物としてそのまま流用できます。

- [ ] `/init` で CLAUDE.md を作成する(200行以内。[CLAUDE.md 運用ルール一覧](docs/reference/claude-md-rules.md)を参照)
- [ ] deny ベースラインを `settings.json` に設定する([セキュリティルールと権限ベースライン](docs/reference/security-rules.md)を参照)
- [ ] サンドボックスを有効化する([Claude Code の個人環境をセットアップする](docs/how-to/setup-claude-code.md)を参照)
- [ ] 自分の定型作業を1〜2個スキル化する([チーム共有スキルを作成して配布する](docs/how-to/create-and-share-a-skill.md)を参照)

## 全体像:4ステージ

段階的に「守り」を厚くしていきます。週数・人数の目安は例示であり、公式の規定値ではありません。

| ステージ | 内容 | 目安時期 |
| --- | --- | --- |
| 0 | 基盤づくり | 第1週 |
| 1 | ワークフロー標準化 | 第2〜3週 |
| 2 | 自動化と計測 | 第3〜4週 |
| 3 | スケール時の統制 | 利用拡大後 |

当社の現実解は、ステージ0〜2を最初の1か月で完了し、ステージ3は「必要になってから」進めることです。

> **注意:** いきなり全員展開は禁物です。当社規模でも、まず2〜3名のパイロットメンバーで2週間試し、その人たちがチャンピオン(社内の相談役)になってから全員展開します。

## ステージ別チェックリスト

### ステージ0: 基盤づくり(第1週)

- [ ] `/init` で CLAUDE.md を生成し、200行以内に刈り込み、コミットしてオーナーを任命する
- [ ] 権限ベースライン入りの `.claude/settings.json` をコミットする([セキュリティルールと権限ベースライン](docs/reference/security-rules.md))
- [ ] 全員がサンドボックスを有効化する(Linux 手順を CLAUDE.md に記載)
- [ ] 価値の高い1〜2個の連携で `.mcp.json` をコミットする。シークレットは環境変数参照にする([外部連携(MCP)を追加する](docs/how-to/add-mcp-integration.md))

### ステージ1: ワークフロー標準化(第2〜3週)

- [ ] 実際の規約を体系化した共有スキルを3〜5個作成する(レビュー観点、デプロイ手順、テスト作成パターン等。[チーム共有スキルを作成して配布する](docs/how-to/create-and-share-a-skill.md))
- [ ] CLAUDE.md 内の「必ず/禁止」記述を、フックとパス限定ルールへ移設する([肥大化した CLAUDE.md を棚卸しする](docs/how-to/declutter-claude-md.md))
- [ ] レビュー用サブエージェントを追加し、Writer / Reviewer 分離をチーム規範化する([標準ワークフローでタスクを進める](docs/how-to/run-standard-workflow.md)、[スキル・サブエージェントの使い分けと書式](docs/reference/skills-and-subagents.md))
- [ ] 勉強会を開催し、4ステップワークフロー・`/clear` 衛生・切り分け順序を扱います。Anthropic 自身も「ワークフロー実演会」でこの手法を普及させました。
  参照: [標準ワークフローでタスクを進める](docs/how-to/run-standard-workflow.md)、[困ったときの切り分け表](docs/reference/troubleshooting-flowchart.md)

### ステージ2: 自動化と計測(第3〜4週)

- [ ] `/install-github-app` で GitHub Actions 連携を導入する。まず読み取り専用の PR レビューから始めます(`max_turns` 上限つき、Write 権限なし)。
  参照: [セキュリティルールと権限ベースライン](docs/reference/security-rules.md)の「ヘッドレスモード・CI での自動実行」、[公式ドキュメント一覧](docs/reference/official-sources.md)の CI / GitHub Actions
- [ ] アナリティクスダッシュボードを有効化する([利用状況の計測と報告](docs/reference/usage-reporting.md))
- [ ] 新人オンボーディングの標準手順に「Claude Code でコードベース探索」を組み込む([Claude Code とは](docs/explanation/what-is-claude-code.md)の「新人研修での活用」、[はじめての Claude Code](docs/tutorials/get-started-with-claude-code.md))

### ステージ3: スケール時の統制(利用拡大後)

- [ ] MDM 配布の `managed-settings.json` へ移行する(`disableBypassPermissionsMode` 等)。
  参照: [共有設定ファイルの構成と優先順位](docs/reference/shared-config-structure.md)の優先順位表
- [ ] 共有設定が安定したらプラグイン化し、社内マーケットプレイスへ配布する(`/plugin install` のみでセットアップが完了する)
- [ ] 監査要件が出たら Enterprise(SSO / SCIM / Compliance API)を検討する。
  参照: [Claude 契約プランと管理機能一覧](docs/reference/claude-plans.md)

> **メモ:** ステージ3へ進む判断基準は、「全メンバーの PC がベースライン設定を維持していると信頼できなくなったとき」「セキュリティ・コンプライアンスが上書き不能なポリシーを要求したとき」です。単一チーム規模のうちは、git 共有の `settings.json` で十分な期間が続く見込みです。
