export type GoalStateType = 'ONGOING' | 'WAITING_CERT_COMPLETE' | 'SUCCESS' | 'FAIL' | 'HOLD';
export type CategoryType = 'STUDY' | 'EXERCISE' | 'HABIT' | 'HOBBY' | 'ETC';
export type CertStateType = 'ONGOING' | 'SUCCESS' | 'FAIL';
export type RewardType = 'HIGH_RETURN' | 'LOW_RETURN';
export type MappedState = { [K in GoalStateType]: string };

export type CertType = {
	id?: number;
	date: string;
	picture: string;
	state: 'SUCCESS' | 'FAIL' | 'ONGOING';
	content: string;
	successCount: number;
};
export const MappedCategory: { [K in CategoryType]: string } = {
	STUDY: '공부',
	EXERCISE: '운동',
	HABIT: '습관',
	HOBBY: '취미',
	ETC: '기타',
};
export const MappedGoalState: { [K in GoalStateType]: string } = {
	ONGOING: '진행중',
	WAITING_CERT_COMPLETE: '진행완료',
	SUCCESS: '성공',
	FAIL: '실패',
	HOLD: '실패',
};
export const MappedReward: { [K in RewardType]: string } = {
	HIGH_RETURN: '하이리스크',
	LOW_RETURN: '로우리스크',
};
export const MappedCertState: { [K in CertStateType]: string } = {
	ONGOING: '검증 중',
	SUCCESS: '성공',
	FAIL: '실패',
};
export type GoalDataType = {
	id: number;
	title: string;
	goalState: GoalStateType;
	startDate: string;
	endDate: string;
	certDates?: string[];
	certifications: CertType[] | null;
	categoryType: CategoryType;
	point: number;
	holdable: boolean;
	reward: RewardType;
	content: string;
};
