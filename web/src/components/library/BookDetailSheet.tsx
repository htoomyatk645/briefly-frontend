import { BottomSheet, useBodyScrollLock } from '../feed/player/BottomSheet'
import type { MentionedBook } from './libraryReadingData'

export type BookDetailSheetProps = {
  book: MentionedBook | null
  open: boolean
  onClose: () => void
  onHeardInEpisode: () => void
}

export function BookDetailSheet({ book, open, onClose, onHeardInEpisode }: BookDetailSheetProps) {
  useBodyScrollLock(open)

  return (
    <BottomSheet open={open} title={book?.title ?? 'Book'} onClose={onClose}>
      {book ? (
        <div className="reading-detail-sheet">
          <button type="button" className="reading-detail-sheet__heard" onClick={onHeardInEpisode}>
            Heard in {book.episodeTitle}
          </button>

          <div className="reading-detail-sheet__book-media">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt="" className="reading-detail-sheet__book-cover" />
            ) : (
              <div className="reading-detail-sheet__book-cover reading-detail-sheet__book-cover--placeholder" />
            )}
          </div>

          <p className="reading-detail-sheet__author">{book.author}</p>

          {book.description ? (
            <p className="reading-detail-sheet__description">{book.description}</p>
          ) : null}

          <a
            href={book.bookshopSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reading-detail-sheet__cta"
          >
            Find this book
          </a>
        </div>
      ) : null}
    </BottomSheet>
  )
}
