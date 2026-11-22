// Compact vector rendition of the four-square mark in docs/fixmyma-web-banner.webp.
export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <g transform="translate(3 3) rotate(-9 24 24)">
        <rect x="2" y="2" width="19" height="19" rx="4" fill="currentColor" />
        <rect x="25" y="2" width="19" height="19" rx="4" fill="currentColor" />
        <rect x="2" y="25" width="19" height="19" rx="4" fill="currentColor" />
        <path d="M29 25h11a4 4 0 0 1 4 4v11a4 4 0 0 1-2 3.46L44 49l-8-5h-7a4 4 0 0 1-4-4V29a4 4 0 0 1 4-4Z" fill="var(--lime)" />
      </g>
    </svg>
  )
}
