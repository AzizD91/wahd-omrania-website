import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F28C38',
          dark: '#111111',
          light: '#F7F7F7'
        }
      },
      fontFamily: {
        arabic: ['"Noto Sans Arabic"', 'ui-sans-serif', 'system-ui'],
        latin: ['"Poppins"', 'ui-sans-serif', 'system-ui']
      },
      container: {
        center: true,
        padding: '1.5rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

export default config;
