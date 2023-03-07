import BaseLayout from 'app.components/BaseLayout';
import React, { useEffect } from 'react';
import SignUpView from '../app.features/Auth/screens/SignUpScreen';

function SignUpPage() {
	return (
		<BaseLayout>
			<SignUpView onSubmit={() => '수정필요'} error="" />
		</BaseLayout>
	);
}

export default SignUpPage;
