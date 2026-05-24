/** sessionStorage key for mosaic → player shared-element handoff */
export const MOSAIC_LAYOUT_STORAGE_KEY = 'briefly-mosaic-layout-id'

/** localStorage key — set after first onboarding zoom pulse */
export const MOSAIC_ONBOARDED_KEY = 'briefly-mosaic-onboarded'

export function clearMosaicLayoutHandoff() {
  sessionStorage.removeItem(MOSAIC_LAYOUT_STORAGE_KEY)
}

export function setMosaicLayoutHandoff(mosaicItemId: string) {
  sessionStorage.setItem(MOSAIC_LAYOUT_STORAGE_KEY, `mosaic-${mosaicItemId}`)
}
