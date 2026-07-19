---
title: VS Code で textlint を有効にする
type: how-to
audience: [se]
level: 初級
time: 10分
owner: hide
review-by: 2026-08-18
freshness-class: S
---

# VS Code で textlint を有効にする

`🔵 SE` `⏱ 10分`

この手順では、VS Code 上でドキュメントを書きながら、[スタイルガイド](../_style/style-guide.md)のルール違反をリアルタイムに表示します。

## はじめる前に

**必要なもの**

- この[リポジトリ](../glossary.md#リポジトリ)を clone した VS Code のワークスペース
- Node.js(`npm` が使える環境)

**前提知識**

- 書いてよい内容・書き方の基準は本手順の対象外です。[執筆1ページ憲章](../_style/writing-charter.md)を先に読んでおくと、指摘の意図が分かりやすくなります

## 手順

1. VS Code でこのリポジトリのフォルダを開きます。

   推奨拡張機能(`textlint`)のインストールを促す通知が右下に表示されます。「Install」を選択します。

   通知が出ない場合は、拡張機能タブで `3w36zj6.textlint` を検索し、手動でインストールします。

2. ターミナルで依存パッケージをインストールします。

   ```bash
   npm install
   ```

   `package.json` に登録された textlint 本体とルール一式がインストールされます。ルールには `textlint-rule-preset-ja-technical-writing`・`textlint-rule-prh` 等が含まれます。

3. `docs/` 配下の任意の Markdown ファイルを開き、意図的にルール違反を書いて確認します。

   ```text
   これは、とても、長くて、読点が、多すぎて、途中で、意味が、追えなくなる、確認用の一文です。
   ```

   該当箇所に波線が表示され、カーソルを合わせると違反ルール名が確認できれば、設定は完了しています。確認用の一文は保存せずに削除してください。

## 完了の確認

ターミナルで次を実行します。

```bash
npm run lint:text
```

次の状態になっていれば完了です。

- [ ] 拡張機能タブで「textlint」がインストール済みと表示される
- [ ] Markdown ファイルの編集中に、ルール違反箇所へ波線が表示される
- [ ] `npm run lint:text` が、リポジトリの `docs/` 全体を対象に実行できる

## よくあるエラーと対処

### 波線が表示されない

- 原因: `npm install` が未実行か、`node_modules/textlint` が存在しません。
- 対処: リポジトリのルートで `npm install` を実行し、対象のファイルを開き直します。

### 推奨拡張機能の通知が出ない

- 原因: 過去に通知を閉じたか、拡張機能の推奨設定が無効になっています。
- 対処: 拡張機能タブで `3w36zj6.textlint` を検索し、手動でインストールします。

## 関連情報

- 設定できたら次は: [textlint と一緒に文書を書く](../tutorials/textlint-onboarding.md)
- [スタイルガイド](../_style/style-guide.md)
- [執筆1ページ憲章](../_style/writing-charter.md)
