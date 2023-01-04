import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import Home from '../Home'
import EkPlan from '../EkPlan'
import FourOhFour from '../404'
import DocRoutes from './DocRoutes'
import Docs from '../Docs'
import ProtectedRoute from './ProtectedRoute'
import Ekf from '../Ekf'
import Projekte from '../Projekte'
import storeContext from '../../storeContext'
// import Unterhalt from './components/Unterhalt'

// uncommeent unterhalt route for Unterhalt
const RouterComponent = () => {
  const store = useContext(storeContext)
  const { view } = store

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Daten/*" element={<ProtectedRoute />}>
        {/* <Route path="*" element={<Unterhalt />}></Route> */}
        <Route
          path="projekte/:projId/*"
          element={view === 'ekf' ? <Ekf /> : <Projekte />}
        />
        <Route
          path="projekte/:projId/Arten/:artId/*"
          element={view === 'ekf' ? <Ekf /> : <Projekte />}
        />
        <Route path="Projekte/:projId/EK-Planung" element={<EkPlan />} />
      </Route>
      <Route path="/Dokumentation/*" element={<Docs />}>
        {DocRoutes()}
      </Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  )
}

export default observer(RouterComponent)
