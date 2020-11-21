import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingScreen from './screens/LandingScreen/landingScreen.js';

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' component={LandingScreen} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter;