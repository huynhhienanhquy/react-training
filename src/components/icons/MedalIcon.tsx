import type { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  width?: number | string
  height?: number | string
  color?: string
}

const MedalIcon = ({
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
      strokeWidth={1.5}
      d="M12.667 6c0 .966-.287 1.853-.78 2.593A4.657 4.657 0 0 1 8.7 10.606c-.227.04-.46.06-.7.06-.24 0-.473-.02-.7-.06a4.657 4.657 0 0 1-3.187-2.013A4.645 4.645 0 0 1 3.333 6 4.663 4.663 0 0 1 8 1.333 4.663 4.663 0 0 1 12.667 6Z"
    />

    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.167 12.313-1.1.26a.654.654 0 0 0-.494.493l-.233.98a.667.667 0 0 1-1.16.274L8 10.666l-3.18 3.66a.667.667 0 0 1-1.16-.273l-.233-.98a.664.664 0 0 0-.494-.493l-1.1-.26a.669.669 0 0 1-.32-1.12l2.6-2.6A4.657 4.657 0 0 0 7.3 10.613c.227.04.46.06.7.06.24 0 .473-.02.7-.06A4.657 4.657 0 0 0 11.887 8.6l2.6 2.6c.366.36.186.993-.32 1.113ZM8.387 3.987l.393.787a.483.483 0 0 0 .32.233l.713.12c.454.073.56.407.234.733l-.554.554a.472.472 0 0 0-.113.406l.16.687c.127.54-.16.753-.64.467l-.667-.394a.468.468 0 0 0-.44 0l-.666.394c-.48.28-.767.073-.64-.467l.16-.687a.5.5 0 0 0-.114-.406L5.98 5.86c-.327-.326-.22-.653.233-.733l.714-.12c.12-.02.26-.127.313-.233l.393-.787c.194-.427.54-.427.754 0Z"
    />
  </svg>
)

export default MedalIcon
