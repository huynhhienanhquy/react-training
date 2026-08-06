import type { SVGProps } from 'react';

interface ArrowDownIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const ArrowDownIcon = ({
  title,
  titleId,
  width = '1em',
  height = '1em',
  color = 'currentColor',
  ...props
}: ArrowDownIconProps) => (
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
      d="m4 6 4 4 4-4"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export default ArrowDownIcon;
