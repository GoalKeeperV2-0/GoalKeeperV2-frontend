import LoginView from 'app.features/Auth/views/LoginView';
import React, { useEffect } from 'react';

function Login() {
	return <LoginView onSubmit={() => null} error="" />;
}

export default Login;
