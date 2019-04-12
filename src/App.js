// @flow
/**
 * app.js
 *
 * This is the entry file for the application.
 * Contains only setup, theming and boilerplate code
 *
 */

import "babel-polyfill"

import React, { useState } from "react"

import { MuiThemeProvider } from "@material-ui/core/styles"
import theme from "./utils/materialTheme"
import moment from "moment"
import "moment/locale/de-ch" // this is the important bit, you have to import the locale your'e trying to use.
import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "material-ui-pickers"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import MobxStore from "./store"
//import { onPatch } from 'mobx-state-tree'

import "typeface-roboto"

// import components
import initializeIdb from "./modules/initializeIdb"
import buildClient from "./client"

import initiateDataFromUrl from "./modules/initiateDataFromUrl"

import AppContainer from "./components/AppContainer"
import Print from "./components/Print"
import historyListen from "./modules/historyListen"

import createGlobalStyle from "./utils/createGlobalStyle"

import { Provider as MobxProvider } from "./storeContext"
import { Provider as IdbProvider } from "./idbContext"

import createInitialStore from "./store/initial"
import "react-leaflet-markercluster/dist/styles.min.css"

const GlobalStyle = createGlobalStyle()

const App = ({ element }) => {
  // prevent changing values in number inputs when scrolling pages!
  // see: http://stackoverflow.com/a/38589039/712005
  // and: https://stackoverflow.com/a/42058469/712005
  typeof window !== "undefined" &&
    document.addEventListener("wheel", function(event) {
      if (window.document.activeElement.type === "number") {
        event.preventDefault()
      }
    })

  const [store, setStore] = useState({})
  const [client, setClient] = useState({})

  const idb = initializeIdb()

  createInitialStore({ idb }).then(initialStore => {
    setStore(MobxStore.create(initialStore))
    setClient(buildClient({ idb, store }))
    initiateDataFromUrl({
      store,
    })
    //onPatch(store, patch => console.log(patch))
    // begin _after_ initiation data from url
    store.history.listen((location, action) =>
      historyListen({
        location,
        action,
        store,
      })
    )
    if (typeof window !== "undefined" && window.Cypress) {
      // enable directly using these in tests
      window.__client__ = client
      window.__store__ = store
      window.__idb__ = idb
    }
  })

  const idbContext = { idb }

  return (
    <IdbProvider value={idbContext}>
      <MobxProvider value={store}>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <MuiThemeProvider theme={theme}>
              <>
                <Print />
                <MuiPickersUtilsProvider
                  utils={MomentUtils}
                  moment={moment}
                  locale="de-ch"
                >
                  {/*<AppContainer />*/}
                  <GlobalStyle />
                  {element}
                </MuiPickersUtilsProvider>
              </>
            </MuiThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </MobxProvider>
    </IdbProvider>
  )
}

export default App
