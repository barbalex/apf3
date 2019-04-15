---
typ: 'technDoku'
path: "/Technische-Dokumentation/Entstehung"
date: "2019-01-30"
title: "Entstehungs-Geschichte"
sort: 1
---

## Excel-Listen
Es war einmal vor langer, langer Zeit, im Kanton Zürich, ein Projekt zur Förderung von Pflanzen-Arten. Keine Ahnung, wie lange das her ist.

Im Rahmen des Projekts wurden Populationen und Teil-Populationen beschrieben, Massnahmen dokumentiert, Teil-Populationen kontrolliert und vieles mehr. Weil Ende Jahr jeweils über das Projekt berichtet wurde, wurden die Daten systematisch gesammelt. So entstanden diverse Excel-Listen. Über die Jahre wuchsen die Bedürfnisse an das Projekt und damit auch die Excel-Listen. Bis die Mitarbeitenden immer mehr Mühe bekamen, die Daten zu verwalten.

## Access-DB
Ungefähr im Jahr 2005 wurde eine Access-Datenbank aufgebaut. Dank guter Datenstruktur und einer im Vergleich zu Excel-Listen bequemen Benutzeroberfläche war das Verwalten der Projekt-Daten nun viel einfacher.

In den nächsten Jahren stiegen die Anforderungen weiter. Und weiter. Bis die Access-Datenbank ihnen nicht mehr genügen konnte. Nicht nur stiess sie an Leistungs-Grenzen (vor allem wegen hundert-tausender Beobachtungen, die verfügbar sein sollten). Es wuchs die Anzahl Mitarbeitender. Diese sollten nach der Feldsaison unter Termindruck möglichst gleichzeitig alle Daten erfassen, damit rechtzeitig die nächste Feldsaison geplant werden konnte. Da diese Mitarbeitenden auf viele verschiedene Firmen bzw. Ökobüros verteilt arbeiteten, genügte es nicht mehr, eine zentrale Datenbank zu pflegen.

Tests mit der Synchronisation verteilter Access-Datenbanken verliefen unbefriedigend.

## 



## Neu-Aufbau im Sommer 2017

2017 wurde apflora nach 5 Jahren von Grund auf neu aufgebaut.

### Ziele

- Architektur modernisieren:
  - Unterhalt- und Erweiterbarkeit verbessern.<br/>
    Neue Features einzuführen ist nun einfacher und mit weniger Risiko verbunden.<br/>
    Das war der Auslöser für die Modernisierung
  - Anzahl Karten-Werkzeuge von zwei auf eines reduzieren
  - Veraltete Abhängikeiten loswerden
  - (Infra-)Struktur für Tests bereitstellen (und später nach und nach einführen)
- Mehrere Projekte verwalten.<br/>
  Andere Kantone bzw. Ökobüros können ähnliche Projekte verwalten. Damit würden Fixkosten geteilt bzw. die Weiterentwicklung finanziert
- Grundlage schaffen, um Berichte direkt aus der Webanwendung heraus produzieren zu können.<br/>
  Artverantwortliche sollen Jahresberichte für ihre Arten selber erzeugen und kontrollieren können
- Grundlage schaffen, um auf das Access-Admin-Tool verzichten zu können (umgesetzt)
- Grundlage schaffen, um allenfalls später netzunabhängig (im Feld) arbeiten zu können
- Sicherheit erhöhen

### Neue Fähigkeiten

- Mehrere Projekte bearbeiten
- Der Strukturbaum ist wesentlich leistungsfähiger.<br />Es gibt keine Grenzen mehr, wieviele Elemente einen Ebene darstellen kann!
- Karten:
  - In der Karte verwendete Symbole werden im Ebenen-Tool und im Strukturbaum eingeblendet
  - Es werden immer alle Elemente einer Ebene angezeigt. Aktive sind gelb umrahmt
  - Bequeme(re) Messung von Flächen und Linien
  - Differenzierte(re) Darstellung der verschiedenen Typen von Beobachtungen<br />(nicht beurteilt, nicht zuzuordnen, zugeordnet)
  - Bequeme(re) Zuordnung von Beobachtungen zu Teil-Populationen
  - Bequemer(re) Darstellung von nahe bzw. direkt aufeinander liegenden Elementen
  - Populationen, Teilpopulationen und Beobachtungen durch das Zeichnen von einem oder mehreren Umrissen (Recht- oder Vielecken) filtern
  - Diesen geographischen Filter auf Exporte anwenden
- Daten auch in .xlsx-Dateien exportieren
- Beobachtungen können in beliebiger Datenstruktur importiert werden
- API-Zugriff ist durch Anmeldung geschützt
