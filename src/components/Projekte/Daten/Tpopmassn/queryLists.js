import gql from 'graphql-tag'

export default gql`
  query TpopmassnListsQuery {
    allTpopmassnTypWertes(orderBy: SORT_ASC) {
      nodes {
        value: code
        label: text
      }
    }
  }
`
