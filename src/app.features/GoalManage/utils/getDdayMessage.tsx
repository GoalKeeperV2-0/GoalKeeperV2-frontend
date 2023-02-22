import React from 'react';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { GoalStateType } from '../types';
type Params = {
	state: GoalStateType;
	endDate: string;
	isManyTimeGoal: boolean;
	certDates: string[];
	todayString: string;
};

export const getDdayMessage = ({ state, endDate, isManyTimeGoal, certDates, todayString }: Params) => {
	if (state === 'FAIL' || state === 'SUCCESS') return <span>정산 완료</span>;
	if (state === 'HOLD') return <span>보류</span>;
	if (state === 'WAITING_CERT_COMPLETE') return <span>정산</span>;
	const dEndDate = getDayDiff(todayString, endDate);
	if (isManyTimeGoal) {
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
