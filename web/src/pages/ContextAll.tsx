import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MentionedContext from '../components/library/MentionedContext'
import '../components/library/mentionedContext.css'

export default function ContextAll() {
  const navigate = useNavigate()
  const backRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="context-all">
      <button
        ref={backRef}
        type="button"
        className="context-all__back"
        onClick={() => navigate('/library')}
        aria-label="Back to Library"
      >
        Back to Library
      </button>

      <header>
        <h1 className="context-all__title">Context</h1>
        <p className="context-all__subtitle">
          Show background, speakers, and references pulled from episodes you have heard.
        </p>
      </header>

      <MentionedContext layout="grid" showSectionHead={false} />
    </div>
  )
}
