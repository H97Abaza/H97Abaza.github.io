import { createTheme, PaletteColor } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { CSSProperties } from "@mui/material/styles/createMixins";

declare module "@mui/material/styles" {
  interface Palette {
    complementary: PaletteColor;
    analogous1: PaletteColor;
    analogous2: PaletteColor;
    triadic1: PaletteColor;
    triadic2: PaletteColor;
  }
  interface PaletteOptions {
    complementary?: PaletteColor;
    analogous1?: PaletteColor;
    analogous2?: PaletteColor;
    triadic1?: PaletteColor;
    triadic2?: PaletteColor;
  }
  interface Mixins {
    gradientBackground: {
      bgGradient3: Pick<CSSProperties, "background">;
      bgGradient: Pick<CSSProperties, "background">;
      bgClip: CSSProperties;
    };
  }
}
// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#ec0000",
      contrastText: "#f0f0f0",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    complementary: {
      light: "#96f4f2",
      main: "#00ecec",
      dark: "#00e1e5",
      contrastText: "#0f0f0f",
    },
    analogous1: {
      light: "#ef4b8f",
      main: "#ec0076",
      dark: "#e9005d",
      contrastText: "",
    },
    analogous2: {
      light: "#f28600",
      main: "#ec7600",
      dark: "#e66600",
      contrastText: "",
    },
    triadic1: {
      light: "#eced3f",
      main: "#ecec00",
      dark: "#edd900",
      contrastText: "",
    },
    triadic2: {
      light: "#58f047",
      main: "#00ec00",
      dark: "#00da00",
      contrastText: "",
    },
  },
  mixins: {
    gradientBackground: {
      bgGradient3: {
        background:
          "linear-gradient(var(--background-angle),var(--background-from),var(--background-mid),var(--background-to))",
      },
      bgGradient: {
        background:
          "linear-gradient(var(--background-angle),var(--background-from),var(--background-to))",
      },
      bgClip: {
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme: { palette, mixins } }) => ({
          "--background-from": palette?.complementary?.dark as string,
          "--background-mid": palette?.complementary?.light as string,
          "--background-to": palette?.complementary?.dark as string,
          "--background-angle": "45deg",
          background: mixins.gradientBackground.bgGradient3.background,
        }),
      },
    },
  },
});

export default theme;
