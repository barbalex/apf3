import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import memoizeOne from 'memoize-one'

export default ({
  nodes: nodesPassed,
  data,
  treeName,
  projektNodes,
  apNodes,
  popNodes,
  projId,
  apId,
  popId,
  store,
}) => {
  // fetch sorting indexes of parents
  const projIndex = findIndex(projektNodes, {
    id: projId,
  })
  const apIndex = findIndex(apNodes, { id: apId })
  const popIndex = findIndex(popNodes, { id: popId })

  // map through all elements and create array of nodes
  const nodes = memoizeOne(() =>
    get(data, 'allTpops.nodes', [])
      // only show if parent node exists
      .filter(el =>
        nodesPassed.map(n => n.id).includes(`${el.popId}TpopFolder`),
      )
      // only show nodes of this parent
      .filter(el => el.popId === popId)
      .map((el, index) => ({
        nodeType: 'table',
        menuType: 'tpop',
        filterTable: 'tpop',
        id: el.id,
        parentId: `${el.popId}TpopFolder`,
        parentTableId: el.popId,
        urlLabel: el.id,
        label: el.label,
        url: [
          'Projekte',
          projId,
          'Aktionspläne',
          apId,
          'Populationen',
          el.popId,
          'Teil-Populationen',
          el.id,
        ],
        hasChildren: true,
        nr: el.nr,
      }))
      // sort again to sort (keine Nr) on top
      .sort((a, b) => a.nr - b.nr)
      .map((el, index) => {
        el.sort = [projIndex, 1, apIndex, 1, popIndex, 1, index]
        return el
      }),
  )()

  return nodes
}
