import { useQuery } from '@tanstack/react-query';
import BaseLayout from 'app.components/BaseLayout';
import CertificationsScreen from 'app.features/Certification/screens/CertificationsScreen';
import { getCertAll, getCertByCategory } from 'app.modules/api/certification';
import { CategoryType } from 'app.modules/api/goal';
import { useCertList } from 'app.modules/hooks/useCertList';
import React, { useEffect, useState } from 'react';

function CertListPage() {
	const [curPage, setCurPage] = useState<number>(0);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const { data: certs } = useCertList(curPage, !category);
	const { data: filteredCerts } = useQuery(
		['certs', category],
		() => getCertByCategory(curPage, category as CategoryType),
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
	useEffect(() => {
		setCurPage(0); //필터 바뀌면 페이지 num 0으로 초기화
	}, [category]);
	return (
		<BaseLayout>
			<CertificationsScreen
				certs={
					category === null ? certs?.certificationResponses?.content : filteredCerts?.certificationResponses?.content
				}
				alreadyVerification={category === null ? certs?.alreadyVerification : filteredCerts?.alreadyVerification}
				onCertFilterChange={certFilterHandler}
				certFilter={category}
				curPage={curPage}
				onPageChange={(page: number) => setCurPage(page)}
				totalPages={
					category === null
						? certs?.certificationResponses?.totalPages
						: filteredCerts?.certificationResponses?.totalPages
				}
			/>
		</BaseLayout>
	);
}

export default CertListPage;
