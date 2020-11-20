import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DC143C", //crimson
    },
    secondary: {
      main: "#FFFFFF",
    },
    white: "white",
    black: "black",
    blue: "blue",
  },
  status: {},
  overrides: {},
});

export default Theme;
