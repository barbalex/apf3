import findIndex from 'lodash/findIndex'

const apberuebersichtFolderNode = ({
  data,
  loading,
  projektNodes,
  projId,
  store,
}) => {
  // fetch sorting indexes of parents
  const projNodeIds = projektNodes.map((n) => n.id)
  const projIndex = findIndex(projektNodes, {
    id: projId,
  })
  const nodeLabelFilterString =
    store.tree?.nodeLabelFilter?.apberuebersicht ?? ''
  const count = data?.allApberuebersichts?.totalCount ?? 0

  const message = loading
    ? '...'
    : nodeLabelFilterString
    ? `${count} gefiltert`
    : count

  // only show if parent node exists
  if (!projNodeIds.includes(projId)) return []

  return [
    {
      menuType: 'apberuebersichtFolder',
      filterTable: 'apberuebersicht',
      id: projId,
      tableId: projId,
      urlLabel: 'AP-Berichte',
      label: `AP-Berichte (${message})`,
      url: ['Projekte', projId, 'AP-Berichte'],
      sort: [projIndex, 2],
      hasChildren: count > 0,
    },
  ]
}

export default apberuebersichtFolderNode
