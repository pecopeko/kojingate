import {
  auditPrivacyAndGaibusoshin,
  generatePrivacyAndGaibusoshinMarkdown,
} from './core/kojin-engine.mjs';

const WEAK_POLICY_SAMPLE = `株式会社鶴見クラウド（以下「当社」といいます。）は、サービス提供のためにユーザー情報を取得します。
当社は法令を遵守し、適切に取り扱います。お問い合わせはサイト内フォームよりご連絡ください。`;

const WEAK_SCRIPTS_SAMPLE = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-TSURUMI1"></script>
<script src="https://connect.facebook.net/en_US/fbevents.js"></script>
<script src="https://browser.sentry-cdn.com/8.0.0/bundle.min.js"></script>
<script src="https://js.stripe.com/v3/"></script>`;

const CLEAN_POLICY_SAMPLE = `個人情報取扱事業者の名称：株式会社鶴見クラウド
所在地：東京都港区芝浦3-1-1
代表者：代表取締役 佐藤 誠一

1. 利用目的
当社は、取得した個人情報を本サービスの提供、本人確認、利用料金の決済処理およびお問い合わせ対応の目的で利用します。

2. 安全管理措置
当社は、個人データに対しTLS暗号化通信、アクセス制限、取扱規程の整備および委託先の監督等の安全管理措置を講じています。

3. 第三者提供・外国にある第三者への提供（第28条）
当社は法令に基づく場合を除き、あらかじめ本人の同意なく第三者に個人データを提供しません。アクセス解析のため米国所在のGoogle LLCおよびFunctional Software, Inc. (Sentry)、米国所在のStripe, Inc.を利用しており、各社は個人情報保護委員会公表の外国における個人情報の保護に関する制度下で適切な安全管理措置を講じています。

4. 外部送信規律（電気通信事業法第27条の12）に関する公表事項
当社ウェブサイトではGoogle LLC（Google Analytics 4）、Sentry、Stripeが発行するCookie識別子・IPアドレス・閲覧履歴をアクセス解析・障害検知・決済処理の目的で外部送信します。分析Cookieはオプトアウトアドオンまたはブラウザ設定で無効化・拒否可能です。

5. 開示・訂正・利用停止・第三者提供記録の請求窓口
相談窓口メールアドレス: privacy@tsurumi-cloud.jp`;

const CLEAN_SCRIPTS_SAMPLE = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-TSURUMI1"></script>
<script src="https://browser.sentry-cdn.com/8.0.0/bundle.min.js"></script>
<script src="https://js.stripe.com/v3/"></script>`;

const els = {
  company: document.getElementById('input-company'),
  address: document.getElementById('input-address'),
  rep: document.getElementById('input-rep'),
  email: document.getElementById('input-email'),
  policy: document.getElementById('input-policy'),
  scripts: document.getElementById('input-scripts'),
  crossBorder: document.getElementById('chk-crossborder'),
  scoreBadge: document.getElementById('score-badge'),
  metricScore: document.getElementById('metric-score'),
  metricChecks: document.getElementById('metric-checks'),
  metricTrackers: document.getElementById('metric-trackers'),
  findingsList: document.getElementById('findings-list'),
  trackersTbody: document.getElementById('trackers-tbody'),
  markdownOutput: document.getElementById('markdown-output'),
  btnAudit: document.getElementById('btn-audit'),
  btnSampleWeak: document.getElementById('btn-sample-weak'),
  btnSampleClean: document.getElementById('btn-sample-clean'),
  btnClear: document.getElementById('btn-clear'),
  btnCopyMd: document.getElementById('btn-copy-md'),
  btnDownloadMd: document.getElementById('btn-download-md'),
};

let latestMarkdown = '';

function renderAudit() {
  const policyText = els.policy.value || '';
  const scriptsText = els.scripts.value || '';
  const result = auditPrivacyAndGaibusoshin(policyText, scriptsText, {
    includeCrossBorderTransfer: els.crossBorder.checked,
  });

  els.metricScore.textContent = `${result.score}点`;
  els.metricChecks.textContent = `${result.passedCount} / ${result.totalChecks}`;
  els.metricTrackers.textContent = `${result.trackerAudit.totalMatchedSignals} 件`;

  els.scoreBadge.className = 'score-pill';
  if (result.status === 'READY') {
    els.scoreBadge.textContent = '全項目充足 (READY)';
    els.scoreBadge.classList.add('status-ready');
  } else if (result.status === 'NEEDS_REVIEW') {
    els.scoreBadge.textContent = '要補正 (NEEDS REVIEW)';
    els.scoreBadge.classList.add('status-review');
  } else {
    els.scoreBadge.textContent = '重大不備 (HIGH RISK)';
    els.scoreBadge.classList.add('status-high');
  }

  els.findingsList.innerHTML = '';
  if (result.findings.length === 0) {
    const okCard = document.createElement('div');
    okCard.setAttribute('data-ui', 'finding-card');
    okCard.className = 'sev-ok';
    okCard.innerHTML =
      '<div class="finding-title">検出範囲のAPPI・外部送信規律必須要件を充足しています</div><div>事業者公表事項・安全管理措置・第28条越境移転・第27条の12外部送信公表の主要確認項目に漏れはありません。</div>';
    els.findingsList.appendChild(okCard);
  } else {
    for (const f of result.findings) {
      const card = document.createElement('div');
      card.setAttribute('data-ui', 'finding-card');
      card.className = f.severity === 'HIGH' ? 'sev-high' : 'sev-medium';
      const meta = document.createElement('div');
      meta.className = 'finding-meta';
      meta.textContent = `[${f.severity}] ${f.id} / ${f.article}`;

      const title = document.createElement('div');
      title.className = 'finding-title';
      title.textContent = f.title;

      const detail = document.createElement('div');
      detail.textContent = f.missingDetail;

      const fix = document.createElement('div');
      fix.className = 'finding-fix';
      fix.textContent = `対処案: ${f.remediation}`;

      card.append(meta, title, detail, fix);
      els.findingsList.appendChild(card);
    }
  }

  els.trackersTbody.innerHTML = '';
  const detectedTrackers = result.trackerAudit.detectedTrackers;
  if (detectedTrackers.length === 0 && result.trackerAudit.unclassifiedExternalHosts.length === 0) {
    els.trackersTbody.innerHTML =
      '<tr><td colspan="4" class="muted-cell">既知の外部送信スクリプトは検出されませんでした。</td></tr>';
  } else {
    for (const t of detectedTrackers) {
      const tr = document.createElement('tr');
      const mentioned = (t.aliases || []).some((alias) =>
        policyText.toLowerCase().includes(alias.toLowerCase())
      );
      const td1 = document.createElement('td');
      td1.textContent = t.vendor;
      const td2 = document.createElement('td');
      td2.textContent = t.country;
      const td3 = document.createElement('td');
      td3.textContent = t.category;
      const td4 = document.createElement('td');
      td4.textContent = mentioned ? '記載確認' : '要追記';
      tr.append(td1, td2, td3, td4);
      els.trackersTbody.appendChild(tr);
    }
    for (const host of result.trackerAudit.unclassifiedExternalHosts) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.textContent = `未分類ホスト: ${host}`;
      const td2 = document.createElement('td');
      td2.textContent = '要確認';
      const td3 = document.createElement('td');
      td3.textContent = '要開発者確認';
      const td4 = document.createElement('td');
      td4.textContent = '要追記';
      tr.append(td1, td2, td3, td4);
      els.trackersTbody.appendChild(tr);
    }
  }

  latestMarkdown = generatePrivacyAndGaibusoshinMarkdown(result, {
    companyName: els.company.value,
    address: els.address.value,
    representative: els.rep.value,
    contactEmail: els.email.value,
  });
  els.markdownOutput.textContent = latestMarkdown;
}

els.btnAudit.addEventListener('click', renderAudit);
els.btnSampleWeak.addEventListener('click', () => {
  els.policy.value = WEAK_POLICY_SAMPLE;
  els.scripts.value = WEAK_SCRIPTS_SAMPLE;
  renderAudit();
});
els.btnSampleClean.addEventListener('click', () => {
  els.policy.value = CLEAN_POLICY_SAMPLE;
  els.scripts.value = CLEAN_SCRIPTS_SAMPLE;
  renderAudit();
});
els.btnClear.addEventListener('click', () => {
  els.policy.value = '';
  els.scripts.value = '';
  renderAudit();
});
els.btnCopyMd.addEventListener('click', async () => {
  if (!latestMarkdown) renderAudit();
  await navigator.clipboard.writeText(latestMarkdown);
  els.btnCopyMd.textContent = 'コピー完了';
  setTimeout(() => {
    els.btnCopyMd.textContent = 'Markdownをコピー';
  }, 1500);
});
els.btnDownloadMd.addEventListener('click', () => {
  if (!latestMarkdown) renderAudit();
  const blob = new Blob([latestMarkdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kojingate-appi-gaibusoshin.md';
  a.click();
  URL.revokeObjectURL(url);
});

els.policy.value = WEAK_POLICY_SAMPLE;
els.scripts.value = WEAK_SCRIPTS_SAMPLE;
renderAudit();
