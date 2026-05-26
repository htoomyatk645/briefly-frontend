import { useEffect, useId, useRef } from 'react'
import { BottomSheet, useBodyScrollLock } from '../feed/player/BottomSheet'
import { useMatchMinWidth } from './useMatchMinWidth'

export type TuneFeedResetConfirmProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function TuneFeedResetConfirm({ open, onClose, onConfirm }: TuneFeedResetConfirmProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isDesktop = useMatchMinWidth('(min-width: 1024px)')

  useBodyScrollLock(open && !isDesktop)

  useEffect(() => {
    if (!open || !isDesktop) return
    const dialog = dialogRef.current
    dialog?.showModal()
    const focusable = dialog?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea',
    )
    focusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDesktop, onClose, open])

  useEffect(() => {
    if (!open && isDesktop) {
      dialogRef.current?.close()
    }
  }, [isDesktop, open])

  const body = (
    <>
      <p className="tune-feed-reset-dialog__body">
        We&apos;ll forget the topic weights and un-mute everything. Your saves and
        followed shows are untouched.
      </p>
      <div className="tune-feed-reset-dialog__actions">
        <button type="button" className="tune-feed-reset-dialog__cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="tune-feed-reset-dialog__confirm" onClick={onConfirm}>
          Reset
        </button>
      </div>
    </>
  )

  if (!isDesktop) {
    return (
      <BottomSheet open={open} title="Reset everything?" onClose={onClose} variant="plain">
        <div className="tune-feed-reset-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <h2 id={titleId} className="tune-feed-reset-dialog__title">
            Reset everything?
          </h2>
          {body}
        </div>
      </BottomSheet>
    )
  }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className="tune-feed-reset-dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClose={onClose}
    >
      <h2 id={titleId} className="tune-feed-reset-dialog__title">
        Reset everything?
      </h2>
      {body}
    </dialog>
  )
}
