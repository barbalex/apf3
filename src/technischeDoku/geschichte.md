---
typ: 'technDoku'
path: "/Technische-Dokumentation/Entstehung"
date: "2019-01-30"
title: "Entstehungs-Geschichte"
sort: 7
---

## 1. Excel-Listen
Es war einmal vor langer, langer Zeit, im Kanton Zürich, ein Projekt zur Förderung von Pflanzen-Arten. Keine Ahnung, wie lange das her ist.<br/><br/>

Im Rahmen des Projekts wurden Populationen und Teil-Populationen beschrieben, Massnahmen dokumentiert, Teil-Populationen kontrolliert und vieles mehr. Um Ende Jahr jeweils über das Projekt zu berichten, wurden die Daten systematisch gesammelt. So entstanden diverse Excel-Listen. Über die Jahre wuchsen die Bedürfnisse an das Projekt und damit auch die Listen. Bis die Mitarbeitenden immer mehr Mühe bekamen, die Daten zu verwalten.<br/><br/>

## 2. Access-DB
Ungefähr im Jahr 2005 wurde eine Access-Datenbank aufgebaut. Dank guter Datenstruktur und einer im Vergleich zu Excel-Listen bequemen Benutzeroberfläche war das Verwalten der Projekt-Daten nun viel einfacher.<br/><br/>

In den nächsten Jahren stiegen die Anforderungen weiter. Und weiter. Bis die Access-Datenbank ihnen nicht mehr genügen konnte. Nicht nur stiess sie an Leistungs-Grenzen (vor allem wegen hunderttausender Beobachtungen). Es wuchs die Anzahl Mitarbeitender. Diese sollten nach der Feldsaison unter Termindruck möglichst gleichzeitig alle Daten erfassen, damit rechtzeitig die nächste Feldsaison geplant werden konnte. Da diese Mitarbeitenden auf viele verschiedene Firmen bzw. Ökobüros verteilt arbeiteten, genügte es nicht mehr, eine zentrale Datenbank zu pflegen.<br/><br/>

Tests mit der Synchronisation verteilter Access-Datenbanken verliefen unbefriedigend.<br/><br/>

## 3. Access-DB mit MySQL Backend
ca. 2011 wurde die Datenbank auf MySQL auf einem Webserver migriert. Als Anwendung diente weiterhin Access, welches über ODBC mit der Datenbank kommunizierte. Es funktionierte. Aber es war kompliziert, langsam und alles Andere als perfekt.<br/><br/>

## 4. Web-App mit MySQL DB

Ab 2012 kam eine reine Web-Applikation zum Einsatz. Sie war leistungsfähig und konnte die damaligen Bedürfnisse gut decken.<br/><br/>

## 5. "Moderne" Web-App

Web-Technologien entwickelten sich rasant weiter. Ebenso, wie die Bedürfnisse an apflora.ch. 2017 wurde apflora daher von Grund auf neu aufgebaut. Hauptziel war es, durch verwenden einer modernen Architektur (React && MobX) sowie einer modernen Datenbank (PostgreSQL, u.a. mit JSONB) die Komplexität der Anwendung stark zu reduzieren. Und die Basis zu legen, damit sie weiterhin den Bedürfnissen gerecht angepasst werden kann.<br/><br/>

Dieser Prozess endet im Prinzip nie. Seither wird apflora regelmässig modernisiert. Informationen über die aktuell verwendeten Technologien finden sich [hier](/Technische-Dokumentation/Technische-Umsetzung).


