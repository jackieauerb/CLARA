import { User } from '../../types'
import { useProtocol } from '../../context/ProtocolContext'
import '../../css/app.css'

interface EducatorDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

export default function EducatorDashboard({ user, onSwitchUser, onLogout }: EducatorDashboardProps) {
  const { implementationState } = useProtocol()

  const technicians = [
    { name: 'Marcus Reed', status: 'completed', completedDate: 'July 16, 2026' },
    { name: 'Sarah Kim', status: 'completed', completedDate: 'July 16, 2026' },
    { name: 'James Wilson', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Emily Brown', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Michael Davis', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Lisa Johnson', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Robert Taylor', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Jennifer Martinez', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'David Anderson', status: 'completed', completedDate: 'July 17, 2026' },
    { name: 'Amanda White', status: 'pending', completedDate: null },
    { name: 'Christopher Lee', status: 'pending', completedDate: null },
    { name: 'Jessica Garcia', status: 'pending', completedDate: null },
    { name: 'Daniel Thompson', status: 'pending', completedDate: null },
    { name: 'Michelle Robinson', status: 'overdue', completedDate: null },
  ]

  return (
    <div className="app">
      <aside className="app__sidebar">
        <div className="app__logo">VERAFY</div>
        <nav className="app__nav">
          <button className="app__nav-item app__nav-item--active">
            Overview
          </button>
          <button className="app__nav-item">
            My Actions
          </button>
          <button className="app__nav-item">
            Device Changes
          </button>
        </nav>
        <div className="app__user-section">
          <div className="app__user-info" onClick={onSwitchUser}>
            <div className="app__user-avatar">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="app__user-details">
              <p className="app__user-name">{user.name}</p>
              <p className="app__user-role">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="app__main">
        <header className="app__header">
          <h1 className="app__title">Clinical Education</h1>
          <p className="app__subtitle">AC-2026-014: Revised distal-channel cleaning procedure</p>
        </header>

        <section className="section">
          <h2 className="section__title">What Changed</h2>
          <div className="section__content">
            <div className="change-summary">
              <p className="change-summary__value">
                The distal channel cleaning procedure has been updated from a 30-second flush to a 90-second flush using the new AsterFlow adapter. 
                This change ensures complete removal of residual material before automated reprocessing.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Why You Are Seeing This</h2>
          <div className="section__content">
            <p className="change-summary__value">
              14 technicians require training on the new protocol before the next affected procedures. Training cannot begin until the SPM workflow is updated.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">What You Need To Do</h2>
          <div className="section__content">
            <div className="change-summary">
              <p className="change-summary__label">Training Progress</p>
              <div className="progress">
                <div className="progress__bar">
                  <div className="progress__fill" style={{ width: `${(implementationState.techniciansAcknowledged / 14) * 100}%` }} />
                </div>
                <p className="progress__label">{implementationState.techniciansAcknowledged} of 14 technicians completed</p>
              </div>
            </div>

            <div className="action-card">
              <p className="action-card__title">Training Module</p>
              <p className="action-card__description">
                AsterScope Flex 300: Updated Cleaning Protocol (5 minutes)
              </p>
              <div className="dashboard__actions">
                <button className="btn btn--secondary">Preview Training</button>
                <button className="btn btn--outline">Send Reminder</button>
                <button className="btn btn--primary">View Completion</button>
              </div>
            </div>

            <div className="change-summary">
              <p className="change-summary__label">Technician Status</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians.map((tech, index) => (
                    <tr key={index}>
                      <td>{tech.name}</td>
                      <td>
                        <span className={`badge ${tech.status === 'completed' ? 'badge--low' : tech.status === 'pending' ? 'badge--medium' : 'badge--high'}`}>
                          {tech.status}
                        </span>
                      </td>
                      <td>{tech.completedDate || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
