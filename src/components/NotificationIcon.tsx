import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import Modal from './Modal'

const NotificationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const notifications = [
    { id: 1, message: 'New protocol update for Infusion Pump X500', time: '2 hours ago', unread: true },
    { id: 2, message: 'Cleaning protocol revised for Ventilator Pro', time: '5 hours ago', unread: true },
    { id: 3, message: 'Safety notice: MRI Scanner Model 3', time: '1 day ago', unread: false },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell size={24} />
        {notifications.some(n => n.unread) && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-medical-red rounded-full border-2 border-white" />
        )}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Notifications"
      >
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${notification.unread ? 'bg-primary-50 border-l-4 border-primary-600' : 'bg-gray-50'}`}
            >
              <p className="text-gray-900">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default NotificationIcon
