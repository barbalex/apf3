import React from 'react'
import { WMSTileLayer } from 'react-leaflet'

const ZhOrtho2018RgbLayer = () => (
  <WMSTileLayer
    url="//wms.zh.ch/OrthoZHWMS"
    layers="ortho_18"
    version="1.3.0"
    format="image/png"
    maxNativeZoom={18}
    minZoom={0}
    maxZoom={22}
  />
)

export default ZhOrtho2018RgbLayer
