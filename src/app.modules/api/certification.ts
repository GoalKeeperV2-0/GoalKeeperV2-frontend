import client from './client';

export interface PostCert {
	goalType: 'oneTime' | 'manyTime';
	goalId: number;
	content: string;
	picture: string; // TODO: 백엔드 이미지 처리 완료되면 수정 필요
}
export const postCert = async (body: PostCert) => {
	const res = await client.post(
		`certifications/${body.goalType}/${body.goalId}`,
		{
			...body,
		},
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);

	return res;
};
