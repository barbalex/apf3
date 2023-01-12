import isEqual from 'lodash/isEqual'

import isNodeOpen from './isNodeOpen'
import isNodeInActiveNodePath from './isNodeInActiveNodePath'

const toggleNodeSymbol = ({ node, store, search, navigate }) => {
  if (!node.url) throw new Error('passed node has no url')
  const { openNodes, setOpenNodes, activeNodeArray, setLastTouchedNode } =
    store.tree

  let newOpenNodes = [...openNodes]
  if (isNodeOpen({ openNodes, url: node.url })) {
    newOpenNodes = newOpenNodes.filter((n) => !isEqual(n, node.url))
    if (isNodeInActiveNodePath({ node, activeNodeArray })) {
      // when a user closes a folder in the active node path
      // the active node should swith to the node's parent
      const newActiveNodeArray = [...node.url]
      newActiveNodeArray.pop()
      navigate(`/Daten/${newActiveNodeArray.join('/')}${search}`)
    }
  } else {
    newOpenNodes.push(node.url)
  }
  setOpenNodes(newOpenNodes)
  setLastTouchedNode(node.url)
}

export default toggleNodeSymbol
