/**
 * this is own component
 * because of the conditional query
 */
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import sortBy from 'lodash/sortBy'
import { useParams } from 'react-router-dom'

import storeContext from '../../../storeContext'
import dataByUserIdGql from './dataByUserId'
import dataWithDateByUserIdGql from './dataWithDateByUserId'
import List from './List'
import Error from '../../shared/Error'
import initiateDataFromUrl from './initiateDataFromUrl'

const NoDataContainer = styled.div`
  padding 15px;
`

const getEkfFromData = ({ data }) => {
  const ekfNodes =
    data?.userById?.adresseByAdresseId?.tpopkontrsByBearbeiter?.nodes ?? []

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
  const { userId } = useParams()

  const store = useContext(storeContext)
  const { ekfYear, setEkfIds } = store

  const ekfRefDate = new Date() //.setMonth(new Date().getMonth() - 2)
  const ekfRefYear = new Date(ekfRefDate).getFullYear()

  const query =
    ekfRefYear === ekfYear ? dataByUserIdGql : dataWithDateByUserIdGql

  const { data, loading, error } = useQuery(query, {
    variables: { id: userId, jahr: ekfYear },
  })

  const ekf = getEkfFromData({ data })
  setEkfIds(ekf.map((e) => e.id))

  const { activeNodeArray } = store.tree
  const activeTpopkontrId =
    activeNodeArray.length > 9
      ? activeNodeArray[9]
      : '99999999-9999-9999-9999-999999999999'
  useEffect(() => {
    // set initial kontrId so form is shown for first ekf
    // IF none is choosen yet
    if (ekf.length > 0 && !activeTpopkontrId) {
      const row = ekf[0]
      const url = [
        'Projekte',
        row.projId,
        'Arten',
        row.apId,
        'Populationen',
        row.popId,
        'Teil-Populationen',
        row.tpopId,
        'Freiwilligen-Kontrollen',
        row.id,
      ]
      initiateDataFromUrl({
        activeNodeArray: url,
        store,
      })
    }
  }, [ekfYear, ekf.length, ekf, activeTpopkontrId, store])

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

  return <List ekf={ekf} activeTpopkontrId={activeTpopkontrId} />
}

export default observer(EkfListContainer)
