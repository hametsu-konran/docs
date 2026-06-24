<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { useLocale } from '../utils/useLocale'

const route          = useRoute()
const { locale }     = useLocale()

const LABELS: Record<string, { copy: string; aria: string; copied: string }> = {
  ru: { copy: 'Скопировать ссылку', aria: 'Скопировать ссылку на заголовок', copied: 'Скопировано!' },
  zh: { copy: '复制链接',           aria: '复制标题链接',                     copied: '已复制！' },
  ko: { copy: '링크 복사',          aria: '제목 링크 복사',                   copied: '복사됨!' },
  ja: { copy: 'リンクをコピー',     aria: '見出しリンクをコピー',             copied: 'コピー済み！' },
  en: { copy: 'Copy link',          aria: 'Copy link to heading',            copied: 'Copied!' },
}

interface Handler { el: HTMLElement; fn: () => void }
let handlers: Handler[] = []

function cleanup(): void {
  for (const { el, fn } of handlers) el.removeEventListener('click', fn)
  handlers = []
  document.querySelectorAll('.copy-heading-btn').forEach(el => el.remove())
}

function init(): void {
  cleanup()

  const l    = LABELS[locale.value] ?? LABELS.en
  const base = window.location.origin + window.location.pathname.replace(/\/$/, '')

  document.querySelectorAll<HTMLElement>('.vp-doc h2, .vp-doc h3').forEach(heading => {
    const { id } = heading
    if (!id) return

    const btn = document.createElement('button')
    btn.type           = 'button'
    btn.className      = 'copy-heading-btn'
    btn.title          = l.copy
    btn.dataset.copied = l.copied
    btn.setAttribute('aria-label', l.aria)
    btn.innerHTML =
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">` +
        `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>` +
        `<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>` +
      `</svg>`

    let timer: ReturnType<typeof setTimeout> | null = null
    const fn = async () => {
      try { await navigator.clipboard.writeText(`${base}#${id}`) } catch { return }
      btn.classList.add('copied')
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => { btn.classList.remove('copied'); timer = null }, 1800)
    }

    btn.addEventListener('click', fn)
    handlers.push({ el: btn, fn })
    heading.appendChild(btn)
  })
}

onMounted(() => requestAnimationFrame(init))
watch(() => route.path.split('#')[0], () => requestAnimationFrame(init))
onUnmounted(cleanup)
</script>

<template><span aria-hidden="true" /></template>

<style>
.copy-heading-btn {
  display:        inline-flex;
  align-items:    center;
  margin-left:    8px;
  padding:        2px 4px;
  color:          transparent;
  cursor:         pointer;
  border-radius:  4px;
  vertical-align: middle;
  transition:     color 0.2s ease;
  position:       relative;
  border:         0;
  background:     transparent;
}

h2:hover .copy-heading-btn,
h3:hover .copy-heading-btn     { color: rgba(84,160,255,0.5); }

.copy-heading-btn:hover,
.copy-heading-btn:focus-visible { color: rgba(84,160,255,1) !important; outline: none; }

.copy-heading-btn::after {
  content:        attr(data-copied);
  position:       absolute;
  top:            -32px;
  left:           50%;
  transform:      translateX(-50%);
  background:     #0d0d0d;
  border:         1px solid rgba(255,255,255,0.18);
  border-radius:  6px;
  padding:        4px 16px;
  font-size:      12px;
  font-weight:    600;
  color:          #ffffff;
  white-space:    nowrap;
  box-shadow:     0 0 10px rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.5);
  opacity:        0;
  pointer-events: none;
  transition:     opacity 0.2s ease;
}

html:not(.dark) .copy-heading-btn::after {
  background:   #ffffff;
  border-color: rgba(0,0,0,0.15);
  color:        #0d0d0d;
  box-shadow:   0 0 10px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1);
}

.copy-heading-btn.copied::after { opacity: 1; }
</style>
