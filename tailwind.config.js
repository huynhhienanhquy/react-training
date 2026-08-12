/** @type {import('tailwindcss').Config} */

export default {
  
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      desktop: '1440px',
    },
    fontFamily: {
      sans: [
        '"Helvetica Now Display"',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'sans-serif'
      ],
      helvetica: [
        '"Helvetica Now Display"',
        'sans-serif'
      ],
    },

    extend: {
      colors: {
        brand: {
          dark: '#14153E',
          'dark-alt': '#0d1b3e',
          light: '#F8FAFC',
        },

        surface: {
          DEFAULT: '#FAFBFD',
          card: '#FAFAFA',
          sidebar: '#F8F9FB',
          section: '#EEF3FC',
          'section-alt': '#F4F7FE',
          'see-more': '#EEF3FD',
          active: '#EFEFEF',

          'dark-DEFAULT': '#0F172A',
          'dark-sidebar': '#0B0F19',
          'dark-section': '#1E293B',
          'dark-section-alt': '#1C2536',
          'dark-active': '#334155',
        },

        success: {
          DEFAULT: '#22C55E',
          light: '#F2FBF5',
          'light-alt': '#EAF8F0',
          'dark-light': '#052E16',
        },

        social: {
          bg: '#edf2fe',
          'dark-bg': '#1E293B',
        },

        // Action / primary blue palette
        primary: {
          DEFAULT: '#3B62FF',
          hover: '#2A52EF',
          dark: '#1A47FF',
          'dark-hover': '#0936EF',
          strong: '#2563EB',
          light: '#EEF2FF',
          soft: '#EAF1FF',
        },

        // Neutral heading / text inks
        ink: {
          DEFAULT: '#101828',
          deep: '#0B0F2A',
          alt: '#0F0C3B',
        },

        hotel: {
          card: '#FAFAFA',
          'card-dark': '#334155',
          text: '#101828',
          muted: '#64748B',
          subtle: '#94A3B8',
          amenity: '#94A3B8',
          'tag-border': '#A7F3D0',
          'tag-bg': '#ECFDF5',
          'tag-text': '#059669',
          'tag-border-dark': '#065F46',
          'tag-bg-dark': '#022C22',
          'tag-text-dark': '#6EE7B7',
          'action-border': '#DBEAFE',
          'loading': '#2563EB',
          'error-bg': '#FEF2F2',
          'error-border': '#FEE2E2',
          'error-text': '#DC2626',
        },

        icon: {
          DEFAULT: '#6B6B6B',
          search: '#B1B1B1',
          strong: '#0F053F',
        },
      },

      spacing: {
        4.5: '18px',
        4.75: '19px',
        5.5: '22px',
        6.5: '26px',
        9.5: '38px',
        13: '52px',
        13.5: '54px',
        14.5: '58px',
        47.5: '190px',
        55: '220px',
        17: '4.25rem',
        18: '4.5rem',
        21: '84px',
        22: '5.5rem',
        26: '104px',
        27: '27px',
        28: '112px',
        29: '116px',
        62: '248px',
        43.25: '173px',

        // Custom spacing
        80: '80px',
        100: '100px',
        120: '120px',
        125: '125px',
        127: '127px',
        150: '150px',
        160: '160px',
        200: '200px',
        'hotel-image': '171px',
        'hotel-card': '202px',
        'hotel-action': '52px',
        204: '204px',
        280: '280px',
        295: '295px',
        300: '300px',
        330: '330px',
        370: '370px',
        379: '379px',
        400: '400px',
        460: '460px',
        480: '480px',
        506: '506px',
        540: '540px',
        684: '684px',
        976: '976px',
        580: '580px',
        680: '680px',
        980: '980px',
        1440: '1440px',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },

      backgroundImage: {
        'chat-thinking': 'conic-gradient(from 90deg at 50% 50%, #6ee7f9, #818cf8, #c084fc, #fb7185, #facc15, #6ee7b7, #6ee7f9)',
      },

      maxWidth: {
        drawer: '85vw',
        'auth-copy': '650px',
        'auth-copy-safe': 'calc(50% - 54px)',
      },

      inset: {
        'search-icon': 'calc(50% + 14px)',
        'dropdown': 'calc(100% + 6px)',
      },

      gridTemplateColumns: {
        'hotel-card': 'theme(spacing.hotel-image) minmax(0, 1fr) 174px',
        'fare-page': 'minmax(0, 2.05fr) minmax(320px, 1fr)',
        'flight-route': '190px 1fr',
        'flight-route-desktop': '152px 1fr',
      },

      borderWidth: {
        3: '3px',
        10: '10px',
      },

      width: {
        45: '45%',
        'auth-copy': '650px',
        'new-chat': '173px',
        'book-now': '106px',
        'chat-input': '908px',
        'recommendation-card': '892px',
        'select-hotel-card': '804px',
        'price-details': '394px',
        'action-btn': '131px',
      },

      height: {
        'chat-input': '201px',
        'recommendation-card': '195px',
        'select-hotel-card': '227px',
        'select-fare-card': '115px',
        'fare-card': '507px',
      },

      scale: {
        99: '0.99',
      },

      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        'xxs': ['11px', { lineHeight: '16px' }],
        'sm2': ['15px', { lineHeight: '22px' }],
        'display-sm': ['38px', { lineHeight: '46px' }],
        'display-md': ['44px', { lineHeight: '52px' }],
        'display-title': ['40px', { lineHeight: '48px' }],
        'auth-title': ['40px', { lineHeight: '48px' }],
      },

      borderRadius: {
        '4xl': '36px',
        '5xl': '42px',

        // Cards & auth panels
        card: '28px',
        auth: '32px',
        'auth-sm': '24px',
        'auth-inner': '26px',
        'auth-inner-sm': '18px',
        inherit: 'inherit',
      },

      lineHeight: {
        '1.2': '1.2',
        16: '64px',
      },

      boxShadow: {
        auth: '0 15px 50px rgba(0,0,0,0.25)',
        'blue-btn': '0 4px 6px -1px rgba(29, 78, 216, 0.3)',
        search: '0 1px 2px 0 rgba(148, 163, 184, 0.5)',
        chat: '0 1px 3px 0 rgba(148, 163, 184, 0.6)',
        nav: '0 1px 2px 0 rgba(191, 219, 254, 0.5)',

        'dark-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },

      backdropBlur: {
        xs: '3px',
      },
    },
  },

  plugins: [],
};


