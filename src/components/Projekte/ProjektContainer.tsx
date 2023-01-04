/**
 * 2020.03.16:
 * used to build nodes in TreeContainer
 * but need to pass them to Daten
 * and react would not like this to happen from below
 * so needed to move building nodes up to here
 */
import React, { useContext, useRef, useMemo, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import intersection from 'lodash/intersection'
import jwtDecode from 'jwt-decode'

import Karte from './Karte'
import TreeContainer from './TreeContainer'
import Daten from './Daten'
import Exporte from './Exporte'
import Filter from './Filter'
import storeContext from '../../storeContext'
import ApberForApFromAp from '../Print/ApberForApFromAp'
import ApberForYear from '../Print/ApberForYear'
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

const tree2TabValues = ['tree2', 'daten2', 'filter2', 'karte2']

const ProjektContainer = ({ treeName }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { isPrint, urlQuery, user } = store
  const { activeNodeArray } = store[treeName]
  const { projId, artId } = useParams()
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
  const tree2Tabs = intersection(tree2TabValues, projekteTabs)

  const { token } = user
  const role = token ? jwtDecode(token).role : null

  const treeDataFilter = getSnapshot(store.tree.dataFilter)
  const treeNodeLabelFilter = getSnapshot(store.tree.nodeLabelFilter)
  const treeOpenNodes = getSnapshot(store.tree.openNodes)
  const treeApFilter = store.tree.apFilter
  const tree2DataFilter = getSnapshot(store.tree2.dataFilter)
  const tree2NodeLabelFilter = getSnapshot(store.tree2.nodeLabelFilter)
  const tree2OpenNodes = getSnapshot(store.tree2.openNodes)
  const tree2ApFilter = store.tree2.apFilter
  const popGqlFilterTree = store.tree.popGqlFilter
  const popGqlFilterTree2 = store.tree2.popGqlFilter
  const apGqlFilterTree = store.tree.apGqlFilter
  const apGqlFilterTree2 = store.tree2.apGqlFilter
  const tpopGqlFilterTree = store.tree.tpopGqlFilter
  const tpopGqlFilterTree2 = store.tree2.tpopGqlFilter
  const tpopmassnGqlFilterTree = store.tree.tpopmassnGqlFilter
  const tpopmassnGqlFilterTree2 = store.tree2.tpopmassnGqlFilter
  const ekGqlFilterTree = store.tree.ekGqlFilter
  const ekGqlFilterTree2 = store.tree2.ekGqlFilter
  const ekfGqlFilterTree = store.tree.ekfGqlFilter
  const ekfGqlFilterTree2 = store.tree2.ekfGqlFilter
  const beobGqlFilterTree = store.tree.beobGqlFilter
  const beobGqlFilterTree2 = store.tree2.beobGqlFilter

  const {
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useQuery({
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
      treeName,
    ],
    queryFn: () =>
      treeName === 'tree'
        ? client.query({
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
          })
        : {},
  })

  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useQuery({
    queryKey: [
      'tree2Query',
      tree2DataFilter,
      tree2OpenNodes,
      tree2ApFilter,
      tree2NodeLabelFilter,
      artId,
      popGqlFilterTree2,
      tpopGqlFilterTree2,
      tpopmassnGqlFilterTree2,
      ekGqlFilterTree2,
      ekfGqlFilterTree2,
      apGqlFilterTree2,
      beobGqlFilterTree2,
      role,
      treeName,
    ],
    queryFn: async () =>
      treeName === 'tree2'
        ? client.query({
            query: queryTree,
            variables: buildTreeQueryVariables({
              dataFilter: tree2DataFilter,
              openNodes: tree2OpenNodes,
              apFilter: tree2ApFilter,
              nodeLabelFilter: tree2NodeLabelFilter,
              artId,
              popGqlFilter: popGqlFilterTree2,
              tpopGqlFilter: tpopGqlFilterTree2,
              tpopmassnGqlFilter: tpopmassnGqlFilterTree2,
              ekGqlFilter: ekGqlFilterTree2,
              ekfGqlFilter: ekfGqlFilterTree2,
              apGqlFilter: apGqlFilterTree2,
              beobGqlFilter: beobGqlFilterTree2,
            }),
          })
        : {},
  })
  const tree1Data = data1?.data
  const tree2Data = data2?.data

  const [treeNodes, setTreeNodes] = useState([])
  const [tree2Nodes, setTree2Nodes] = useState([])

  useEffect(() => {
    //console.log('Projekte, building treeNodes')
    if (!isLoading1) {
      setTreeNodes(
        buildNodes({
          treeName: 'tree',
          role,
          data: tree1Data,
          loading: isLoading1,
          store,
        }),
      )
    }
  }, [
    isLoading1,
    store.tree.openNodes,
    store.tree.openNodes.length,
    tree1Data,
    treeDataFilter,
    role,
    store,
  ])
  useEffect(() => {
    if (!(tree2Tabs.length === 0 || isPrint)) {
      //console.log('Projekte, building tree2Nodes')
      if (!isLoading2) {
        setTree2Nodes(
          buildNodes({
            treeName: 'tree2',
            role,
            data: tree2Data,
            loading: isLoading2,
            store,
          }),
        )
      }
    }
  }, [
    store.tree2.openNodes,
    store.tree2.openNodes.length,
    tree2Data,
    tree2DataFilter,
    role,
    store,
    tree2Tabs.length,
    isPrint,
    isLoading2,
  ])

  const showApberForArt =
    activeNodeArray.length === 7 &&
    activeNodeArray[4] === 'AP-Berichte' &&
    activeNodeArray[6] === 'print'
  const showApberForAll =
    activeNodeArray.length === 5 &&
    activeNodeArray[2] === 'AP-Berichte' &&
    activeNodeArray[4] === 'print'

  const treeEl = useRef(null)
  const datenEl = useRef(null)
  const filterEl = useRef(null)

  // remove 2 to treat all same
  let tabs = treeName === 'tree' ? treeTabs : tree2Tabs
  tabs = [...tabs].map((t) => t.replace('2', ''))
  const nodes = treeName === 'tree' ? treeNodes : tree2Nodes
  const treeLoading = treeName === 'tree' ? isLoading1 : isLoading2

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
          activeForm={getActiveForm({
            store,
            treeName,
            nodes: nodes,
          })}
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

  // console.log('ProjektContainer', {
  //   showApberForAll,
  //   showApberForArt,
  // })

  if (showApberForAll) {
    if (isPrint) return <ApberForYear />
    return (
      <Container>
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
      <Container>
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
        activeForm={getActiveForm({
          store,
          treeName,
          nodes: nodes,
        })}
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
      <Container>
        <StyledSplitPane split="vertical" size="100%" maxSize={-10}>
          {elObj[tabs[0]]}
          <></>
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 2) {
    return (
      <Container>
        <StyledSplitPane split="vertical" size={paneSize} maxSize={-10}>
          {elObj[tabs[0]]}
          {elObj[tabs[1]]}
        </StyledSplitPane>
      </Container>
    )
  }

  if (tabs.length === 3) {
    return (
      <Container>
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
      <Container>
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
      <Container>
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
