module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/react/**/*.{js,ts,jsx,tsx}", // 🔥 include shared UI package
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
