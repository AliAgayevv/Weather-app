/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        custom: {
          primary : "#0a1f44",
          dark : "#1e2432",
          darkRed: "#c3112d",
          red : "#ff1e42",
          orange: "#ff8c00"
        }
      },
      width: {
        'card-w' : '17.5rem',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], 
      },
      }
    },
    plugins: [],
  }

  // 280