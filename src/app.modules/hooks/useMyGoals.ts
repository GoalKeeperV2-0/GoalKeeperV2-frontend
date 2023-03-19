import { useQuery } from '@tanstack/react-query';
import { getGoalAll } from 'app.modules/api/goal';
import { useEffect } from 'react';

export const useMyGoals = (page: number, enabled = true) => {
	const { data, refetch } = useQuery(['myGoals', 'all'], () => getGoalAll(page), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled,
	});
	useEffect(() => {
		refetch();
	}, [page]);
	return { data, refetch };
};
