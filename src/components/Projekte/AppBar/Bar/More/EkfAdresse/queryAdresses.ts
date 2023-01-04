import { gql } from '@apollo/client'

export default gql`
  query adrQuery {
    allAdresses(
      orderBy: NAME_ASC
      filter: {
        usersByAdresseId: { some: { role: { equalTo: "apflora_freiwillig" } } }
      }
    ) {
      nodes {
        value: id
        label: name
        users: usersByAdresseId {
          nodes {
            id
          }
        }
      }
    }
  }
`
