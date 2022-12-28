import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'

const RouterComponent = ({ appbarheight }) => {
  return (
    <Routes>
      <Route path="/" element={<Home appbarheight={appbarheight} />} />
    </Routes>
  )
}

export default RouterComponent
