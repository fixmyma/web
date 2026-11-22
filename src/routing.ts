import { reportingContacts } from './contacts.ts'
import type { ReportDraft } from './report.ts'

// Bounded to the verified reference case, without implying asset ownership.
const waldhofNordNames = new Set([
  'waldhof nord',
  'haltestelle waldhof nord',
  'waldhof nord mannheim',
  'mannheim waldhof nord',
  'haltestelle waldhof nord mannheim',
])

export function resolveReportingRoute(draft: ReportDraft) {
  const location = draft.location.toLocaleLowerCase('de-DE')
    .replace(/[,–—-]/g, ' ').replace(/\s+/g, ' ').trim()
  if (draft.category === 'stop' && waldhofNordNames.has(location)) {
    return {
      kind: 'official-contact' as const,
      contact: reportingContacts.rnv,
      explanation: 'Die Wartungszuständigkeit für die konkrete Glasscheibe ist nicht bestätigt.',
    }
  }
  return {
    kind: 'unconfirmed' as const,
    explanation: 'Für diesen Ort und diese Kategorie ist noch kein geprüfter Meldeweg hinterlegt.',
  }
}
