import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CertListPage from 'pages/CertList';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
// import Login from './pages/login';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import Oauth2CallbackPage from './pages/Oauth2Callback';
import Oauth2RegisterPage from './pages/Oauth2Register';
import Test from './pages/Test';
import ManageGoalPage from './pages/ManageGoal';

function App() {
	return (
		<div className="App">
			<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
						<Route path={SERVICE_URL.home} element={<HomePage />} />
						<Route path={SERVICE_URL.login} element={<LoginPage />} />
						<Route path={SERVICE_URL.signUp} element={<SignUpPage />} />
						<Route path={SERVICE_URL.oauth2Callback} element={<Oauth2CallbackPage />} />
						<Route path={SERVICE_URL.oauth2Register} element={<Oauth2RegisterPage />} />
						<Route path={SERVICE_URL.manageGoal} element={<ManageGoalPage />} />
						<Route path={SERVICE_URL.certifications} element={<CertListPage />} />
						<Route path="/test" element={<Test />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
