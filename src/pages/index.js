import React from "react"
import styled from 'styled-components'

import ErrorBoundary from "../components/shared/ErrorBoundary"
import Layout from "../components/Layout"

const ScrollContainer = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
  margin-top: 64px;
`

export default () => (
  <ErrorBoundary>
    <Layout>
      <ScrollContainer>
      <div>Hello world!</div></ScrollContainer>
    </Layout>
  </ErrorBoundary>
)
