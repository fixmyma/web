export const categories = [
  { id: 'stop', label: 'Haltestelle' },
  { id: 'street', label: 'Straße & Gehweg' },
  { id: 'waste', label: 'Müll' },
  { id: 'other', label: 'Sonstiges' },
] as const

export type Category = (typeof categories)[number]['id']
export type ReportDraft = { category: Category | ''; location: string; description: string }
export type ReportErrors = Partial<Record<keyof ReportDraft, string>>

export function validateReport(draft: ReportDraft): ReportErrors {
  const errors: ReportErrors = {}
  if (!categories.some((category) => category.id === draft.category)) {
    errors.category = 'Bitte wähle eine Kategorie.'
  }
  if (draft.location.trim().length < 3) {
    errors.location = 'Bitte gib einen Ort mit mindestens 3 Zeichen an.'
  } else if (draft.location.length > 160) {
    errors.location = 'Bitte kürze den Ort auf höchstens 160 Zeichen.'
  }
  if (draft.description.trim().length < 10) {
    errors.description = 'Bitte beschreibe den Schaden mit mindestens 10 Zeichen.'
  } else if (draft.description.length > 2000) {
    errors.description = 'Bitte kürze die Beschreibung auf höchstens 2.000 Zeichen.'
  }
  return errors
}
