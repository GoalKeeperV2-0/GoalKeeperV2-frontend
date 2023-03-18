import { useQuery } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import ManageGoalScreen from 'app.features/GoalManage/screens/ManageGoalScreen';
import { CategoryType, getGoalAll, getGoalByCategory } from 'app.modules/api/goal';
import { useMyGoals } from 'app.modules/hooks/useMyGoals';
import React, { useState } from 'react';

function ManageGoalPage() {
	const [curPage, setCurPage] = useState<number>(0);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const { data: goals } = useMyGoals(curPage, !category);

	const { data: filteredGoals } = useQuery(
		['myGoals', category],
		() => getGoalByCategory(curPage, category as CategoryType),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
			enabled: !!category,
		}
	);
	const goalFilterHandler = (filter: CategoryType | null) => {
		setCategory(filter);
	};
	const pageHandler = (value: number) => {
		console.log(value);
		setCurPage(value);
	};
	// TODO: 목표랑 인증 둘다 최신순으로 정렬해서 받기
	return (
		<BaseLayout>
			<ManageGoalScreen
				myGoals={category === null ? goals?.content : filteredGoals?.content}
				onGoalFilterChange={goalFilterHandler}
				goalFilter={category}
				curPage={curPage}
				onPageChange={(page: number) => setCurPage(page)}
				totalPages={category === null ? goals?.totalPages : filteredGoals?.totalPages}
			/>
		</BaseLayout>
	);
}

export default ManageGoalPage;
