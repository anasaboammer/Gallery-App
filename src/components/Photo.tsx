import { useId, useMemo } from 'react'
import { mulberry32 } from '../utils/random'

/*
 * Generated landscape "photos" so the page needs no image assets.
 * Each kind has its own palette; the seed varies the ridges, sun position and details.
 */

export type SceneKind = 'sunset' | 'beach' | 'mountains' | 'forest' | 'snow' | 'night' | 'desert' | 'lake'

type Shape =
  | { type: 'path'; d: string; fill: string; o?: number }
  | { type: 'circle'; cx: number; cy: number; r: number; fill: string; o?: number }

const SKY: Record<SceneKind, [string, string]> = {
  sunset: ['#5b4bc4', '#ffb070'],
  beach: ['#3f9be8', '#c8ecff'],
  mountains: ['#5aa6ee', '#dff1ff'],
  forest: ['#8fd0b4', '#eefaf3'],
  snow: ['#a9c7ea', '#f3f8fd'],
  night: ['#0d1533', '#3a3f7a'],
  desert: ['#f39a54', '#fde6c4'],
  lake: ['#7fbcf7', '#eaf5ff'],
}

const f = (n: number) => n.toFixed(1)

/* Jagged ridge: alternating peaks and saddles across the frame. */
function peaks(rnd: () => number, w: number, base: number, amp: number, n: number) {
  let d = `M0,100 L0,${f(base - rnd() * amp * 0.4)}`
  const step = w / (n * 2)
  for (let i = 1; i <= n * 2; i++) {
    const x = i * step + (i < n * 2 ? (rnd() - 0.5) * step * 0.6 : 0)
    const y = i % 2 ? base - amp * (0.55 + rnd() * 0.45) : base - rnd() * amp * 0.35
    d += ` L${f(x)},${f(y)}`
  }
  return `${d} L${w},100 Z`
}

/* Rolling hills: a smooth curve through random heights. */
function hills(rnd: () => number, w: number, base: number, amp: number, n: number) {
  const pts = Array.from({ length: n + 1 }, (_, i) => [(i / n) * w, base - rnd() * amp])
  let d = `M0,100 L0,${f(pts[0][1])}`
  for (let i = 0; i < n; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const mx = (x0 + x1) / 2
    d += ` C${f(mx)},${f(y0)} ${f(mx)},${f(y1)} ${f(x1)},${f(y1)}`
  }
  return `${d} L${w},100 Z`
}

function band(w: number, y: number, h: number) {
  return `M0,${f(y)} H${w} V${f(y + h)} H0 Z`
}

function tree(x: number, base: number, h: number) {
  const half = h * 0.28
  return `M${f(x - half)},${f(base)} L${f(x)},${f(base - h)} L${f(x + half)},${f(base)} Z`
}

function buildScene(kind: SceneKind, seed: number, w: number): Shape[] {
  const rnd = mulberry32(seed * 9973 + kind.charCodeAt(0) * 131 + kind.length)
  const out: Shape[] = []
  const path = (d: string, fill: string, o?: number) => out.push({ type: 'path', d, fill, o })
  const circle = (cx: number, cy: number, r: number, fill: string, o?: number) =>
    out.push({ type: 'circle', cx, cy, r, fill, o })
  const sunX = w * (0.2 + rnd() * 0.6)

  switch (kind) {
    case 'sunset':
      circle(sunX, 58, 16, '#ffd9a0', 0.35)
      circle(sunX, 58, 9, '#ffe7b8')
      path(peaks(rnd, w, 64, 18, 5), '#b0609a')
      path(hills(rnd, w, 76, 10, 4), '#6f3f80')
      path(hills(rnd, w, 88, 6, 3), '#3a2552')
      break
    case 'beach':
      circle(sunX, 22, 7, '#fff6c4')
      circle(w * 0.3 + rnd() * w * 0.4, 30, 5, '#ffffff', 0.7)
      path(band(w, 56, 44), '#2a8fd6')
      path(band(w, 56, 3), '#1f78bd')
      path(band(w, 66, 1), '#ffffff', 0.35)
      path(band(w, 72, 1.2), '#ffffff', 0.3)
      path(hills(rnd, w, 80, 6, 3), '#f2d39a')
      path(hills(rnd, w, 91, 4, 3), '#e6c283')
      break
    case 'mountains':
      circle(sunX, 20, 6, '#fff8d6')
      path(peaks(rnd, w, 54, 26, 4), '#a8b7d0')
      path(peaks(rnd, w, 66, 18, 5), '#7686a6')
      path(hills(rnd, w, 76, 8, 4), '#5f9a6a')
      path(hills(rnd, w, 88, 5, 3), '#3f7a4c')
      break
    case 'forest': {
      path(hills(rnd, w, 54, 10, 4), '#86bfa0')
      const count = Math.round(w / 9)
      for (let i = 0; i < count; i++) {
        path(tree(i * 9 + rnd() * 5, 80, 18 + rnd() * 14), '#2f7a52')
      }
      path(hills(rnd, w, 82, 5, 3), '#245f40')
      for (let i = 0; i < count / 2; i++) {
        path(tree(i * 18 + rnd() * 8, 98, 26 + rnd() * 12), '#1a4a32')
      }
      break
    }
    case 'snow':
      circle(sunX, 22, 6, '#ffffff', 0.9)
      path(peaks(rnd, w, 58, 28, 4), '#c9d7ea')
      path(peaks(rnd, w, 70, 16, 5), '#e6eef8')
      path(hills(rnd, w, 84, 6, 3), '#ffffff')
      for (let i = 0; i < 5; i++) {
        path(tree(w * (0.1 + rnd() * 0.8), 92 + rnd() * 4, 10 + rnd() * 8), '#2e5a4a')
      }
      break
    case 'night':
      for (let i = 0; i < 22; i++) {
        circle(rnd() * w, rnd() * 52, 0.3 + rnd() * 0.5, '#ffffff', 0.4 + rnd() * 0.6)
      }
      circle(sunX, 22, 13, '#f6f1cf', 0.12)
      circle(sunX, 22, 6, '#f6f1cf')
      path(peaks(rnd, w, 64, 18, 5), '#2b3170')
      path(hills(rnd, w, 78, 8, 4), '#1c2152')
      path(hills(rnd, w, 90, 4, 3), '#11143a')
      break
    case 'desert':
      circle(sunX, 28, 9, '#fff0c2')
      path(hills(rnd, w, 62, 8, 3), '#eba467')
      path(hills(rnd, w, 74, 10, 3), '#dc8648')
      path(hills(rnd, w, 88, 8, 3), '#c06a32')
      break
    case 'lake':
      circle(sunX, 20, 6, '#fff5cc')
      path(peaks(rnd, w, 50, 18, 5), '#7d97bf')
      path(hills(rnd, w, 58, 5, 5), '#4d7f5e')
      path(band(w, 58, 42), '#5b9bd1')
      path(band(w, 58, 1), '#ffffff', 0.45)
      path(band(w, 66, 0.8), '#ffffff', 0.25)
      path(band(w, 74, 0.8), '#ffffff', 0.2)
      path(hills(rnd, w, 90, 4, 3), '#3e6b4c')
      break
  }
  return out
}

type Props = {
  kind: SceneKind
  seed?: number
  /** Wide frame (about 16:9) instead of square. */
  wide?: boolean
  className?: string
}

export function Photo({ kind, seed = 1, wide = false, className = '' }: Props) {
  const gradientId = `sky-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const w = wide ? 176 : 100
  const shapes = useMemo(() => buildScene(kind, seed, w), [kind, seed, w])
  const [top, bottom] = SKY[kind]

  return (
    <svg
      className={`photo ${className}`}
      viewBox={`0 0 ${w} 100`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width={w} height="100" fill={`url(#${gradientId})`} />
      {shapes.map((s, i) =>
        s.type === 'path' ? (
          <path key={i} d={s.d} fill={s.fill} opacity={s.o} />
        ) : (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.o} />
        ),
      )}
    </svg>
  )
}
