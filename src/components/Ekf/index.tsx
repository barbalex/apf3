import React, { useContext, useRef } from 'react'
import styled from '@emotion/styled'
import jwtDecode from 'jwt-decode'
import { observer } from 'mobx-react-lite'

// when Karte was loaded async, it did not load,
// but only in production!
import EkfList from './ListContainer'
import Tpopfreiwkontr from '../Projekte/Daten/Tpopfreiwkontr'
import storeContext from '../../storeContext'
import StyledSplitPane from '../shared/StyledSplitPane'

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
  const {
    user,
    isPrint,
    tree,
    ekfIds: ekfIdsRaw,
    ekfMultiPrint,
  } = useContext(storeContext)
  const { token } = user
  const tokenDecoded = token ? jwtDecode(token) : null
  const role = tokenDecoded ? tokenDecoded.role : null

  const { activeNodeArray } = tree
  const tpopkontrId =
    activeNodeArray.length > 9
      ? activeNodeArray[9]
      : '99999999-9999-9999-9999-999999999999'
  const tpopkontrIdExists =
    tpopkontrId !== '99999999-9999-9999-9999-999999999999'
  const treeName = 'tree'

  const treeEl = useRef(null)
  const datenEl = useRef(null)

  const ekfIds = ekfIdsRaw?.toJSON()
  if (isPrint && ekfIds.length > 0 && ekfMultiPrint) {
    return (
      <>
        {ekfIds.map((id) => (
          <Tpopfreiwkontr treeName={treeName} role={role} id={id} key={id} />
        ))}
      </>
    )
  }

  if (isPrint && tpopkontrIdExists) {
    return <Tpopfreiwkontr treeName={treeName} role={role} />
  }

  return (
    <Container>
      <StyledSplitPane split="vertical" size="33%" minSize={100}>
        <InnerContainer ref={treeEl}>
          <EkfList />
        </InnerContainer>
        <InnerContainer ref={datenEl}>
          {tpopkontrIdExists ? (
            <Tpopfreiwkontr treeName={treeName} role={role} />
          ) : (
            <InnerContainer />
          )}
        </InnerContainer>
      </StyledSplitPane>
    </Container>
  )
}

export default observer(Ekf)
