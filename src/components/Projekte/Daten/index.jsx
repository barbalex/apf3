import React from 'react'
import styled from '@emotion/styled'

import Apart from './Apart'
import Apber from './Apber'
import Assozart from './Assozart'
import Erfkrit from './Erfkrit'
import Exporte from '../Exporte'
import Idealbiotop from './Idealbiotop'
import Pop from './Pop'
import Popber from './Popber'
import Popmassnber from './Popmassnber'
import Projekt from './Projekt'
import Tpop from './Tpop'
import Tpopber from './Tpopber'
import Tpopfeldkontr from './Tpopfeldkontr'
import Tpopfreiwkontr from './Tpopfreiwkontr'
import Tpopkontrzaehl from './Tpopkontrzaehl'
import TpopkontrzaehlEinheitWerte from './TpopkontrzaehlEinheitWerte'
import Tpopmassn from './Tpopmassn'
import Tpopmassnber from './Tpopmassnber'
import User from './User'
import Ziel from './Ziel'
import Zielber from './Zielber'

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
    case 'apart': {
      form = <Apart />
      break
    }
    case 'apber': {
      form = <Apber />
      break
    }
    case 'assozart': {
      form = <Assozart />
      break
    }
    case 'erfkrit': {
      form = <Erfkrit />
      break
    }
    case 'exporte': {
      form = <Exporte />
      break
    }
    case 'idealbiotop': {
      form = <Idealbiotop />
      break
    }
    case 'pop': {
      form = <Pop />
      break
    }
    case 'popber': {
      form = <Popber />
      break
    }
    case 'popmassnber': {
      form = <Popmassnber />
      break
    }
    case 'projekt': {
      form = <Projekt />
      break
    }
    case 'tpop': {
      form = <Tpop />
      break
    }
    case 'tpopber': {
      form = <Tpopber />
      break
    }
    case 'tpopfeldkontr': {
      form = <Tpopfeldkontr />
      break
    }
    case 'tpopfreiwkontr': {
      form = <Tpopfreiwkontr />
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
    case 'tpopmassn': {
      form = <Tpopmassn />
      break
    }
    case 'tpopmassnber': {
      form = <Tpopmassnber />
      break
    }
    case 'user': {
      form = <User />
      break
    }
    case 'ziel': {
      form = <Ziel />
      break
    }
    case 'zielber': {
      form = <Zielber />
      break
    }
    default:
      form = null
  }

  if (!form) return null

  return <Container data-id="daten-container1">{form}</Container>
}

export default Daten
