import { useMutation } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import Oauth2RegisterView from 'app.features/Auth/views/Oauth2RegisterView';
import { oauth2Register } from 'app.modules/api/auth';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Oauth2Register() {
	const navigate = useNavigate();
	const { mutate: patchUser, isLoading: isPatchLoading } = useMutation(oauth2Register, {
		onSuccess: (res) => {
			console.log(res);
			navigate(SERVICE_URL.home);
			alert('계정정보수정완료');
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});

	return (
		<BaseLayout>
			<Oauth2RegisterView patchUser={patchUser} isLoading={isPatchLoading} />
		</BaseLayout>
	);
}

export default Oauth2Register;
