import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import isEqual from 'lodash/isEqual'

import storeContext from '../storeContext'
import getActiveNodeArrayFromPathname from '../modules/getActiveNodeArrayFromPathname'

const ActiveNodeArraySetter = ({ location }) => {
  const store = useContext(storeContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  // when pathname changes, update activeNodeArray
  // seems no more needed?
  const { pathname } = location
  useEffect(() => {
    const newAna = getActiveNodeArrayFromPathname(pathname)
    if (!isEqual(newAna, activeNodeArray.slice())) {
      // user pushed back button > update activeNodeArray
      setActiveNodeArray(newAna, 'nonavigate')
    }
  }, [activeNodeArray, pathname, setActiveNodeArray])

  return null
}

export default observer(ActiveNodeArraySetter)
