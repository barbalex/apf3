---
typ: 'technDoku'
path: "/Technische-Dokumentation/Daten-Sicherung"
date: "2019-01-30"
title: "Daten-Sicherung"
sort: 1
---

# Daten-Sicherung

Täglich nach Mitternacht wird von der Datenbank ein SQL-Dumpfile erstellt und in Alex's persönliche Dropbox übermittelt. Diese wird mehrfach auf Festplatten gesichert.

Alle paar Tage wird der gesammte virtuelle Server auf [digitalocean.com](https://digitalocean.com) gesichert.

Sporadisch stellt Alex auf seinen Entwicklungs-PC's die Datenbank aus einer Sicherung her. Das dient einerseits dem Unterhalt der Anwendung (Anpassungen werden auf der lokalen Kopie entwickelt und getestet). Gleichzeitig wird so die Wiederherstellung erprobt.