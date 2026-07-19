---
title: 肥大化した CLAUDE.md を棚卸しする
type: how-to
audience: [se]
level: 中級
time: 15分
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# 肥大化した CLAUDE.md を棚卸しする

`🔵 SE` `⏱ 15分`

この手順では、200行を超えて肥大化した [CLAUDE.md](../glossary.md#claudemd) の内容を、性質ごとに正しい置き場所へ移します。

## はじめる前に

**必要なもの**

- 対象の CLAUDE.md への書き込み権限
- `.claude/` ディレクトリを編集できる環境

**前提知識**

- 書いてよい内容と書いてはいけない内容の基準([リファレンス: CLAUDE.md 運用ルール一覧](../reference/claude-md-rules.md)を参照)
- お願い(CLAUDE.md)と強制(フック・権限設定)の違いを先に知りたい方は[解説: Claude Code とは](../explanation/what-is-claude-code.md)を参照してください

## 手順

1. CLAUDE.md の各行を、内容の性質ごとに分類します。

   - 30行を超える手順書 → [スキル](../glossary.md#スキル)へ(手順2)
   - 特定ディレクトリだけに適用される規約 → ルールへ(手順3)
   - 「必ず」「絶対禁止」に類する記述 → [フック](../glossary.md#フック)・[権限(permissions)](../glossary.md#権限permissions)へ(手順4)

2. 30行を超える手順書を、`.claude/skills/` に切り出します。

   ```bash
   mkdir -p .claude/skills/<スキル名>
   ```

   移動した手順書は、関係する作業のときだけ読み込まれるようになり、CLAUDE.md 本体を圧迫しなくなります。

3. 特定ディレクトリだけに適用される規約を、`.claude/rules/` に切り出します。

   ```bash
   mkdir -p .claude/rules
   ```

   ルールファイルには `paths:` を指定し、対象ディレクトリのコードを扱うときだけ適用されるようにします。

   > **WARNING:** `paths:` の指定を忘れると、ルールが常にすべてのコード作業へ適用されます。

4. 「必ず」「絶対禁止」に類する記述を CLAUDE.md から削除し、フックまたは権限設定の deny ルールに置き換えます。

   CLAUDE.md への記述はお願いであり、見落とされることがあります。必ず守らせたい内容には、フックと権限設定が適しています。

## 完了の確認

CLAUDE.md の行数を確認します。

```bash
wc -l CLAUDE.md
```

次の状態になっていれば完了です。

- [ ] CLAUDE.md が200行以内に収まっている
- [ ] 移動した手順書が `.claude/skills/` 配下から参照できる
- [ ] 「必ず」「絶対禁止」系の記述が、フックまたは権限設定でも再現されている

この手順の操作はここまでです。移動後に不具合が出た場合は、該当ファイルの内容を CLAUDE.md へ戻せば元の状態に復帰できます。

## よくあるエラーと対処

### スキルへ移動した手順書が読み込まれない

- 原因: スキルの説明文(description)が、該当作業の内容と一致していません。
- 対処: description に、対象の作業内容が伝わるキーワードを含めます。どの作業でこのスキルを使うべきか、AI が判断できます。

### ルールが常にすべてのコード作業へ適用されてしまう

- 原因: `paths:` の指定が抜けているか、指定範囲が広すぎます。
- 対処: 対象ディレクトリを `paths:` で絞り込みます。

## 関連情報

- [リファレンス: CLAUDE.md 運用ルール一覧](../reference/claude-md-rules.md)
- [解説: Claude Code とは](../explanation/what-is-claude-code.md) — お願いと強制の違い
