import { AUDIO_SRC, BASE_PATH } from '../site.config'

const POS_KEY = 'mp-pos'

type Labels = { idle: string; playing: string; play: string; pause: string }

const LABELS: Record<string, Labels> = {
  ru: { idle: 'Фоновая музыка',   playing: 'Играет...',   play: 'Играть', pause: 'Пауза' },
  zh: { idle: '背景音乐',          playing: '播放中...',   play: '播放',   pause: '暂停' },
  ko: { idle: '배경 음악',         playing: '재생 중...', play: '재생',   pause: '일시정지' },
  ja: { idle: 'BGM',               playing: '再生中...',   play: '再生',   pause: '一時停止' },
  en: { idle: 'Background music',  playing: 'Playing...',  play: 'Play',   pause: 'Pause' },
}

function getLocale(): string {
  const path = window.location.pathname
  const rel  = path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) : path.replace(/^\//, '')
  const seg  = rel.split('/')[0]
  return seg in LABELS ? seg : 'en'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function setupMusicPlayer(): void {
  if (document.getElementById('mp-root')) return

  const audio   = new Audio(AUDIO_SRC)
  audio.loop    = true
  audio.volume  = 0.5
  audio.preload = 'none'

  let isPlaying = false

  const root = document.createElement('div')
  root.id    = 'mp-root'
  root.innerHTML =
    '<div id="mp-widget">' +
      '<button id="mp-btn" type="button">' +
        '<svg id="mp-icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<polygon points="5,3 19,12 5,21"/>' +
        '</svg>' +
        '<span id="mp-icon-bars" style="display:none" class="mp-bars" aria-hidden="true">' +
          '<span></span><span></span><span></span><span></span>' +
        '</span>' +
      '</button>' +
      '<div class="mp-info">' +
        '<span class="mp-title">Zerofuturism</span>' +
        '<span id="mp-sub" class="mp-sub"></span>' +
      '</div>' +
    '</div>'

  document.body.appendChild(root)

  const widget   = document.getElementById('mp-widget')    as HTMLElement
  const btn      = document.getElementById('mp-btn')       as HTMLButtonElement
  const sub      = document.getElementById('mp-sub')       as HTMLSpanElement
  const iconPlay = document.getElementById('mp-icon-play') as HTMLElement
  const iconBars = document.getElementById('mp-icon-bars') as HTMLElement

  try {
    const saved = localStorage.getItem(POS_KEY)
    if (saved) {
      const { left, top } = JSON.parse(saved) as { left: number; top: number }
      root.style.bottom = 'auto'
      root.style.right  = 'auto'
      const w = root.offsetWidth  || 220
      const h = root.offsetHeight || 60
      root.style.left = clamp(left, 0, window.innerWidth  - w) + 'px'
      root.style.top  = clamp(top,  0, window.innerHeight - h) + 'px'
    }
  } catch {}

  function applyLabels(): void {
    const l         = LABELS[getLocale()]
    sub.textContent = isPlaying ? l.playing : l.idle
    const btnLabel  = isPlaying ? l.pause   : l.play
    btn.title       = btnLabel
    btn.setAttribute('aria-label', btnLabel)
  }

  applyLabels()

  function setPlaying(val: boolean): void {
    isPlaying              = val
    iconPlay.style.display = val ? 'none'        : 'block'
    iconBars.style.display = val ? 'inline-flex' : 'none'
    widget.classList.toggle('playing', val)
    applyLabels()
  }

  let dragging = false
  let didDrag  = false
  let startX = 0, startY = 0, origLeft = 0, origTop = 0

  btn.addEventListener('click', () => {
    if (didDrag) return
    if (isPlaying) {
      audio.pause()
      setPlaying(false)
    } else {
      setPlaying(true)
      audio.play().catch(() => setPlaying(false))
    }
  })

  audio.addEventListener('error', () => setPlaying(false))

  function dragStart(clientX: number, clientY: number): void {
    const rect            = root.getBoundingClientRect()
    dragging              = true
    didDrag               = false
    startX                = clientX
    startY                = clientY
    origLeft              = rect.left
    origTop               = rect.top
    root.style.transition = 'none'
    root.style.bottom     = 'auto'
    root.style.right      = 'auto'
    root.style.left       = origLeft + 'px'
    root.style.top        = origTop  + 'px'
    root.classList.add('dragging')
  }

  function dragMove(clientX: number, clientY: number): void {
    if (!dragging) return
    const dx = clientX - startX
    const dy = clientY - startY
    if (!didDrag && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) didDrag = true
    root.style.left = clamp(origLeft + dx, 0, window.innerWidth  - root.offsetWidth)  + 'px'
    root.style.top  = clamp(origTop  + dy, 0, window.innerHeight - root.offsetHeight) + 'px'
  }

  function dragEnd(): void {
    if (!dragging) return
    dragging              = false
    root.style.transition = ''
    root.classList.remove('dragging')
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({
        left: parseFloat(root.style.left),
        top:  parseFloat(root.style.top),
      }))
    } catch {}
    requestAnimationFrame(() => { didDrag = false })
  }

  function onResize(): void {
    const rect = root.getBoundingClientRect()
    root.style.bottom = 'auto'
    root.style.right  = 'auto'
    root.style.left   = clamp(rect.left, 0, window.innerWidth  - root.offsetWidth)  + 'px'
    root.style.top    = clamp(rect.top,  0, window.innerHeight - root.offsetHeight) + 'px'
  }

  widget.addEventListener('mousedown', (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('#mp-btn')) return
    dragStart(e.clientX, e.clientY)
  })

  const onMouseMove = (e: MouseEvent) => dragMove(e.clientX, e.clientY)
  const onMouseUp   = ()              => dragEnd()

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup',   onMouseUp)

  widget.addEventListener('touchstart', (e: TouchEvent) => {
    if ((e.target as HTMLElement).closest('#mp-btn')) return
    dragStart(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: true })

  const onTouchMove = (e: TouchEvent) => {
    if (!dragging) return
    e.preventDefault()
    dragMove(e.touches[0].clientX, e.touches[0].clientY)
  }
  const onTouchEnd = () => dragEnd()

  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend',  onTouchEnd)
  window.addEventListener('resize', onResize, { passive: true })

  const langObserver = new MutationObserver(applyLabels)
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })

  const bodyObserver = new MutationObserver(() => {
    if (document.getElementById('mp-root')) return
    langObserver.disconnect()
    bodyObserver.disconnect()
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup',   onMouseUp)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend',  onTouchEnd)
    window.removeEventListener('resize', onResize)
  })
  bodyObserver.observe(document.body, { childList: true })
}
