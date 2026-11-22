# FixMyMA

Mobile Browser-App, um einen Schaden in Mannheim zu beschreiben, einen verifizierten Meldeweg zu prüfen und den Meldetext selbst weiterzugeben. React, TypeScript und Vite; kein Backend und kein automatischer Versand.

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
node --test tests/report.test.mjs
```

Die Logiktests benötigen Node.js 22.18+ mit TypeScript Type Stripping (geprüft mit Node 24). Sie prüfen Validierung, die begrenzte Zuordnung, Meldetext und Clipboard-Erfolg/Fehler mit einem Test-Clipboard. Sie ersetzen keinen Browser- oder Gerätetest.

## Ablauf

Kategorie, Ort und Beschreibung eingeben, dann „Meldung vorbereiten“. In der Vorschau lassen sich die Angaben prüfen, kopieren und mit „Angaben bearbeiten“ ohne Datenverlust ändern. Ohne Clipboard-Zugriff wird der Text zum manuellen Kopieren markiert. Die Angaben liegen nur im React-Speicher; ein Neuladen verwirft sie. Keine Daten werden automatisch an eine Meldestelle übertragen.

## Meldewege und Quellen

- `src/contacts.ts`: offizielle Kontakte und Quellenstand.
- `src/routing.ts`: bewusste, enge Zuordnung unabhängig von der Oberfläche.
- `src/report.ts`: Kategorien, Validierung und Meldetext.
- `src/clipboard.ts`: Kopieren mit erkennbarem Fehlerfall.

Referenzfall: Kategorie „Haltestelle“, Ort „Waldhof Nord“, kaputte Glasscheibe am Wartehäuschen.

Die offizielle rnv-Seite [Schreiben Sie uns](https://www.rnv-online.de/unternehmen/kontakt/schreiben-sie-uns/) nennt rnv Scout in der Start.Info-App für Schäden an Fahrzeugen oder Haltestellen und bietet ein Kontaktformular an (geprüft am 22.11.2026). FixMyMA verlinkt dieses Formular als offiziellen Kontaktweg. Daraus folgt keine bestätigte Eigentümerschaft oder Wartungszuständigkeit für die konkrete Glasscheibe. Die App macht diese Grenze ausdrücklich sichtbar. Für andere Orte oder Kategorien zeigt sie die ungeklärte Zuständigkeit ohne erfundenen Kontakt an.

## Noch manuell prüfen

Bei 390 px und Desktop: leeres Formular absenden, Fehler/Fokus prüfen; Haltestelle / Waldhof Nord / Glasschaden eingeben; Vorschau prüfen; zurückgehen und Eingaben ändern; Text kopieren und in einen lokalen Texteditor einfügen; verweigerte Clipboard-Berechtigung und unbekannte Orte prüfen. Auch Tastaturbedienung, Zoom und echte mobile Bildschirmtastatur sind zu prüfen.
