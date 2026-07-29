import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette from sahlogo.png
        'sah-green': '#1F7A6D',        // deep forest green (primary)
        'sah-gold': '#C4A361',         // warm gold (accent)
        'sah-cream': '#F5F0E8',        // warm cream/off-white
        'sah-charcoal': '#2A2A2A',     // dark charcoal
        'sah-light': '#FAFAF8',        // almost white
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '6rem',
      },
    },
  },
  plugins: [],
}
export default config
