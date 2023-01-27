import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Oauth2Register from 'pages/login/oauth2/register';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import Login from './pages/login';
import SignUp from './pages/SignUp';
import Oauth2Callback from './pages/login/oauth2/callback';

function App() {
	return (
		<div className="App">
			<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
						<Route path={SERVICE_URL.home} element={<Home />} />

						<Route path={SERVICE_URL.signUp} element={<SignUp />} />
						<Route path={SERVICE_URL.oauth2Register} element={<Oauth2Register />} />
						<Route path={SERVICE_URL.oauth2Callback} element={<Oauth2Callback />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
