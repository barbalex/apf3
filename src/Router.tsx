import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Home from './components/Home'
import Daten from './components/Daten'
import EkPlan from './components/EkPlan'
import FourOhFour from './components/404'
import Docs from './components/Docs'
import WasKannApflora from './components/Docs/docs/WasKannApflora'
import TechnischeVoraussetzungen from './components/Docs/docs/TechnischeVoraussetzungen'
import TippsFuerDenEinstieg from './components/Docs/docs/TippsFuerDenEinstieg'
import VideosFuerDenEinstieg from './components/Docs/docs/VideosFuerDenEinstieg'
import AnleitungZurEingabe from './components/Docs/docs/AnleitungZurEingabe'
// import Unterhalt from './components/Unterhalt'

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* uncommeent next rout while commenting the following for Unterhalt */}
    {/* <Route path="/*" element={<Unterhalt />}></Route> */}
    <Route path="/Daten/*" element={<Daten />}></Route>
    <Route path="/Daten/Projekte/:projektId/EK-Planung" element={<EkPlan />} />
    <Route path="/Dokumentation/*" element={<Docs />}>
      <Route
        path="was-kann-man-mit-apflora-machen"
        element={<WasKannApflora />}
      />
      <Route
        path="technische-voraussetzungen"
        element={<TechnischeVoraussetzungen />}
      />
      <Route
        path="tipps-fuer-den-einstieg"
        element={<TippsFuerDenEinstieg />}
      />
      <Route
        path="videos-fuer-den-einstieg"
        element={<VideosFuerDenEinstieg />}
      />
      <Route path="anleitung-eingabe" element={<AnleitungZurEingabe />} />
    </Route>
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default observer(RouterComponent)
