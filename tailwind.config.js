// 
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          indigo: {
            900: '#1E1B4B', // Darker shade for backgrounds
            800: '#2D2A70', 
            700: '#312E81',
            600: '#4338CA',
            500: '#4F46E5',
            400: '#6366F1',
            300: '#818CF8',
            200: '#A5B4FC',
            100: '#C7D2FE',
            50: '#EEF2FF',
          },
          yellow: {
            400: '#facc15', // Primary yellow for CTAs
            300: '#FCD34D',
          }
        },
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          'integral': ['IntegralCF', 'sans-serif'],
        },
        borderWidth: {
          '16': '16px',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        scale: {
          '102': '1.02',
          '103': '1.03',
        },
      },
    },
    plugins: [],
  }