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
  test('empty and whitespace-only entries cannot prepare a report', () => {
    expect(validateReport({ category: '', location: '   ', description: '\n    ' }))
      .toEqual({
        category: expect.any(String),
        location: expect.any(String),
        description: expect.any(String),
      })
  })

  test('rejects too little detail and excessive input, but accepts the reference case', () => {
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
  test('Waldhof Nord resolves to the official rnv contact without certifying ownership', () => {
    for (const location of ['Waldhof Nord', ' WALDHOF-NORD ', 'Haltestelle Waldhof Nord, Mannheim']) {
      const route = resolveReportingRoute({ ...reference, location })
      expect(route.kind).toBe('official-contact')
      if (route.kind !== 'official-contact') throw new Error('Expected the official contact route')
      expect(new URL(route.contact.url).hostname).toBe('www.rnv-online.de')
      expect(route.explanation).toMatch(/nicht bestätigt/)
    }
  })

  test('different locations, false partial matches and other categories stay unconfirmed', () => {
    for (const location of ['Paradeplatz', 'Nicht Waldhof Nord', 'Waldhof Nordstraße', 'Waldhof Nord Heidelberg']) {
      const route = resolveReportingRoute({ ...reference, location })
      expect(route.kind).toBe('unconfirmed')
      expect(route).not.toHaveProperty('contact')
    }
    expect(resolveReportingRoute({ ...reference, category: 'waste' }).kind).toBe('unconfirmed')
  })
})

describe('prepared report', () => {
  test('includes exactly the user details and does not mutate the draft', () => {
    const draft = Object.freeze({ ...reference, location: ' Waldhof Nord ', description: ' Scheibe kaputt.\nNeben der Sitzbank. ' })
    expect(createReportText(draft)).toBe('Schadensmeldung – Mannheim\n\nKategorie: Haltestelle\nOrt: Waldhof Nord\n\nBeschreibung:\nScheibe kaputt.\nNeben der Sitzbank.')
    expect(draft.location).toBe(' Waldhof Nord ')
  })
})

describe('clipboard', () => {
  test('success means the complete prepared text was written', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined)
    const text = createReportText(reference)
    await expect(copyReport(text, { writeText })).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledOnce()
    expect(writeText).toHaveBeenCalledWith(text)
  })

  test('missing or denied access offers manual copying rather than false success', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockRejectedValue(new Error('denied'))
    await expect(copyReport('Meldung', undefined)).resolves.toBe(false)
    await expect(copyReport('Meldung', { writeText })).resolves.toBe(false)
  })
})
