import { createGlobalStyle } from "styled-components"

export default () => createGlobalStyle`
  html,
  body,#___gatsby {
    overflow: hidden !important;
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #fffde7;
  }

  @media print {
    html,
    body {
      background-color: white !important;
      height: auto !important;
    }

    #___gatsby {
      background-color: white !important;
      height: auto !important;
      min-height: auto !important;
    }

    #___gatsby>div {
      height: auto !important;
      display: block !important;
    }
  }

  a {
    color: #f57c00;
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
    text-shadow: 0 1px 0 white, -0 -1px 0 white, 1px 0 0 white, -1px 0 0 white, 0 2px 1px white, -0 -2px 1px white, 2px 0 1px white, -2px 0 1px white, 0 3px 2px white, -0 -3px 2px white, 3px 0 2px white, -3px 0 2px white;
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

  @media print {
    .leaflet-control-container {
      display: none !important;
    }
  }

  /* scrollbars */

  ::-webkit-scrollbar {
    width: 12px;
    background: rgba(255, 253, 231, 0.1);
  }

  ::-webkit-scrollbar:horizontal {
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.5);
    background: rgba(85, 85, 85, 0.05);
  }

  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  /*
  * seems that overflow:hidden is necessary
  * for all relfex-elements
  * BUT: map is not shown with it...
  */

  .reflex-element:not(.karte) {
    border-right: 0 !important;
    border-left: 0 !important;
  }


  .reflex-element:not(.karte) {
    overflow-x: hidden;
  }

  .reflex-splitter {
    background-color: #388e3c !important;
    border-right: 1px solid #388e3c !important;
    border-left: 1px solid #388e3c !important;
  }

  .reflex-splitter:hover {
    background-color: #fff06c !important;
    border-right: 1px solid #fff06c !important;
    border-left: 1px solid #fff06c !important;
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
    width: 5em;
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
    background-image: url(./etc/icon-fullscreen.png);
  }

  .leaflet-retina .fullscreen-icon {
    background-image: url(./etc/icon-fullscreen-2x.png);
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

  .ReactVirtualized__Grid {
    outline: none;
  }
`
