import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import Calendar from 'app.components/Calendar';
import { goalFormState } from 'app.features/GoalUpload/store';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ManytimeGoalStatusMessages from './ManytimeGoalStatusMessages';
import OnetimeGoalStatusMessage from './OneTimeGoalStatusMessage';
// TODO: 새로고침했을 때 , 날짜설정 버그 생기는거 다 고치기
function SetTermArea() {
	const [goalForm, setGoalForm] = useRecoilState(goalFormState);
	const { goalType, endDate, startDate, certDates } = goalForm;
	const dateHandler = (dateType: 'startDate' | 'endDate', date: string) => {
		if (endDate.trim()) return;
		setGoalForm({
			...goalForm,
			[dateType]: date,
		});
	};
	const certDatesHandler = (date: string) => {
		if (goalType === 'onetime') return;
		if (certDates.includes(date) || date === endDate) return;
		const updatedCertDate = [...certDates, date];
		// 날짜순으로 정렬하기
		updatedCertDate.sort();
		setGoalForm({
			...goalForm,
			certDates: updatedCertDate,
		});
	};
	const resetEndDateHandler = () => {
		setGoalForm({
			...goalForm,
			endDate: '',
			certDates: [],
		});
	};
	const deleteCertDateHandler = (date: string) => {
		setGoalForm({
			...goalForm,
			certDates: certDates.filter((item) => item !== date),
		});
	};
	const getStatus = () => {
		if (!endDate.trim()) return 'init';
		return 'selected';
	};
	useEffect(() => {
		setGoalForm((prev) => ({ ...prev, endDate: '', certDates: [] }));
	}, [goalType]);
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="goal-term" content="목표기간 선택" />
			<div className="flex space-x-[1.6rem]">
				<Calendar
					dateHandler={dateHandler}
					startDate={startDate}
					endDate={endDate}
					resetEndDateHandler={resetEndDateHandler}
					certDatesHandler={certDatesHandler}
					certDates={certDates}
				/>
				{goalType === 'onetime' ? (
					<OnetimeGoalStatusMessage status={getStatus()} />
				) : (
					<ManytimeGoalStatusMessages
						status={getStatus()}
						term={getDayDiff(startDate, endDate) + 1}
						endDate={endDate}
						certDates={certDates}
						deleteCertDateHandler={deleteCertDateHandler}
					/>
				)}
			</div>
		</div>
	);
}

export default SetTermArea;
