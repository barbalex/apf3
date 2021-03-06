# Formular-Filter

Am 12.09.2018 wurden `Formular-Filter` eingeführt.

## In diesen Formularen kann man filtern:
- Aktionsplan
- Population
- Teil-Population
- Massnahmen
- Feld-Kontrollen
- Freiwilligen-Kontrollen (nur in der Normal-Ansicht. Freiwillige können das also nicht)

Die Filter-Formulare entsprechen (fast) genau den normalen Formularen. Sie sind aber rot hinterlegt, damit nicht aus Versehen echte Daten verändert werden.

Erfasst man in einem Filter-Feld Daten, wird der entsprechende Filter nach Verlassen des Feldes angewendet (bei Auswahl-Feldern sofort).

Filtern kann man im `Strukturbaum` _und_ im `Strukturbaum 2`. Öffnet man den `Strukturbaum 2`, entspricht er genau dem `Strukturbaum`, d.h. es wird auch ein allfälliger Filter kopiert. Danach sind die Filter unabhängig.

## Wie öffnet man ein Filter-Formular?
1. Mit dem neuen Filter-Menu im rechten Teil des Daten-Menüs
2. Mit dem Filter-Symbol im rechten Teil des Formular-Titels (dunkelgrüner Bereich zuoberst im Formular), wenn ein entsprechendes Formular geöffnet ist

## Wo wird der Filter angewendet?
- Im Strukturbaum auf der gefilterten Ebene.<br/>
  Ein Filter auf Ebene Teil-Population wirkt sich also nicht auf die Populationen aus
- In der Karte (Populationen, Teil-Populationen).<br/>
  Ein Filter auf Ebene Teil-Population wirkt sich hier auch auf der Ebene Population aus. Und umgekehrt.
- Nicht realisiert aber als Erweiterung denkbar: In Exporten der entsprechenden Ebene

## Wie werden Filter entfernt?
1. Mit dem untersten Eintrag im neuen Filter-Menu im rechten Teil des Daten-Menüs
2. Im Formular-Titel erscheinen zwei Symbole, sobald ein Filter angewendet wird:
   - Mit dem linken Symbol kann man den Filter in der aktiven Ebene entfernen (z.B. Population). Dabei bleiben Filter in anderen Ebenen erhalten (z.B. Aktionsplan)
   - Mit dem rechten Symbol kann man alle angewendeten Filter entfernen (wie im Filter-Menu im Daten-Menu)

## Welche neuen Möglichkeiten eröffnet mir das?

Vermutlich werden die Filter-Formulare vor allem für eher spezielle Aufgaben nützlich sein. Also eher für Power-UserInnen in Topos.

Eine Möglichkeit: In der Karte nur einen bestimmten Status-Typ von Populationen oder Teil-Populationen anzeigen.

## Was ist der Unterschied zum Filter-Feld im Strukturbaum?

Im `Strukturbaum-Filter` kann man (nur) nach den Bezeichungen der Strukturbaum-Elemente der gerade aktiven Ebene filtern.

Das ist zwar weniger mächtig, dafür aber einfach und schnell. Daher wird der `Strukturbaum-Filter` beibehalten.

Zuletzt aktualisiert am: 12.9.2018