# FixMyMA: gerenderter Designreview

Aktueller Gestaltungsvorschlag zur Sichtprüfung: [Apple-inspirierter Designreview mit neuen Screenshots](apple-design-review.md). Der folgende Abschnitt dokumentiert die vorherige Stadtleitsystem-Richtung.

## Mannheimer Stadtleitsystem · 22.11.2026

Aufgabenbranch: `feat/mannheim-wayfinding`, Ausgangsstand: `ffd8ef9` von `origin/main`.

Dieser Durchgang prüft die tatsächliche Browserdarstellung vor und nach der Umsetzung. Der frühere, ausschließlich auf Markup und CSS beruhende Review bleibt im [historischen Stand von docs/design-review.md](https://github.com/fixmyma/web/blob/9303d54/docs/design-review.md) nachvollziehbar.

Vorgehen nach [Unslop von Damir Sokolovsky (@heydamir)](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md), CC BY 4.0; SKILL.md, Signs, Tokens und Visuals-Leitfaden berücksichtigt. Die ausdrücklich vorgegebene Gestaltungsrichtung und Reihenfolge der Vorschau stammen vom Nutzer. Keine Bild- oder Videogenerierung.

## Browser und Belege

Der eingebaute `@Browser` meldete einen nicht verfügbaren Browserhost. Der Nutzer hat den Wechsel zu einem separaten lokalen Playwright-Testbrowser ausdrücklich freigegeben. Verwendet wurde Headless Chrome 157.0.8103.79 mit einem eigenen Testprofil, deutscher Locale und einer Geräte-Pixeldichte von 1. App-Abhängigkeiten und Lockfile wurden dafür nicht geändert; die Hilfswerkzeuge liegen lokal in einem ignorierten `.local`-Verzeichnis.

Alle Aufnahmen zeigen die tatsächlich unter `http://127.0.0.1:5173/` gerenderte App. Die Vorschau verwendet in beiden Versionen dieselben Eingaben: Haltestelle, Waldhof Nord, „Die Glasscheibe am Wartehäuschen ist zerbrochen. Scherben liegen neben der Sitzbank.“

| Ansicht | Vorher | Nachher |
| --- | --- | --- |
| Formular · 390 × 844 px | [Screenshot](screenshots/wayfinding/before-mobile-form.png) | [Screenshot](screenshots/wayfinding/after-mobile-form.png) |
| Vorschau · 390 × 844 px | [Screenshot](screenshots/wayfinding/before-mobile-preview.png) | [Screenshot](screenshots/wayfinding/after-mobile-preview.png) |
| Formular · 1440 × 1000 px | [Screenshot](screenshots/wayfinding/before-desktop-form.png) | [Screenshot](screenshots/wayfinding/after-desktop-form.png) |
| Vorschau · 1440 × 1000 px | [Screenshot](screenshots/wayfinding/before-desktop-preview.png) | [Screenshot](screenshots/wayfinding/after-desktop-preview.png) |

Vollständige mobile Vorschau: [vorher](screenshots/wayfinding/before-mobile-preview-full.png), [nachher](screenshots/wayfinding/after-mobile-preview-full.png). Rohmesswerte: [vorher](screenshots/wayfinding/before-metrics.json), [nachher](screenshots/wayfinding/after-metrics.json). Bei der alten Vorschau konnte die automatische Überschriftenfokussierung den Header aus dem Sichtbereich schieben. Der neue Ansichtswechsel fokussiert die Überschrift ohne diesen Scrollsprung und beginnt oben.

## Audit anhand der Vorher-Screens

- Die Marke besteht nur aus einer Wortmarke; das vorhandene Vier-Quadrate-Zeichen aus dem README-Banner fehlt in der App.
- Der kühle Hintergrund und die zurückhaltende Überschrift geben dem Mannheimer Werkzeug wenig eigene Identität.
- Hilfstexte wiederholen die Formularlabels und verlängern den Weg zur Hauptaktion. Der Hauptbutton endet mobil erst bei etwa 775 px.
- Die Vorschau beginnt mit dem ganzen Meldetext. Der Kontaktweg folgt darunter; der Kopierbutton beginnt erst bei etwa 871 px.
- Die Vorschau zeigt mehrere Erklärungen vor der eigentlichen Handlung. Quelle, Aktionen und Bearbeiten sind visuell weit verteilt.

## Richtung

- **Produkt:** Menschen in Mannheim bereiten einen konkreten Schaden zur eigenen Weitergabe vor.
- **Charakter:** direkt, öffentlich, verlässlich.
- **Umfeld:** Mannheimer Stadtleitsystem, mit klarer Beschriftung und einfachen Wegentscheidungen.
- **Akzente:** Lime kennzeichnet die Hauptaktion und die gewählte Kategorie; Creme und tiefes Dunkelblau tragen den Rest.
- **Wiedererkennung:** das kompakte Vier-Quadrate-Zeichen aus `docs/fixmyma-web-banner.webp`, als skalierbare SVG-Fassung neben der Wortmarke.

## Neun Durchgänge

1. **Abstände:** zusammenhängende Formularfläche mit 24-px-Gruppenabständen. Wiederholende Hint-Zeilen entfernt, Zähler neben das Beschreibungslabel gesetzt. Hauptaktionen und Kategorien bleiben mindestens 56 px hoch.
2. **Farbe:** warmes Creme `#f7f3e8`, Dunkelblau `#081e3f`, helle Eingabeflächen `#fffdf6`, Lime `#c5f230`. Kein Verlauf, keine dekorative Kartenfläche und keine Badge-Reihe.
3. **Icons:** vier funktionale SVG-Icons aus einer gemeinsamen Formensprache: 20 px, Strichstärke 1,75, einfarbig. Die native Radiogruppe bleibt tastaturbedienbar; eine sichtbare Auswahlmarkierung ergänzt die Lime-Fläche.
4. **Text:** kurze Kategoriebegriffe und konkrete Beispiele in den Eingaben. Bekannter Meldeweg: zuerst rnv und nächster Schritt, dazu die ungeklärte Wartungszuständigkeit. Unbekannter Meldeweg: kurz erklären, dass der Text trotzdem zur eigenen Weitergabe vorbereitet und kopiert werden kann.
5. **Typografie:** kräftige, an Beschilderung angelehnte Überschriften mit lokal verfügbarer Bahnschrift und System-Fallbacks. 36 px mobil, 44 px auf Desktop; Labels und Buttons 16 px, Hinweise 14 px bei Standardschriftgröße. Keine externen Fontabrufe; relative Größen respektieren die Schriftvergrößerung.
6. **Layout:** Vorschau jetzt in der Reihenfolge Meldeweg → Kopieren/Kontaktformular → Meldetext/Bearbeiten → aufklappbare Quelle. Mobil stehen die Hauptaktionen untereinander, auf Desktop nebeneinander. Formular-Kategorien passen sich ohne verkleinerte Schrift an die Breite an.
7. **Details:** echte Fokuszustände, zugeordnete Fehlermeldungen, erhaltener Bearbeitungsstand und selektierbarer Meldetext. Die Kopfzeile und Kategorien brechen bei großer Schrift um. Die Quelle und das Prüfdatum kommen weiterhin aus den bestehenden Kontaktdaten.
8. **Visuals:** vorhandenes Logo in kompakter Vektorform übernommen. Keine neue Illustration, kein Hero und keine Deko-Karte.
9. **Bewegung:** statische Oberfläche mit einfachen Hover-Zuständen. Fokus wird beim Ansichtswechsel ohne unbeabsichtigtes Scrollen auf die Überschrift gesetzt.

## Gemessener Unterschied

| Messpunkt · 390 px breit | Vorher | Nachher |
| --- | ---: | ---: |
| Unterkante „Meldung vorbereiten“ | ca. 775 px | ca. 664 px |
| Oberkante „Meldetext kopieren“ | ca. 871 px | ca. 320 px |
| Höhe der Hauptaktion | 52 px | 56 px |

Das Formular bleibt auch bei 390 × 740 px und 360 × 740 px ohne Scrollen bis zur Hauptaktion bedienbar. Bei 320 px Breite werden Kategorien einspaltig; die Seite darf dann vertikal länger werden. Auch mit 200 % Schriftgröße entsteht in den zusätzlich geprüften Breiten 320, 360 und 390 px kein horizontaler Seitenüberlauf.

## Tatsächlich ausgeführte Browserprüfungen

Zehn bestandene Szenarien: jeweils die folgenden fünf bei 390 × 844 px und 1440 × 1000 px. Maschinenlesbarer Bericht: [browser-checks.json](screenshots/wayfinding/browser-checks.json).

1. Leere Eingaben und reine Leerzeichen: Fehler erscheinen; der erste fehlerhafte Bereich erhält den Fokus.
2. Waldhof Nord: offizieller rnv-Kontaktlink mit neuem Tab, sichtbare Unsicherheit zur Wartung und korrekt vorbereiteter Meldetext. Kopieren wurde mit anschließendem Lesen der echten Zwischenablage geprüft.
3. Aufklappbare Quelle, Bearbeiten und Rückkehr: Kategorie, Ort und Beschreibung bleiben erhalten. Danach Ort auf Paradeplatz und Beschreibung geändert; unbekannter Meldeweg ohne erfundenen Kontakt, weiterhin korrekt kopierbarer Text und erneut erhaltene Eingaben.
4. Kompletter Tastaturweg: Tab, Pfeiltasten in der Radiogruppe, sichtbarer Fokus, Eingaben, Enter zur Vorschau und Kopieren mit Enter.
5. Clipboard-Fehler im Browser gezielt simuliert: Fehlermeldung, Fokus und Auswahl auf dem vollständigen Meldetext geprüft. Anschließend echtes manuelles Kopieren mit Strg+C und Lesen der Zwischenablage geprüft. Windows-Zeilenenden wurden nur beim Vergleich normalisiert.

Zusätzliche Belege: [mobile Validierung](screenshots/wayfinding/checked-mobile-validation.png), [unbekannter Ort](screenshots/wayfinding/checked-mobile-unknown.png), [manueller Kopierweg](screenshots/wayfinding/checked-mobile-manual-copy.png). Keine JavaScript-Laufzeitfehler in den geprüften Abläufen.

## Automatische Prüfungen und Grenzen

`npm test`: alle sieben bestehenden Vitest-Tests bestanden. `npm run lint`, `npm run build` einschließlich TypeScript-Prüfung und `git diff --check` bestanden. Kontakte, Meldeweg-Zuordnung, Validierung und Meldetext-Erzeugung wurden fachlich nicht verändert.

Die mobilen Aufnahmen sind Browser-Emulation, kein Test auf einem physischen Smartphone. Die echte mobile Bildschirmtastatur sowie Firefox und WebKit wurden nicht geprüft. Das externe Kontaktformular wurde nicht abgesendet; dessen Ziel und Tab-Verhalten wurden über den gerenderten Link geprüft.
