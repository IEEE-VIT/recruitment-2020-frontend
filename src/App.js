import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingScreen from "./screens/LandingScreen/LandingScreen";
import formScreen from "./screens/FormScreen/formScreen";
import Dashboard from "./screens/Dashboard/dashboard";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./uiComponents/ProtectedRoute/ProtectedRoute";
import OtpVerif from "./screens/OtpVerif/OtpVerif";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import notFound from "./screens/NotFound/notFound";
import Instructions from "./uiComponents/Modal/Instructions";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            exact
            path="/form"
            component={formScreen}
            redirect="/"
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            redirect="/"
            component={Dashboard}
          />
          <Route
            exact
            path="/instructions"
            redirect="/"
            component={() => (
              <div style={{ height: "100vh", background: "#0a0a0a" }}>
                <Instructions />
              </div>
            )}
          />
          <Route exact path="/" component={LandingScreen} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/otp-verify" component={OtpVerif} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="" component={notFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
