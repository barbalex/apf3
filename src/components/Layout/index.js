/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import AppBar from "./AppBar"

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
    <>
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
      <AppBar />
      {children}
    </>
  )
}

export default Layout
