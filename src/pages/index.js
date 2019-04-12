import React from "react"

import ErrorBoundary from "../components/shared/ErrorBoundary"
import Layout from "../components/Layout"

export default () => (
  <ErrorBoundary>
    <Layout>
      <div>Hello world!</div>
    </Layout>
  </ErrorBoundary>
)
