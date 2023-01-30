import BaseLayout from 'app.components/BaseLayout';
import React, { useEffect } from 'react';
import SignUpView from '../app.features/Auth/views/SignUpView';

function Login() {
	return (
		<BaseLayout>
			<SignUpView onSubmit={() => '수정필요'} error="" />
		</BaseLayout>
	);
}

export default Login;
