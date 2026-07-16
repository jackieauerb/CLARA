import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEMO_USERS, User } from '../types'
import QualityDashboard from '../pages/dashboards/QualityDashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const userId = localStorage.getItem('currentUser')

    if (!userId) {
      navigate('/login')
      return
    }

    const user = DEMO_USERS.find((demoUser) => demoUser.id === userId)

    if (!user) {
      localStorage.removeItem('currentUser')
      navigate('/login')
      return
    }

    if (user.type === 'manufacturer') {
      navigate('/manufacturer-dashboard')
      return
    }

    setCurrentUser(user)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login?type=hospital')
  }

  if (!currentUser) {
    return null
  }

  if (
    currentUser.id === 'emily-carter' ||
    currentUser.id === 'elena-vasquez'
  ) {
    return (
      <QualityDashboard
        user={currentUser}
        onSwitchUser={() => undefined}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6f2] px-6 text-[#15201c]">
      <div className="max-w-lg text-center">
        <p className="text-sm text-black/45">Signed in as</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
          {currentUser.name}
        </h1>

        <p className="mt-4 text-black/55">
          This role-specific view will be connected next.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 rounded-xl bg-[#15201c] px-5 py-3 text-sm font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    </main>
  )
}