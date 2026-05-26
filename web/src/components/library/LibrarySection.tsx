import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type LibrarySectionProps = {
  id: string
  title: string
  subtitle?: string
  seeAllHref?: string
  seeAllLabel?: string
  children: ReactNode
  className?: string
}

export function LibrarySection({
  id,
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = 'See all',
  children,
  className = '',
}: LibrarySectionProps) {
  return (
    <section
      className={`library-section${className ? ` ${className}` : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="library-section__head">
        <div className="library-section__head-copy">
          <h2 id={`${id}-heading`} className="library-section__title">
            {title}
          </h2>
          {subtitle ? <p className="library-section__subtitle">{subtitle}</p> : null}
        </div>
        {seeAllHref ? (
          <Link
            to={seeAllHref}
            className="library-section__see-all"
            aria-label={`${seeAllLabel}: ${title}`}
          >
            {seeAllLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  )
}
