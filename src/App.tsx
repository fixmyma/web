import { useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { categories, validateReport } from './report'
import type { ReportDraft, ReportErrors } from './report'
import './App.css'

function App() {
  const [draft, setDraft] = useState<ReportDraft>({ category: '', location: '', description: '' })
  const [errors, setErrors] = useState<ReportErrors>({})
  const [ready, setReady] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function update<K extends keyof ReportDraft>(field: K, value: ReportDraft[K]) {
    const next = { ...draft, [field]: value }
    setDraft(next)
    setReady(false)
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
    setReady(true)
  }

  return (
    <>
      <a className="skip-link" href="#main">Zum Formular</a>
      <header className="site-header">
        <span className="wordmark">FixMyMA</span>
        <span className="city">Mannheim</span>
      </header>
      <main id="main">
        <h1>Schaden melden</h1>
        <form ref={formRef} onSubmit={submit} noValidate>
          <fieldset aria-describedby={errors.category ? 'category-error' : undefined}>
            <legend>Kategorie</legend>
            <div className="categories">
              {categories.map((category) => (
                <label className="category" key={category.id}>
                  <input type="radio" name="category" value={category.id}
                    checked={draft.category === category.id}
                    aria-invalid={Boolean(errors.category)} required
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
              placeholder="Zum Beispiel: Die Glasscheibe am Wartehäuschen ist zerbrochen."
              value={draft.description} onChange={(event) => update('description', event.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={`description-hint${errors.description ? ' description-error' : ''}`} />
            {errors.description && <p className="error" id="description-error">{errors.description}</p>}
          </div>

          <div className="actions">
            <button className="primary" type="submit">Meldung vorbereiten</button>
            <p className="hint">Du prüfst deine Angaben vor der Weitergabe.</p>
          </div>
          <p role="status">{ready ? 'Deine Angaben sind vollständig.' : ''}</p>
        </form>
        <footer>FixMyMA bereitet deine Meldung vor. Du versendest sie selbst.</footer>
      </main>
    </>
  )
}

export default App
