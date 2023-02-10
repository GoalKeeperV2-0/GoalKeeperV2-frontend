import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import Calendar from 'app.components/Calendar';
import React from 'react';
interface Props {
	valueHandler: (date: string) => void;
	endDate: string;
}
function SetTermArea({ valueHandler, endDate }: Props) {
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="goal-term" content="목표기간 선택" />
			<div className="flex space-x-[1.6rem]">
				<Calendar onetimeGoalTermHandler={valueHandler} endDate={endDate} />
				<Button
					variant="solid"
					size="xs"
					bgColor="bg-buttonRed-100"
					textColor="text-buttonRed-200"
					className=" w-fit px-[0.8rem]"
				>
					왼쪽 달력에서 목표 기간을 선택해주세요
				</Button>
			</div>
		</div>
	);
}

export default SetTermArea;
