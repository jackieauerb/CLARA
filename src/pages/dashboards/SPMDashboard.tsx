import { User } from '../../types'
import { useProtocol } from '../../context/ProtocolContext'
import '../../css/app.css'

interface SPMDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

export default function SPMDashboard({ user, onSwitchUser, onLogout }: SPMDashboardProps) {
  const { implementationState, updateImplementationState } = useProtocol()

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
          <h1 className="app__title">SPM Workflow Update</h1>
          <p className="app__subtitle">AC-2026-014: Revised distal-channel cleaning procedure</p>
        </header>

        <section className="section">
          <h2 className="section__title">What Changed</h2>
          <div className="section__content">
            <div className="change-summary">
              <p className="change-summary__label">Current Workflow Step</p>
              <p className="change-summary__value change-summary__value--old">
                Flush distal channel: 30 seconds with enzymatic detergent
              </p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Updated Workflow Step</p>
              <p className="change-summary__value change-summary__value--new">
                Flush distal channel: 90 seconds with enzymatic detergent using AsterFlow adapter
              </p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Affected Device Models</p>
              <p className="change-summary__value">AsterScope Flex 300 (18 units)</p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Current Workflow</p>
              <p className="change-summary__value">Endoscope Cleaning (STERIS SPM Guided)</p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Deadline</p>
              <p className="change-summary__value">July 28, 2026</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Why You Are Seeing This</h2>
          <div className="section__content">
            <p className="change-summary__value">
              SPD Director approval is complete. The workflow configuration must be updated to reflect the new 90-second flush protocol with AsterFlow adapter before technician training can begin.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">What You Need To Do</h2>
          <div className="section__content">
            <div className="action-card">
              <p className="action-card__title">Update the guided STERIS SPM workflow</p>
              <p className="action-card__description">
                Change from 30-second flush to 90-second flush and add AsterFlow adapter usage
              </p>
              <button className="btn btn--secondary">Open SPM Integration</button>
            </div>
            <div className="action-card">
              <p className="action-card__title">Mark Workflow Updated</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(17, 17, 17, 0.4)', marginBottom: '8px' }}>
                  Activation Date
                </label>
                <input 
                  type="date" 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid rgba(200, 205, 206, 0.3)', 
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                  defaultValue="2026-07-22"
                />
              </div>
              <button 
                className="btn btn--primary"
                onClick={() => updateImplementationState({ workflowUpdated: true })}
                disabled={implementationState.workflowUpdated}
              >
                {implementationState.workflowUpdated ? 'Workflow Updated' : 'Mark Workflow Updated'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
