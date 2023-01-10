import getActiveNodeArrayFromPathname from './getActiveNodeArrayFromPathname'
import getUrlQuery from '../modules/getUrlQuery'
import isMobilePhone from '../modules/isMobilePhone'
import setUrlQueryValue from '../modules/setUrlQueryValue'
import setOpenNodesFromActiveNodeArray from '../modules/setOpenNodesFromActiveNodeArray'

const initiateDataFromUrl = ({
  activeNodeArray: activeNodeArrayPassed,
  store,
}) => {
  const { setUrlQuery } = store
  const activeNodeArrayFromPathname =
    activeNodeArrayPassed || getActiveNodeArrayFromPathname()
  const initialActiveNodeArray = [...activeNodeArrayFromPathname]
  // fetch query here, BEFORE mutating active node array
  const urlQuery = getUrlQuery()
  const { projekteTabs } = urlQuery
  // Nope: navigate is not a function yet...
  // store.navigate(`/Daten/${initialActiveNodeArray.join('/')}`)
  store.tree.setActiveNodeArray(initialActiveNodeArray)
  // need to set openNodes
  setOpenNodesFromActiveNodeArray({
    activeNodeArray: initialActiveNodeArray,
    store,
  })
  setUrlQuery(urlQuery)

  // set projekte tabs of not yet existing
  if (
    activeNodeArrayFromPathname[0] === 'Projekte' &&
    (!projekteTabs || !projekteTabs.length || projekteTabs.length === 0)
  ) {
    if (isMobilePhone()) {
      setUrlQueryValue({
        key: 'projekteTabs',
        value: ['tree'],
        urlQuery,
        setUrlQuery,
      })
    } else {
      setUrlQueryValue({
        key: 'projekteTabs',
        value: ['tree', 'daten'],
        urlQuery,
        setUrlQuery,
      })
    }
  }
}

export default initiateDataFromUrl
