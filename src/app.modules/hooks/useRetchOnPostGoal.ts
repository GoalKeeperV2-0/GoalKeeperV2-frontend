import { useQueries, useQuery } from '@tanstack/react-query';
import client from 'app.modules/api/client';
import { getGoalAll } from 'app.modules/api/goal';
import { useEffect } from 'react';
import { useMyGoals } from './useMyGoals';

export const useRetchOnPostGoal = () => {
	const { refetch } = useMyGoals(0);
	const refetchOnPostGoal = () => {
		refetch();
	};
	return { refetchOnPostGoal };
};
