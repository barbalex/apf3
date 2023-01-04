import React from 'react'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Bar from './EKF'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media print {
    height: auto;
    overflow: visible !important;
  }
`
const StyledAppBar = styled(AppBar)`
  min-height: 64px !important;

  @media print {
    display: none !important;
  }
`
const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding-left: 4px !important;
  padding-right: 4px !important;
`

const EkPlanAppbar = ({ children }) => (
  <Container>
    <StyledAppBar position="static">
      <StyledToolbar>
        <Bar />
      </StyledToolbar>
    </StyledAppBar>
    {children}
  </Container>
)

export default EkPlanAppbar
