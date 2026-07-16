import { User } from '../../types'
import { useProtocol } from '../../context/ProtocolContext'
import '../../css/app.css'

interface DirectorDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

export default function DirectorDashboard({ user, onSwitchUser, onLogout }: DirectorDashboardProps) {
  const { implementationState, updateImplementationState } = useProtocol()

  const implementationSteps = [
    { title: 'Confirm affected device inventory', completed: implementationState.inventoryConfirmed, owner: 'SPD Director' },
    { title: 'Review and approve revised procedure', completed: implementationState.procedureApproved, owner: 'SPD Director' },
    { title: 'Update STERIS SPM guided workflow', completed: implementationState.workflowUpdated, owner: 'SPM Admin' },
    { title: 'Confirm AsterFlow adapter availability', completed: true, owner: 'SPD Director' },
    { title: 'Assign updated training', completed: implementationState.trainingAssigned, owner: 'Clinical Educator' },
    { title: 'Technician acknowledgment', completed: implementationState.techniciansAcknowledged >= 14, owner: 'All Technicians' },
    { title: 'Verify revised process is active', completed: false, owner: 'SPD Director' },
    { title: 'Submit final confirmation', completed: implementationState.finalConfirmationSubmitted, owner: 'Quality Manager' },
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
          <button className="app__nav-item">
            Team Progress
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
          <h1 className="app__title">Sterile Processing Department</h1>
          <p className="app__subtitle">AC-2026-014: Revised distal-channel cleaning procedure</p>
        </header>

        <section className="section">
          <h2 className="section__title">What Changed</h2>
          <div className="section__content">
            <div className="change-summary">
              <p className="change-summary__label">Previous Protocol</p>
              <p className="change-summary__value change-summary__value--old">
                Flush the distal channel with approved enzymatic detergent for 30 seconds.
              </p>
            </div>
            <div className="change-summary">
              <p className="change-summary__label">Updated Protocol</p>
              <p className="change-summary__value change-summary__value--new">
                Flush the distal channel with approved enzymatic detergent for 90 seconds using the new AsterFlow adapter before automated reprocessing.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Why You Are Seeing This</h2>
          <div className="section__content">
            <p className="change-summary__value">
              Internal validation found that the previous 30-second flush may not consistently remove residual material from the distal channel. 
              The extended 90-second flush with the AsterFlow adapter ensures complete cleaning before automated reprocessing.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">What You Need To Do</h2>
          <div className="section__content">
            <div className="action-card">
              <p className="action-card__title">Review and approve the revised cleaning procedure</p>
              <p className="action-card__description">
                18 affected devices, 14 affected technicians, 11 upcoming procedures
              </p>
              <button 
                className="btn btn--primary"
                onClick={() => updateImplementationState({ procedureApproved: true })}
                disabled={implementationState.procedureApproved}
              >
                {implementationState.procedureApproved ? 'Approved' : 'Approve Procedure'}
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Department Implementation Plan</h2>
          <div className="section__content">
            <div className="checklist">
              {implementationSteps.map((step, index) => (
                <div key={index} className="checklist-item">
                  <div 
                    className={`checklist-item__checkbox ${step.completed ? 'checklist-item__checkbox--checked' : ''}`}
                    onClick={() => {
                      if (step.owner === 'SPD Director' && !step.completed) {
                        if (step.title.includes('procedure')) {
                          updateImplementationState({ procedureApproved: true })
                        } else if (step.title.includes('workflow')) {
                          updateImplementationState({ workflowUpdated: true })
                        }
                      }
                    }}
                  />
                  <div className="checklist-item__content">
                    <p className="checklist-item__title">{step.title}</p>
                    <p className="checklist-item__meta">Owner: {step.owner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
