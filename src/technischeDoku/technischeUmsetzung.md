---
typ: 'technDoku'
path: "/Technische-Dokumentation/Technische-Umsetzung"
date: "2019-01-30"
title: "Technische Umsetzung"
sort: 1
---

Die Anwendung wird auf einem virtuellen Server mit der jeweils aktuellen Ubuntu LTS Version gehostet.

Serverseitig wird sie mit [node.js](//nodejs.org) gesteuert. Als Datenbank dient [PostgreSQL](//postgresql.org/). Hier ein [Diagramm der Beziehungen](//raw.githubusercontent.com/barbalex/apf2/master/src/etc/beziehungen.png).

Die Anwendung ist zweigeteilt:
- das Backend bietet die API (Daten) auf [apflora.ch/graphql](//apflora.ch/graphql) und [apflora.ch/api](//apflora.ch/api) an
- das Frontend / die App bzw. die Benutzeroberfläche ist über [apflora.ch](//apflora.ch) erreichbar

Die wichtigsten verwendeten Technologien sind:

- [create-react-app](//github.com/facebookincubator/create-react-app): Abhängigkeiten einfach aktuell halten
- [GraphQL](https://github.com/facebook/graphql) in Form von [PostGraphile](https://github.com/graphile/postgraphile)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als bisher!
  - Daten-Logik und Rechte-Verwaltung obliegen der Datenbank - wie es sein sollte<br/>
  - GraphQL ist die kommende API-Technologie. Verglichen mit REST ist GraphQL einfach zu verstehen und extrem flexibel. Somit steht ein aussergewöhnlich benutzerfreundlicher API-Server zur Verfügung
- [Apollo](https://www.apollodata.com). Komponenten definieren, welche Daten sie brauchen. GraphQL und Apollo kümmern sich um die Bereitstellung. React (siehe unten), GraphQL und Apollo haben die Entwicklung von Anwendungen revolutioniert
- [React](//facebook.github.io/react): Deklarative Benutzer-Oberfläche. Aufgebaut aus Komponenten
- [styled-components](https://github.com/styled-components/styled-components): modular stylen