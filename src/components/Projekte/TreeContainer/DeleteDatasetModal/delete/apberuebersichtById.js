import gql from 'graphql-tag'

import { apberuebersicht } from '../../../../shared/fragments'

export default gql`
  query apberuebersichtById($id: UUID!) {
    apberuebersichtById(id: $id) {
      ...ApberuebersichtFields
    }
  }
  ${apberuebersicht}
`
