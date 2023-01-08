import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import storeContext from '../../storeContext'
import Home from '../Home'
import EkPlan from '../EkPlan'
import FourOhFour from '../404'
import DocRoutes from './DocRoutes'
import Docs from '../Docs'
import ProtectedRoute from './ProtectedRoute'
import Ekf from '../Ekf'
import Projekte from '../Projekte'
import Projekt from '../Projekte/Daten/Projekt'
import Apberuebersicht from '../Projekte/Daten/Apberuebersicht'
import ApberForYear from '../Print/ApberForYear/ApberForYear'
import User from '../Projekte/Daten/User'
import Adresse from '../Projekte/Daten/Adresse'
import Werte from '../Projekte/Daten/Werte'
import Messages from '../Projekte/Daten/Messages'
import CurrentIssue from '../Projekte/Daten/CurrentIssue'
import Ap from '../Projekte/Daten/Ap'
import Apber from '../Projekte/Daten/Apber'
// import Unterhalt from './components/Unterhalt'
const ekfRefYear = new Date().getFullYear()

// uncomment unterhalt route for Unterhalt
const RouterComponent = () => {
  const store = useContext(storeContext)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Daten/*" element={<ProtectedRoute />}>
        {/* <Route path="*" element={<Unterhalt />}></Route> */}
        <Route path="*" element={<Projekte />}>
          <Route path="Werte-Listen/Adressen/:adrId" element={<Adresse />} />
          <Route
            path="Werte-Listen/ApberrelevantGrundWerte/:wertId"
            element={<Werte table="tpopApberrelevantGrundWerte" />}
          />
          <Route
            path="Werte-Listen/EkAbrechnungstypWerte/:wertId"
            element={<Werte table="ekAbrechnungstypWerte" />}
          />
          <Route
            path="Werte-Listen/TpopkontrzaehlEinheitWerte/:wertId"
            element={<Werte table="tpopkontrzaehlEinheitWerte" />}
          />
          <Route path="Mitteilungen" element={<Messages />} />
          <Route path="Aktuelle-Fehler/:issueId" element={<CurrentIssue />} />
          <Route path="Projekte/:projId/EK-Planung" element={<EkPlan />} />
          <Route path="Projekte/:projId/*" element={<Projekt />} />
          <Route
            path="Projekte/:projId/AP-Berichte/:apberUebersichtId"
            element={<Apberuebersicht />}
          />
          <Route
            path="Projekte/:projId/AP-Berichte/:apberUebersichtId/print"
            element={<ApberForYear />}
          />
          <Route path="Projekte/:projId/Arten/:apId" element={<Ap />} />
          <Route path="Benutzer/:userId/*" element={<User />} />
          <Route
            path="Benutzer/:userId/EKF/*"
            element={<Navigate to={ekfRefYear.toString()} />}
          />
          <Route path="Benutzer/:userId/EKF/:ekfYear/*" element={<Ekf />} />
          <Route
            path="Benutzer/:userId/EKF/:ekfYear/:ekfId"
            element={<Ekf />}
          />
        </Route>
      </Route>
      <Route path="/Dokumentation/*" element={<Docs />}>
        {DocRoutes()}
      </Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  )
}

export default RouterComponent
