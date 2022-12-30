import React, { useContext } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'

import MenuItem from './MenuItem'
import storeContext from '../../../storeContext'

// dont know why but divider is too thick,
// thicker than ListItemButton divider
const StyledDivider = styled(Divider)`
  height: unset !important;
  background: unset !important;
`

const nodes = [
  {
    slug: 'was-kann-man-mit-apflora-machen',
    title: 'Was kann man mit apflora.ch machen?',
    sort: 1,
  },
  {
    slug: 'technische-voraussetzungen',
    title: 'Technische Voraussetzungen',
    sort: 4,
  },
  {
    slug: 'tipps-fuer-den-einstieg',
    title: 'Tipps für den Einstieg',
    sort: 5,
  },
  {
    slug: 'videos-fuer-den-einstieg',
    title: 'Videos für den Einstieg',
    sort: 6,
  },
]

const MenuItems = () => {
  const { dokuFilter } = useContext(storeContext)
  const nodesFiltered = nodes.filter(
    (node) => node.title?.toLowerCase?.()?.includes?.(dokuFilter) ?? true,
  )

  return (
    <List component="nav">
      <StyledDivider />
      {nodesFiltered.map((node) => (
        <MenuItem node={node} key={node?.slug} />
      ))}
    </List>
  )
}

export default MenuItems
