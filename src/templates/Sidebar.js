import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { Link } from 'gatsby'

import MenuItem from './MenuItem'

const Menu = styled.div`
  width: 25%;
  min-width: 320px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 25px 0;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`
const MenuTitle = styled.div`
  padding: 0 16px;
  margin-bottom: 14px;
`
const MenuTitleLink = styled(Link)`
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  &:hover {
    text-decoration: underline;
  }
`

const Sidebar = ({ title, titleLink, edges }) => {
  return (
    <Menu>
      <MenuTitle>
        <MenuTitleLink to={titleLink}>{title}</MenuTitleLink>
      </MenuTitle>
      <List component="nav">
        <Divider />
        {edges
          .filter(n => !!n && !!n.node)
          .map(({ node }) => (
            <MenuItem node={node} key={node.id} />
          ))}
      </List>
    </Menu>
  )
}

export default Sidebar
