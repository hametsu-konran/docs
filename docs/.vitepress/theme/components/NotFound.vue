<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vitepress'
import { useLocale } from '../utils/useLocale'

const router         = useRouter()
const { locale, base } = useLocale()

const STRINGS: Record<string, { title: string; quote: string; back: string }> = {
  ru: { title: '🐸 Страница не найдена',   quote: 'Похоже, эта страница потерялась в тумане войны. Жаба тоже не знает где она.',                             back: '← Вернуться на главную' },
  zh: { title: '🐸 页面未找到',             quote: '看来这个页面在战争迷雾中迷失了。连青蛙也不知道它在哪里。',                                               back: '← 返回首页' },
  ko: { title: '🐸 페이지를 찾을 수 없음', quote: '이 페이지는 전쟁의 안개 속에서 길을 잃은 것 같습니다. 개구리도 어디 있는지 모릅니다.',               back: '← 홈으로 돌아가기' },
  ja: { title: '🐸 ページが見つかりません', quote: 'このページは戦争の霧の中で迷子になったようです。カエルもどこにあるか知りません。',                   back: '← ホームへ戻る' },
  en: { title: '🐸 Page not found',        quote: "Looks like this page got lost in the fog of war. The frog doesn't know where it is either.",              back: '← Back to home' },
}

const s = computed(() => STRINGS[locale.value] ?? STRINGS.en)

function goHome(): void {
  const l = locale.value
  router.go(l !== 'en' ? `${base.value}${l}/` : base.value)
}
</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">{{ s.title }}</h1>
    <div class="divider" />
    <blockquote class="quote">{{ s.quote }}</blockquote>
    <div class="action">
      <button class="link" @click="goHome">{{ s.back }}</button>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding:    64px 24px 96px;
  text-align: center;
}

.code {
  line-height: 64px;
  font-size:   64px;
  font-weight: 600;
}

.title {
  padding-top:    12px;
  letter-spacing: 2px;
  line-height:    20px;
  font-size:      20px;
  font-weight:    700;
}

.divider {
  margin:           24px auto 18px;
  width:            64px;
  height:           1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin:      0 auto;
  max-width:   256px;
  font-size:   14px;
  font-weight: 500;
  color:       var(--vp-c-text-2);
}

.action { padding-top: 20px; }

.link {
  display:         inline-block;
  border:          1px solid var(--vp-c-brand);
  border-radius:   20px;
  padding:         3px 16px;
  font-size:       14px;
  font-weight:     500;
  color:           var(--vp-c-brand);
  background:      transparent;
  cursor:          pointer;
  text-decoration: none;
  transition:      border-color 0.25s, color 0.25s, background-color 0.25s;
}
.link:hover { background: var(--vp-c-brand); color: var(--vp-c-white); }
</style>
