import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DC143C", //crimson
    },
    secondary: {
      main: "#87CEEB",
    },
    common: { white: "#FFF", black: "#000", grey: "#D3D3D3" },
  },
  status: {},
  overrides: {},
});

export default Theme;
