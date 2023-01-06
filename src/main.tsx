import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import AppRenderer from './AppRenderer'

// https://vite-plugin-pwa.netlify.app/guide/prompt-for-update.html#runtime
registerSW({
  onNeedRefresh() {
    if (
      window.confirm(
        'capturing.app neu laden, um die neuste Version zu installieren?',
      )
    ) {
      // TODO: empty everything but the login?
      // seems that is what is happening
      window.location.reload(true)
    }
  },
  onOfflineReady() {
    console.log('the service worker is offline ready')
  },
})

console.log('main rendering')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  // todo: causes mstPersist to run twice
  // .render(
  //   <React.StrictMode>
  //     <AppRenderer />
  //   </React.StrictMode>,
  // )
  .render(<AppRenderer />)
