import { extendTheme } from '@chakra-ui/react'

const theme = {
    colors: {
      transparent: "transparent",
      black: "#030303",
      white: "#fff",
      act_pink: "#FF833D",
      act_blue: "#FFC8A9",
      grey: {
        700: "#2D3748",
        500: "#535353",
        300: "#ACACAC",
        200: "DEDEDE",
        100: "#EEEEEE",
        20: "#EDF2F7"
      },
      
    },
    fonts: {
        primary: "Airbnb Cereal App, sans-serif",
        heading: "Airbnb Cereal App, sans-serif",
        body: "Airbnb Cereal App, sans-serif"
    },
    config: {
        useSystemColorMode: false,
    },
  }

export default extendTheme(theme);