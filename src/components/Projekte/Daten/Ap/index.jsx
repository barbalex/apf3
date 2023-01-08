import React, { useContext, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import Ap from './Ap'
import Auswertung from './Auswertung'
import FormTitle from '../../../shared/FormTitle'
import Files from '../../../shared/Files'
import ApHistory from './History'
import storeContext from '../../../../storeContext'
import setUrlQueryValue from '../../../../modules/setUrlQueryValue'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
const StyledTab = styled(Tab)`
  text-transform: none !important;
`
const TabContent = styled.div`
  overflow-y: auto;
`

const ApTabs = () => {
  const { apId } = useParams()
  const store = useContext(storeContext)
  const { urlQuery, setUrlQuery } = store

  const [tab, setTab] = useState(urlQuery?.apTab ?? 'ap')
  const onChangeTab = useCallback(
    (event, value) => {
      setUrlQueryValue({
        key: 'apTab',
        value,
        urlQuery,
        setUrlQuery,
      })
      setTab(value)
    },
    [setUrlQuery, urlQuery],
  )

  return (
    <ErrorBoundary>
      <Container>
        <FormTitle title="Art" />
        <Tabs
          value={tab}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <StyledTab label="Art" value="ap" data-id="ap" />
          <StyledTab
            label="Auswertung"
            value="auswertung"
            data-id="auswertung"
          />
          <StyledTab label="Dateien" value="dateien" data-id="dateien" />
          <StyledTab label="Historien" value="history" data-id="history" />
        </Tabs>
        <TabContent>
          {tab === 'ap' && <Ap />}
          {tab === 'auswertung' && <Auswertung id={apId} />}
          {tab === 'dateien' && <Files parentId={apId} parent="ap" />}
          {tab === 'history' && <ApHistory apId={apId} />}
        </TabContent>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ApTabs)
