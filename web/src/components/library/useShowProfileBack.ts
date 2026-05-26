import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const LIBRARY_SCROLL_KEY = 'briefly-library-scroll-y'
const SHOW_PROFILE_FROM_LIBRARY_KEY = 'briefly-show-profile-from-library'

export function markShowProfileOpenedFromLibrary() {
  sessionStorage.setItem(SHOW_PROFILE_FROM_LIBRARY_KEY, '1')
}

export function useShowProfileBack() {
  const navigate = useNavigate()

  return useCallback(() => {
    const fromLibrary = sessionStorage.getItem(SHOW_PROFILE_FROM_LIBRARY_KEY) === '1'
    sessionStorage.removeItem(SHOW_PROFILE_FROM_LIBRARY_KEY)

    if (fromLibrary && window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/library')
  }, [navigate])
}

export function restoreLibraryScrollAfterBack(scrollRoot: HTMLElement | null) {
  if (!scrollRoot) return
  const saved = sessionStorage.getItem(LIBRARY_SCROLL_KEY)
  if (!saved) return
  requestAnimationFrame(() => {
    scrollRoot.scrollTop = Number.parseInt(saved, 10)
  })
}
