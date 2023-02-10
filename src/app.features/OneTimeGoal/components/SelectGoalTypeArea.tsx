import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React, { useState } from 'react';

export type GoalType = 'onetime' | 'manytime';
type MappedGoal = { [K in GoalType]: string };

interface Props {
	value: GoalType;
	valueHandler: (e: React.BaseSyntheticEvent) => void;
}
function SelectGoalTypeArea({ value, valueHandler }: Props) {
	// TODO: 초기화 방법 더 알아보기
	const goal: MappedGoal = {
		onetime: '일반목표',
		manytime: '지속목표',
	};
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="goal-type" content="등록할 목표를 설정해주세요" />
			<div className="flex space-x-[2.3rem]">
				{Object.entries(goal).map(([item, content]) => (
					<Button
						key={item}
						onClick={valueHandler}
						name="goalType"
						value={item}
						variant="outline"
						size="lg"
						bgColor="bg-white"
						borderColor={value === item ? 'border-primaryBlack-500' : null}
						ariaPressed={value === item}
						className="text-start pl-[2.4rem]"
					>
						{content}
					</Button>
				))}
			</div>
		</div>
	);
}

export default SelectGoalTypeArea;
