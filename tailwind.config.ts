import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'main-linear': 'linear-gradient(266deg, #FF5656 2.28%, #FF8181 112.03%)',
      },
    },
    colors: {
      gray: {
        white: '#fff',
        black: '#000',
        50: '#f9fafb',
        100: '#f2f4f6',
        200: '#e5e8eb',
        300: '#d1d6db',
        400: '#b0b8c1',
        500: '#8b95a1',
        600: '#6b7684',
        700: '#4e5968',
        800: '#333d4b',
        900: '#191f28',
      },
      brand: {
        50: '#fff3e0',
        100: '#ffe0b3',
        200: '#ffcc80',
        300: '#ffb84d',
        400: '#ffa31a',
        500: '#ff6600',
        600: '#e65c00',
        700: '#cc5200',
        800: '#b34700',
        900: '#993d00',
      },
      supplementary: {
        blue: {
          light: '#e6f2ff',
          deep: '#0052cc',
        },
        red: {
          light: '#ffe6e6',
          deep: '#cc0000',
        },
      }
    },
    fontSize: {
      'l-t-emph': ['32px', { lineHeight: '1.38', fontWeight: 'bold' }],
      'l-t-r': ['32px', { lineHeight: '1.38', fontWeight: 'normal' }],
      't-1-emph': ['26px', { lineHeight: '1.23', fontWeight: 'bold' }],
      't-1-r': ['26px', { lineHeight: '1.38', fontWeight: '500' }],
      't-2-emph': ['23px', { lineHeight: '1.39', fontWeight: 'bold' }],
      't-2-r': ['23px', { lineHeight: '1.39', fontWeight: '500' }],
      't-3-emph': ['20px', { lineHeight: '1.4', fontWeight: 'bold' }],
      't-3-r': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
      'b-sb': ['17px', { lineHeight: '1.41', fontWeight: '600' }],
      'b-m': ['17px', { lineHeight: '1.41', fontWeight: '500' }],
      'b-r': ['17px', { lineHeight: '1.41', fontWeight: 'normal' }],
      'st-emph': ['14px', { lineHeight: '1.43', fontWeight: '600' }],
      'st-r': ['14px', { lineHeight: '1.43', fontWeight: '500' }],
      'fn-emph': ['11px', { lineHeight: '1.45', fontWeight: '600' }],
      'fn-r': ['11px', { lineHeight: '1.45', fontWeight: 'normal' }],
    },
  },
  plugins: [],
} satisfies Config

export default config