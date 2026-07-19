---
title: Claude Code の個人環境をセットアップする
type: how-to
audience: [se]
level: 初級
time: 20分
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# Claude Code の個人環境をセットアップする

`🔵 SE` `⏱ 20分`

この手順では、チーム標準の [Claude Code](../glossary.md#claude-code) 環境を自分の PC に構築し、安全な状態で使い始められるようにします。

## はじめる前に

**必要なもの**

- チームの GitHub [リポジトリ](../glossary.md#リポジトリ)へのアクセス権(未付与なら総務へ依頼)
- 会社指定の Claude 有料プランのアカウント(Claude Code が利用可能な Pro 以上。未付与なら総務へ依頼)
- WSL2(Windows の場合)または macOS / Linux のターミナル。サンドボックス機能は Windows ネイティブでは動作しないため、Windows のかたは必ず WSL2(Ubuntu)上にセットアップしてください

**前提知識**

- ターミナルと git の基本操作
- 全体の構成を先に知りたい方は[解説: Claude Code とは](../explanation/what-is-claude-code.md)を参照してください

> **NOTE:** 個人運用で共有リポジトリがまだ無い場合、あなたが最初の1人です。自分のリポジトリに標準構成(`.claude/` ディレクトリと CLAUDE.md)を作ってから、本手順に進んでください。ここで作った設定は、チーム運用へ移行する際にそのままチームの資産になります。

## 手順

1. チーム標準の設定が同梱されたリポジトリを clone します。

   ```bash
   git clone git@github.com:our-org/our-project.git
   cd our-project
   ```

   `.claude/` ディレクトリが含まれており、共有スキル・権限設定・MCP 設定が自動的に手に入ります。

   > **WARNING:** 次の手順では、個人の私用アカウントでログインしないでください。業務コードが個人アカウント側の履歴に残ります。必ず会社ドメインのアカウントを使用します。

2. Claude Code を起動し、初回認証します。

   ```bash
   claude
   ```

   初回はブラウザが開き、会社アカウントでのログインを求められます。

3. サンドボックスを有効化します。[サンドボックス](../glossary.md#サンドボックス)は、AI が実行するコマンドを OS レベルで隔離する安全機能です。Linux / WSL2 では、先に依存パッケージをインストールします。

   ```bash
   sudo apt install bubblewrap socat
   ```

   続いて Claude Code 内で次を実行します。

   ```text
   /sandbox
   ```

4. プロジェクト共有の [MCP](../glossary.md#mcp) サーバーを承認します。初回起動時、リポジトリの `.mcp.json` に定義された外部連携(GitHub、Sentry など)の確認ダイアログが出ます。承認対象がチームの標準リスト(GitHub / Sentry / 社内 DB)と一致していることを確認してから承認してください。見覚えのないサーバーがあれば承認せず、AI 推進チームに報告します。

## 完了の確認

Claude Code 内で、コードベースについて質問してみます。

```text
このプロジェクトの全体構成を教えて。
```

出力は一例です。表現は実行のたびに変わりますが、次の状態になっていれば完了です。

- [ ] Claude がプロジェクトの構成(主要ディレクトリや役割)を説明できる
- [ ] 会社アカウントでログインした状態になっている(`/status` などで確認できます)
- [ ] サンドボックスが有効になっている

この手順の操作はここまでです。設定をやり直したい場合も、リポジトリを clone し直せば同じ状態から再開できます。

## よくあるエラーと対処

### /sandbox 実行時にエラーが出る(Linux / WSL2)

- 原因: 依存パッケージ(bubblewrap・socat)が未インストールです。
- 対処: 手順3の `sudo apt install bubblewrap socat` を実行してから、再度 `/sandbox` を実行してください。

### 見覚えのない MCP サーバーの承認を求められる

- 原因: リポジトリの `.mcp.json` にチーム標準リスト外の定義が含まれている可能性があります。
- 対処: 承認せずにダイアログを閉じ、AI 推進チームに報告してください。

## 関連情報

- [解説: Claude Code とは](../explanation/what-is-claude-code.md) — 構成の全体像と基本の仕組み
- [リファレンス: コンテキスト操作コマンド一覧](../reference/context-commands.md)
