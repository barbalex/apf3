import { gql } from '@apollo/client'

import { beob } from '../../../../../shared/fragments'

export default gql`
  query beobByIdForDelete($id: UUID!) {
    beobById(id: $id) {
      ...BeobFields
    }
  }
  ${beob}
`
