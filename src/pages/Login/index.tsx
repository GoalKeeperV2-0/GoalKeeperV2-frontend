import React, { useEffect } from 'react';
import LoginScreen from 'app.features/Auth/screens/LoginScreen';
import BaseLayout from 'app.components/BaseLayout';

function LoginPage() {
	return (
		<BaseLayout>
			<LoginScreen onSubmit={() => ''} error="" />
		</BaseLayout>
	);
}

export default LoginPage;
