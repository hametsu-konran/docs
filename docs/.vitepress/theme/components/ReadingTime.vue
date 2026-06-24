<script setup lang="ts">
import { nextTick, onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vitepress'
import { useLocale } from '../utils/useLocale'

const WORDS_PER_MINUTE = 200

const wordCount   = ref(0)
const readingTime = ref(0)

const route      = useRoute()
const { locale } = useLocale()

const LABELS: Record<string, { words: string; min: string }> = {
  ru: { words: 'слов',   min: 'мин. чтения' },
  zh: { words: '字',     min: '分钟阅读' },
  ko: { words: '단어',   min: '분 읽기' },
  ja: { words: '語',     min: '分で読める' },
  en: { words: 'words',  min: 'min read' },
}

const labels = computed(() => LABELS[locale.value] ?? LABELS.en)

function calculate(): void {
  const el = document.querySelector('.vp-doc')
  if (!el) { wordCount.value = 0; readingTime.value = 0; return }

  const clone = el.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.copy-heading-btn').forEach(b => b.remove())

  const words       = (clone.textContent ?? '').trim().split(/\s+/).filter(Boolean).length
  wordCount.value   = words
  readingTime.value = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function run(): void { nextTick(() => requestAnimationFrame(calculate)) }

onMounted(run)
watch(() => route.path, run)
</script>

<template>
  <div v-if="wordCount > 0" class="reading-meta">
    <span class="meta-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      {{ wordCount }} {{ labels.words }}
    </span>
    <span class="sep" aria-hidden="true">·</span>
    <span class="meta-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      {{ readingTime }} {{ labels.min }}
    </span>
  </div>
</template>

<style scoped>
.reading-meta {
  display:       inline-flex;
  align-items:   center;
  gap:           8px;
  font-size:     13px;
  color:         var(--vp-c-text-2);
  margin-bottom: 20px;
  padding:       6px 14px;
  background:    var(--vp-c-bg-soft);
  border-radius: 8px;
  border:        1px solid var(--vp-c-divider);
}

.meta-item { display: flex; align-items: center; gap: 5px; }
.sep       { opacity: 0.3; }
</style>
