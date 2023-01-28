import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Oauth2Callback from 'pages/Login/oauth2/callback';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import Login from './pages/login';
import SignUp from './pages/SignUp';

import Login from './pages/Login';

function App() {
	return (
		<div className="App">
			<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
						<Route path={SERVICE_URL.home} element={<Home />} />
						<Route path={SERVICE_URL.login} element={<Login />} />
						<Route path={SERVICE_URL.signUp} element={<SignUp />} />
						<Route path={SERVICE_URL.oauth2Callback} element={<Oauth2Callback />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
