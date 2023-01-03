import { Routes, Route } from 'react-router-dom'

import Home from '../Home'
import Daten from '../Daten'
import EkPlan from '../EkPlan'
import FourOhFour from '../404'
import DocRoutes from './DocRoutes'
import Docs from '../Docs'
import ProtectedRoute from './ProtectedRoute'
// import Unterhalt from './components/Unterhalt'

// uncommeent unterhalt route for Unterhalt
const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Daten/*" element={<ProtectedRoute />}>
      {/* <Route path="*" element={<Unterhalt />}></Route> */}
      <Route path="*" element={<Daten />} />
      <Route path="Projekte/:projektId/EK-Planung" element={<EkPlan />} />
    </Route>
    <Route path="/Dokumentation/*" element={<Docs />}>
      {DocRoutes()}
    </Route>
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default RouterComponent
