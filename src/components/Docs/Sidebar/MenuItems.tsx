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
  },
  {
    slug: 'technische-voraussetzungen',
    title: 'Technische Voraussetzungen',
  },
  {
    slug: 'tipps-fuer-den-einstieg',
    title: 'Tipps für den Einstieg',
  },
  {
    slug: 'videos-fuer-den-einstieg',
    title: 'Videos für den Einstieg',
  },
  {
    slug: 'anleitung-eingabe',
    title: 'Anleitung zur Eingabe (inhaltlich), topos',
  },
  {
    slug: 'ist-apflora-langsam',
    title: 'Ist apflora langsam?',
  },
  {
    slug: 'art-auswertung-pop-menge',
    title: 'Art: Auswertung Population Mengen',
  },
  {
    slug: 'beobachtungen-einer-teil-population-zuordnen',
    title: 'Beobachtungen Teil-Populationen zuordnen',
  },
  {
    slug: 'falsch-bestimmte-beobachtungen',
    title: 'Falsch bestimmte Beobachtungen',
  },
  {
    slug: 'erfolgs-kontrollen-planen',
    title: 'Erfolgs-Kontrollen planen',
  },
  {
    slug: 'benutzer-konti',
    title: 'Benutzer-Konti',
  },
  {
    slug: 'erfolgs-kontrollen-freiwillige',
    title: 'Erfolgs-Kontrollen Freiwillige (EKF)',
  },
  {
    slug: 'filter',
    title: 'Filter',
  },
  {
    slug: 'markdown',
    title: 'Formatierbare Felder',
  },
  {
    slug: 'historisierung',
    title: 'Historisierung',
  },
  {
    slug: 'karte-teil-populationen-aller-arten-anzeigen',
    title: 'Karte: (Teil-)Populationen aller Arten anzeigen',
  },
  {
    slug: 'karte-filter',
    title: 'Karte: Filter',
  },
  {
    slug: 'karte-symbole-und-label-fuer-populationen-und-teil-populationen-waehlen',
    title: 'Karte: Symbole und Label für (Teil-)Populationen wählen',
  },
  {
    slug: 'karte-massstab',
    title: 'Karte: Massstab',
  },
  {
    slug: 'karte-drucken',
    title: 'Karte: Drucken',
  },
  {
    slug: 'gedaechtnis',
    title: 'apflora erinnert sich an euch',
  },
  {
    slug: 'dateien',
    title: 'Dateien anfügen',
  },
  {
    slug: 'koordinaten',
    title: 'Koordinaten',
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
