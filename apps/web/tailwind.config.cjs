// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme');

const neutral = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#070708',
};

const brand = {
  lightest: 'var(--brand-lightest)',
  lighter: 'var(--brand-lighter)',
  light: 'var(--brand-light)',
  DEFAULT: 'var(--brand-default)',
  dark: 'var(--brand-dark)',
  darker: 'var(--brand-darker)',
  darkest: 'var(--brand-darkest)',
};

const green = {
  lightest: '#ebffed',
  lighter: '#97ffa2',
  light: '#39ea4a',
  DEFAULT: '#28a635',
  dark: '#1a6a22',
  darker: '#0c3310',
  darkest: '#071c09',
};

const orange = {
  lightest: '#fff9f3',
  lighter: '#ffe3ca',
  light: '#ffbf85',
  DEFAULT: '#f8963c',
  dark: '#aa6729',
  darker: '#3f260f',
  darkest: '#221508',
};

const red = {
  lightest: '#fff8f8',
  lighter: '#ffe1e1',
  light: '#ff8d8d',
  DEFAULT: '#ff5353',
  dark: '#ad2a2a',
  darker: '#551515',
  darkest: '#2f0b0b',
};

const blue = {
  lightest: '#f1fcff',
  lighter: '#c0f0ff',
  light: '#47c5ee',
  DEFAULT: '#2e9cbe',
  dark: '#1d6379',
  darker: '#0e303b',
  darkest: '#081a20',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './questions/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee linear infinite',
        marquee2: 'marquee2 linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.594rem' }],
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      // Temporary workaround before the below PR is released
      // See: https://github.com/tailwindlabs/tailwindcss/pull/11317
      height: {
        dvh: '100dvh',
      },
      colors: {
        brand,
        green,
        success: green,
        blue,
        info: blue,
        red,
        danger: red,
        orange,
        warning: orange,
        neutral,
        gray: neutral,
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      letterSpacing: {
        1: '.015625em',
        2: '.03125em',
        3: '.046875em',
        4: '.0625em',
      },
      typography: require('./typography.cjs'),
      zIndex: {
        // Modified from: https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss#L1133
        sticky: 20,
        fixed: 30,
        'slideout-overlay': 40,
        slideout: 45,
        'dialog-overlay': 50,
        dialog: 55,
        dropdown: 60, // Above dialog so that dropdowns can be used within dialogs.
        popover: 70,
        tooltip: 80,
        toast: 90,
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
