import findIndex from 'lodash/findIndex'

const apartFolderNode = ({
  nodes: nodesPassed,
  data,
  loading,
  projektNodes,
  projId,
  apNodes,
  apId,
  store,
}) => {
  // return empty if ap is not a real ap and apFilter is set
  const ap = (data?.allAps?.nodes ?? []).find((n) => n.id === apId)
  const isAp = ap && [1, 2, 3].includes(ap.bearbeitung) //@485
  const apFilter = store.tree?.apFilter
  if (!!apFilter && !isAp) return []

  const count = (data?.allAparts?.nodes ?? []).filter(
    (n) => n.apId === apId,
  ).length

  // fetch sorting indexes of parents
  const projIndex = findIndex(projektNodes, {
    id: projId,
  })
  const apIndex = findIndex(apNodes, {
    id: apId,
  })
  const nodeLabelFilterString = store.tree?.nodeLabelFilter?.apart ?? ''

  const message = loading
    ? '...'
    : nodeLabelFilterString
    ? `${count} gefiltert`
    : count

  // only show if parent node exists
  const apNodesIds = nodesPassed.map((n) => n.id)
  if (!apNodesIds.includes(apId)) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'apartFolder',
      filterTable: 'apart',
      id: `${apId}Apart`,
      tableId: apId,
      urlLabel: 'Taxa',
      label: `Taxa (${message})`,
      url: ['Projekte', projId, 'Arten', apId, 'Taxa'],
      sort: [projIndex, 1, apIndex, 7],
      hasChildren: count > 0,
    },
  ]
}

export default apartFolderNode
