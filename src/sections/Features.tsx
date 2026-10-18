import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Photo, type SceneKind } from '../components/Photo'
import { features } from '../content'
import { useInterval } from '../hooks/useInterval'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Features.css'

/* Every match sits in the first six thumbnails, which are the ones visible on mobile. */
const THUMBS: { kind: SceneKind; seed: number }[] = [
  { kind: 'sunset', seed: 31 },
  { kind: 'beach', seed: 32 },
  { kind: 'snow', seed: 33 },
  { kind: 'sunset', seed: 34 },
  { kind: 'forest', seed: 35 },
  { kind: 'night', seed: 36 },
  { kind: 'mountains', seed: 37 },
  { kind: 'lake', seed: 38 },
]

const QUERIES: { text: string; kind: SceneKind }[] = [
  { text: 'sunset', kind: 'sunset' },
  { text: 'beach', kind: 'beach' },
  { text: 'snow', kind: 'snow' },
  { text: 'night sky', kind: 'night' },
  { text: 'forest', kind: 'forest' },
]

const TYPE_MS = 110
/* Ticks to hold the results on screen before the next query. */
const HOLD = 20

/* "Live search": types a query, then highlights the photos that match. */
function SearchDemo() {
  const reduced = useReducedMotion()
  const [qi, setQi] = useState(0)
  const [step, setStep] = useState(() => (reduced ? QUERIES[0].text.length : 0))
  const query = QUERIES[qi]
  const done = step >= query.text.length

  useInterval(
    () => {
      if (step >= query.text.length + HOLD) {
        setQi((i) => (i + 1) % QUERIES.length)
        setStep(0)
      } else {
        setStep((s) => s + 1)
      }
    },
    reduced ? null : TYPE_MS,
  )

  const matches = THUMBS.filter((t) => t.kind === query.kind).length

  return (
    <div className={done ? 'search is-done' : 'search'} aria-hidden="true">
      <div className="search__bar">
        <Icon name="search" size={16} />
        <span className="search__q">{query.text.slice(0, step)}</span>
        <span className="search__caret" />
        <span className="search__count">{done ? `${matches} ${matches === 1 ? 'photo' : 'photos'}` : ''}</span>
      </div>
      <div className="search__grid">
        {THUMBS.map((t, i) => (
          <span key={i} className={t.kind === query.kind ? 'search__thumb is-match' : 'search__thumb'}>
            <Photo kind={t.kind} seed={t.seed} />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section__header features__header">
          <h2 className="section__title">{features.title}</h2>
          <p className="section__sub">{features.subtitle}</p>
        </div>

        <div className="bento">
          <article className="tile-card tile-card--search" style={{ gridArea: 'search' }}>
            <div className="tile-card__icon">
              <Icon name={features.search.icon} size={21} />
            </div>
            <h3 className="tile-card__title">{features.search.title}</h3>
            <p className="tile-card__desc">{features.search.desc}</p>
            <SearchDemo />
          </article>

          {features.tiles.map((tile) => (
            <article key={tile.area} className="tile-card" style={{ gridArea: tile.area }}>
              <div className="tile-card__icon">
                <Icon name={tile.icon} size={21} />
              </div>
              <h3 className="tile-card__title">{tile.title}</h3>
              <p className="tile-card__desc">{tile.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
