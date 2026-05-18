import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0B1220"
        }
      }
    },
  },
  plugins: [],
}
export default config
