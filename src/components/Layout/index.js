/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React, { Suspense, useContext, useEffect } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import AppBar from "./AppBar"
import Projekte from "../Projekte"
import User from "../User"
import Errors from "../Errors"
import UpdateAvailable from "../UpdateAvailable"
import Messages from "../Messages"
import Ekf from "../Ekf"
import Deletions from "../Deletions"
import ErrorBoundary from "../shared/ErrorBoundary"
import Fallback from "../shared/Fallback"
import storeContext from "../../storeContext"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media print {
    height: auto !important;
    display: block;
  }
`

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children }) => {
  const { setIsPrint, view, showDeletions } = useContext(storeContext)
  const data = useStaticQuery(query)

  useEffect(() => {
    typeof window !== "undefined" &&
      window.matchMedia("print").addListener(mql => {
        setIsPrint(mql.matches)
      })
    return () =>
      typeof window !== "undefined" &&
      window.matchMedia("print").removeListener()
  }, [])

  return (
    <ErrorBoundary>
      <Container>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: "Bedrohte Pflanzenarten fördern",
            },
            {
              name: "keywords",
              content: "Naturschutz, Artenschutz, Flora, Pflanzen",
            },
          ]}
        >
          <html lang="de" />
        </Helmet>
        <Suspense fallback={<Fallback />}>
          <AppBar />
          {children}
          {view === "ekf" && <Ekf />}
          {view === "normal" && <Projekte />}
          <User />
          <Errors />
          <UpdateAvailable />
          <Messages />
          {showDeletions && <Deletions />}
        </Suspense>
      </Container>
    </ErrorBoundary>
  )
}

export default Layout
