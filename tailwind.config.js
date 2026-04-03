/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@gluestack-ui/themed/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        "primary":"#930004",
      
      },
      boxShadow:{
        "g1":"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
      }
    },
  },
  plugins: [],
}