import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'

import storeContext from '../../storeContext'
import User from '../User'
import Messages from '../Messages'
import Deletions from '../Deletions'

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

const ProtectedRoute = () => {
  const store = useContext(storeContext)
  const { showDeletions, user } = store

  // console.log('DatenPageComponent rendering')

  return (
    <Container>
      {!!user.token && (
        <>
          <Outlet />
          <Messages />
          {showDeletions && <Deletions />}
        </>
      )}
      <User />
    </Container>
  )
}

export default observer(ProtectedRoute)
