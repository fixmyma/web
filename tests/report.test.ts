import { describe, expect, test, vi } from 'vitest'
import { validateReport, createReportText } from '../src/report'
import type { ReportDraft } from '../src/report'
import { resolveReportingRoute } from '../src/routing'
import { copyReport } from '../src/clipboard'

const reference: ReportDraft = {
  category: 'stop',
  location: 'Waldhof Nord',
  description: 'Die Glasscheibe am Wartehäuschen ist zerbrochen. Scherben liegen auf dem Boden.',
}

describe('report validation', () => {
  test('should reject empty and whitespace-only entries', () => {
    expect(validateReport({ category: '', location: '   ', description: '\n    ' }))
      .toEqual({
        category: expect.any(String),
        location: expect.any(String),
        description: expect.any(String),
      })
  })

  test('should reject too little detail and excessive input but accept the reference case', () => {
    const tooShort = validateReport({ ...reference, location: 'MA', description: 'Glas' })
    expect(tooShort.location).toBeTruthy()
    expect(tooShort.description).toBeTruthy()
    expect(validateReport({ ...reference, location: 'x'.repeat(161) }).location).toBeTruthy()
    expect(validateReport({ ...reference, description: 'x'.repeat(2001) }).description).toBeTruthy()
    // @ts-expect-error Exercise validation of untrusted input outside the category union.
    expect(validateReport({ ...reference, category: 'invented' }).category).toBeTruthy()
    expect(validateReport(reference)).toEqual({})
  })
})

describe('reporting route', () => {
  test('should resolve the verified route from category and location before a description exists', () => {
    const route = resolveReportingRoute({ category: 'stop', location: 'Waldhof Nord' })
    expect(route.kind).toBe('official-contact')
    expect(route).toHaveProperty('contact.url', 'https://www.rnv-online.de/unternehmen/kontakt/schreiben-sie-uns/')
  })

  test('should keep an unknown location open before a description exists', () => {
    const route = resolveReportingRoute({ category: 'stop', location: 'Paradeplatz' })
    expect(route.kind).toBe('unconfirmed')
    expect(route).not.toHaveProperty('contact')
  })

  test('should resolve Waldhof Nord to the official rnv contact without certifying ownership', () => {
    for (const location of ['Waldhof Nord', ' WALDHOF-NORD ', 'Haltestelle Waldhof Nord, Mannheim']) {
      const route = resolveReportingRoute({ ...reference, location })
      expect(route.kind).toBe('official-contact')
      if (route.kind !== 'official-contact') throw new Error('Expected the official contact route')
      expect(new URL(route.contact.url).hostname).toBe('www.rnv-online.de')
      expect(route.explanation).toMatch(/nicht bestätigt/)
    }
  })

  test('should leave different locations, false partial matches and other categories unconfirmed', () => {
    for (const location of ['Paradeplatz', 'Nicht Waldhof Nord', 'Waldhof Nordstraße', 'Waldhof Nord Heidelberg']) {
      const route = resolveReportingRoute({ ...reference, location })
      expect(route.kind).toBe('unconfirmed')
      expect(route).not.toHaveProperty('contact')
    }
    expect(resolveReportingRoute({ ...reference, category: 'waste' }).kind).toBe('unconfirmed')
  })
})

describe('prepared report', () => {
  test('should include exactly the user details without mutating the draft', () => {
    const draft = Object.freeze({ ...reference, location: ' Waldhof Nord ', description: ' Scheibe kaputt.\nNeben der Sitzbank. ' })
    expect(createReportText(draft)).toBe('Schadensmeldung – Mannheim\n\nKategorie: Haltestelle\nOrt: Waldhof Nord\n\nBeschreibung:\nScheibe kaputt.\nNeben der Sitzbank.')
    expect(draft.location).toBe(' Waldhof Nord ')
  })
})

describe('clipboard', () => {
  test('should report success after writing the complete prepared text', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined)
    const text = createReportText(reference)
    await expect(copyReport(text, { writeText })).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledOnce()
    expect(writeText).toHaveBeenCalledWith(text)
  })

  test('should offer manual copying when clipboard access is missing or denied', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockRejectedValue(new Error('denied'))
    await expect(copyReport('Meldung', undefined)).resolves.toBe(false)
    await expect(copyReport('Meldung', { writeText })).resolves.toBe(false)
  })
})
