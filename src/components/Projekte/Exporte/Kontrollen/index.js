import React, { useContext, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from 'react-apollo-hooks'

import exportModule from '../../../../modules/export'
import Message from '../Message'
import storeContext from '../../../../storeContext'

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: #fff8e1 !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
  user-select: none;
`
const StyledCardContent = styled(CardContent)`
  margin: -15px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  align-content: stretch;
`
const DownloadCardButton = styled(Button)`
  flex-basis: 450px;
  > span:first-of-type {
    text-transform: none !important;
    font-weight: 500;
    display: block;
    text-align: left;
    justify-content: flex-start !important;
    user-select: none;
  }
`

const Kontrollen = () => {
  const client = useApolloClient()
  const {
    mapFilter,
    addError,
    exportApplyMapFilter,
    exportFileType,
  } = useContext(storeContext)
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState(null)

  return (
    <StyledCard>
      <StyledCardActions
        disableActionSpacing
        onClick={() => setExpanded(!expanded)}
      >
        <CardActionTitle>Kontrollen</CardActionTitle>
        <CardActionIconButton
          data-expanded={expanded}
          aria-expanded={expanded}
          aria-label="öffnen"
        >
          <Icon title={expanded ? 'schliessen' : 'öffnen'}>
            <ExpandMoreIcon />
          </Icon>
        </CardActionIconButton>
      </StyledCardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <StyledCardContent>
          <DownloadCardButton
            onClick={async () => {
              setMessage('Export "Kontrollen" wird vorbereitet...')
              try {
                const { data } = await client.query({
                  query: await import('./allVTpopkontrs').then(m => m.default),
                })
                exportModule({
                  data: get(data, 'allVTpopkontrs.nodes', []),
                  fileName: 'Kontrollen',
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: 'tpop_id',
                  xKey: 'tpop_x',
                  yKey: 'tpop_y',
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Kontrollen
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage('Export "KontrollenWebGisBun" wird vorbereitet...')
              try {
                const { data } = await client.query({
                  query: await import('./allVTpopkontrWebgisbuns').then(
                    m => m.default,
                  ),
                })
                exportModule({
                  data: get(data, 'allVTpopkontrWebgisbuns.nodes', []),
                  fileName: 'KontrollenWebGisBun',
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: 'TPOPGUID',
                  xKey: 'KONTR_X',
                  yKey: 'KONTR_Y',
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Kontrollen für WebGIS BUN
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "KontrollenAnzahlProZaehleinheit" wird vorbereitet...',
              )
              try {
                const { data } = await client.query({
                  query: await import('./allVKontrzaehlAnzproeinheits').then(
                    m => m.default,
                  ),
                })
                exportModule({
                  data: get(data, 'allVKontrzaehlAnzproeinheits.nodes', []),
                  fileName: 'KontrollenAnzahlProZaehleinheit',
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: 'tpop_id',
                  xKey: 'tpop_x',
                  yKey: 'tpop_y',
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Kontrollen: Anzahl pro Zähleinheit
          </DownloadCardButton>
        </StyledCardContent>
      </Collapse>
      {!!message && <Message message={message} />}
    </StyledCard>
  )
}

export default observer(Kontrollen)
