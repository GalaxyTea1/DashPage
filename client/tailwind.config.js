/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('/logo.svg')",
        notFound: "url('/src/assets/404.png')",
      },
      textShadow: {
        notFoundH1:
          "-5px 5px 0px rgba(0, 0, 0, 0.7), -10px 10px 0px rgba(0, 0, 0, 0.4), -15px 15px 0px rgba(0, 0, 0, 0.2)",
        notFoundDefault: "-5px 5px 0px rgba(0, 0, 0, 0.7)",
      },
      boxShadow: {
        torch: "0 0 0 9999em #000000f7",
        torchAfter:
          "inset 0 0 100px 2px #000, 0 0 20px 4px rgba(13, 13, 10, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

