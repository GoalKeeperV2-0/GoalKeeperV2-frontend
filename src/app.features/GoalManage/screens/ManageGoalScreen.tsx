import GoalBox from 'app.components/Box/GoalBox';
import InitGoalBox from 'app.components/Box/InitGoalBox';
import FilterButton from 'app.components/FilterButton';
import React, { useState } from 'react';
import { CategoryType, GoalDataType, MappedCategory } from '../types';

interface Props {
	myGoals: GoalDataType[];
	onGoalFilterChange: (filter: CategoryType | null) => void;
	goalFilter: CategoryType | null;
	onPageChange: (page: number) => void;
}
function ManageGoalScreen({ myGoals, onGoalFilterChange, goalFilter, onPageChange }: Props) {
	// TODO: 중복 정의 없애기

	return (
		<div className="space-y-[3rem]">
			<h3>목표관리</h3>

			<ul className="flex space-x-[0.8rem]">
				{Object.entries({ ALL: '전체', ...MappedCategory })?.map(([key, value]) => (
					<li key={key}>
						<FilterButton
							isPressed={(goalFilter === null && key === 'ALL') || goalFilter === key}
							name="goalFilter"
							value={key}
							onClick={() => {
								if (key === 'ALL') {
									onGoalFilterChange(null);
									return;
								}
								onGoalFilterChange(key as CategoryType);
							}}
						>
							{value}
						</FilterButton>
					</li>
				))}
			</ul>
			<ul className="grid grid-cols-3 gap-[3rem]">
				<InitGoalBox />
				{myGoals?.map((goal, index) => (
					<li key={index}>
						<GoalBox goalData={goal as unknown as GoalDataType} />
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => onPageChange(1)}>페이지 전환</button>
			</div>
		</div>
	);
}

export default ManageGoalScreen;
