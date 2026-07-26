import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { ProtocolProvider } from './context/ProtocolContext'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ManufacturerDashboard from './pages/dashboards/ManufacturerDashboard'
import DeviceDetails from './pages/dashboards/DeviceDetails'

function App() {
  return (
    <ProtocolProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/hospital"
            element={<Dashboard />}
          />

          <Route
            path="/hospital/devices/:deviceId"
            element={<DeviceDetails />}
          />

          <Route
            path="/manufacturer-dashboard"
            element={<ManufacturerDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </ProtocolProvider>
  )
}

export default App