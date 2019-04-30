import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Location } from '@reach/router'
import { Link } from 'gatsby'

// need to prevent boolean props from being passed to dom
const StyledButton = ({ preceded, followed, ...rest }) => {
  const StyledButton = styled(Button)`
    color: white !important;
    border-color: rgba(255, 255, 255, 0.5) !important;
    border-right-color: ${followed
      ? ' rgba(255, 255, 255, 0.25)'
      : ' rgba(255, 255, 255, 0.5)'} !important;
    border-left-color: ${preceded
      ? ' rgba(255, 255, 255, 0.25)'
      : ' rgba(255, 255, 255, 0.5)'} !important;
    border-top-left-radius: ${preceded ? '0' : '4px'} !important;
    border-bottom-left-radius: ${preceded ? '0' : '4px'} !important;
    border-top-right-radius: ${followed ? '0' : '4px'} !important;
    border-bottom-right-radius: ${followed ? '0' : '4px'} !important;
    margin-right: ${followed ? '-1px' : 'unset'} !important;
    text-transform: none !important;
  `
  return <StyledButton {...rest} />
}

const MyAppBar = () => {
  return (
    <Location>
      {({ location }) => {
        const { pathname } = location

        return (
          <>
            <StyledButton
              variant={
                pathname.startsWith('/Benutzer-Dokumentation')
                  ? 'outlined'
                  : 'text'
              }
              component={Link}
              to="/Benutzer-Dokumentation/"
            >
              Benutzer-Dokumentation
            </StyledButton>
            <StyledButton
              variant={
                pathname.startsWith('/Technische-Dokumentation')
                  ? 'outlined'
                  : 'text'
              }
              component={Link}
              to="/Technische-Dokumentation/"
            >
              Technische Dokumentation
            </StyledButton>
            <StyledButton variant="text" component={Link} to="/Daten/Projekte/">
              Aktionspläne bearbeiten
            </StyledButton>
          </>
        )
      }}
    </Location>
  )
}

export default observer(MyAppBar)
