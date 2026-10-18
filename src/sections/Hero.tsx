import type { CSSProperties } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { hero } from '../content'
import { PhoneDemo } from './PhoneDemo'
import './Hero.css'

/* Headline words come into focus one after another, like a photo developing. */
function FocusHeadline({ text }: { text: string }) {
  let w = 0
  return (
    <h1 className="hero__title">
      {text.split('\n').map((line, li) => (
        <span key={li} className="hero__line">
          {line.split(' ').map((word, wi) => (
            <span key={wi}>
              {wi > 0 && ' '}
              <span className="hero__word" style={{ '--w': w++ } as CSSProperties}>
                {word}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <FocusHeadline text={hero.headline} />
          <p className="hero__sub">{hero.subheadline}</p>
          <div className="hero__ctas">
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="hero__trust">
            {hero.trust.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <PhoneDemo />
      </div>
    </section>
  )
}
