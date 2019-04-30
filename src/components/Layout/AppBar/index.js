import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Location } from '@reach/router'
import { Link } from 'gatsby'

import isMobilePhone from '../../../modules/isMobilePhone'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Doku from './Doku'
import Projekte from './Projekte'
import storeContext from '../../../storeContext'

const StyledAppBar = styled(AppBar)`
  min-height: 64px !important;
  @media print {
    display: none !important;
  }
`
const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  padding-left: 4px !important;
  padding-right: 4px !important;
`
const SiteTitle = styled(Button)`
  display: none !important;
  color: white !important;
  font-size: 20px !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: none !important;
  @media (min-width: 750px) {
    display: block !important;
  }
  :hover {
    border-width: 1px !important;
  }
`
const MenuDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MyAppBar = () => {
  const store = useContext(storeContext)
  const { view } = store

  const isMobile = isMobilePhone()

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location
        const isProjekte = pathname.startsWith('/Daten')

        return (
          <ErrorBoundary>
            <StyledAppBar position="fixed">
              <StyledToolbar>
                {!isMobile && (
                  <SiteTitle
                    variant="outlined"
                    component={Link}
                    to="/"
                    title="Home"
                  >
                    {view === 'ekf'
                      ? 'AP Flora: Erfolgs-Kontrolle Freiwillige'
                      : 'AP Flora'}
                  </SiteTitle>
                )}
                <MenuDiv>{isProjekte ? <Projekte /> : <Doku />}</MenuDiv>
              </StyledToolbar>
            </StyledAppBar>
          </ErrorBoundary>
        )
      }}
    </Location>
  )
}

export default observer(MyAppBar)
