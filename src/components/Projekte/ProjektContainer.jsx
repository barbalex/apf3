/**
 * 2020.03.16:
 * used to build nodes in TreeContainer
 * but need to pass them to Daten
 * and react would not like this to happen from below
 * so needed to move building nodes up to here
 */
import React, { useContext, useMemo, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'
import intersection from 'lodash/intersection'
import jwtDecode from 'jwt-decode'
import { Outlet } from 'react-router-dom'

import Karte from './Karte'
import TreeContainer from './TreeContainer'
import Exporte from './Exporte'
import Filter from './Filter'
import storeContext from '../../storeContext'
import getActiveForm from '../../modules/getActiveForm'
import StyledSplitPane from '../shared/StyledSplitPane'
import buildTreeQueryVariables from './buildTreeQueryVariables'
import queryTree from './queryTree'
import buildNodes from './TreeContainer/nodes'

const Container = styled.div`
  height: 100%;
  position: relative;

  @media print {
    display: block;
    height: auto !important;
  }
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ProjektContainer = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { isPrint, urlQuery, user } = store
  const {
    activeNodeArray,
    apIdInActiveNodeArray: artId,
    projIdInActiveNodeArray: projId,
  } = store.tree
  // react hooks 'exhaustive-deps' rule wants to move treeTabValues into own useMemo
  // to prevent it from causing unnessecary renders
  // BUT: this prevents necessary renders: clicking tabs does not cause re-render!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const treeTabValues = [
    'tree',
    'daten',
    'filter',
    'karte',
    ...(projId ? ['exporte'] : []),
  ]

  const { projekteTabs } = urlQuery
  const treeTabs = useMemo(
    () => intersection(treeTabValues, projekteTabs),
    [projekteTabs, treeTabValues],
  )

  const { token } = user
  const role = token ? jwtDecode(token).role : null

  const treeDataFilter = getSnapshot(store.tree.dataFilter)
  const treeNodeLabelFilter = getSnapshot(store.tree.nodeLabelFilter)
  const treeOpenNodes = getSnapshot(store.tree.openNodes)
  const treeApFilter = store.tree.apFilter
  const popGqlFilterTree = store.tree.popGqlFilter
  const apGqlFilterTree = store.tree.apGqlFilter
  const tpopGqlFilterTree = store.tree.tpopGqlFilter
  const tpopmassnGqlFilterTree = store.tree.tpopmassnGqlFilter
  const ekGqlFilterTree = store.tree.ekGqlFilter
  const ekfGqlFilterTree = store.tree.ekfGqlFilter
  const beobGqlFilterTree = store.tree.beobGqlFilter

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'treeQuery',
      treeDataFilter,
      treeOpenNodes,
      treeApFilter,
      treeNodeLabelFilter,
      artId,
      popGqlFilterTree,
      tpopGqlFilterTree,
      tpopmassnGqlFilterTree,
      ekGqlFilterTree,
      ekfGqlFilterTree,
      apGqlFilterTree,
      beobGqlFilterTree,
      role,
    ],
    queryFn: () =>
      client.query({
        query: queryTree,
        variables: buildTreeQueryVariables({
          dataFilter: treeDataFilter,
          openNodes: treeOpenNodes,
          apFilter: treeApFilter,
          nodeLabelFilter: treeNodeLabelFilter,
          artId,
          popGqlFilter: popGqlFilterTree,
          tpopGqlFilter: tpopGqlFilterTree,
          tpopmassnGqlFilter: tpopmassnGqlFilterTree,
          ekGqlFilter: ekGqlFilterTree,
          ekfGqlFilter: ekfGqlFilterTree,
          apGqlFilter: apGqlFilterTree,
          beobGqlFilter: beobGqlFilterTree,
        }),
      }),
  })

  const treeData = data?.data

  const [treeNodes, setTreeNodes] = useState([])

  useEffect(() => {
    //console.log('Projekte, building treeNodes')
    if (!isLoading) {
      setTreeNodes(
        buildNodes({
          role,
          data: treeData,
          loading: isLoading,
          store,
        }),
      )
    }
  }, [
    isLoading,
    store.tree.openNodes,
    store.tree.openNodes.length,
    treeData,
    treeDataFilter,
    role,
    store,
  ])

  const showApberForArt =
    activeNodeArray.length === 7 &&
    activeNodeArray[4] === 'AP-Berichte' &&
    activeNodeArray[6] === 'print'
  const showApberForAll =
    activeNodeArray.length === 5 &&
    activeNodeArray[2] === 'AP-Berichte' &&
    activeNodeArray[4] === 'print'

  const elObj = {
    tree: (
      <InnerContainer>
        <TreeContainer nodes={treeNodes} treeLoading={isLoading} />
      </InnerContainer>
    ),
    daten: (
      <InnerContainer>
        <Outlet />
        {/* <Daten
          activeForm={getActiveForm({
            store,
            nodes: treeNodes,
          })}
        /> */}
      </InnerContainer>
    ),
    filter: (
      <InnerContainer>
        <Filter />
      </InnerContainer>
    ),
    karte: (
      <InnerContainer>
        <Karte />
      </InnerContainer>
    ),
    exporte: (
      <InnerContainer>
        <Exporte />
      </InnerContainer>
    ),
  }

  const paneSize = treeTabs[0] === 'tree' ? '33%' : '50%'

  // console.log('ProjektContainer', {
  //   treeTabs,
  // })

  if (isPrint) {
    return <Outlet />
  }

  const overflow = showApberForAll || showApberForArt ? 'auto' : 'hidden'

  if (treeTabs.length < 2) {
    // return WITH split pane
    // otherwise height is wrong
    // and opening / closing tabs is slow
    // add empty div to prevent split-pane from
    // missing a second div
    return (
      <Container>
        <StyledSplitPane split="vertical" size="100%" maxSize={-10}>
          {elObj[treeTabs[0]]}
          <></>
        </StyledSplitPane>
      </Container>
    )
  }

  if (treeTabs.length === 2) {
    return (
      <Container>
        <StyledSplitPane
          split="vertical"
          size={paneSize}
          maxSize={-10}
          overflow={overflow}
        >
          {elObj[treeTabs[0]]}
          {elObj[treeTabs[1]]}
        </StyledSplitPane>
      </Container>
    )
  }

  if (treeTabs.length === 3) {
    return (
      <Container>
        <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
          {elObj[treeTabs[0]]}
          <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
            {elObj[treeTabs[1]]}
            {elObj[treeTabs[2]]}
          </StyledSplitPane>
        </StyledSplitPane>
      </Container>
    )
  }

  if (treeTabs.length === 4) {
    return (
      <Container>
        <StyledSplitPane split="vertical" size="25%" maxSize={-10}>
          {elObj[treeTabs[0]]}
          <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
            {elObj[treeTabs[1]]}
            <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
              {elObj[treeTabs[2]]}
              {elObj[treeTabs[3]]}
            </StyledSplitPane>
          </StyledSplitPane>
        </StyledSplitPane>
      </Container>
    )
  }

  if (treeTabs.length === 5) {
    return (
      <Container>
        <StyledSplitPane split="vertical" size="20%" maxSize={-10}>
          {elObj[treeTabs[0]]}
          <StyledSplitPane split="vertical" size="25%" maxSize={-10}>
            {elObj[treeTabs[1]]}
            <StyledSplitPane split="vertical" size="33%" maxSize={-10}>
              {elObj[treeTabs[2]]}
              <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
                {elObj[treeTabs[3]]}
                {elObj[treeTabs[4]]}
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
