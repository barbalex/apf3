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
1. Alle `v_exportevab...` views: In PgAdmin öffnen, als .csv speichern
1. Alle `apflora_v_exportevab...`-Tabellen in `beob_nach_evab.accdb`: leeren, dann aus den views importieren. WICHTIG: Im ersten Dialog in Access UTF-8 einstellen
1. Es braucht in tblPersonen einen Datensatz für Topos (`{7C71B8AF-DF3E-4844-A83B-55735F80B993}	topos Marti & Müller AG	-	Zürich`). Der wird zwar jedes Jahr hinzugefügt, er taucht aber trotzdem nie im Template auf. Daher muss er aus dem Vorjahr hinein kopiert werden
1. Jetzt die Import-Abfragen in `beob_nach_evab.accdb` nacheinander ausführen. Dabei darauf achten, dass immer alle Datensätze importiert wurden. Falls nicht, muss dem nachgegangen werden. Es kann z.B. an veränderten Stammdaten in EvAB liegen
1. `EvabGeoDB_apflora.mdb` ist nun bereit
1. `EvabGeoDB_apflora.mdb` in EvAB öffnen und prüfen, ob es i.O. aussieht
1. `EvabGeoDB_apflora.mdb`: Abfrage `vExportZDSF` nach Excel exportieren: Damit Topos die Daten in Tabellenform prüfen kann
1. `EvabGeoDB_apflora.mdb` und `vExportZDSF.xlsx` Topos zur Prüfung und Weiterleitung an die FNS übermitteln