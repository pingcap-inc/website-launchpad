import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            primary: '#DC150B',
            bg: '#630D09',
            dark: '#87120C',
            medium: '#DC150B',
            light: '#F35048',
          },
          violet: {
            bg: '#3C174C',
            dark: '#5D137D',
            medium: '#9E4EC4',
            light: '#C76FF2',
          },
          blue: {
            bg: '#0D3152',
            dark: '#10487B',
            medium: '#2C80CE',
            light: '#509DEA',
          },
          teal: {
            bg: '#093434',
            dark: '#0F5353',
            medium: '#1AA8A8',
            light: '#50DBD9',
          },
          mango: {
            '100': '#F7E6C8',
            '200': '#F4DCB3',
            '300': '#EDC888',
            '400': '#E6B461',
            '500': '#E1A141',
            '600': '#A8752B',
            '700': '#644618',
            '800': '#38270C',
            DEFAULT: '#E99100',
          },
        },
        carbon: {
          '100': '#E5E8EB',
          '200': '#CBD1D7',
          '300': '#B9C2CA',
          '400': '#A2ADB9',
          '500': '#8B96A2',
          '600': '#74808B',
          '700': '#5D6974',
          '800': '#424D57',
          '900': '#28333E',
          DEFAULT: '#06111A',
        },
        bg: {
          primary: '#000000',
          inverse: '#FFFFFF',
          subtle: '#E5E8EB',
          surface: '#06111A',
        },
        text: {
          primary: '#000000',
          inverse: '#FFFFFF',
          secondary: '#A2ADB9',
        },
        border: {
          primary: '#424D57',
          subtle: '#CBD1D7',
          strong: '#A2ADB9',
        },
        accent: {
          primary: '#DC150B',
        },
      },
      backgroundImage: {
        'gradient-dark-top': 'linear-gradient(180deg, #06111A 0%, #000000 100%)',
        'gradient-dark-bottom': 'linear-gradient(180deg, #000000 0%, #06111A 100%)',
      },
      fontFamily: {
        sans: ['var(--font-moderat)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-moderat-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        eyebrow: [
          '16px',
          {
            lineHeight: '1.5',
            fontWeight: '400',
          },
        ],
        h1: [
          '68px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h1-mb': [
          '48px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h2-lg': [
          '64px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h2-md': [
          '56px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h2-sm': [
          '50px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h2-mb': [
          '40px',
          {
            lineHeight: '1.1',
            fontWeight: '700',
          },
        ],
        'h3-xl': [
          '32px',
          {
            lineHeight: '1.3',
            fontWeight: '700',
          },
        ],
        'h3-lg': [
          '24px',
          {
            lineHeight: '1.3',
            fontWeight: '700',
          },
        ],
        'h3-sm': [
          '20px',
          {
            lineHeight: '1.3',
            fontWeight: '700',
          },
        ],
        'body-2xl': [
          '22px',
          {
            lineHeight: '1.4',
            fontWeight: '300',
          },
        ],
        'body-xl': [
          '20px',
          {
            lineHeight: '1.4',
            fontWeight: '300',
          },
        ],
        'body-lg': [
          '18px',
          {
            lineHeight: '1.4',
            fontWeight: '300',
          },
        ],
        'body-md': [
          '16px',
          {
            lineHeight: '1.4',
            fontWeight: '300',
          },
        ],
        'body-sm': [
          '14px',
          {
            lineHeight: '1.4',
            fontWeight: '300',
          },
        ],
        label: [
          '12px',
          {
            lineHeight: '1.3',
            fontWeight: '500',
          },
        ],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
      },
      lineHeight: {
        tight: '1.1',
        normal: '1.3',
        relaxed: '1.4',
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        section: '80px',
        'section-md': '64px',
        'section-sm': '40px',
        container: '40px',
      },
      maxWidth: {
        container: '1374px',
        'content-md': '1140px',
        'content-sm': '905px',
        'hero-title': '860px',
        'section-title': '880px',
        subtitle: '640px',
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.08)',
        cta: '0 4px 16px rgba(220,21,11,0.30)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
