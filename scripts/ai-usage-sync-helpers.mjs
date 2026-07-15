function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

export function sameUsageDay(left, right) {
  return Boolean(left && right && JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right)));
}
