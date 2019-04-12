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
  const { setActiveNodeArray, activeNodeArray: activeNodeArrayFromTree, setOpenNodes } = store.tree
  useEffect(
    () =>{
      console.log('Projekte, useEffect: initiating data from url')
      initiateDataFromUrl({
        store,
      })},
    []
  )
  const activeNodeArray = getActiveNodeArrayFromPathname(pathname)
  // on first render set openNodes
  /*useEffect(() => {
    console.log('Projekte, useEffect: setting openNodes')
    setOpenNodes(getOpenNodesFromActiveNodeArray(activeNodeArray))
  }, [])*/
  // when pathname changes, update activeNodeArray
  useEffect(() => {
    console.log('Projekte, useEffect: setting activeNodeArray')
    setActiveNodeArray(activeNodeArray)
  }, [pathname])
  console.log('Projekte',{activeNodeArrayFromTree:activeNodeArrayFromTree.slice()})

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
