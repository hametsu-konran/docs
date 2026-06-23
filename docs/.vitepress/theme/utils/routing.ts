export const LOCALE_PREFIXES = ['ru', 'zh', 'ko', 'ja'] as const

export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}

export function getLocalePrefix(path: string, base: string): string | null {
  const nb  = normalizeBase(base)
  const rel = (path.startsWith(nb) ? path.slice(nb.length) : path.replace(/^\//, '')).split('/')[0]
  return (LOCALE_PREFIXES as readonly string[]).includes(rel) ? rel : null
}

export function isHomePath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  if (path === nb) return true
  return LOCALE_PREFIXES.some(p => path === `${nb}${p}/` || path === `${nb}${p}`)
}
