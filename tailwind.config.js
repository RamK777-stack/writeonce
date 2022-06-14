const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSmoothing: ["hover", "focus"],
    fontWeight: {
      "extra-light": 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      "extra-bold": 800,
      black: 900,
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      normal: "0",
      wider: ".05em",
      widest: ".25em",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      typography: theme => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = size => {
          const result = theme(`fontSize.${size}`)
          return Array.isArray(result) ? result[0] : result
        }

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                p: {
                  marginTop: 1,
                  marginBottom: theme("spacing.4"),
                  fontSize: fontSize("lg"),
                },
              },
            ],
          },
          light: {
            css: [
              {
                p: {
                  marginTop: 0,
                  marginBottom: theme("spacing.4"),
                  fontSize: fontSize("lg"),
                },
              },
            ],
          },
          dark: {
            css: [
              {
                p: {
                  marginTop: 0,
                  marginBottom: theme("spacing.4"),
                  fontSize: fontSize("lg"),
                },
              },
            ],
          },
          gray: {
            css: {
              '--tw-prose-headings': theme('colors.gray[600]')
            }
          }
        }
      },
      width: {
        128: "32rem",
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        violet: colors.violet,
        slate: colors.slate,
        teal: colors.teal,
      },
    },
    fontFamily: {
      sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
}
