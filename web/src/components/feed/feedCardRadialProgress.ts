export const RADIAL_ART_PADDING_PX = 4
export const RADIAL_STROKE_WIDTH_PX = 2.5
export const RADIAL_CORNER_RADIUS_PX = 8

export type SquareProgressMetrics = {
  svgWidth: number
  svgHeight: number
  path: string
  perimeter: number
}

export function getSquareProgressMetrics(
  artWidth: number,
  artHeight: number,
  cornerRadius = RADIAL_CORNER_RADIUS_PX,
): SquareProgressMetrics {
  const svgWidth = artWidth + RADIAL_ART_PADDING_PX * 2
  const svgHeight = artHeight + RADIAL_ART_PADDING_PX * 2
  const inset = RADIAL_STROKE_WIDTH_PX / 2
  const x = RADIAL_ART_PADDING_PX + inset
  const y = RADIAL_ART_PADDING_PX + inset
  const width = svgWidth - 2 * (RADIAL_ART_PADDING_PX + inset)
  const height = svgHeight - 2 * (RADIAL_ART_PADDING_PX + inset)
  const radius = Math.min(cornerRadius, width / 2, height / 2)
  const path = buildRoundedRectPathFromTopCenter(x, y, width, height, radius)
  const perimeter = 2 * (width - 2 * radius) + 2 * (height - 2 * radius) + 2 * Math.PI * radius

  return {
    svgWidth,
    svgHeight,
    path,
    perimeter,
  }
}

function buildRoundedRectPathFromTopCenter(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const midX = x + width / 2
  const right = x + width
  const bottom = y + height

  return [
    `M ${midX} ${y}`,
    `H ${right - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right} ${y + radius}`,
    `V ${bottom - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
    `H ${x + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x} ${bottom - radius}`,
    `V ${y + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`,
    `H ${midX}`,
  ].join(' ')
}

export function shouldShowRadialProgress(progress: number): boolean {
  return progress > 0.01 && progress < 0.99
}

export function getStrokeDashoffset(perimeter: number, progress: number): number {
  return perimeter * (1 - progress)
}
