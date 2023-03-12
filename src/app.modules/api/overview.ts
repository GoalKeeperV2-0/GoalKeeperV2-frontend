import client from './client';

export const getUserStatistics = async () => {
	const res = await client.get(`statistics/user`);

	return res;
};

export const getUserPoints = async () => {
	const res = await client.get(`statistics/user/points`);

	return res;
};
