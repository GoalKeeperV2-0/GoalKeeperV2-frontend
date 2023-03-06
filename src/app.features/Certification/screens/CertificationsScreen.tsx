import CertBox from 'app.components/Box/CertBox';
import FilterButton from 'app.components/FilterButton';
import { MY_CERTS } from 'app.features/Certification/mockData';
import { CategoryType, GoalDataType, MappedCategory } from 'app.features/GoalManage/types';
import React, { useState } from 'react';

const mappedCertFilter = {
	ALL: '전체',
	...MappedCategory,
};
function CertificationsScreen() {
	type FilterType = CategoryType | 'ALL';
	const [filter, setFilter] = useState<FilterType>('ALL');

	return (
		<div className="space-y-[3rem]">
			<h3>목표인증</h3>

			<ul className="flex space-x-[0.8rem]">
				{Object.entries(mappedCertFilter).map(([key, value]) => (
					<li key={key}>
						<FilterButton
							isPressed={filter === key}
							name="goalFilter"
							value={key}
							onClick={() => setFilter(key as FilterType)}
						>
							{value}
						</FilterButton>
					</li>
				))}
			</ul>
			<ul className="grid grid-cols-3 gap-[3rem]">
				{MY_CERTS.map((cert, index) => (
					<li key={index}>
						<CertBox certData={cert} />
					</li>
				))}
			</ul>

			<div>페이지네이션</div>
		</div>
	);
}

export default CertificationsScreen;
