import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        miami: {
          pink: {
            400: "",
          },
          emerald: {
            400: "#34D399",
          },
          blue: {
            400: "#A5F3FC",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "-20rem 0" },
          "50%": { backgroundPosition: "20rem 0" },
        },
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    nextui(),
  ],
  darkMode: "class",
};

export default config;
