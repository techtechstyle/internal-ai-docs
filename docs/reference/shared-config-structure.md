---
title: 共有設定ファイルの構成と優先順位
type: reference
audience: [se]
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# 共有設定ファイルの構成と優先順位

`🔵 SE`

本書は、チーム共有設定(CLAUDE.md・`.claude/` 一式)のリポジトリ標準構成、CLAUDE.md のメモリ階層、および設定ファイルの優先順位を記載します。対象バージョン: v1.6 由来。

## リポジトリの標準構成

```text
our-project/
├── CLAUDE.md               # プロジェクトの共有メモリ(200行以内)
├── CLAUDE.local.md         # 個人メモ(.gitignore対象)
├── .mcp.json               # チーム共有の外部連携設定
└── .claude/
    ├── settings.json       # チーム共有の権限・フック設定
    ├── settings.local.json # 個人設定(.gitignore対象)
    ├── rules/              # パス限定のハードルール
    ├── skills/             # チーム共有スキル
    └── agents/             # サブエージェント定義
```

設定は個人の PC に置かず、リポジトリの `.claude/` ディレクトリに集約します。変更はコードと同じく、プルリクエスト(PR)でレビューします。

## CLAUDE.md のメモリ階層(5層)

CLAUDE.md は複数の場所に置けます。広い範囲のものから順に、すべて加算的に読み込まれます。

| 層 | 種別 | 場所 | 共有範囲 |
| --- | --- | --- | --- |
| ① | 全社ポリシー | managed policy CLAUDE.md(MDM配布) | 全社。個人は除外不可 |
| ② | ユーザーメモリ | `~/.claude/CLAUDE.md` | 自分の全プロジェクト |
| ③ | プロジェクトメモリ(主戦場) | `./CLAUDE.md` | git でチーム共有 |
| ④ | ローカルメモリ | `./CLAUDE.local.md` | 個人。`.gitignore` 対象 |
| ⑤ | サブディレクトリ | `root/foo/CLAUDE.md` | 触れたときだけ読込 |

同じ内容を複数層に書きません(1箇所の原則)。すべての層は加算的に統合されます。

> **NOTE:** ルートの CLAUDE.md は一度読まれるとキャッシュされ、コンパクション後に再読み込みされます。サブディレクトリの CLAUDE.md は、そのディレクトリのファイルに触れたときだけ読み込まれます。モノレポでは、各チームが自分のサブツリーの CLAUDE.md を所有する運用が公式推奨です。

## 設定ファイル(settings)の優先順位

権限などの設定は CLAUDE.md と別系統で、優先順位を持ちます。上にあるものほど強く、下の設定を上書きします。

| 優先度 | 設定ファイル | 管理者 |
| --- | --- | --- |
| 1(最強) | `managed-settings.json`(managed policy) | 会社。MDM 配布で個人は上書き不可 |
| 2 | コマンドライン引数 | 実行者本人。その場限り |
| 3 | `.claude/settings.local.json` | 個人。プロジェクト内・非共有 |
| 4 | `.claude/settings.json` | チーム。git 共有(当面の主戦場) |
| 5(最弱) | `~/.claude/settings.json` | 個人。全プロジェクト共通 |

> **WARNING:** 権限ルールは「deny → ask → allow」の順で評価されます。deny があれば、他のどんな allow よりも優先されます。範囲の広い deny は、チーム全員の作業を止めます。deny は範囲を絞って書いてください。

## 関連情報

- CLAUDE.md に書く内容の判定基準: [CLAUDE.md 運用ルール一覧](claude-md-rules.md)
- 権限の deny・allow の書き方: [セキュリティルールと権限ベースライン](security-rules.md)
- スキル・サブエージェントの使い分けと書式: [スキル・サブエージェントの使い分けと書式](skills-and-subagents.md)
- 設定をコミットする理由(背景): [解説: Claude Code とは](../explanation/what-is-claude-code.md)
