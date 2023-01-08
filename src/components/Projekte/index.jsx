import React, { useContext } from 'react'
import styled from '@emotion/styled'
import intersection from 'lodash/intersection'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import { getSnapshot } from 'mobx-state-tree'

import queryString from 'query-string'

// when Karte was loaded async, it did not load,
// but only in production!
import ProjektContainer from './ProjektContainer'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'
import AppBar from './AppBar'
// import AppRenderer from '../../AppRenderer'
import appBaseUrl from '../../modules/appBaseUrl'

const Container = styled.div`
  height: 100%;
  position: relative;

  @media print {
    height: auto !important;
    overflow: visible !important;
    display: block;
  }
`
const StyledIframe = styled.iframe`
  border: none;
`

const tree2TabValues = ['tree2', 'daten2', 'filter2', 'karte2']

const Projekte = () => {
  const { pathname } = useLocation()
  const store = useContext(storeContext)
  const { isPrint, urlQuery } = store
  const { tree2Src } = store.tree

  const { projekteTabs } = urlQuery
  const tree2Tabs = intersection(tree2TabValues, projekteTabs)

  if (tree2Tabs.length === 0 || isPrint) {
    return (
      <Container>
        <ProjektContainer />
      </Container>
    )
  }

  // use
  let iFrameSrc = tree2Src
  if (!tree2Src) {
    // build search string for iframe
    const iFrameUrlQuery = { ...getSnapshot(urlQuery) }
    // need to alter projekteTabs:
    iFrameUrlQuery.projekteTabs = iFrameUrlQuery.projekteTabs
      // - remove non-tree2 values
      .filter((t) => t.includes('2'))
      // - rewrite tree2 values to tree values
      .map((t) => t.replace('2', ''))
    const search = queryString.stringify(iFrameUrlQuery)
    // pass this via src to iframe
    iFrameSrc = `${appBaseUrl().slice(0, -1)}${pathname}?${search}`
  }

  return (
    <Container>
      <StyledSplitPane split="vertical" defaultSize="50%">
        <ProjektContainer />
        <StyledIframe
          src={iFrameSrc}
          title="tree2"
          width="100%"
          height="100%"
        />
      </StyledSplitPane>
    </Container>
  )
}

export default observer(Projekte)
