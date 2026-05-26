import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react'

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  onVoiceCommit?: (transcript: string) => void
  inputRef?: RefObject<HTMLInputElement | null>
  className?: string
}

type SpeechRecognitionResultEvent = {
  results: ArrayLike<{ 0: { transcript: string } }>
}

type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  const win = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null
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
  onVoiceCommit,
  inputRef,
  className = '',
}: SearchInputProps) {
  const inputId = useId()
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const transcriptRef = useRef('')
  const [isListening, setIsListening] = useState(false)

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setIsListening(false)
  }, [])

  useEffect(() => () => {
    recognitionRef.current?.abort()
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit?.()
    }
  }

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening()
      return
    }

    const Ctor = getSpeechRecognitionCtor()
    if (!Ctor) return

    const recognition = new Ctor()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    transcriptRef.current = ''

    recognition.onresult = (event) => {
      const parts: string[] = []
      for (let i = 0; i < event.results.length; i += 1) {
        parts.push(event.results[i][0].transcript)
      }
      transcriptRef.current = parts.join(' ').trim()
    }

    recognition.onerror = () => {
      stopListening()
    }

    recognition.onend = () => {
      setIsListening(false)
      recognitionRef.current = null
      const transcript = transcriptRef.current
      if (transcript) {
        onChange(transcript)
        onVoiceCommit?.(transcript)
      }
    }

    recognitionRef.current = recognition
    setIsListening(true)
    recognition.start()
  }, [isListening, onChange, onVoiceCommit, stopListening])

  return (
    <div className={`search-input-sticky${className ? ` ${className}` : ''}`}>
      <label htmlFor={inputId} className="search-input-sticky__label">
        Search clips
      </label>
      <div className={`search-input${isListening ? ' search-input--listening' : ''}`}>
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
          aria-label={isListening ? 'Stop voice search' : 'Search with voice'}
          aria-pressed={isListening}
          onClick={handleMicClick}
        >
          <MicIcon />
        </button>
      </div>
    </div>
  )
}
