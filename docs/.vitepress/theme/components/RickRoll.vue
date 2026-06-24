<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { useLocale } from '../utils/useLocale'

const CLICKS_NEEDED = 7
const RESET_DELAY   = 10000
const TARGET_URL    = 'https://youtu.be/dQw4w9WgXcQ?si=3-SKpSMGFYWdsQlA'

const route      = useRoute()
const { isHome } = useLocale()

let count      = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null
let active     = false

function openInNewTab(url: string): void {
  const a         = document.createElement('a')
  a.href          = url
  a.target        = '_blank'
  a.rel           = 'noopener noreferrer'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function onDocumentClick(e: MouseEvent): void {
  if (!active) return
  if (!(e.target as Element).closest('.VPHero')) return

  count++
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { count = 0 }, RESET_DELAY)

  if (count >= CLICKS_NEEDED) {
    count = 0
    openInNewTab(TARGET_URL)
  }
}

function activate(): void {
  active = isHome.value
  if (!active) {
    count = 0
    if (resetTimer) { clearTimeout(resetTimer); resetTimer = null }
  }
}

onMounted(() => {
  activate()
  document.addEventListener('click', onDocumentClick)
})

watch(() => route.path, activate)

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template><span aria-hidden="true" /></template>
