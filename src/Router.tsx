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
import IstApfloraLangsam from './components/Docs/docs/IstApfloraLangsam'
import ArtAuswertungPopMenge from './components/Docs/docs/ArtAuswertungPopMenge'
import BeobZuordnen from './components/Docs/docs/BeobZuordnen'
import FalschBestimmteBeob from './components/Docs/docs/FalschBestimmteBeob'
import EkPlanen from './components/Docs/docs/EkPlanen'
import BenutzerKonti from './components/Docs/docs/BenutzerKonti'
import Ekf from './components/Docs/docs/Ekf'
import Filter from './components/Docs/docs/Filter'
import Markdown from './components/Docs/docs/markdown'
import Historisierung from './components/Docs/docs/Historisierung'
import KarteTpopAllerArten from './components/Docs/docs/KarteTpopAllerArten'
import KarteFilter from './components/Docs/docs/KarteFilter'
import KartePopTpopIconsLabelWaehlen from './components/Docs/docs/KartePopTpopIconsLabelWaehlen'
import KarteMassstab from './components/Docs/docs/KarteMassstab'
import KarteDrucken from './components/Docs/docs/KarteDrucken'
import Gedaechtnis from './components/Docs/docs/Gedaechtnis'
import Dateien from './components/Docs/docs/Dateien'
import Koordinaten from './components/Docs/docs/Koordinaten'
import Melden from './components/Docs/docs/Melden'
import Pwa from './components/Docs/docs/Pwa'
import Technologien from './components/Docs/docs/Technologien'
import BeobVerwalten from './components/Docs/docs/BeobVerwalten'
import ProdukteFuerFNS from './components/Docs/docs/ProdukteFuerFNS'
import DatenSichern from './components/Docs/docs/DatenSichern'
import DatenWiederherstellen from './components/Docs/docs/DatenWiederherstellen'
import Testen from './components/Docs/docs/Testen'
import Geschichte from './components/Docs/docs/Geschichte'
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
      <Route path="ist-apflora-langsam" element={<IstApfloraLangsam />} />
      <Route
        path="art-auswertung-pop-menge"
        element={<ArtAuswertungPopMenge />}
      />
      <Route
        path="beobachtungen-einer-teil-population-zuordnen"
        element={<BeobZuordnen />}
      />
      <Route
        path="falsch-bestimmte-beobachtungen"
        element={<FalschBestimmteBeob />}
      />
      <Route path="erfolgs-kontrollen-planen" element={<EkPlanen />} />
      <Route path="benutzer-konti" element={<BenutzerKonti />} />
      <Route path="erfolgs-kontrollen-freiwillige" element={<Ekf />} />
      <Route path="filter" element={<Filter />} />
      <Route path="markdown" element={<Markdown />} />
      <Route path="historisierung" element={<Historisierung />} />
      <Route
        path="karte-teil-populationen-aller-arten-anzeigen"
        element={<KarteTpopAllerArten />}
      />
      <Route path="karte-filter" element={<KarteFilter />} />
      <Route
        path="karte-symbole-und-label-fuer-populationen-und-teil-populationen-waehlen"
        element={<KartePopTpopIconsLabelWaehlen />}
      />
      <Route path="karte-massstab" element={<KarteMassstab />} />
      <Route path="karte-drucken" element={<KarteDrucken />} />
      <Route path="gedaechtnis" element={<Gedaechtnis />} />
      <Route path="dateien" element={<Dateien />} />
      <Route path="koordinaten" element={<Koordinaten />} />
      <Route path="melden" element={<Melden />} />
      <Route path="pwa" element={<Pwa />} />
      <Route path="technologien" element={<Technologien />} />
      <Route path="beobachtungen-verwalten" element={<BeobVerwalten />} />
      <Route path="produkte-fuer-die-fns" element={<ProdukteFuerFNS />} />
      <Route path="daten-sichern" element={<DatenSichern />} />
      <Route
        path="daten-wiederherstellen"
        element={<DatenWiederherstellen />}
      />
      <Route path="testen" element={<Testen />} />
      <Route path="geschichte" element={<Geschichte />} />
    </Route>
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default observer(RouterComponent)
