type SearchSparklineProps = {
  values: number[]
  className?: string
  width?: number
  height?: number
}

export function SearchSparkline({
  values,
  className = '',
  width = 72,
  height = 20,
}: SearchSparklineProps) {
  const samples = values.length > 0 ? values : [0]
  const max = Math.max(...samples, 0.01)
  const step = width / Math.max(samples.length - 1, 1)

  const points = samples
    .map((value, index) => {
      const x = index * step
      const y = height - (value / max) * (height - 2) - 1
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
    >
      <polyline
        className="search-sparkline__line"
        fill="none"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
