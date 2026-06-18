<script setup lang="ts">
import { useData } from 'vitepress'

const { page, lang } = useData()
</script>

<template>
  <div v-if="page.filePath" class="copyright-block">
    <div class="copyright-inner">

      <span v-if="lang === 'ru-RU'">
        <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
        © 2024–2026,
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        — лицензия
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
      </span>

      <span v-else-if="lang === 'zh-CN'">
        <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
        © 2024–2026，
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        — 许可证
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
      </span>

      <span v-else-if="lang === 'ko-KR'">
        <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
        © 2024–2026,
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        — 라이선스
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
      </span>

      <span v-else-if="lang === 'ja-JP'">
        <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
        © 2024–2026,
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        — ライセンス
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
      </span>

      <span v-else>
        <a href="https://github.com/hametsu-konran/docs" target="_blank" rel="noopener noreferrer">Hametsu Konran Docs</a>
        © 2024–2026 by
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        is licensed under
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" />
      </span>

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
