import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Certifications from 'pages/Certifications';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import Login from './pages/login';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Oauth2Callback from './pages/Oauth2Callback';
import Oauth2Register from './pages/Oauth2Register';
import Test from './pages/Test';
import ManageGoal from './pages/ManageGoal';

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
						<Route path={SERVICE_URL.oauth2Register} element={<Oauth2Register />} />
						<Route path={SERVICE_URL.manageGoal} element={<ManageGoal />} />
						<Route path={SERVICE_URL.certifications} element={<Certifications />} />
						<Route path="/test" element={<Test />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
