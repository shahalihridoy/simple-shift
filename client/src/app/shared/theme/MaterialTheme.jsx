import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import variables from "../../../styles/_variables.scss";

// console.log(variables);

const MaterialTheme = createMuiTheme({
  typography: {
    // fontSize: 12
  },
  palette: {
    primary: {
      main: variables.primary,
      contrastText: "#ffffff"
    },
    secondary: {
      main: variables.secondary
    }
  },
  status: {
    danger: red[500]
  },
  overrides: {
    MuiTextField: {
      root: {
        // height: "48px"
      }
    },
    MuiGrid: {
      // spac
    },
    MuiCard: {
      root: {
        borderRadius: "8px"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "0.875rem"
      }
    }
  }
});

export default MaterialTheme;
