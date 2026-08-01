import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import HospitalDashboard from './pages/hospital/HospitalDashboard'
import DeviceDetails from './pages/hospital/DeviceDetails'
import ManufacturerDashboard from './pages/manufacturer/ManufacturerDashboard'

function App() {
  return (
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
          element={<HospitalDashboard />}
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
  )
}

export default App