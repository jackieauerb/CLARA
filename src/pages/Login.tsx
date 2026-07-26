import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { DEMO_USERS } from '../types'
import '../css/login.css'

const CREDENTIALS: Record<string, string> = {
  'maya@astermedical.com': 'demo123',
  'emily@northvalleymed.org': 'demo123',
  'lena@summitregional.com': 'demo123',
  'jordan@summitregional.com': 'demo123',
  'priya@summitregional.com': 'demo123',
  'marcus@summitregional.com': 'demo123',
  'elena@summitregional.com': 'demo123',
}

const USER_IDS: Record<string, string> = {
  'maya@astermedical.com': 'maya-chen',
  'emily@northvalleymed.org': 'emily-carter',
  'lena@summitregional.com': 'lena-ortiz',
  'jordan@summitregional.com': 'jordan-lee',
  'priya@summitregional.com': 'priya-shah',
  'marcus@summitregional.com': 'marcus-reed',
  'elena@summitregional.com': 'elena-vasquez',
}

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const navigationTimer = useRef<number | null>(null)

  const orgType = searchParams.get('type') || 'hospital'
  const isHospital = orgType === 'hospital'

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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

  const goToWorkspace = (destination: string) => {
    setIsLeaving(true)

    navigationTimer.current = window.setTimeout(() => {
      navigate(destination)
    }, 260)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (isLeaving) return

    setError('')

    const normalizedEmail = email.trim().toLowerCase()
    const expectedPassword = CREDENTIALS[normalizedEmail]

    if (
      !expectedPassword ||
      expectedPassword !== password
    ) {
      setError('Incorrect email or password.')
      return
    }

    const userId = USER_IDS[normalizedEmail]

    const user = DEMO_USERS.find(
      (demoUser) => demoUser.id === userId
    )

    if (!user) {
      setError('Unable to locate this account.')
      return
    }

    localStorage.setItem('currentUser', user.id)

    goToWorkspace(
      user.id === 'maya-chen'
        ? '/manufacturer-dashboard'
        : '/hospital'
    )
  }

  const fillDemoCredentials = () => {
    setError('')

    setEmail(
      isHospital
        ? 'emily@northvalleymed.org'
        : 'maya@astermedical.com'
    )

    setPassword('demo123')
  }

  return (
    <main
      className={[
        'login-page',
        isLoaded ? 'login-page--loaded' : '',
        isLeaving ? 'login-page--leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="login-glow login-glow-left" />
      <div className="login-glow login-glow-right" />

      <svg
        className="login-orbit login-orbit-top"
        viewBox="0 0 900 260"
        aria-hidden="true"
      >
        <path d="M-40 245C220 250 565 180 760-25" />
        <circle cx="515" cy="96" r="5" />
      </svg>

      <svg
        className="login-orbit login-orbit-bottom"
        viewBox="0 0 720 520"
        aria-hidden="true"
      >
        <path d="M15 530C220 480 470 400 720 140" />
        <path d="M430 540C485 390 560 240 720 120" />
        <circle cx="526" cy="305" r="5" />
      </svg>

      <Link className="login-back" to="/">
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </Link>

      <section
        className="login-panel"
        aria-labelledby="login-title"
      >
        <header className="login-heading">
        <h1 id="login-title">
          {isHospital
            ? 'Hospital access'
            : 'Device company access'}
        </h1>
      </header>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <label className="login-field">
            <span>Email</span>

            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
              }}
              placeholder="name@organization.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>

            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          <p
            className={[
              'login-error',
              error ? 'login-error--visible' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role="alert"
            aria-live="polite"
          >
            {error || '\u00A0'}
          </p>

          <button
            className="login-submit"
            type="submit"
            disabled={isLeaving}
          >
            {isLeaving ? 'Opening…' : 'Sign In'}
          </button>
        </form>

        <button
          type="button"
          className="login-demo"
          onClick={fillDemoCredentials}
        >
          Use demo credentials
        </button>
      </section>
    </main>
  )
}