import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Icon } from '../components/Icon'
import { Photo, type SceneKind } from '../components/Photo'
import { edit } from '../content'
import './Edit.css'

type Grade = { filter: string; tint?: string; tintOpacity?: number }

/* The flat, slightly dull look of the photo as it came off the camera. */
const ORIGINAL: Grade = { filter: 'saturate(0.6) contrast(0.88) brightness(0.94)' }

const GRADES: Record<string, Grade> = {
  vivid: { filter: 'saturate(1.4) contrast(1.08)' },
  warm: { filter: 'saturate(1.2) brightness(1.03)', tint: '#ff9a3c', tintOpacity: 0.45 },
  cool: { filter: 'saturate(1.1) brightness(1.03)', tint: '#3d7bff', tintOpacity: 0.45 },
  mono: { filter: 'grayscale(1) contrast(1.15)' },
  fade: { filter: 'contrast(0.8) brightness(1.1) saturate(0.75)', tint: '#fff4e6', tintOpacity: 0.3 },
}

const SCENE: { kind: SceneKind; seed: number } = { kind: 'lake', seed: 4 }

/* A photo with a colour grade applied: a CSS filter plus an optional soft-light tint. */
function Graded({ grade, wide = false }: { grade: Grade; wide?: boolean }) {
  return (
    <div className="graded" style={{ filter: grade.filter }}>
      <Photo kind={SCENE.kind} seed={SCENE.seed} wide={wide} />
      {grade.tint && (
        <span className="graded__tint" style={{ background: grade.tint, opacity: grade.tintOpacity }} />
      )}
    </div>
  )
}

function LookPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div className="looks" role="group" aria-label={edit.labels.looks}>
      {edit.looks.map((look) => (
        <button
          key={look.id}
          type="button"
          className="look"
          aria-pressed={value === look.id}
          onClick={() => onChange(look.id)}
        >
          <span className="look__swatch" aria-hidden="true">
            <Graded grade={GRADES[look.id]} />
          </span>
          <span>{look.label}</span>
        </button>
      ))}
    </div>
  )
}

const START = 50

/* Draggable before/after slider: the original on the left, the chosen look on the right. */
function CompareSlider({ look }: { look: string }) {
  const [pos, setPos] = useState(START)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const lookLabel = edit.looks.find((l) => l.id === look)?.label ?? ''

  const update = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, next)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    update(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX)
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="compare"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="compare__layer">
        <Graded grade={GRADES[look]} wide />
      </div>
      <div className="compare__layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Graded grade={ORIGINAL} wide />
      </div>
      <div className="compare__line" style={{ left: `${pos}%` }} aria-hidden="true" />
      <div
        className="compare__knob"
        role="slider"
        tabIndex={0}
        aria-label={`Compare the original with the ${lookLabel} look`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        style={{ left: `${pos}%` }}
        onKeyDown={onKeyDown}
      >
        <Icon name="arrows-horizontal" size={20} />
      </div>
      <span className="compare__pill compare__pill--l">{edit.labels.before}</span>
      <span className="compare__pill compare__pill--r">{lookLabel}</span>
    </div>
  )
}

export function Edit() {
  const [look, setLook] = useState(edit.looks[0].id)

  return (
    <section className="section edit" id="edit">
      <div className="container edit__grid">
        <div className="section__header edit__header">
          <h2 className="section__title">{edit.title}</h2>
          <p className="section__sub">{edit.subtitle}</p>
        </div>

        <LookPicker value={look} onChange={setLook} />
        <CompareSlider look={look} />

        <ul className="edit__points">
          {edit.points.map((point) => (
            <li key={point.text}>
              <Icon name={point.icon} size={20} />
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
