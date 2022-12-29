import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Home from './components/Home'
import Daten from './components/Daten'

// TODO: check if passing appbarheight causes bad rerenders
const RouterComponent = ({ appbarheight }) => {
  return (
    <Routes>
      <Route path="/" element={<Home appbarheight={appbarheight} />} />
      <Route path="/Daten/*" element={<Daten />} />
    </Routes>
  )
}

export default observer(RouterComponent)
