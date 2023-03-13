import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { getCookie, setCookie } from 'app.modules/cookie';
import axios, { AxiosHeaders } from 'axios';

const client = axios.create({
	baseURL: 'https://api.goalkeeper.co.kr/api', // TODO: https?
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		Authorization: `Bearer ${getCookie('GAT')}`,
	},
});

client.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error) => {
		const {
			config,
			response: { status },
		} = error;

		if (status === 401 && config.url !== '/api/login/') {
			try {
				const originalRequest = config;

				// token refresh 요청
				const refreshToken = getCookie('GRT');
				const res = await client.get(
					'/api/login/', // token refresh api
					{ headers: { refreshToken } }
				);
				console.log(res);
				/*const newAccessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					localStorage.setItem('ACCESS_TOKEN', newAccessToken);
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				}*/
				return await client(originalRequest);
			} catch (refreshError) {
				// TODO: 로그아웃
				window.location.href = SERVICE_URL.login;
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
