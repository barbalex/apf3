import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/client'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
// import { useMap } from 'react-leaflet'

import Marker from './Marker'
import storeContext from '../../../../../storeContext'
import query from './query'

const iconCreateFunction = function (cluster) {
  const markers = cluster.getAllChildMarkers()
  const hasHighlightedTpop = markers.some(
    (m) => m.options.icon.options.className === 'beobIconHighlighted',
  )
  const className = hasHighlightedTpop
    ? 'beobZugeordnetClusterHighlighted'
    : 'beobZugeordnetCluster'

  return window.L.divIcon({
    html: markers.length,
    className,
    iconSize: window.L.point(40, 40),
  })
}

const BeobNichtZuzuordnenMarker = ({ treeName, clustered }) => {
  // const leafletMap = useMap()
  const store = useContext(storeContext)
  const { enqueNotification } = store
  const tree = store[treeName]
  const { beobGqlFilter } = tree

  const { data, error } = useQuery(query, {
    variables: {
      beobFilter: beobGqlFilter('nichtZuzuordnen').filtered,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [refetchProvoker, setRefetchProvoker] = useState(1)
  // useEffect(() => {
  //   // DO NOT use:
  //   // leafletMap.on('zoomend dragend', refetch
  //   // see: https://github.com/apollographql/apollo-client/issues/1291#issuecomment-367911441
  //   // Also: leafletMap.on('zoomend dragend', ()=> refetch()) never refetches!!??
  //   // Also: use dragend, not moveend because moveend fires on zoomend as well
  //   leafletMap.on('zoomend dragend', () => setRefetchProvoker(Math.random()))
  //   return () => {
  //     leafletMap.off('zoomend dragend', () => setRefetchProvoker(Math.random()))
  //   }
  // }, [leafletMap])

  if (error) {
    enqueNotification({
      message: `Fehler beim Laden der Nicht zuzuordnenden Beobachtungen für die Karte: ${error.message}`,
      options: {
        variant: 'error',
      },
    })
  }

  const beobMarkers = (data?.allBeobs?.nodes ?? []).map((beob) => (
    <Marker key={beob.id} treeName={treeName} beob={beob} />
  ))

  if (clustered) {
    return (
      <MarkerClusterGroup
        maxClusterRadius={66}
        iconCreateFunction={iconCreateFunction}
      >
        {beobMarkers}
      </MarkerClusterGroup>
    )
  }
  return beobMarkers
}

export default observer(BeobNichtZuzuordnenMarker)
