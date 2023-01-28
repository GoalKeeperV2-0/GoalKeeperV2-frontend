import { useQuery } from '@tanstack/react-query';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { oauth2 } from 'app.modules/api/auth';
import { setCookie } from 'app.modules/cookie';
function Oauth2Callback() {
	const navigate = useNavigate();
	const { data } = useQuery(
		['oauth2', 'google'],
		() => oauth2(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			onSuccess: (res) => {
				const { accessToken, refreshToken, newbie } = res;

				setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				localStorage.setItem('ACCESS_TOKEN', accessToken);
				// TODO: 필수 입력 정보 입력안했을때 보내는페이지
				if (newbie) {
					navigate(`${SERVICE_URL.oauth2Register}`);
					return;
				}
				navigate(SERVICE_URL.home); // TODO: 로그인 이전 페이지로 보내기
			},
			onError: () => {
				alert('오류 발생');
			},
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {}, [data]);
	return <div>OauthCallback</div>;
}

export default Oauth2Callback;
