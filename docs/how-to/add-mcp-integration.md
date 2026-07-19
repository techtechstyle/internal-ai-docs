---
title: 外部連携(MCP)を追加する
type: how-to
audience: [se]
level: 中級
time: 15分
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# 外部連携(MCP)を追加する

`🔵 SE` `⏱ 15分`

この手順では、GitHub や Sentry などの外部サービスを、チーム共有の MCP 連携として追加します。

## はじめる前に

**必要なもの**

- プロジェクトの `.mcp.json` への書き込み権限
- 接続先サービスの API キーなどを環境変数として設定できる環境

**前提知識**

- `.mcp.json` の位置づけ([リファレンス: 共有設定ファイルの構成と優先順位](../reference/shared-config-structure.md)を参照)

## 手順

1. `claude mcp add` コマンドで、プロジェクトスコープの連携を追加します。

   ```bash
   claude mcp add --transport http sentry --scope project ...
   ```

2. API キーやパスワードを `.mcp.json` に直接書かず、環境変数への参照に置き換えます。

   > **WARNING:** `.mcp.json` に API キーやパスワードを直接書くことは禁止です。必ず環境変数参照にし、各自が自分の環境変数を設定します。コミットしても安全な状態を保つためです。

3. 変更内容を PR にしてレビューを受けます。

   単純な GitHub 連携であれば、MCP より `gh` コマンド(GitHub CLI)の方がコンテキスト効率に優れると公式も案内しています。単純な連携は、まず CLI を検討してください。

## 完了の確認

次の状態になっていれば完了です。

- [ ] `.mcp.json` に追加した連携が記載されている
- [ ] `.mcp.json` 内に API キー・パスワードが直接書かれていない
- [ ] PR がレビューを経てマージされている

この手順の操作はここまでです。

## よくあるエラーと対処

### 連携が反映されない

- 原因: `.mcp.json` の変更がコミットされていないか、スコープの指定が誤っています。
- 対処: `--scope project` を指定しているか確認し、`git status` でコミット漏れを確認します。

### 認証エラーになる

- 原因: 環境変数が設定されていないか、値が誤っています。
- 対処: 各自の環境変数の設定を確認します。API キーを `.mcp.json` に直接書くことは禁止です。

## 関連情報

- [リファレンス: スキル・サブエージェントの使い分けと書式](../reference/skills-and-subagents.md)
- [リファレンス: セキュリティルールと権限ベースライン](../reference/security-rules.md)
- [解説: Claude Code とは](../explanation/what-is-claude-code.md)
