export type BrieflyLogoProps = {
  className?: string
}

export const BrieflyLogo = ({ className = 'welcome-logo' }: BrieflyLogoProps) => (
  <h1 className={className} aria-label="Briefly">
    Briefly
  </h1>
)
