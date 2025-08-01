/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f6',
          100: '#dcf2eb',
          200: '#b9e5d7',
          300: '#8dd3c0',
          400: '#5bb8a3',
          500: '#2A7F62', // Main brand color
          600: '#236a52',
          700: '#1e5644',
          800: '#1a4638',
          900: '#173a2f',
        },
        secondary: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fbd5a5',
          300: '#f8b86d',
          400: '#f59332',
          500: '#f2750a',
          600: '#e35d05',
          700: '#bc4508',
          800: '#95370e',
          900: '#782f0f',
        },
        // High contrast colors for accessibility
        'high-contrast': {
          'text': '#000000',
          'background': '#ffffff',
          'border': '#000000',
          'focus': '#0066cc',
        },
        // Easy reading colors
        'easy-reading': {
          'text': '#2d3748',
          'background': '#f7fafc',
          'border': '#e2e8f0',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'easy-reading': ['Open Sans', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'easy-reading': '1.125rem', // 18px for easy reading
        'large': '1.25rem', // 20px
        'xl': '1.5rem', // 24px
        '2xl': '2rem', // 32px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(0, 102, 204, 0.5)',
        'high-contrast': '0 0 0 2px #000000',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 