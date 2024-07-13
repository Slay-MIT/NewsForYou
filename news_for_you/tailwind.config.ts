import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        Bodoni_Moda_SC: ['Bodoni Moda SC', 'serifs']
      },
      colors: {
        'custom-lightest': '#D6EFD8',
        'custom-light': '#80AF81',
        'custom-medium': '#508D4E',
        'custom-dark': '#1A5319',
        'custom-darker': '#0F300E', // Added darker shade
        'custom-lighter': '#A8D7A9', // Added lighter shade
      },
    },
  },
  plugins: [],
};
export default config;
