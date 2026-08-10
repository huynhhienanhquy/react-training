import type { SVGProps } from 'react';

const HotelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16M17 9h2a2 2 0 0 1 2 2v10M2 21h20" />
    <path d="M8 7h1M12 7h1M8 11h1M12 11h1M8 15h1M12 15h1M9 21v-2h3v2" />
  </svg>
);

export default HotelIcon;
