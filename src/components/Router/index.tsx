import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../Home'
import EkPlan from '../EkPlan'
import FourOhFour from '../404'
import DocRoutes from './DocRoutes'
import Docs from '../Docs'
import ProtectedRoute from './ProtectedRoute'
import Ekf from '../Ekf'
import Projekte from '../Projekte'
// import Unterhalt from './components/Unterhalt'
const ekfRefYear = new Date().getFullYear()

// uncomment unterhalt route for Unterhalt
// REMEMBER: Anything using path variables does not work in tree2!
// Thus Benutzer were removed from tree2
const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Daten/*" element={<ProtectedRoute />}>
      {/* <Route path="*" element={<Unterhalt />}></Route> */}
      <Route path="*" element={<Projekte />} />
      <Route path="Projekte/:projId/EK-Planung" element={<EkPlan />} />
      <Route path="Benutzer/:userId/*" element={<Projekte />} />
      <Route
        path="Benutzer/:userId/EKF/*"
        element={<Navigate to={ekfRefYear.toString()} />}
      />
      <Route path="Benutzer/:userId/EKF/:ekfYear/*" element={<Ekf />} />
      <Route path="Benutzer/:userId/EKF/:ekfYear/:ekfId" element={<Ekf />} />
    </Route>
    <Route path="/Dokumentation/*" element={<Docs />}>
      {DocRoutes()}
    </Route>
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default RouterComponent
