// file name need underscore
// otherwise weird things happen (edits are not registered)
// see: https://github.com/gatsbyjs/gatsby/issues/26554#issuecomment-677915552
import React, { useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import storeContext from '../storeContext'
import Projekte from './Projekte'
import User from './User'
import Messages from './Messages'
import Ekf from './Ekf'
import Deletions from './Deletions'

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

  const form = useMemo(() => (view === 'ekf' ? 'ekf' : 'projekte'), [view])

  // console.log('DatenPageComponent rendering')

  return (
    <Container>
      {!!user.token && (
        <>
          {form === 'ekf' && <Ekf />}
          {form === 'projekte' && <Projekte />}
          <Messages />
          {showDeletions && <Deletions />}
        </>
      )}
      <User />
    </Container>
  )
}

export default observer(DatenComponent)
