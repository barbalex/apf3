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
  {
    slug: 'anleitung-eingabe',
    title: 'Anleitung zur Eingabe (inhaltlich), topos',
    sort: 7,
  },
  {
    slug: 'ist-apflora-langsam',
    title: 'Ist apflora langsam?',
    sort: 8,
  },
  {
    slug: 'art-auswertung-pop-menge',
    title: 'Art: Auswertung Population Mengen',
    sort: 9,
  },
  {
    slug: 'beobachtungen-einer-teil-population-zuordnen',
    title: 'Beobachtungen Teil-Populationen zuordnen',
    sort: 10,
  },
  {
    slug: 'falsch-bestimmte-beobachtungen',
    title: 'Falsch bestimmte Beobachtungen',
    sort: 11,
  },
  {
    slug: 'erfolgs-kontrollen-planen',
    title: 'Erfolgs-Kontrollen planen',
    sort: 12,
  },
  {
    slug: 'benutzer-konti',
    title: 'Benutzer-Konti',
    sort: 13,
  },
  {
    slug: 'erfolgs-kontrollen-freiwillige',
    title: 'Erfolgs-Kontrollen Freiwillige (EKF)',
    sort: 13,
  },
  {
    slug: 'filter',
    title: 'Filter',
    sort: 14,
  },
  {
    slug: 'markdown',
    title: 'Formatierbare Felder',
    sort: 15,
  },
  {
    slug: 'historisierung',
    title: 'Historisierung',
    sort: 16,
  },
  {
    slug: 'karte-teil-populationen-aller-arten-anzeigen',
    title: 'Karte: (Teil-)Populationen aller Arten anzeigen',
    sort: 17,
  },
  {
    slug: 'karte-filter',
    title: 'Karte: Filter',
    sort: 19,
  },
  {
    slug: 'karte-symbole-und-label-fuer-populationen-und-teil-populationen-waehlen',
    title: 'Karte: Symbole und Label für (Teil-)Populationen wählen',
    sort: 19,
  },
  {
    slug: 'karte-massstab',
    title: 'Karte: Massstab',
    sort: 20,
  },
  {
    slug: 'karte-drucken',
    title: 'Karte: Drucken',
    sort: 21,
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
