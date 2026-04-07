/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: '#4f46e5',
        accent: '#f59e0b',
        // Aurora palette
        aurora: {
          violet: '#7c3aed',
          'violet-light': '#a855f7',
          blue: '#2563eb',
          'blue-light': '#60a5fa',
          cyan: '#06b6d4',
          'cyan-light': '#22d3ee',
          green: '#10b981',
          'green-light': '#34d399',
        },
        // OLED dark tiers
        dark: {
          0: '#000000',
          1: '#080810',
          2: '#0d0d1f',
          3: '#12122a',
          4: '#1a1a3a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      backgroundImage: {
        'aurora-mesh': 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(79,70,229,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.3) 0%, transparent 60%)',
        'aurora-hero': 'radial-gradient(ellipse 100% 60% at 10% 10%, rgba(124,58,237,0.5) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 90%, rgba(6,182,212,0.4) 0%, transparent 55%)',
        'aurora-cta': 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(79,70,229,0.6) 0%, rgba(124,58,237,0.4) 40%, transparent 70%)',
      },
      animation: {
        'aurora-shift': 'auroraShift 20s ease-in-out infinite alternate',
        'gradient-sweep': 'gradientSweep 5s ease infinite',
        'gradient-border': 'gradientBorder 4s linear infinite',
        'float-up': 'floatUp 6s ease-in-out infinite',
        'word-enter': 'wordEnter 0.6s cubic-bezier(.16,1,.3,1) forwards',
        'counter-up': 'counterUp 0.8s cubic-bezier(.16,1,.3,1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'card-hover': 'cardHover 0.2s ease forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(.16,1,.3,1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(.16,1,.3,1) forwards',
      },
      keyframes: {
        auroraShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        gradientSweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientBorder: {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wordEnter: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        agency: {
          "primary": "#2563eb",
          "secondary": "#4f46e5",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#080810",
          "base-200": "#0d0d1f",
          "base-300": "#12122a",
          "info": "#06b6d4",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}