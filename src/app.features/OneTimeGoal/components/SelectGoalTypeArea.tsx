import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React, { useState } from 'react';
type GoalType = 'onetime' | 'manytime';
function SelectGoalTypeArea() {
	const [goalType, setGoalType] = useState<GoalType>('onetime');
	// TODO: 초기화 방법 더 알아보기
	const goalTypeMap = new Map<string, string>([
		['onetime', '일반목표'],
		['manytime', '지속목표'],
	]);
	return (
		<div className="space-y-[0.8rem] w-full">
			<Label required htmlFor="goal-type" content="등록할 목표를 설정해주세요" />
			<div className="flex space-x-[2.3rem]">
				{['onetime', 'manytime'].map((type) => (
					<Button
						key={type}
						onClick={() => setGoalType(type as GoalType)}
						name="selectGoalType"
						value={`${type}Goal`}
						variant="outline"
						size="lg"
						bgColor="bg-white"
						borderColor={goalType === type ? 'border-primaryBlack-500' : null}
						ariaPressed={goalType === type}
						className="text-start pl-[2.4rem]"
					>
						{goalTypeMap.get(type)}
					</Button>
				))}
			</div>
		</div>
	);
}

export default SelectGoalTypeArea;
