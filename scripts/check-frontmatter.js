#!/usr/bin/env node
/**
 * frontmatter スキーマ検査 (フェーズ3: CI・混成読者対応)
 *
 * 検査対象: docs/{tutorials,how-to,reference,explanation}/*.md
 * 検査項目 (詳細設計書 §8.1, §8.2, §9.2 準拠):
 *   - frontmatter が存在し、YAML として解析できる
 *   - 必須キー(title, type, audience, owner, review-by, freshness-class)が揃っている
 *   - tutorial / how-to は level, time も必須
 *   - type がディレクトリと一致する
 *   - audience の値が se / admin / manager のいずれかである
 *   - owner が個人名であり、チーム名らしき値でない
 *   - freshness-class が S / A / B のいずれかである
 *   - review-by が freshness-class の上限(S=1ヶ月/A=3ヶ月/B=12ヶ月、作成日起点)を超えていない
 *   - 本文冒頭にロールバッジがあり、audience と整合している
 *
 * 対象外(意図的): docs/glossary.md, docs/README.md
 *   → ナビゲーション用ページの frontmatter 要否は未決定(2026-07-19時点、次回判断待ち)。
 *     決定が出たらこのスクリプトと対象ディレクトリ一覧を更新すること。
 *
 * 終了コード: 問題があれば 1、なければ 0 (CI でそのまま失敗判定に使える)。
 */

const fs = require('fs');
const path = require('path');
const glob = require('fs').promises;
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..');

const TYPE_MAP = {
  'docs/tutorials': 'tutorial',
  'docs/how-to': 'how-to',
  'docs/reference': 'reference',
  'docs/explanation': 'explanation',
};

const VALID_AUDIENCE = new Set(['se', 'admin', 'manager']);
const VALID_FRESHNESS = new Set(['S', 'A', 'B']);
// フェーズ3導入日を基準とした簡易上限(日数)。運用開始後は各文書の実際の発行日基準に置き換える。
const FRESHNESS_LIMIT_DAYS = { S: 31, A: 92, B: 366 };
const BASE_DATE = new Date('2026-07-19');
const TEAM_LIKE = ['チーム', 'team', '全員', 'エンジニアリング部'];

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function collectTargetFiles() {
  const files = [];
  for (const dir of Object.keys(TYPE_MAP)) {
    files.push(...walk(path.join(REPO_ROOT, dir)));
  }
  return files.sort();
}

function relPath(p) {
  return path.relative(REPO_ROOT, p).split(path.sep).join('/');
}

function checkFile(filePath) {
  const issues = [];
  const rel = relPath(filePath);
  const text = fs.readFileSync(filePath, 'utf8');

  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    return [`${rel}: frontmatterが存在しない`];
  }

  let fm;
  try {
    fm = yaml.load(m[1]);
  } catch (e) {
    return [`${rel}: frontmatter YAML解析エラー: ${e.message}`];
  }

  const required = ['title', 'type', 'audience', 'owner', 'review-by', 'freshness-class'];
  for (const key of required) {
    if (!(key in fm)) issues.push(`${rel}: 必須キー欠落: ${key}`);
  }

  const dirRel = path.relative(REPO_ROOT, path.dirname(filePath)).split(path.sep).join('/');
  const expectedType = TYPE_MAP[dirRel];
  if (expectedType && fm.type !== expectedType) {
    issues.push(`${rel}: type不一致: frontmatter=${fm.type} 期待=${expectedType}`);
  }

  if (fm.type === 'tutorial' || fm.type === 'how-to') {
    for (const key of ['level', 'time']) {
      if (!(key in fm)) issues.push(`${rel}: ${fm.type}に必須の${key}が欠落`);
    }
  }

  let audSet = null;
  if ('audience' in fm) {
    if (!Array.isArray(fm.audience)) {
      issues.push(`${rel}: audienceがリストでない: ${fm.audience}`);
    } else {
      audSet = new Set(fm.audience);
      for (const a of fm.audience) {
        if (!VALID_AUDIENCE.has(a)) issues.push(`${rel}: audience不正値: ${a}`);
      }
    }
  }

  if ('owner' in fm && TEAM_LIKE.some((t) => String(fm.owner).includes(t))) {
    issues.push(`${rel}: ownerがチーム名の可能性: ${fm.owner}`);
  }

  if ('freshness-class' in fm && !VALID_FRESHNESS.has(fm['freshness-class'])) {
    issues.push(`${rel}: freshness-class不正値: ${fm['freshness-class']}`);
  }

  if (fm['freshness-class'] in FRESHNESS_LIMIT_DAYS && fm['review-by']) {
    const rb = new Date(fm['review-by']);
    if (isNaN(rb.getTime())) {
      issues.push(`${rel}: review-by日付解析エラー: ${fm['review-by']}`);
    } else {
      const limit = new Date(BASE_DATE);
      limit.setDate(limit.getDate() + FRESHNESS_LIMIT_DAYS[fm['freshness-class']]);
      if (rb > limit) {
        issues.push(
          `${rel}: review-by(${fm['review-by']})がfreshness-class ${fm['freshness-class']}の上限(${limit.toISOString().slice(0, 10)})を超過`
        );
      }
    }
  }

  const body = text.slice(m[0].length);
  const badgeMatch = body.match(/`(🟢[^`]*|🔵[^`]*|🟡[^`]*)`/);
  if (!badgeMatch) {
    issues.push(`${rel}: ロールバッジが本文に見当たらない`);
  } else if (audSet) {
    let expect;
    if (audSet.size === 1 && audSet.has('se')) expect = '🔵 SE';
    else if ([...audSet].every((a) => a === 'admin' || a === 'manager')) expect = '🟡 事務・管理';
    else expect = '🟢 全員';
    if (!badgeMatch[1].includes(expect)) {
      issues.push(
        `${rel}: バッジ不一致: audience=${JSON.stringify(fm.audience)} 本文バッジ="${badgeMatch[1]}" 期待="${expect}"`
      );
    }
  }

  return issues;
}

function main() {
  const files = collectTargetFiles();
  let allIssues = [];
  for (const f of files) {
    allIssues = allIssues.concat(checkFile(f));
  }

  if (allIssues.length === 0) {
    console.log(`frontmatterスキーマ検査: 0件(対象${files.length}ファイル)`);
    process.exit(0);
  } else {
    for (const issue of allIssues) console.error(issue);
    console.error(`\n合計 ${allIssues.length} 件`);
    process.exit(1);
  }
}

main();
