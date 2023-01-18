import React, { useEffect } from 'react';
import LoginView from 'app.features/Auth/views/LoginView';

function Login() {
	return <LoginView onSubmit={() => null} error="" />;
}

export default Login;
