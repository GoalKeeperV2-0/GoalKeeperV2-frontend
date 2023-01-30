import Button from 'app.components/Button';
import TextInput from 'app.components/Input/TextInput';
import Select from 'app.components/Select';
import EmailInputArea from 'app.features/Auth/components/signUp/EmailInputArea';
import PasswordInputArea from 'app.features/Auth/components/signUp/PasswordInputArea';
import SubmitButton from 'app.features/Auth/components/SubmitButton';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);

	return (
		<>
			<EmailInputArea onChange={() => null} value="" isValid={null} />
			<PasswordInputArea onChange={() => null} value="" isValid={null} errorContent="asdf" />
			<div className="w-full flex justify-between items-center space-x-[20px]">
				<Select options={['감자', '고구마', '바나나']} value={null} onChange={() => null} placeholder="성별" />{' '}
			</div>
			<SubmitButton onClick={() => null} isLoading={false} disabled={false}>
				로그인
			</SubmitButton>
		</>
	);
}

export default Home;
