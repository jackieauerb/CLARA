import { useEffect, useState } from 'react'
import { User } from '../../types'

interface QualityDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

const IMPLEMENTATION_STEPS = [
  {
    title: 'Confirm affected inventory',
    owner: 'Clinical Engineering',
    status: 'Not assigned',
  },
  {
    title: 'Approve revised cleaning procedure',
    owner: 'Sterile Processing',
    status: 'Not assigned',
  },
  {
    title: 'Update the STERIS SPM workflow',
    owner: 'SPM Administrator',
    status: 'Not assigned',
  },
  {
    title: 'Confirm AsterFlow adapter availability',
    owner: 'Supply Chain',
    status: 'Not assigned',
  },
  {
    title: 'Assign updated training to 11 technicians',
    owner: 'Clinical Education',
    status: 'Not assigned',
  },
  {
    title: 'Verify implementation and submit confirmation',
    owner: 'Quality and Risk',
    status: 'Waiting',
  },
]

export default function QualityDashboard({
  user,
  onLogout,
}: QualityDashboardProps) {
  const isEmily = user.id === 'emily-carter'

  const [showWelcome, setShowWelcome] = useState(true)
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false)

  const [acknowledged, setAcknowledged] = useState(!isEmily)

  useEffect(() => {
    const showTextTimer = window.setTimeout(() => {
      setWelcomeTextVisible(true)
    }, 50)

    const fadeTextTimer = window.setTimeout(() => {
      setWelcomeTextVisible(false)
    }, 1350)

    const removeWelcomeTimer = window.setTimeout(() => {
      setShowWelcome(false)
    }, 2050)

    return () => {
      window.clearTimeout(showTextTimer)
      window.clearTimeout(fadeTextTimer)
      window.clearTimeout(removeWelcomeTimer)
    }
  }, [])

  const acknowledgeChange = () => {
  setAcknowledged(true)
}

  return (
    <div className="min-h-screen bg-[#f4f6f2] text-[#15201c]">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f6f2]">
          <div
            className={`px-6 text-center transition-all duration-700 ${
              welcomeTextVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
          >
            <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Welcome back, {user.name.split(' ')[0]}.
            </h1>

            <p className="mt-5 text-sm text-black/45">
              Retrieving your required protocol actions
            </p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f4f6f2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-5 md:px-10">
          <button
            type="button"
            className="text-xl font-semibold tracking-[-0.04em]"
          >
            VERAFY<span className="text-[#4F7CFF]">+</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.name}</p>

              <p className="text-xs text-black/45">
                {user.role} · {user.organization}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15201c] text-xs font-semibold text-white">
              {user.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition hover:border-black"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1300px] px-6 py-12 md:px-10 md:py-16">
        <section className="mb-12">
          <p className="text-sm font-medium text-black/45">
            North Valley Medical Center
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            {acknowledged
              ? 'Implementation can now begin.'
              : 'One protocol change requires your acknowledgment.'}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-black/55">
            {acknowledged
              ? 'The change has been acknowledged. Coordinate the required actions across your hospital and confirm completion back to Aster Medical Devices.'
              : 'Review what changed and acknowledge receipt so the correct hospital teams can begin implementation.'}
          </p>
        </section>

        <section
          className={`overflow-hidden rounded-[30px] border bg-white ${
            acknowledged ? 'border-[#b8d1c2]' : 'border-[#dfcfaa]'
          }`}
        >
          <div
            className={`h-1.5 w-full ${
              acknowledged ? 'bg-[#789d8b]' : 'bg-[#b4964e]'
            }`}
          />

          <div className="p-7 md:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      acknowledged
                        ? 'border-[#b8d1c2] bg-[#e7f1eb] text-[#315b45]'
                        : 'border-[#dfcfaa] bg-[#f5efe1] text-[#765f28]'
                    }`}
                  >
                    {acknowledged ? 'Acknowledged' : 'Action required'}
                  </span>

                  <span className="rounded-full border border-[#dfbcb6] bg-[#f5e8e6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7b4038]">
                    High priority
                  </span>
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-black/40">
                  AC-2026-014 · Aster Medical Devices
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                  AsterScope Flex 300
                </h2>

                <p className="mt-2 text-lg text-black/55">
                  Revised distal-channel cleaning procedure
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-[#f4f6f2] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.1em] text-black/40">
                  Implementation deadline
                </p>

                <p className="mt-2 text-lg font-semibold">July 28, 2026</p>
              </div>
            </div>

            <div className="mt-9 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-[#f7f8f6] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/40">
                  Previous procedure
                </p>

                <p className="mt-4 leading-7 text-black/60">
                  Flush the distal channel with approved enzymatic detergent
                  for 30 seconds.
                </p>
              </div>

              <div className="rounded-2xl border border-[#b8d1c2] bg-[#edf5f0] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#466856]">
                  Revised procedure
                </p>

                <p className="mt-4 font-medium leading-7">
                  Flush the distal channel for 90 seconds using the new
                  AsterFlow adapter before automated reprocessing.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/40">
                Why this changed
              </p>

              <p className="mt-4 max-w-4xl leading-7 text-black/60">
                Manufacturer validation found that the previous 30-second flush
                may not consistently remove residual material from the distal
                channel.
              </p>
            </div>

            {!acknowledged && (
              <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl bg-[#15201c] p-6 text-white md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold">
                    Your first required action
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                    Confirm that North Valley Medical Center received this
                    change. Acknowledgment does not certify implementation; it
                    begins the hospital’s implementation process.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={acknowledgeChange}
                  className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#15201c] transition hover:bg-[#edf2ef]"
                >
                  Review and acknowledge
                </button>
              </div>
            )}
          </div>
        </section>

        {acknowledged && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                Required implementation plan
              </h2>

              <p className="mt-2 text-sm text-black/50">
                Verafy has translated the manufacturer change into
                responsibilities for each affected hospital team.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {IMPLEMENTATION_STEPS.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[22px] border border-black/10 bg-white p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf2ef] text-xs font-semibold text-[#456052]">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{step.title}</p>

                      <p className="mt-2 text-sm text-black/45">
                        Owner: {step.owner}
                      </p>

                      <span className="mt-4 inline-flex rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/40">
                        {step.status}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-black/10 bg-white p-7">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold">
                    Hospital implementation status
                  </p>

                  <p className="mt-2 text-sm text-black/50">
                    Acknowledged. Inventory verification and internal task
                    assignment are now required.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-40 overflow-hidden rounded-full bg-black/10">
                    <div className="h-full w-[12%] rounded-full bg-[#789d8b]" />
                  </div>

                  <span className="text-sm font-semibold">12%</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}