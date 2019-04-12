import { createGlobalStyle } from "styled-components"

export default () => createGlobalStyle`
  html,
  body,
  #___gatsby {
    overflow: hidden !important;
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #fffde7;
    color: rgba(0,0,0,0.87);
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

  .ReactVirtualized__Grid {
    outline: none;
  }
`
