import React, { useContext, useRef } from 'react'
import styled from '@emotion/styled'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import Karte from './Karte'
import TreeContainer from './TreeContainer'
import Daten from './Daten'
import Exporte from './Exporte'
import Filter from './Filter'
import storeContext from '../../storeContext'
import ApberForApFromAp from '../Print/ApberForApFromAp'
import ApberForYear from '../Print/ApberForYear'
import getActiveForm from '../../modules/getActiveForm'

const Container = styled.div`
  height: 100%;
  position: relative;

  @media print {
    display: block;
    height: auto !important;
  }
`
/**
 * need to use || instead of ?? for height
 * because 0 was passed
 */
const StyledSplitPane = styled(SplitPane)`
  .Resizer {
    background: #388e3c;
    opacity: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.vertical {
    border-left: 3px solid #388e3c;
    cursor: col-resize;
    background-color: #388e3c;
  }

  .Resizer.vertical:hover {
    border-left: 2px solid rgba(0, 0, 0, 0.3);
    border-right: 2px solid rgba(0, 0, 0, 0.3);
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane2 {
    overflow: ${(props) => (props.overflow === 'auto' ? 'auto' : 'hidden')};
  }
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ProjektContainer = ({
  treeName,
  tabs: tabsPassed,
  nodes,
  treeLoading,
}) => {
  const store = useContext(storeContext)
  const { isPrint } = store
  const { activeNodeArray } = store[treeName]

  const showApberForArt =
    activeNodeArray.length === 7 &&
    activeNodeArray[4] === 'AP-Berichte' &&
    activeNodeArray[6] === 'print'
  const showApberForAll =
    activeNodeArray.length === 5 &&
    activeNodeArray[2] === 'AP-Berichte' &&
    activeNodeArray[4] === 'print'

  const containerEl = useRef(null)
  const treeEl = useRef(null)
  const datenEl = useRef(null)
  const filterEl = useRef(null)

  // remove 2 to treat all same
  const tabs = [...tabsPassed].map((t) => t.replace('2', ''))

  const elObj = {
    tree: (
      <InnerContainer ref={treeEl}>
        <TreeContainer
          treeName={treeName}
          nodes={nodes}
          treeLoading={treeLoading}
        />
      </InnerContainer>
    ),
    daten: (
      <InnerContainer ref={datenEl}>
        <Daten
          treeName={treeName}
          activeForm={getActiveForm({ store, treeName, nodes })}
        />
      </InnerContainer>
    ),
    filter: (
      <InnerContainer ref={filterEl}>
        <Filter treeName={treeName} />
      </InnerContainer>
    ),
    karte: (
      <InnerContainer>
        <Karte treeName={treeName} />
      </InnerContainer>
    ),
    exporte: (
      <InnerContainer>
        <Exporte treeName={treeName} />
      </InnerContainer>
    ),
  }

  const paneSize = tabs[0] === 'tree' ? '33%' : '50%'

  console.log('ProjektContainer', {
    showApberForAll,
    showApberForArt,
  })

  if (showApberForAll) {
    if (isPrint) return <ApberForYear />
    return (
      <Container ref={containerEl}>
        <StyledSplitPane
          split="vertical"
          size={paneSize}
          maxSize={-10}
          overflow="auto"
        >
          {elObj.tree}
          <ApberForYear />
        </StyledSplitPane>
      </Container>
    )
  }

  if (showApberForArt) {
    if (isPrint) return <ApberForApFromAp />
    return (
      <Container ref={containerEl}>
        <StyledSplitPane
          split="vertical"
          size={paneSize}
          maxSize={-10}
          overflow="auto"
        >
          {elObj.tree}
          <InnerContainer>
            <ApberForApFromAp />
          </InnerContainer>
        </StyledSplitPane>
      </Container>
    )
  }

  if (isPrint) {
    return (
      <Daten
        treeName={treeName}
        activeForm={getActiveForm({ store, treeName, nodes })}
      />
    )
  }

  if (tabs.length < 2) {
    // return WITH split pane
    // otherwise height is wrong
    // and opening / closing tabs is slow
    // add empty div to prevent split-pane from
    // missing a second div
    return (
      <Container ref={containerEl}>
        <StyledSplitPane split="vertical" size="100%" maxSize={-10}>
          {elObj[tabs[0]]}
          <></>
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 2) {
    return (
      <Container ref={containerEl}>
        <StyledSplitPane split="vertical" size={paneSize} maxSize={-10}>
          {elObj[tabs[0]]}
          {elObj[tabs[1]]}
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 3) {
    return (
      <Container ref={containerEl}>
        <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
          {elObj[tabs[0]]}

          <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
            {elObj[tabs[1]]}
            {elObj[tabs[2]]}
          </StyledSplitPane>
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 4) {
    return (
      <Container ref={containerEl}>
        <StyledSplitPane split="vertical" size="25%" maxSize={-10}>
          {elObj[tabs[0]]}

          <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
            {elObj[tabs[1]]}
            <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
              {elObj[tabs[2]]}
              {elObj[tabs[3]]}
            </StyledSplitPane>
          </StyledSplitPane>
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 5) {
    return (
      <Container ref={containerEl}>
        <StyledSplitPane split="vertical" size="20%" maxSize={-10}>
          {elObj[tabs[0]]}

          <StyledSplitPane split="vertical" size="25%" maxSize={-10}>
            {elObj[tabs[1]]}
            <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
              {elObj[tabs[2]]}
              <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
                {elObj[tabs[3]]}
                {elObj[tabs[4]]}
              </StyledSplitPane>
            </StyledSplitPane>
          </StyledSplitPane>
        </StyledSplitPane>
      </Container>
    )
  }

  return null
}

export default observer(ProjektContainer)
