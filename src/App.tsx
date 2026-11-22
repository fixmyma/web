import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { categories, createReportText, validateReport } from './report'
import type { ReportDraft, ReportErrors } from './report'
import { copyReport } from './clipboard'
import { resolveReportingRoute } from './routing'
import { BrandMark } from './components/BrandMark'
import { CategoryIcon } from './components/CategoryIcon'
import './App.css'

const categoryLabels = {
  stop: 'Haltestelle',
  street: 'Straße',
  waste: 'Müll',
  other: 'Sonstiges',
} as const

function App() {
  const [draft, setDraft] = useState<ReportDraft>({ category: '', location: '', description: '' })
  const [errors, setErrors] = useState<ReportErrors>({})
  const [preview, setPreview] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'manual'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLPreElement>(null)
  const route = resolveReportingRoute(draft)
  const reportText = createReportText(draft)
  const hasOfficialRoute = route.kind === 'official-contact'
  const inputErrors = validateReport(draft)
  const canCheckRoute = !inputErrors.category && !inputErrors.location

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [preview])

  function update<K extends keyof ReportDraft>(field: K, value: ReportDraft[K]) {
    const next = { ...draft, [field]: value }
    setDraft(next)
    if (errors[field]) setErrors({ ...errors, [field]: validateReport(next)[field] })
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateReport(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const field = Object.keys(nextErrors)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus()
      return
    }
    setCopyState('idle')
    setPreview(true)
  }

  async function copy() {
    setCopyState('copying')
    const copied = await copyReport(reportText, navigator.clipboard)
    setCopyState(copied ? 'copied' : 'manual')
    if (!copied) {
      textRef.current?.focus()
      if (textRef.current) window.getSelection()?.selectAllChildren(textRef.current)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt</a>
      <header className="site-header">
        <div className="brand"><BrandMark /><span className="wordmark">FixMyMA</span></div>
        <span className="city">Mannheim</span>
      </header>
      <main id="main" className={preview ? 'preview-page' : 'form-page'}>
        <h1 ref={headingRef} tabIndex={-1}>
          {preview ? (hasOfficialRoute ? 'Meldeweg: rnv' : 'Meldeweg noch offen') : 'Schaden melden'}
        </h1>
        {preview ? (
          <div className="preview">
            <section className="route" aria-label="Meldeweg und nächster Schritt">
              {hasOfficialRoute ? (
                <>
                  <p className="next-step">Kopiere deinen Text und füge ihn im rnv-Kontaktformular ein. Dort sendest du die Meldung selbst ab.</p>
                  <p className="route-note">{route.explanation}</p>
                </>
              ) : (
                <>
                  <p className="next-step">{route.explanation}</p>
                  <p className="route-note">Dein Meldetext ist trotzdem bereit: Kopiere ihn für die Weitergabe, sobald du die passende Meldestelle geklärt hast.</p>
                </>
              )}
              <div className="handoff-actions">
                <button className="primary" type="button" onClick={copy} disabled={copyState === 'copying'}>
                  {copyState === 'copying' ? 'Wird kopiert …' : 'Meldetext kopieren'}
                </button>
                {hasOfficialRoute && (
                  <a className="secondary" href={route.contact.url} target="_blank" rel="noreferrer"
                    aria-label="Kontaktformular öffnen (rnv, neuer Tab)">
                    Kontaktformular öffnen
                  </a>
                )}
              </div>
              <p className="copy-status" role="status" aria-live="polite">
                {copyState === 'copied' && 'Meldetext kopiert. Du kannst ihn jetzt selbst weitergeben.'}
                {copyState === 'manual' && 'Automatisches Kopieren ist nicht möglich. Der Text ist unten markiert. Kopiere ihn bitte manuell.'}
              </p>
              {hasOfficialRoute && <p className="external-note">Das Kontaktformular öffnet sich in einem neuen Tab.</p>}
            </section>

            <section className="report" aria-labelledby="report-title">
              <div className="report-heading">
                <h2 id="report-title">Dein Meldetext</h2>
                <button className="text-button" type="button" onClick={() => setPreview(false)}>Angaben bearbeiten</button>
              </div>
              <pre ref={textRef} id="report-text" className="report-text" tabIndex={0} role="region"
                aria-labelledby="report-title">{reportText}</pre>
            </section>

            {hasOfficialRoute && (
              <details className="source-details">
                <summary>Quelle zum Meldeweg</summary>
                <div className="source-content">
                  <p>{route.contact.scope}</p>
                  <p className="hint">
                    <a href={route.contact.url} target="_blank" rel="noreferrer">{route.contact.sourceTitle} (neuer Tab)</a>
                    <span className="source-date">Geprüft am {new Date(`${route.contact.verifiedOn}T12:00:00Z`).toLocaleDateString('de-DE')}</span>
                  </p>
                </div>
              </details>
            )}
          </div>
        ) : (
          <>
          <p className="pilot-scope">Pilot in Mannheim: Ein geprüfter Kontaktweg für die Haltestelle Waldhof Nord. Für weitere Orte kannst du einen Textentwurf vorbereiten.</p>
          <form ref={formRef} onSubmit={submit} noValidate>
            {Object.values(errors).some(Boolean) && (
              <p className="error error-summary" role="alert">Bitte ergänze die markierten Angaben.</p>
            )}
            <fieldset aria-describedby={errors.category ? 'category-error' : undefined}>
              <legend className="visually-hidden">Kategorie</legend>
              <div className="categories">
                {categories.map((category) => (
                  <label className="category" key={category.id}>
                    <input className="visually-hidden" type="radio" name="category" value={category.id}
                      checked={draft.category === category.id}
                      aria-invalid={Boolean(errors.category)} required
                      aria-describedby={errors.category ? 'category-error' : undefined}
                      onChange={() => update('category', category.id)} />
                    <CategoryIcon category={category.id} />
                    <span>{categoryLabels[category.id]}</span>
                    <span className="selection-mark" aria-hidden="true" />
                  </label>
                ))}
              </div>
              {errors.category && <p className="error" id="category-error">{errors.category}</p>}
            </fieldset>

            <div className="field">
              <label htmlFor="location">Ort</label>
              <input id="location" name="location" type="text" required maxLength={160}
                autoComplete="off" placeholder="Zum Beispiel: Waldhof Nord"
                value={draft.location} onChange={(event) => update('location', event.target.value)}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={`location-route${errors.location ? ' location-error' : ''}`} />
              {errors.location && <p className="error" id="location-error">{errors.location}</p>}
              <div className="route-notice" id="location-route" role="status" aria-live="polite" aria-atomic="true">
                {!canCheckRoute ? (
                  <p className="hint">Wähle eine Kategorie und gib den Ort ein, um den Meldeweg zu prüfen.</p>
                ) : hasOfficialRoute ? (
                  <>
                    <p className="route-notice-title">Geprüfter Meldeweg: rnv</p>
                    <p className="hint">{route.explanation}</p>
                    <a href={route.contact.url} target="_blank" rel="noreferrer"
                      aria-label="rnv-Kontaktformular öffnen (neuer Tab)">rnv-Kontaktformular öffnen</a>
                  </>
                ) : (
                  <>
                    <p className="route-notice-title">Meldeweg offen</p>
                    <p className="hint">Du kannst trotzdem einen Meldetext erstellen und kopieren.</p>
                  </>
                )}
              </div>
            </div>

            <div className="field">
              <div className="field-heading">
                <label htmlFor="description">Beschreibung</label>
                <span className="hint character-count" id="description-count"><span className="visually-hidden">Zeichen: </span>{draft.description.length.toLocaleString('de-DE')} / 2.000</span>
              </div>
              <textarea id="description" name="description" required rows={3} maxLength={2000}
                placeholder="Zum Beispiel: Glasscheibe am Wartehäuschen zerbrochen. Scherben liegen neben der Sitzbank."
                value={draft.description} onChange={(event) => update('description', event.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={`description-count${errors.description ? ' description-error' : ''}`} />
              {errors.description && <p className="error" id="description-error">{errors.description}</p>}
            </div>

            <div className="form-actions">
              <button className="primary" type="submit">Meldung vorbereiten</button>
              <p className="hint">Als Nächstes: Meldeweg und Vorschau</p>
            </div>
          </form>
          </>
        )}
        <footer>Du versendest die Meldung selbst. FixMyMA übermittelt keine Daten automatisch.</footer>
      </main>
    </>
  )
}

export default App
