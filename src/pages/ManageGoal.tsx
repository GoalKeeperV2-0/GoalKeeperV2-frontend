import { useQuery } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import ManageGoalScreen from 'app.features/GoalManage/screens/ManageGoalScreen';
import { getGoalAll } from 'app.modules/api/goal';
import React, { useState } from 'react';

function ManageGoalPage() {
	const [page, setPage] = useState<number>(0);
	const { data, isLoading } = useQuery(['myGoals'], () => getGoalAll(page), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	return (
		<BaseLayout>
			<ManageGoalScreen myGoals={data?.content} />
		</BaseLayout>
	);
}

export default ManageGoalPage;
