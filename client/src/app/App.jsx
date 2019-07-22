import "../styles/app.scss";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import MaterialTheme from "./shared/theme/MaterialTheme";

import routes from "./RootRoutes";
import { renderRoutes } from "react-router-config";
import { Store } from "./redux/Store";
import { StripeProvider } from "react-stripe-elements";
import { loadUser } from "./views/dashboard/DashboardService";

const App = () => {
  loadUser();
  return (
    <StripeProvider apiKey="pk_live_D2msV3Te6eLdr2jFJHa1LK8R00cG727cBS">
      <Provider store={Store}>
        <MuiThemeProvider theme={MaterialTheme}>
          <Router>{renderRoutes(routes)}</Router>
        </MuiThemeProvider>
      </Provider>
    </StripeProvider>
  );
};

export default App;
