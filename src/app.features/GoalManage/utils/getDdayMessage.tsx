import React from 'react';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { GoalStateType } from '../types';
type Params = {
	goalState: GoalStateType;
	endDate: string;
	isManyTimeGoal: boolean;
	certDates: string[] | undefined;
	todayString: string;
};

export const getDdayMessage = ({ goalState, endDate, isManyTimeGoal, certDates, todayString }: Params) => {
	if (goalState === 'FAIL' || goalState === 'SUCCESS') return <span>정산 완료</span>;
	if (goalState === 'HOLD') return <span>보류</span>;
	if (goalState === 'WAITING_CERT_COMPLETE') return <span>정산 중</span>;
	const dEndDate = getDayDiff(todayString, endDate);
	if (isManyTimeGoal) {
		if (certDates === undefined) return null;
		let dCert = 0;
		for (let i = 0; i < certDates.length; i += 1) {
			const tmp = getDayDiff(todayString, certDates[i]);

			if (tmp >= 0) {
				dCert = tmp;

				break;
			}
		}

		return (
			<>
				<span className={`${dCert === 0 ? 'text-primaryOrange-200' : ''}`}>D-{dCert === 0 ? 'DAY' : dCert}</span>
				<span> D-{dEndDate}</span>
			</>
		);
	}
	return (
		<span className={`${dEndDate === 0 ? 'text-primaryOrange-200' : ''}`}>D-{dEndDate === 0 ? 'DAY' : dEndDate}</span>
	);
};
