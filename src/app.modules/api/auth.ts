import { AgeType, SexType } from 'app.features/Auth/components/signUp/OptionalInputArea';
import client from './client';

export const oauth2 = async (code: string) => {
	const res = await client.get(`/credential/login/oauth2/google?code=${code}`);
	return res;
};
// TODO: 닉네임 필드가 없음
export interface Oauth2RegisterBody {
	age: AgeType; // TODO: Type 따로 선언해둔 파일 만들기
	description: string;
	sex: SexType;
}
export const oauth2Register = async (body: Oauth2RegisterBody) => {
	const res = await client.patch(`/credential/login/oauth2/additionalUserInfo`, { ...body });
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
