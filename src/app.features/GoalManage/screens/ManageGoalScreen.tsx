import InitGoalBox from 'app.components/Box/InitGoalBox';
import FilterButton from 'app.components/FilterButton';
import React, { useState } from 'react';

function ManageGoalScreen() {
	const [filter, setFilter] = useState('전체');
	const filterMap = new Map([
		['전체', 'all'],
		['진행 중', 'ongoing'],
		['성공', 'success'],
		['실패', 'fail'],
		['보류', 'hold'],
	]);
	return (
		<div className="space-y-[3rem]">
			<h3>목표관리</h3>

			<ul className="flex space-x-[0.8rem]">
				{Array.from(filterMap.keys()).map((item, index) => (
					<li key={index}>
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
			<ul>
				<li>
					<InitGoalBox />
				</li>
			</ul>

			<div>페이지네이션</div>
		</div>
	);
}

export default ManageGoalScreen;
