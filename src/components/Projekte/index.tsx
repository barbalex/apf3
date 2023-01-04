import React, { useContext } from 'react'
import styled from '@emotion/styled'
import intersection from 'lodash/intersection'
import { observer } from 'mobx-react-lite'

// when Karte was loaded async, it did not load,
// but only in production!
import ProjektContainer from './ProjektContainer'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'

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
      <Container>
        <ProjektContainer treeName="tree" />
      </Container>
    )
  }

  return (
    <Container>
      <StyledSplitPane split="vertical" defaultSize="50%">
        <ProjektContainer treeName="tree" />
        <ProjektContainer treeName="tree2" />
      </StyledSplitPane>
    </Container>
  )
}

export default observer(Projekte)
