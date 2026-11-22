![FixMyMA – Web-App](docs/fixmyma-web-banner.webp)

# FixMyMA Web

Mit FixMyMA kannst du einen Schaden in Mannheim beschreiben, den passenden Meldeweg prüfen und einen Meldetext zum Weitergeben vorbereiten. Die Web-App verwendet React, TypeScript und Vite. Sie läuft im Browser und versendet keine Meldungen automatisch.

[Ablauf](#ablauf) · [Lokal starten](#lokal-starten) · [Meldewege](#meldewege-und-quellen) · [Organisation](https://github.com/fixmyma)

## Ablauf

Kategorie, Ort und Beschreibung eingeben, dann „Meldung vorbereiten“. In der Vorschau lassen sich die Angaben prüfen, kopieren und mit „Angaben bearbeiten“ ohne Datenverlust ändern. Ohne Clipboard-Zugriff wird der Text zum manuellen Kopieren markiert. Die Angaben liegen nur im React-Speicher; ein Neuladen verwirft sie. Keine Daten werden automatisch an eine Meldestelle übertragen.

## Lokal starten

```sh
npm ci
npm run dev
```

Unter Windows bei gesperrten PowerShell-Skripten `npm.cmd` verwenden.

## Prüfungen

```sh
npm run lint
npm run build
npm test
```

Die TypeScript-Logiktests in `tests/report.test.ts` laufen mit Vitest (geprüft mit Node 24). Sie prüfen Validierung, die begrenzte Zuordnung, Meldetext und Clipboard-Erfolg/Fehler mit einem Test-Clipboard. `npm test` führt sie einmal aus; `npm run test:watch` startet den Watch-Modus. `npm run build` prüft auch die Typen der Tests. Sie ersetzen keinen Browser- oder Gerätetest.

## Meldewege und Quellen

- `src/contacts.ts`: offizielle Kontakte und Quellenstand.
- `src/routing.ts`: bewusste, enge Zuordnung unabhängig von der Oberfläche.
- `src/report.ts`: Kategorien, Validierung und Meldetext.
- `src/clipboard.ts`: Kopieren mit erkennbarem Fehlerfall.

Referenzfall: Kategorie „Haltestelle“, Ort „Waldhof Nord“, kaputte Glasscheibe am Wartehäuschen.

Die offizielle rnv-Seite [Schreiben Sie uns](https://www.rnv-online.de/unternehmen/kontakt/schreiben-sie-uns/) nennt rnv Scout in der Start.Info-App für Schäden an Fahrzeugen oder Haltestellen und bietet ein Kontaktformular an (geprüft am 22.11.2026). FixMyMA verlinkt dieses Formular als offiziellen Kontaktweg. Daraus folgt keine bestätigte Eigentümerschaft oder Wartungszuständigkeit für die konkrete Glasscheibe. Die App macht diese Grenze ausdrücklich sichtbar. Für andere Orte oder Kategorien zeigt sie die ungeklärte Zuständigkeit ohne erfundenen Kontakt an.

## GitHub-Prüfungen und Updates

GitHub Actions führt bei Pull Requests und Pushes auf `main` mit Node.js 24 automatisch `npm ci`, Lint, Build und die Logiktests aus. Der Workflow kann zusätzlich unter **Actions → CI → Run workflow** manuell gestartet werden.

Dependabot prüft npm-Abhängigkeiten und GitHub Actions montags um 09:00 Uhr (Europe/Berlin). Minor- und Patch-Updates für npm werden gruppiert; Major-Updates bleiben einzeln prüfbar. Sicherheitsupdates sind separat aktiviert und nicht auf diesen Wochenplan beschränkt. Updates werden als PR vorbereitet und nicht automatisch gemergt.

CodeQL verwendet GitHubs Default Setup für JavaScript/TypeScript. Ergebnisse stehen unter **Security → Code scanning**; Dependabot-Hinweise unter **Security → Dependabot**.

## Noch manuell prüfen

Bei 390 px und Desktop: leeres Formular absenden, Fehler/Fokus prüfen; Haltestelle / Waldhof Nord / Glasschaden eingeben; Vorschau prüfen; zurückgehen und Eingaben ändern; Text kopieren und in einen lokalen Texteditor einfügen; verweigerte Clipboard-Berechtigung und unbekannte Orte prüfen. Auch Tastaturbedienung, Zoom und echte mobile Bildschirmtastatur sind zu prüfen.
