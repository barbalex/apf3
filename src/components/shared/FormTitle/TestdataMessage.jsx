import React, { useContext } from 'react'
import styled from '@emotion/styled'

import constants from '../../../modules/constants'
import storeContext from '../../../storeContext'

const Div = styled.div`
  color: #c8e6c9;
  padding: 0 10px 10px 10px;
  margin-top: -5px;
`

const TestdataMessage = ({ apId }) => {
  const store = useContext(storeContext)
  const { apIdInActiveNodeArray } = store.tree
  const apIdUsed = apIdInActiveNodeArray || apId
  const isTestAp = apIdUsed && constants.testAps.includes(apIdUsed)

  if (isTestAp) {
    return (
      <Div data-id="testdata-message">
        Das ist eine Test-Art. Sie können alles ausprobieren!
      </Div>
    )
  }
  return null
}

export default TestdataMessage
