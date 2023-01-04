import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

// when Karte was loaded async, it did not load,
// but only in production!
import EkfList from './ListContainer'
import Tpopfreiwkontr from '../Projekte/Daten/Tpopfreiwkontr'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'
import AppBar from './AppBar'

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

const Ekf = () => {
  const { userId, ekfId } = useParams()
  const { isPrint, ekfIds: ekfIdsRaw, ekfMultiPrint } = useContext(storeContext)

  const ekfIds = ekfIdsRaw?.toJSON()
  if (isPrint && ekfIds.length > 0 && ekfMultiPrint) {
    return (
      <AppBar>
        <>
          {ekfIds.map((id) => (
            <Tpopfreiwkontr treeName="tree" id={id} key={id} />
          ))}
        </>
      </AppBar>
    )
  }

  return (
    <AppBar>
      <Container>
        <StyledSplitPane split="vertical" size="33%" minSize={100}>
          <InnerContainer>
            <EkfList />
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
