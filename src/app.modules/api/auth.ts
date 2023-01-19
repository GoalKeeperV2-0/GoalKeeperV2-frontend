import client from './client';

export const oauth2 = async (code: string) => {
	const {
		data: { accessToken, newbie, refreshToken },
	} = await client.get(`/oauth2/google?code=${code}`);
	return { accessToken, newbie, refreshToken };
};

export interface Oauth2RegisterBody {
	age: number;
	description: string;
	sex: 'MAN' | 'WAMAN' | null;
}
export const oauth2Register = async (body: Oauth2RegisterBody) => {
	const res = await client.patch(`/oauth2/additionalUserInfo`, { ...body });
	return res;
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
