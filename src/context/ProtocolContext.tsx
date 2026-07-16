import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ImplementationState, INITIAL_IMPLEMENTATION_STATE } from '../types'

interface ProtocolContextType {
  implementationState: ImplementationState
  updateImplementationState: (updates: Partial<ImplementationState>) => void
  resetImplementationState: () => void
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined)

export function ProtocolProvider({ children }: { children: ReactNode }) {
  const [implementationState, setImplementationState] = useState<ImplementationState>(() => {
    const saved = localStorage.getItem('implementationState')
    return saved ? JSON.parse(saved) : INITIAL_IMPLEMENTATION_STATE
  })

  useEffect(() => {
    localStorage.setItem('implementationState', JSON.stringify(implementationState))
  }, [implementationState])

  const updateImplementationState = (updates: Partial<ImplementationState>) => {
    setImplementationState(prev => ({ ...prev, ...updates }))
  }

  const resetImplementationState = () => {
    setImplementationState(INITIAL_IMPLEMENTATION_STATE)
    localStorage.removeItem('implementationState')
  }

  return (
    <ProtocolContext.Provider value={{ implementationState, updateImplementationState, resetImplementationState }}>
      {children}
    </ProtocolContext.Provider>
  )
}

export function useProtocol() {
  const context = useContext(ProtocolContext)
  if (context === undefined) {
    throw new Error('useProtocol must be used within a ProtocolProvider')
  }
  return context
}
