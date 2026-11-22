# Arbeitsregeln für KI-Assistenten

Diese Regeln gelten für das gesamte Repository. Konkrete Anweisungen des Nutzers zur aktuellen Aufgabe haben Vorrang. Lies vor Änderungen diese Datei und die betroffenen Projektdateien.

## Projektkontext

FixMyMA hilft Menschen in Mannheim, Schäden im öffentlichen Raum zu beschreiben, einen verifizierten Meldeweg zu finden und einen Meldetext zur eigenen Weitergabe vorzubereiten.

- Aktueller Stand: Frontend-MVP mit React, TypeScript und Vite; Vitest für Tests, Oxlint für Linting. Verwende npm und die vorhandenen npm-Skripte. Die CI verwendet Node.js 24.
- Ablauf: Nach Kategorie und Ort den bestehenden Meldeweg direkt unter dem Ort zeigen, noch vor der Beschreibung. Pilotumfang: geprüfter rnv-Kontaktweg für Haltestelle Waldhof Nord, sonst offener Meldeweg mit Textentwurf. Danach Beschreibung ergänzen, Vorschau prüfen, Angaben ohne Datenverlust bearbeiten und Meldetext kopieren.
- Referenzfall: kaputte Glasscheibe am Wartehäuschen der Haltestelle Waldhof Nord in Mannheim.
- Es gibt aktuell kein Backend, keine dauerhafte Speicherung und keinen automatischen Versand. Eingaben liegen im React-Arbeitsspeicher und gehen beim Neuladen verloren. Neue Speicherung oder Versandfunktionen gehören nur in ausdrücklich entsprechend beauftragte Aufgaben.
- Ein offizieller Kontaktweg bestätigt nicht automatisch die Eigentümerschaft oder Wartungszuständigkeit für ein einzelnes Objekt. Kontakte und Zuständigkeiten niemals erfinden. Neue Zuordnungen anhand offizieller Quellen prüfen und Quelle sowie Prüfdatum festhalten. Unklarheiten in der Oberfläche sichtbar lassen.

## Git und Branches

- Prüfe vor jeder Aufgabe `git status`, den aktuellen Branch und vorhandene Anweisungen. Bewahre lokale Änderungen des Nutzers; überschreibe, verwerfe oder committe sie nicht ungefragt mit.
- **Für jede neue Änderungsaufgabe zuerst einen eigenen Branch erstellen, bevor irgendeine Datei geändert wird.** Das gilt auch für Tests, Dokumentation, Konfiguration, Abhängigkeiten und diese Datei.
- Basis ist der aktuelle Stand von `origin/main`: zuerst `git fetch origin`, dann beispielsweise `git switch -c test/should-test-names origin/main`. Nicht versehentlich das Tracking des neuen Branches auf `origin/main` belassen; beim ersten Push `git push -u origin <branch>` verwenden.
- Verwende aussagekräftige Namen mit `feat/`, `fix/`, `test/`, `docs/`, `refactor/` oder `chore/`.
- Zusammengehörige Änderungen und Nachbesserungen derselben Aufgabe bleiben auf demselben Aufgabenbranch. Eine neue, unabhängige Aufgabe erhält einen neuen Branch. Bereits gemergte Branches nicht für weitere Änderungen wiederverwenden.
- Niemals direkt auf `main` ändern, committen oder pushen. Keine Force-Pushes, destruktiven Resets oder Umgehung von Repository-Regeln ohne ausdrücklichen Auftrag.
- Commits, Pushes und PRs im vom Nutzer beauftragten Umfang ausführen. Ein Auftrag zum Committen, Pushen oder Erstellen eines PRs ist **kein** Auftrag zum Mergen.
- **PRs nur auf ausdrückliche Anweisung des Nutzers mergen.** Vor einem autorisierten Merge müssen die relevanten Checks erfolgreich sein. Branches nach dem Merge behalten, sofern keine Löschung beauftragt wurde.

## Umsetzung und Aufbau

- Bestehendes React-/TypeScript-/Vite-Setup und vorhandene Skripte weiterverwenden. Änderungen auf die Aufgabe begrenzen; keine unnötigen Frameworks oder Abhängigkeiten hinzufügen.
- `src/App.tsx` und CSS: Oberfläche und Interaktion.
- `src/report.ts`: Kategorien, Eingabeprüfung und Meldetext.
- `src/contacts.ts`: Meldestellen und Quellenstand.
- `src/routing.ts`: Zuordnungslogik, getrennt von der UI.
- `src/clipboard.ts`: Kopieren und erkennbarer Fehlerfall.
- `tests/`: Vitest-Tests in TypeScript.
- `README.md`: Einrichtung, aktuelle Befehle und Funktionsgrenzen. Bei Änderungen am Ablauf oder an Skripten aktuell halten.
- Keine Zugangsdaten, Tokens, privaten Daten oder lokalen Umgebungsdateien committen. Lockfile bei Abhängigkeitsänderungen aktualisieren und mitführen.

## Oberfläche

- Deutsche, verständliche UI-Texte; mobile Bedienung hat Priorität.
- Dunkelblau für Text und Hauptaktionen; Hauptbuttons mit weißer Schrift. Kategorien mit Haken und einer dezenten graublauen Fläche auswählen. Lime ausschließlich als kleines Detail im Logo verwenden, nicht für Buttons oder Auswahlflächen. Große Klickflächen, sichtbare Fokuszustände und gut zugeordnete Fehlermeldungen beibehalten.
- Kategorie, Ort und Beschreibung stehen im Mittelpunkt. Keine Marketing-Hero-Flächen oder dekorativen Karten hinzufügen.
- Vorschau und Bearbeiten müssen Eingaben erhalten. Clipboard-Fehler verständlich anzeigen und manuelles Kopieren ermöglichen. Nicht behaupten, dass eine Meldung versendet wurde, wenn nur Text vorbereitet oder kopiert wurde.

## Tests und Prüfungen

- Tests mit Vitest und TypeScript schreiben.
- **Jede Testbeschreibung bei `test` oder `it` muss mit `should` beginnen**, gefolgt vom erwarteten Verhalten. Das gilt auch für parametrisierte Tests. Beispiel: `test('should reject an empty location', ...)`.
- `describe` benennt das getestete Thema und benötigt keinen `should`-Präfix.
- Verhalten und relevante Fehlerfälle prüfen. Keine Tests hinzufügen, die lediglich die Implementierung nachbauen. Bei Änderungen vorhandene sinnvolle Testabdeckung erhalten.
- Vor einem Commit mit Code-, Test-, Abhängigkeits- oder CI-Änderungen ausführen: `npm test`, `npm run lint` und `npm run build`. Fehler aus den eigenen Änderungen beheben. `npm run build` prüft auch die TypeScript-Typen der Tests.
- Bei reinen Dokumentationsänderungen mindestens den Diff auf Inhalt und mit `git diff --check` prüfen; nicht unnötig Builds wiederholen.
- Auf Windows bei gesperrtem `npm.ps1` die Variante `npm.cmd` verwenden. Watch-Modus für die Entwicklung: `npm run test:watch`.
- Bei UI-Änderungen, sofern Browserzugriff verfügbar ist, bei 390 px und auf Desktop prüfen: Validierung, Vorschau, Zurückgehen/Bearbeiten und Kopieren. Logiktests ersetzen keine Browserprüfung.
- Nur tatsächlich ausgeführte Prüfungen als bestanden melden. Fehlenden Browserzugriff oder andere Prüflücken ausdrücklich nennen.

## Commits, PRs und Abschluss

- Kleine, zusammengehörige Commits mit klaren englischen Nachrichten erstellen, z. B. `test: use should-prefixed descriptions`.
- PR-Titel und Beschreibung auf Englisch schreiben. Problem bzw. Ziel, resultierendes Verhalten, relevante Änderungen und tatsächlich ausgeführte Prüfungen nennen. Offene Prüflücken angeben.
- Keine fremden oder sachfremden Änderungen in einen Commit oder PR aufnehmen.
- Zum Abschluss kurz nennen: was geändert wurde, Branch, gegebenenfalls Commit-Hash und PR-Link, Prüfergebnisse sowie offene Punkte. Klar zwischen lokal geändert, committet, gepusht, PR erstellt und gemergt unterscheiden.
