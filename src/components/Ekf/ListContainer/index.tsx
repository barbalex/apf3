/**
 * this is own component
 * because of the conditional query
 */
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import sortBy from 'lodash/sortBy'

import storeContext from '../../../storeContext'
import dataByUserNameGql from './dataByUserName'
import dataByAdresseIdGql from './dataByAdresseId'
import dataWithDateByUserNameGql from './dataWithDateByUserName'
import dataWithDateByAdresseIdGql from './dataWithDateByAdresseId'
import List from './List'
import Error from '../../shared/Error'

const NoDataContainer = styled.div`
  padding 15px;
`

const getEkfFromData = ({ data, ekfAdresseId }) => {
  const ekfNodes = ekfAdresseId
    ? data?.adresseById?.tpopkontrsByBearbeiter?.nodes ?? []
    : data?.userByName?.adresseByAdresseId?.tpopkontrsByBearbeiter?.nodes ?? []

  const ekf = ekfNodes.map((e) => ({
    projekt: e?.tpopByTpopId?.popByPopId?.apByApId?.projektByProjId?.name ?? '',
    projId: e?.tpopByTpopId?.popByPopId?.apByApId?.projektByProjId?.id,
    art:
      e?.tpopByTpopId?.popByPopId?.apByApId?.aeTaxonomyByArtId?.artname ?? '',
    apId: e?.tpopByTpopId?.popByPopId?.apByApId?.id,
    pop: `${e?.tpopByTpopId?.popByPopId?.nr ?? '(keine Nr)'}: ${
      e?.tpopByTpopId?.popByPopId?.name ?? '(kein Name)'
    }`,
    popId: e?.tpopByTpopId?.popByPopId?.id,
    popSort: e?.tpopByTpopId?.popByPopId?.nr ?? '(keine Nr)',
    tpop: `${e?.tpopByTpopId?.nr ?? '(keine Nr)'}: ${
      e?.tpopByTpopId?.flurname ?? '(kein Flurname)'
    }`,
    tpopId: e?.tpopByTpopId?.id,
    tpopSort: e?.tpopByTpopId?.nr ?? '(keine Nr)',
    id: e.id,
  }))

  return sortBy(ekf, ['projekt', 'art', 'popSort', 'tpopSort'])
}

const EkfListContainer = () => {
  const store = useContext(storeContext)
  const { ekfYear, ekfAdresseId, user, setEkfIds } = store

  let query = ekfAdresseId ? dataByAdresseIdGql : dataByUserNameGql
  const ekfRefDate = new Date() //.setMonth(new Date().getMonth() - 2)
  const ekfRefYear = new Date(ekfRefDate).getFullYear()
  if (ekfRefYear !== ekfYear) {
    query = ekfAdresseId
      ? dataWithDateByAdresseIdGql
      : dataWithDateByUserNameGql
  }
  const { name: userName } = user
  const variables = ekfAdresseId
    ? { id: ekfAdresseId, jahr: ekfYear }
    : { userName, jahr: ekfYear }

  const { data, loading, error } = useQuery(query, {
    variables,
  })

  const ekf = getEkfFromData({ data, ekfAdresseId })
  setEkfIds(ekf.map((e) => e.id))

  if (error) {
    return <Error error={error} />
  }

  if (!loading && ekf.length === 0) {
    return (
      <NoDataContainer>
        {`Für das Jahr ${ekfYear} existieren offenbar keine Erfolgskontrollen mit Ihnen als BearbeiterIn`}
      </NoDataContainer>
    )
  }

  return <List ekf={ekf} />
}

export default observer(EkfListContainer)
