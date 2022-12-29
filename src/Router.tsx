import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Home from './components/Home'
import Daten from './components/Daten'
import EkPlan from './components/EkPlan'
import FourOhFour from './components/404'
// import Unterhalt from './components/Unterhalt'

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* uncommeent next rout while commenting the following for Unterhalt */}
    {/* <Route path="/*" element={<Unterhalt />}></Route> */}
    <Route path="/Daten/*" element={<Daten />}></Route>
    <Route path="/Daten/Projekte/:projektId/EK-Planung" element={<EkPlan />} />
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default observer(RouterComponent)
