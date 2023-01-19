import { useMutation } from '@tanstack/react-query';
import { oauth2Register } from 'app.modules/api/auth';
import React, { useEffect } from 'react';

function Oauth2Register() {
	const { mutate, isLoading: isPatchLoading } = useMutation(oauth2Register, {
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
	}, []);
	return <div>register</div>;
}

export default Oauth2Register;
