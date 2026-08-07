import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Single accent family — gold. Everything else is a tinted warm neutral.
        'sah-gold': '#C4A361',
        'sah-gold-soft': '#DCC08A',
        'sah-gold-deep': '#9C7F45',
        'sah-cream': '#F5F0E8',
        'sah-charcoal': '#2A2A2A',
        'sah-light': '#FAFAF8',
        'sah-earth': '#141410',
        'sah-ink': '#0C0C09',
        // Kept for the admin area which still references it. Not used in marketing.
        'sah-green': '#1F7A6D',
      },
      fontFamily: {
        body: 'var(--font-body)',
        display: 'var(--font-display)',
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: '6rem',
      },
      borderRadius: {
        // Softer on containers, tighter on the elements nested inside them.
        card: '1.25rem',
        panel: '1.75rem',
      },
      boxShadow: {
        // Shadows carry the warm hue of the page instead of neutral black.
        lift: '0 1px 2px rgba(42,32,12,0.04), 0 12px 32px -12px rgba(42,32,12,0.16)',
        'lift-lg': '0 2px 4px rgba(42,32,12,0.05), 0 32px 64px -24px rgba(42,32,12,0.28)',
        gold: '0 8px 32px -12px rgba(196,163,97,0.55)',
        // Edge refraction for glass surfaces: bright top inner edge, dark bottom.
        glass:
          'inset 0 1px 0 0 rgba(255,255,255,0.55), inset 0 -1px 0 0 rgba(42,32,12,0.06), 0 16px 40px -20px rgba(42,32,12,0.25)',
        'glass-dark':
          'inset 0 1px 0 0 rgba(255,255,255,0.14), inset 0 -1px 0 0 rgba(0,0,0,0.35), 0 24px 60px -28px rgba(0,0,0,0.8)',
      },
      transitionTimingFunction: {
        // The built-in CSS easings are too weak; these have the punch.
        'out-expo': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-expo': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        shimmer: 'shimmer 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
        'scroll-hint': 'scroll-hint 2s cubic-bezier(0.23, 1, 0.32, 1) infinite',
      },
      zIndex: {
        base: '0',
        raised: '10',
        sticky: '20',
        overlay: '30',
        header: '40',
        modal: '50',
      },
    },
  },
  plugins: [],
}
export default config
