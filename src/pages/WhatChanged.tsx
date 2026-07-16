import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, FileText } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const WhatChanged: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const protocolUpdate = {
    id: id || '1',
    device: 'Infusion Pump X500',
    protocol: 'Cleaning & Sterilization Protocol',
    oldVersion: 'v2.0',
    newVersion: 'v2.1',
    effectiveDate: '2024-07-10',
    summary: 'Updated sterilization procedures to align with new CDC guidelines and manufacturer recommendations.'
  }

  const changes = [
    {
      type: 'added',
      section: 'Daily Cleaning',
      content: 'Added step: Wipe touch screen with approved disinfectant wipes (EPA-registered) after each patient use.',
      reason: 'To reduce cross-contamination risk'
    },
    {
      type: 'modified',
      section: 'Weekly Cleaning',
      oldContent: 'Clean infusion pump housing with mild soap and water.',
      newContent: 'Clean infusion pump housing with 70% isopropyl alcohol solution. Allow to air dry completely.',
      reason: 'Improved disinfection efficacy'
    },
    {
      type: 'removed',
      section: 'Monthly Maintenance',
      content: 'Removed: Manual calibration check (now performed automatically by system).',
      reason: 'System automation eliminates need for manual check'
    },
    {
      type: 'added',
      section: 'Safety Precautions',
      content: 'Added: Always wear nitrile gloves when handling infusion pump components.',
      reason: 'Enhanced personnel safety'
    },
    {
      type: 'modified',
      section: 'Sterilization Process',
      oldContent: 'Autoclave at 121°C for 20 minutes.',
      newContent: 'Autoclave at 121°C for 30 minutes. Follow with 15-minute cooling period.',
      reason: 'Extended sterilization time per new guidelines'
    },
  ]

  const changeTypeStyles = {
    added: 'bg-green-50 border-green-200',
    modified: 'bg-yellow-50 border-yellow-200',
    removed: 'bg-red-50 border-red-200'
  }

  const changeIconStyles = {
    added: 'text-green-600 bg-green-100',
    modified: 'text-yellow-600 bg-yellow-100',
    removed: 'text-red-600 bg-red-100'
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
            <h1 className="text-2xl font-bold text-gray-900">What Changed</h1>
          </div>
        </header>

        <div className="p-8">
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{protocolUpdate.device}</h2>
                <p className="text-gray-600 mt-1">{protocolUpdate.protocol}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">
                  {protocolUpdate.oldVersion}
                </span>
                <FileText size={20} className="text-gray-400" />
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg font-medium">
                  {protocolUpdate.newVersion}
                </span>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800">{protocolUpdate.summary}</p>
              <p className="text-sm text-blue-600 mt-2">Effective: {protocolUpdate.effectiveDate}</p>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Changes Summary</h3>
            {changes.map((change, index) => (
              <Card key={index} className={`p-6 border-l-4 ${changeTypeStyles[change.type as keyof typeof changeTypeStyles]}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${changeIconStyles[change.type as keyof typeof changeIconStyles]}`}>
                    {change.type === 'added' && <Plus size={20} />}
                    {change.type === 'removed' && <Minus size={20} />}
                    {change.type === 'modified' && <FileText size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                        change.type === 'added' ? 'bg-green-100 text-green-800' :
                        change.type === 'removed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {change.type}
                      </span>
                      <span className="font-medium text-gray-900">{change.section}</span>
                    </div>
                    
                    {change.type === 'modified' && (
                      <div className="space-y-2">
                        <div className="bg-red-50 p-3 rounded border border-red-200">
                          <p className="text-sm text-red-800 line-through">{change.oldContent}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                          <p className="text-sm text-green-800">{change.newContent}</p>
                        </div>
                      </div>
                    )}
                    
                    {change.type !== 'modified' && (
                      <div className={`p-3 rounded border ${
                        change.type === 'added' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <p className="text-sm text-gray-700">{change.content}</p>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-500 mt-2 italic">{change.reason}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button onClick={() => navigate(-1)} variant="secondary">
              Close
            </Button>
            <Button onClick={() => navigate(-1)}>
              Acknowledge Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WhatChanged
