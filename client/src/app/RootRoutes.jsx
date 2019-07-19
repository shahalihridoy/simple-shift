import React from "react";
import { Redirect } from "react-router-dom";

import AdminLayout from "./shared/components/layout/Layout1/Layout1";

import profileRoutes from "./views/dashboard/ProfileRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

const AuthProtectedComponent = props =>
  localStorage.getItem("authenticated") === "true" ? (
    <AdminLayout {...props} />
  ) : (
    <Redirect to="/session/signin" />
  );

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard/profile" />
  },
  {
    path: "/dashboard",
    exact: true,
    component: () => <Redirect to="/dashboard/profile" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  {
    component: AuthProtectedComponent,
    routes: [...profileRoutes, ...redirectRoute, ...errorRoute]
  },
  ...redirectRoute,
  ...errorRoute
];

export default routes;
