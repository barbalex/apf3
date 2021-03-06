import React, { useContext, useState, useCallback } from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import styled from "styled-components"
import get from "lodash/get"
import { observer } from "mobx-react-lite"
import { useApolloClient } from "react-apollo-hooks"

import SelectLoadingOptions from "../../../shared/SelectLoadingOptions"
import exportModule from "../../../../modules/export"
import Message from "../Message"
import queryAeEigenschaftens from "./queryAeEigenschaftens"
import epsg2056to4326 from "../../../../modules/epsg2056to4326"
import storeContext from "../../../../storeContext"

const StyledCard = styled(Card)`
  margin: 10px 0;
  background-color: #fff8e1 !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${props => (props["data-expanded"] ? "rotate(180deg)" : "none")};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
  user-select: none;
`
const StyledCardContent = styled(CardContent)`
  margin: -15px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  align-content: stretch;
  overflow: auto;
`
const DownloadCardButton = styled(Button)`
  flex-basis: 450px;
  > span:first-of-type {
    text-transform: none !important;
    font-weight: 500;
    display: block;
    text-align: left;
    justify-content: flex-start !important;
    user-select: none;
  }
`
const AutocompleteContainer = styled.div`
  flex-basis: 450px;
  padding-left: 16px;
`
const Li = styled.li`
  margin-top: -6px;
  margin-bottom: -3px;
`
const EwmDiv = styled.div`
  margin-top: -14px;
  margin-bottom: 3px;
`

const isRemoteHost =
  typeof window !== "undefined" && window.location.hostname !== "localhost"

const Teilpopulationen = ({ treeName }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const { mapFilter, addError, exportApplyMapFilter, exportFileType } = store

  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState(null)
  const [ewmMessage, setEwmMessage] = useState("")

  const onClickAction = useCallback(() => setExpanded(!expanded), [expanded])
  const onClickButton = useCallback(async () => {
    setMessage('Export "Teilpopulationen" wird vorbereitet...')
    try {
      const { data } = await client.query({
        query: await import("./allVTpops").then(m => m.default),
      })
      const enrichedData = get(data, "allVTpops.nodes", []).map(oWithout => {
        let o = { ...oWithout }
        let nachBeginnAp = null
        if (
          o.ap_start_jahr &&
          o.bekannt_seit &&
          [200, 201, 202].includes(o.status)
        ) {
          if (o.ap_start_jahr <= o.bekannt_seit) {
            nachBeginnAp = true
          } else {
            nachBeginnAp = false
          }
        }
        o.angesiedelt_nach_beginn_ap = nachBeginnAp
        return o
      })
      exportModule({
        data: enrichedData,
        fileName: "Teilpopulationen",
        exportFileType,
        mapFilter,
        exportApplyMapFilter,
        idKey: "id",
        xKey: "x",
        yKey: "y",
        addError,
      })
    } catch (error) {
      addError(error)
    }
    setMessage(null)
  }, [exportFileType, exportApplyMapFilter])

  const aeEigenschaftenfilter = useCallback(inputValue =>
    !!inputValue
      ? {
          artname: { includesInsensitive: inputValue },
          apByArtIdExists: true,
        }
      : { artname: { isNull: false }, apByArtIdExists: true }
  )

  return (
    <StyledCard>
      <StyledCardActions disableActionSpacing onClick={onClickAction}>
        <CardActionTitle>Teilpopulationen</CardActionTitle>
        <CardActionIconButton
          data-expanded={expanded}
          aria-expanded={expanded}
          aria-label="öffnen"
        >
          <Icon title={expanded ? "schliessen" : "öffnen"}>
            <ExpandMoreIcon />
          </Icon>
        </CardActionIconButton>
      </StyledCardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <StyledCardContent>
          <DownloadCardButton onClick={onClickButton}>
            Teilpopulationen
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenWebGisBun" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopWebgisbuns").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(data, "allVTpopWebgisbuns.nodes", []),
                  fileName: "TeilpopulationenWebGisBun",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "TPOPID",
                  xKey: "TPOP_X",
                  yKey: "TPOP_Y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Teilpopulationen für WebGIS BUN
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage('Export "Teilpopulationen" wird vorbereitet...')
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopKmls").then(m => m.default),
                })
                const enrichedData = get(data, "allVTpopKmls.nodes", []).map(
                  oWithout => {
                    let o = { ...oWithout }
                    const [bg, lg] = epsg2056to4326(o.x, o.y)
                    o.laengengrad = lg
                    o.breitengrad = bg
                    return o
                  }
                )
                exportModule({
                  data: enrichedData,
                  fileName: "Teilpopulationen",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                  kml: true,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            <div>Teilpopulationen für Google Earth</div>
            <div>(beschriftet mit PopNr/TPopNr)</div>
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenNachNamen" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopKmlnamen").then(
                    m => m.default
                  ),
                })
                const enrichedData = get(
                  data,
                  "allVTpopKmlnamen.nodes",
                  []
                ).map(oWithout => {
                  let o = { ...oWithout }
                  const [bg, lg] = epsg2056to4326(o.x, o.y)
                  o.laengengrad = lg
                  o.breitengrad = bg
                  return o
                })
                exportModule({
                  data: enrichedData,
                  fileName: "TeilpopulationenNachNamen",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                  kml: true,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            <div>Teilpopulationen für Google Earth</div>
            <div>(beschriftet mit Artname, PopNr/TPopNr)</div>
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenVonApArtenOhneBekanntSeit" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopOhnebekanntseits").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(data, "allVTpopOhnebekanntseits.nodes", []),
                  fileName: "TeilpopulationenVonApArtenOhneBekanntSeit",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            <div>Teilpopulationen von AP-Arten</div>
            <div>{'ohne "Bekannt seit"'}</div>
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenOhneApBerichtRelevant" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopOhneapberichtrelevants").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(data, "allVTpopOhneapberichtrelevants.nodes", []),
                  fileName: "TeilpopulationenOhneApBerichtRelevant",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            <div>Teilpopulationen ohne Eintrag</div>
            <div>{'im Feld "Für AP-Bericht relevant"'}</div>
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenAnzahlMassnahmen" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopAnzmassns").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(data, "allVTpopAnzmassns.nodes", []),
                  fileName: "TeilpopulationenAnzahlMassnahmen",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Anzahl Massnahmen pro Teilpopulation
          </DownloadCardButton>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenAnzKontrInklusiveLetzteKontrUndLetztenTPopBericht" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopErsteUndLetzteKontrolleUndLetzterTpopbers").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(
                    data,
                    "allVTpopErsteUndLetzteKontrolleUndLetzterTpopbers.nodes",
                    []
                  ),
                  fileName:
                    "TeilpopulationenAnzKontrInklusiveLetzteKontrUndLetztenTPopBericht",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "id",
                  xKey: "x",
                  yKey: "y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
            disabled={isRemoteHost}
            title={
              isRemoteHost
                ? "nur aktiv, wenn apflora lokal installiert wird"
                : ""
            }
          >
            <div>Teilpopulationen mit:</div>
            <ul
              style={{
                paddingLeft: "18px",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            >
              <Li>Anzahl Kontrollen</Li>
              <Li>erste Kontrolle</Li>
              <Li>erste Zählung</Li>
              <Li>letzte Kontrolle</Li>
              <Li>letzte Zählung</Li>
              <Li>letzter Teilpopulationsbericht</Li>
            </ul>
            <EwmDiv>{'= "Eier legende Wollmilchsau"'}</EwmDiv>
          </DownloadCardButton>
          <AutocompleteContainer>
            <SelectLoadingOptions
              row={{}}
              field="ewm"
              valueLabelPath="aeEigenschaftenByArtId.artname"
              label={`"Eier legende Wollmilchsau": Art wählen`}
              labelSize={14}
              saveToDb={async e => {
                const aeId = e.target.value
                if (aeId === null) return
                setEwmMessage(
                  'Export "anzkontrinklletzterundletztertpopber" wird vorbereitet...'
                )
                try {
                  const res = await client.query({
                    query: await import("./queryApByArtId").then(
                      m => m.default
                    ),
                    variables: { aeId },
                  })
                  const apId = get(res.data, "apByArtId.id")
                  const { data } = await client.query({
                    query: await import("./allVTpopErsteUndLetzteKontrolleUndLetzterTpopbersFiltered").then(
                      m => m.default
                    ),
                    variables: { apId },
                  })
                  exportModule({
                    data: get(
                      data,
                      "allVTpopErsteUndLetzteKontrolleUndLetzterTpopbers.nodes",
                      []
                    ),
                    fileName: "anzkontrinklletzterundletztertpopber",
                    mapFilter,
                    addError,
                  })
                } catch (error) {
                  addError(error)
                }
                setEwmMessage("")
              }}
              query={queryAeEigenschaftens}
              filter={aeEigenschaftenfilter}
              queryNodesName="allAeEigenschaftens"
              error={ewmMessage}
            />
          </AutocompleteContainer>
          <DownloadCardButton
            onClick={async () => {
              setMessage(
                'Export "TeilpopulationenTPopUndMassnBerichte" wird vorbereitet...'
              )
              try {
                const { data } = await client.query({
                  query: await import("./allVTpopPopberundmassnbers").then(
                    m => m.default
                  ),
                })
                exportModule({
                  data: get(data, "allVTpopPopberundmassnbers.nodes", []),
                  fileName: "TeilpopulationenTPopUndMassnBerichte",
                  exportFileType,
                  exportApplyMapFilter,
                  mapFilter,
                  idKey: "tpop_id",
                  xKey: "tpop_x",
                  yKey: "tpop_y",
                  addError,
                })
              } catch (error) {
                addError(error)
              }
              setMessage(null)
            }}
          >
            Teilpopulationen inklusive Teilpopulations- und Massnahmen-Berichten
          </DownloadCardButton>
        </StyledCardContent>
      </Collapse>
      {!!message && <Message message={message} />}
    </StyledCard>
  )
}

export default observer(Teilpopulationen)
