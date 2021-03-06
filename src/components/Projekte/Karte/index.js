/*
 *
 * Karte
 * swisstopo wmts: https://wmts10.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml
 *
 */

import React, { useContext, useRef, useCallback, useMemo } from "react"
import { Map, ScaleControl } from "react-leaflet"
import styled from "styled-components"
import "leaflet"
import "proj4"
import "proj4leaflet"
import sortBy from "lodash/sortBy"
import debounce from "lodash/debounce"
import { observer } from "mobx-react-lite"
import { getSnapshot } from "mobx-state-tree"
import { useApolloClient } from "react-apollo-hooks"

import LayersControl from "./LayersControl"
import OsmColor from "./layers/OsmColor"
import OsmBw from "./layers/OsmBw"
import SwissTopoPixelFarbe from "./layers/SwisstopoPixelFarbe"
import SwissTopoPixelGrau from "./layers/SwisstopoPixelGrau"
import SwisstopoSiegfried from "./layers/SwisstopoSiegfried"
import SwisstopoDufour from "./layers/SwisstopoDufour"
//import BingAerial from './layers/BingAerial'
import ZhOrtho2014Rgb from "./layers/ZhOrtho2014Rgb"
import ZhOrtho2014Ir from "./layers/ZhOrtho2014Ir"
import ZhOrtho2015Rgb from "./layers/ZhOrtho2015Rgb"
import ZhOrtho2018Rgb from "./layers/ZhOrtho2018Rgb"
import ZhOrtho2018Ir from "./layers/ZhOrtho2018Ir"
import ZhOrtho2015Ir from "./layers/ZhOrtho2015Ir"
import ZhUep from "./layers/ZhUep"
import Detailplaene from "./layers/Detailplaene"
import Markierungen from "./layers/Markierungen"
import ZhSvoColor from "./layers/ZhSvoColor"
import ZhPflegeplan from "./layers/ZhPflegeplan"
import ZhSvoGrey from "./layers/ZhSvoGrey"
import ZhLrVegKartierungen from "./layers/ZhLrVegKartierungen"
import ZhLichteWaelder from "./layers/ZhLichteWaelder"
import ZhGemeindegrenzen from "./layers/ZhGemeindegrenzen"
import ZhWaelderVegetation from "./layers/ZhWaelderVegetation"
import ZhUepOverlay from "./layers/ZhUepOverlay"
import "../../../../node_modules/leaflet/dist/leaflet.css"
import "../../../../node_modules/leaflet-measure/dist/leaflet-measure.css"
import "../../../../node_modules/leaflet-draw/dist/leaflet.draw.css"
import "../../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css"
import Pop from "./layers/Pop"
import Tpop from "./layers/Tpop"
import BeobNichtBeurteilt from "./layers/BeobNichtBeurteilt"
import BeobNichtZuzuordnen from "./layers/BeobNichtZuzuordnen"
import BeobZugeordnet from "./layers/BeobZugeordnet"
import BeobZugeordnetAssignPolylines from "./layers/BeobZugeordnetAssignPolylines"
import MeasureControl from "./MeasureControl"
import FullScreenControl from "./FullScreenControl"
import SwitchScaleControl from "./ScaleControl"
import DrawControl from "./DrawControl"
// import PrintControl from './PrintControl'
import PngControl from "./PngControl"
import CoordinatesControl from "./CoordinatesControl"
import epsg4326to2056 from "../../../modules/epsg4326to2056"
import ErrorBoundary from "../../shared/ErrorBoundary"
import updateTpopById from "./updateTpopById"
import iconFullscreen from "./iconFullscreen.png"
import iconFullscreen2x from "./iconFullscreen2x.png"

import storeContext from "../../../storeContext"
//import getBounds from '../../../modules/getBounds'

// this does not work
// see issue on proj4js: https://github.com/proj4js/proj4js/issues/214
/*
const crs = new window.L.Proj.CRS(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
  {
    resolutions: [8192, 4096, 2048], // 3 example zoom level resolutions
    bounds,
  }
)*/

const Container = styled.div`
  height: calc(100vh - 64px);
  overflow: hidden;
  .map-control-scalebar-text {
    width: 83px;
  }
`
const StyledMap = styled(Map)`
  height: calc(100%);
  cursor: ${props => (props.localizing ? "crosshair" : "grab")} !important;
  @media print {
    height: 100%;
    width: 100%;
    overflow: visible;
  }

  /*
  * leaflet tooltips
  */

  .mapTooltip {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 4px 2px 0 2px;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    text-shadow: 0 1px 0 white, -0 -1px 0 white, 1px 0 0 white, -1px 0 0 white,
      0 2px 1px white, -0 -2px 1px white, 2px 0 1px white, -2px 0 1px white,
      0 3px 2px white, -0 -3px 2px white, 3px 0 2px white, -3px 0 2px white;
  }

  .leaflet-tooltip {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .leaflet-tooltip-bottom.mapTooltip:before {
    border-bottom-color: transparent;
  }

  .leaflet-tooltip-left.mapTooltip::before {
    border-left-color: transparent;
  }

  .leaflet-tooltip-right.mapTooltip::before {
    border-right-color: transparent;
  }

  /**
  * leaflet-measure
  */

  .leaflet-control-measure {
    color: black;
    border: 2px solid rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    box-shadow: none;
  }

  /**
  * leaflet maps
  */

  .popCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #9c8001;
    /*font-size: 24px;*/
    background-clip: padding-box;
    border-radius: 20px;
  }

  .popClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #9c8001;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .popCluster span {
    line-height: 30px;
  }

  .tpopCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #006d11;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .tpopClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #006d11;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .tpopCluster span {
    line-height: 30px;
  }

  .beobCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #9a009a;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #9a009a;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobNichtBeurteiltCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #9a009a;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobNichtBeurteiltClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #9a009a;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobZugeordnetCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ff00ff;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobZugeordnetClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #ff00ff;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobNichtZuzuordnenCluster {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ffe4ff;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobNichtZuzuordnenClusterHighlighted {
    width: 40px;
    height: 40px;
    line-height: 28px;
    text-align: center;
    background-color: #ffe4ff;
    border: 7px solid yellow;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: 20px;
  }

  .beobCluster span {
    line-height: 30px;
  }

  #leafletEasyPrint {
    width: 44px;
    height: 44px;
  }

  /*
   * leaflet-switch-scale-control
   */
  .map-control-scalebar-scale-item {
    cursor: pointer;
    padding: 2px 5px;
  }

  .map-control-scalebar-scale-item:hover {
    background: lightgray;
  }

  .map-control-scalebar-text {
    cursor: pointer;
    height: 20px;
    border: 2px solid #777;
    border-top: none;
    padding: 2px 5px 1px;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
  }

  .map-control-scalebar-custom-scale {
    padding: 0.2em;
    width: 10em;
  }

  .map-control-scalebar-dropdown {
    border: 2px solid #777;
    border-bottom: none;
    background: white;
    max-height: 30em;
    overflow-y: hidden;
    -webkit-transition: max-height 0.2s ease-in-out;
    -moz-transition: max-height 0.2s ease-in-out;
    -o-transition: max-height 0.2s ease-in-out;
    transition: max-height 0.2s ease-in-out;
  }

  .map-control-scalebar-custom-scale {
    font-size: 11px;
  }

  /*
   * leaflet-control-scale-line
   */
  .leaflet-control-scale-line {
    background: rgba(255, 255, 255, 0.9) !important;
  }

  /*
   * leaflet.fullscreen
   */

  .fullscreen-icon {
    background-image: url(${iconFullscreen});
  }

  .leaflet-retina .fullscreen-icon {
    background-image: url(${iconFullscreen2x});
    background-size: 26px 26px;
  }

  /* one selector per rule as explained here : http://www.sitepoint.com/html5-full-screen-api/ */

  .leaflet-container:-webkit-full-screen {
    width: 100% !important;
    height: 100% !important;
    z-index: 99999;
  }

  .leaflet-container:-ms-fullscreen {
    width: 100% !important;
    height: 100% !important;
    z-index: 99999;
  }

  .leaflet-container:full-screen {
    width: 100% !important;
    height: 100% !important;
    z-index: 99999;
  }

  .leaflet-container:fullscreen {
    width: 100% !important;
    height: 100% !important;
    z-index: 99999;
  }

  .leaflet-pseudo-fullscreen {
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    top: 0px !important;
    left: 0px !important;
    z-index: 99999;
  }

  @media print {
    .leaflet-control-container {
      display: none !important;
    }
  }
`
/*const LoadingContainer = styled.div`
  padding: 15px;
`*/

/**
 * DO NOT use component state / props to track mouseCoordinates
 * Reason: when state variable is updated, map is re-drawn
 * which results in a hideous flash (and unusability if not debounced)
 * So: need to use app level store state
 */

const Karte = ({ treeName }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const {
    activeApfloraLayers: activeApfloraLayersRaw,
    overlays,
    activeOverlays: activeOverlaysRaw,
    activeBaseLayer,
    idOfTpopBeingLocalized,
    setIdOfTpopBeingLocalized,
    bounds: boundsRaw,
    addError,
    assigningBeob,
    setMapMouseCoordinates,
    refetch,
  } = store
  const bounds = getSnapshot(boundsRaw)
  const activeApfloraLayers = getSnapshot(activeApfloraLayersRaw)
  const activeOverlays = getSnapshot(activeOverlaysRaw)

  const mapRef = useRef(null)

  const setMouseCoords = useCallback(e => {
    const [x, y] = epsg4326to2056(e.latlng.lng, e.latlng.lat)
    setMapMouseCoordinates({ x, y })
  })

  const onMouseMove = debounce(setMouseCoords, 50)

  const clustered = !(
    assigningBeob ||
    activeApfloraLayers.includes("beobZugeordnetAssignPolylines")
  )
  const OverlayComponents = useMemo(() => ({
    ZhUep: () => <ZhUepOverlay />,
    Detailplaene: () => <Detailplaene />,
    Markierungen: () => <Markierungen />,
    ZhGemeindegrenzen: () => <ZhGemeindegrenzen />,
    ZhSvoColor: () => <ZhSvoColor />,
    ZhSvoGrey: () => <ZhSvoGrey />,
    ZhPflegeplan: () => <ZhPflegeplan />,
    ZhLrVegKartierungen: () => <ZhLrVegKartierungen />,
    ZhLichteWaelder: () => <ZhLichteWaelder />,
    ZhWaelderVegetation: () => <ZhWaelderVegetation />,
  }))
  const BaseLayerComponents = useMemo(() => ({
    OsmColor: () => <OsmColor />,
    OsmBw: () => <OsmBw />,
    SwissTopoPixelFarbe: () => <SwissTopoPixelFarbe />,
    SwissTopoPixelGrau: () => <SwissTopoPixelGrau />,
    SwisstopoSiegfried: () => <SwisstopoSiegfried />,
    SwisstopoDufour: () => <SwisstopoDufour />,
    ZhUep: () => <ZhUep />,
    //BingAerial: () => <BingAerial />,
    ZhOrtho2018Rgb: () => <ZhOrtho2018Rgb />,
    ZhOrtho2018Ir: () => <ZhOrtho2018Ir />,
    ZhOrtho2015Rgb: () => <ZhOrtho2015Rgb />,
    ZhOrtho2015Ir: () => <ZhOrtho2015Ir />,
    ZhOrtho2014Rgb: () => <ZhOrtho2014Rgb />,
    ZhOrtho2014Ir: () => <ZhOrtho2014Ir />,
  }))
  const BaseLayerComponent = BaseLayerComponents[activeBaseLayer]
  const activeOverlaysSorted = sortBy(activeOverlays, activeOverlay =>
    overlays.findIndex(o => o.value === activeOverlay)
  )

  if (typeof window === "undefined") return null

  return (
    <Container data-id={`karten-container${treeName === "tree" ? 1 : 2}`}>
      <ErrorBoundary>
        <StyledMap
          localizing={!!idOfTpopBeingLocalized}
          ref={mapRef}
          bounds={bounds}
          //preferCanvas
          onMouseMove={onMouseMove}
          // need max and min zoom because otherwise
          // something errors
          // probably clustering function
          maxZoom={22}
          minZoom={0}
          doubleClickZoom={false}
          onDblclick={async event => {
            // since 2018 10 31 using idOfTpopBeingLocalized directly
            // returns null, so need to use store.idOfTpopBeingLocalized
            const { idOfTpopBeingLocalized } = store
            /**
             * TODO
             * When clicking on Layertool
             * somehow Mapelement grabs the click event
             * although Layertool lies _over_ map element ??!!
             * So when localizing, if user wants to change base map,
             * click on Layertool sets new coordinates!
             */
            if (!!idOfTpopBeingLocalized) {
              const { lat, lng } = event.latlng
              const [x, y] = epsg4326to2056(lng, lat)
              // DANGER:
              // need to stop propagation of the event
              // if not it is called a second time
              // the crazy thing is:
              // in some areas (not all) the second event
              // has wrong coordinates!!!!
              typeof window !== "undefined" &&
                window.L.DomEvent.stopPropagation(event)
              try {
                await client.mutate({
                  mutation: updateTpopById,
                  variables: {
                    id: idOfTpopBeingLocalized,
                    x,
                    y,
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    updateTpopById: {
                      tpop: {
                        id: idOfTpopBeingLocalized,
                        x,
                        y,
                        __typename: "Tpop",
                      },
                      __typename: "Tpop",
                    },
                  },
                })
                // refetch so it appears on map
                if (refetch.tpopForMap) refetch.tpopForMap()
              } catch (error) {
                addError(error)
              }
              setIdOfTpopBeingLocalized(null)
            }
          }}
        >
          {activeBaseLayer && <BaseLayerComponent />}
          {activeOverlaysSorted
            .map(overlayName => {
              const OverlayComponent = OverlayComponents[overlayName]
              return <OverlayComponent key={overlayName} />
            })
            .reverse()}
          <Pop treeName={treeName} />
          <Tpop treeName={treeName} clustered={clustered} />
          <BeobNichtBeurteilt treeName={treeName} clustered={clustered} />
          <BeobNichtZuzuordnen treeName={treeName} clustered={clustered} />
          <BeobZugeordnet treeName={treeName} clustered={clustered} />
          <BeobZugeordnetAssignPolylines treeName={treeName} />
          <ScaleControl imperial={false} />
          <LayersControl
            treeName={treeName}
            // this enforces rerendering when sorting changes
            activeOverlaysString={activeOverlays.join()}
            activeApfloraLayersString={activeApfloraLayers.join()}
          />
          <MeasureControl />
          <SwitchScaleControl />
          <FullScreenControl />
          {activeApfloraLayers.includes("mapFilter") && <DrawControl />}
          {/*
            need to get background maps to show when printing A4
            <PrintControl />
            */}
          <PngControl />
          <CoordinatesControl />
        </StyledMap>
      </ErrorBoundary>
    </Container>
  )
}

export default observer(Karte)
