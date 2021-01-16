import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Thankyou from "./screens/ThankyouScreen/ThankyouScreen";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
// import formScreen from "./screens/FormScreen/formScreen";
// import Dashboard from "./screens/Dashboard/dashboard";
// import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
// import ProtectedRoute from "./uiComponents/ProtectedRoute/ProtectedRoute";
// import OtpVerif from "./screens/OtpVerif/OtpVerif";
// import ResetPassword from "./screens/ResetPassword/ResetPassword";
import notFound from "./screens/NotFound/notFound";
// import Instructions from "./uiComponents/Modal/Instructions";
import ResultsHomeScreen from "./screens/ResultsHomeScreen/ResultsHomeScreen";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ResultsHomeScreen} />
          <Route exact path="" component={notFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
