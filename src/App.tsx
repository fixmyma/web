import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { categories, createReportText, validateReport } from './report'
import type { ReportDraft, ReportErrors } from './report'
import { copyReport } from './clipboard'
import { resolveReportingRoute } from './routing'
import './App.css'

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

  useEffect(() => {
    headingRef.current?.focus()
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
        <span className="wordmark">FixMyMA</span>
        <span className="city">Mannheim</span>
      </header>
      <main id="main">
        <h1 ref={headingRef} tabIndex={-1}>{preview ? 'Meldung prüfen' : 'Schaden melden'}</h1>
        {preview ? (
          <div className="preview">
            <div className="field">
              <h2 id="report-title">Dein Meldetext</h2>
              <p className="hint" id="report-hint">Prüfe Ort und Beschreibung, bevor du die Meldung weitergibst.</p>
              <pre ref={textRef} id="report-text" className="report-text" tabIndex={0} role="region"
                aria-labelledby="report-title" aria-describedby="report-hint">{reportText}</pre>
            </div>
            <section className="route" aria-labelledby="route-title">
              <h2 id="route-title">{route.kind === 'official-contact' ? 'Meldeweg: rnv' : 'Meldeweg noch unklar'}</h2>
              <p>{route.explanation}</p>
              {route.kind === 'official-contact' && (
                <>
                  <p>Kopiere den Text und füge ihn im rnv-Kontaktformular ein. Dort wählst du dein Anliegen und sendest die Meldung selbst ab.</p>
                  <details className="source-details">
                    <summary>Quelle zum Meldeweg</summary>
                    <p>{route.contact.scope}</p>
                    <p className="hint">
                      <a href={route.contact.url} target="_blank" rel="noreferrer">{route.contact.sourceTitle} (neuer Tab)</a>
                      {' · geprüft am '}{new Date(`${route.contact.verifiedOn}T12:00:00Z`).toLocaleDateString('de-DE')}
                    </p>
                  </details>
                </>
              )}
            </section>
            <div className="actions">
              <button className="primary" type="button" onClick={copy} disabled={copyState === 'copying'}>
                {copyState === 'copying' ? 'Wird kopiert …' : 'Meldetext kopieren'}
              </button>
              <p className="copy-status" role="status" aria-live="polite">
                {copyState === 'copied' && 'Meldetext kopiert. Du kannst ihn jetzt selbst weitergeben. Es wurde nichts versendet.'}
                {copyState === 'manual' && 'Automatisches Kopieren ist nicht möglich. Bitte markiere und kopiere den Meldetext manuell.'}
              </p>
              {route.kind === 'official-contact' && (
                <a className="secondary" href={route.contact.url} target="_blank" rel="noreferrer">
                  rnv-Kontaktformular öffnen (neuer Tab)
                </a>
              )}
              <button className="text-button" type="button" onClick={() => setPreview(false)}>Angaben bearbeiten</button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={submit} noValidate>
            {Object.values(errors).some(Boolean) && (
              <p className="error error-summary" role="alert">Bitte ergänze die markierten Angaben.</p>
            )}
            <fieldset aria-describedby={errors.category ? 'category-error' : undefined}>
              <legend>Kategorie</legend>
              <div className="categories">
                {categories.map((category) => (
                  <label className="category" key={category.id}>
                    <input type="radio" name="category" value={category.id}
                      checked={draft.category === category.id}
                      aria-invalid={Boolean(errors.category)} required
                      aria-describedby={errors.category ? 'category-error' : undefined}
                      onChange={() => update('category', category.id)} />
                    <span>{category.label}</span>
                  </label>
                ))}
              </div>
              {errors.category && <p className="error" id="category-error">{errors.category}</p>}
            </fieldset>

            <div className="field">
              <label htmlFor="location">Ort</label>
              <p className="hint" id="location-hint">Haltestelle oder Straße mit Hausnummer in Mannheim</p>
              <input id="location" name="location" type="text" required maxLength={160}
                autoComplete="off" placeholder="Zum Beispiel: Waldhof Nord"
                value={draft.location} onChange={(event) => update('location', event.target.value)}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={`location-hint${errors.location ? ' location-error' : ''}`} />
              {errors.location && <p className="error" id="location-error">{errors.location}</p>}
            </div>

            <div className="field">
              <label htmlFor="description">Beschreibung</label>
              <p className="hint" id="description-hint">Was ist kaputt? Wo genau ist der Schaden?</p>
              <textarea id="description" name="description" required rows={5} maxLength={2000}
                placeholder="Zum Beispiel: Glasscheibe am Wartehäuschen zerbrochen."
                value={draft.description} onChange={(event) => update('description', event.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={`description-hint description-count${errors.description ? ' description-error' : ''}`} />
              <p className="hint character-count" id="description-count">{draft.description.length.toLocaleString('de-DE')} / 2.000 Zeichen</p>
              {errors.description && <p className="error" id="description-error">{errors.description}</p>}
            </div>

            <div className="actions">
              <button className="primary" type="submit">Meldung vorbereiten</button>
              <p className="hint">Du prüfst deine Angaben vor der Weitergabe.</p>
            </div>
          </form>
        )}
        <footer>FixMyMA bereitet deine Meldung vor. Du versendest sie selbst.</footer>
      </main>
    </>
  )
}

export default App
