import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const HeartIcon = ({
  title,
  titleId,
  width = '1em',
  height = '1em',
  color = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
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
      d="M10.517 17.341c-.284.1-.75.1-1.034 0-2.417-.825-7.817-4.266-7.817-10.1 0-2.575 2.075-4.658 4.634-4.658 1.516 0 2.858.733 3.7 1.867a4.608 4.608 0 0 1 3.7-1.867c2.558 0 4.633 2.083 4.633 4.658 0 5.834-5.4 9.275-7.816 10.1Z"
    />
  </svg>
)

export default HeartIcon
