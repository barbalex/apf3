import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import gql from 'graphql-tag'

import updateBeobByIdGql from './updateBeobById'

export default async ({ value, row, treeName, client, store }) => {
  const { refetch } = store
  const {
    activeNodeArray: aNA,
    openNodes,
    setActiveNodeArray,
    setOpenNodes,
  } = store[treeName]
  const variables = {
    id: row.id,
    artId: value,
  }
  await client.mutate({
    mutation: updateBeobByIdGql,
    variables,
  })

  if (value) {
    let result = {}
    result = await client.query({
      query: gql`
        query Query($id: UUID!) {
          aeEigenschaftenById(id: $id) {
            id
            apByArtId {
              id
            }
          }
        }
      `,
      variables: { id: value },
    })
    // aNA = activeNodeArray
    const newApId = get(result, 'data.aeEigenschaftenById.apByArtId.id')
    const newANA = [aNA[0], aNA[1], aNA[2], newApId, aNA[4], aNA[5]]
    const oldParentNodeUrl = [...aNA]
    oldParentNodeUrl.pop()
    const oldGParentNodeUrl = [...oldParentNodeUrl]
    oldGParentNodeUrl.pop()

    // need to close:
    // - beobNode
    // - beobNichtBeurteiltFolderNode
    // - apNode

    // then need to open:
    // - new apNode
    // - new beobNichtBeurteiltFolderNode
    // - new beobNode
    const newOpenNodes = [
      ...openNodes.filter(
        n =>
          !isEqual(n, aNA) &&
          !isEqual(n, oldParentNodeUrl) &&
          !isEqual(n, oldGParentNodeUrl),
      ),
      [aNA[0], aNA[1], aNA[2], newApId],
      [aNA[0], aNA[1], aNA[2], newApId, aNA[4]],
      [aNA[0], aNA[1], aNA[2], newApId, aNA[4], aNA[5]],
    ]
    setActiveNodeArray(newANA)
    setOpenNodes(newOpenNodes)
    //refetchTree('local')
    refetch.aps()
    refetch.pops()
    refetch.tpops()
    refetch.beobNichtZuzuordnens()
    if (refetch.beobNichtZuzuordnenForMap) refetch.beobNichtZuzuordnenForMap()
    refetch.beobNichtBeurteilts()
    refetch.beobZugeordnets()
  }
}
