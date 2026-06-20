/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#111118',
          tertiary: '#16161f',
          elevated: '#1c1c28',
          hover: '#252535',
        },
        border: {
          subtle: '#2a2a3a',
          DEFAULT: '#3a3a52',
          highlight: '#5a5a8a',
        },
        text: {
          primary: '#e4e4e7',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
        accent: {
          primary: '#6366f1',
          secondary: '#22d3ee',
          tertiary: '#a855f7',
          warm: '#f59e0b',
          danger: '#f43f5e',
          success: '#10b981',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow/20': '0 0 16px rgba(99, 102, 241, 0.2)',
        'glow/30': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-cyan/20': '0 0 16px rgba(34, 211, 238, 0.2)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 12px 40px -8px rgba(99, 102, 241, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'typewriter': 'typewriter 3.5s steps(40, end), blink 0.75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#6366f1' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.accent.secondary'),
              '&:hover': {
                color: theme('colors.accent.primary'),
              },
            },
            h1: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            h2: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            h3: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            code: {
              color: theme('colors.accent.secondary'),
              backgroundColor: theme('colors.bg.tertiary'),
              padding: '0.15rem 0.35rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.bg.tertiary'),
              border: `1px solid ${theme('colors.border.subtle')}`,
              borderRadius: theme('borderRadius.lg'),
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.primary'),
              backgroundColor: theme('colors.bg.tertiary'),
              color: theme('colors.text.secondary'),
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              borderRadius: '0.5rem',
            },
            hr: {
              borderColor: theme('colors.border.subtle'),
            },
            th: {
              color: theme('colors.text.primary'),
              backgroundColor: theme('colors.bg.tertiary'),
            },
            td: {
              borderColor: theme('colors.border.subtle'),
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
