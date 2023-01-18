import client from './client';

export const getTokens = async (code: string) => {
	const {
		data: { accessToken, newbie, refreshToken },
	} = await client.get(`/oauth2/google?code=${code}`);
	return { accessToken, newbie, refreshToken };
};

export interface WithdrawUser {
	content: string;
	opinion: string;
}
export const withdrawUser = async (body: WithdrawUser) => {
	const data = await client.post('/auth/user/withdraw', {
		...body,
	});

	return data;
};
