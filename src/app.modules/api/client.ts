import axios, { AxiosHeaders } from 'axios';

const client = axios.create({
	baseURL: 'http://api.goalkeeper.co.kr/api', // TODO: https?
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
	},
});

client.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('ACCESS_TOKEN');
	if (accessToken && config?.headers !== undefined) {
		client.defaults.headers.common.Authorization = accessToken;
	}

	return config;
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
		console.log(config);
		if (status === 401 && config.url !== '/auth/token/refresh') {
			try {
				const originalRequest = config;

				// token refresh 요청

				const { data } = await client.get(
					'/auth/token/refresh' // token refresh api
				);
				// console.log(data.accessToken, data.refreshToken);
				// 토큰 갱신

				localStorage.setItem('ACCESS_TOKEN', data.accessToken);
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

				// 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
				return await client(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem('ACCESS_TOKEN');
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
