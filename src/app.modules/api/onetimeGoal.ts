import { AgeType, SexType } from 'app.features/Auth/components/signUp/OptionalInputArea';
import client from './client';

export type CategoryType = 'EXERCISE' | 'STUDY' | 'HOBBY' | 'HABIT' | 'ETC';
export type GoalType = 'onetime' | 'manytime';
export interface PostOnetimeGoal {
	// 오늘 날짜가 '4일'인 경우 4일 disable 최소 내일부터 시작하게 D-1
	endDate: string; // '2023-02-13'
	title: string;
	categoryType: CategoryType;
	content: string;
	point: string;
	reward: 'HIGH_RETURN' | 'LOW_RETURN';
}
export const postOnetimeGoal = async (body: PostOnetimeGoal) => {
	const res = await client.post('/goal/onetime', {
		...body,
	});

	return res;
};

export interface PostManyTimeGoal extends PostOnetimeGoal {
	startDate: string;
	certDates: string[]; //["2023-01-26","2023-01-27","2023-01-28"."2023-01-29","2023-01-30","2023-01-31"]
}

export const postManytimeGoal = async (body: PostOnetimeGoal) => {
	const res = await client.post('/goal/onetime', {
		...body,
	});

	return res;
};
