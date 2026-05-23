import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

const syncSystemTheme = () => {
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}

syncSystemTheme()

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', syncSystemTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
