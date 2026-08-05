import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sah-green': '#1F7A6D',
        'sah-gold': '#C4A361',
        'sah-cream': '#F5F0E8',
        'sah-charcoal': '#2A2A2A',
        'sah-light': '#FAFAF8',
        'sah-earth': '#141410',
      },
      fontFamily: {
        body: 'var(--font-body)',
        display: 'var(--font-display)',
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '6rem',
      },
    },
  },
  plugins: [],
}
export default config
