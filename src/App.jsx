// This is the entry file for the application
import React from 'react'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import theme from './utils/materialTheme'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import de from 'date-fns/locale/de'
import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MobxStore from './store'
import { SnackbarProvider } from 'notistack'
//import { onPatch } from 'mobx-state-tree'

import initializeIdb from './modules/initializeIdb'
import buildClient from './client'

// see: https://github.com/fontsource/fontsource/blob/master/packages/roboto
import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/700.css'
// see: https://github.com/fontsource/fontsource/tree/master/packages/roboto-mono
import '@fontsource/roboto'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import GlobalStyle from './components/GlobalStyle'

import { Provider as MobxProvider } from './storeContext'
import { Provider as IdbProvider } from './idbContext'

import Notifier from './components/shared/Notifier'
import NotificationDismisser from './components/shared/NotificationDismisser'

import initiateDataFromUrl from './modules/initiateDataFromUrl'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

import 'simplebar/dist/simplebar.min.css'

import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import Router from './components/Router'
import IsPrintSetter from './components/IsPrintSetter'
import LastTouchedNodeSetter from './components/LastTouchedNodeSetter'
import ActiveNodeArraySetter from './components/ActiveNodeArraySetter'
import NavigateSetter from './components/NavigateSetter'
import MouseWheelHandler from './components/MouseWheelHandler'
import LegacyBrowserInformer from './components/LegacyBrowserInformer'
import StorePersister from './components/StorePersister'

registerLocale('de', de)
setDefaultLocale('de')

const queryClient = new QueryClient()

const App = () => {
  const idb = initializeIdb()
  const store = MobxStore.create()
  const client = buildClient({ store })
  const idbContext = { idb }

  // initiate now even if StorePersister is not finished
  // this prevents ui-flickering
  const activeNodeArray = getActiveNodeArrayFromPathname()
  if (activeNodeArray[0] === 'Projekte') {
    initiateDataFromUrl({
      store,
    })
  }

  console.log('App rendering')

  return (
    <IdbProvider value={idbContext}>
      <MobxProvider value={store}>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <SnackbarProvider
                  maxSnack={3}
                  preventDuplicate
                  autoHideDuration={20000}
                  action={(key) => <NotificationDismisser nKey={key} />}
                >
                  <>
                    <GlobalStyle />
                    <Router />
                    <Notifier />
                    <IsPrintSetter />
                    <LastTouchedNodeSetter />
                    <ActiveNodeArraySetter />
                    <NavigateSetter />
                    <MouseWheelHandler />
                    <LegacyBrowserInformer />
                    <StorePersister />
                  </>
                </SnackbarProvider>
              </ThemeProvider>
            </StyledEngineProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </MobxProvider>
    </IdbProvider>
  )
}

export default App