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
      explanation: 'Die rnv nimmt Hinweise auf Schäden an Haltestellen entgegen. Wer die konkrete Glasscheibe wartet, ist hier nicht bestätigt.',
    }
  }
  return {
    kind: 'unconfirmed' as const,
    explanation: 'Für diese Kombination aus Kategorie und Ort ist noch kein verifizierter Meldeweg hinterlegt. Die Zuständigkeit ist unklar. Du kannst den Text kopieren und verwenden, sobald du die passende Meldestelle geklärt hast.',
  }
}
