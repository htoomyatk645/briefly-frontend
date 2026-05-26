/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_AUTOPLAY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
