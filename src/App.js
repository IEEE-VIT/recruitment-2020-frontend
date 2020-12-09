import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingScreen from './screens/LandingScreen/LandingScreen.js';
import formScreen from './screens/FormScreen/formScreen.js';

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' component={LandingScreen} />
					<Route path = '/' component={formScreen} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter;
