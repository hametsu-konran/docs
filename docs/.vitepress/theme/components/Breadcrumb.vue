<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import { useLocale } from '../utils/useLocale'

const route       = useRoute()
const router      = useRouter()
const { page }    = useData()
const { locale, base } = useLocale()

interface Crumb { text: string; link: string }

const HOME_LABELS: Record<string, string> = {
  ru: 'Главная', zh: '首页', ko: '홈', ja: 'ホーム', en: 'Home',
}

function titleCase(s: string): string {
  return s.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

const crumbs = computed<Crumb[]>(() => {
  const b = base.value
  const l = locale.value

  const clean = route.path.startsWith(b)
    ? route.path.slice(b.length)
    : route.path.replace(/^\//, '')

  const parts = clean.split('/').filter(p => Boolean(p) && p !== l)

  const result: Crumb[] = [{ text: HOME_LABELS[l] ?? 'Home', link: b }]

  let acc = b + (l !== 'en' ? `${l}/` : '')

  for (let i = 0; i < parts.length; i++) {
    acc += parts[i] + '/'
    result.push({
      text: i === parts.length - 1 ? (page.value.title || titleCase(parts[i])) : titleCase(parts[i]),
      link: acc,
    })
  }

  return result
})

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
