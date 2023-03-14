import client from './client';

export type CategoryType = 'EXERCISE' | 'STUDY' | 'HOBBY' | 'HABIT' | 'ETC';
export type GoalType = 'onetime' | 'manytime';
export type RewardType = 'HIGH_RETURN' | 'LOW_RETURN';
export interface PostOnetimeGoal {
	// 오늘 날짜가 '4일'인 경우 4일 disable 최소 내일부터 시작하게 D-1
	endDate: string; // '2023-02-13'
	title: string;
	categoryType: CategoryType;
	content: string;
	point: string;
	reward: RewardType;
}
export const postOnetimeGoal = async (body: PostOnetimeGoal) => {
	const res = await client.post('/goal/oneTime', {
		...body,
	});

	return res;
};

export interface PostManyTimeGoal extends PostOnetimeGoal {
	startDate: string;
	certDates: string[]; //["2023-01-26","2023-01-27","2023-01-28"."2023-01-29","2023-01-30","2023-01-31"]
}

export const postManytimeGoal = async (body: PostManyTimeGoal) => {
	const res = await client.post('goal/manyTime', {
		...body,
	});

	return res;
};

export const getGoalAll = async (page: number) => {
	console.log(`goal?page=${page}`, 'getGoalAll');
	const res = await client.get(`goal?page=${page}`);

	return res;
};

export const getGoalByCategory = async (page: number, category: CategoryType) => {
	console.log(category);
	const res = await client.get(`goal/${category}?page=${page}`);

	return res;
};

export const patchHoldGoal = async (goalId: number) => {
	const res = await client.patch(`goal/hold/${goalId}`);

	return res;
};
