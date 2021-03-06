import React, { useContext } from "react"
import { Polyline, Popup } from "react-leaflet"
import get from "lodash/get"
import styled from "styled-components"
import format from "date-fns/format"
import isValid from "date-fns/isValid"
import { observer } from "mobx-react-lite"

import storeContext from "../../../../../storeContext"
import epsg2056to4326 from "../../../../../modules/epsg2056to4326"
import appBaseUrl from "../../../../../modules/appBaseUrl"

const StyledH3 = styled.h3`
  margin: 7px 0;
`

const Line = ({ treeName, beob }) => {
  const store = useContext(storeContext)
  const activeNodes = store[`${treeName}ActiveNodes`]
  const { ap, projekt } = activeNodes
  const { idsFiltered } = store[treeName].map

  if (typeof window === "undefined") return null

  const isHighlighted = idsFiltered.includes(beob.id)
  const beobLatLng = new window.L.LatLng(...epsg2056to4326(beob.x, beob.y))
  const tpopX = get(beob, "tpopByTpopId.x")
  const tpopY = get(beob, "tpopByTpopId.y")
  const tpopLatLng =
    tpopX && tpopY
      ? new window.L.LatLng(...epsg2056to4326(tpopX, tpopY))
      : beobLatLng
  // some dates are not valid
  // need to account for that
  let datum = "(kein Datum)"
  if (!isValid(new Date(beob.datum))) {
    datum = "(ungültiges Datum)"
  } else if (!!beob.datum) {
    datum = format(new Date(beob.datum), "yyyy.MM.dd")
  }
  const autor = beob.autor || "(kein Autor)"
  const quelle = get(beob, "beobQuelleWerteByQuelleId.name", "")
  return (
    <Polyline
      positions={[beobLatLng, tpopLatLng]}
      color={isHighlighted ? "yellow" : "#FF00FF"}
    >
      <Popup>
        <>
          <StyledH3>Zuordnung</StyledH3>
          <div>einer Beobachtung</div>
          <div>{`von ${get(beob, "aeEigenschaftenByArtId.artname", "")}`}</div>
          <div>{`am ${datum}`}</div>
          <div>{`durch ${autor}`}</div>
          <div>
            {`bei: ${beob.x.toLocaleString("de-ch")} / ${beob.y.toLocaleString(
              "de-ch"
            )}`}
          </div>
          <div>{`zur Teil-Population: ${get(
            beob,
            "tpopByTpopId.nr",
            "(keine Nr)"
          )}: ${get(beob, "tpopByTpopId.flurname", "(kein Flurname)")}`}</div>
          <div>{`Quelle: ${quelle}`}</div>
          <a
            href={`${appBaseUrl()}/Daten/Projekte/${projekt}/Aktionspläne/${ap}/Populationen/${get(
              beob,
              "tpopByTpopId.popId",
              ""
            )}/Teil-Populationen/${get(
              beob,
              "tpopByTpopId.id",
              ""
            )}/Beobachtungen/${beob.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Formular in neuem Tab öffnen
          </a>
        </>
      </Popup>
    </Polyline>
  )
}

export default observer(Line)
