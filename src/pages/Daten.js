import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"

import ErrorBoundary from "../components/shared/ErrorBoundary"
import Layout from "../components/Layout"
import storeContext from "../storeContext"
import idbContext from "../idbContext"
import getActiveNodeArrayFromPathname from "../modules/getActiveNodeArrayFromPathname"
import getOpenNodesFromActiveNodeArray from "../modules/getOpenNodesFromActiveNodeArray"
import setUserFromIdb from "../modules/setUserFromIdb"
import Projekte from "../components/Projekte"
import User from "../components/User"
import Errors from "../components/Errors"
import UpdateAvailable from "../components/UpdateAvailable"
import Messages from "../components/Messages"
import Ekf from "../components/Ekf"
import Print from "../components/Print"
import Deletions from "../components/Deletions"
import initiateDataFromUrl from "../modules/initiateDataFromUrl"

const Container = styled.div`
  height: calc(100vh - 64px);
  margin-top: 64px;
  @media print {
    margin-top: 0;
  }
`

const DatenPage = ({ location }) => {
  const store = useContext(storeContext)
  const { idb } = useContext(idbContext)
  const { view, showDeletions } = store
  const { pathname } = location
  const { setActiveNodeArray, setOpenNodes } = store.tree
  useEffect(() => {
    // TODO:
    // is initiateDataFromUrl and setActiveNodeArray/setOpenNodes double?
    initiateDataFromUrl({
      store,
    })
    setUserFromIdb({ idb, store })
  }, [])
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
        <Container>
          {view === "ekf" && <Ekf />}
          {view === "normal" && <Projekte />}
          <Print />
          <User />
          <Errors />
          <UpdateAvailable />
          <Messages />
          {showDeletions && <Deletions />}
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default observer(DatenPage)
