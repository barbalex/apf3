import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../storeContext'
import Projekte from './Projekte'
import Ekf from './Ekf'

const DatenComponent = () => {
  const store = useContext(storeContext)
  const { view } = store

  if (view === 'ekf') return <Ekf />

  return <Projekte />
}

export default observer(DatenComponent)
