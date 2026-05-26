import { useId, type KeyboardEvent, type RefObject } from 'react'

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  inputRef?: RefObject<HTMLInputElement | null>
  className?: string
}

const MicIcon = () => (
  <svg className="search-input__mic-icon" viewBox="0 0 24 24" aria-hidden>
    <path
      d="M12 14.5a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5.5a3 3 0 0 0 3 3Z"
      fill="currentColor"
    />
    <path
      d="M6.5 11.25a.75.75 0 0 1 1.5 0 4.75 4.75 0 0 0 9.5 0 .75.75 0 0 1 1.5 0 6.25 6.25 0 0 1-5 6.12V19h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5H11v-1.63a6.25 6.25 0 0 1-4.5-6.12Z"
      fill="currentColor"
    />
  </svg>
)

export function SearchInput({
  value,
  onChange,
  onSubmit,
  inputRef,
  className = '',
}: SearchInputProps) {
  const inputId = useId()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit?.()
    }
  }

  return (
    <div className={`search-input-sticky${className ? ` ${className}` : ''}`}>
      <label htmlFor={inputId} className="search-input-sticky__label">
        Search clips
      </label>
      <div className="search-input">
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="search-input__field"
          placeholder="Search clips, shows, ideas..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <button
          type="button"
          className="search-input__mic"
          aria-label="Search with voice"
        >
          <MicIcon />
        </button>
      </div>
    </div>
  )
}
