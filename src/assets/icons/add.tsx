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
  color = '#fff',
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
      d="M5 10h10M10 15V5"
    />
  </svg>
)

export default SvgComponent
