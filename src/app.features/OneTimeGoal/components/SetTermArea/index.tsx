import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import Calendar from 'app.components/Calendar';
import React from 'react';
import { GoalType } from '../SelectGoalTypeArea';
import OnetimeGoalStatusMessage from './OneTimeGoalStatusMessage';
interface Props {
	valueHandler: (date: string) => void;
	endDate: string;
	goalType: GoalType;
}
function SetTermArea({ valueHandler, endDate, goalType }: Props) {
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="goal-term" content="목표기간 선택" />
			<div className="flex space-x-[1.6rem]">
				<Calendar onetimeGoalTermHandler={valueHandler} endDate={endDate} />
				{goalType === 'onetime' && <OnetimeGoalStatusMessage status={!endDate.trim() ? 'init' : 'selected'} />}
			</div>
		</div>
	);
}

export default SetTermArea;
