import LoginView from 'app.features/Auth/views/LoginView';
import SignUpView from 'app.features/Auth/views/SignUpView';
import React, { useEffect } from 'react';

function Login() {
	return <SignUpView onSubmit={() => '수정필요'} error="" />;
}

export default Login;
