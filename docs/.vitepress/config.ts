import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  BASE_PATH,
  FULL_URL,
  SITE_HOSTNAME,
  GITHUB_REPO_URL,
  EDIT_LINK,
  DISCORD_URL,
  TELEGRAM_URL,
} from './site.config'

// ---------------------------------------------------------------------------
// Social links shown in the navbar
// ---------------------------------------------------------------------------

const SOCIAL_LINKS: DefaultTheme.SocialLink[] = [
  { icon: 'github',   link: GITHUB_REPO_URL },
  { icon: 'discord',  link: DISCORD_URL },
  { icon: 'telegram', link: TELEGRAM_URL },
]

// ---------------------------------------------------------------------------
// Footer — CC license icons generated from an array to avoid repetition
// ---------------------------------------------------------------------------

const CC_ICONS = (['cc', 'by', 'nc', 'sa'] as const)
  .map(f => `<img src="https://mirrors.creativecommons.org/presskit/icons/${f}.svg" alt="${f.toUpperCase()}" width="18" height="18">`)
  .join('')

const FOOTER_MESSAGE =
  '<a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>' +
  ' &nbsp;·&nbsp; ' +
  '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>' +
  ` <span class="footer-cc-icons">${CC_ICONS}</span>`

// ---------------------------------------------------------------------------
// Inline script — forces dark mode on first visit before Vue hydrates.
// Wrapped in try/catch for iOS Safari private browsing compatibility.
// ---------------------------------------------------------------------------

const DARK_THEME_SCRIPT =
  `(function(){try{var k='vitepress-theme-appearance';` +
  `if(!localStorage.getItem(k))localStorage.setItem(k,'dark');}catch(e){}})()`

// ---------------------------------------------------------------------------
// Head tags — shared between locales (theme-independent).
// VitePress deduplicates by content — no double-execution.
// ---------------------------------------------------------------------------

const SHARED_HEAD = [
  ['script', {}, DARK_THEME_SCRIPT],
  ['link',   { rel: 'icon', href: `${BASE_PATH}logo.png` }],
  ['meta',   { name: 'theme-color', content: '#0d0d0d' }],
  ['meta',   { property: 'og:image', content: `${FULL_URL}logo.png` }],
  ['meta',   { property: 'og:type',  content: 'website' }],
] as [string, Record<string, string>, string?][]

// ---------------------------------------------------------------------------
// Default logo — switches between dark/light variants automatically
// ---------------------------------------------------------------------------

const DEFAULT_LOGO = {
  dark:  '/logo.png',
  light: '/logo2.png',
} satisfies DefaultTheme.ThemeableImage

// ---------------------------------------------------------------------------
// Search — top-level themeConfig only; locales[x].themeConfig is ignored.
// ---------------------------------------------------------------------------

const SEARCH: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    miniSearch: { searchOptions: { fuzzy: 0.2, prefix: true } },
    // EN translations (primary locale / default)
    translations: {
      button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      modal: {
        displayDetails:   'Show detailed list',
        resetButtonTitle: 'Reset',
        backButtonTitle:  'Close',
        noResultsText:    'No results for',
        footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' },
      },
    },
    // RU translations via locales subkey
    locales: {
      ru: {
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            displayDetails:   'Подробный список',
            resetButtonTitle: 'Сбросить',
            backButtonTitle:  'Закрыть',
            noResultsText:    'Ничего не найдено по запросу',
            footer: { selectText: 'Выбрать', navigateText: 'Навигация', closeText: 'Закрыть' },
          },
        },
      },
      zh: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails:   '显示详细列表',
            resetButtonTitle: '重置',
            backButtonTitle:  '关闭',
            noResultsText:    '未找到相关结果',
            footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' },
          },
        },
      },
      ko: {
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            displayDetails:   '자세한 목록 표시',
            resetButtonTitle: '초기화',
            backButtonTitle:  '닫기',
            noResultsText:    '검색 결과 없음',
            footer: { selectText: '선택', navigateText: '탐색', closeText: '닫기' },
          },
        },
      },
      ja: {
        translations: {
          button: { buttonText: '検索', buttonAriaLabel: '検索' },
          modal: {
            displayDetails:   '詳細リストを表示',
            resetButtonTitle: 'リセット',
            backButtonTitle:  '閉じる',
            noResultsText:    '検索結果が見つかりません',
            footer: { selectText: '選択', navigateText: 'ナビゲート', closeText: '閉じる' },
          },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Reusable SVG icon snippets — same icons as sidebar, reused in navbar
// ---------------------------------------------------------------------------

const SVG_ABOUT  = '<span class="sb-icon sb-icon-about"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg></span>'
const SVG_ISSUES = '<span class="sb-icon sb-icon-issues"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.17 12l-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83 19.78 22.61l1.41-1.41L2.81 2.81 1.39 4.22z"/></svg></span>'
const SVG_GUIDE  = '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span>'
const SVG_RES    = '<span class="sb-icon sb-icon-res"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg></span>'
const SVG_FAQ    = '<span class="sb-icon sb-icon-faq"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg></span>'
const SVG_TIPS   = '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span>'

// ---------------------------------------------------------------------------
// Sidebars
// ---------------------------------------------------------------------------

// EN sidebar — links have no prefix (EN is served at root via rewrites)
const sidebarEn: DefaultTheme.Sidebar = [
  {
    text: '📌 Pinned',
    collapsed: false,
    items: [
      { text: `${SVG_ABOUT} About`, link: '/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: `${SVG_RES} Resources`,             link: '/shindo-life/resources', badge: { type: 'info', text: 'Soon' } },
      { text: `${SVG_ISSUES} Shindo Life Issues`, link: '/shindo-life/issues',  badge: { type: 'danger',  text: 'Active'    } },
      { text: `${SVG_GUIDE} Guide`,               link: '/shindo-life/guide',   badge: { type: 'tip',     text: 'Read'      } },
      { text: `${SVG_TIPS} Tips & Tricks`,        link: '/shindo-life/tips',    badge: { type: 'warning', text: 'Important' } },
      { text: `${SVG_FAQ} FAQ`,                       link: '/shindo-life/faq',     badge: { type: 'info',    text: 'Soon'      } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: `${SVG_RES} Resources`,      link: '/rell-seas/resources', badge: { type: 'info', text: 'Soon' } },
      { text: `${SVG_GUIDE} Guide`,        link: '/rell-seas/guide', badge: { type: 'tip',  text: 'Soon' } },
      { text: `${SVG_TIPS} Tips & Tricks`, link: '/rell-seas/tips',  badge: { type: 'info', text: 'Soon' } },
      { text: `${SVG_FAQ} FAQ`,                link: '/rell-seas/faq',   badge: { type: 'info', text: 'Soon' } },
    ],
  },
]

// RU sidebar — all links prefixed with /ru/
const sidebarRu: DefaultTheme.Sidebar = [
  {
    text: '📌 Закреплено',
    collapsed: false,
    items: [
      { text: `${SVG_ABOUT} О проекте`, link: '/ru/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: `${SVG_RES} Ресурсы`,                 link: '/ru/shindo-life/resources', badge: { type: 'info', text: 'Скоро' } },
      { text: `${SVG_ISSUES} Проблемы Shindo Life`, link: '/ru/shindo-life/issues',  badge: { type: 'danger',  text: 'Актуально' } },
      { text: `${SVG_GUIDE} Гайд`,                  link: '/ru/shindo-life/guide',   badge: { type: 'tip',     text: 'Читать'    } },
      { text: `${SVG_TIPS} Советы и фишки`,         link: '/ru/shindo-life/tips',    badge: { type: 'warning', text: 'Важно'     } },
      { text: `${SVG_FAQ} FAQ`,                        link: '/ru/shindo-life/faq',    badge: { type: 'info',    text: 'Скоро'    } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: `${SVG_RES} Ресурсы`,          link: '/ru/rell-seas/resources', badge: { type: 'info', text: 'Скоро' } },
      { text: `${SVG_GUIDE} Гайд`,          link: '/ru/rell-seas/guide', badge: { type: 'tip',  text: 'Скоро' } },
      { text: `${SVG_TIPS} Советы и фишки`, link: '/ru/rell-seas/tips',  badge: { type: 'info', text: 'Скоро' } },
      { text: `${SVG_FAQ} FAQ`,                link: '/ru/rell-seas/faq',   badge: { type: 'info', text: 'Скоро' } },
    ],
  },
]


// ZH sidebar
const sidebarZh: DefaultTheme.Sidebar = [
  { text: '📌 置顶', collapsed: false, items: [
      { text: `${SVG_ABOUT} 关于`, link: '/zh/about' },
  ]},
  { text: '⚔️ Shindo Life 2', collapsed: false, items: [
      { text: `${SVG_RES} 资源`,                link: '/zh/shindo-life/resources', badge: { type: 'info', text: '即将' } },
      { text: `${SVG_ISSUES} Shindo Life 问题`, link: '/zh/shindo-life/issues', badge: { type: 'danger',  text: '活跃' } },
      { text: `${SVG_GUIDE} 攻略`,              link: '/zh/shindo-life/guide',  badge: { type: 'tip',     text: '阅读' } },
      { text: `${SVG_TIPS} 技巧与窍门`,         link: '/zh/shindo-life/tips',   badge: { type: 'warning', text: '重要' } },
      { text: `${SVG_FAQ} FAQ`,                  link: '/zh/shindo-life/faq',    badge: { type: 'info',    text: '即将' } },
  ]},
  { text: '🌊 Rell Seas', collapsed: false, items: [
      { text: `${SVG_RES} 资源`,        link: '/zh/rell-seas/resources', badge: { type: 'info', text: '即将' } },
      { text: `${SVG_GUIDE} 攻略`,      link: '/zh/rell-seas/guide', badge: { type: 'tip',  text: '即将' } },
      { text: `${SVG_TIPS} 技巧与窍门`, link: '/zh/rell-seas/tips',  badge: { type: 'info', text: '即将' } },
      { text: `${SVG_FAQ} FAQ`,          link: '/zh/rell-seas/faq',   badge: { type: 'info', text: '即将' } },
  ]},
]

// KO sidebar
const sidebarKo: DefaultTheme.Sidebar = [
  { text: '📌 고정됨', collapsed: false, items: [
      { text: `${SVG_ABOUT} 소개`, link: '/ko/about' },
  ]},
  { text: '⚔️ Shindo Life 2', collapsed: false, items: [
      { text: `${SVG_RES} 리소스`,              link: '/ko/shindo-life/resources', badge: { type: 'info', text: '곧' } },
      { text: `${SVG_ISSUES} Shindo Life 이슈`, link: '/ko/shindo-life/issues', badge: { type: 'danger',  text: '활성' } },
      { text: `${SVG_GUIDE} 가이드`,            link: '/ko/shindo-life/guide',  badge: { type: 'tip',     text: '읽기' } },
      { text: `${SVG_TIPS} 팁 & 트릭`,          link: '/ko/shindo-life/tips',   badge: { type: 'warning', text: '중요' } },
      { text: `${SVG_FAQ} FAQ`,              link: '/ko/shindo-life/faq',    badge: { type: 'info',    text: '곧' } },
  ]},
  { text: '🌊 Rell Seas', collapsed: false, items: [
      { text: `${SVG_RES} 리소스`,     link: '/ko/rell-seas/resources', badge: { type: 'info', text: '곧' } },
      { text: `${SVG_GUIDE} 가이드`,   link: '/ko/rell-seas/guide', badge: { type: 'tip',  text: '곧' } },
      { text: `${SVG_TIPS} 팁 & 트릭`, link: '/ko/rell-seas/tips',  badge: { type: 'info', text: '곧' } },
      { text: `${SVG_FAQ} FAQ`,          link: '/ko/rell-seas/faq',   badge: { type: 'info', text: '곧' } },
  ]},
]

// JA sidebar
const sidebarJa: DefaultTheme.Sidebar = [
  { text: '📌 ピン留め', collapsed: false, items: [
      { text: `${SVG_ABOUT} このサイトについて`, link: '/ja/about' },
  ]},
  { text: '⚔️ Shindo Life 2', collapsed: false, items: [
      { text: `${SVG_RES} リソース`,              link: '/ja/shindo-life/resources', badge: { type: 'info', text: '近日' } },
      { text: `${SVG_ISSUES} 既知の問題`,         link: '/ja/shindo-life/issues', badge: { type: 'danger',  text: '対応中' } },
      { text: `${SVG_GUIDE} ガイド`,              link: '/ja/shindo-life/guide',  badge: { type: 'tip',     text: '読む'   } },
      { text: `${SVG_TIPS} ヒント＆テクニック`,   link: '/ja/shindo-life/tips',   badge: { type: 'warning', text: '重要'   } },
      { text: `${SVG_FAQ} FAQ`,                link: '/ja/shindo-life/faq',    badge: { type: 'info',    text: '近日'  } },
  ]},
  { text: '🌊 Rell Seas', collapsed: false, items: [
      { text: `${SVG_RES} リソース`,            link: '/ja/rell-seas/resources', badge: { type: 'info', text: '近日' } },
      { text: `${SVG_GUIDE} ガイド`,            link: '/ja/rell-seas/guide', badge: { type: 'tip',  text: '近日' } },
      { text: `${SVG_TIPS} ヒント＆テクニック`, link: '/ja/rell-seas/tips',  badge: { type: 'info', text: '近日' } },
      { text: `${SVG_FAQ} FAQ`,             link: '/ja/rell-seas/faq',   badge: { type: 'info', text: '近日' } },
  ]},
]

// ---------------------------------------------------------------------------
// Shared themeConfig fields
// ---------------------------------------------------------------------------

const SHARED_THEME = {
  logo:        DEFAULT_LOGO,
  siteTitle:   'Hametsu Konran',
  socialLinks: SOCIAL_LINKS,
}

// ---------------------------------------------------------------------------
// Main config export
// ---------------------------------------------------------------------------

export default defineConfig({
  base:        BASE_PATH,
  cleanUrls:   true,
  lastUpdated: true,

  // ---------------------------------------------------------------------------
  // Rewrites — EN content folder is mapped to root URLs (no /en/ prefix).
  // RU content stays under /ru/ with no rewrite needed.
  // ---------------------------------------------------------------------------
  rewrites: {
    'en/:path*':               ':path*',
    'shindo-life/index.md':    'shindo-life/guide.md',
    'rell-seas/index.md':      'rell-seas/guide.md',
    'ru/shindo-life/index.md': 'ru/shindo-life/guide.md',
    'ru/rell-seas/index.md':   'ru/rell-seas/guide.md',
    'zh/shindo-life/index.md': 'zh/shindo-life/guide.md',
    'zh/rell-seas/index.md':   'zh/rell-seas/guide.md',
    'ko/shindo-life/index.md': 'ko/shindo-life/guide.md',
    'ko/rell-seas/index.md':   'ko/rell-seas/guide.md',
    'ja/shindo-life/index.md': 'ja/shindo-life/guide.md',
    'ja/rell-seas/index.md':   'ja/rell-seas/guide.md',
  },

  // sitemap.hostname must be bare origin — VitePress appends base automatically.
  // Filter RU pages (secondary, noindex).
  sitemap: {
    hostname: SITE_HOSTNAME,
    transformItems: items => items.filter(item => !['ru/', 'zh/', 'ko/', 'ja/'].some(p => item.url.startsWith(p))),
  },

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
  },

  // Search must be at top-level themeConfig — ignored inside locales
  themeConfig: {
    search: SEARCH,
  },

  locales: {
    // English — primary locale, served at root (no prefix)
    root: {
      label:         'English',
      lang:          'en-US',
      title:         'Hametsu Konran Docs',
      titleTemplate: ':title · Hametsu Konran',
      description:   'Guides, mechanics and tips for all games by Hametsu Konran',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: FULL_URL }],
        ['meta', { property: 'og:locale',      content: 'en_US' }],
        ['meta', { property: 'og:title',       content: 'Hametsu Konran Docs' }],
        ['meta', { property: 'og:description', content: 'Guides, mechanics and tips for all games' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Home', link: '/' },
          { text: `${SVG_ABOUT} About`, link: '/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: `${SVG_RES} Resources`,             link: '/shindo-life/resources' },
              { text: `${SVG_ISSUES} Shindo Life Issues`, link: '/shindo-life/issues' },
              { text: `${SVG_GUIDE} Guide`,               link: '/shindo-life/guide'  },
              { text: `${SVG_TIPS} Tips & Tricks`,        link: '/shindo-life/tips'   },
              { text: `${SVG_FAQ} FAQ`,                       link: '/shindo-life/faq'    },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: `${SVG_RES} Resources`,      link: '/rell-seas/resources' },
              { text: `${SVG_GUIDE} Guide`,        link: '/rell-seas/guide' },
              { text: `${SVG_TIPS} Tips & Tricks`, link: '/rell-seas/tips'  },
              { text: `${SVG_FAQ} FAQ`,                link: '/rell-seas/faq'   },
            ],
          },
        ],
        sidebar:              sidebarEn,
        outline:              { level: [2, 3], label: 'On this page' },
        returnToTopLabel:     '↑ Back to top',
        sidebarMenuLabel:     'Menu',
        darkModeSwitchLabel:  'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle:  'Switch to dark theme',
        langMenuLabel:        'Change language',
        externalLinkIcon:     true,
        notFound: {
          title:     '🐸 Page not found',
          quote:     "Looks like this page got lost in the fog of war. The frog doesn't know where it is either.",
          linkLabel: 'Go to home',
          linkText:  '← Back to home',
          code:      '404',
        },
        docFooter:   { prev: '← Previous', next: 'Next →' },
        lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Edit this page on GitHub' },
        footer:      { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
      },
    },

    // Russian — secondary locale, served under /ru/
    ru: {
      label:         'Русский',
      lang:          'ru-RU',
      link:          '/ru/',
      title:         'Hametsu Konran Docs',
      titleTemplate: ':title · Hametsu Konran',
      description:   'Гайды, механики и советы по играм RELL от Hametsu Konran',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}ru/` }],
        ['meta', { property: 'og:locale',      content: 'ru_RU' }],
        ['meta', { property: 'og:title',       content: 'Hametsu Konran Docs' }],
        ['meta', { property: 'og:description', content: 'Гайды, механики и советы по всем играм' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Главная', link: '/ru/' },
          { text: `${SVG_ABOUT} О проекте`, link: '/ru/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: `${SVG_RES} Ресурсы`,                 link: '/ru/shindo-life/resources' },
              { text: `${SVG_ISSUES} Проблемы Shindo Life`, link: '/ru/shindo-life/issues' },
              { text: `${SVG_GUIDE} Гайд`,                  link: '/ru/shindo-life/guide'  },
              { text: `${SVG_TIPS} Советы и фишки`,         link: '/ru/shindo-life/tips'   },
              { text: `${SVG_FAQ} FAQ`,                        link: '/ru/shindo-life/faq'    },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: `${SVG_RES} Ресурсы`,          link: '/ru/rell-seas/resources' },
              { text: `${SVG_GUIDE} Гайд`,          link: '/ru/rell-seas/guide' },
              { text: `${SVG_TIPS} Советы и фишки`, link: '/ru/rell-seas/tips'  },
              { text: `${SVG_FAQ} FAQ`,                link: '/ru/rell-seas/faq'   },
            ],
          },
        ],
        sidebar:              sidebarRu,
        outline:              { level: [2, 3], label: 'На этой странице' },
        returnToTopLabel:     '↑ Наверх',
        sidebarMenuLabel:     'Меню',
        darkModeSwitchLabel:  'Тема',
        lightModeSwitchTitle: 'Светлая тема',
        darkModeSwitchTitle:  'Тёмная тема',
        langMenuLabel:        'Change language',
        externalLinkIcon:     true,
        notFound: {
          title:     '🐸 Страница не найдена',
          quote:     'Похоже, эта страница потерялась в тумане войны. Жаба тоже не знает где она.',
          linkLabel: 'На главную',
          linkText:  '← Вернуться на главную',
          code:      '404',
        },
        docFooter:   { prev: '← Предыдущая', next: 'Следующая →' },
        lastUpdated: { text: 'Обновлено', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Редактировать на GitHub' },
        footer:      { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
      },
    },

    zh: {
      label: '中文', lang: 'zh-CN', link: '/zh/',
      title: 'RELL Games Docs', titleTemplate: ':title · Hametsu Konran',
      description: 'RELL Games 游戏攻略、评级列表与机制说明，由 Hametsu Konran 制作',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}zh/` }],
        ['meta', { property: 'og:locale',      content: 'zh_CN' }],
        ['meta', { property: 'og:title',       content: 'Hametsu Konran Docs' }],
        ['meta', { property: 'og:description', content: '所有游戏的攻略、机制与技巧' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 首页', link: '/zh/' },
          { text: `${SVG_ABOUT} 关于`, link: '/zh/about' },
          { text: '⚔️ Shindo Life 2', items: [
              { text: `${SVG_RES} 资源`,                link: '/zh/shindo-life/resources' },
              { text: `${SVG_ISSUES} Shindo Life 问题`, link: '/zh/shindo-life/issues' },
              { text: `${SVG_GUIDE} 攻略`,              link: '/zh/shindo-life/guide'  },
              { text: `${SVG_TIPS} 技巧与窍门`,         link: '/zh/shindo-life/tips'   },
              { text: `${SVG_FAQ} FAQ`,                  link: '/zh/shindo-life/faq'    },
          ]},
          { text: '🌊 Rell Seas', items: [
              { text: `${SVG_RES} 资源`,        link: '/zh/rell-seas/resources' },
              { text: `${SVG_GUIDE} 攻略`,      link: '/zh/rell-seas/guide' },
              { text: `${SVG_TIPS} 技巧与窍门`, link: '/zh/rell-seas/tips'  },
              { text: `${SVG_FAQ} FAQ`,          link: '/zh/rell-seas/faq'   },
          ]},
        ],
        sidebar: sidebarZh,
        outline: { level: [2, 3], label: '本页目录' },
        returnToTopLabel: '↑ 返回顶部', sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题', lightModeSwitchTitle: '切换至浅色主题', darkModeSwitchTitle: '切换至深色主题',
        langMenuLabel: 'Change language', externalLinkIcon: true,
        notFound: { title: '🐸 页面未找到', quote: '看来这个页面在战争迷雾中迷失了。连青蛙也不知道它在哪里。', linkLabel: '回到首页', linkText: '← 返回首页', code: '404' },
        docFooter: { prev: '← 上一页', next: '下一页 →' },
        lastUpdated: { text: '更新于', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink: { pattern: EDIT_LINK, text: '在 GitHub 上编辑此页' },
        footer: { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
      },
    },

    ko: {
      label: '한국어', lang: 'ko-KR', link: '/ko/',
      title: 'RELL Games Docs', titleTemplate: ':title · Hametsu Konran',
      description: 'Hametsu Konran이 제작한 RELL Games 가이드, 티어 리스트 및 게임 메커니즘',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}ko/` }],
        ['meta', { property: 'og:locale',      content: 'ko_KR' }],
        ['meta', { property: 'og:title',       content: 'Hametsu Konran Docs' }],
        ['meta', { property: 'og:description', content: '모든 게임 가이드 및 메커니즘' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 홈', link: '/ko/' },
          { text: `${SVG_ABOUT} 소개`, link: '/ko/about' },
          { text: '⚔️ Shindo Life 2', items: [
              { text: `${SVG_RES} 리소스`,              link: '/ko/shindo-life/resources' },
              { text: `${SVG_ISSUES} Shindo Life 이슈`, link: '/ko/shindo-life/issues' },
              { text: `${SVG_GUIDE} 가이드`,            link: '/ko/shindo-life/guide'  },
              { text: `${SVG_TIPS} 팁 & 트릭`,          link: '/ko/shindo-life/tips'   },
              { text: `${SVG_FAQ} FAQ`,              link: '/ko/shindo-life/faq'    },
          ]},
          { text: '🌊 Rell Seas', items: [
              { text: `${SVG_RES} 리소스`,     link: '/ko/rell-seas/resources' },
              { text: `${SVG_GUIDE} 가이드`,   link: '/ko/rell-seas/guide' },
              { text: `${SVG_TIPS} 팁 & 트릭`, link: '/ko/rell-seas/tips'  },
              { text: `${SVG_FAQ} FAQ`,          link: '/ko/rell-seas/faq'   },
          ]},
        ],
        sidebar: sidebarKo,
        outline: { level: [2, 3], label: '이 페이지에서' },
        returnToTopLabel: '↑ 맨 위로', sidebarMenuLabel: '메뉴',
        darkModeSwitchLabel: '테마', lightModeSwitchTitle: '라이트 테마로 전환', darkModeSwitchTitle: '다크 테마로 전환',
        langMenuLabel: 'Change language', externalLinkIcon: true,
        notFound: { title: '🐸 페이지를 찾을 수 없음', quote: '이 페이지는 전쟁의 안개 속에서 길을 잃은 것 같습니다. 개구리도 어디 있는지 모릅니다.', linkLabel: '홈으로 이동', linkText: '← 홈으로 돌아가기', code: '404' },
        docFooter: { prev: '← 이전', next: '다음 →' },
        lastUpdated: { text: '업데이트됨', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink: { pattern: EDIT_LINK, text: 'GitHub에서 이 페이지 편집' },
        footer: { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
      },
    },

    ja: {
      label: '日本語', lang: 'ja-JP', link: '/ja/',
      title: 'RELL Games Docs', titleTemplate: ':title · Hametsu Konran',
      description: 'Hametsu KonranによるRELL Gamesのガイド、ティアリスト、ゲームメカニクス解説',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}ja/` }],
        ['meta', { property: 'og:locale',      content: 'ja_JP' }],
        ['meta', { property: 'og:title',       content: 'Hametsu Konran Docs' }],
        ['meta', { property: 'og:description', content: 'すべてのゲームのガイドとメカニクスをHametsu Konranが解説' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 ホーム', link: '/ja/' },
          { text: `${SVG_ABOUT} このサイトについて`, link: '/ja/about' },
          { text: '⚔️ Shindo Life 2', items: [
              { text: `${SVG_RES} リソース`,            link: '/ja/shindo-life/resources' },
              { text: `${SVG_ISSUES} 既知の問題`,       link: '/ja/shindo-life/issues' },
              { text: `${SVG_GUIDE} ガイド`,            link: '/ja/shindo-life/guide'  },
              { text: `${SVG_TIPS} ヒント＆テクニック`, link: '/ja/shindo-life/tips'   },
              { text: `${SVG_FAQ} FAQ`,             link: '/ja/shindo-life/faq'    },
          ]},
          { text: '🌊 Rell Seas', items: [
              { text: `${SVG_RES} リソース`,            link: '/ja/rell-seas/resources' },
              { text: `${SVG_GUIDE} ガイド`,            link: '/ja/rell-seas/guide' },
              { text: `${SVG_TIPS} ヒント＆テクニック`, link: '/ja/rell-seas/tips'  },
              { text: `${SVG_FAQ} FAQ`,             link: '/ja/rell-seas/faq'   },
          ]},
        ],
        sidebar: sidebarJa,
        outline: { level: [2, 3], label: 'このページの内容' },
        returnToTopLabel: '↑ トップへ戻る', sidebarMenuLabel: 'メニュー',
        darkModeSwitchLabel: 'テーマ', lightModeSwitchTitle: 'ライトテーマに切り替え', darkModeSwitchTitle: 'ダークテーマに切り替え',
        langMenuLabel: 'Change language', externalLinkIcon: true,
        notFound: { title: '🐸 ページが見つかりません', quote: 'このページは戦争の霧の中で迷子になったようです。カエルもどこにあるか知りません。', linkLabel: 'ホームへ移動', linkText: '← ホームへ戻る', code: '404' },
        docFooter: { prev: '← 前へ', next: '次へ →' },
        lastUpdated: { text: '更新日', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink: { pattern: EDIT_LINK, text: 'GitHubでこのページを編集' },
        footer: { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
      },
    },
  },
})
