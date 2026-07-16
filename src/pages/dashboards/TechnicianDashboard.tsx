import { useState } from 'react'
import { User } from '../../types'
import { useProtocol } from '../../context/ProtocolContext'
import '../../css/app.css'

interface TechnicianDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

export default function TechnicianDashboard({ user, onSwitchUser, onLogout }: TechnicianDashboardProps) {
  const { implementationState, updateImplementationState } = useProtocol()
  const [trainingCompleted, setTrainingCompleted] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)

  return (
    <div className="app">
      <aside className="app__sidebar">
        <div className="app__logo">VERAFY</div>
        <nav className="app__nav">
          <button className="app__nav-item app__nav-item--active">
            My Actions
          </button>
          <button className="app__nav-item">
            Training
          </button>
          <button className="app__nav-item">
            Device Updates
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
          <h1 className="app__title">My Actions</h1>
          <p className="app__subtitle">AC-2026-014: Revised distal-channel cleaning procedure</p>
        </header>

        <section className="section">
          <h2 className="section__title">What Changed</h2>
          <div className="section__content">
            <div className="change-summary">
              <p className="change-summary__label">Previous Step</p>
              <p className="change-summary__value change-summary__value--old">
                Flush the distal channel with approved enzymatic detergent for 30 seconds.
              </p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Updated Step</p>
              <p className="change-summary__value change-summary__value--new">
                Flush the distal channel with approved enzymatic detergent for 90 seconds using the new AsterFlow adapter before automated reprocessing.
              </p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Affected Devices</p>
              <p className="change-summary__value">AsterScope Flex 300 (18 units)</p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Implementation Date</p>
              <p className="change-summary__value">July 22, 2026</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Why You Are Seeing This</h2>
          <div className="section__content">
            <p className="change-summary__value">
              The previous 30-second flush may not consistently remove all residual material from the distal channel. 
              The extended 90-second flush with the AsterFlow adapter ensures the device is completely clean before reprocessing, 
              protecting patient safety.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">What You Need To Do</h2>
          <div className="section__content">
            <div className="action-card">
              <p className="action-card__title">Complete Training</p>
              <p className="action-card__description">
                Updated Cleaning Procedure (5 minutes)
              </p>
              <button 
                className="btn btn--primary"
                onClick={() => {
                  setTrainingCompleted(true)
                  updateImplementationState({ techniciansAcknowledged: implementationState.techniciansAcknowledged + 1 })
                }}
                disabled={trainingCompleted}
              >
                {trainingCompleted ? 'Training Completed' : 'Complete Training'}
              </button>
            </div>

            <div className="action-card">
              <p className="action-card__title">Acknowledge Revised Procedure</p>
              <p className="action-card__description">
                Confirm you understand the revised cleaning procedure
              </p>
              <button 
                className="btn btn--primary"
                onClick={() => setAcknowledged(true)}
                disabled={!trainingCompleted || acknowledged}
              >
                {acknowledged ? 'Acknowledged' : 'I Understand the Revised Procedure'}
              </button>
            </div>

            <div className="change-summary">
              <p className="change-summary__label">Visual Instructions</p>
              <div className="checklist">
                <div className="checklist-item">
                  <div className="checklist-item__checkbox" />
                  <div className="checklist-item__content">
                    <p className="checklist-item__title">Step 1: Connect AsterFlow adapter</p>
                    <p className="checklist-item__meta">Attach the new adapter to the distal channel port</p>
                  </div>
                </div>
                <div className="checklist-item">
                  <div className="checklist-item__checkbox" />
                  <div className="checklist-item__content">
                    <p className="checklist-item__title">Step 2: Flush for 90 seconds</p>
                    <p className="checklist-item__meta">Use enzymatic detergent with the adapter</p>
                  </div>
                </div>
                <div className="checklist-item">
                  <div className="checklist-item__checkbox" />
                  <div className="checklist-item__content">
                    <p className="checklist-item__title">Step 3: Remove adapter and proceed</p>
                    <p className="checklist-item__meta">Continue with standard automated reprocessing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
