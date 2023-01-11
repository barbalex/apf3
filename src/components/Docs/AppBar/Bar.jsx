import React from 'react'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useLocation, Link } from 'react-router-dom'

import isMobilePhone from '../../../modules/isMobilePhone'

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

const StyledButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  text-transform: none !important;
`
const DokuAppBar = () => {
  const isMobile = isMobilePhone()
  const { pathname, search } = useLocation()

  return (
    <>
      {!isMobile && (
        <SiteTitle
          variant="outlined"
          component={Link}
          to={`/${search}`}
          title="Home"
        >
          AP Flora
        </SiteTitle>
      )}
      <MenuDiv>
        <StyledButton
          variant="text"
          component={Link}
          to={`/Daten/Projekte/e57f56f4-4376-11e8-ab21-4314b6749d13${search}`}
        >
          Arten bearbeiten
        </StyledButton>
        <StyledButton
          variant={pathname.startsWith('/Dokumentation') ? 'outlined' : 'text'}
          component={Link}
          to={`/Dokumentation/${search}`}
        >
          Dokumentation
        </StyledButton>
      </MenuDiv>
    </>
  )
}

export default observer(DokuAppBar)
