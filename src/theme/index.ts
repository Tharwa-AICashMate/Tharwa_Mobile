const currentTheme = "light";

const Light = {
  highlight: "#FECD3E",
  background: "#FFFAFA",
  textDark: "#3A3B3C",
  text: "#4F4F4F",
  textLight: "#7F7F7F",
  primary: "#FECD3E",
  secondery: "#E5E5E5",
  accentLight: "#B0E0E6",
  accent: "#6495ED",
  accentDark: "#202063",
};

const Dark = {
  highlight: "#FECD3E",
  background: "#E5E5E5",
  textDark: "#3A3B3C",
  text: "#E5E5E5",
  textLight: "#FFFAFA",
  primary: "#4F4F4F",
  secondery: "#525252",
  accentLight: "#B0E0E6",
  accent: "#6495ED",
  accentDark: "#202063",
};

const Theme = {
  colors: currentTheme == "dark" ? Dark : Light,
  typography: {
    fonts: {
      poppins: {
        regular: "Poppins_400Regular",
        medium: "Poppins_500Medium",
        semiBold: "Poppins_600SemiBold",
        bold: "Poppins_700Bold",
      },
      leagueSpartan: {
        light: "League_Spartan_300Light",
        regular: "League_Spartan_400Regular",
      },
    },
    size: {
      xxs: 12,
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 36,
      xxl: 40,
    },
    lineHeight: {
      sm: 18,
      md: 22,
      lg: 28,
      xl: 32,
    },
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borders: {
    radius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 16,
      pill: 50,
      round: 999,
    },
    width: {
      thin: 1,
      thick: 2,
    },
  },
};

export default Theme;