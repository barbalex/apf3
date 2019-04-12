import React, { useEffect, useContext } from "react"

import ErrorBoundary from "../components/shared/ErrorBoundary"
import Layout from "../components/Layout"
import storeContext from "../storeContext"
import getActiveNodeArrayFromPathname from "../modules/getActiveNodeArrayFromPathname"
import getOpenNodesFromActiveNodeArray from "../modules/getOpenNodesFromActiveNodeArray"
import Projekte from "../components/Projekte"
import User from "../components/User"
import Errors from "../components/Errors"
import UpdateAvailable from "../components/UpdateAvailable"
import Messages from "../components/Messages"
import Ekf from "../components/Ekf"
import Deletions from "../components/Deletions"
import initiateDataFromUrl from "../modules/initiateDataFromUrl"

export default ({ location }) => {
  const store = useContext(storeContext)
  const { view, showDeletions } = store
  const { pathname } = location
  const { setActiveNodeArray, setOpenNodes } = store.tree
  const activeNodeArray = getActiveNodeArrayFromPathname(pathname)
  useEffect(
    () =>
      initiateDataFromUrl({
        store,
      }),
    []
  )
  // on first render set openNodes
  /*useEffect(() => {
    setOpenNodes(getOpenNodesFromActiveNodeArray(activeNodeArray))
  }, [])*/
  // when pathname changes, update activeNodeArray
  useEffect(() => {
    setActiveNodeArray(activeNodeArray)
  }, [pathname])

  return (
    <ErrorBoundary>
      <Layout>
        <Projekte />
        {view === "ekf" && <Ekf />}
        {view === "normal" && <Projekte />}
        <User />
        <Errors />
        <UpdateAvailable />
        <Messages />
        {showDeletions && <Deletions />}
      </Layout>
    </ErrorBoundary>
  )
}
