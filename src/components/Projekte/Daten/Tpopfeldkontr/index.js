import React, { useState, useCallback, useEffect, useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import { observer } from 'mobx-react-lite'
import { useApolloClient, useQuery } from 'react-apollo-hooks'

import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import TextField from '../../../shared/TextField2'
import Select from '../../../shared/Select'
import RadioButtonGroupWithInfo from '../../../shared/RadioButtonGroupWithInfo'
import StringToCopy from '../../../shared/StringToCopy'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from '../../../shared/FormTitle'
import DateFieldWithPicker from '../../../shared/DateFieldWithPicker'
import TpopfeldkontrentwicklungPopover from '../TpopfeldkontrentwicklungPopover'
import constants from '../../../../modules/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import query from './query'
import queryLists from './queryLists'
import queryAdresses from './queryAdresses'
import queryTpopkontrs from './queryTpopkontrs'
import updateTpopkontrByIdGql from './updateTpopkontrById'
import setUrlQueryValue from '../../../../modules/setUrlQueryValue'
import storeContext from '../../../../storeContext'
import ifIsNumericAsNumber from '../../../../modules/ifIsNumericAsNumber'
import { simpleTypes as tpopfeldkontrType } from '../../../../store/NodeFilterTree/tpopfeldkontr'

const Container = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`
const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  > div:first-child {
    > div:first-child {
      display: block !important;
    }
  }
`
const Section = styled.div`
  padding-top: 20px;
  padding-bottom: 5px;
  font-weight: bold;
  break-after: avoid;
  &:after {
    content: ':';
  }
`
const FormContainer = styled.div`
  padding: 10px;
  overflow-y: auto !important;
  height: calc(100% - 20px);
  column-width: ${props =>
    props['data-width'] > 2 * constants.columnWidth
      ? `${constants.columnWidth}px`
      : 'auto'};
`
const tpopkontrTypWerte = [
  {
    value: 'Ausgangszustand',
    label: 'Ausgangszustand',
  },
  {
    value: 'Zwischenbeurteilung',
    label: 'Zwischenbeurteilung',
  },
]

const Tpopfeldkontr = ({ treeName, showFilter = false }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const {
    nodeFilter,
    nodeFilterSetValue,
    urlQuery,
    setUrlQuery,
    refetch,
  } = store
  const { activeNodeArray, datenWidth, filterWidth } = store[treeName]

  let id =
    activeNodeArray.length > 9
      ? activeNodeArray[9]
      : '99999999-9999-9999-9999-999999999999'
  if (showFilter) id = '99999999-9999-9999-9999-999999999999'
  const apId = activeNodeArray[3]
  const { data, loading, error } = useQuery(query, {
    variables: {
      id,
    },
  })

  const allTpopkontrFilter = {
    or: [
      { typ: { notEqualTo: 'Freiwilligen-Erfolgskontrolle' } },
      { typ: { isNull: true } },
    ],
    tpopByTpopId: {
      popByPopId: { apByApId: { projId: { equalTo: activeNodeArray[1] } } },
    },
  }
  const tpopkontrFilter = {
    or: [
      { typ: { notEqualTo: 'Freiwilligen-Erfolgskontrolle' } },
      { typ: { isNull: true } },
    ],
    tpopByTpopId: {
      popByPopId: { apByApId: { projId: { equalTo: activeNodeArray[1] } } },
    },
  }
  const tpopfeldkontrFilterValues = Object.entries(
    nodeFilter[treeName].tpopfeldkontr,
  ).filter(e => e[1] || e[1] === 0)
  tpopfeldkontrFilterValues.forEach(([key, value]) => {
    const expression =
      tpopfeldkontrType[key] === 'string' ? 'includes' : 'equalTo'
    tpopkontrFilter[key] = { [expression]: value }
  })
  const { data: dataTpopkontrs } = useQuery(queryTpopkontrs, {
    variables: {
      showFilter,
      tpopkontrFilter,
      allTpopkontrFilter,
      apId,
    },
  })

  const {
    data: dataAdresses,
    loading: loadingAdresses,
    error: errorAdresses,
  } = useQuery(queryAdresses)

  const {
    data: dataLists,
    loading: loadingLists,
    error: errorLists,
  } = useQuery(queryLists)

  const [errors, setErrors] = useState({})
  const [value, setValue] = useState(
    get(urlQuery, 'feldkontrTab', 'entwicklung'),
  )

  let tpopkontrTotalCount
  let tpopkontrFilteredCount
  let tpopkontrsOfApTotalCount
  let tpopkontrsOfApFilteredCount
  let row
  if (showFilter) {
    row = nodeFilter[treeName].tpopfeldkontr
    tpopkontrTotalCount = get(dataTpopkontrs, 'allTpopkontrs.totalCount', '...')
    tpopkontrFilteredCount = get(
      dataTpopkontrs,
      'tpopkontrsFiltered.totalCount',
      '...',
    )
    const popsOfAp = get(dataTpopkontrs, 'popsOfAp.nodes', [])
    const tpopsOfAp = flatten(popsOfAp.map(p => get(p, 'tpops.nodes', [])))
    tpopkontrsOfApTotalCount = !tpopsOfAp.length
      ? '...'
      : tpopsOfAp
          .map(p => get(p, 'tpopkontrs.totalCount'))
          .reduce((acc = 0, val) => acc + val)
    tpopkontrsOfApFilteredCount = !tpopsOfAp.length
      ? '...'
      : tpopsOfAp
          .map(p => get(p, 'tpopkontrsFiltered.totalCount'))
          .reduce((acc = 0, val) => acc + val)
  } else {
    row = get(data, 'tpopkontrById', {})
  }

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      if (showFilter) {
        nodeFilterSetValue({
          treeName,
          table: 'tpopfeldkontr',
          key: field,
          value,
        })
      } else {
        /**
         * enable passing two values
         * with same update
         */
        const variables = {
          id: row.id,
          [field]: value,
          changedBy: store.user.name,
        }
        let field2
        if (field === 'jahr') field2 = 'datum'
        if (field === 'datum') field2 = 'jahr'
        let value2
        if (field === 'jahr') value2 = null
        if (field === 'datum') {
          // this broke 13.2.2019
          // value2 = !!value ? +format(new Date(value), 'yyyy') : null
          // value can be null so check if substring method exists
          value2 = value.substring ? +value.substring(0, 4) : value
        }
        if (field2) variables[field2] = value2
        try {
          await client.mutate({
            mutation: updateTpopkontrByIdGql,
            variables,
            optimisticResponse: {
              __typename: 'Mutation',
              updateTpopkontrById: {
                tpopkontr: {
                  id: row.id,
                  typ: field === 'typ' ? value : row.typ,
                  jahr:
                    field === 'jahr'
                      ? value
                      : field2 === 'jahr'
                      ? value2
                      : row.jahr,
                  datum:
                    field === 'datum'
                      ? value
                      : field2 === 'datum'
                      ? value2
                      : row.datum,
                  jungpflanzenAnzahl:
                    field === 'jungpflanzenAnzahl'
                      ? value
                      : row.jungpflanzenAnzahl,
                  vitalitaet: field === 'vitalitaet' ? value : row.vitalitaet,
                  ueberlebensrate:
                    field === 'ueberlebensrate' ? value : row.ueberlebensrate,
                  entwicklung:
                    field === 'entwicklung' ? value : row.entwicklung,
                  ursachen: field === 'ursachen' ? value : row.ursachen,
                  erfolgsbeurteilung:
                    field === 'erfolgsbeurteilung'
                      ? value
                      : row.erfolgsbeurteilung,
                  umsetzungAendern:
                    field === 'umsetzungAendern' ? value : row.umsetzungAendern,
                  kontrolleAendern:
                    field === 'kontrolleAendern' ? value : row.kontrolleAendern,
                  bemerkungen:
                    field === 'bemerkungen' ? value : row.bemerkungen,
                  lrDelarze: field === 'lrDelarze' ? value : row.lrDelarze,
                  flaeche: field === 'flaeche' ? value : row.flaeche,
                  lrUmgebungDelarze:
                    field === 'lrUmgebungDelarze'
                      ? value
                      : row.lrUmgebungDelarze,
                  vegetationstyp:
                    field === 'vegetationstyp' ? value : row.vegetationstyp,
                  konkurrenz: field === 'konkurrenz' ? value : row.konkurrenz,
                  moosschicht:
                    field === 'moosschicht' ? value : row.moosschicht,
                  krautschicht:
                    field === 'krautschicht' ? value : row.krautschicht,
                  strauchschicht:
                    field === 'strauchschicht' ? value : row.strauchschicht,
                  baumschicht:
                    field === 'baumschicht' ? value : row.baumschicht,
                  bodenTyp: field === 'bodenTyp' ? value : row.bodenTyp,
                  bodenKalkgehalt:
                    field === 'bodenKalkgehalt' ? value : row.bodenKalkgehalt,
                  bodenDurchlaessigkeit:
                    field === 'bodenDurchlaessigkeit'
                      ? value
                      : row.bodenDurchlaessigkeit,
                  bodenHumus: field === 'bodenHumus' ? value : row.bodenHumus,
                  bodenNaehrstoffgehalt:
                    field === 'bodenNaehrstoffgehalt'
                      ? value
                      : row.bodenNaehrstoffgehalt,
                  bodenAbtrag:
                    field === 'bodenAbtrag' ? value : row.bodenAbtrag,
                  wasserhaushalt:
                    field === 'wasserhaushalt' ? value : row.wasserhaushalt,
                  idealbiotopUebereinstimmung:
                    field === 'idealbiotopUebereinstimmung'
                      ? value
                      : row.idealbiotopUebereinstimmung,
                  handlungsbedarf:
                    field === 'handlungsbedarf' ? value : row.handlungsbedarf,
                  flaecheUeberprueft:
                    field === 'flaecheUeberprueft'
                      ? value
                      : row.flaecheUeberprueft,
                  deckungVegetation:
                    field === 'deckungVegetation'
                      ? value
                      : row.deckungVegetation,
                  deckungNackterBoden:
                    field === 'deckungNackterBoden'
                      ? value
                      : row.deckungNackterBoden,
                  deckungApArt:
                    field === 'deckungApArt' ? value : row.deckungApArt,
                  vegetationshoeheMaximum:
                    field === 'vegetationshoeheMaximum'
                      ? value
                      : row.vegetationshoeheMaximum,
                  vegetationshoeheMittel:
                    field === 'vegetationshoeheMittel'
                      ? value
                      : row.vegetationshoeheMittel,
                  gefaehrdung:
                    field === 'gefaehrdung' ? value : row.gefaehrdung,
                  tpopId: field === 'tpopId' ? value : row.tpopId,
                  bearbeiter: field === 'bearbeiter' ? value : row.bearbeiter,
                  planVorhanden:
                    field === 'planVorhanden' ? value : row.planVorhanden,
                  jungpflanzenVorhanden:
                    field === 'jungpflanzenVorhanden'
                      ? value
                      : row.jungpflanzenVorhanden,
                  __typename: 'Tpopkontr',
                },
                __typename: 'Tpopkontr',
              },
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        if (['typ'].includes(field)) refetch.tpopfeldkontrs()
      }
    },
    [row, showFilter],
  )
  const onChangeTab = useCallback((event, value) => {
    setUrlQueryValue({
      key: 'feldkontrTab',
      value,
      urlQuery,
      setUrlQuery,
    })
    setValue(value)
  })

  const aeLrWerte = get(dataLists, 'allAeLrdelarzes.nodes', [])
    .map(e => `${e.label}: ${e.einheit ? e.einheit.replace(/  +/g, ' ') : ''}`)
    .map(o => ({ value: o, label: o }))

  if (loading) {
    return (
      <Container>
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }
  if (error) return `Fehler: ${error.message}`
  if (errorAdresses) return `Fehler: ${errorAdresses.message}`
  if (errorLists) return `Fehler: ${errorLists.message}`
  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Feld-Kontrollen"
            treeName={treeName}
            table="tpopfeldkontr"
            totalNr={tpopkontrTotalCount}
            filteredNr={tpopkontrFilteredCount}
            totalApNr={tpopkontrsOfApTotalCount}
            filteredApNr={tpopkontrsOfApFilteredCount}
          />
        ) : (
          <FormTitle
            apId={activeNodeArray[3]}
            title="Feld-Kontrolle"
            treeName={treeName}
          />
        )}
        <FieldsContainer>
          <Tabs
            value={value}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Entwicklung"
              value="entwicklung"
              data-id="entwicklung"
            />
            <Tab label="Biotop" value="biotop" data-id="biotop" />
          </Tabs>
          {value === 'entwicklung' && (
            <FormContainer data-width={showFilter ? filterWidth : datenWidth}>
              <TextField
                key={`${row.id}jahr`}
                name="jahr"
                label="Jahr"
                row={row}
                type="number"
                saveToDb={saveToDb}
                errors={errors}
              />
              <DateFieldWithPicker
                key={`${row.id}datum`}
                name="datum"
                label="Datum"
                value={row.datum}
                saveToDb={saveToDb}
                error={errors.datum}
              />
              <RadioButtonGroup
                key={`${row.id}typ`}
                name="typ"
                label="Kontrolltyp"
                value={row.typ}
                dataSource={tpopkontrTypWerte}
                saveToDb={saveToDb}
                error={errors.typ}
              />
              <Select
                key={`${row.id}bearbeiter`}
                name="bearbeiter"
                value={row.bearbeiter}
                field="bearbeiter"
                label="BearbeiterIn"
                options={get(dataAdresses, 'allAdresses.nodes', [])}
                loading={loadingAdresses}
                saveToDb={saveToDb}
                error={errors.bearbeiter}
              />
              <TextField
                key={`${row.id}jungpflanzen_anzahl`}
                name="jungpflanzenAnzahl"
                label="Anzahl Jungpflanzen"
                row={row}
                type="number"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}vitalitaet`}
                name="vitalitaet"
                label="Vitalität"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}ueberlebensrate`}
                name="ueberlebensrate"
                label="Überlebensrate"
                row={row}
                type="number"
                saveToDb={saveToDb}
                errors={errors}
              />
              <RadioButtonGroupWithInfo
                key={`${row.id}entwicklung`}
                name="entwicklung"
                label="Entwicklung"
                value={row.entwicklung}
                dataSource={get(
                  dataLists,
                  'allTpopEntwicklungWertes.nodes',
                  [],
                )}
                loading={loadingLists}
                saveToDb={saveToDb}
                error={errors.entwicklung}
                popover={TpopfeldkontrentwicklungPopover}
              />
              <TextField
                key={`${row.id}ursachen`}
                name="ursachen"
                label="Ursachen"
                row={row}
                hintText="Standort: ..., Klima: ..., anderes: ..."
                type="text"
                multiLine
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}erfolgsbeurteilung`}
                name="erfolgsbeurteilung"
                label="Erfolgsbeurteilung"
                row={row}
                type="text"
                multiLine
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}umsetzung_aendern`}
                name="umsetzungAendern"
                label="Änderungs-Vorschläge Umsetzung"
                row={row}
                type="text"
                multiLine
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}kontrolle_aendern`}
                name="kontrolleAendern"
                label="Änderungs-Vorschläge Kontrolle"
                row={row}
                type="text"
                multiLine
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                row={row}
                type="text"
                multiLine
                saveToDb={saveToDb}
                errors={errors}
              />
              <StringToCopy text={row.id} label="id" />
            </FormContainer>
          )}
          {value === 'biotop' && (
            <FormContainer data-width={datenWidth}>
              <TextField
                key={`${row.id}flaeche`}
                name="flaeche"
                label="Fläche"
                row={row}
                type="number"
                saveToDb={saveToDb}
                errors={errors}
              />
              <Section>Vegetation</Section>
              <Select
                key={`${row.id}lrDelarze`}
                name="lrDelarze"
                value={row.lrDelarze}
                field="lrDelarze"
                label="Lebensraum nach Delarze"
                options={aeLrWerte}
                loading={loadingLists}
                saveToDb={saveToDb}
                error={errors.lrDelarze}
              />
              <Select
                key={`${row.id}lrUmgebungDelarze`}
                name="lrUmgebungDelarze"
                value={row.lrUmgebungDelarze}
                field="lrUmgebungDelarze"
                label="Umgebung nach Delarze"
                options={aeLrWerte}
                loading={loadingLists}
                saveToDb={saveToDb}
                error={errors.lrUmgebungDelarze}
              />
              <TextField
                key={`${row.id}vegetationstyp`}
                name="vegetationstyp"
                label="Vegetationstyp"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}konkurrenz`}
                name="konkurrenz"
                label="Konkurrenz"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}moosschicht`}
                name="moosschicht"
                label="Moosschicht"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}krautschicht`}
                name="krautschicht"
                label="Krautschicht"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}strauchschicht`}
                name="strauchschicht"
                label="Strauchschicht"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}baumschicht`}
                name="baumschicht"
                label="Baumschicht"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <Section>Boden</Section>
              <TextField
                key={`${row.id}boden_typ`}
                name="bodenTyp"
                label="Typ"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}boden_kalkgehalt`}
                name="bodenKalkgehalt"
                label="Kalkgehalt"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}boden_durchlaessigkeit`}
                name="bodenDurchlaessigkeit"
                label="Durchlässigkeit"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}boden_humus`}
                name="bodenHumus"
                label="Humusgehalt"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}boden_naehrstoffgehalt`}
                name="bodenNaehrstoffgehalt"
                label="Nährstoffgehalt"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}boden_abtrag`}
                name="bodenAbtrag"
                label="Bodenabtrag"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <TextField
                key={`${row.id}wasserhaushalt`}
                name="wasserhaushalt"
                label="Wasserhaushalt"
                row={row}
                type="text"
                saveToDb={saveToDb}
                errors={errors}
              />
              <Section>Beurteilung</Section>
              <TextField
                key={`${row.id}handlungsbedarf`}
                name="handlungsbedarf"
                label="Handlungsbedarf"
                row={row}
                type="text"
                multiline
                saveToDb={saveToDb}
                errors={errors}
              />
              <RadioButtonGroup
                key={`${row.id}idealbiotop_uebereinstimmung`}
                name="idealbiotopUebereinstimmung"
                label="Übereinstimmung mit Idealbiotop"
                value={row.idealbiotopUebereinstimmung}
                dataSource={get(
                  dataLists,
                  'allTpopkontrIdbiotuebereinstWertes.nodes',
                  [],
                )}
                loading={loadingLists}
                saveToDb={saveToDb}
                error={errors.idealbiotopUebereinstimmung}
              />
            </FormContainer>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Tpopfeldkontr)
