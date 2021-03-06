# Erfolgs-Kontrollen Freiwillige (EKF)

## Das Formular
- Benutzer mit der Rolle "artverantwortich" oder "manager" können neue Freiwilligen-Kontrollen erstellen. Benutzer mit der Rolle "freiwillig" können nur die darin enthaltenen Felder ausfüllen
- Im Gegensatz zum Feldkontroll-Formular sind die Zählungen hier integriert
- Erstellt man eine neue Freiwilligen-Kontrolle, werden die im Strukturbaum unter dem Knoten "EKF-Zähleinheiten" aufgelisteten maximal 3 Zähleinheiten erzeugt
- Man kann Zähleinheiten entfernen, aber keine hinzufügen, die nicht unter "EKF-Zähleinheiten" aufgelistet sind
- Das Formular kann gedruckt werden. Das funktioniert aber vermutlich nur auf Chrome (hoffentlich) richtig. Unter "Weitere Einstellungen" muss man "Hintergrundgrafiken" wählen, damit das Bild auch im Druck erscheint
- Einige der Funktionen sind nur für Benutzer mit der Rolle "artverantwortich" oder "manager" sichtbar, und zwar nur in der Normal-Ansicht: GUID kopieren, Im Jahresbericht berücksichtigen
- Das Formular passt sich an schmale Bildschirme an

## Die Arbeitsabläufe

### 1. Artverantwortliche oder Managerin bereitet Freiwilligen-Feldarbeit vor

Beispiel: Charlotte bereitet die Arbeit der Freiwilligen "A" vor:

1. Charlotte erfasst A als Benutzerin mit der Rolle "freiwillig", falls es diese Benutzerin nicht schon gibt
2. Wichtig: Die zugehörige Adresse von A ist im Formular "Benutzer" zu wählen. Nur so kann apflora.ch die richtigen Kontrollen anzeigen, wenn A einloggt 
3. Wählt man im EKF-Formular eine Beobachterin, die nicht wie oben beschrieben mit einem Benutzer verbunden wurde, wird man darauf hingewiesen
4. Charlotte erstellt bei jeder von A zu kontrollierenden Teilpopulation eine neue Freiwilligen-Kontrolle. Darin wählt sie A als Beobachterin
5. Das so erstellte Formular kann für die Feldarbeit gedruckt werden
6. Charlotte kann die `EKF-Ansicht` von A wählen: Menu "Mehr" > "EKF sehen als" (und hier A wählen)
7. Wenn nun A von Charlotte die Formulare bekommt, sind in apflora.ch alle ihre EKF erfasst

### 2. Freiwillige digitalisiert ihre Feld-Formulare
1. Loggt A nach der Feldarbeit in apflora.ch ein, um ihre Feld-Formulare zu übertragen, öffnet sich die `EKF-Ansicht`: A sieht die Liste aller EKF dieses Jahres (bzw. noch ohne Datum), bei denen sie als Beobachterin erfasst ist
2. Die Liste ist sortiert nach: Projekt, Aktionsplan, Population, Teilpopulation (Projekt würde nur angezeigt, wenn in mehreren Projekten EKF für diese Mitarbeiterin existierten)
3. A wählt in der Liste die gewünschte Kontrolle. Und überträgt rechts daneben ihr Feld-Formular ins apflora-Formular
4. In der Titelleiste wird das aktuelle Erfassungs-Jahr angezeigt. Es dauert von März bis Februar. Loggt man also im Januar ein, sieht man die Liste für das vorhergehende Feld-Jahr. Ab März sieht man die Liste für das aktuelle Feld-Jahr
5. Man kann ein anderes Jahr wählen. In diesem Fall werden die Freiwilligen-Kontrollen der angemeldeten Benutzerin aus dem betreffenden Jahr angezeigt. Nicht aber die Kontrollen ohne Datum (die werden nur angezeigt, wenn das gewählte Jahr dem aktuellen Feld-Jahr entspricht)
6. A kann in die "normale" Ansicht wechseln. Zum Beispiel, wenn sie Feld-Kontrollen sehen will

### 3. Artverantwortliche oder Managerin überprüft die Feld-Arbeit
1. Die Artverantwortliche kann die `EKF-Ansicht` einer Bestimmten Freiwilligen-Kontrolleurin wählen: Menu "Mehr" > "EKF sehen als" (und hier die Kontrolleurin wählen)
2. Im Feld "Im Jahresbericht berücksichtigen" kann sie "nein" setzten, wenn sie dokumentieren will, dass die Kontrolle bei der Erstellung von Kontroll-Berichten nicht berücksichtigt werden soll
3. Damit eine Freiwilligen-Kontrolle sich im Jahresbericht ausdruckt, muss wie bei den Feld-Kontrollen, ein entsprechender Kontroll-Bericht erfasst werden
4. Die Zahlen im Jahresbericht basieren auf den Kontroll-Berichten, nicht auf den Kontrollen. Eine zweifelhafte Kontrolle wird daher nicht im Jahresbericht sichtbar, wenn für sie kein Kontroll-Bericht erfasst wird

