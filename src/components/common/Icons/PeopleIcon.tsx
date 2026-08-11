import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const PeopleIcon = ({
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
      strokeWidth={1.5}
      d="M12 4.773a.404.404 0 0 0-.127 0 1.716 1.716 0 0 1-1.653-1.72A1.72 1.72 0 1 1 12 4.773ZM11.313 9.626c.914.154 1.92-.006 2.627-.48.94-.626.94-1.653 0-2.28-.713-.473-1.733-.633-2.647-.473M3.98 4.773a.403.403 0 0 1 .127 0 1.716 1.716 0 0 0 1.653-1.72 1.72 1.72 0 1 0-1.78 1.72ZM4.667 9.626c-.914.154-1.92-.006-2.627-.48-.94-.626-.94-1.653 0-2.28.713-.473 1.733-.633 2.647-.473M8 9.753a.403.403 0 0 0-.127 0 1.716 1.716 0 0 1-1.653-1.72 1.72 1.72 0 1 1 3.44 0A1.721 1.721 0 0 1 8 9.753ZM6.06 11.853c-.94.627-.94 1.654 0 2.28 1.067.714 2.813.714 3.88 0 .94-.626.94-1.653 0-2.28-1.06-.706-2.813-.706-3.88 0Z"
    />
  </svg>
)

export default PeopleIcon
