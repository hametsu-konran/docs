import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'

import mediumZoom from 'medium-zoom'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'

import { setupMusicPlayer } from './musicPlayer'
import { isHomePath } from './utils/routing'

import Breadcrumb      from './components/Breadcrumb.vue'
import ReadingTime     from './components/ReadingTime.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import CopyHeadingLink from './components/CopyHeadingLink.vue'
import RickRoll        from './components/RickRoll.vue'
import Copyright       from './components/Copyright.vue'
import FrogFirework    from './components/FrogFirework.vue'
import NotFound        from './components/NotFound.vue'

import './custom.css'

const ZoomSetup = {
  setup() {
    const route = useRoute()
    let zoom: ReturnType<typeof mediumZoom> | null = null

    function init() {
      zoom?.detach()
      zoom = mediumZoom('.vp-doc img:not(.no-zoom)', { background: 'rgba(0,0,0,0.85)' })
    }

    onMounted(() => nextTick(init))
    watch(() => route.path, () => nextTick(init))
    onUnmounted(() => zoom?.detach())
  },
  render: () => null,
}

const HeadingHighlight = {
  setup() {
    const route = useRoute()
    let clearTimer: ReturnType<typeof setTimeout> | null = null

    function highlight() {
      document.querySelectorAll('.heading-highlighted').forEach(el =>
        el.classList.remove('heading-highlighted')
      )
      const hash   = decodeURIComponent(window.location.hash.slice(1))
      if (!hash) return
      const target = document.getElementById(hash)
      if (!target) return
      target.classList.add('heading-highlighted')
      if (clearTimer) clearTimeout(clearTimer)
      clearTimer = setTimeout(() => target.classList.remove('heading-highlighted'), 2500)
    }

    const onHashChange = () => nextTick(highlight)

    onMounted(() => {
      nextTick(highlight)
      window.addEventListener('hashchange', onHashChange)
    })
    watch(() => route.path, () => nextTick(highlight))
    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
      if (clearTimer) clearTimeout(clearTimer)
    })
  },
  render: () => null,
}

const ProgressWrapper = {
  setup() {
    const route    = useRoute()
    const { site } = useData()
    return () => isHomePath(route.path, site.value.base) ? null : h(ReadingProgress)
  },
}

export default {
  extends: DefaultTheme,

  NotFound,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before':    () => h('div', { class: 'doc-tools' }, [h(Breadcrumb), h(ReadingTime)]),
      'doc-after':     () => h(Copyright),
      'layout-bottom': () => h('div', null, [
        h(ZoomSetup),
        h(HeadingHighlight),
        h(CopyHeadingLink),
        h(ProgressWrapper),
        h(RickRoll),
        h(FrogFirework),
      ]),
    })
  },

  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    if (typeof window !== 'undefined') {
      vitepressNprogress(ctx)
      requestAnimationFrame(setupMusicPlayer)
    }
  },
}
