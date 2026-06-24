import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getLocalePrefix, isHomePath, normalizeBase } from './routing'

export function useLocale() {
  const route    = useRoute()
  const { site } = useData()

  const base   = computed(() => normalizeBase(site.value.base))
  const locale = computed(() => getLocalePrefix(route.path, base.value) ?? 'en')
  const isHome = computed(() => isHomePath(route.path, base.value))

  return { locale, base, isHome }
}
