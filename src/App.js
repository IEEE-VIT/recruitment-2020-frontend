import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingScreen from './screens/LandingScreen/LandingScreen.js';
import formScreen from './screens/FormScreen/formScreen.js';
import Dashboard from './screens/Dashboard/dashboard.js';

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' component={LandingScreen} />
					<Route path = '/form-screen' component={formScreen} />
					<Route path = '/dashboard' component={Dashboard} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter;
