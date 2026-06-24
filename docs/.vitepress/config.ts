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

const SOCIAL_LINKS: DefaultTheme.SocialLink[] = [
  { icon: 'github',   link: GITHUB_REPO_URL },
  { icon: 'discord',  link: DISCORD_URL },
  { icon: 'telegram', link: TELEGRAM_URL },
]

const CC_ICONS = ['cc', 'by', 'nc', 'sa']
  .map(f => `<img src="https://mirrors.creativecommons.org/presskit/icons/${f}.svg" alt="${f.toUpperCase()}" width="18" height="18">`)
  .join('')

const FOOTER_MESSAGE =
  '<a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>' +
  ' &nbsp;·&nbsp; ' +
  '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>' +
  ` <span class="footer-cc-icons">${CC_ICONS}</span>`

const DARK_THEME_SCRIPT =
  `(function(){try{var k='vitepress-theme-appearance';` +
  `if(!localStorage.getItem(k))localStorage.setItem(k,'dark');}catch(e){}})()`

const SHARED_HEAD = [
  ['script', {}, DARK_THEME_SCRIPT],
  ['link',   { rel: 'icon', href: `${BASE_PATH}logo.png` }],
  ['meta',   { name: 'theme-color', content: '#0d0d0d' }],
  ['meta',   { property: 'og:image', content: `${FULL_URL}logo.png` }],
  ['meta',   { property: 'og:type',  content: 'website' }],
] as [string, Record<string, string>, string?][]

const DEFAULT_LOGO = {
  dark:  '/logo.png',
  light: '/logo2.png',
} satisfies DefaultTheme.ThemeableImage

const SHARED_THEME = {
  logo:             DEFAULT_LOGO,
  siteTitle:        'Hametsu Konran',
  socialLinks:      SOCIAL_LINKS,
  langMenuLabel:    'Change language',
  externalLinkIcon: true,
  footer:           { message: FOOTER_MESSAGE, copyright: 'Hametsu Konran Docs © 2024–2026' },
}

const SEARCH: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    miniSearch: { searchOptions: { fuzzy: 0.2, prefix: true } },
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
    locales: {
      ru: { translations: {
        button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
        modal: {
          displayDetails:   'Подробный список',
          resetButtonTitle: 'Сбросить',
          backButtonTitle:  'Закрыть',
          noResultsText:    'Ничего не найдено по запросу',
          footer: { selectText: 'Выбрать', navigateText: 'Навигация', closeText: 'Закрыть' },
        },
      }},
      zh: { translations: {
        button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
        modal: {
          displayDetails:   '显示详细列表',
          resetButtonTitle: '重置',
          backButtonTitle:  '关闭',
          noResultsText:    '未找到相关结果',
          footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' },
        },
      }},
      ko: { translations: {
        button: { buttonText: '검색', buttonAriaLabel: '검색' },
        modal: {
          displayDetails:   '자세한 목록 표시',
          resetButtonTitle: '초기화',
          backButtonTitle:  '닫기',
          noResultsText:    '검색 결과 없음',
          footer: { selectText: '선택', navigateText: '탐색', closeText: '닫기' },
        },
      }},
      ja: { translations: {
        button: { buttonText: '検索', buttonAriaLabel: '検索' },
        modal: {
          displayDetails:   '詳細リストを表示',
          resetButtonTitle: 'リセット',
          backButtonTitle:  '閉じる',
          noResultsText:    '検索結果が見つかりません',
          footer: { selectText: '選択', navigateText: 'ナビゲート', closeText: '閉じる' },
        },
      }},
    },
  },
}

const SVG_ABOUT  = '<span class="sb-icon sb-icon-about"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg></span>'
const SVG_ISSUES = '<span class="sb-icon sb-icon-issues"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.17 12l-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83 19.78 22.61l1.41-1.41L2.81 2.81 1.39 4.22z"/></svg></span>'
const SVG_GUIDE  = '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span>'
const SVG_RES    = '<span class="sb-icon sb-icon-res"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg></span>'
const SVG_FAQ    = '<span class="sb-icon sb-icon-faq"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg></span>'
const SVG_TIPS   = '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span>'

type LocaleStrings = {
  pinned:    string
  homeNav:   string
  about:     string
  resources: string
  issues:    string
  guide:     string
  tips:      string
  soon:      string
  active:    string
  read:      string
  important: string
}

const strings = {
  en: {
    pinned: '📌 Pinned',    homeNav: '🏠 Home',      about: 'About',
    resources: 'Resources', issues: 'Shindo Life Issues', guide: 'Guide', tips: 'Tips & Tricks',
    soon: 'Soon', active: 'Active', read: 'Read', important: 'Important',
  },
  ru: {
    pinned: '📌 Закреплено', homeNav: '🏠 Главная',   about: 'О проекте',
    resources: 'Ресурсы',   issues: 'Проблемы Shindo Life', guide: 'Гайд', tips: 'Советы и фишки',
    soon: 'Скоро', active: 'Актуально', read: 'Читать', important: 'Важно',
  },
  zh: {
    pinned: '📌 置顶',  homeNav: '🏠 首页', about: '关于',
    resources: '资源', issues: 'Shindo Life 问题', guide: '攻略', tips: '技巧与窍门',
    soon: '即将', active: '活跃', read: '阅读', important: '重要',
  },
  ko: {
    pinned: '📌 고정됨',   homeNav: '🏠 홈',  about: '소개',
    resources: '리소스', issues: 'Shindo Life 이슈', guide: '가이드', tips: '팁 & 트릭',
    soon: '곧', active: '활성', read: '읽기', important: '중요',
  },
  ja: {
    pinned: '📌 ピン留め', homeNav: '🏠 ホーム', about: 'このサイトについて',
    resources: 'リソース', issues: '既知の問題', guide: 'ガイド', tips: 'ヒント＆テクニック',
    soon: '近日', active: '対応中', read: '読む', important: '重要',
  },
} satisfies Record<string, LocaleStrings>

function buildSidebar(prefix: string, t: LocaleStrings): DefaultTheme.Sidebar {
  const href = (path: string) => prefix ? `${prefix}/${path}` : `/${path}`
  return [
    { text: t.pinned, collapsed: false, items: [
      { text: `${SVG_ABOUT} ${t.about}`, link: href('about') },
    ]},
    { text: '⚔️ Shindo Life 2', collapsed: false, items: [
      { text: `${SVG_RES} ${t.resources}`, link: href('shindo-life/resources'), badge: { type: 'info',    text: t.soon      } },
      { text: `${SVG_ISSUES} ${t.issues}`, link: href('shindo-life/issues'),   badge: { type: 'danger',  text: t.active    } },
      { text: `${SVG_GUIDE} ${t.guide}`,   link: href('shindo-life/guide'),    badge: { type: 'tip',     text: t.read      } },
      { text: `${SVG_TIPS} ${t.tips}`,     link: href('shindo-life/tips'),     badge: { type: 'warning', text: t.important } },
      { text: `${SVG_FAQ} FAQ`,            link: href('shindo-life/faq'),      badge: { type: 'info',    text: t.soon      } },
    ]},
    { text: '🌊 Rell Seas', collapsed: false, items: [
      { text: `${SVG_RES} ${t.resources}`, link: href('rell-seas/resources'),  badge: { type: 'info', text: t.soon } },
      { text: `${SVG_GUIDE} ${t.guide}`,   link: href('rell-seas/guide'),      badge: { type: 'tip',  text: t.soon } },
      { text: `${SVG_TIPS} ${t.tips}`,     link: href('rell-seas/tips'),       badge: { type: 'info', text: t.soon } },
      { text: `${SVG_FAQ} FAQ`,            link: href('rell-seas/faq'),        badge: { type: 'info', text: t.soon } },
    ]},
  ]
}

function buildNav(prefix: string, t: LocaleStrings): DefaultTheme.NavItem[] {
  const href = (path: string) => prefix ? `${prefix}/${path}` : `/${path}`
  return [
    { text: t.homeNav, link: prefix ? `${prefix}/` : '/' },
    { text: `${SVG_ABOUT} ${t.about}`, link: href('about') },
    { text: '⚔️ Shindo Life 2', items: [
      { text: `${SVG_RES} ${t.resources}`, link: href('shindo-life/resources') },
      { text: `${SVG_ISSUES} ${t.issues}`, link: href('shindo-life/issues') },
      { text: `${SVG_GUIDE} ${t.guide}`,   link: href('shindo-life/guide') },
      { text: `${SVG_TIPS} ${t.tips}`,     link: href('shindo-life/tips') },
      { text: `${SVG_FAQ} FAQ`,            link: href('shindo-life/faq') },
    ]},
    { text: '🌊 Rell Seas', items: [
      { text: `${SVG_RES} ${t.resources}`, link: href('rell-seas/resources') },
      { text: `${SVG_GUIDE} ${t.guide}`,   link: href('rell-seas/guide') },
      { text: `${SVG_TIPS} ${t.tips}`,     link: href('rell-seas/tips') },
      { text: `${SVG_FAQ} FAQ`,            link: href('rell-seas/faq') },
    ]},
  ]
}

export default defineConfig({
  base:        BASE_PATH,
  cleanUrls:   true,
  lastUpdated: true,

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

  sitemap: {
    hostname:       SITE_HOSTNAME,
    transformItems: items => items.filter(item =>
      !['ru/', 'zh/', 'ko/', 'ja/'].some(p => item.url.startsWith(p))
    ),
  },

  markdown: {
    lineNumbers:  true,
    image: { lazyLoading: true },
  },

  themeConfig: {
    search: SEARCH,
  },

  locales: {
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
        nav:                  buildNav('', strings.en),
        sidebar:              buildSidebar('', strings.en),
        outline:              { level: [2, 3], label: 'On this page' },
        returnToTopLabel:     '↑ Back to top',
        sidebarMenuLabel:     'Menu',
        darkModeSwitchLabel:  'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle:  'Switch to dark theme',
        docFooter:   { prev: '← Previous', next: 'Next →' },
        lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Edit this page on GitHub' },
      },
    },

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
        nav:                  buildNav('/ru', strings.ru),
        sidebar:              buildSidebar('/ru', strings.ru),
        outline:              { level: [2, 3], label: 'На этой странице' },
        returnToTopLabel:     '↑ Наверх',
        sidebarMenuLabel:     'Меню',
        darkModeSwitchLabel:  'Тема',
        lightModeSwitchTitle: 'Светлая тема',
        darkModeSwitchTitle:  'Тёмная тема',
        docFooter:   { prev: '← Предыдущая', next: 'Следующая →' },
        lastUpdated: { text: 'Обновлено', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Редактировать на GitHub' },
      },
    },

    zh: {
      label:         '中文',
      lang:          'zh-CN',
      link:          '/zh/',
      title:         'Hametsu Konran Docs',
      titleTemplate: ':title · Hametsu Konran',
      description:   'RELL Games 游戏攻略、评级列表与机制说明，由 Hametsu Konran 制作',
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
        nav:                  buildNav('/zh', strings.zh),
        sidebar:              buildSidebar('/zh', strings.zh),
        outline:              { level: [2, 3], label: '本页目录' },
        returnToTopLabel:     '↑ 返回顶部',
        sidebarMenuLabel:     '菜单',
        darkModeSwitchLabel:  '主题',
        lightModeSwitchTitle: '切换至浅色主题',
        darkModeSwitchTitle:  '切换至深色主题',
        docFooter:   { prev: '← 上一页', next: '下一页 →' },
        lastUpdated: { text: '更新于', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: '在 GitHub 上编辑此页' },
      },
    },

    ko: {
      label:         '한국어',
      lang:          'ko-KR',
      link:          '/ko/',
      title:         'Hametsu Konran Docs',
      titleTemplate: ':title · Hametsu Konran',
      description:   'Hametsu Konran이 제작한 RELL Games 가이드, 티어 리스트 및 게임 메커니즘',
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
        nav:                  buildNav('/ko', strings.ko),
        sidebar:              buildSidebar('/ko', strings.ko),
        outline:              { level: [2, 3], label: '이 페이지에서' },
        returnToTopLabel:     '↑ 맨 위로',
        sidebarMenuLabel:     '메뉴',
        darkModeSwitchLabel:  '테마',
        lightModeSwitchTitle: '라이트 테마로 전환',
        darkModeSwitchTitle:  '다크 테마로 전환',
        docFooter:   { prev: '← 이전', next: '다음 →' },
        lastUpdated: { text: '업데이트됨', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'GitHub에서 이 페이지 편집' },
      },
    },

    ja: {
      label:         '日本語',
      lang:          'ja-JP',
      link:          '/ja/',
      title:         'Hametsu Konran Docs',
      titleTemplate: ':title · Hametsu Konran',
      description:   'Hametsu KonranによるRELL Gamesのガイド、ティアリスト、ゲームメカニクス解説',
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
        nav:                  buildNav('/ja', strings.ja),
        sidebar:              buildSidebar('/ja', strings.ja),
        outline:              { level: [2, 3], label: 'このページの内容' },
        returnToTopLabel:     '↑ トップへ戻る',
        sidebarMenuLabel:     'メニュー',
        darkModeSwitchLabel:  'テーマ',
        lightModeSwitchTitle: 'ライトテーマに切り替え',
        darkModeSwitchTitle:  'ダークテーマに切り替え',
        docFooter:   { prev: '← 前へ', next: '次へ →' },
        lastUpdated: { text: '更新日', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'GitHubでこのページを編集' },
      },
    },
  },
})
