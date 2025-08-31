/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    // ...
    darkMode: ["class"],
    theme: {
        extend: {
        fontFamily: {
            sans: ['var(--font-pretendard)', ...fontFamily.sans],
        },
        },
    },
    plugins: [],
};