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
import { DEMO_ACCOUNTS, DEMO_USERS } from '../data/users'
import '../css/login.css'


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
    }, 300)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (isLeaving) return

    setError('')

    const normalizedEmail = email.trim().toLowerCase()

    const account = DEMO_ACCOUNTS.find(
      (demoAccount) => demoAccount.email === normalizedEmail
    )

    if (!account || account.password !== password) {
      setError('Incorrect email or password.')
      return
    }

    const user = DEMO_USERS.find(
      (demoUser) => demoUser.id === account.userId
    )

    if (!user) {
      setError('Unable to locate this account.')
      return
    }

    localStorage.setItem('currentUser', user.id)

    if (user.type === 'manufacturer') {
      sessionStorage.setItem('showHospitalWelcome', 'false')
      goToWorkspace('/manufacturer-dashboard')
    } else {
      sessionStorage.setItem('showHospitalWelcome', 'true')
      goToWorkspace('/hospital')
    }
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

      <header className="login-header">

        
        <Link className="login-back" to="/">
          ← Back
        </Link>


      </header>

      <section
        className="login-center"
        aria-labelledby="login-title"
      >
        <header className="login-heading">

          <Link className="login-logo" to="/">
          CLARA<span>+</span>
        </Link>
          

          <p>
            {isHospital
              ? 'HOSPITAL ACCESS'
              : 'DEVICE COMPANY ACCESS'}
          </p>
        </header>

        <br></br>

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
            <span>
              {isLeaving ? 'OPENING' : 'CONTINUE'}
            </span>

            <span aria-hidden="true">→</span>
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