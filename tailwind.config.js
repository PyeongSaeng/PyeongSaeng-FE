const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-blue': '#0D29B7',
        'main-blue-light1': '#B4BDE9',
        'main-blue-light2': '#DBDFF4',
        'main-blue-light3': '#ECEEF9',
        'main-green': '#08D485',
        'main-green-light1': '#B3F4DB',
        'main-green-light2': '#DAF4EA',
        'main-green-light3': '#ECF6F2',
        'gray-900': '#212121',
        'gray-800': '#414141',
        'gray-700': '#707070',
        'gray-600': '#A0A0A0',
        'gray-500': '#C2C2C2',
        'gray-400': '#E1E1E1',
        'gray-300': '#F3F3F3',
        'gray-200': '#FFFFFF',
      },
      fontFamily: {
        pretendard: ['Pretendard', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
