import React, { useCallback } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router-dom'

const MenuItem = ({ node }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { slug, title } = node
  const activeUrl = `/Dokumentation/${slug}`
  const active =
    activeUrl === location.pathname || `${activeUrl}/` === location.pathname

  const onClickMenuItem = useCallback(() => {
    navigate(`${activeUrl}/`)
  }, [activeUrl, navigate])

  return (
    <>
      <ListItemButton onClick={onClickMenuItem} selected={active} divider dense>
        <ListItemText onClick={onClickMenuItem}>
          {title ?? '(Titel fehlt)'}
        </ListItemText>
      </ListItemButton>
    </>
  )
}

export default MenuItem
