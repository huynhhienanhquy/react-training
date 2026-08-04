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
  color = '#6B6B6B',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 15 16"
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
      d="M1.527 5.187v6.487c0 1.266.9 1.786 1.993 1.16l1.567-.894c.34-.193.906-.213 1.26-.033l3.5 1.753c.353.174.92.16 1.26-.033l2.886-1.653c.367-.214.674-.734.674-1.16V4.327c0-1.267-.9-1.787-1.994-1.16l-1.566.893c-.34.194-.907.214-1.26.034l-3.5-1.747c-.354-.173-.92-.16-1.26.033L2.2 4.034c-.373.213-.673.733-.673 1.153ZM5.707 2.667v8.667M10.487 4.413v8.92"
    />
  </svg>
)

export default SvgComponent
