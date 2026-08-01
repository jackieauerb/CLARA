export interface User {
  id: string
  name: string
  role: string
  organization: string
  type: 'manufacturer' | 'hospital' | 'technician'
}

export interface DemoAccount {
  email: string
  password: string
  userId: string
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

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'maya@astermedical.com',
    password: 'demo123',
    userId: 'maya-chen',
  },
  {
    email: 'emily@northvalleymed.org',
    password: 'demo123',
    userId: 'emily-carter',
  },
  {
    email: 'lena@summitregional.com',
    password: 'demo123',
    userId: 'lena-ortiz',
  },
  {
    email: 'jordan@summitregional.com',
    password: 'demo123',
    userId: 'jordan-lee',
  },
  {
    email: 'priya@summitregional.com',
    password: 'demo123',
    userId: 'priya-shah',
  },
  {
    email: 'marcus@summitregional.com',
    password: 'demo123',
    userId: 'marcus-reed',
  },
  {
    email: 'elena@summitregional.com',
    password: 'demo123',
    userId: 'elena-vasquez',
  },
]
