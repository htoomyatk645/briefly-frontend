import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const LIBRARY_SCROLL_KEY = 'briefly-library-scroll-y'
const SHOW_PROFILE_FROM_LIBRARY_KEY = 'briefly-show-profile-from-library'
const SHOW_PROFILE_RETURN_KEY = 'briefly-show-profile-return'

function setShowProfileReturn(path: string) {
  sessionStorage.setItem(SHOW_PROFILE_RETURN_KEY, path)
}

export function markShowProfileOpenedFromLibrary() {
  sessionStorage.setItem(SHOW_PROFILE_FROM_LIBRARY_KEY, '1')
  setShowProfileReturn('/library')
}

export function markShowProfileOpenedFromFeed() {
  sessionStorage.removeItem(SHOW_PROFILE_FROM_LIBRARY_KEY)
  setShowProfileReturn('/feed')
}

export function useShowProfileBack() {
  const navigate = useNavigate()

  return useCallback(() => {
    const returnTo = sessionStorage.getItem(SHOW_PROFILE_RETURN_KEY)
    const fromLibrary = sessionStorage.getItem(SHOW_PROFILE_FROM_LIBRARY_KEY) === '1'
    sessionStorage.removeItem(SHOW_PROFILE_RETURN_KEY)
    sessionStorage.removeItem(SHOW_PROFILE_FROM_LIBRARY_KEY)

    if (fromLibrary && window.history.length > 1) {
      navigate(-1)
      return
    }

    if (returnTo) {
      navigate(returnTo)
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
