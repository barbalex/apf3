import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    VitePWA({
      workbox: {
        sourcemap: true,
      },
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      // https://developer.mozilla.org/en-US/docs/Web/Manifest
      manifest: {
        scope: '.',
        name: 'apflora.ch',
        short_name: 'apflora',
        // https://web.dev/add-manifest/:
        // Your start_url should direct the user straight into your app,
        // rather than a product landing page.
        // Think about what the user will want to do once they open your app,
        // and place them there
        start_url: './Daten',
        background_color: '#2e7d32',
        theme_color: '#2e7d32',
        display: 'minimal-ui',
        icon: 'src/images/ophr.png',
        // not using maskable icon as that can not be transparent
        // which looks hideous in browser
        //icon_options: {
        //  purpose: `any maskable`,
        //},
        include_favicon: true,
        lang: 'de-CH',
        orientation: 'portrait',
        description: 'Aktionspläne für Flora-Projekte',
      },
      devOptions: {
        //enabled: true,
      },
    }),
    react(),
  ],
})
