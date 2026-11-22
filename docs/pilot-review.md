# FixMyMA: Pilot-Ablauf und Unslop-Nachprüfung

22.11.2026 · Branch `feat/apple-inspired-design` · PR #8 bleibt zur Review offen.

## Umfang und Ablauf

Ausgangspunkt war `6fb9393`. Der vorhandene Formular-/Vorschaufluss war die Ablaufreferenz; im Auftrag war kein zusätzlicher Referenzlink enthalten.

Der aktuelle Pilot unterstützt genau den bereits hinterlegten Kontaktweg: Kategorie Haltestelle, Ort Waldhof Nord einschließlich der vorhandenen Schreibweisen. Kontakt und Matching wurden nicht erweitert. Der kompakte, dunkelblaue Entwurf bleibt erhalten. Neue Kontakte benötigen weiterhin verifizierte Quellen.

Der Umfang steht als kurzer Absatz direkt vor dem Formular. Sobald Kategorie und Ort gültig ausgefüllt sind, wird mit dem vorhandenen Routing ein Hinweis direkt unter dem Ort angezeigt. Eine Beschreibung ist dafür nicht nötig:

- **Waldhof Nord / Haltestelle:** geprüfter rnv-Meldeweg, Hinweis auf die ungeklärte Wartungszuständigkeit und sofort nutzbarer rnv-Link im neuen Tab.
- **Andere Kombinationen:** „Meldeweg offen“, ohne erfundenen Kontakt. Beschreibung, Textentwurf, Vorschau und Kopieren bleiben möglich.
- **Unvollständige Eingaben:** neutraler Hinweis; keine voreilige Zusage eines geprüften Kontakts. Die vorhandene Eingabeprüfung bleibt maßgeblich.

Kategorie- oder Ortsänderungen aktualisieren den Hinweis direkt. Der Status ist dem Ortsfeld zugeordnet und als höfliche Live-Region ausgezeichnet. Der Link liegt in der normalen Tab-Reihenfolge vor der Beschreibung. Ein Neuladen verwirft weiterhin die Daten; es gibt keinen automatischen Versand.

Der Ablauf wurde separat als `148bbe9` committet. Der anschließende Commit enthält ausschließlich den Text-/Abstandsfeinschliff und seine Nachweise.

## Unslop-Pass: Texte und Abstände

Nach [Unslop von Damir Sokolovsky (@heydamir)](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md), CC BY 4.0. Tatsächlich gerenderte Ansichten wurden vor und nach der Umsetzung bei 320 und 390 px geprüft. Keine Bild- oder Videogenerierung, keine zusätzliche Landingpage.

Die Richtung bleibt: ein ruhiges, präzises Meldewerkzeug für Mannheim. Die Handlung und der Kontaktstatus tragen die Hierarchie; das bestehende Logo bleibt die Wiedererkennung. Farben, Symbole und große Bedienelemente des PR werden beibehalten.

Befunde der ersten Ablaufversion: der Umfang war länger als nötig, die zusätzliche graue Hinweisfläche wirkte wie eine verschachtelte Kachel, und der Hinweis auf den nächsten Schritt erwähnte den Meldeweg erneut, obwohl dieser schon geprüft ist.

Konkrete Korrekturen:

- Titelabstand zum Pilotumfang auf 12 px, Umfangsabstand zum Formular auf 16 px verkürzt.
- Umfang auf den geprüften Fall und den Textentwurf für weitere Orte konzentriert.
- Hinweis unter dem Ort ohne zusätzliche Kachel oder farbige Fläche; Titel, kurze Erklärung und eine mindestens 48 px hohe Linkfläche.
- Den langen Wartungsbegriff durch „Wer die Glasscheibe wartet, ist nicht bestätigt“ ersetzt. Die fachliche Unsicherheit bleibt erhalten.
- Hilfstext beim Hauptbutton nennt jetzt den tatsächlichen nächsten Schritt: „Meldetext prüfen“.
- Keine neue Farbe, kein neues Icon-System und keine Bewegung ergänzt. Haken, Fokuszustände, Schriftgrößen und 56-px-Hauptaktionen bleiben erhalten.

## Vorher-/Nachher-Nachweise

In allen Eingabe-Aufnahmen ist die Beschreibung absichtlich noch leer. Der Unterschied ist der sichtbare Kontaktstatus vor der Texterfassung.

| Fall | Vorher | Nachher |
| --- | --- | --- |
| Waldhof Nord · 320 px | [Screenshot](screenshots/pilot/before-320-known.png) | [Screenshot](screenshots/pilot/after-320-known.png) |
| Meldeweg offen · 320 px | [Screenshot](screenshots/pilot/before-320-open.png) | [Screenshot](screenshots/pilot/after-320-open.png) |
| Waldhof Nord · 390 px | [Screenshot](screenshots/pilot/before-390-known.png) | [Screenshot](screenshots/pilot/after-390-known.png) |
| Meldeweg offen · 390 px | [Screenshot](screenshots/pilot/before-390-open.png) | [Screenshot](screenshots/pilot/after-390-open.png) |

Zwischenstand vor dem Unslop-Pass: [bekannter Fall, 390 px](screenshots/pilot/flow-390-known.png). Desktop-Nachprüfung: [bekannt](screenshots/pilot/after-1440-known.png), [offen](screenshots/pilot/after-1440-open.png).

## Prüfungen

Verwendet wurde der bereits vom Nutzer freigegebene separate Playwright-Testbrowser: Headless Chrome 157.0.8103.79 unter Windows, eigenes Testprofil. Mobile Viewports wurden emuliert; echte Geräte stehen nicht zur Verfügung. Die Hilfswerkzeuge liegen in einem ignorierten lokalen Verzeichnis; keine App-Abhängigkeiten wurden hinzugefügt.

Bei 320 × 844, 390 × 844 und 1440 × 1000 px wurden jeweils sechs Szenarien geprüft:

1. Kategorie und Ort zeigen den Kontaktstatus vor einer Beschreibung. Ein Ort ohne Kategorie gibt noch keinen Kontakt frei. Kategorie-/Ortsänderungen wechseln zwischen bekannt und offen; der frühe Link hat das bestehende offizielle Ziel und liegt räumlich vor der Beschreibung.
2. Leere Eingaben und reine Leerzeichen: Fehlermeldungen und Fokus auf das erste fehlerhafte Feld.
3. Waldhof Nord: Vorschau und Kontaktziel, echte Clipboard-Schreib-/Leseprüfung des vollständigen Meldetexts.
4. Aufklappbare Quelle, Bearbeiten mit erhaltenen Werten, Wechsel auf Paradeplatz und geänderte Beschreibung, offener Meldeweg ohne Kontakt sowie weiterhin kopierbarer Text.
5. Tastatur: Radiogruppe mit Pfeiltasten, Ort, früher rnv-Link, Beschreibung, Absenden und Kopieren. Die Einführung des Links verschluckt keinen Fokus und verlangt kein Tippen der Beschreibung zum Prüfen des Meldewegs.
6. Simulierter Clipboard-API-Fehler: verständliche Rückmeldung, Fokus und Auswahl auf dem Text. Anschließend echtes manuelles Kopieren mit Strg+C geprüft. Windows-Zeilenenden wurden nur im Vergleich normalisiert.

Der maschinenlesbare Bericht steht in [browser-checks.json](screenshots/pilot/browser-checks.json). Zusätzlich wurden schmale Ansichten und 200 % Schriftgröße ohne horizontalen Überlauf geprüft. Bei 320 px und nach eingeblendeten Statusinformationen kann die Seite vertikal länger sein; Schrift oder Klickflächen werden dafür nicht verkleinert.

Vor beiden Commits bestanden Lint, alle neun Vitest-Tests und der Produktionsbuild einschließlich TypeScript-Prüfung. Die Tests decken zusätzlich ausdrücklich Routing ohne vorhandene Beschreibung ab. Alle 18 Browser-Szenarien (je sechs pro Viewport) bestanden ohne JavaScript-Laufzeitfehler.

## Offene echte Gerätetests

- [ ] iPhone – Safari: echte Bildschirmtastatur, Fokus/Scrollen, Kopieren und Zurückbearbeiten.
- [ ] Android – Chrome: echte Bildschirmtastatur, Fokus/Scrollen, Kopieren und Zurückbearbeiten.

Diese Punkte sind offen und werden auch im PR so markiert. Das externe Kontaktformular wurde nicht abgesendet. PR #8 bleibt ungemergt zur Review.
