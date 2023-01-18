import React, { Suspense, lazy } from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import OauthCallback from './pages/login/oauth2/callback';

function App() {
	return (
		<div className="App">
			<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
						<Route path={SERVICE_URL.home} element={<Home />} />
						<Route path={SERVICE_URL.login} element={<Login />} />
						<Route path={SERVICE_URL.signUp} element={<SignUp />} />
						<Route path="/oauth2/callback" element={<OauthCallback />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
