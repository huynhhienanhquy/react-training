import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const AddIcon = ({
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
      d="M5 10h10M10 15V5"
    />
  </svg>
)

export default AddIcon
