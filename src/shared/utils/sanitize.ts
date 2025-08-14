export function sanitizePayload<T extends Record<string, any>>(obj: T) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue; // null/undefined 제거
    if (Array.isArray(v)) {
      const arr = v
        .map((x) => (typeof x === 'string' ? x.trim() : x))
        .filter(Boolean);
      out[k] = arr; // []는 허용
    } else if (typeof v === 'string') {
      const s = v.trim();
      if (s !== '') out[k] = s;
    } else out[k] = v;
  }
  return out as T;
}
