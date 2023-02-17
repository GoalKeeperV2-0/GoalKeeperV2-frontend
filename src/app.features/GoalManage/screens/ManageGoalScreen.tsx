import GoalBox, { GoalDataType } from 'app.components/Box/GoalBox';
import InitGoalBox from 'app.components/Box/InitGoalBox';
import FilterButton from 'app.components/FilterButton';
import React, { useState } from 'react';
import { MY_GOALS } from '../mockData';

function ManageGoalScreen() {
	const [filter, setFilter] = useState('전체');
	// TODO: 중복 정의 없애기
	const filterMap = new Map([
		['전체', 'all'],
		['진행 중', 'ONGOING'],
		['진행 완료', 'WAITING_CERT_COMPLETE'],
		['성공', 'SUCCESS'],
		['실패', 'FAIL'],
		['검토 요청', 'HOLD'],
	]);

	return (
		<div className="space-y-[3rem]">
			<h3>목표관리</h3>

			<ul className="flex space-x-[0.8rem]">
				{Array.from(filterMap.keys()).map((item) => (
					<li key={item}>
						<FilterButton
							isPressed={filter === item}
							name="goalFilter"
							value={filterMap.get(item) as string}
							onClick={() => setFilter(item)}
						>
							{item}
						</FilterButton>
					</li>
				))}
			</ul>
			<ul className="grid grid-cols-3 gap-[3rem]">
				<InitGoalBox />
				{MY_GOALS.map((goal, index) => (
					<li key={index}>
						<GoalBox goalData={goal as unknown as GoalDataType} />
					</li>
				))}
			</ul>

			<div>페이지네이션</div>
		</div>
	);
}

export default ManageGoalScreen;
