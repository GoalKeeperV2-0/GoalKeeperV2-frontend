import Button from 'app.components/Button';
import TextInput from 'app.components/Input';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);

	return (
		<TextInput placeholder="이메일을 입력해주세요" type="email" onChange={() => null} value="" color="primaryRed-300" />
	);
}

export default Home;
