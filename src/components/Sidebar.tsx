import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Activity, Bell, CheckSquare, Shield, LayoutDashboard, Package, FileText, Building, BarChart3 } from 'lucide-react'

interface SidebarProps {
  type: 'hospital' | 'manufacturer'
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const hospitalItems = [
    { icon: Home, label: 'Home', path: '/hospital' },
    { icon: Package, label: 'Devices', path: '/hospital/devices' },
    { icon: Bell, label: 'Updates', path: '/hospital/updates' },
    { icon: CheckSquare, label: 'Tasks', path: '/hospital/tasks' },
    { icon: Shield, label: 'Compliance', path: '/hospital/compliance' },
  ]

  const manufacturerItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/manufacturer' },
    { icon: Package, label: 'Devices', path: '/manufacturer/devices' },
    { icon: FileText, label: 'Protocols', path: '/manufacturer/protocols' },
    { icon: Building, label: 'Hospitals', path: '/manufacturer/hospitals' },
    { icon: BarChart3, label: 'Analytics', path: '/manufacturer/analytics' },
  ]

  const items = type === 'hospital' ? hospitalItems : manufacturerItems

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-600">MedProtocol</h1>
      </div>
      <nav className="mt-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
