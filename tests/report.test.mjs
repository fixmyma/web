import test from 'node:test'
import assert from 'node:assert/strict'
import { validateReport, createReportText } from '../src/report.ts'
import { resolveReportingRoute } from '../src/routing.ts'
import { copyReport } from '../src/clipboard.ts'

const reference = {
  category: 'stop',
  location: 'Waldhof Nord',
  description: 'Die Glasscheibe am Wartehäuschen ist zerbrochen. Scherben liegen auf dem Boden.',
}

test('empty and whitespace-only entries cannot prepare a report', () => {
  assert.deepEqual(Object.keys(validateReport({ category: '', location: '   ', description: '\n    ' })),
    ['category', 'location', 'description'])
})

test('validation rejects too little detail and excessive input', () => {
  assert.ok(validateReport({ ...reference, location: 'MA', description: 'Glas' }).location)
  assert.ok(validateReport({ ...reference, location: 'MA', description: 'Glas' }).description)
  assert.ok(validateReport({ ...reference, location: 'x'.repeat(161) }).location)
  assert.ok(validateReport({ ...reference, description: 'x'.repeat(2001) }).description)
  assert.ok(validateReport({ ...reference, category: 'invented' }).category)
  assert.deepEqual(validateReport(reference), {})
})

test('Waldhof Nord resolves to the official rnv contact, without certifying ownership', () => {
  for (const location of ['Waldhof Nord', ' WALDHOF-NORD ', 'Haltestelle Waldhof Nord, Mannheim']) {
    const route = resolveReportingRoute({ ...reference, location })
    assert.equal(route.kind, 'official-contact')
    assert.equal(new URL(route.contact.url).hostname, 'www.rnv-online.de')
    assert.match(route.explanation, /nicht bestätigt/)
  }
})

test('different locations, false partial matches and other categories stay unconfirmed', () => {
  for (const location of ['Paradeplatz', 'Nicht Waldhof Nord', 'Waldhof Nordstraße', 'Waldhof Nord Heidelberg']) {
    const route = resolveReportingRoute({ ...reference, location })
    assert.equal(route.kind, 'unconfirmed')
    assert.equal(route.contact, undefined)
  }
  assert.equal(resolveReportingRoute({ ...reference, category: 'waste' }).kind, 'unconfirmed')
})

test('prepared text includes exactly the user details and does not mutate the draft', () => {
  const draft = Object.freeze({ ...reference, location: ' Waldhof Nord ', description: ' Scheibe kaputt.\nNeben der Sitzbank. ' })
  assert.equal(createReportText(draft), 'Schadensmeldung – Mannheim\n\nKategorie: Haltestelle\nOrt: Waldhof Nord\n\nBeschreibung:\nScheibe kaputt.\nNeben der Sitzbank.')
  assert.equal(draft.location, ' Waldhof Nord ')
})

test('clipboard success means the complete prepared text was written', async () => {
  let actual
  const text = createReportText(reference)
  const result = await copyReport(text, { writeText: async (value) => { actual = value } })
  assert.equal(result, true)
  assert.equal(actual, text)
})

test('missing or denied clipboard access offers manual copying rather than false success', async () => {
  assert.equal(await copyReport('Meldung', undefined), false)
  assert.equal(await copyReport('Meldung', { writeText: async () => { throw new Error('denied') } }), false)
})
