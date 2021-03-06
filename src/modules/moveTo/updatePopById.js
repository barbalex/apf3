import gql from 'graphql-tag'

import { pop } from '../../components/shared/fragments'

export default gql`
  mutation updatePopById($id: UUID!, $apId: UUID) {
    updatePopById(input: { id: $id, popPatch: { apId: $apId } }) {
      pop {
        ...PopFields
      }
    }
  }
  ${pop}
`
