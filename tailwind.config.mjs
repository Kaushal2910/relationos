/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // --- RelationOS brand tokens (source of truth: version1/DESIGN.md) ---
        primary: {
          DEFAULT: '#E4557B',
          pressed: '#C8436A',
          soft: '#FBE3EA',
          dark: '#F06E8F',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6C5CE7',
          soft: '#ECEAFB',
          foreground: '#FFFFFF',
        },
        like: '#2FBF71',
        pass: '#F0616D',
        warning: '#E0A32E',
        info: '#3B82F6',

        bg: {
          DEFAULT: '#FDF8F6',
          dark: '#161114',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5EEEB',
          dark: '#211A1E',
          'dark-alt': '#2B2227',
        },
        border: {
          DEFAULT: '#ECE2DE',
          dark: '#3A2F35',
        },
        text: {
          DEFAULT: '#22181C',
          muted: '#6E6167',
          subtle: '#9A8E93',
          dark: '#F5ECEF',
          'dark-muted': '#B7A9AF',
          'dark-subtle': '#8A7D83',
        },

        // --- shadcn/ui compatibility layer (mapped onto the brand palette) ---
        background: '#FDF8F6',
        foreground: '#22181C',
        accent: '#F5EEEB',
        'accent-foreground': '#22181C',
        muted: '#F5EEEB',
        'muted-foreground': '#6E6167',
        destructive: '#F0616D',
        'destructive-foreground': '#FFFFFF',
        input: '#ECE2DE',
        ring: '#E4557B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Instrument Serif — high-contrast, intimate, editorial. Used for display moments.
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        phone: '2.75rem',
        screen: '2.15rem',
      },
      boxShadow: {
        e1: '0 4px 20px -2px rgba(34, 24, 28, 0.08)',
        e2: '0 8px 30px -4px rgba(34, 24, 28, 0.12)',
        e3: '0 20px 50px -8px rgba(34, 24, 28, 0.2)',
        phone: '0 40px 80px -24px rgba(34, 24, 28, 0.45), 0 12px 28px -12px rgba(34, 24, 28, 0.25)',
        glow: '0 0 60px -8px rgba(228, 85, 123, 0.45)',
        'glow-violet': '0 0 60px -8px rgba(108, 92, 231, 0.4)',
      },
      letterSpacing: {
        overline: '0.18em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--tw-rotate, 0))' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
