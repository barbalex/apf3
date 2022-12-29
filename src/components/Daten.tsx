// file name need underscore
// otherwise weird things happen (edits are not registered)
// see: https://github.com/gatsbyjs/gatsby/issues/26554#issuecomment-677915552
import React, { useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import storeContext from '../storeContext'
import Projekte from './Projekte'
import User from './User'
import Messages from './Messages'
import Ekf from './Ekf'
import Deletions from './Deletions'
import EkPlan from './EkPlan'
import Unterhalt from './Unterhalt'

const Container = styled.div`
  background-color: #fffde7;
  height: 100%;

  @media print {
    margin-top: 0;
    height: auto;
    overflow: visible !important;
    background-color: white;
  }
`

const DatenComponent = () => {
  const store = useContext(storeContext)
  const { view, showDeletions, user } = store
  const { activeNodeArray: aNARAw } = store.tree
  const activeNodeArray = getSnapshot(aNARAw)

  const form = useMemo(() => {
    const isEkPlan =
      activeNodeArray.length === 3 &&
      activeNodeArray[0] === 'Projekte' &&
      activeNodeArray[2] === 'EK-Planung'

    return isEkPlan ? 'ekplan' : view === 'ekf' ? 'ekf' : 'projekte'
  }, [activeNodeArray, view])

  // set unterhalt to true to show this page when servicing
  const unterhalt = false
  if (unterhalt) return <Unterhalt />

  console.log('DatenPageComponent rendering')

  // using render props on Layout to pass down appbarheight without using store
  return (
    <Container>
      {!!user.token && (
        <>
          {form === 'ekf' && <Ekf />}
          {form === 'projekte' && <Projekte />}
          {form === 'ekplan' && <EkPlan />}
          <Messages />
          {showDeletions && <Deletions />}
        </>
      )}
      <User />
    </Container>
  )
}

export default observer(DatenComponent)
