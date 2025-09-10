// algorithm Levenshtein distance: https://en.wikipedia.org/wiki/Levenshtein_distance
export const normalizeString = (str) => (str || '').toString().toLowerCase().trim();

export const levenshteinDistance = (a, b) => {
  const s = normalizeString(a);
  const t = normalizeString(b);
  if (s === t) return 0;
  const n = s.length;
  const m = t.length;
  if (n === 0) return m;
  if (m === 0) return n;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      const del = dp[i - 1][j] + 1;
      const ins = dp[i][j - 1] + 1;
      const sub = dp[i - 1][j - 1] + cost;
      dp[i][j] = Math.min(del, ins, sub);
    }
  }
  return dp[n][m];
};

export const buildKeywordListForSuggestions = (productData) => {
  return (productData || [])
    .map((p) => {
      const keys = new Set();
      if (p?.name) keys.add(normalizeString(p.name));
      if (p?.brand) keys.add(normalizeString(p.brand));
      if (Array.isArray(p?.tags)) p.tags.forEach((t) => t && keys.add(normalizeString(t)));
      return Array.from(keys).filter(Boolean);
    })
    .flat();
};

export const buildProductKeywordIndex = (productData) => {
  return (productData || []).map((p) => {
    const keys = new Set();
    if (p?.name) {
      const n = normalizeString(p.name);
      if (n) keys.add(n);
      n.split(/[\s-]+/).forEach((t) => t && keys.add(t));
    }
    if (p?.brand) {
      const b = normalizeString(p.brand);
      if (b) keys.add(b);
    }
    if (Array.isArray(p?.tags)) {
      p.tags.forEach((t) => {
        const tn = normalizeString(t);
        if (tn) keys.add(tn);
      });
    }
    return { product: p, keys: Array.from(keys) };
  });
};

export const computeSuggestions = (collectKeywords, search) => {
  const q = normalizeString(search);
  if (!q) return [];
  const scored = new Map();
  collectKeywords.forEach((k) => {
    if (!k || k.includes(q)) return;
    const dist = levenshteinDistance(k, q);
    const threshold = q.length <= 4 ? 1 : 2;
    if (dist <= threshold || (q.length > 4 && dist / Math.max(k.length, q.length) <= 0.35)) {
      const score = 1 - dist / Math.max(k.length, q.length);
      if (!scored.has(k) || score > scored.get(k)) scored.set(k, score);
    }
  });
  return Array.from(scored.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => k);
};

export const computeFuzzyResults = (productKeywordIndex, search) => {
  const q = normalizeString(search);
  if (!q) return [];
  const scored = [];
  productKeywordIndex.forEach(({ product, keys }) => {
    let best = 0;
    for (const k of keys) {
      if (k.includes(q)) {
        best = Math.max(best, Math.min(1, q.length / Math.max(1, k.length) + 0.25));
        break;
      }
      const n = k.length;
      const m = q.length;
      const dist = levenshteinDistance(k, q);
      const score = 1 - dist / Math.max(n, m);
      if (score > best) best = score;
      if (best >= 0.97) break;
    }
    const threshold = q.length <= 4 ? 0.62 : 0.5;
    if (best >= threshold) scored.push({ product, score: best });
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.map((x) => x.product);
};
