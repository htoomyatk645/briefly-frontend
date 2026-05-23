import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const getSystemTheme = (): Theme =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getSystemTheme)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const syncTheme = () => {
      const nextTheme = media.matches ? 'dark' : 'light'
      setTheme(nextTheme)
      applyTheme(nextTheme)
    }

    syncTheme()
    media.addEventListener('change', syncTheme)

    return () => media.removeEventListener('change', syncTheme)
  }, [])

  const value = useMemo(() => ({ theme }), [theme])

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
