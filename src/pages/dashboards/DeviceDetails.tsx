import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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

type TaskType = 'necessary' | 'recommended'

interface Task {
  id: string
  title: string
  department: string
  type: TaskType
  complete: boolean
}

interface Document {
  name: string
  version: string
  updated: string
}

interface DeviceDetailsData {
  id: string
  name: string
  manufacturer: string
  model: string
  department: string
  image: string
  description: string
  status: 'new-update' | 'tasks' | 'documentation'

  update?: {
    title: string
    date: string
    summary: string
    previous: string
    current: string
    reason: string
  }

  tasks: Task[]
  documents: Document[]
}

const DEVICES: DeviceDetailsData[] = [
  {
    id: 'aster-scope-flex-300',
    name: 'AsterScope Flex 300',
    manufacturer: 'Aster Medical Devices',
    model: 'ASF-300',
    department: 'Sterile Processing',
    image: endoscopeImage,
    description:
      'Flexible endoscope system used across gastrointestinal procedure rooms.',
    status: 'new-update',
    update: {
      title: 'Distal-channel cleaning procedure revised',
      date: 'July 18, 2026',
      summary:
        'The distal-channel flush is now longer and requires the AsterFlow adapter. No other cleaning steps were changed.',
      previous:
        'Flush the distal channel with approved enzymatic detergent for 30 seconds.',
      current:
        'Flush the distal channel for 90 seconds using the AsterFlow adapter before automated reprocessing.',
      reason:
        'Manufacturer validation found that the previous flush duration may not consistently remove residual material from the distal channel.',
    },
    tasks: [
      {
        id: 'aster-1',
        title: 'Confirm which hospital devices are affected',
        department: 'Clinical Engineering',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'aster-2',
        title: 'Confirm AsterFlow adapters are available',
        department: 'Supply Chain',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'aster-3',
        title: 'Update internal cleaning instructions',
        department: 'Sterile Processing',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'aster-4',
        title:
          'Share revised instructions with affected technicians',
        department: 'Clinical Education',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'aster-5',
        title:
          'Discuss the update during the next team huddle',
        department: 'Sterile Processing',
        type: 'recommended',
        complete: false,
      },
    ],
    documents: [
      {
        name: 'Cleaning and Reprocessing Instructions',
        version: 'Version 7.2',
        updated: 'July 18, 2026',
      },
      {
        name: 'Instructions for Use',
        version: 'Version 5.4',
        updated: 'March 4, 2026',
      },
      {
        name: 'Preventative Maintenance Guide',
        version: 'Version 3.1',
        updated: 'January 12, 2026',
      },
    ],
  },
  {
    id: 'vectra-contrast-injector',
    name: 'Vectra Contrast Injector',
    manufacturer: 'Vectra Medical',
    model: 'VCI-200',
    department: 'Radiology',
    image: contrastInjectorImage,
    description:
      'Dual-head contrast injector used during computed tomography procedures.',
    status: 'new-update',
    update: {
      title: 'Tubing installation sequence updated',
      date: 'July 19, 2026',
      summary:
        'The tubing connection order changed to make the priming process clearer and reduce the possibility of air entering the fluid path.',
      previous:
        'Connect the patient line before priming the syringe assembly.',
      current:
        'Prime the syringe assembly completely before connecting the patient line.',
      reason:
        'Field observations identified inconsistent setup sequencing across facilities.',
    },
    tasks: [
      {
        id: 'vectra-1',
        title: 'Review the revised setup sequence',
        department: 'Radiology',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'vectra-2',
        title: 'Replace the current setup reference card',
        department: 'Radiology',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'vectra-3',
        title:
          'Share the change during the next shift briefing',
        department: 'Radiology',
        type: 'recommended',
        complete: false,
      },
    ],
    documents: [
      {
        name: 'Setup and Operation Guide',
        version: 'Version 6.2',
        updated: 'July 19, 2026',
      },
      {
        name: 'Cleaning Instructions',
        version: 'Version 2.9',
        updated: 'April 30, 2026',
      },
    ],
  },
  {
    id: 'nova-infusion-pump',
    name: 'Nova Infusion Pump',
    manufacturer: 'Northstar Medical',
    model: 'NP-410',
    department: 'Clinical Engineering',
    image: infusionPumpImage,
    description:
      'Programmable infusion pump used throughout inpatient care units.',
    status: 'tasks',
    tasks: [
      {
        id: 'nova-1',
        title:
          'Update the preventative-maintenance schedule',
        department: 'Clinical Engineering',
        type: 'necessary',
        complete: false,
      },
      {
        id: 'nova-2',
        title: 'Review replacement battery inventory',
        department: 'Supply Chain',
        type: 'recommended',
        complete: false,
      },
    ],
    documents: [
      {
        name: 'Instructions for Use',
        version: 'Version 9.1',
        updated: 'April 22, 2026',
      },
      {
        name: 'Preventative Maintenance Manual',
        version: 'Version 6.3',
        updated: 'July 16, 2026',
      },
    ],
  },
  {
    id: 'aurelia-anesthesia-workstation',
    name: 'Aurelia Anesthesia Workstation',
    manufacturer: 'Aurelia Medical',
    model: 'AAW-600',
    department: 'Anesthesiology',
    image: anesthesiaImage,
    description:
      'Integrated anesthesia delivery and respiratory-monitoring workstation.',
    status: 'tasks',
    tasks: [
      {
        id: 'aurelia-1',
        title:
          'Review the updated breathing-circuit compatibility list',
        department: 'Anesthesiology',
        type: 'recommended',
        complete: false,
      },
    ],
    documents: [
      {
        name: 'Clinical Reference Manual',
        version: 'Version 8.7',
        updated: 'July 8, 2026',
      },
      {
        name: 'Daily Checkout Procedure',
        version: 'Version 3.9',
        updated: 'March 25, 2026',
      },
    ],
  },
  {
    id: 'helios-ultrasound',
    name: 'Helios Ultrasound',
    manufacturer: 'Helios Imaging',
    model: 'HI-700',
    department: 'Diagnostic Imaging',
    image: ultrasoundImage,
    description:
      'Portable ultrasound platform used across imaging and emergency care.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'System User Guide',
        version: 'Version 8.0',
        updated: 'June 29, 2026',
      },
      {
        name: 'Probe Cleaning Guide',
        version: 'Version 3.5',
        updated: 'February 14, 2026',
      },
    ],
  },
  {
    id: 'lumena-patient-monitor',
    name: 'Lumena Patient Monitor',
    manufacturer: 'Lumena Health',
    model: 'LPM-80',
    department: 'Patient Care',
    image: patientMonitorImage,
    description:
      'Multiparameter bedside monitor used throughout inpatient units.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'Operator Instructions',
        version: 'Version 7.6',
        updated: 'June 17, 2026',
      },
      {
        name: 'Alarm Configuration Guide',
        version: 'Version 4.2',
        updated: 'March 7, 2026',
      },
    ],
  },
  {
    id: 'crescent-seal-generator',
    name: 'CrescentSeal Generator',
    manufacturer: 'Crescent Surgical',
    model: 'CSG-220',
    department: 'Operating Room',
    image: generatorImage,
    description:
      'Electrosurgical generator used for cutting, coagulation, and bipolar procedures.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'Operator Manual',
        version: 'Version 4.8',
        updated: 'June 11, 2026',
      },
      {
        name: 'Accessory Compatibility Guide',
        version: 'Version 2.2',
        updated: 'May 8, 2026',
      },
    ],
  },
  {
    id: 'meridian-defibrillator',
    name: 'Meridian Defibrillator',
    manufacturer: 'Meridian Clinical',
    model: 'MD-360',
    department: 'Emergency Department',
    image: defibrillatorImage,
    description:
      'Portable defibrillator and patient-monitoring system for emergency response.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'Operating Instructions',
        version: 'Version 11.3',
        updated: 'June 8, 2026',
      },
      {
        name: 'Battery Care Guide',
        version: 'Version 3.6',
        updated: 'February 22, 2026',
      },
    ],
  },
  {
    id: 'solace-dialysis-system',
    name: 'Solace Dialysis System',
    manufacturer: 'Solace Renal',
    model: 'SDS-900',
    department: 'Dialysis',
    image: dialysisImage,
    description:
      'Hemodialysis system used within the hospital dialysis center.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'Operator Manual',
        version: 'Version 12.0',
        updated: 'May 27, 2026',
      },
      {
        name: 'Disinfection Instructions',
        version: 'Version 7.5',
        updated: 'April 19, 2026',
      },
    ],
  },
  {
    id: 'axis-surgical-table',
    name: 'Axis Surgical Table',
    manufacturer: 'Axis Surgical Systems',
    model: 'AST-440',
    department: 'Operating Room',
    image: surgicalTableImage,
    description:
      'Powered surgical table used across general and specialty operating rooms.',
    status: 'documentation',
    tasks: [],
    documents: [
      {
        name: 'Operating Guide',
        version: 'Version 4.3',
        updated: 'May 15, 2026',
      },
      {
        name: 'Inspection Checklist',
        version: 'Version 2.8',
        updated: 'January 9, 2026',
      },
    ],
  },
]

export default function DeviceDetails() {
  const navigate = useNavigate()
  const { deviceId } = useParams()

  const device = useMemo(
    () => DEVICES.find((item) => item.id === deviceId),
    [deviceId],
  )

  const [tasks, setTasks] = useState<Task[]>(
    device?.tasks ?? [],
  )

  if (!device) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f2] px-6 text-[#181a19]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Device not found
          </h1>

          <button
            type="button"
            onClick={() => navigate('/hospital')}
            className="mt-5 rounded-xl bg-[#181a19] px-5 py-3 text-sm font-semibold text-white"
          >
            Return to devices
          </button>
        </div>
      </div>
    )
  }

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              complete: !task.complete,
            }
          : task,
      ),
    )
  }

  const necessaryTasks = tasks.filter(
    (task) => task.type === 'necessary',
  )

  const recommendedTasks = tasks.filter(
    (task) => task.type === 'recommended',
  )

  return (
    <div className="min-h-screen bg-[#f5f5f2] text-[#181a19]">
      <header className="border-b border-black/10 bg-[#f5f5f2]">
        <div className="mx-auto flex max-w-[1250px] items-center justify-between px-6 py-4 md:px-10">
          <button
            type="button"
            onClick={() => navigate('/hospital')}
            className="text-xl font-semibold tracking-[-0.055em]"
          >
            VERA
            <span className="text-[#4f6fff]">+</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/hospital')}
            className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:border-black/30"
          >
            Back to devices
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1250px] px-6 py-8 md:px-10 md:py-12">
        <section className="grid gap-8 rounded-[24px] border border-black/10 bg-white p-6 md:grid-cols-[320px_minmax(0,1fr)] md:p-8">
          <div className="flex min-h-[280px] items-center justify-center">
            <img
              src={device.image}
              alt={device.name}
              className="max-h-[280px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/35">
              {device.manufacturer}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">
              {device.name}
            </h1>

            <p className="mt-3 text-sm text-black/45">
              {device.model} · {device.department}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/55">
              {device.description}
            </p>

            {device.status === 'documentation' && (
              <div className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#356046]">
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

                View current documentation below
              </div>
            )}
          </div>
        </section>

        {device.update && (
          <section className="mt-7 rounded-[24px] border border-[#e5b7b2] bg-white p-6 md:p-8">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#8c3932]">
                  What changed
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  {device.update.title}
                </h2>
              </div>

              <p className="text-sm text-black/40">
                {device.update.date}
              </p>
            </div>

            <p className="mt-5 max-w-3xl leading-7 text-black/60">
              {device.update.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/35">
                  Previously
                </p>

                <p className="mt-3 text-sm leading-6 text-black/55">
                  {device.update.previous}
                </p>
              </article>

              <article className="rounded-2xl border border-[#e5b7b2] bg-[#fff7f6] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8c3932]">
                  Now
                </p>

                <p className="mt-3 text-sm font-medium leading-6">
                  {device.update.current}
                </p>
              </article>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/35">
                Why it changed
              </p>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55">
                {device.update.reason}
              </p>
            </div>
          </section>
        )}

        {tasks.length > 0 && (
          <section className="mt-7 rounded-[24px] border border-black/10 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">
              Implementation checklist
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/45">
              Necessary items are tied directly to the update.
              Recommended items can be adjusted to fit your
              hospital.
            </p>

            {necessaryTasks.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.11em] text-black/40">
                  Necessary
                </p>

                <div className="space-y-3">
                  {necessaryTasks.map((task) => (
                    <label
                      key={task.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${
                        task.complete
                          ? 'border-[#b8d5c2] bg-[#edf6f0]'
                          : 'border-black/10 bg-white hover:border-black/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.complete}
                        onChange={() =>
                          toggleTask(task.id)
                        }
                        className="mt-0.5 h-5 w-5 accent-[#356046]"
                      />

                      <span className="min-w-0">
                        <span
                          className={`block font-semibold ${
                            task.complete
                              ? 'text-black/45 line-through'
                              : ''
                          }`}
                        >
                          {task.title}
                        </span>

                        <span className="mt-1.5 block text-sm text-black/40">
                          Suggested department:{' '}
                          {task.department}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {recommendedTasks.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.11em] text-black/40">
                  Recommended
                </p>

                <div className="space-y-3">
                  {recommendedTasks.map((task) => (
                    <label
                      key={task.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${
                        task.complete
                          ? 'border-[#b8d5c2] bg-[#edf6f0]'
                          : 'border-[#e4d09a] bg-[#fffaf0] hover:border-[#bd9834]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.complete}
                        onChange={() =>
                          toggleTask(task.id)
                        }
                        className="mt-0.5 h-5 w-5 accent-[#8d7228]"
                      />

                      <span className="min-w-0">
                        <span
                          className={`block font-semibold ${
                            task.complete
                              ? 'text-black/45 line-through'
                              : ''
                          }`}
                        >
                          {task.title}
                        </span>

                        <span className="mt-1.5 block text-sm text-black/40">
                          Suggested department:{' '}
                          {task.department}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="mt-7 rounded-[24px] border border-black/10 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">
            Device documentation
          </h2>

          <p className="mt-2 text-sm text-black/45">
            Current manufacturer-provided instructions for this
            device.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
            {device.documents.map((document, index) => (
              <button
                key={document.name}
                type="button"
                className={`flex w-full items-center justify-between gap-5 bg-white px-5 py-5 text-left transition hover:bg-black/[0.02] ${
                  index > 0
                    ? 'border-t border-black/10'
                    : ''
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {document.name}
                  </p>

                  <p className="mt-1.5 text-sm text-black/40">
                    {document.version} · Updated{' '}
                    {document.updated}
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold text-black/45">
                  View →
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}