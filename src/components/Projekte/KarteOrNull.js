import React, { lazy } from "react"

export default ({ treeName }) => {
  if (typeof window === "undefined") return null
  const Karte = lazy(() => import("./Karte"))
  return <Karte treeName={treeName} />
}
