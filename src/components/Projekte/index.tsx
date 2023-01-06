import React, { useContext } from 'react'
import styled from '@emotion/styled'
import intersection from 'lodash/intersection'
import { observer } from 'mobx-react-lite'

// when Karte was loaded async, it did not load,
// but only in production!
import ProjektContainer from './ProjektContainer'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'
import AppBar from './AppBar'

const Container = styled.div`
  height: 100%;
  position: relative;

  @media print {
    height: auto !important;
    overflow: visible !important;
    display: block;
  }
`
const tree2TabValues = ['tree2', 'daten2', 'filter2', 'karte2']

const Projekte = () => {
  const store = useContext(storeContext)
  const { isPrint, urlQuery } = store

  const { projekteTabs } = urlQuery
  const tree2Tabs = intersection(tree2TabValues, projekteTabs)

  console.log('Projekte rendering')

  if (tree2Tabs.length === 0 || isPrint) {
    return (
      <AppBar>
        <Container>
          <ProjektContainer treeName="tree" />
        </Container>
      </AppBar>
    )
  }

  // TODO: use iframe for tree2
  return (
    <AppBar>
      <Container>
        <StyledSplitPane split="vertical" defaultSize="50%">
          <ProjektContainer treeName="tree" />
          <ProjektContainer treeName="tree2" />
        </StyledSplitPane>
      </Container>
    </AppBar>
  )
}

export default observer(Projekte)
