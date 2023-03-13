import client from './client';
import { CategoryType } from './goal';

export interface PostCert {
	goalType: 'oneTime' | 'manyTime';
	goalId: number;
	content: string;
	picture: string; // TODO: 백엔드 이미지 처리 완료되면 수정 필요
}
export const postCert = async (body: FormData) => {
	const res = await client.post(`certifications/${body.get('goalType')}/${body.get('goalId')}`, body, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return res;
};

export const getCertAll = async (page: number) => {
	const res = await client.get(`certifications?page=${page}`);

	return res;
};

export const getCertByCategory = async (page: number, category: CategoryType) => {
	const res = await client.get(`certifications/${category}?page=${page}`);

	return res;
};

// 검증

interface PostVerificationBody {
	certificationId: number;
	state: boolean; // 검증 값
}

export const postVerification = async (body: PostVerificationBody) => {
	const res = await client.post(`verification`, { ...body });

	return res;
};
