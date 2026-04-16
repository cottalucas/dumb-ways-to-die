/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#1A8A7D', dark: '#14706A', light: '#E6F5F3' },
        text: { primary: '#1E293B', secondary: '#64748B', muted: '#94A3B8' },
        surface: { DEFAULT: '#FAFAF8', card: '#FFFFFF', border: '#E8E5E0', divider: '#F1EDE8' },
        accent: { orange: '#E8913A', red: '#DC4F4F', green: '#3BA676' },
        ai: { bubble: '#F5F0EB' },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: { btn: '12px', card: '16px' },
      boxShadow: {
        card: '0 1px 3px rgba(30,41,59,0.06), 0 1px 2px rgba(30,41,59,0.04)',
        elevated: '0 4px 12px rgba(30,41,59,0.08)',
        tabbar: '0 -1px 4px rgba(30,41,59,0.06)',
      },
    },
  },
  plugins: [],
}
