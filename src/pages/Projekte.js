import React, { useEffect, useContext } from "react"

import ErrorBoundary from "../components/shared/ErrorBoundary"
import Layout from "../components/Layout"
import storeContext from "../storeContext"
import getActiveNodeArrayFromPathname from "../modules/getActiveNodeArrayFromPathname"
import getOpenNodesFromActiveNodeArray from "../modules/getOpenNodesFromActiveNodeArray"
import Projekte from "../components/Projekte"

export default ({ location }) => {
  const store = useContext(storeContext)
  const { pathname } = location
  const { setActiveNodeArray, setOpenNodes } = store.tree
  const activeNodeArray = getActiveNodeArrayFromPathname(pathname)

  // on first render set openNodes
  useEffect(() => {
    setOpenNodes(getOpenNodesFromActiveNodeArray(activeNodeArray))
  }, [])
  // when pathname changes, update activeNodeArray
  useEffect(() => {
    setActiveNodeArray(activeNodeArray)
  }, [pathname])

  return (
    <ErrorBoundary>
      <Layout>
        <Projekte />
      </Layout>
    </ErrorBoundary>
  )
}
