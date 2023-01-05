import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
// import { getSnapshot } from 'mobx-state-tree'
import jwtDecode from 'jwt-decode'
import { useLocation, useParams, Navigate } from 'react-router-dom'

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
  const location = useLocation()
  const pathname = location.pathname
  const { userId } = useParams()

  const store = useContext(storeContext)
  const { showDeletions, user } = store

  const token = user?.token
  const tokenDecoded = token ? jwtDecode(token) : null
  const role = tokenDecoded ? tokenDecoded.role : null
  const isFreiwillig = role === 'apflora_freiwillig'

  // TODO:
  // if user is freiwillig
  // and path is not in /Benutzer/:userId
  // then redirect to /Benutzer/:userId/EKF
  const shouldNavigate =
    isFreiwillig && userId && !pathname.includes(`Daten/Benutzer/${userId}`)
  // console.log('ProtectedRoute', {
  //   user: getSnapshot(user),
  //   isFreiwillig,
  //   role,
  //   pathname,
  //   shouldNavigate,
  // })
  if (shouldNavigate) {
    return (
      <Navigate
        to={`/Daten/Benutzer/${userId}/EKF/${new Date().getFullYear()}`}
      />
    )
  }

  return (
    <Container>
      {!!user.token && (
        <>
          <Outlet />
          {!isFreiwillig && <Messages />}
          {!isFreiwillig && showDeletions && <Deletions />}
        </>
      )}
      <User />
    </Container>
  )
}

export default observer(ProtectedRoute)
