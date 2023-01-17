import { useMutation } from '@tanstack/react-query';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function OauthCallback() {
	const navigate = useNavigate();
	const { data, mutate } = useMutation(
		() => getTokens(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			retry: 0,
			onSuccess: (data) => {
				const { accessToken, isActive, email } = data;
				console.log('isActive', isActive);
				// TODO: 필수 입력 정보 입력안했을때 보내는페이지
				/* if (!isActive) {
                    router.push(
                        `${ServiceUrl.register}?email=${email}`,
                        ServiceUrl.register,
                    );
                    return;
                }*/
				localStorage.setItem('ACCESS_TOKEN', accessToken);
				navigate(SERVICE_URL.home); // TODO: 로그인 이전 페이지로 보내기
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	useEffect(() => {
		mutate();
	}, []);
	return <div>OauthCallback</div>;
}

export default OauthCallback;
