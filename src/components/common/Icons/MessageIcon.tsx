import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const MessageIcon = ({
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
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M11.987 7.193V9.86c0 .173-.007.34-.027.5-.153 1.8-1.213 2.693-3.167 2.693h-.266a.537.537 0 0 0-.427.214l-.8 1.066c-.353.474-.927.474-1.28 0l-.8-1.066a.615.615 0 0 0-.427-.214h-.266c-2.127 0-3.194-.526-3.194-3.193V7.193c0-1.953.9-3.013 2.694-3.166.16-.02.326-.027.5-.027h4.266c2.127 0 3.194 1.067 3.194 3.193Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M14.653 4.526v2.667c0 1.96-.9 3.013-2.693 3.167.02-.16.027-.327.027-.5V7.193C11.987 5.066 10.92 4 8.793 4H4.527c-.174 0-.34.006-.5.026.153-1.793 1.213-2.693 3.166-2.693h4.267c2.127 0 3.193 1.067 3.193 3.193Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.997 8.833h.006M6.664 8.833h.006M4.33 8.833h.006"
    />
  </svg>
)

export default MessageIcon
