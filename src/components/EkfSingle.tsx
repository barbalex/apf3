import React from 'react'
import { useParams } from 'react-router-dom'

import Tpopfreiwkontr from './Projekte/Daten/Tpopfreiwkontr'

const EkfSingle = () => {
  const { ekfId } = useParams()

  return <Tpopfreiwkontr treeName="tree" id={ekfId} />
}

export default EkfSingle
