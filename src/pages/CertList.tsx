import { useQuery } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import CertificationsScreen from 'app.features/Certification/screens/CertificationsScreen';
import { getCertAll, getCertByCategory } from 'app.modules/api/certification';
import { CategoryType } from 'app.modules/api/goal';
import React, { useState } from 'react';

function CertListPage() {
	const [page, setPage] = useState<number>(0);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const { data: certs } = useQuery(['certs', 'all'], () => getCertAll(page), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !category,
	});
	const { data: filteredCerts } = useQuery(
		['certs', category],
		() => getCertByCategory(page, category as CategoryType),
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
	const certFilterHandler = (filter: CategoryType | null) => {
		setCategory(filter);
	};

	return (
		<BaseLayout>
			<CertificationsScreen
				certs={category === null ? certs?.content : filteredCerts?.content}
				onCertFilterChange={certFilterHandler}
				certFilter={category}
			/>
		</BaseLayout>
	);
}

export default CertListPage;
