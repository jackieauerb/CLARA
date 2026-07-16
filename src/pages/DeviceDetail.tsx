import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Scan, FileText, Shield, Wrench, AlertTriangle, Download } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const device = {
    id: id || '1',
    name: 'Infusion Pump X500',
    model: 'IP-X500-2024',
    serialNumber: 'SN-2024-00452',
    protocolVersion: 'v2.1',
    status: 'Active',
    lastUpdated: '2024-07-10',
    manufacturer: 'MedTech Corp',
    location: 'ICU Unit - Bed 12'
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'cleaning', label: 'Cleaning', icon: Scan },
    { id: 'sterilization', label: 'Sterilization', icon: Shield },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'safety', label: 'Safety Notices', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FileText },
  ]

  const tabContent = {
    overview: (
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Model Number</p>
              <p className="font-medium text-gray-900">{device.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Serial Number</p>
              <p className="font-medium text-gray-900">{device.serialNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Protocol Version</p>
              <p className="font-medium text-gray-900">{device.protocolVersion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {device.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Manufacturer</p>
              <p className="font-medium text-gray-900">{device.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{device.location}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
              <div>
                <p className="text-gray-900">Protocol updated to v2.1</p>
                <p className="text-sm text-gray-500">2024-07-10</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
              <div>
                <p className="text-gray-900">Routine maintenance completed</p>
                <p className="text-sm text-gray-500">2024-07-05</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
              <div>
                <p className="text-gray-900">Device installed at ICU Unit</p>
                <p className="text-sm text-gray-500">2024-06-15</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    ),
    cleaning: (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleaning Protocol</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-800 font-medium">Last updated: July 10, 2024</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Daily Cleaning</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Wipe exterior surfaces with 70% isopropyl alcohol</li>
              <li>Clean touch screen with approved disinfectant wipes</li>
              <li>Inspect power cords for damage</li>
            </ol>
            <h4 className="font-medium text-gray-900 mt-4">Weekly Cleaning</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Deep clean infusion pump housing</li>
              <li>Sanitize all connection ports</li>
              <li>Check and clean air vents</li>
            </ol>
          </div>
          <Button variant="outline" className="mt-4">
            <Download size={20} className="mr-2" />
            Download Full Protocol
          </Button>
        </div>
      </Card>
    ),
    sterilization: (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sterilization Protocol</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 font-medium">Requires certified sterilization technician</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Pre-Sterilization</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Disconnect all power sources</li>
              <li>Remove all disposable components</li>
              <li>Perform preliminary cleaning</li>
            </ol>
            <h4 className="font-medium text-gray-900 mt-4">Sterilization Process</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Use autoclave at 121°C for 30 minutes</li>
              <li>Allow cooling period of 15 minutes</li>
              <li>Inspect for any damage post-sterilization</li>
            </ol>
          </div>
          <Button variant="outline" className="mt-4">
            <Download size={20} className="mr-2" />
            Download Full Protocol
          </Button>
        </div>
      </Card>
    ),
    maintenance: (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Daily Inspection</p>
                <p className="text-sm text-gray-500">Visual check, battery test</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">On Track</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Weekly Calibration</p>
                <p className="text-sm text-gray-500">Flow rate accuracy test</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">On Track</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Monthly Service</p>
                <p className="text-sm text-gray-500">Full system diagnostic</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Due in 5 days</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Annual Overhaul</p>
                <p className="text-sm text-gray-500">Complete replacement of wear parts</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Dec 2024</span>
            </div>
          </div>
        </div>
      </Card>
    ),
    safety: (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Notices</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-red-900">Urgent: Battery Recall</p>
                <p className="text-sm text-red-700 mt-1">Certain battery models may overheat. Check serial number immediately.</p>
              </div>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">URGENT</span>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-yellow-900">Software Update Required</p>
                <p className="text-sm text-yellow-700 mt-1">Update to v2.1 to address minor display issues.</p>
              </div>
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">WARNING</span>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-blue-900">Updated Cleaning Guidelines</p>
                <p className="text-sm text-blue-700 mt-1">New sterilization protocol effective July 2024.</p>
              </div>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">INFO</span>
            </div>
          </div>
        </div>
      </Card>
    ),
    documents: (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">User Manual v2.1</p>
                <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Cleaning Protocol</p>
                <p className="text-sm text-gray-500">PDF • 1.1 MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Maintenance Schedule</p>
                <p className="text-sm text-gray-500">PDF • 0.8 MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Safety Data Sheet</p>
                <p className="text-sm text-gray-500">PDF • 0.5 MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    ),
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary-600">MedProtocol</h1>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{device.name}</h1>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-6 border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            {tabContent[activeTab as keyof typeof tabContent]}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DeviceDetail
