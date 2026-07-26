import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types'

import endoscopeImage from '../../assets/devices/endoscope.png'
import generatorImage from '../../assets/devices/electrosurgical-generator.png'
import ultrasoundImage from '../../assets/devices/ultrasound.png'
import patientMonitorImage from '../../assets/devices/patient-monitor.png'
import contrastInjectorImage from '../../assets/devices/contrast-injector.png'
import defibrillatorImage from '../../assets/devices/defibrillator.png'
import dialysisImage from '../../assets/devices/dialysis-machine.png'
import anesthesiaImage from '../../assets/devices/anesthesia-workstation.png'
import surgicalTableImage from '../../assets/devices/surgical-table.png'
import infusionPumpImage from '../../assets/devices/infusion-pump.png'

interface QualityDashboardProps {
  user: User
  onSwitchUser: () => void
  onLogout: () => void
}

type DeviceStatus =
  | 'new-update'
  | 'tasks'
  | 'documentation'

type DeviceFilter = 'all' | DeviceStatus

interface Device {
  id: string
  name: string
  manufacturer: string
  model: string
  department: string
  image: string
  status: DeviceStatus
  statusText: string
  updatedDate: string
}

const DEVICES: Device[] = [
  {
    id: 'aster-scope-flex-300',
    name: 'AsterScope Flex 300',
    manufacturer: 'Aster Medical Devices',
    model: 'ASF-300',
    department: 'Sterile Processing',
    image: endoscopeImage,
    status: 'new-update',
    statusText: 'New cleaning update',
    updatedDate: 'July 18, 2026',
  },
  {
    id: 'vectra-contrast-injector',
    name: 'Vectra Contrast Injector',
    manufacturer: 'Vectra Medical',
    model: 'VCI-200',
    department: 'Radiology',
    image: contrastInjectorImage,
    status: 'new-update',
    statusText: 'New setup instructions',
    updatedDate: 'July 19, 2026',
  },
  {
    id: 'nova-infusion-pump',
    name: 'Nova Infusion Pump',
    manufacturer: 'Northstar Medical',
    model: 'NP-410',
    department: 'Clinical Engineering',
    image: infusionPumpImage,
    status: 'tasks',
    statusText: '2 implementation tasks',
    updatedDate: 'July 16, 2026',
  },
  {
    id: 'aurelia-anesthesia-workstation',
    name: 'Aurelia Anesthesia Workstation',
    manufacturer: 'Aurelia Medical',
    model: 'AAW-600',
    department: 'Anesthesiology',
    image: anesthesiaImage,
    status: 'tasks',
    statusText: '1 recommended task',
    updatedDate: 'July 8, 2026',
  },
  {
    id: 'helios-ultrasound',
    name: 'Helios Ultrasound',
    manufacturer: 'Helios Imaging',
    model: 'HI-700',
    department: 'Diagnostic Imaging',
    image: ultrasoundImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 29, 2026',
  },
  {
    id: 'lumena-patient-monitor',
    name: 'Lumena Patient Monitor',
    manufacturer: 'Lumena Health',
    model: 'LPM-80',
    department: 'Patient Care',
    image: patientMonitorImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 17, 2026',
  },
  {
    id: 'crescent-seal-generator',
    name: 'CrescentSeal Generator',
    manufacturer: 'Crescent Surgical',
    model: 'CSG-220',
    department: 'Operating Room',
    image: generatorImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 11, 2026',
  },
  {
    id: 'meridian-defibrillator',
    name: 'Meridian Defibrillator',
    manufacturer: 'Meridian Clinical',
    model: 'MD-360',
    department: 'Emergency Department',
    image: defibrillatorImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 8, 2026',
  },
  {
    id: 'solace-dialysis-system',
    name: 'Solace Dialysis System',
    manufacturer: 'Solace Renal',
    model: 'SDS-900',
    department: 'Dialysis',
    image: dialysisImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'May 27, 2026',
  },
  {
    id: 'axis-surgical-table',
    name: 'Axis Surgical Table',
    manufacturer: 'Axis Surgical Systems',
    model: 'AST-440',
    department: 'Operating Room',
    image: surgicalTableImage,
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'May 15, 2026',
  },
]

function getStatusStyles(status: DeviceStatus) {
  if (status === 'new-update') {
    return {
      card: 'border-[#e5b7b2] hover:border-[#c95d53]',
      badge: 'bg-[#f7e3e0] text-[#8c3932]',
      dot: 'bg-[#ba4d43]',
      action: 'text-[#8c3932]',
    }
  }

  if (status === 'tasks') {
    return {
      card: 'border-[#e4d09a] hover:border-[#bd9834]',
      badge: 'bg-[#f6edcf] text-[#71591c]',
      dot: 'bg-[#ae8725]',
      action: 'text-[#71591c]',
    }
  }

  return {
    card: 'border-black/10 hover:border-black/25',
    badge: '',
    dot: '',
    action: 'text-[#356046]',
  }
}

function getFilterName(filter: DeviceFilter) {
  if (filter === 'new-update') return 'New updates'
  if (filter === 'tasks') return 'Open tasks'
  if (filter === 'documentation') return 'Documentation'
  return 'All devices'
}

export default function QualityDashboard({
  user,
  onLogout,
}: QualityDashboardProps) {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] =
    useState<DeviceFilter>('all')

  const filteredDevices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const priority: Record<DeviceStatus, number> = {
      'new-update': 0,
      tasks: 1,
      documentation: 2,
    }

    return DEVICES.filter((device) => {
      const matchesFilter =
        activeFilter === 'all' ||
        device.status === activeFilter

      const searchableText = [
        device.name,
        device.manufacturer,
        device.model,
        device.department,
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        query.length === 0 ||
        searchableText.includes(query)

      return matchesFilter && matchesSearch
    }).sort(
      (firstDevice, secondDevice) =>
        priority[firstDevice.status] -
        priority[secondDevice.status],
    )
  }, [activeFilter, searchQuery])

  const filterCounts = useMemo(
    () => ({
      all: DEVICES.length,
      'new-update': DEVICES.filter(
        (device) => device.status === 'new-update',
      ).length,
      tasks: DEVICES.filter(
        (device) => device.status === 'tasks',
      ).length,
      documentation: DEVICES.filter(
        (device) => device.status === 'documentation',
      ).length,
    }),
    [],
  )

  const openDevice = (device: Device) => {
    navigate(`/hospital/devices/${device.id}`)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f2] text-[#181a19]">
      <header className="border-b border-black/10 bg-[#f5f5f2]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-10">
            <button
              type="button"
              onClick={() => navigate('/hospital')}
              className="text-xl font-semibold tracking-[-0.055em]"
            >
              VERA
              <span className="text-[#4f6fff]">+</span>
            </button>

            <nav className="hidden items-center gap-7 text-sm md:flex">
              <button
                type="button"
                className="font-semibold text-black"
              >
                Devices
              </button>

              <button
                type="button"
                className="text-black/45 transition hover:text-black"
              >
                Documents
              </button>

              <button
                type="button"
                className="text-black/45 transition hover:text-black"
              >
                Help
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                {user.name}
              </p>

              <p className="text-xs text-black/40">
                {user.organization}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181a19] text-xs font-semibold text-white">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:border-black/30"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 pb-12 pt-7 md:px-10">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-black/40">
              {user.organization}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
              Medical device library
            </h1>
          </div>

          <button
            type="button"
            className="hidden rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:border-black/30 md:block"
          >
            Scan a device
          </button>
        </section>

        <section className="mt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/30"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="m16.5 16.5 4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search device, manufacturer, model, or department"
                className="h-[52px] w-full rounded-xl border border-black/10 bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30 focus:ring-4 focus:ring-black/[0.035]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-black/30 transition hover:text-black"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              className="rounded-xl bg-[#181a19] px-5 text-sm font-semibold text-white transition hover:bg-[#303330] md:hidden"
            >
              Scan
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                'all',
                'new-update',
                'tasks',
                'documentation',
              ] as DeviceFilter[]
            ).map((filter) => {
              const isActive = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'border-[#181a19] bg-[#181a19] text-white'
                      : 'border-black/10 bg-white text-black/45 hover:border-black/25 hover:text-black'
                  }`}
                >
                  {getFilterName(filter)}

                  <span
                    className={`ml-2 ${
                      isActive
                        ? 'text-white/55'
                        : 'text-black/30'
                    }`}
                  >
                    {filterCounts[filter]}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-6">
          {filteredDevices.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredDevices.map((device) => {
                const styles = getStatusStyles(device.status)

                return (
                  <button
                    key={device.id}
                    type="button"
                    onClick={() => openDevice(device)}
                    className={`group overflow-hidden rounded-[18px] border bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,23,21,0.07)] ${styles.card}`}
                  >
                    <div className="relative flex h-[185px] items-center justify-center bg-white px-5 pt-5">
                      <img
                        src={device.image}
                        alt={device.name}
                        className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-[1.025] max-h-[280px] w-full object-contain mix-blend-multiply"
                      />

                      {device.status !==
                        'documentation' && (
                        <span
                          className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.09em] ${styles.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                          />

                          {device.status === 'new-update'
                            ? 'New update'
                            : 'Open tasks'}
                        </span>
                      )}
                    </div>

                    <div className="p-5 pt-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-black/35">
                        {device.manufacturer}
                      </p>

                      <h2 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.035em]">
                        {device.name}
                      </h2>

                      <p className="mt-1.5 text-xs text-black/40">
                        {device.model} · {device.department}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                        {device.status ===
                        'documentation' ? (
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#356046]">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="currentColor"
                                opacity="0.12"
                              />

                              <path
                                d="m6.2 10.1 2.3 2.3 5.1-5.2"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            View documentation
                          </span>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${styles.action}`}
                          >
                            {device.statusText}
                          </span>
                        )}

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="h-4 w-4 text-black/25 transition group-hover:translate-x-0.5 group-hover:text-black/60"
                        >
                          <path
                            d="M5 12h14m-5-5 5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-14 text-center">
              <h2 className="text-lg font-semibold">
                No matching devices
              </h2>

              <p className="mt-2 text-sm text-black/40">
                Try a different search term or filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('all')
                }}
                className="mt-5 rounded-xl bg-[#181a19] px-5 py-3 text-sm font-semibold text-white"
              >
                Show all devices
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}