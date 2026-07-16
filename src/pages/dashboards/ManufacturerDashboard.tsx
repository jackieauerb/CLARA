import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type HospitalStatus =
  | 'Implemented'
  | 'In progress'
  | 'Not acknowledged'
  | 'Blocked'

interface HospitalAdoption {
  id: number
  hospital: string
  location: string
  contactName: string
  contactRole: string
  contactEmail: string
  acknowledged: boolean
  inventoryVerified: boolean
  workflowUpdated: boolean
  trainingCompleted: number
  trainingRequired: number
  finalConfirmation: boolean
  status: HospitalStatus
  lastActivity: string
  blocker?: string
}

interface ProtocolChange {
  id: number
  device: string
  title: string
  changeId: string
  issuedDate: string
  deadline: string
  priority: 'High' | 'Medium' | 'Low'
  summary: string
  hospitals: HospitalAdoption[]
}

interface ProtocolMetrics {
  total: number
  acknowledged: number
  implemented: number
  needsAttention: number
  acknowledgementRate: number
  implementationRate: number
}

const protocolChanges: ProtocolChange[] = [
  {
    id: 1,
    device: 'AsterScope Flex 300',
    title: 'Revised distal-channel cleaning procedure',
    changeId: 'AC-2026-014',
    issuedDate: 'July 14, 2026',
    deadline: 'July 28, 2026',
    priority: 'High',
    summary:
      'The distal-channel flush increased from 30 seconds to 90 seconds and now requires the AsterFlow adapter before automated reprocessing.',
    hospitals: [
      {
        id: 1,
        hospital: 'Summit Regional Hospital',
        location: 'Denver, Colorado',
        contactName: 'Dr. Lena Ortiz',
        contactRole: 'Director of Sterile Processing',
        contactEmail: 'lena@summitregional.com',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 9,
        trainingRequired: 14,
        finalConfirmation: false,
        status: 'In progress',
        lastActivity: 'Training reminder sent two hours ago',
      },
      {
        id: 2,
        hospital: 'North Valley Medical Center',
        location: 'Fort Collins, Colorado',
        contactName: 'Emily Carter',
        contactRole: 'Quality and Risk Manager',
        contactEmail: 'ecarter@northvalleymed.org',
        acknowledged: false,
        inventoryVerified: false,
        workflowUpdated: false,
        trainingCompleted: 0,
        trainingRequired: 11,
        finalConfirmation: false,
        status: 'Not acknowledged',
        lastActivity: 'Notice delivered July 14',
      },
      {
        id: 3,
        hospital: 'St. Anne Surgical Center',
        location: 'Boulder, Colorado',
        contactName: 'Daniel Kim',
        contactRole: 'Clinical Engineering Manager',
        contactEmail: 'dkim@stannesurgical.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: false,
        trainingCompleted: 4,
        trainingRequired: 8,
        finalConfirmation: false,
        status: 'Blocked',
        lastActivity: 'Workflow update assigned yesterday',
        blocker: 'Waiting for delivery of AsterFlow adapters',
      },
      {
        id: 4,
        hospital: 'Mercy Plains Hospital',
        location: 'Colorado Springs, Colorado',
        contactName: 'Rachel Nguyen',
        contactRole: 'Quality Director',
        contactEmail: 'rnguyen@mercyplains.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 16,
        trainingRequired: 16,
        finalConfirmation: true,
        status: 'Implemented',
        lastActivity: 'Implementation confirmed July 18',
      },
    ],
  },
  {
    id: 2,
    device: 'Infusion Pump X500',
    title: 'Updated occlusion-alarm response',
    changeId: 'IP-2026-008',
    issuedDate: 'July 8, 2026',
    deadline: 'July 25, 2026',
    priority: 'Medium',
    summary:
      'The response sequence now requires a tubing inspection before restarting the pump following an occlusion alarm.',
    hospitals: [
      {
        id: 1,
        hospital: 'Summit Regional Hospital',
        location: 'Denver, Colorado',
        contactName: 'Elena Vasquez',
        contactRole: 'Quality and Risk Manager',
        contactEmail: 'elena@summitregional.com',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 20,
        trainingRequired: 24,
        finalConfirmation: false,
        status: 'In progress',
        lastActivity: 'Four training assignments remain',
      },
      {
        id: 2,
        hospital: 'Mercy Plains Hospital',
        location: 'Colorado Springs, Colorado',
        contactName: 'Rachel Nguyen',
        contactRole: 'Quality Director',
        contactEmail: 'rnguyen@mercyplains.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 18,
        trainingRequired: 18,
        finalConfirmation: true,
        status: 'Implemented',
        lastActivity: 'Implementation confirmed July 16',
      },
      {
        id: 3,
        hospital: 'North Valley Medical Center',
        location: 'Fort Collins, Colorado',
        contactName: 'Emily Carter',
        contactRole: 'Quality and Risk Manager',
        contactEmail: 'ecarter@northvalleymed.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: false,
        trainingCompleted: 0,
        trainingRequired: 13,
        finalConfirmation: false,
        status: 'In progress',
        lastActivity: 'Workflow owner assigned yesterday',
      },
    ],
  },
  {
    id: 3,
    device: 'Patient Monitor V2',
    title: 'Software update and alarm verification',
    changeId: 'PM-2026-003',
    issuedDate: 'June 18, 2026',
    deadline: 'July 10, 2026',
    priority: 'Medium',
    summary:
      'Hospitals installed software version 2.3.1 and verified alarm behavior before returning affected monitors to service.',
    hospitals: [
      {
        id: 1,
        hospital: 'Summit Regional Hospital',
        location: 'Denver, Colorado',
        contactName: 'Elena Vasquez',
        contactRole: 'Quality and Risk Manager',
        contactEmail: 'elena@summitregional.com',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 22,
        trainingRequired: 22,
        finalConfirmation: true,
        status: 'Implemented',
        lastActivity: 'Confirmed July 2',
      },
      {
        id: 2,
        hospital: 'Mercy Plains Hospital',
        location: 'Colorado Springs, Colorado',
        contactName: 'Rachel Nguyen',
        contactRole: 'Quality Director',
        contactEmail: 'rnguyen@mercyplains.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 15,
        trainingRequired: 15,
        finalConfirmation: true,
        status: 'Implemented',
        lastActivity: 'Confirmed July 4',
      },
      {
        id: 3,
        hospital: 'North Valley Medical Center',
        location: 'Fort Collins, Colorado',
        contactName: 'Emily Carter',
        contactRole: 'Quality and Risk Manager',
        contactEmail: 'ecarter@northvalleymed.org',
        acknowledged: true,
        inventoryVerified: true,
        workflowUpdated: true,
        trainingCompleted: 19,
        trainingRequired: 19,
        finalConfirmation: true,
        status: 'Implemented',
        lastActivity: 'Confirmed July 6',
      },
    ],
  },
]

function getMetrics(protocol: ProtocolChange): ProtocolMetrics {
  const total = protocol.hospitals.length

  const acknowledged = protocol.hospitals.filter(
    (hospital) => hospital.acknowledged
  ).length

  const implemented = protocol.hospitals.filter(
    (hospital) => hospital.finalConfirmation
  ).length

  const needsAttention = protocol.hospitals.filter(
    (hospital) =>
      hospital.status === 'Blocked' ||
      hospital.status === 'Not acknowledged'
  ).length

  return {
    total,
    acknowledged,
    implemented,
    needsAttention,
    acknowledgementRate:
      total > 0 ? Math.round((acknowledged / total) * 100) : 0,
    implementationRate:
      total > 0 ? Math.round((implemented / total) * 100) : 0,
  }
}

function getStatusStyles(status: HospitalStatus) {
  switch (status) {
    case 'Implemented':
      return 'border-[#b8d1c2] bg-[#e7f1eb] text-[#315b45]'

    case 'In progress':
      return 'border-[#c4d2cb] bg-[#edf2ef] text-[#456052]'

    case 'Not acknowledged':
      return 'border-[#dfcfaa] bg-[#f5efe1] text-[#765f28]'

    case 'Blocked':
      return 'border-[#dfbcb6] bg-[#f5e8e6] text-[#7b4038]'

    default:
      return 'border-black/10 bg-black/[0.03] text-black/55'
  }
}

function getNextAction(hospital: HospitalAdoption) {
  if (!hospital.acknowledged) {
    return `Contact ${hospital.contactName} to confirm receipt`
  }

  if (!hospital.inventoryVerified) {
    return 'Request affected-device inventory confirmation'
  }

  if (!hospital.workflowUpdated) {
    return hospital.blocker
      ? `Resolve blocker: ${hospital.blocker}`
      : 'Follow up on the hospital workflow update'
  }

  if (hospital.trainingCompleted < hospital.trainingRequired) {
    const remaining =
      hospital.trainingRequired - hospital.trainingCompleted

    return `Follow up on ${remaining} remaining training assignment${
      remaining === 1 ? '' : 's'
    }`
  }

  if (!hospital.finalConfirmation) {
    return 'Request final implementation confirmation'
  }

  return 'No action required'
}

export default function ManufacturerDashboard() {
  const navigate = useNavigate()

  const [selectedProtocolId, setSelectedProtocolId] = useState<number | null>(
    null
  )

  const [statusFilter, setStatusFilter] = useState<
    'All' | HospitalStatus
  >('All')

  const [searchQuery, setSearchQuery] = useState('')

  const [showWelcome, setShowWelcome] = useState(true)
  const [welcomeVisible, setWelcomeVisible] = useState(false)

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setWelcomeVisible(true)
    }, 50)

    const fadeTimer = window.setTimeout(() => {
      setWelcomeVisible(false)
    }, 1400)

    const removeTimer = window.setTimeout(() => {
      setShowWelcome(false)
    }, 2100)

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  const selectedProtocol = protocolChanges.find(
    (protocol) => protocol.id === selectedProtocolId
  )

  const activeProtocols = protocolChanges.filter(
    (protocol) => getMetrics(protocol).implementationRate < 100
  )

  const completedProtocols = protocolChanges.filter(
    (protocol) => getMetrics(protocol).implementationRate === 100
  )

  const filteredHospitals = useMemo(() => {
    if (!selectedProtocol) return []

    const query = searchQuery.trim().toLowerCase()

    return selectedProtocol.hospitals.filter((hospital) => {
      const matchesStatus =
        statusFilter === 'All' || hospital.status === statusFilter

      const matchesSearch =
        query.length === 0 ||
        hospital.hospital.toLowerCase().includes(query) ||
        hospital.location.toLowerCase().includes(query) ||
        hospital.contactName.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [selectedProtocol, searchQuery, statusFilter])

  const openProtocol = (protocolId: number) => {
    setSelectedProtocolId(protocolId)
    setStatusFilter('All')
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProtocol = () => {
    setSelectedProtocolId(null)
    setStatusFilter('All')
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalAttentionItems = activeProtocols.reduce(
    (total, protocol) => total + getMetrics(protocol).needsAttention,
    0
  )

  return (
    <div className="min-h-screen bg-[#f4f6f2] text-[#15201c]">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f6f2]">
          <div
            className={`px-6 text-center transition-all duration-700 ${
              welcomeVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
          >
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[#15201c] md:text-6xl">
              Welcome back, Maya.
            </h1>

            <p className="mt-5 text-sm text-black/45">
              Retrieving your protocol implementation updates
            </p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f4f6f2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <button
            type="button"
            onClick={() => {
              if (selectedProtocolId !== null) {
                closeProtocol()
              } else {
                navigate('/')
              }
            }}
            className="text-xl font-semibold tracking-[-0.04em]"
          >
            VERAFY<span className="text-[#4F7CFF]">+</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Maya Chen</p>
              <p className="text-xs text-black/45">
                Regulatory Affairs · Aster Medical
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15201c] text-xs font-semibold text-white">
              MC
            </div>
          </div>
        </div>
      </header>

      {selectedProtocol ? (
        <ProtocolDetail
          protocol={selectedProtocol}
          hospitals={filteredHospitals}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onBack={closeProtocol}
          onSearchChange={setSearchQuery}
          onFilterChange={setStatusFilter}
        />
      ) : (
        <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
          <section className="mb-14">
            <p className="text-sm font-medium text-black/45">
              Manufacturer implementation center
            </p>

            <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                  Good afternoon, Maya.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-black/55">
                  Review how hospitals are adopting your latest protocol
                  changes and identify where follow-up is needed.
                </p>
              </div>

              <div className="flex gap-10 border-l border-black/10 pl-7">
                <div>
                  <p className="text-3xl font-semibold">
                    {activeProtocols.length}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/40">
                    Active changes
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold text-[#8a4b43]">
                    {totalAttentionItems}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/40">
                    Need attention
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProtocolSection
            title="Recent protocol changes"
            description="Select a change to review hospital adoption and follow-up activity."
            protocols={activeProtocols}
            onSelect={openProtocol}
          />

          <div className="my-16 border-t border-black/10" />

          <ProtocolSection
            title="Successfully implemented protocol changes"
            description="Changes confirmed as fully implemented across every affected hospital."
            protocols={completedProtocols}
            onSelect={openProtocol}
            completed
          />
        </main>
      )}
    </div>
  )
}

interface ProtocolSectionProps {
  title: string
  description: string
  protocols: ProtocolChange[]
  completed?: boolean
  onSelect: (protocolId: number) => void
}

function ProtocolSection({
  title,
  description,
  protocols,
  completed = false,
  onSelect,
}: ProtocolSectionProps) {
  return (
    <section>
      <div className="mb-7">
        <div className="flex items-center gap-3">
          {completed && (
            <span className="h-2.5 w-2.5 rounded-full bg-[#789d8b]" />
          )}

          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            {title}
          </h2>
        </div>

        <p className="mt-2 text-sm text-black/50">{description}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {protocols.map((protocol) => (
          <ProtocolCard
            key={protocol.id}
            protocol={protocol}
            completed={completed}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}

interface ProtocolCardProps {
  protocol: ProtocolChange
  completed: boolean
  onSelect: (protocolId: number) => void
}

function ProtocolCard({
  protocol,
  completed,
  onSelect,
}: ProtocolCardProps) {
  const metrics = getMetrics(protocol)
  const needsAttention = metrics.needsAttention > 0

  const borderClass = completed
    ? 'border-[#b8d1c2]'
    : needsAttention
      ? 'border-[#dfc0ba]'
      : 'border-black/10'

  const topBarClass = completed
    ? 'bg-[#789d8b]'
    : needsAttention
      ? 'bg-[#b96d62]'
      : 'bg-[#789d8b]'

  return (
    <button
      type="button"
      onClick={() => onSelect(protocol.id)}
      className={`group relative overflow-hidden rounded-[26px] border bg-white p-7 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(21,32,28,0.08)] ${borderClass}`}
    >
      <div className={`absolute left-0 top-0 h-1 w-full ${topBarClass}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40">
            {protocol.changeId}
          </p>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
            {protocol.device}
          </h3>

          <p className="mt-2 min-h-12 text-sm leading-6 text-black/55">
            {protocol.title}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
            completed
              ? 'border-[#b8d1c2] bg-[#e7f1eb] text-[#315b45]'
              : protocol.priority === 'High'
                ? 'border-[#dfbcb6] bg-[#f5e8e6] text-[#7b4038]'
                : 'border-[#dfcfaa] bg-[#f5efe1] text-[#765f28]'
          }`}
        >
          {completed ? 'Complete' : `${protocol.priority} priority`}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <SmallMetric
          label="Acknowledged"
          value={`${metrics.acknowledgementRate}%`}
          tone="neutral"
        />

        <SmallMetric
          label="Implemented"
          value={`${metrics.implementationRate}%`}
          tone={completed ? 'success' : 'neutral'}
        />

        <SmallMetric
          label="Attention"
          value={metrics.needsAttention.toString()}
          tone={metrics.needsAttention > 0 ? 'warning' : 'neutral'}
        />
      </div>

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-black/45">
            {metrics.implemented} of {metrics.total} hospitals confirmed
          </span>

          <span className="font-semibold">
            {metrics.implementationRate}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
          <div
            className={`h-full rounded-full ${
              completed ? 'bg-[#789d8b]' : 'bg-[#567363]'
            }`}
            style={{ width: `${metrics.implementationRate}%` }}
          />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-black/10 pt-5">
        <div>
          <p className="text-xs text-black/40">Deadline</p>
          <p className="mt-1 text-sm font-semibold">{protocol.deadline}</p>
        </div>

        <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">
          View adoption →
        </span>
      </div>
    </button>
  )
}

interface SmallMetricProps {
  label: string
  value: string
  tone: 'neutral' | 'success' | 'warning'
}

function SmallMetric({ label, value, tone }: SmallMetricProps) {
  const style =
    tone === 'success'
      ? 'border-[#c8ddcf] bg-[#edf5f0]'
      : tone === 'warning'
        ? 'border-[#dfc0ba] bg-[#f8efed]'
        : 'border-black/10 bg-[#f7f8f6]'

  return (
    <div className={`rounded-2xl border p-3 ${style}`}>
      <p className="text-xl font-semibold tracking-[-0.04em]">{value}</p>

      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-black/45">
        {label}
      </p>
    </div>
  )
}

interface ProtocolDetailProps {
  protocol: ProtocolChange
  hospitals: HospitalAdoption[]
  searchQuery: string
  statusFilter: 'All' | HospitalStatus
  onBack: () => void
  onSearchChange: (value: string) => void
  onFilterChange: (value: 'All' | HospitalStatus) => void
}

function ProtocolDetail({
  protocol,
  hospitals,
  searchQuery,
  statusFilter,
  onBack,
  onSearchChange,
  onFilterChange,
}: ProtocolDetailProps) {
  const metrics = getMetrics(protocol)

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition hover:border-black"
      >
        ← Back to protocol changes
      </button>

      <section className="rounded-[30px] border border-black/10 bg-white p-8 md:p-10">
        <div className="grid gap-10 xl:grid-cols-[1.4fr_0.8fr] xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
              {protocol.changeId} · Issued {protocol.issuedDate}
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              {protocol.device}
            </h1>

            <p className="mt-3 text-xl text-black/55">{protocol.title}</p>

            <p className="mt-7 max-w-3xl text-sm leading-7 text-black/55">
              {protocol.summary}
            </p>

            <p className="mt-6 text-sm">
              <span className="text-black/45">Implementation deadline:</span>{' '}
              <span className="font-semibold">{protocol.deadline}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LargeMetric
              label="Acknowledged"
              value={`${metrics.acknowledgementRate}%`}
              tone="neutral"
            />

            <LargeMetric
              label="Implemented"
              value={`${metrics.implementationRate}%`}
              tone="success"
            />

            <LargeMetric
              label="Hospitals"
              value={metrics.total.toString()}
              tone="neutral"
            />

            <LargeMetric
              label="Need attention"
              value={metrics.needsAttention.toString()}
              tone={metrics.needsAttention > 0 ? 'warning' : 'neutral'}
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Hospital adoption
            </h2>

            <p className="mt-2 text-sm text-black/50">
              Review implementation progress and identify the correct person
              for follow-up.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search hospital or contact"
              className="min-w-[260px] rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                onFilterChange(
                  event.target.value as 'All' | HospitalStatus
                )
              }
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
            >
              <option value="All">All statuses</option>
              <option value="Implemented">Implemented</option>
              <option value="In progress">In progress</option>
              <option value="Not acknowledged">Not acknowledged</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </section>
    </main>
  )
}

interface LargeMetricProps {
  label: string
  value: string
  tone: 'neutral' | 'success' | 'warning'
}

function LargeMetric({ label, value, tone }: LargeMetricProps) {
  const style =
    tone === 'success'
      ? 'border-[#b8d1c2] bg-[#e7f1eb]'
      : tone === 'warning'
        ? 'border-[#dfbcb6] bg-[#f5e8e6]'
        : 'border-black/10 bg-[#f4f6f2]'

  return (
    <div className={`rounded-2xl border p-5 ${style}`}>
      <p className="text-4xl font-semibold tracking-[-0.06em]">{value}</p>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-black/45">
        {label}
      </p>
    </div>
  )
}

interface HospitalCardProps {
  hospital: HospitalAdoption
}

function HospitalCard({ hospital }: HospitalCardProps) {
  const trainingPercentage =
    hospital.trainingRequired > 0
      ? Math.round(
          (hospital.trainingCompleted / hospital.trainingRequired) * 100
        )
      : 0

  return (
    <article className="rounded-[26px] border border-black/10 bg-white p-7">
      <div className="grid gap-8 xl:grid-cols-[1.05fr_1fr_1.15fr]">
        <div>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
              hospital.status
            )}`}
          >
            {hospital.status}
          </span>

          <h3 className="mt-5 text-xl font-semibold">
            {hospital.hospital}
          </h3>

          <p className="mt-1 text-sm text-black/45">
            {hospital.location}
          </p>

          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/35">
              Primary contact
            </p>

            <p className="mt-2 text-sm font-semibold">
              {hospital.contactName}
            </p>

            <p className="text-sm text-black/45">
              {hospital.contactRole}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/35">
            Implementation record
          </p>

          <div className="mt-4 space-y-3">
            <StatusRow
              label="Notice acknowledged"
              complete={hospital.acknowledged}
            />

            <StatusRow
              label="Inventory verified"
              complete={hospital.inventoryVerified}
            />

            <StatusRow
              label="Workflow updated"
              complete={hospital.workflowUpdated}
            />

            <StatusRow
              label={`Training ${hospital.trainingCompleted}/${hospital.trainingRequired}`}
              complete={
                hospital.trainingCompleted === hospital.trainingRequired
              }
            />

            <StatusRow
              label="Final confirmation"
              complete={hospital.finalConfirmation}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-black/45">
              <span>Training completion</span>
              <span>{trainingPercentage}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-[#789d8b]"
                style={{ width: `${trainingPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f6f2] p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/35">
              Recommended action
            </p>

            <p className="mt-3 text-base font-semibold leading-6">
              {getNextAction(hospital)}
            </p>

            {hospital.blocker && (
              <p className="mt-4 text-sm leading-6 text-[#7b4038]">
                {hospital.blocker}
              </p>
            )}

            <p className="mt-5 text-xs text-black/40">
              {hospital.lastActivity}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {!hospital.finalConfirmation && (
              <a
                href={`mailto:${hospital.contactEmail}`}
                className="rounded-xl bg-[#15201c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Contact {hospital.contactName.split(' ')[0]}
              </a>
            )}

            <button
              type="button"
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold transition hover:border-black"
            >
              View record
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

interface StatusRowProps {
  label: string
  complete: boolean
}

function StatusRow({ label, complete }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between gap-5 text-sm">
      <span className="text-black/60">{label}</span>

      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.07em] ${
          complete
            ? 'bg-[#e7f1eb] text-[#315b45]'
            : 'bg-black/[0.04] text-black/35'
        }`}
      >
        {complete ? 'Complete' : 'Pending'}
      </span>
    </div>
  )
}