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
      d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M1.333 8.586V7.413A1.27 1.27 0 0 1 2.6 6.146c1.207 0 1.7-.853 1.093-1.9-.346-.6-.14-1.38.467-1.726l1.153-.66a1.113 1.113 0 0 1 1.52.4l.074.126c.6 1.047 1.586 1.047 2.193 0l.073-.126a1.113 1.113 0 0 1 1.52-.4l1.154.66c.606.346.813 1.126.466 1.726-.606 1.047-.113 1.9 1.094 1.9a1.27 1.27 0 0 1 1.266 1.267v1.173a1.27 1.27 0 0 1-1.266 1.267c-1.207 0-1.7.853-1.094 1.9.347.607.14 1.38-.466 1.727l-1.154.66a1.113 1.113 0 0 1-1.52-.4l-.073-.127c-.6-1.047-1.587-1.047-2.193 0l-.074.127a1.113 1.113 0 0 1-1.52.4l-1.153-.66a1.266 1.266 0 0 1-.467-1.727c.607-1.047.114-1.9-1.093-1.9a1.27 1.27 0 0 1-1.267-1.267Z"
    />
  </svg>
)

export default SvgComponent
