import endoscopeImage from '../assets/devices/endoscope.png'
import generatorImage from '../assets/devices/electrosurgical-generator.png'
import ultrasoundImage from '../assets/devices/ultrasound.png'
import patientMonitorImage from '../assets/devices/patient-monitor.png'
import contrastInjectorImage from '../assets/devices/contrast-injector.png'
import defibrillatorImage from '../assets/devices/defibrillator.png'
import dialysisImage from '../assets/devices/dialysis-machine.png'
import anesthesiaImage from '../assets/devices/anesthesia-workstation.png'
import surgicalTableImage from '../assets/devices/surgical-table.png'
import infusionPumpImage from '../assets/devices/infusion-pump.png'

export type DeviceStatus =
  | 'new-update'
  | 'tasks'
  | 'documentation'

export type TaskType = 'necessary' | 'recommended'

export interface DeviceTask {
  id: string
  title: string
  department: string
  type: TaskType
  complete: boolean
}

export interface DeviceDocument {
  name: string
  version: string
  updated: string
}

export interface DeviceUpdate {
  title: string
  date: string
  summary: string
  previous: string
  current: string
  reason: string
}

export interface Device {
  id: string
  name: string
  manufacturer: string
  model: string
  department: string
  image: string
  status: DeviceStatus
  statusText: string
  updatedDate: string
  description: string
  update?: DeviceUpdate
  tasks: DeviceTask[]
  documents: DeviceDocument[]
}

export const DEVICES: Device[] = [
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
    description:
      'Flexible endoscope system used across gastrointestinal procedure rooms.',
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
    status: 'new-update',
    statusText: 'New setup instructions',
    updatedDate: 'July 19, 2026',
    description:
      'Dual-head contrast injector used during computed tomography procedures.',
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
    status: 'tasks',
    statusText: '2 implementation tasks',
    updatedDate: 'July 16, 2026',
    description:
      'Programmable infusion pump used throughout inpatient care units.',
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
    status: 'tasks',
    statusText: '1 recommended task',
    updatedDate: 'July 8, 2026',
    description:
      'Integrated anesthesia delivery and respiratory-monitoring workstation.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 29, 2026',
    description:
      'Portable ultrasound platform used across imaging and emergency care.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 17, 2026',
    description:
      'Multiparameter bedside monitor used throughout inpatient units.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 11, 2026',
    description:
      'Electrosurgical generator used for cutting, coagulation, and bipolar procedures.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'June 8, 2026',
    description:
      'Portable defibrillator and patient-monitoring system for emergency response.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'May 27, 2026',
    description:
      'Hemodialysis system used within the hospital dialysis center.',
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
    status: 'documentation',
    statusText: 'View documentation',
    updatedDate: 'May 15, 2026',
    description:
      'Powered surgical table used across general and specialty operating rooms.',
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
