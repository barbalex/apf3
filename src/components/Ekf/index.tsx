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
import App from '../../App'

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
  const { userId } = useParams()
  console.log('EKF', { userId })
  const {
    isPrint,
    tree,
    ekfIds: ekfIdsRaw,
    ekfMultiPrint,
  } = useContext(storeContext)

  const { activeNodeArray } = tree
  const tpopkontrId =
    activeNodeArray.length > 9
      ? activeNodeArray[9]
      : '99999999-9999-9999-9999-999999999999'
  const tpopkontrIdExists =
    tpopkontrId !== '99999999-9999-9999-9999-999999999999'
  const treeName = 'tree'

  const ekfIds = ekfIdsRaw?.toJSON()
  if (isPrint && ekfIds.length > 0 && ekfMultiPrint) {
    return (
      <AppBar>
        <>
          {ekfIds.map((id) => (
            <Tpopfreiwkontr treeName={treeName} id={id} key={id} />
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
            {tpopkontrIdExists ? (
              <Tpopfreiwkontr treeName={treeName} />
            ) : (
              <InnerContainer />
            )}
          </InnerContainer>
        </StyledSplitPane>
      </Container>
    </AppBar>
  )
}

export default observer(Ekf)
