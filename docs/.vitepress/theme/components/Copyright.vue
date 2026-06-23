<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const CC_ICONS = ['cc', 'by', 'nc', 'sa']

const LOCALE: Record<string, { by: string; connector: string }> = {
  'en-US': { by: 'by ',    connector: '— is licensed under' },
  'ru-RU': { by: '',       connector: '— публикуется по лицензии' },
  'zh-CN': { by: '作者 ', connector: '— 采用' },
  'ko-KR': { by: '',       connector: '—' },
  'ja-JP': { by: '',       connector: '—' },
}

const locale = computed(() => LOCALE[lang.value] ?? LOCALE['en-US'])
</script>

<template>
  <div class="copyright-block">
    <div class="copyright-inner">
      <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
      © 2024–2026,
      {{ locale.by }}<a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
      {{ locale.connector }}
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
      <img
        v-for="icon in CC_ICONS"
        :key="icon"
        :src="`https://mirrors.creativecommons.org/presskit/icons/${icon}.svg`"
        :alt="icon.toUpperCase()"
      />
    </div>
  </div>
</template>

<style scoped>
.copyright-block {
  margin-top:  48px;
  padding-top: 20px;
  border-top:  1px solid var(--vp-c-divider);
}

.copyright-inner {
  font-size:   13px;
  color:       var(--vp-c-text-2);
  line-height: 1.6;
}

.copyright-inner a {
  color:                 var(--vp-c-text-2);
  text-decoration:       underline;
  text-underline-offset: 2px;
}
.copyright-inner a:hover { color: var(--vp-c-brand); }

.copyright-inner img {
  display:        inline-block;
  max-width:      1em;
  max-height:     1em;
  margin-left:    0.2em;
  vertical-align: middle;
  opacity:        0.7;
}
</style>
