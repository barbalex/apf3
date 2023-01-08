import React from 'react'
import styled from '@emotion/styled'

import Exporte from '../Exporte'
import Tpopkontrzaehl from './Tpopkontrzaehl'
import TpopkontrzaehlEinheitWerte from './TpopkontrzaehlEinheitWerte'
import User from './User'

const Container = styled.div`
  height: 100%;
  width: 100%;

  @media print {
    height: auto;
    border: none;
    overflow: hidden;
  }
`

// TODO:
// Would be great to use subrouter: https://reactrouter.com/en/main/components/routes
// instead of activeNodeArray together with activeForm

const Daten = ({ activeForm }) => {
  let form
  switch (activeForm.form) {
    case 'exporte': {
      form = <Exporte />
      break
    }
    case 'tpopkontrzaehl': {
      form = <Tpopkontrzaehl />
      break
    }
    case 'tpopkontrzaehlEinheitWerte': {
      form = <TpopkontrzaehlEinheitWerte />
      break
    }
    case 'user': {
      form = <User />
      break
    }
    default:
      form = null
  }

  if (!form) return null

  return <Container data-id="daten-container1">{form}</Container>
}

export default Daten
