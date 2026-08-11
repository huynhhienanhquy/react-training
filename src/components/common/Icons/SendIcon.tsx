import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const SendIcon = ({
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
      d="m6.167 5.267 7.075-2.359c3.175-1.058 4.9.675 3.85 3.85l-2.359 7.076c-1.583 4.758-4.183 4.758-5.766 0l-.7-2.1-2.1-.7c-4.759-1.584-4.759-4.176 0-5.767ZM8.425 11.376l2.983-2.992"
    />
  </svg>
)

export default SendIcon
