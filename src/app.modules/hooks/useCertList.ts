import { useQuery } from '@tanstack/react-query';
import { getCertAll } from 'app.modules/api/certification';
import { useEffect } from 'react';

export const useCertList = (page: number, enabled = true) => {
	const { data, refetch } = useQuery(['certs', 'all'], () => getCertAll(page), {
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
	return { data };
};
