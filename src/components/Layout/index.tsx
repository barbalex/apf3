import React from 'react'
import styled from '@emotion/styled'

import AppBar from './AppBar'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media print {
    height: auto;
    overflow: visible !important;
  }
`

const Layout = ({ children }) => (
  <Container>
    <AppBar />
    {children}
  </Container>
)

export default Layout
