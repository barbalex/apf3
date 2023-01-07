import React from 'react'
import styled from '@emotion/styled'

import Adresse from './Adresse'
import Ap from './Ap'
import Apart from './Apart'
import Apber from './Apber'
import Apberuebersicht from './Apberuebersicht'
import Assozart from './Assozart'
import Beobzuordnung from './Beobzuordnung'
import CurrentIssue from './CurrentIssue'
import Messages from './Messages'
import Ekzaehleinheit from './Ekzaehleinheit'
import Ekfrequenz from './Ekfrequenz'
import Erfkrit from './Erfkrit'
import Exporte from '../Exporte'
import Idealbiotop from './Idealbiotop'
import Pop from './Pop'
import Popber from './Popber'
import Popmassnber from './Popmassnber'
import Projekt from './Projekt'
import Qk from './Qk'
import Tpop from './Tpop'
import Tpopber from './Tpopber'
import Tpopfeldkontr from './Tpopfeldkontr'
import Tpopfreiwkontr from './Tpopfreiwkontr'
import Tpopkontrzaehl from './Tpopkontrzaehl'
import TpopkontrzaehlEinheitWerte from './TpopkontrzaehlEinheitWerte'
import Tpopmassn from './Tpopmassn'
import Tpopmassnber from './Tpopmassnber'
import User from './User'
import Werte from './Werte'
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

// Explainer:
// Would be great to use subrouter: https://reactrouter.com/en/main/components/routes
// instead of activeNodeArray together with activeForm
// But is NOT POSSIBLE: because url/activeNodeArray is needed for BOTH trees
// and only one url/pathname exists
// => only tree1 could be navigated using url path
// Only possible alternative: opening in new window/browser-tab instead of new app-tab

const Daten = ({ treeName, activeForm }) => {
  let form
  switch (activeForm.form) {
    case 'adresse': {
      form = <Adresse />
      break
    }
    case 'werte': {
      form = <Werte table={activeForm.type} />
      break
    }
    case 'ap': {
      form = <Ap />
      break
    }
    case 'apberuebersicht': {
      form = <Apberuebersicht />
      break
    }
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
    case 'beobzuordnung': {
      form = <Beobzuordnung type={activeForm.type} />
      break
    }
    case 'currentIssue': {
      form = <CurrentIssue treeName={treeName} />
      break
    }
    case 'message': {
      form = <Messages />
      break
    }
    case 'ekzaehleinheit': {
      form = <Ekzaehleinheit treeName={treeName} />
      break
    }
    case 'ekfrequenz': {
      form = <Ekfrequenz treeName={treeName} />
      break
    }
    case 'erfkrit': {
      form = <Erfkrit treeName={treeName} />
      break
    }
    case 'exporte': {
      form = <Exporte treeName={treeName} />
      break
    }
    case 'idealbiotop': {
      form = <Idealbiotop treeName={treeName} />
      break
    }
    case 'pop': {
      form = <Pop treeName={treeName} />
      break
    }
    case 'popber': {
      form = <Popber treeName={treeName} />
      break
    }
    case 'popmassnber': {
      form = <Popmassnber treeName={treeName} />
      break
    }
    case 'projekt': {
      form = <Projekt treeName={treeName} />
      break
    }
    case 'qk': {
      form = <Qk treeName={treeName} />
      break
    }
    case 'tpop': {
      form = <Tpop treeName={treeName} />
      break
    }
    case 'tpopber': {
      form = <Tpopber treeName={treeName} />
      break
    }
    case 'tpopfeldkontr': {
      form = <Tpopfeldkontr treeName={treeName} />
      break
    }
    case 'tpopfreiwkontr': {
      form = <Tpopfreiwkontr treeName={treeName} />
      break
    }
    case 'tpopkontrzaehl': {
      form = <Tpopkontrzaehl treeName={treeName} />
      break
    }
    case 'tpopkontrzaehlEinheitWerte': {
      form = <TpopkontrzaehlEinheitWerte treeName={treeName} />
      break
    }
    case 'tpopmassn': {
      form = <Tpopmassn treeName={treeName} />
      break
    }
    case 'tpopmassnber': {
      form = <Tpopmassnber treeName={treeName} />
      break
    }
    case 'user': {
      form = <User treeName={treeName} />
      break
    }
    case 'ziel': {
      form = <Ziel treeName={treeName} />
      break
    }
    case 'zielber': {
      form = <Zielber treeName={treeName} />
      break
    }
    default:
      form = null
  }

  if (!form) return null

  return (
    <Container data-id={`daten-container${treeName === 'tree' ? 1 : 2}`}>
      {form}
    </Container>
  )
}

export default Daten
