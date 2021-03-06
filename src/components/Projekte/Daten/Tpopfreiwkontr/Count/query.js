import gql from 'graphql-tag'

import {
  tpopkontrzaehl,
  tpopkontrzaehlEinheitWerte,
} from '../../../../shared/fragments'

export default gql`
  query TpopkontrzaehlQuery($id: UUID!) {
    tpopkontrzaehlById(id: $id) {
      ...TpopkontrzaehlFields
      tpopkontrzaehlEinheitWerteByEinheit {
        ...TpopkontrzaehlEinheitWerteFields
      }
    }
  }
  ${tpopkontrzaehl}
  ${tpopkontrzaehlEinheitWerte}
`
