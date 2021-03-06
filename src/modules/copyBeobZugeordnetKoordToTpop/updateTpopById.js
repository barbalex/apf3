import gql from 'graphql-tag'

export default gql`
  mutation updateTpopById($id: UUID!, $x: Int, $y: Int) {
    updateTpopById(input: { id: $id, tpopPatch: { x: $x, y: $y } }) {
      tpop {
        id
        x
        y
      }
    }
  }
`
