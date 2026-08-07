/** @type {import('tailwindcss').Config} */

export default {
  // 1. Kích hoạt Dark Mode dựa theo class trên <html>
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
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
      },

      spacing: {
        17: '4.25rem',
        18: '4.5rem',
        22: '5.5rem',

        // Custom spacing
        80: '80px',
        100: '100px',
        120: '120px',
        125: '125px',
        150: '150px',
        160: '160px',
        200: '200px',
        280: '280px',
        300: '300px',
        370: '370px',
        400: '400px',
        460: '460px',
        480: '480px',
        540: '540px',
        580: '580px',
        680: '680px',
        980: '980px',
        1440: '1440px',
      },

      borderWidth: {
        3: '3px',
        10: '10px',
      },

      width: {
        45: '45%',
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
      },

      lineHeight: {
        '1.2': '1.2',
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


