// This is the entry file for the application
import queryString from 'query-string'

import localForage from 'localforage'
import MobxStore from '../store'
//import { onPatch } from 'mobx-state-tree'
import { getSnapshot } from 'mobx-state-tree'

import initializeIdb from '../modules/initializeIdb'
import buildClient from '../client'
import isObject from '../modules/isObject'

import setUserFromIdb from '../modules/setUserFromIdb'
import initiateDataFromUrl from '../modules/initiateDataFromUrl'
import getActiveNodeArrayFromPathname from '../modules/getActiveNodeArrayFromPathname'

const StorePersister = () => {
  const idb = initializeIdb()
  const store = MobxStore.create()
  const client = buildClient({ store })

  const visitedTopDomain = window.location.pathname === '/'
  const blacklist = [
    'user',
    'notifications',
    'hideMapControls',
    'overlays', // 2022.10.26 added overlay. Need to refresh or users will not get new ones
    'apfloraLayers', // 2022.10.28 added. Need to refresh or users will not get new ones
  ]

  import('mst-persist').then((module) =>
    module
      .default('store', store, {
        storage: localForage,
        jsonify: false,
        blacklist,
      })
      .then(async () => {
        /**
         * TODO:
         * This is temporary after rebuilding the structure of dataFilter
         * Goal: prevent errors because previous persisted structure was invalid
         * Idea: test if is object. Only then empty
         */
        const dataFilterTreeAp = getSnapshot(store.tree.dataFilter.ap)
        const dataFilterTreePop = getSnapshot(store.tree.dataFilter.pop)
        const dataFilterTreeTpop = getSnapshot(store.tree.dataFilter.tpop)
        const dataFilterTreeTpopmassn = getSnapshot(
          store.tree.dataFilter.tpopmassn,
        )
        const dataFilterTreeTpopfeldkontr = getSnapshot(
          store.tree.dataFilter.tpopfeldkontr,
        )
        const dataFilterTreeTpopfreiwkontr = getSnapshot(
          store.tree.dataFilter.tpopfreiwkontr,
        )
        const dataFilterTree2Ap = getSnapshot(store.tree2.dataFilter.ap)
        const dataFilterTree2Pop = getSnapshot(store.tree2.dataFilter.pop)
        const dataFilterTree2Tpop = getSnapshot(store.tree2.dataFilter.tpop)
        const dataFilterTree2Tpopmassn = getSnapshot(
          store.tree2.dataFilter.tpopmassn,
        )
        const dataFilterTree2Tpopfeldkontr = getSnapshot(
          store.tree2.dataFilter.tpopfeldkontr,
        )
        const dataFilterTree2Tpopfreiwkontr = getSnapshot(
          store.tree2.dataFilter.tpopfreiwkontr,
        )
        if (
          isObject(dataFilterTreeAp) ||
          isObject(dataFilterTreePop) ||
          isObject(dataFilterTreeTpop) ||
          isObject(dataFilterTreeTpopmassn) ||
          isObject(dataFilterTreeTpopfeldkontr) ||
          isObject(dataFilterTreeTpopfreiwkontr)
        ) {
          [store.dataFilterEmptyTree('tree')]
        }
        if (
          isObject(dataFilterTree2Ap) ||
          isObject(dataFilterTree2Pop) ||
          isObject(dataFilterTree2Tpop) ||
          isObject(dataFilterTree2Tpopmassn) ||
          isObject(dataFilterTree2Tpopfeldkontr) ||
          isObject(dataFilterTree2Tpopfreiwkontr)
        ) {
          store.dataFilterEmptyTree('tree2')
        }

        const username = await setUserFromIdb({ idb, store })
        const isUser = !!username

        if (window.Cypress) {
          // enable directly using these in tests
          window.__client__ = client
          window.__store__ = store
          window.__idb__ = idb
        }

        window.store = store

        // set last activeNodeArray
        // only if top domain was visited
        if (isUser && visitedTopDomain) {
          const { urlQuery } = store
          const search = queryString.stringify(urlQuery)
          const query = `${
            Object.keys(urlQuery).length > 0 ? `?${search}` : ''
          }`
          const url = `/Daten/${store.tree.activeNodeArray.join('/')}${query}`
          console.log('App, mst-persist: will navigate to url:', url)

          return store.navigate?.(url)
        }
        const activeNodeArray = getActiveNodeArrayFromPathname()
        if (activeNodeArray[0] === 'Projekte') {
          console.log('App, mst-persist: will initiate data from url')
          initiateDataFromUrl({
            store,
          })
        }
      }),
  )

  return null
}

export default StorePersister