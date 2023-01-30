import BaseLayout from 'app.components/BaseLayout';
import Button from 'app.components/Button';
import TextInput from 'app.components/Input/TextInput';
import Select from 'app.components/Select';
import EmailInputArea from 'app.features/Auth/components/signUp/EmailInputArea';
import PasswordInputArea from 'app.features/Auth/components/signUp/PasswordInputArea';
import SubmitButton from 'app.features/Auth/components/SubmitButton';
import React, { useEffect } from 'react';

function Home() {
	return (
		<BaseLayout>
			<div>골키퍼 홈!</div>
		</BaseLayout>
	);
}

export default Home;
