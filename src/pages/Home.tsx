import Button from 'app.components/Button';
import TextInput from 'app.components/Input/TextInput';
import EmailInputArea from 'app.features/Auth/components/EmailInputArea';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);

	return (
		<>
			<EmailInputArea onChange={() => null} value="" isValidEmail={null} />
			<EmailInputArea onChange={() => null} value="" isValidEmail={null} errorContent="asdf" />
		</>
	);
}

export default Home;
