import test from 'node:test';
import assert from 'node:assert/strict';

import {
  KNOWN_TRACKERS,
  auditPrivacyAndGaibusoshin,
  detectExternalTrackers,
  generatePrivacyAndGaibusoshinMarkdown,
} from '../docs/core/kojin-engine.mjs';

test('KNOWN_TRACKERS covers major analytics, ads, and SaaS SDKs used on Japanese sites', () => {
  const ids = new Set(KNOWN_TRACKERS.map((t) => t.id));
  for (const required of ['ga4', 'meta_pixel', 'line_tag', 'yahoo_ads', 'sentry', 'stripe']) {
    assert.ok(ids.has(required), `Missing tracker definition: ${required}`);
  }
});

test('detectExternalTrackers extracts GA4, Meta, LINE, Yahoo, Sentry, Stripe and unknown hosts', () => {
  const html = `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEST1234"></script>
    <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
    <script src="https://d.line-scdn.net/n/line_tag/public/release/v1/lt.js"></script>
    <script src="https://b92.yahoo.co.jp/search/?p=123"></script>
    <script src="https://browser.sentry-cdn.com/8.0.0/bundle.min.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://cdn.unknown-analytics.jp/sdk.js"></script>
  `;
  const res = detectExternalTrackers(html);
  const foundIds = new Set(res.detectedTrackers.map((t) => t.id));
  assert.ok(foundIds.has('ga4'));
  assert.ok(foundIds.has('meta_pixel'));
  assert.ok(foundIds.has('line_tag'));
  assert.ok(foundIds.has('yahoo_ads'));
  assert.ok(foundIds.has('sentry'));
  assert.ok(foundIds.has('stripe'));
  assert.deepEqual(res.unclassifiedExternalHosts, ['cdn.unknown-analytics.jp']);
});

test('auditPrivacyAndGaibusoshin flags deficient policies and unmentioned foreign SDKs', () => {
  const weakPolicy = '当社はユーザー情報を取得し適切に管理します。';
  const scripts = '<script src="https://www.googletagmanager.com/gtag/js?id=G-1"></script>';
  const res = auditPrivacyAndGaibusoshin(weakPolicy, scripts);

  assert.equal(res.status, 'HIGH_RISK');
  assert.ok(res.score < 30);
  const findingIds = new Set(res.findings.map((f) => f.id));
  assert.ok(findingIds.has('APPI-ID-32'));
  assert.ok(findingIds.has('APPI-SECURITY-23'));
  assert.ok(findingIds.has('APPI-CROSSBORDER-28'));
  assert.ok(findingIds.has('TBA-GAIBUSOSHIN-27-12'));
});

test('auditPrivacyAndGaibusoshin passes 100/100 when APPI Art. 17/23/27/28/32 and Art. 27-12 are covered', () => {
  const fullPolicy = `
    個人情報取扱事業者の名称：株式会社鶴見クラウド
    所在地：東京都港区芝浦3-1-1 / 代表者：代表取締役 佐藤 誠一
    利用目的：本サービスの提供、本人確認、決済処理および問い合わせ対応のために利用します。
    安全管理措置：TLS暗号化通信、アクセス制限および委託先の監督等の安全管理措置を講じています。
    第三者提供：法令に基づく場合等を除き本人の同意なく第三者提供しません。
    外国にある第三者への提供（第28条）：アクセス解析および不正検知のため米国所在のGoogle LLC、Sentry、Stripeを利用し、相当措置を確認しています。
    外部送信規律（電気通信事業法第27条の12）：Google Analytics 4・Sentry・StripeによりCookie識別子・IPアドレス・閲覧履歴をアクセス解析・障害検知・決済処理のため送信します。オプトアウトで拒否可能です。
    開示・訂正・削除・利用停止・第三者提供記録の請求窓口：privacy@tsurumi-cloud.jp
  `;
  const scripts = `
    <script src="https://www.googletagmanager.com/gtag/js?id=G-1"></script>
    <script src="https://browser.sentry-cdn.com/8.0.0/bundle.min.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
  `;
  const res = auditPrivacyAndGaibusoshin(fullPolicy, scripts);
  assert.equal(res.findings.length, 0);
  assert.equal(res.score, 100);
  assert.equal(res.status, 'READY');
});

test('generatePrivacyAndGaibusoshinMarkdown produces APPI and Art. 27-12 table with vendor details', () => {
  const res = auditPrivacyAndGaibusoshin('短いポリシー', 'https://analytics.tiktok.com/i18n/pixel/events.js');
  const md = generatePrivacyAndGaibusoshinMarkdown(res, {
    companyName: '合同会社港テスト',
    address: '大阪府大阪市北区梅田1-1',
    representative: '代表社員 高橋 健',
    contactEmail: 'legal@minato-test.jp',
  });
  assert.ok(md.includes('合同会社港テスト'));
  assert.ok(md.includes('TikTok Pte. Ltd.'));
  assert.ok(md.includes('第27条の12'));
  assert.ok(md.includes('legal@minato-test.jp'));
});
