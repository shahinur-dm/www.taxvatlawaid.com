import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#F1F4F9',
          100: '#DCE3EE',
          200: '#B8C6DC',
          700: '#1D2F4D',
          800: '#16243B',
          900: '#101B2D',
          950: '#0A1220',
        },
        ivory: {
          50: '#FDFCF9',
          100: '#F7F5F0',
          200: '#EFECE4',
          300: '#E3DDD0',
        },
        champagne: {
          100: '#F6F0E4',
          200: '#EADEC5',
          300: '#D9C398',
          400: '#C9AE7A',
          500: '#B89A62',
          600: '#9A7D49',
          700: '#7D6337',
        },
        charcoal: {
          500: '#5A616E',
          600: '#424954',
          700: '#2E343E',
          800: '#252A32',
          900: '#1A1E24',
        },
        navy: {
          50: '#eef0fa',
          100: '#dce0f5',
          200: '#b8c1eb',
          600: '#2d3588',
          700: '#242b72',
          800: '#101B2D',
          900: '#0D1626',
          950: '#0A1220',
        },
        brandRed: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        brandGreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      fontFamily: {
        serif: [
          'var(--font-serif)',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
