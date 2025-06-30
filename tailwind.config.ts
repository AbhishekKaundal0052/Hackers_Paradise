import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cybersecurity theme colors
        primary: {
          DEFAULT: "#FF0000",
          50: "#FFE6E6",
          100: "#FFCCCC",
          200: "#FF9999",
          300: "#FF6666",
          400: "#FF3333",
          500: "#FF0000",
          600: "#CC0000",
          700: "#990000",
          800: "#660000",
          900: "#330000",
        },
        secondary: {
          DEFAULT: "#000000",
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        accent: {
          DEFAULT: "#b25ffb",
          50: "#f3e8ff",
          100: "#e9d5ff",
          200: "#d8b4ff",
          300: "#c084ff",
          400: "#a855f7",
          500: "#b25ffb",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
        dark: {
          DEFAULT: "#1a1a1a",
          lighter: "#2a2a2a",
          darker: "#0f0f0f",
          card: "#1e1e1e",
          border: "#333333",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-gradient": "linear-gradient(135deg, #FF0000 0%, #b25ffb 50%, #000000 100%)",
        "cyber-gradient-reverse": "linear-gradient(135deg, #000000 0%, #b25ffb 50%, #FF0000 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "cyber-glow": "cyberGlow 3s ease-in-out infinite",
        "matrix-rain": "matrixRain 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 0, 0, 0.8)" },
        },
        cyberGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.3), 0 0 20px rgba(178, 95, 251, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(178, 95, 251, 0.6)" 
          },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "cyber": "0 0 20px rgba(255, 0, 0, 0.3)",
        "cyber-purple": "0 0 20px rgba(178, 95, 251, 0.3)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-strong": "0 8px 32px 0 rgba(31, 38, 135, 0.6)",
      },
      fontFamily: {
        "cyber": ["Orbitron", "monospace"],
        "tech": ["Share Tech Mono", "monospace"],
        "sans": ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 