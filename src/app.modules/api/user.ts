import client from './client';

export const getUserProfile = async () => {
	const res = await client.get(`credential`);

	return res;
};
