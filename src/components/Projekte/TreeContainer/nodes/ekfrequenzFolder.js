import findIndex from 'lodash/findIndex'

const ekfrequenzFolderNode = ({
  nodes: nodesPassed,
  data,
  loading,
  projektNodes,
  projId,
  apNodes,
  apId,
  store,
}) => {
  const count = data?.allEkfrequenzs?.totalCount ?? 0

  // fetch sorting indexes of parents
  const projIndex = findIndex(projektNodes, {
    id: projId,
  })
  const apIndex = findIndex(apNodes, {
    id: apId,
  })
  const nodeLabelFilterString = store.tree?.nodeLabelFilter?.ekfrequenz ?? ''

  const message = loading
    ? '...'
    : nodeLabelFilterString
    ? `${count} gefiltert`
    : count

  const url = ['Projekte', projId, 'Arten', apId, 'EK-Frequenzen']

  // only show if parent node exists
  const apNodesIds = nodesPassed.map((n) => n.id)
  if (!apNodesIds.includes(apId)) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'ekfrequenzFolder',
      filterTable: 'ekfrequenz',
      id: `${apId}Ekfrequenz`,
      tableId: apId,
      urlLabel: 'EK-Frequenzen',
      label: `EK-Frequenzen (${message})`,
      url,
      sort: [projIndex, 1, apIndex, 9],
      hasChildren: count > 0,
    },
  ]
}

export default ekfrequenzFolderNode
