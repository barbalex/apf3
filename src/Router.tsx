import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Home from './components/Home'
import Daten from './components/Daten'

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Daten/*" element={<Daten />} />
  </Routes>
)

export default observer(RouterComponent)
