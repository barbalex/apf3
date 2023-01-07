import React, { useState } from 'react'
import styled from '@emotion/styled'

import ApFilter from '../Daten/ApFilter'
import PopFilter from '../Daten/PopFilter'
import TpopFilter from '../Daten/TpopFilter'
import TpopmassnFilter from '../Daten/TpopmassnFilter'
import TpopfeldkontrFilter from '../Daten/TpopfeldkontrFilter'
import TpopfreiwkontrFilter from '../Daten/TpopfreiwkontrFilter'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Title from './Title'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffd3a7;
`

const Filter = () => {
  const [activeTab, setActiveTab] = useState('ap')

  return (
    <ErrorBoundary>
      <Container>
        <Title activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'ap' && <ApFilter />}
        {activeTab === 'pop' && <PopFilter />}
        {activeTab === 'tpop' && <TpopFilter />}
        {activeTab === 'tpopmassn' && <TpopmassnFilter />}
        {activeTab === 'tpopfeldkontr' && <TpopfeldkontrFilter />}
        {activeTab === 'tpopfreiwkontr' && <TpopfreiwkontrFilter />}
      </Container>
    </ErrorBoundary>
  )
}

export default Filter
