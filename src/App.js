import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './screens/Dashboard/dashboard.js';

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path = '/' component={Dashboard} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter;
