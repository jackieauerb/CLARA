import React from 'react'
import { useNavigate } from 'react-router-dom'

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate()
  const dashboardCards = [
    { title: 'Urgent Updates', count: 3, color: 'bg-red-50', textColor: 'text-red-600' },
    { title: 'Pending Reviews', count: 7, color: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { title: 'Completed', count: 45, color: 'bg-green-50', textColor: 'text-green-600' },
  ]

  const recentDevices = [
    { id: '1', name: 'Infusion Pump X500', model: 'IP-X500-2024', status: 'Active' },
    { id: '2', name: 'Ventilator Pro', model: 'VP-PRO-2023', status: 'Active' },
    { id: '3', name: 'MRI Scanner Model 3', model: 'MRI-M3-2022', status: 'Maintenance' },
  ]

  const updates = [
    {
      id: 1,
      device: 'Infusion Pump X500',
      title: 'Updated cleaning protocol for infusion lines',
      urgency: 'high',
      deadline: '2024-07-20',
      description: 'New sterilization procedure for infusion pump tubing to reduce infection risk.'
    },
    {
      id: 2,
      device: 'Ventilator Pro',
      title: 'Safety notice: Filter replacement interval',
      urgency: 'medium',
      deadline: '2024-07-25',
      description: 'Updated filter replacement schedule based on new manufacturer guidelines.'
    },
    {
      id: 3,
      device: 'Patient Monitor V2',
      title: 'Software update v2.3.1',
      urgency: 'low',
      deadline: '2024-08-01',
      description: 'Minor bug fixes and performance improvements for patient monitoring system.'
    },
  ]

  const urgencyColors = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-gray-500 text-white'
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
        <div className="p-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-xl font-bold text-blue-600">MedProtocol</h1>
        </div>
        <nav className="mt-4">
          {['Home', 'Devices', 'Updates', 'Tasks', 'Compliance'].map((item) => (
            <button
              key={item}
              className="w-full flex items-center px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{item}</span>
            </button>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search devices, protocols, updates..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 ml-8">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-sm text-gray-500">ICU Unit</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Device Protocol Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardCards.map((card) => (
                <div key={card.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
                    </div>
                    <div className={`${card.color} p-4 rounded-lg`}>
                      <span className="text-3xl">📊</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Device Search</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Scan Device
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by device name, model, or serial number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentDevices.map((device) => (
                <div key={device.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      device.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {device.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{device.name}</h3>
                  <p className="text-sm text-gray-500">{device.model}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates Requiring Attention</h2>
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyColors[update.urgency as keyof typeof urgencyColors]}`}>
                          {update.urgency.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">Deadline: {update.deadline}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{update.device}</h3>
                      <p className="text-gray-700 mb-3">{update.title}</p>
                      <p className="text-sm text-gray-500">{update.description}</p>
                    </div>
                    <div className="ml-4">
                      <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50">
                        Review Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HospitalDashboard
