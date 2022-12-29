import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../storeContext'

const IsPrintSetter = () => {
  const store = useContext(storeContext)
  const { setIsPrint, setEkfIds } = store

  /**
   * In Firefox this does not work! Bug is open since 7 years:
   * see: https://bugzilla.mozilla.org/show_bug.cgi?id=774398
   * TODO: seems to have been solved 8.2022
   * BUT: regression: https://bugzilla.mozilla.org/show_bug.cgi?id=1800897
   */
  useEffect(() => {
    window.matchMedia('print').addListener((mql) => {
      setIsPrint(mql.matches)
      if (!mql.matches) setEkfIds([])
    })
    return () => {
      window.matchMedia('print').removeListener((mql) => {
        setIsPrint(mql.matches)
      })
    }
  }, [setEkfIds, setIsPrint])

  // using render props on Layout to pass down appbarheight without using store
  return null
}

export default observer(IsPrintSetter)
