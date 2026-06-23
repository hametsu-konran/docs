<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getLocalePrefix, normalizeBase } from '../utils/routing'

const SIZE   = 48
const RADIUS = 20
const CIRCUM = 2 * Math.PI * RADIUS

const progress = ref(0)
const visible  = ref(false)
const idle     = ref(false)

const route    = useRoute()
const { site } = useData()

const LABELS: Record<string, { read: string; top: string }> = {
  ru: { read: 'прочитано', top: 'Наверх' },
  zh: { read: '已阅读',    top: '返回顶部' },
  ko: { read: '읽음',      top: '맨 위로' },
  ja: { read: '読了',      top: 'トップへ' },
  en: { read: 'read',      top: 'Back to top' },
}

const locale = computed(() => getLocalePrefix(route.path, normalizeBase(site.value.base)) ?? 'en')

const titleLabel = computed(() => {
  const l = LABELS[locale.value] ?? LABELS.en
  return idle.value ? l.top : `${progress.value}% ${l.read}`
})

let idleTimer: ReturnType<typeof setTimeout> | null = null
let total      = 0
let lastScroll = -1

function calcTotal(): void {
  const docEl = document.querySelector('.vp-doc')
  total = docEl
    ? docEl.scrollHeight - window.innerHeight + docEl.getBoundingClientRect().top + window.scrollY
    : document.documentElement.scrollHeight - window.innerHeight
  lastScroll = -1
}

function update(): void {
  const scrollY = window.scrollY
  if (scrollY === lastScroll) return
  lastScroll = scrollY

  progress.value = total <= 0 || scrollY <= 0
    ? 0
    : scrollY >= total ? 100 : Math.round((scrollY / total) * 100)

  visible.value = scrollY > 100
  if (idle.value) idle.value = false

  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { idle.value = true }, 3000)
}

function onResize(): void { calcTotal(); update() }

function scrollToTop(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

const strokeOffset = (pct: number) => CIRCUM - (pct / 100) * CIRCUM

watch(() => route.path, () => {
  progress.value = 0
  visible.value  = false
  idle.value     = false
  lastScroll     = -1
  if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
  requestAnimationFrame(() => requestAnimationFrame(() => { calcTotal(); update() }))
})

onMounted(() => {
  calcTotal()
  update()
  window.addEventListener('scroll', update,   { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', onResize)
  if (idleTimer) clearTimeout(idleTimer)
})
</script>

<template>
  <Transition name="progress-fade">
    <div
      v-if="visible"
      class="rp-wrap"
      :title="titleLabel"
      :aria-label="titleLabel"
      role="button"
      tabindex="0"
      @click="scrollToTop"
      @keydown.enter.prevent="scrollToTop"
      @keydown.space.prevent="scrollToTop"
    >
      <svg :width="SIZE" :height="SIZE" class="rp-ring" aria-hidden="true">
        <circle :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS" fill="none" stroke="rgba(84,160,255,0.12)" stroke-width="2.5" />
        <circle
          :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS"
          fill="none" stroke="#54a0ff" stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="CIRCUM"
          :stroke-dashoffset="strokeOffset(progress)"
          transform="rotate(-90, 24, 24)"
          class="rp-arc"
        />
      </svg>

      <Transition name="icon-swap" mode="out-in">
        <span v-if="!idle" key="pct" class="rp-label">{{ progress }}%</span>
        <span v-else key="arrow" class="rp-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </span>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.rp-wrap {
  position:        fixed;
  bottom:          28px;
  right:           28px;
  z-index:         100;
  width:           48px;
  height:          48px;
  display:         flex;
  align-items:     center;
  justify-content: center;
  cursor:          pointer;
  user-select:     none;
  background:      rgba(13,13,13,0.85);
  border-radius:   50%;
  box-shadow:      0 0 12px rgba(84,160,255,0.12);
  transition:      box-shadow 0.2s ease;
}

html:not(.dark) .rp-wrap      { background: rgba(255,255,255,0.95); box-shadow: 0 0 12px rgba(0,0,0,0.08); }
.rp-wrap:hover                 { box-shadow: 0 0 22px rgba(84,160,255,0.35); }
html:not(.dark) .rp-wrap:hover { box-shadow: 0 0 22px rgba(37,99,235,0.25); }

.rp-ring { position: absolute; inset: 0; overflow: visible; }
.rp-arc  { transition: none; }

.rp-label                  { font-size: 11px; font-weight: 600; color: #54a0ff; line-height: 1; }
html:not(.dark) .rp-label  { color: #2563eb; }

.rp-arrow                  { display: flex; align-items: center; color: #54a0ff; }
html:not(.dark) .rp-arrow  { color: #2563eb; }

.icon-swap-enter-active,
.icon-swap-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.icon-swap-enter-from   { opacity: 0; transform: translateY(4px);  }
.icon-swap-leave-to     { opacity: 0; transform: translateY(-4px); }

.progress-fade-enter-active,
.progress-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.progress-fade-enter-from,
.progress-fade-leave-to     { opacity: 0; transform: translateY(6px); }
</style>
