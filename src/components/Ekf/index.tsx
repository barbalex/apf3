import React, { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import sortBy from 'lodash/sortBy'

// when Karte was loaded async, it did not load,
// but only in production!
import EkfList from './List'
import Tpopfreiwkontr from '../Projekte/Daten/Tpopfreiwkontr'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'
import AppBar from './AppBar'
import dataByUserIdGql from './dataByUserId'
import dataWithDateByUserIdGql from './dataWithDateByUserId'
import Error from '../shared/Error'

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  @media print {
    display: block;
    height: auto !important;
  }
`
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
`
const NoDataContainer = styled.div`
  padding: 15px;
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

const Ekf = () => {
  const navigate = useNavigate()
  const { userId, ekfId } = useParams()
  const { isPrint, ekfMultiPrint, ekfYear } = useContext(storeContext)

  const ekfRefDate = new Date() //.setMonth(new Date().getMonth() - 2)
  const ekfRefYear = new Date(ekfRefDate).getFullYear()

  const query =
    ekfRefYear === ekfYear ? dataByUserIdGql : dataWithDateByUserIdGql

  const { data, loading, error } = useQuery(query, {
    variables: { id: userId, jahr: ekfYear },
  })

  const ekf = getEkfFromData({ data })

  useEffect(() => {
    // navigate to first kontrId so form is shown for first ekf
    // IF none is choosen yet
    if (ekf.length > 0 && !ekfId) {
      navigate(`/Daten/Benutzer/${userId}/EKFs/${ekf[0].id}`)
    }
  }, [ekfYear, ekf.length, ekfId, ekf, navigate, userId])

  if (error) {
    return <Error error={error} />
  }

  if (!loading && ekf.length === 0) {
    return (
      <AppBar ekf={[]}>
        <NoDataContainer>
          {`Für das Jahr ${ekfYear} existieren offenbar keine Erfolgskontrollen mit Ihnen als BearbeiterIn`}
        </NoDataContainer>
      </AppBar>
    )
  }

  if (isPrint && ekf.length > 0 && ekfMultiPrint) {
    return (
      <AppBar ekf={ekf}>
        <>
          {ekf.map((e) => (
            <Tpopfreiwkontr treeName="tree" id={e.id} key={e.id} />
          ))}
        </>
      </AppBar>
    )
  }

  return (
    <AppBar ekf={ekf}>
      <Container>
        <StyledSplitPane split="vertical" size="33%" minSize={100}>
          <InnerContainer>
            <EkfList ekf={ekf} />
          </InnerContainer>
          <InnerContainer>
            {ekfId ? <Tpopfreiwkontr treeName="tree" /> : <InnerContainer />}
          </InnerContainer>
        </StyledSplitPane>
      </Container>
    </AppBar>
  )
}

export default observer(Ekf)
