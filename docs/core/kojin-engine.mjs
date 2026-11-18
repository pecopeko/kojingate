/**
 * KOJINGATE (個情門) Core Compliance Engine
 * 100% deterministic, zero-network audit for:
 *  - Japan APPI (改正個人情報保護法 Art. 17, 21, 23, 27, 28, 32-39)
 *  - Telecommunications Business Act Art. 27-12 (電気通信事業法 外部送信規律)
 */

export const KNOWN_TRACKERS = [
  {
    id: 'ga4',
    vendor: 'Google LLC (Google Analytics 4)',
    aliases: ['Google Analytics', 'GA4', 'Google LLC', 'グーグル'],
    domainPatterns: [
      /googletagmanager\.com\/gtag\/js/i,
      /google-analytics\.com/i,
      /analytics\.google\.com/i,
    ],
    country: '米国',
    category: 'アクセス解析',
    purposeJa: 'サイトの利用状況の計測・機能改善および統計分析のため',
    typicalSentItemsJa: 'Cookie識別子、閲覧ページURL、参照元URL、端末・ブラウザ情報、概略IPアドレス',
    optOutHintJa: 'https://tools.google.com/dlpage/gaoptout',
  },
  {
    id: 'gtm',
    vendor: 'Google LLC (Google Tag Manager)',
    aliases: ['Google Tag Manager', 'GTM', 'Google LLC'],
    domainPatterns: [/googletagmanager\.com\/gtm\.js/i],
    country: '米国',
    category: 'タグ管理',
    purposeJa: '外部計測タグおよびスクリプトの統合配信管理のため',
    typicalSentItemsJa: 'HTTPリクエストヘッダ、IPアドレス、閲覧URL、配信タグ発火ログ',
    optOutHintJa: 'ブラウザのCookie無効化設定およびサイト内同意設定により制御',
  },
  {
    id: 'meta_pixel',
    vendor: 'Meta Platforms, Inc. (Meta Pixel)',
    aliases: ['Meta', 'Facebook', 'Meta Pixel'],
    domainPatterns: [/connect\.facebook\.net/i, /facebook\.com\/tr/i],
    country: '米国',
    category: '広告配信・効果測定',
    purposeJa: '広告効果測定、類似オーディエンス作成および広告最適化のため',
    typicalSentItemsJa: 'Facebook関連Cookie、ページ閲覧履歴、コンバージョンイベント、IPアドレス',
    optOutHintJa: 'https://www.facebook.com/settings/?tab=ads',
  },
  {
    id: 'line_tag',
    vendor: 'LINEヤフー株式会社 (LINE Tag)',
    aliases: ['LINE Tag', 'LINEヤフー', 'LINE株式会社'],
    domainPatterns: [/d\.line-scdn\.net/i, /scdn\.line-apps\.com/i, /tr\.line\.me/i],
    country: '日本',
    category: '広告配信・効果測定',
    purposeJa: 'LINE広告の効果計測および配信最適化のため',
    typicalSentItemsJa: 'Cookie、LINE識別子、閲覧URL、コンバージョン識別情報',
    optOutHintJa: 'https://terms.line.me/line_rules_optimize',
  },
  {
    id: 'yahoo_ads',
    vendor: 'LINEヤフー株式会社 (Yahoo!広告タグ)',
    aliases: ['Yahoo!広告', 'Yahoo', 'LINEヤフー', 'YTM'],
    domainPatterns: [/b92\.yahoo\.co\.jp/i, /yads\.c\.yimg\.jp/i, /s\.yimg\.jp\/images\/listing\/tool/i],
    country: '日本',
    category: '広告配信・リターゲティング',
    purposeJa: 'Yahoo!広告のコンバージョン測定および行動ターゲティング配信のため',
    typicalSentItemsJa: 'Yahoo!識別Cookie、閲覧履歴、イベント種別、IPアドレス',
    optOutHintJa: 'https://btoptout.yahoo.co.jp/optout/index.html',
  },
  {
    id: 'x_pixel',
    vendor: 'X Corp. (X Ads Pixel)',
    aliases: ['X Corp', 'Twitter', 'X広告'],
    domainPatterns: [/static\.ads-twitter\.com/i, /analytics\.twitter\.com/i, /t\.co\/i\/adsct/i],
    country: '米国',
    category: '広告配信・効果測定',
    purposeJa: 'X広告のコンバージョン計測およびオーディエンス分析のため',
    typicalSentItemsJa: 'Cookie識別子、ページURL、コンバージョンタグ、ブラウザ情報',
    optOutHintJa: 'https://x.com/settings/privacy_and_safety',
  },
  {
    id: 'tiktok_pixel',
    vendor: 'TikTok Pte. Ltd. (TikTok Pixel)',
    aliases: ['TikTok', 'ByteDance'],
    domainPatterns: [/analytics\.tiktok\.com/i],
    country: 'シンガポール・米国',
    category: '広告配信・効果測定',
    purposeJa: 'TikTok広告の効果測定および最適化のため',
    typicalSentItemsJa: 'Cookie、閲覧履歴、ハッシュ化イベント情報、端末識別子',
    optOutHintJa: 'https://www.tiktok.com/legal/page/row/privacy-policy/ja',
  },
  {
    id: 'ms_clarity',
    vendor: 'Microsoft Corporation (Microsoft Clarity / UET)',
    aliases: ['Microsoft', 'Clarity', 'Bing'],
    domainPatterns: [/clarity\.ms/i, /bat\.bing\.com/i],
    country: '米国',
    category: 'ヒートマップ解析・広告計測',
    purposeJa: 'UI操作性改善のためのヒートマップ・セッションリプレイ分析のため',
    typicalSentItemsJa: 'スクロール・クリック座標、画面遷移履歴、Cookie、端末解像度',
    optOutHintJa: 'https://choice.microsoft.com/',
  },
  {
    id: 'sentry',
    vendor: 'Functional Software, Inc. (Sentry)',
    aliases: ['Sentry', 'Functional Software'],
    domainPatterns: [/sentry-cdn\.com/i, /ingest\.sentry\.io/i, /ingest\.[a-z0-9-]+\.sentry\.io/i],
    country: '米国',
    category: '障害検知・エラー監視',
    purposeJa: 'クライアント実行時エラーの自動収集とサービス品質維持のため',
    typicalSentItemsJa: 'スタックトレース、OS・ブラウザバージョン、エラー発生時のURL',
    optOutHintJa: '必須エラー監視（同意管理または匿名化設定にて個人情報を除去）',
  },
  {
    id: 'stripe',
    vendor: 'Stripe, Inc. (Stripe.js / Fraud Detection)',
    aliases: ['Stripe', 'Stripe, Inc.'],
    domainPatterns: [/js\.stripe\.com/i, /m\.stripe\.network/i],
    country: '米国',
    category: '決済処理・不正利用防止',
    purposeJa: 'クレジットカード決済のトークン化処理および不正取引防止のため',
    typicalSentItemsJa: '端末フィンガープリント、IPアドレス、決済セッション識別子',
    optOutHintJa: '決済機能に不可欠な通信（決済画面での送信について事前明示が必要）',
  },
  {
    id: 'recaptcha',
    vendor: 'Google LLC (reCAPTCHA)',
    aliases: ['reCAPTCHA', 'Google LLC'],
    domainPatterns: [/google\.com\/recaptcha/i, /gstatic\.com\/recaptcha/i],
    country: '米国',
    category: '不正アクセス・Bot対策',
    purposeJa: '自動ボットによるスパム送信・不正ログインを防止するため',
    typicalSentItemsJa: 'IPアドレス、マウス・キーボード操作傾向、ブラウザ・Cookie情報',
    optOutHintJa: 'フォーム保護目的のセキュリティ通信（利用規約・プライバシーへのリンク併記必須）',
  },
  {
    id: 'hubspot',
    vendor: 'HubSpot, Inc. (HubSpot Tracking)',
    aliases: ['HubSpot'],
    domainPatterns: [/js\.hs-scripts\.com/i, /js-[a-z0-9]+\.hs-scripts\.com/i, /hsforms\.net/i],
    country: '米国',
    category: 'CRM・マーケティングオートメーション',
    purposeJa: '見込み顧客のお問い合わせ対応およびWeb閲覧履歴連携のため',
    typicalSentItemsJa: 'Cookie（hubspotutk）、ページ閲覧履歴、フォーム入力情報、IPアドレス',
    optOutHintJa: 'サイト内Cookieバナーにて分析・マーケティングCookieを拒否設定可能',
  },
];

const URL_HOST_RE = /https?:\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?:[/:?#\s"'<>]|$)/g;
const BARE_DOMAIN_RE = /\b([a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+\.)?(?:com|net|org|jp|co\.jp|io|ms|me|dev))\b/gi;

/**
 * Scan pasted HTML snippets, script tags, or host/URL lists for external trackers.
 * @param {string} htmlOrScriptsText
 * @param {{ ownDomains?: string[] }} [options]
 */
export function detectExternalTrackers(htmlOrScriptsText, options = {}) {
  const raw = typeof htmlOrScriptsText === 'string' ? htmlOrScriptsText : '';
  const ownDomains = new Set(
    (Array.isArray(options.ownDomains) ? options.ownDomains : [])
      .map((d) => String(d).trim().toLowerCase())
      .filter(Boolean)
  );

  const detectedTrackers = [];
  const matchedUrlsOrHosts = new Set();

  for (const tracker of KNOWN_TRACKERS) {
    const matchedEvidence = [];
    for (const pattern of tracker.domainPatterns) {
      const m = raw.match(pattern);
      if (m) {
        matchedEvidence.push(m[0]);
        matchedUrlsOrHosts.add(m[0].toLowerCase());
      }
    }
    if (matchedEvidence.length > 0) {
      detectedTrackers.push({
        id: tracker.id,
        vendor: tracker.vendor,
        aliases: tracker.aliases,
        country: tracker.country,
        category: tracker.category,
        purposeJa: tracker.purposeJa,
        typicalSentItemsJa: tracker.typicalSentItemsJa,
        optOutHintJa: tracker.optOutHintJa,
        matchedEvidence,
      });
    }
  }

  const hostCandidates = new Set();
  for (const match of raw.matchAll(URL_HOST_RE)) {
    hostCandidates.add(match[1].toLowerCase());
  }
  if (hostCandidates.size === 0) {
    for (const match of raw.matchAll(BARE_DOMAIN_RE)) {
      hostCandidates.add(match[1].toLowerCase());
    }
  }

  const unclassifiedExternalHosts = [];
  for (const host of hostCandidates) {
    if (host === 'localhost' || host.endsWith('.local')) continue;
    if (ownDomains.has(host)) continue;
    const coveredByKnown = KNOWN_TRACKERS.some((t) =>
      t.domainPatterns.some((re) => re.test(host) || raw.toLowerCase().includes(host) && [...matchedUrlsOrHosts].some((e) => host.includes(e.split('/')[0])))
    );
    const matchesAnyPattern = KNOWN_TRACKERS.some((t) =>
      t.domainPatterns.some((re) => re.test(`${host}/`) || re.test(host))
    );
    if (!coveredByKnown && !matchesAnyPattern) {
      unclassifiedExternalHosts.push(host);
    }
  }

  return {
    detectedTrackers,
    unclassifiedExternalHosts: [...new Set(unclassifiedExternalHosts)],
    totalMatchedSignals: detectedTrackers.length + unclassifiedExternalHosts.length,
  };
}

const CHECK_DEFINITIONS = [
  {
    id: 'APPI-ID-32',
    article: '個人情報保護法 第21条・第32条第1項第1号',
    title: '個人情報取扱事業者の名称・住所・代表者氏名',
    weight: 16,
    severity: 'HIGH',
    test: (text) => {
      const hasOrg = /(株式会社|合同会社|合資会社|一般社団法人|NPO法人|運営者|個人情報取扱事業者)/.test(text);
      const hasAddr = /(東京都|北海道|大阪府|京都府|県.+市|市.+区|番地|丁目|〒\d{3}-\d{4})/.test(text);
      const hasRep = /(代表|代表取締役|代表社員|理事長|CEO|運営責任者)/.test(text);
      return hasOrg && hasAddr && hasRep;
    },
    missingDetail:
      '保有個人データに関する公表事項として必要な「事業者名称」「主たる事務所の住所」「代表者氏名（法人の場合）」のいずれかが不足しています。',
    remediation:
      'ポリシー末尾または冒頭に「事業者名・所在地・代表者氏名」を明記してください。',
  },
  {
    id: 'APPI-PURPOSE-17',
    article: '個人情報保護法 第17条・第21条',
    title: '利用目的の可能な限りの特定・公表',
    weight: 16,
    severity: 'HIGH',
    test: (text) =>
      /(利用目的|目的で|提供のため|本人確認|お問い合わせ対応|決済処理)/.test(text) &&
      text.length >= 40,
    missingDetail:
      '個人情報を取得する具体的な利用目的（例：本サービスの提供、請求決済、本人確認、不正防止など）の明記が不足しています。',
    remediation:
      '「取得した個人情報は、以下の目的の範囲内で利用します」として箇条書きで業務用途を特定してください。',
  },
  {
    id: 'APPI-SECURITY-23',
    article: '個人情報保護法 第23条・第32条第1項第4号',
    title: '安全管理措置の講じ方・問い合わせ回答事項',
    weight: 14,
    severity: 'MEDIUM',
    test: (text) =>
      /(安全管理措置|暗号化|アクセス制限|SSL|TLS|不正アクセス|従業員教育|委託先の監督)/.test(text),
    missingDetail:
      '個人データの漏えい・滅失・毀損を防ぐ安全管理措置（技術的・組織的・物理的措置の概要、または本人の求めに応じ遅滞なく回答する旨）の記載がありません。',
    remediation:
      '「暗号化通信、アクセス制御、取扱規程整備および委託先監督等の安全管理措置を講じています」と明記してください。',
  },
  {
    id: 'APPI-THIRDPARTY-27',
    article: '個人情報保護法 第27条',
    title: '第三者提供および委託・共同利用の範囲',
    weight: 14,
    severity: 'HIGH',
    test: (text) =>
      /(第三者|あらかじめ本人の同意|法令に基づく場合|委託先|共同利用)/.test(text),
    missingDetail:
      '第三者提供に関する本人同意原則、および例外事由・業務委託先の取扱方針の記載が不足しています。',
    remediation:
      '「法令に基づく場合等を除き、あらかじめ本人の同意なく個人データを第三者に提供しません」等の条項を追加してください。',
  },
  {
    id: 'APPI-RIGHTS-32',
    article: '個人情報保護法 第32条〜第39条',
    title: '開示・訂正・利用停止等の請求手続と相談窓口',
    weight: 14,
    severity: 'HIGH',
    test: (text) =>
      /(開示|訂正|追加|削除|利用停止|第三者提供記録)/.test(text) &&
      /(窓口|問い合わせ|メール|contact|support|@|電話)/i.test(text),
    missingDetail:
      '保有個人データの開示・訂正・利用停止・第三者提供記録の開示請求に応じる手続および連絡先窓口が見当たりません。',
    remediation:
      '請求手続の方法および個人情報保護相談窓口のメールアドレスまたは専用フォームを明記してください。',
  },
];

/**
 * Run unified deterministic audit of Privacy Policy text and external transmission scripts.
 * @param {string} policyText
 * @param {string} [htmlOrScriptsText]
 * @param {{ includeCrossBorderTransfer?: boolean, ownDomains?: string[] }} [options]
 */
export function auditPrivacyAndGaibusoshin(policyText, htmlOrScriptsText = '', options = {}) {
  const text = typeof policyText === 'string' ? policyText.trim() : '';
  const includeCrossBorderTransfer = options.includeCrossBorderTransfer !== false;
  const trackerAudit = detectExternalTrackers(htmlOrScriptsText, {
    ownDomains: options.ownDomains,
  });

  const findings = [];
  let earnedWeight = 0;
  let totalWeight = 0;

  for (const rule of CHECK_DEFINITIONS) {
    totalWeight += rule.weight;
    const passed = text.length > 0 && rule.test(text);
    if (passed) {
      earnedWeight += rule.weight;
    } else {
      findings.push({
        id: rule.id,
        article: rule.article,
        severity: rule.severity,
        title: rule.title,
        passed: false,
        missingDetail: rule.missingDetail,
        remediation: rule.remediation,
      });
    }
  }

  // Check APPI Art. 28 Cross-Border Transfer whenever enabled OR foreign trackers detected
  const foreignTrackers = trackerAudit.detectedTrackers.filter((t) => t.country !== '日本');
  const shouldAuditArt28 = includeCrossBorderTransfer || foreignTrackers.length > 0;
  if (shouldAuditArt28) {
    const art28Weight = 12;
    totalWeight += art28Weight;
    const hasArt28 =
      /(外国にある第三者|越境移転|米国|アメリカ合衆国|シンガポール|アイルランド|英国|欧州経済領域|EU|第28条|保護に関する制度)/.test(
        text
      ) &&
      (foreignTrackers.length === 0 ||
        foreignTrackers.every((t) => text.includes(t.country) || /(米国|アメリカ)/.test(text)));

    if (hasArt28 && text.length > 0) {
      earnedWeight += art28Weight;
    } else {
      const missingCountries = [...new Set(foreignTrackers.map((t) => t.country))].join('・');
      findings.push({
        id: 'APPI-CROSSBORDER-28',
        article: '個人情報保護法 第28条',
        severity: 'HIGH',
        title: '外国にある第三者への提供・国名および制度の明示',
        passed: false,
        missingDetail:
          foreignTrackers.length > 0
            ? `外部送信先（所在国: ${missingCountries}）が存在しますが、所在国の名称・当該外国の個人情報保護制度・講じる措置の情報提供が不十分です。`
            : 'クラウドSaaSや海外サーバー利用に伴う越境移転先国名および相当措置の記載が確認できません。',
        remediation:
          '移転先外国の名称（例：米国 等）、PPC公表の外国制度確認リンク、先方の安全管理措置を明記してください。',
      });
    }
  }

  // Check Telecommunications Business Act Art. 27-12 (外部送信規律)
  const art27Weight = 14;
  totalWeight += art27Weight;
  const hasDetectedTrackers = trackerAudit.detectedTrackers.length > 0 || trackerAudit.unclassifiedExternalHosts.length > 0;
  const hasTransmissionSection = /(外部送信|電気通信事業法|第27条の12|情報収集モジュール|Cookie)/.test(text);
  const hasFourElements =
    /(送信される|識別子|閲覧履歴|Cookie|IPアドレス)/.test(text) &&
    /(利用目的|アクセス解析|広告)/.test(text) &&
    /(オプトアウト|無効化|拒否)/.test(text);
  const allVendorsMentioned = trackerAudit.detectedTrackers.every((t) =>
    t.aliases.some((alias) => text.toLowerCase().includes(alias.toLowerCase()))
  );

  const passedArt27 =
    text.length > 0 &&
    hasTransmissionSection &&
    hasFourElements &&
    (!hasDetectedTrackers || allVendorsMentioned);

  if (passedArt27) {
    earnedWeight += art27Weight;
  } else {
    const unmentionedVendors = trackerAudit.detectedTrackers
      .filter((t) => !t.aliases.some((alias) => text.toLowerCase().includes(alias.toLowerCase())))
      .map((t) => t.vendor);

    findings.push({
      id: 'TBA-GAIBUSOSHIN-27-12',
      article: '電気通信事業法 第27条の12（外部送信規律）',
      severity: hasDetectedTrackers ? 'HIGH' : 'MEDIUM',
      title: '外部送信される利用者情報の項目・送信先・利用目的・オプトアウト公表',
      passed: false,
      missingDetail:
        unmentionedVendors.length > 0
          ? `HTML/スクリプトから検出された外部送信先（${unmentionedVendors.join(' / ')}）の送信先名称、送信情報、利用目的、オプトアウト手続の公表がポリシー本文で確認できません。`
          : 'Cookie・情報収集モジュール等による外部送信に関する4要件（送信情報・送信先・利用目的・オプトアウト）の公表欄が不足しています。',
      remediation:
        '下記「自動生成ドラフト」の外部送信規律公表テーブルをプライバシーポリシーまたは専用公表ページに掲載してください。',
    });
  }

  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  let status = 'READY';
  if (score < 60 || findings.some((f) => f.severity === 'HIGH')) {
    status = findings.length >= 4 ? 'HIGH_RISK' : 'NEEDS_REVIEW';
  } else if (findings.length > 0) {
    status = 'NEEDS_REVIEW';
  }

  return {
    score,
    status,
    passedCount: CHECK_DEFINITIONS.length + (shouldAuditArt28 ? 1 : 0) + 1 - findings.length,
    totalChecks: CHECK_DEFINITIONS.length + (shouldAuditArt28 ? 1 : 0) + 1,
    findings,
    trackerAudit,
  };
}

/**
 * Generate actionable APPI + Art. 27-12 Markdown remediation draft and disclosure table.
 * @param {ReturnType<typeof auditPrivacyAndGaibusoshin>} auditResult
 * @param {{ companyName?: string, address?: string, representative?: string, contactEmail?: string }} [meta]
 */
export function generatePrivacyAndGaibusoshinMarkdown(auditResult, meta = {}) {
  const companyName = (meta.companyName || '（事業者名を記載）').trim();
  const address = (meta.address || '（本店所在地を記載）').trim();
  const representative = (meta.representative || '（代表者氏名を記載）').trim();
  const contactEmail = (meta.contactEmail || '（相談窓口メールアドレスを記載）').trim();

  const lines = [
    '# プライバシーポリシー補正ドラフト・外部送信規律公表表',
    '',
    `- 準拠対象: 個人情報の保護に関する法律（APPI）第17条・第21条・第23条・第27条・第28条・第32条 / 電気通信事業法 第27条の12`,
    `- 監査スコア: **${auditResult.score} / 100**（判定: \`${auditResult.status}\`）`,
    '',
    '## 1. 個人情報取扱事業者の表示（第32条第1項第1号）',
    `- 事業者名称: ${companyName}`,
    `- 所在地: ${address}`,
    `- 代表者: ${representative}`,
    `- お問い合わせ・開示等請求窓口: ${contactEmail}`,
    '',
    '## 2. 安全管理措置・外国にある第三者への提供（第23条・第28条）',
    '当社は、取り扱う個人データの漏えい、滅失又は毀損の防止その他の個人データの安全管理のため、アクセス制御、通信の暗号化、取扱規程の整備および委託先の適切な監督等の安全管理措置を講じます。',
  ];

  const foreignCountries = [
    ...new Set(
      (auditResult.trackerAudit?.detectedTrackers || [])
        .filter((t) => t.country !== '日本')
        .map((t) => t.country)
    ),
  ];

  if (foreignCountries.length > 0) {
    lines.push(
      '',
      `本サービスで利用する外部クラウド・解析ツールの提供事業者は **${foreignCountries.join('・')}** に所在しています。各国の個人情報保護制度の概要は個人情報保護委員会（PPC）の公表資料に準拠し、提供先事業者はOECDプライバシーガイドライン8原則に対応する措置を講じています。`
    );
  }

  lines.push(
    '',
    '## 3. 電気通信事業法 第27条の12（外部送信規律）公表事項',
    '',
    '| 送信先名称 | 所在国 | 主な区分 | 送信される利用者情報の項目 | 利用目的 | オプトアウト・無効化手段 |',
    '|---|---|---|---|---|---|'
  );

  const trackers = auditResult.trackerAudit?.detectedTrackers || [];
  const unknownHosts = auditResult.trackerAudit?.unclassifiedExternalHosts || [];

  if (trackers.length === 0 && unknownHosts.length === 0) {
    lines.push(
      '| 外部送信SDK未検出 | — | — | 本ページ入力範囲では既知の外部送信タグは検出されませんでした | — | — |'
    );
  } else {
    for (const t of trackers) {
      lines.push(
        `| ${t.vendor} | ${t.country} | ${t.category} | ${t.typicalSentItemsJa} | ${t.purposeJa} | ${t.optOutHintJa} |`
      );
    }
    for (const host of unknownHosts) {
      lines.push(
        `| 未分類外部ホスト (\`${host}\`) | 要確認 | 要分類 | IPアドレス・リファラ・Cookie等（要開発者確認） | （利用目的を追記） | （同意管理またはタグ削除方法を追記） |`
      );
    }
  }

  return lines.join('\n');
}
