# FixMyMA: Apple-inspirierter Designreview

Gerenderter Unslop-Durchgang am 22.11.2026 auf `feat/apple-inspired-design` nach [Unslop von Damir Sokolovsky (@heydamir)](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md), CC BY 4.0. Keine Bild- oder Videogenerierung.

## Nachbesserung nach Nutzerreview: weniger Neon

Der Nutzer empfand die große Lime-Fläche als zu neonartig. Auf demselben offenen Aufgabenbranch wurden daher die Hauptaktionen auf Dunkelblau mit weißer Schrift umgestellt. Gewählte Kategorien nutzen jetzt eine dezente graublaue Fläche mit Haken. Lime bleibt ausschließlich im kleinen Logo-Detail. Die äußeren Formular- und Kontaktflächen haben 16 statt 24 px Radius, der Meldetext 14 statt 20 px; der Formschatten wurde entfernt. `AGENTS.md` enthält diese aktualisierte Farbregel.

Die aktuelle Variante wurde erneut bei 390 × 844 und 1440 × 1000 px gerendert. Alle zehn Browser-Szenarien, die zusätzlichen schmalen Ansichten und 200 % Schriftgröße bestehen weiterhin. Sieben Vitest-Tests, Lint und Build bestehen. Es wurde kein fachliches Verhalten geändert.

| Aktueller Stand | Mobil | Desktop |
| --- | --- | --- |
| Formular | [Screenshot](screenshots/restrained/after-mobile-form.png) | [Screenshot](screenshots/restrained/after-desktop-form.png) |
| Vorschau | [Screenshot](screenshots/restrained/after-mobile-preview.png) | [Screenshot](screenshots/restrained/after-desktop-preview.png) |

[Gewählte Kategorie](screenshots/restrained/after-mobile-selected.png) · [Browser-Prüfbericht](screenshots/restrained/browser-checks.json). Die folgenden Abschnitte dokumentieren den ursprünglichen Apple-inspirierten Durchgang vor dieser Nachbesserung.

## Ausgangslage und Auftrag

Der Nutzer möchte die Beschilderungsrichtung durch eine ruhigere, Apple-inspirierte Systemoberfläche ersetzen und den fertigen Vorschlag vor einem Merge prüfen. Der Branch wurde von `origin/main` (`ffd8ef9`) erstellt. Weil der vorherige Designstand noch nicht in `main` enthalten war, wurde er als zusammengehörige Grundlage übernommen; die vorhandene Meldeweg-first-Vorschau bleibt erhalten. Dieser PR ist zur Sichtprüfung vorgesehen und wird nicht automatisch gemergt.

Die vorherige Oberfläche wurde erneut tatsächlich gerendert. Ihre kräftige DIN-artige Schrift, 2-px-Trennlinien und überwiegend eckigen Konturen bestimmen die gesamte Ansicht. Für die neue Richtung werden diese Merkmale gezielt angepasst; der Meldeablauf, die Kontakte und die funktionale Reihenfolge brauchen keinen neuen Entwurf.

## Richtung

- Produkt: Schäden in Mannheim zur eigenen Weitergabe vorbereiten.
- Charakter: ruhig, präzise, zugänglich.
- Umfeld: eine vertraute mobile Systemoberfläche.
- Akzente: Lime für Hauptaktion und Auswahl, Dunkelblau für Inhalte.
- Wiedererkennung: das bestehende Vier-Quadrate-Zeichen neben FixMyMA.

## Umsetzung nach den Unslop-Durchgängen

1. Abstände: eine zusammenhängende weiße Formularfläche mit 20-px-Gruppenabständen mobil und 24 px auf Desktop. Keine Reihe gleichartiger Dekokarten.
2. Farbe: sehr helles Systemgrau `#f5f5f7`, weiße Flächen, Dunkelblau `#14263d`, zurückhaltendes Lime `#d2ec70`. Der Akzent bleibt an Handlung und Auswahl gebunden.
3. Icons: bestehende einheitliche Kategorie-Icons und Logo beibehalten. Keine neue Symbolsprache oder Abhängigkeit.
4. Text: die kurzen, auf den Meldeablauf bezogenen Texte bleiben. Der primäre Schritt und die ungeklärte Wartungszuständigkeit stehen weiterhin direkt beim Kontaktweg.
5. Typografie: Systemschrift statt DIN-artiger Beschilderung. Überschriften 32 px mobil bzw. 40 px auf Desktop, Gewicht 600; Feldlabels 16 px mit Gewicht 500. Auf Apple-Systemen kann der Systemfont verwendet werden, auf dem geprüften Windows-System greift der vorhandene System-Fallback.
6. Layout: 24-px-Radius für die Formularfläche, 12 px für Felder und Kategorien, 14 px für Hauptaktionen. Die Vorschau gruppiert Kontaktweg und Aktionen; der vollständige Meldetext steht darunter. Die Hauptaktion bleibt mobil ohne verkleinerte Klickfläche erreichbar.
7. Details: 56-px-Hauptaktionen und Kategorien, deutliche Fokuszustände, native Radiotastaturbedienung und Fehlermeldungen bleiben erhalten. Schmale Ansichten und 200 % Schriftgröße brechen ohne horizontalen Überlauf um.
8. Visuals: die realen Formularinhalte und der Meldetext bleiben der Inhalt. Keine zusätzliche Illustration oder neue Marke.
9. Bewegung: kurze Farbwechsel bei Hover; `prefers-reduced-motion` deaktiviert sie. Kein animiertes Layout.

## Vorher und nachher im Browser

| Ansicht | Vorher | Nachher |
| --- | --- | --- |
| Formular · 390 × 844 | [Screenshot](screenshots/apple/before-mobile-form.png) | [Screenshot](screenshots/apple/after-mobile-form.png) |
| Vorschau · 390 × 844 | [Screenshot](screenshots/apple/before-mobile-preview.png) | [Screenshot](screenshots/apple/after-mobile-preview.png) |
| Formular · 1440 × 1000 | [Screenshot](screenshots/apple/before-desktop-form.png) | [Screenshot](screenshots/apple/after-desktop-form.png) |
| Vorschau · 1440 × 1000 | [Screenshot](screenshots/apple/before-desktop-preview.png) | [Screenshot](screenshots/apple/after-desktop-preview.png) |

Nachher, vollständig: [mobile Vorschau](screenshots/apple/after-mobile-preview-full.png), [Desktop-Vorschau](screenshots/apple/after-desktop-preview-full.png).

Gemessen bei 390 px: Die Unterkante der Formular-Hauptaktion liegt jetzt bei ca. 647 px (vorher 664 px). Der Kopierbutton beginnt bei ca. 329 px und bleibt direkt sichtbar. Daten: [vorher](screenshots/apple/before-metrics.json), [nachher](screenshots/apple/after-metrics.json).

## Prüfungen

Ein vom Nutzer bereits freigegebener separater Playwright-Testbrowser wurde verwendet: Headless Chrome 157.0.8103.79, eigenes Testprofil, deutsche Locale. Es handelt sich um echte Browserdarstellung und mobile Viewport-Emulation. Keine App-Abhängigkeit wurde für die Hilfswerkzeuge hinzugefügt.

Zehn Browser-Szenarien bestanden, jeweils fünf bei 390 × 844 und 1440 × 1000 px:

- Leere Eingaben und reine Leerzeichen: Fehler und Fokus auf den ersten fehlerhaften Bereich.
- Waldhof Nord: rnv-Kontaktziel, Hinweis auf ungeklärte Wartung und echtes Kopieren mit anschließendem Lesen der Zwischenablage.
- Aufklappbare Quelle und Bearbeiten mit erhaltenen Eingaben; Änderung auf Paradeplatz und eine ergänzte Beschreibung; unbekannter Meldeweg ohne erfundenen Kontakt, weiterhin kopierbar.
- Tastaturweg mit Tab, Pfeiltasten, Enter, sichtbarem Auswahlfokus und Kopieren.
- Simulierter Fehler der Clipboard-API: vollständiger Text wird fokussiert und markiert; anschließendes echtes manuelles Kopieren mit Strg+C geprüft.

Zusätzlich 320, 360 und 390 px Breite mit 200 % Schriftgröße ohne horizontalen Seitenüberlauf geprüft. Bei 360 × 740 und 390 × 740 px ist die Formular-Hauptaktion vollständig ohne Scrollen sichtbar. Keine JavaScript-Laufzeitfehler in den geprüften Abläufen. Maschinenlesbare Ergebnisse: [browser-checks.json](screenshots/apple/browser-checks.json).

`npm test`: alle sieben Vitest-Tests bestanden. `npm run lint`, `npm run build` einschließlich TypeScript-Prüfung und `git diff --check` bestanden. Die GitHub-Prüfungen werden am PR zusätzlich ausgeführt.

Offen: physisches Smartphone mit Bildschirmtastatur sowie Firefox und WebKit. Das externe Kontaktformular wurde nicht abgesendet. Kontakte, Zuordnung und fachliches Verhalten bleiben unverändert gegenüber dem übernommenen Meldewerkzeug.
