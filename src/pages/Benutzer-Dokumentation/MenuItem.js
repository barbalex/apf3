import React, { useCallback } from 'react'
import { navigate } from 'gatsby'
import MListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import get from 'lodash/get'
import styled from 'styled-components'

import ErrorBoundary from '../../components/shared/ErrorBoundary'

const ListItem = styled(MListItem)`
  padding-top: 7px !important;
  padding-bottom: 7px !important;
`

const BenutzerDokuMenuItem = ({ post }) => {
  const onClickMenuItem = useCallback(() =>
    navigate(`${post.frontmatter.path}/`, [post]),
  )

  return (
    <ErrorBoundary>
      <>
        <ListItem button onClick={onClickMenuItem}>
          <ListItemText onClick={onClickMenuItem}>
            {get(post, 'frontmatter.title', '(Titel fehlt)')}
          </ListItemText>
        </ListItem>
        <Divider />
      </>
    </ErrorBoundary>
  )
}

export default BenutzerDokuMenuItem
