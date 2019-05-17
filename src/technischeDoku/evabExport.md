---
typ: 'technDoku'
path: "/Dokumentation/Technisch/EvAB-Export"
date: "2019-05-16"
title: "EvAB-Export"
sort: 9
---

Die FNS gibt vor, dass in eine Access-GEO-DB importiert werden muss. Leider gibt es keine vernünftigen Treiber, um Access mit PostgreSQL (oder irgend einer anderen Datenbank) zu verbinden. Und ODBC verträgt sich schlecht mit modernem und sicherem Hosting. Darum müssen alle benötigten Daten zuerst aus apflora.ch exportiert werden, in eine Access DB importiert und von dort in die GEO-DB importiert werden.<br/><br/>

1. Dateien vorbereiten:
   1. Neuen Ordner gründen (z.B. `...\projekte\apflora\data_out\2019 05 16 nach EvAB`)
   1. `beob_nach_evab.accdb` vom letzten Export kopieren
   1. Auf [naturschutz.zh.ch](https://aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html) das aktuelle Datenbank-Template für EvAB downloaden
   1. Datenbank-Template umbenennen zu: `EvabGeoDB_apflora.mdb`
   1. `beob_nach_evab.accdb` öffnen
   1. Tabellen-Verknüpfungs-Manager öffnen
   1. Neues Datenbank-Template verknüpfen
1. Adressen Vorbereiten
   1. Aktuelle tblPersonen aus `EvabGeoDB_apflora.mdb` in apflora.evab_personen importieren
   1. Prüfen, bei welchen Adressen benötigte Felder leer sind (evab_nachname, evab_vorname, evab_ort). Diese ergänzen:
      ```sql
      select name from apflora.adresse
      where
        adresse.evab_id_person IS NULL
        and (
          evab_nachname is null
          or evab_vorname is null
          or evab_ort is null
        )
      order by name;
      ```
   1. In `beob_nach_evab.accdb`, Tabelle `apflora_adresse`: leeren, dann die aktuellen Daten importieren
1. In `beob_nach_evab.accdb`, Tabelle `apflora_evab_typologie` mit `apflora.evab_typologie` aktualisieren (wenn nötig)