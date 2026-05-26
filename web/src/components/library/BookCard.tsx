import type { MentionedBook } from './libraryReadingData'
import { ReadingMentionFooter } from './ReadingMentionFooter'

export type BookCardProps = {
  book: MentionedBook
  isPreviewOpen?: boolean
  onOpenDetail: (book: MentionedBook) => void
  onHearMention: (book: MentionedBook) => void
}

export default function BookCard({
  book,
  isPreviewOpen = false,
  onOpenDetail,
  onHearMention,
}: BookCardProps) {
  return (
    <article className={`book-card${isPreviewOpen ? ' book-card--preview-open' : ''}`}>
      <button
        type="button"
        className="book-card__hit"
        onClick={() => onOpenDetail(book)}
        aria-label={`View ${book.title} by ${book.author}`}
      >
        <div className="book-card__cover-wrap">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt="" className="book-card__cover" />
          ) : (
            <div className="book-card__cover book-card__cover--placeholder" aria-hidden />
          )}
        </div>
        <div className="book-card__copy">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
        </div>
      </button>
      <ReadingMentionFooter
        hostLabel={`Mentioned by ${book.hostFirstName}`}
        isPreviewOpen={isPreviewOpen}
        onHearMention={() => onHearMention(book)}
      />
    </article>
  )
}
