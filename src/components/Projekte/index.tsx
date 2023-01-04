/**
 * 2020.03.16:
 * used to build nodes in TreeContainer
 * but need to pass them to Daten
 * and react would not like this to happen from below
 * so needed to move building nodes up to here
 */
import React, { useContext, useMemo, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import intersection from 'lodash/intersection'
import { observer } from 'mobx-react-lite'
import jwtDecode from 'jwt-decode'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'
import { getSnapshot } from 'mobx-state-tree'
import { useParams } from 'react-router-dom'

// when Karte was loaded async, it did not load,
// but only in production!
import ProjektContainer from './ProjektContainer'
import storeContext from '../../storeContext'
import buildTreeQueryVariables from './buildTreeQueryVariables'
import queryTree from './queryTree'
import buildNodes from './TreeContainer/nodes'
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
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { isPrint, urlQuery, user } = store
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
    ],
    queryFn: async () =>
      client.query({
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
      }),
  })
  const treeData = data1?.data
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
          data: treeData,
          loading: isLoading1,
          store,
        }),
      )
    }
  }, [
    isLoading1,
    store.tree.openNodes,
    store.tree.openNodes.length,
    treeData,
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

  console.log('Projekte rendering')

  if (tree2Tabs.length === 0 || isPrint) {
    return (
      <Container>
        <ProjektContainer
          treeName="tree"
          tabs={treeTabs}
          nodes={treeNodes}
          treeLoading={isLoading1}
          treeError={error1}
        />
      </Container>
    )
  }

  return (
    <Container>
      <StyledSplitPane split="vertical" defaultSize="50%">
        <ProjektContainer
          treeName="tree"
          tabs={treeTabs}
          nodes={treeNodes}
          treeLoading={isLoading1}
          treeError={error1}
        />
        <ProjektContainer
          treeName="tree2"
          tabs={tree2Tabs}
          nodes={tree2Nodes}
          treeLoading={isLoading2}
          treeError={error2}
        />
      </StyledSplitPane>
    </Container>
  )
}

export default observer(Projekte)
