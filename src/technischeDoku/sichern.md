---
typ: 'technDoku'
path: "/Dokumentation/Technisch/Daten-Sicherung"
date: "2019-04-18"
title: "Daten-Sicherung"
sort: 5
---

Täglich nach Mitternacht wird von der Datenbank ein SQL-Dumpfile erstellt und in eine Dropbox übermittelt. Diese wird mehrfach auf Festplatten gesichert.<br/><br/>


Alle paar Tage wird der gesammte virtuelle Server gesichert.<br/><br/>


Sporadisch wird die Datenbank auf Entwicklungs-PC's aus einer Sicherung neu hergestellt. Das dient einerseits dem Unterhalt der Anwendung: Entwickelt wird auf einer lokalen Kopie. Gleichzeitig werden so Sicherung und Wiederherstellung getestet.