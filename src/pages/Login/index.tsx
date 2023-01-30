import React, { useEffect } from 'react';
import LoginView from 'app.features/Auth/views/LoginView';
import BaseLayout from 'app.components/BaseLayout';

function Login() {
	return (
		<BaseLayout>
			<LoginView onSubmit={() => null} error="" />
		</BaseLayout>
	);
}

export default Login;
