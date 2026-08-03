export interface User {
  id: string
  name: string
  role: string
  organization: string
  type: 'manufacturer' | 'hospital' | 'technician'
}

export interface ProtocolChange {
  id: string
  device: string
  manufacturer: string
  title: string
  issued: string
  deadline: string
  priority: 'High' | 'Medium' | 'Low'
  affectedFacility: string
  affectedDevices: number
  affectedDepartments: string[]
  affectedProcedures: number
  previousProtocol: string
  updatedProtocol: string
  reason: string
  implementationSteps: string[]
}

export interface ImplementationState {
  noticeReceived: boolean
  inventoryConfirmed: boolean
  procedureApproved: boolean
  workflowUpdated: boolean
  trainingAssigned: boolean
  techniciansAcknowledged: number
  totalTechnicians: number
  qualityVerificationPending: boolean
  finalConfirmationSubmitted: boolean
  evidenceUploaded: boolean
  expectedImplementationDate: string
}

export const DEMO_USERS: User[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    role: 'Manufacturer Regulatory Affairs Manager',
    organization: 'Aster Medical Devices',
    type: 'manufacturer',
  },
  {
    id: 'emily-carter',
    name: 'Emily Carter',
    role: 'Quality and Risk Manager',
    organization: 'North Valley Medical Center',
    type: 'hospital',
  },
  {
    id: 'lena-ortiz',
    name: 'Dr. Lena Ortiz',
    role: 'Director of Sterile Processing',
    organization: 'Summit Regional Hospital',
    type: 'hospital',
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'SPM Workflow Administrator',
    organization: 'Summit Regional Hospital',
    type: 'hospital',
  },
  {
    id: 'priya-shah',
    name: 'Priya Shah',
    role: 'Clinical Educator',
    organization: 'Summit Regional Hospital',
    type: 'hospital',
  },
  {
    id: 'marcus-reed',
    name: 'Marcus Reed',
    role: 'Sterile Processing Technician',
    organization: 'Summit Regional Hospital',
    type: 'technician',
  },
  {
    id: 'elena-vasquez',
    name: 'Elena Vasquez',
    role: 'Hospital Quality and Risk Manager',
    organization: 'Summit Regional Hospital',
    type: 'hospital',
  },
]

export const PROTOCOL_CHANGE: ProtocolChange = {
  id: 'AC-2026-014',
  device: 'ES-340 Endoscope',
  manufacturer: 'Aster Medical Devices',
  title: 'Revised distal-channel cleaning procedure',
  issued: 'July 14, 2026',
  deadline: 'July 28, 2026',
  priority: 'High',
  affectedFacility: 'North Valley Medical Center',
  affectedDevices: 0,
  affectedDepartments: [
    'Sterile Processing',
    'Clinical Education',
    'Quality and Risk',
    'Clinical Engineering',
  ],
  affectedProcedures: 7,
  previousProtocol:
    'Flush the distal channel with approved enzymatic detergent for 30 seconds.',
  updatedProtocol:
    'Flush the distal channel with approved enzymatic detergent for 90 seconds using the new ES-340 adapter before automated reprocessing.',
  reason:
    'Internal validation found that the previous 30-second flush may not consistently remove residual material from the distal channel.',
  implementationSteps: [
    'Acknowledge receipt of the manufacturer change',
    'Confirm affected device inventory',
    'Review and approve the revised procedure',
    'Update the STERIS SPM guided workflow',
    'Confirm availability of the ES-340 adapter',
    'Assign updated training to 11 technicians',
    'Verify the revised process is active',
    'Submit final implementation confirmation to the manufacturer',
  ],
}

export const INITIAL_IMPLEMENTATION_STATE: ImplementationState = {
  noticeReceived: false,
  inventoryConfirmed: false,
  procedureApproved: false,
  workflowUpdated: false,
  trainingAssigned: false,
  techniciansAcknowledged: 0,
  totalTechnicians: 11,
  qualityVerificationPending: true,
  finalConfirmationSubmitted: false,
  evidenceUploaded: false,
  expectedImplementationDate: 'Not yet established',
}