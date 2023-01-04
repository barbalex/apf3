import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import Select from '../../../../../shared/Select'
import Error from '../../../../../shared/Error'
import queryAdresses from './queryAdresses'

const Container = styled.div`
  padding: 0 16px;
`

const EkfAdresse = ({ closeMenu }) => {
  const navigate = useNavigate()

  const { data, error, loading } = useQuery(queryAdresses)

  const choose = useCallback(
    async (event) => {
      closeMenu()
      // prevent this happening before seAnchor happened
      setTimeout(() =>
        navigate(`/Daten/Benutzer/${event.target.users?.[0]?.id}/EKF`),
      )
    },
    [closeMenu, navigate],
  )

  if (loading) return '...'
  if (error) return <Error error={error} />

  return (
    <Container>
      <Select
        value={''}
        label="EKF sehen als"
        options={data?.allAdresses?.nodes ?? []}
        loading={loading}
        saveToDb={choose}
        maxHeight={120}
      />
    </Container>
  )
}

export default EkfAdresse
