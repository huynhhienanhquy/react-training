import type { SVGProps } from 'react';

type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'eye'
  | 'eye-off'
  | 'spinner';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export const Icon = ({ name, ...props }: IconProps) => {
  const icons = {
    'arrow-left': (
      <>
        <path d="M15 19l-7-7 7-7" />
      </>
    ),

    'arrow-right': (
      <>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </>
    ),

    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),

    'eye-off': (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ),

    spinner: (
      <>
        <path
          d="M12 2a10 10 0 1 0 10 10"
          strokeLinecap="round"
        />
      </>
    ),
  };

  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      {icons[name]}
    </svg>
  );
};
