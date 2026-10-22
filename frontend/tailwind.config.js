/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        rule: "var(--rule)",
        vermilion: "var(--vermilion)",
        sage: "var(--sage)",
        ochre: "var(--ochre)",
      },
      fontFamily: {
        serif: ["'Fraunces'", "'Newsreader'", "Georgia", "serif"],
        sans: ["'Instrument Sans'", "'DM Sans'", "'Public Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'IBM Plex Mono'", "'Space Mono'", "monospace"],
      },
      boxShadow: {
        'paper': '0 2px 8px -2px rgba(27, 26, 23, 0.08), 0 1px 3px -1px rgba(27, 26, 23, 0.04)',
        'paper-lg': '0 8px 24px -4px rgba(27, 26, 23, 0.1), 0 2px 6px -2px rgba(27, 26, 23, 0.05)',
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'mono-widest': '0.15em',
      }
    },
  },
  plugins: [],
}
