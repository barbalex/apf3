import React from 'react'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import Sidebar from './Sidebar'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: #fffde7;
`
const Doku = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px;
  overflow-y: auto;
  box-sizing: border-box;
  ul {
    margin-top: 0;
  }
  p,
  li {
    margin-bottom: 0;
    line-height: 1.5em;
  }
  h1,
  h3,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
export const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: grey;
`

// TODO: refactor
const Docs = () => {
  return (
    <ErrorBoundary>
      <Container>
        <Sidebar />
        <SimpleBar style={{ height: '100%', width: '100%' }}>
          <Doku>
            <Outlet />
          </Doku>
        </SimpleBar>
      </Container>
    </ErrorBoundary>
  )
}

export default Docs
