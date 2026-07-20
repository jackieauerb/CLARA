import { useState } from 'react'
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

  const orgType = searchParams.get('type') || 'hospital'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setError('')

    const normalizedEmail = email.trim().toLowerCase()
    const validPassword = CREDENTIALS[normalizedEmail]

    if (!validPassword || validPassword !== password) {
      setError('Invalid credentials')
      return
    }

    const userId = USER_IDS[normalizedEmail]

    const user = DEMO_USERS.find(
      (demoUser) => demoUser.id === userId
    )

    if (!user) {
      setError('User profile could not be found')
      return
    }

    localStorage.setItem('currentUser', user.id)

    if (user.id === 'maya-chen') {
      navigate('/manufacturer-dashboard')
      return
    }

    navigate('/hospital')
  }

  const isHospital = orgType === 'hospital'

  return (
    <main className="login">
      <div
        className="login__wash"
        aria-hidden="true"
      />

      <Link
        to="/"
        aria-label="Return to organization selection"
        style={{
          position: 'fixed',
          top: '28px',
          left: '32px',
          zIndex: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(21, 32, 28, 0.55)',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
          transition:
            'color 180ms ease, transform 180ms ease',
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.color = '#15201c'
          event.currentTarget.style.transform =
            'translateX(-2px)'
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.color =
            'rgba(21, 32, 28, 0.55)'
          event.currentTarget.style.transform =
            'translateX(0)'
        }}
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </Link>

      <section className="login__hero">
        <h1 className="wordmark">
          VERAFY
          <span
            style={{
              color: '#4f7cff',
              fontSize: '0.72em',
              position: 'relative',
              top: '-0.18em',
              marginLeft: '2px',
            }}
          >
            +
          </span>
        </h1>

        <p className="login__statement">
          {isHospital
            ? 'HOSPITAL LOGIN'
            : 'MEDICAL DEVICE COMPANY LOGIN'}
        </p>

        <form
          className="login__form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="login__error">
              {error}
            </div>
          )}

          <div className="login__field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="login__field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="login__submit"
          >
            Sign In
          </button>
        </form>

        <div className="login__demo-hint">
          <p>Demo credentials:</p>

          {isHospital ? (
            <p>
              emily@northvalleymed.org / demo123
            </p>
          ) : (
            <p>
              maya@astermedical.com / demo123
            </p>
          )}
        </div>
      </section>
    </main>
  )
}