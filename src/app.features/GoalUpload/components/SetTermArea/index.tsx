import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import Calendar from 'app.components/Calendar';
import { goalFormState } from 'app.features/GoalUpload/store';
import { GoalType } from 'app.modules/api/onetimeGoal';
import React from 'react';
import { useRecoilState } from 'recoil';
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
				{goalType === 'onetime' && <OnetimeGoalStatusMessage status={!endDate.trim() ? 'init' : 'selected'} />}
			</div>
		</div>
	);
}

export default SetTermArea;
