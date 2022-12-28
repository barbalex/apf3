import React from 'react'
import styled from '@emotion/styled'

import Sidebar from '../../templates/Sidebar'
import ErrorBoundary from '../../components/shared/ErrorBoundary'

const Container = styled.div`
  height: ${(props) => `calc(100% - ${props.appbarheight}px)`};
  display: flex;
  overflow: hidden;
  background-color: #fffde7;
`
const Doku = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px;
  overflow-y: auto;
  ul {
    margin-top: 0;
  }
  p,
  li {
    margin-bottom: 0;
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

// TODO: refactor
const Template = ({ data }) => {
  const edges = data.allMarkdownRemark.edges

  return (
    <ErrorBoundary>
      <Container>
        <Sidebar
          title="Dokumentation"
          titleLink="/Dokumentation/"
          edges={edges}
        />
        <Doku>
          <p>{`<= Bitte wählen Sie ein Thema.`}</p>
        </Doku>
      </Container>
    </ErrorBoundary>
  )
}

export default Template
