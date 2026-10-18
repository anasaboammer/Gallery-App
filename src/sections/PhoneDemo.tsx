import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { Icon } from '../components/Icon'
import { Photo, type SceneKind } from '../components/Photo'
import { hero, phone as copy } from '../content'
import './PhoneDemo.css'

type Shot = { kind: SceneKind; seed: number }

const LIBRARY: Shot[] = [
  { kind: 'sunset', seed: 1 },
  { kind: 'beach', seed: 2 },
  { kind: 'forest', seed: 3 },
  { kind: 'mountains', seed: 4 },
  { kind: 'night', seed: 5 },
  { kind: 'lake', seed: 6 },
  { kind: 'desert', seed: 7 },
  { kind: 'snow', seed: 8 },
  { kind: 'beach', seed: 9 },
  { kind: 'mountains', seed: 10 },
  { kind: 'sunset', seed: 11 },
  { kind: 'forest', seed: 12 },
  { kind: 'snow', seed: 13 },
  { kind: 'lake', seed: 14 },
  { kind: 'night', seed: 15 },
  { kind: 'desert', seed: 16 },
]

const SWIPE = 40

type Direction = 'open' | 'next' | 'prev'

function Phone({ children, className = '', inert }: { children: ReactNode; className?: string; inert?: boolean }) {
  return (
    <div className={`phone ${className}`} inert={inert}>
      <div className="phone__screen">{children}</div>
      <div className="phone__notch" aria-hidden="true" />
    </div>
  )
}

function LibraryScreen({
  hidden,
  favorites,
  onOpen,
  tileRefs,
}: {
  hidden: boolean
  favorites: Set<number>
  onOpen: (i: number) => void
  tileRefs: { current: (HTMLButtonElement | null)[] }
}) {
  return (
    <div className="library" inert={hidden}>
      <div className="library__header">
        <span className="library__title">{copy.libraryTitle}</span>
        <span className="library__icon" aria-hidden="true">
          <Icon name="search" size={18} />
        </span>
      </div>
      <div className="library__sub">{copy.librarySub}</div>
      <div className="library__grid">
        {LIBRARY.map((shot, i) => (
          <button
            key={i}
            type="button"
            className="thumb"
            style={{ '--i': i } as CSSProperties}
            onClick={() => onOpen(i)}
            aria-label={`Open photo ${i + 1}${favorites.has(i) ? ', favourite' : ''}`}
            ref={(el) => {
              tileRefs.current[i] = el
            }}
          >
            <Photo kind={shot.kind} seed={shot.seed} />
            {favorites.has(i) && (
              <span className="thumb__fav" aria-hidden="true">
                <Icon name="heart" size={10} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="library__memory">
        <span className="library__memoryThumb">
          <Photo kind="beach" seed={21} />
        </span>
        <div>
          <strong>{copy.memoryTitle}</strong>
          <span>{copy.memorySub}</span>
        </div>
      </div>
    </div>
  )
}

function Viewer({
  index,
  open,
  dir,
  favorite,
  onClose,
  onGo,
  onToggleFavorite,
  backRef,
}: {
  index: number
  open: boolean
  dir: Direction
  favorite: boolean
  onClose?: () => void
  onGo?: (i: number, dir: Direction) => void
  onToggleFavorite?: () => void
  backRef?: Ref<HTMLButtonElement>
}) {
  const startX = useRef<number | null>(null)
  const shot = LIBRARY[index]
  const last = LIBRARY.length - 1

  const prev = () => index > 0 && onGo?.(index - 1, 'prev')
  const next = () => index < last && onGo?.(index + 1, 'next')

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (dx <= -SWIPE) next()
    else if (dx >= SWIPE) prev()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'Escape') onClose?.()
    else return
    e.preventDefault()
  }

  return (
    <div
      className={open ? 'viewer is-open' : 'viewer'}
      inert={!open}
      role="dialog"
      aria-label={`Photo ${index + 1} of ${LIBRARY.length}`}
      onKeyDown={onKeyDown}
    >
      <div className="viewer__bar">
        <button type="button" className="viewer__btn" onClick={onClose} aria-label="Back to library" ref={backRef}>
          <Icon name="chevron-left" size={20} />
        </button>
        <span className="viewer__count">
          {index + 1} / {LIBRARY.length}
        </span>
        <button
          type="button"
          className={favorite ? 'viewer__btn viewer__fav is-on' : 'viewer__btn viewer__fav'}
          onClick={onToggleFavorite}
          aria-label="Favourite"
          aria-pressed={favorite}
        >
          <Icon name="heart" size={19} />
        </button>
      </div>

      <div
        className="viewer__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        <div key={index} className={`viewer__photo viewer__photo--${dir}`}>
          <Photo kind={shot.kind} seed={shot.seed} />
        </div>
        <button
          type="button"
          className="viewer__nav viewer__nav--prev"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous photo"
        >
          <Icon name="chevron-left" size={18} />
        </button>
        <button
          type="button"
          className="viewer__nav viewer__nav--next"
          onClick={next}
          disabled={index === last}
          aria-label="Next photo"
        >
          <Icon name="chevron-right" size={18} />
        </button>
      </div>

      <div className="viewer__strip" aria-hidden="true">
        <div className="viewer__track" style={{ '--i': index } as CSSProperties}>
          {LIBRARY.map((s, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              className={i === index ? 'viewer__thumb is-active' : 'viewer__thumb'}
              onClick={() => i !== index && onGo?.(i, i > index ? 'next' : 'prev')}
            >
              <Photo kind={s.kind} seed={s.seed} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PhoneDemo() {
  const [open, setOpen] = useState<number | null>(null)
  const [shown, setShown] = useState(0)
  const [dir, setDir] = useState<Direction>('open')
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set([0, 10]))
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([])
  const backRef = useRef<HTMLButtonElement>(null)
  const prevOpen = useRef<number | null>(null)

  const go = (i: number, d: Direction) => {
    setDir(d)
    setShown(i)
    setOpen(i)
  }
  const close = () => setOpen(null)
  const toggleFavorite = () =>
    setFavorites((f) => {
      const next = new Set(f)
      if (next.has(shown)) next.delete(shown)
      else next.add(shown)
      return next
    })

  // Move focus into the viewer when it opens and back to the photo's tile when it closes.
  useEffect(() => {
    if (open !== null && prevOpen.current === null) backRef.current?.focus({ preventScroll: true })
    if (open === null && prevOpen.current !== null) tileRefs.current[prevOpen.current]?.focus({ preventScroll: true })
    prevOpen.current = open
  }, [open])

  return (
    <div className="demo">
      <div className="demo__phones">
        {/* Desktop only: a second phone behind, already showing a photo full screen. */}
        <Phone className="demo__back" inert>
          <Viewer index={10} open dir="open" favorite />
        </Phone>

        <Phone className="demo__front">
          <LibraryScreen hidden={open !== null} favorites={favorites} onOpen={(i) => go(i, 'open')} tileRefs={tileRefs} />
          <Viewer
            index={shown}
            open={open !== null}
            dir={dir}
            favorite={favorites.has(shown)}
            onClose={close}
            onGo={go}
            onToggleFavorite={toggleFavorite}
            backRef={backRef}
          />
        </Phone>
      </div>
      <p className="demo__hint">{hero.hint}</p>
    </div>
  )
}
