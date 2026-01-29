// Tailwind CSS v4 uses CSS-based configuration
// This file is kept for IDE support and legacy compatibility

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue - Trust · Technology · Institution
        primary: {
          DEFAULT: '#0B3C5D',
          50: '#E8F4FC',
          100: '#C5E1F5',
          200: '#8DC4EB',
          300: '#5AA7DE',
          400: '#2B89CF',
          500: '#1C6BA8',
          600: '#0B3C5D',
          700: '#0A3451',
          800: '#082B43',
          900: '#062236',
          950: '#041829',
        },
        // Primary Yellow - Energy · Youth · Innovation (CTA)
        accent: {
          DEFAULT: '#F5B301',
          50: '#FFFBEB',
          100: '#FFF4CC',
          200: '#FFEA99',
          300: '#FFE066',
          400: '#FFD633',
          500: '#F5B301',
          600: '#D49B00',
          700: '#A37700',
          800: '#725300',
          900: '#412F00',
          950: '#291E00',
        },
        // Secondary Blue - UI elements
        secondary: {
          DEFAULT: '#1C5D99',
          50: '#EBF4FC',
          100: '#D1E6F7',
          200: '#A3CEEF',
          300: '#75B5E7',
          400: '#479CDF',
          500: '#1C5D99',
          600: '#1A5489',
          700: '#154570',
          800: '#103657',
          900: '#0B273E',
          950: '#061826',
        },
        // Soft Yellow - Background accents
        'soft-yellow': '#FFF4CC',
        // Neutral Light - Clean background
        'neutral-light': '#F9FAFB',
        // Neutral Dark - Text & contrast
        'neutral-dark': '#1C2533',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
