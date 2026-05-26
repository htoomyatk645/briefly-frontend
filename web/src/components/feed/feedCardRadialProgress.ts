export const RADIAL_ART_PADDING_PX = 4
export const RADIAL_STROKE_WIDTH_PX = 2.5

export type RadialProgressMetrics = {
  svgSize: number
  radius: number
  circumference: number
  center: number
}

export function getRadialProgressMetrics(artSize: number): RadialProgressMetrics {
  const svgSize = artSize + RADIAL_ART_PADDING_PX * 2
  const radius = svgSize / 2 - RADIAL_STROKE_WIDTH_PX
  const circumference = 2 * Math.PI * radius

  return {
    svgSize,
    radius,
    circumference,
    center: svgSize / 2,
  }
}

export function shouldShowRadialProgress(progress: number): boolean {
  return progress > 0.01 && progress < 0.99
}

export function getStrokeDashoffset(circumference: number, progress: number): number {
  return circumference * (1 - progress)
}
