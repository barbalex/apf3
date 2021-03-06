import gql from 'graphql-tag'

import { tpop } from '../../components/shared/fragments'

export default gql`
  mutation createTpop(
    $popId: UUID
    $nr: Int
    $gemeinde: String
    $flurname: String
    $x: Int
    $y: Int
    $radius: Int
    $hoehe: Int
    $exposition: String
    $klima: String
    $neigung: String
    $beschreibung: String
    $katasterNr: String
    $status: Int
    $statusUnklarGrund: String
    $apberRelevant: Int
    $bekanntSeit: Int
    $eigentuemer: String
    $kontakt: String
    $nutzungszone: String
    $bewirtschafter: String
    $bewirtschaftung: String
    $kontrollfrequenz: Int
    $kontrollfrequenzFreiwillige: Int
    $bemerkungen: String
    $statusUnklar: Boolean
  ) {
    createTpop(
      input: {
        tpop: {
          popId: $popId
          nr: $nr
          gemeinde: $gemeinde
          flurname: $flurname
          x: $x
          y: $y
          radius: $radius
          hoehe: $hoehe
          exposition: $exposition
          klima: $klima
          neigung: $neigung
          beschreibung: $beschreibung
          katasterNr: $katasterNr
          status: $status
          statusUnklarGrund: $statusUnklarGrund
          apberRelevant: $apberRelevant
          bekanntSeit: $bekanntSeit
          eigentuemer: $eigentuemer
          kontakt: $kontakt
          nutzungszone: $nutzungszone
          bewirtschafter: $bewirtschafter
          bewirtschaftung: $bewirtschaftung
          kontrollfrequenz: $kontrollfrequenz
          kontrollfrequenzFreiwillige: $kontrollfrequenzFreiwillige
          bemerkungen: $bemerkungen
          statusUnklar: $statusUnklar
        }
      }
    ) {
      tpop {
        ...TpopFields
      }
    }
  }
  ${tpop}
`
