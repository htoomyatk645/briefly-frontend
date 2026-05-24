import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'
export type ThemePreference = 'system' | Theme

type ThemeContextValue = {
  theme: Theme
  preference: ThemePreference
  followsSystem: boolean
  toggleTheme: () => void
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
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme)
  const [preference, setPreference] = useState<ThemePreference>('system')

  const theme = preference === 'system' ? systemTheme : preference
  const followsSystem = preference === 'system'

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const syncSystemTheme = () => {
      setSystemTheme(media.matches ? 'dark' : 'light')
    }

    syncSystemTheme()
    media.addEventListener('change', syncSystemTheme)

    return () => media.removeEventListener('change', syncSystemTheme)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      const resolved =
        prev === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : prev
      return resolved === 'dark' ? 'light' : 'dark'
    })
  }, [])

  const value = useMemo(
    () => ({
      theme,
      preference,
      followsSystem,
      toggleTheme,
    }),
    [theme, preference, followsSystem, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
