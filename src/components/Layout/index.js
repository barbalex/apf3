/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React, { Suspense } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import AppBar from "./AppBar"
import ErrorBoundary from "../shared/ErrorBoundary"
import Fallback from "../shared/Fallback"

const Container = styled.div`
  @media print {
    height: auto;
    overflow: visible !important;
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
  const data = useStaticQuery(query)

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
        </Suspense>
      </Container>
    </ErrorBoundary>
  )
}

export default Layout
