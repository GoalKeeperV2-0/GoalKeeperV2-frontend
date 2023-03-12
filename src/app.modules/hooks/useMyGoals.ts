import { useQuery } from '@tanstack/react-query';
import { getGoalAll } from 'app.modules/api/goal';

export const useMyGoals = (page: number, enabled = true) => {
	const { data } = useQuery(['myGoals', 'all'], () => getGoalAll(page), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled,
	});
	return { data };
};
