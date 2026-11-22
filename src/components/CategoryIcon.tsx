import type { Category } from '../report'

export function CategoryIcon({ category }: { category: Category }) {
  const paths = {
    stop: <><path d="M3 8h18L17 4H7L3 8Z" /><path d="M5 8v12m14-12v12M8 15h8M9 15v5m6-5v5" /></>,
    street: <><path d="m7 3-3 18m13-18 3 18M12 3v3m0 5v3m0 5v2" /></>,
    waste: <><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" /></>,
    other: <><circle cx="12" cy="12" r="9" /><path d="M7 12h.01M12 12h.01M17 12h.01" /></>,
  }

  return (
    <svg className="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[category]}
    </svg>
  )
}
