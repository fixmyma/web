# FixMyMA: eine Unslop-Runde

Review am 22.11.2026 nach [Unslop von Damir Sokolovsky (@heydamir)](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md), CC BY 4.0. Die öffentliche SKILL.md sowie `references/signs.md` und `references/tokens.md` wurden gelesen. Keine Bild- oder Videogenerierung.

## Grundlage und Grenze

Geprüft wurden `src/App.tsx`, `src/App.css` und `src/index.css` nach Etappe 2. Kein Screenshot-Review: Der Browserhost war nicht verfügbar; der alternative Zugriff auf das vorhandene Chrome-Fenster wurde vom Computer-Use-Tool abgelehnt. Die folgenden Befunde beruhen auf Markup, CSS und Interaktionscode. Die Darstellung bei 390 px und auf Desktop bleibt manuell zu prüfen.

## Audit

- Vorschau / Copy: lange Erklärung, Quelle und dreiteilige Anleitung stehen vor der Kopieraktion; die nächste Handlung ist unnötig weit unten.
- Vorschau / Layout: der vollständige Meldetext steckt in einem Textfeld mit eigener Scrollfläche. Bei mehrzeiligen Beschreibungen ist nicht alles direkt sichtbar.
- Formular / Copy: „Straße & Gehweg“ und der lange Beispieltext beanspruchen viel Breite.
- Formular / Details: Die Grenze von 2.000 Zeichen ist unsichtbar; Fehler haben keinen gemeinsamen Hinweis und Radiofehler sind nur am Fieldset beschrieben.
- Typografie: mehrere Überschriften verwenden Gewicht 600; Haupt- und Abschnittsüberschriften brauchen für die Hierarchie nicht dieselbe Betonung wie Feldlabels.
- Keine Verläufe, Glows, Emoji, Badges, Deko-Karten oder unnötigen Animationen gefunden. Einstufung: gezielter Feinschliff, keine neue Gestaltungsrichtung.

## Richtung

- Produkt: Menschen in Mannheim bereiten einen Schaden zur eigenen Weitergabe vor.
- Charakter: sachlich, verlässlich, direkt.
- Umfeld: Straße und Haltestelle, lesbar unterwegs und bei wenig Zeit.
- Akzente: Lime kennzeichnet gewählte Kategorie und Hauptaktion; die übrige Oberfläche bleibt ruhig und der Text dunkelblau.
- Wiedererkennung: ein durchgehend lesbarer Meldetext mit Kategorie und Mannheimer Ort, ohne dekorative Ersatzgrafik.

## Neun Durchgänge

1. **Abstände:** Header auf 16 px vertikales Padding, mobiler Hauptbereich auf 24 px und Titelabstand auf 24 px reduziert. Gruppen bleiben auf dem 4-px-Raster. Die 52-px-Klickflächen und mindestens 48 px für Nebenaktionen bleiben erhalten.
2. **Farbe:** vorhandenes Dunkelblau/Lime beibehalten. Kein zusätzlicher Farbakzent; Fehlermeldungen haben semantisches Rot und Text. Keine farbigen Flächen zur Dekoration ergänzt.
3. **Icons:** keine notwendig, keine ergänzt. Radiobuttons zeigen Auswahl zusätzlich zur Farbe.
4. **Text:** Kategorie auf „Straße / Weg“ gekürzt, Beispieltext verkürzt. Anleitung zum Kopieren und anschließenden Öffnen des Formulars gestrafft. Quellenbegründung aufklappbar; die ungeklärte Zuständigkeit für die Glasscheibe bleibt direkt sichtbar.
5. **Typografie:** Haupt- und Abschnittsüberschrift auf Gewicht 500. Schriftgrößen in rem; Eingaben und primäre Inhalte mindestens 1 rem, Hinweise 0,875 rem. Systemschrift benötigt keinen externen Fontabruf.
6. **Layout:** Textvorschau als umbrechender Textblock statt eines verschachtelt scrollenden Textfelds. Kopieraktion steht vor dem externen Kontaktformular-Link; „Angaben bearbeiten“ bleibt als ruhige Textaktion erhalten. Sehr lange Wörter brechen um.
7. **Details:** sichtbarer Zeichenzähler, Fehlerzusammenfassung mit `role=alert`, Fehlerzuordnung auch direkt an den Radios. Clipboard-Fehler fokussiert und markiert den Text für manuelles Kopieren. Quellenstand kommt aus den Kontaktdaten, statt separat in der Oberfläche festgeschrieben zu sein.
8. **Visuals:** tatsächlicher Meldetext ist der relevante Inhalt. Keine Bilder, Karten, Illustrationen oder Hero-Flächen ergänzt.
9. **Bewegung:** statische Oberfläche beibehalten; keine Animation nötig. Hover und Tastaturfokus bleiben sichtbar.

## Nachprüfung

Auditpunkte im Code bearbeitet. Lint, Produktionsbuild und sieben Logiktests bestanden. HTML und beide Produktionsassets wurden über den lokalen Previewserver mit HTTP 200 ausgeliefert. Die Textkontraste für Dunkelblau auf Lime, Hinweistext auf Seitenhintergrund und Fehlertext auf Seitenhintergrund wurden rechnerisch mit mindestens 4,5:1 geprüft. Visuelle Nachprüfung, echte Clipboard-Integration, mobile Bildschirmtastatur und vollständiger Browserablauf sind mangels genehmigten Browserzugriffs offen. Keine Behauptung eines durchgeführten Bildschirm- oder Gerätetests.
