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
      sans: ['"Helvetica Now Display"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      helvetica: ['"Helvetica Now Display"', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          dark: '#14153E',
          'dark-alt': '#0d1b3e',
          // Mở rộng màu thương hiệu cho Dark Mode
          light: '#F8FAFC',
        },
        surface: {
          DEFAULT: '#FAFBFD',
          sidebar: '#F8F9FB',
          section: '#EEF3FC',
          'section-alt': '#F4F7FE',
          'see-more': '#EEF3FD',
          active: '#EFEFEF',

          // Các biến màu tương ứng cho Dark Mode
          'dark-DEFAULT': '#0F172A',     // slate-900
          'dark-sidebar': '#0B0F19',     // slate-950
          'dark-section': '#1E293B',     // slate-800
          'dark-section-alt': '#1C2536', // slate-800/90
          'dark-active': '#334155',      // slate-700
        },
        success: {
          DEFAULT: '#22C55E',
          light: '#F2FBF5',
          'light-alt': '#EAF8F0',
          // Dark Mode
          'dark-light': '#052E16',
        },
        social: {
          bg: '#edf2fe',
          'dark-bg': '#1E293B',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
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
      },
      boxShadow: {
        auth: '0 15px 50px rgba(0,0,0,0.25)',
        'blue-btn': '0 4px 6px -1px rgba(29, 78, 216, 0.3)',
        search: '0 1px 2px 0 rgba(148, 163, 184, 0.5)',
        chat: '0 1px 3px 0 rgba(148, 163, 184, 0.6)',
        nav: '0 1px 2px 0 rgba(191, 219, 254, 0.5)',
        // Shadow dịu hơn cho Dark Mode
        'dark-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '3px',
      },
    },
  },
  plugins: [],
};
