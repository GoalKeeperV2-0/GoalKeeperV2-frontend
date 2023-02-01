import { useMutation } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import Oauth2RegisterView from 'app.features/Auth/views/Oauth2RegisterView';
import { oauth2Register } from 'app.modules/api/auth';
import React, { useEffect } from 'react';

function Oauth2Register() {
	/*const { mutate, isLoading: isPatchLoading } = useMutation(oauth2Register, {
		onSuccess: (res) => {
			console.log(res);
			alert('계정정보수정완료');
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	useEffect(() => {
		mutate({
			age: 20,
			description: '',
			sex: 'MAN',
		});
	}, []);*/
	return (
		<BaseLayout>
			<Oauth2RegisterView />
		</BaseLayout>
	);
}

export default Oauth2Register;
