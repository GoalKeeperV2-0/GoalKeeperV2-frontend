import Button from 'app.components/Button';
import TextInput from 'app.components/Input/TextInput';
import Select from 'app.components/Select';
import EmailInputArea from 'app.features/Auth/components/EmailInputArea';
import PasswordInputArea from 'app.features/Auth/components/PasswordInputArea';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);
	const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대 이상']; // TODO: 백엔드에 80대 이상은 80으로 표기할거라고 말하기
	return (
		<>
			<EmailInputArea onChange={() => null} value="" isValid={null} />
			<PasswordInputArea onChange={() => null} value="" isValid={null} errorContent="asdf" />
			<div className="w-full flex justify-between items-center space-x-[20px]">
				<Select options={['감자', '고구마', '바나나']} value={null} onChange={() => null} placeholder="성별" />{' '}
				<Select options={ageOptions} value={null} onChange={() => null} placeholder="나이" />
			</div>
		</>
	);
}

export default Home;
