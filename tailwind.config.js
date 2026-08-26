/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#1E3A34',
        'forest': {
          DEFAULT: '#1E3A34',
          dark: '#142A25',
          darker: '#0E1D19',
          light: '#2B534B',
        },
        'teal': {
          DEFAULT: '#2D5A50',
          50: '#F2F7F5',
          100: '#DDEAE5',
          200: '#B8D3CA',
          300: '#8FB9AC',
          400: '#5F9B8B',
          500: '#2D5A50',
          600: '#244840',
          700: '#1E3A34',
          800: '#162C27',
          900: '#0F1E1B',
        },
        'sage': {
          DEFAULT: '#DDEAE5',
          light: '#EFF6F3',
          dark: '#B8D3CA',
        },
        'pastel': {
          sage: '#EEF5F2',
          peach: '#FDF1EB',
          gold: '#FDF7EA',
          sky: '#EBF5F8',
          purple: '#F5F0F8',
        },
        'page': '#F7F9F8',
        'surface': '#FFFFFF',
        'text-main': '#182321',
        'text-muted': '#66736F',
        'text-soft': '#95A4A0',
        'border-ui': '#E4EAE7',
        'border-light': '#F0F4F2',
      },
      borderRadius: {
        'card': '14px',
        'btn': '8px',
        'input': '8px',
        'modal': '16px',
        'pill': '9999px',
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(24, 35, 33, 0.05), 0 1px 2px -1px rgba(24, 35, 33, 0.05)',
        'card': '0 2px 6px -1px rgba(24, 35, 33, 0.06), 0 1px 4px -2px rgba(24, 35, 33, 0.04)',
        'elevated': '0 10px 25px -5px rgba(30, 58, 52, 0.08), 0 8px 10px -6px rgba(30, 58, 52, 0.04)',
        'dropdown': '0 12px 28px -4px rgba(24, 35, 33, 0.12), 0 4px 8px -2px rgba(24, 35, 33, 0.06)',
      },
    },
  },
  plugins: [],
}
