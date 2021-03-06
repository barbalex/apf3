import gql from 'graphql-tag'

import { beob } from '../../components/shared/fragments'

export default gql`
  query Query($id: UUID!) {
    beobById(id: $id) {
      ...BeobFields
    }
  }
  ${beob}
`
