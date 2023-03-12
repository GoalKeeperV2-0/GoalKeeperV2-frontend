import { useQuery } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import ManageGoalScreen from 'app.features/GoalManage/screens/ManageGoalScreen';
import { CategoryType, getGoalAll, getGoalByCategory } from 'app.modules/api/goal';
import React, { useState } from 'react';

function ManageGoalPage() {
	const [page, setPage] = useState<number>(0);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const { data: goals } = useQuery(['myGoals', 'all'], () => getGoalAll(page), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !category,
	});
	const { data: filteredGoals } = useQuery(
		['myGoals', category],
		() => getGoalByCategory(page, category as CategoryType),
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
	const goalFilterHandler = (filter: CategoryType) => {
		setCategory(filter);
	};
	return (
		<BaseLayout>
			<ManageGoalScreen
				myGoals={category === null ? goals?.content : filteredGoals?.content}
				onGoalFilterChange={goalFilterHandler}
				goalFilter={category}
			/>
		</BaseLayout>
	);
}

export default ManageGoalPage;
