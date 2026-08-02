import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Landing.css'

type OrganizationType = 'hospital' | 'company'

export default function Landing() {
  const navigate = useNavigate()
  const navigationTimer = useRef<number | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true)
    })

    return () => {
      cancelAnimationFrame(frame)

      if (navigationTimer.current) {
        window.clearTimeout(navigationTimer.current)
      }
    }
  }, [])

  const openLogin = (type: OrganizationType) => {
    if (isLeaving) return

    setIsLeaving(true)

    navigationTimer.current = window.setTimeout(() => {
      navigate(`/login?type=${type}`)
    }, 320)
  }

  return (
    <main
      className={[
        'landing-page',
        isLoaded ? 'landing-page--loaded' : '',
        isLeaving ? 'landing-page--leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <svg
        className="orbit orbit-top"
        viewBox="0 0 900 260"
        aria-hidden="true"
      >
        <path d="M-40 245C220 250 565 180 760-25" />
        <circle cx="515" cy="96" r="5" />
      </svg>

      <svg
        className="orbit orbit-bottom"
        viewBox="0 0 720 520"
        aria-hidden="true"
      >
        <path d="M15 530C220 480 470 400 720 140" />
        <path d="M430 540C485 390 560 240 720 120" />
        <circle cx="526" cy="305" r="5" />
      </svg>

      <section className="hero" aria-labelledby="clara-title">
        <h1 id="clara-title" className="brand">
          <span>CLARA</span>
          <span className="brand-plus">+</span>
        </h1>

        <p className="tagline">
          MEDICAL DEVICE MAINTENANCE. <span>CLARIFIED.</span>
        </p>

        <div
          className="role-picker"
          aria-label="Choose account type"
        >
          <button
            className="role-button"
            type="button"
            disabled={isLeaving}
            onClick={() => openLogin('hospital')}
          >
            Hospital
          </button>

          <button
            className="role-button role-button-primary"
            type="button"
            disabled={isLeaving}
            onClick={() => openLogin('company')}
          >
            Device Company
          </button>
        </div>
      </section>

      <nav className="bottom-nav" aria-label="Primary">
        <a href="#devices">DEVICES</a>
        <span aria-hidden="true" />
        <a href="#updates">UPDATES</a>
        <span aria-hidden="true" />
        <a href="#clarity">CLARITY</a>
      </nav>
    </main>
  )
}