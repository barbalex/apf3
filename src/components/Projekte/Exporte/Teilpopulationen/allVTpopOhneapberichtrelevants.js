import gql from 'graphql-tag'

export default gql`
  query view {
    allVTpopOhneapberichtrelevants {
      nodes {
        artname
        pop_nr: popNr
        pop_name: popName
        id
        nr
        gemeinde
        flurname
        apber_relevant: apberRelevant
        x
        y
      }
    }
  }
`
