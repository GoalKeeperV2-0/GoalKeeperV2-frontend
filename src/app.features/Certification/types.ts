import { CertType, GoalDataType } from 'app.features/GoalManage/types';

export type CertStateType = 'ONGOING' | 'SUCCESS' | 'FAIL';

export const MappedCertState: { [K in CertStateType]: string } = {
	ONGOING: '검증 중',
	SUCCESS: '성공',
	FAIL: '실패',
};

export type CertDataType = {
	id: number;
	content: string;
	picture: string;
	state: CertStateType;
	date: string; // '2023-03-06'
	successCount: number;
	failCount: number;
	oneTimeGoal?: GoalDataType;
	manyTimeGoal?: GoalDataType;
	relatedCertifications: CertType[];
};
