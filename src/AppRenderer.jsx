import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const AppRenderer = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default AppRenderer
