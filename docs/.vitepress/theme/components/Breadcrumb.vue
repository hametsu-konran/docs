<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import { getLocalePrefix, normalizeBase } from '../utils/routing'

const route          = useRoute()
const router         = useRouter()
const { site, page } = useData()

interface Crumb { text: string; link: string }

const HOME_LABELS: Record<string, string> = {
  ru: 'Главная', zh: '首页', ko: '홈', ja: 'ホーム', en: 'Home',
}

const crumbs = computed<Crumb[]>(() => {
  const base   = normalizeBase(site.value.base)
  const locale = getLocalePrefix(route.path, base) ?? 'en'

  const clean = route.path.startsWith(base)
    ? route.path.slice(base.length)
    : route.path.replace(/^\//, '')

  const parts = clean.split('/').filter(p => Boolean(p) && p !== locale)

  const result: Crumb[] = [{ text: HOME_LABELS[locale] ?? 'Home', link: base }]

  let accumulated = base + (locale !== 'en' ? `${locale}/` : '')

  for (let i = 0; i < parts.length; i++) {
    const part   = parts[i]
    accumulated += part + '/'
    const isLast = i === parts.length - 1
    const label  = isLast
      ? (page.value.title || capitalize(part))
      : capitalize(part)
    result.push({ text: label, link: accumulated })
  }

  return result
})

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/[-_]+/g, ' ')
}

function navigate(e: MouseEvent, link: string): void {
  e.preventDefault()
  router.go(link)
}
</script>

<template>
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="Breadcrumb">
    <span v-for="(crumb, i) in crumbs" :key="crumb.link">
      <a
        v-if="i < crumbs.length - 1"
        :href="crumb.link"
        @click="navigate($event, crumb.link)"
      >{{ crumb.text }}</a>
      <span v-else class="current" aria-current="page">{{ crumb.text }}</span>
      <span v-if="i < crumbs.length - 1" class="sep" aria-hidden="true">›</span>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display:       flex;
  align-items:   center;
  flex-wrap:     wrap;
  gap:           2px;
  font-size:     13px;
  color:         var(--vp-c-text-3);
  margin-bottom: 10px;
}

.breadcrumb a       { color: var(--vp-c-text-2); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--vp-c-brand); }
.current            { color: var(--vp-c-text-1); font-weight: 500; }
.sep                { opacity: 0.4; margin: 0 4px; }
</style>
