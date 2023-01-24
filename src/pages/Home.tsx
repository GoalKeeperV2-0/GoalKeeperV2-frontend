import Button from 'app.components/Button';
import TextInput from 'app.components/Input/TextInput';
import EmailInputArea from 'app.features/Auth/components/EmailInputArea';
import PasswordInputArea from 'app.features/Auth/components/PasswordInputArea';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);

	return (
		<>
			<EmailInputArea onChange={() => null} value="" isValid={null} />
			<PasswordInputArea onChange={() => null} value="" isValid={null} errorContent="asdf" />
		</>
	);
}

export default Home;
