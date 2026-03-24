/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        floatYReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(6px)" },
        },
        floatX: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(6px)" },
        },
        floatXReverse: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(-6px)" },
        },
      },
      animation: {
        "float-y": "floatY 6s ease-in-out infinite",
        "float-y-reverse": "floatYReverse 7s ease-in-out infinite",
        "float-x": "floatX 8s ease-in-out infinite",
        "float-x-reverse": "floatXReverse 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
