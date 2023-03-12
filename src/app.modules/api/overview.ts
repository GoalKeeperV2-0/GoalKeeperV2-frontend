import client from './client';

export const getUserStatistics = async () => {
	const res = await client.get(`statistics/user`);

	return res;
};
