---
title: 困ったときの切り分け表
type: reference
audience: [se]
owner: hide
review-by: 2026-08-18
freshness-class: A
---

# 困ったときの切り分け表

`🔵 SE`

本書は、作業がうまく進まないときに、上から順に確認する切り分け表を記載します。

| 段階 | 確認すること | 対処 |
| --- | --- | --- |
| ① 権限 | コマンドがブロックされたか | [権限設定](security-rules.md)を確認する。ブロックが不要な操作なら、`settings.json` への allow 追加を PR で提案する |
| ② 修正の繰り返し | 同じ修正指示を2回以上出したか | `/clear` してプロンプトを書き直す([解説: Claude Code とは](../explanation/what-is-claude-code.md)の黄金律を参照) |
| ③ 検証 | 「できました」と言うが、実際は動いていないか | 機械的に判定できる検証条件をつけて再依頼する(例:「npm test が全件パスするまで」) |
| ④ ルール認識 | プロジェクトのルールを知らない様子か | [CLAUDE.md の内容](claude-md-rules.md)を確認する。追記は PR で行う |
| ⑤ 切り分け | 十分な情報を与えたのに、手抜き・失敗するか | [コンテキスト → エフォート → モデルの順](context-commands.md)で切り分ける |
| 最終手段 | 上記のいずれでも解決しないか | チームチャンネル(`#ai-dev-support`)で相談する。スクリーンショットとプロンプトを添付する |

> **NOTE:** どの段階でも、意図しない外部送信など、セキュリティに関わる異常を見つけた場合は、ただちに AI 推進チームへ報告してください。

## 関連情報

- [セキュリティルールと権限ベースライン](security-rules.md)
- [CLAUDE.md 運用ルール一覧](claude-md-rules.md)
- [コンテキスト操作コマンドと失敗パターン一覧](context-commands.md)
- [解説: Claude Code とは](../explanation/what-is-claude-code.md)
