import { Routes, Route } from 'react-router-dom'

import Home from '../Home'
import Daten from '../Daten'
import EkPlan from '../EkPlan'
import FourOhFour from '../404'
import DocsRoutes from './DocsRoutes'
import Docs from '../Docs'
// import Unterhalt from './components/Unterhalt'

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* uncommeent next rout while commenting the following for Unterhalt */}
    {/* <Route path="/*" element={<Unterhalt />}></Route> */}
    <Route path="/Daten/*">
      <Route path="*" element={<Daten />} />
      <Route path="Projekte/:projektId/EK-Planung" element={<EkPlan />} />
    </Route>
    <Route path="/Dokumentation/*" element={<Docs />}>
      {DocsRoutes()}
    </Route>
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default RouterComponent
