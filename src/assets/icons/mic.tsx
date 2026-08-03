import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const SvgComponent = ({
  title,
  titleId,
  width = '1em',
  height = '1em',
  color = '#0F053F',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    focusable="false"
    aria-labelledby={titleId}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 12.917a3.332 3.332 0 0 0 3.333-3.333V5a3.332 3.332 0 1 0-6.666 0v4.584A3.332 3.332 0 0 0 10 12.917Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.625 8.042v1.417A6.38 6.38 0 0 0 10 15.834a6.38 6.38 0 0 0 6.375-6.375V8.042"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.842 5.359a3.356 3.356 0 0 1 2.316 0M9.333 7.125c.442-.117.9-.117 1.342 0M10 15.833v2.5"
    />
  </svg>
)

export default SvgComponent
