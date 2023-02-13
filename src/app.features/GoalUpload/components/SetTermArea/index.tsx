import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import Calendar from 'app.components/Calendar';
import { goalFormState } from 'app.features/GoalUpload/store';
import { GoalType } from 'app.modules/api/onetimeGoal';
import React from 'react';
import { useRecoilState } from 'recoil';
import ManytimeGoalStatusMessages from './ManytimeGoalStatusMessages';
import OnetimeGoalStatusMessage from './OneTimeGoalStatusMessage';

function SetTermArea() {
	const [goalForm, setGoalForm] = useRecoilState(goalFormState);

	const dateHandler = (dateType: 'startDate' | 'endDate', date: string) => {
		setGoalForm({
			...goalForm,
			[dateType]: date,
		});
	};
	const resetEndDateHandler = () => {
		setGoalForm({
			...goalForm,
			endDate: '',
		});
	};
	const { goalType, endDate, startDate } = goalForm;
	const getStatus = () => {
		if (!endDate.trim()) return 'init';
		return 'selected';
	};
	const getDayDiff = () => {
		const date1Ms = new Date(startDate).getTime();
		const date2Ms = new Date(endDate).getTime();

		const differenceMs = date2Ms - date1Ms;

		return differenceMs / 1000 / 60 / 60 / 24 + 1;
	};
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="goal-term" content="목표기간 선택" />
			<div className="flex space-x-[1.6rem]">
				<Calendar
					dateHandler={dateHandler}
					startDate={startDate}
					endDate={endDate}
					resetEndDateHandler={resetEndDateHandler}
				/>
				{goalType === 'onetime' ? (
					<OnetimeGoalStatusMessage status={getStatus()} />
				) : (
					<ManytimeGoalStatusMessages status={getStatus()} dayDiff={getDayDiff()} endDate={endDate} />
				)}
			</div>
		</div>
	);
}

export default SetTermArea;
