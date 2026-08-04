import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const SearchIcon = ({
  title,
  titleId,
  width = '1em',
  height = '1em',
  color = '#B1B1B1',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    focusable="false"
    aria-labelledby={titleId}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.333 13.333a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.62 13.793c.353 1.067 1.16 1.173 1.78.24.567-.853.193-1.553-.833-1.553-.76-.007-1.187.586-.947 1.313Z"
    />
  </svg>
)

export default SearchIcon
