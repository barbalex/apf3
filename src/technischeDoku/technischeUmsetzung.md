---
typ: 'technDoku'
path: "/Technische-Dokumentation/Technische-Umsetzung"
date: "2019-01-30"
title: "Technische Umsetzung"
sort: 2
---

Die Anwendung wird auf einem virtuellen Server mit der jeweils aktuellen Ubuntu LTS Version gehostet.<br/><br/>

Serverseitig wird sie mit [node.js](//nodejs.org) gesteuert. Als Datenbank dient [PostgreSQL](//postgresql.org/). Hier ein [Diagramm der Beziehungen](//raw.githubusercontent.com/barbalex/apf2/master/src/etc/beziehungen.png).
![Beziehungs-Diagramm](_media/beziehungen.png)<br/><br/>

Die Anwendung ist zweigeteilt:
- das Backend bietet die API (Daten) auf [apflora.ch/graphql](//apflora.ch/graphql) und [apflora.ch/api](//apflora.ch/api) an
- das Frontend / die App bzw. die Benutzeroberfläche ist über [apflora.ch](//apflora.ch) erreichbar

Die wichtigsten verwendeten Technologien sind:

- [Gatsby](//www.gatsbyjs.org): Modernes Werkzeug, um dynamische Apps auf der Grundlage von statischen Dateien zu erzeugen (die wiederum sehr effizient gehostet werden können)
- [GraphQL](https://github.com/facebook/graphql) in Form von [PostGraphile](https://github.com/graphile/postgraphile)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als zuvor!
  - Daten-Logik und Rechte-Verwaltung obliegen der Datenbank - wie es sein sollte<br/>
  - GraphQL ist die kommende API-Technologie. Verglichen mit REST ist GraphQL einfach zu verstehen und extrem flexibel. Somit steht ein aussergewöhnlich benutzerfreundlicher API-Server zur Verfügung
- [Apollo](https://www.apollodata.com). Komponenten definieren, welche Daten sie brauchen. GraphQL und Apollo kümmern sich um die Bereitstellung
- [React](//facebook.github.io/react): Deklarative Benutzer-Oberfläche. Aufgebaut aus Komponenten
- [styled-components](https://github.com/styled-components/styled-components): modular stylen
- [Cypress](https://www.cypress.io): Testen, testen, testen...