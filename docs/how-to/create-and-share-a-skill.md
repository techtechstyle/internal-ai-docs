---
title: チーム共有スキルを作成して配布する
type: how-to
audience: [se]
level: 初級
time: 15分
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# チーム共有スキルを作成して配布する

`🔵 SE` `⏱ 15分`

この手順では、チームの手順書を SKILL.md として作成し、PR で配布します。

## はじめる前に

**必要なもの**

- 対象[リポジトリ](../glossary.md#リポジトリ)への書き込み権限

**前提知識**

- description の書き方の基準([リファレンス: スキル・サブエージェントの使い分けと書式](../reference/skills-and-subagents.md)を参照)

## 手順

1. スキル用のフォルダを作成します。

   ```bash
   mkdir -p .claude/skills/deploy-checklist
   ```

2. `SKILL.md` を作成し、frontmatter と本文を記述します。

   ```markdown
   ---
   name: deploy-checklist
   description: 本番デプロイ前の確認手順。デプロイ、リリース、
     本番反映の作業やその準備を行うときに必ず使用する。
   ---

   # デプロイ前チェックリスト
   1. ステージングで smoke テストが全件パスしていること
   2. DB マイグレーションの適用順を確認
   ```

   description には「何をするか」と「いつ使うか」の両方を書きます。良い例・悪い例は[リファレンス: スキル・サブエージェントの使い分けと書式](../reference/skills-and-subagents.md)を参照してください。

3. コミットして push し、PR を作成します。

   push すると、リポジトリを clone・pull する全員が自動的にこのスキルを手に入れます。個人運用の間は PR が不要で、コミットするだけで構いません。将来チームに共有する際も、ファイルはそのまま使えます。

## 完了の確認

次の状態になっていれば完了です。

- [ ] `.claude/skills/<スキル名>/SKILL.md` が存在する
- [ ] 該当する作業を依頼すると、このスキルが自動的に発動する
- [ ] `git log` にコミットが表示される(チーム配布時は PR がマージされている)

この手順の操作はここまでです。発動しない場合も、description を見直せば修正できます。

## よくあるエラーと対処

### スキルが発動しない

- 原因: description に「何をするか」と「いつ使うか」のどちらか、または両方が具体的に書かれていません。
- 対処: 対象作業で実際に使われそうな言い回しを description に追加します。

### チームに配布されない

- 原因: コミットまたは PR のマージが完了していません。
- 対処: `git status` でコミット漏れを確認し、push・PR 作成まで完了させます。

## 関連情報

- [リファレンス: スキル・サブエージェントの使い分けと書式](../reference/skills-and-subagents.md)
- [解説: Claude Code とは](../explanation/what-is-claude-code.md)
