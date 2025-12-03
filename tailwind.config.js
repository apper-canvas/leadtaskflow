/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        accent: "#EC4899",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      animation: {
        'task-complete': 'taskComplete 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-gentle': 'pulseGentle 1s ease-in-out',
      },
      keyframes: {
        taskComplete: {
          '0%': { transform: 'scale(1)', backgroundColor: 'white' },
          '50%': { transform: 'scale(0.98)', backgroundColor: 'rgb(34 197 94 / 0.1)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'rgb(34 197 94 / 0.1)' },
        },
        pulseGentle: {
          '0%, 100%': { backgroundColor: 'rgb(34 197 94 / 0.1)' },
          '50%': { backgroundColor: 'rgb(34 197 94 / 0.2)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}