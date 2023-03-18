import CertBox from 'app.components/Box/CertBox';
import FilterButton from 'app.components/FilterButton';
import Pagination from 'app.components/Pagination';
import { CategoryType, MappedCategory } from 'app.features/GoalManage/types';
import React, { useState } from 'react';
import { CertDataType } from '../types';

const mappedCertFilter = {
	ALL: '전체',
	...MappedCategory,
};
interface Props {
	certs: CertDataType[];
	onCertFilterChange: (filter: CategoryType | null) => void;
	certFilter: CategoryType | null;
	curPage: number;
	onPageChange: (page: number) => void;
	totalPages: number;
}
function CertificationsScreen({ certs, onCertFilterChange, certFilter, curPage, onPageChange, totalPages }: Props) {
	return (
		<div className="space-y-[3rem]">
			<h3>목표인증</h3>

			<ul className="flex space-x-[0.8rem]">
				{Object.entries(mappedCertFilter).map(([key, value]) => (
					<li key={key}>
						<FilterButton
							isPressed={(certFilter === null && key === 'ALL') || certFilter === key}
							name="certFilter"
							value={key}
							onClick={() => {
								if (key === 'ALL') {
									onCertFilterChange(null);
									return;
								}
								onCertFilterChange(key as CategoryType);
							}}
						>
							{value}
						</FilterButton>
					</li>
				))}
			</ul>
			<ul className="grid grid-cols-3 gap-[3rem] ] min-h-[93.3rem]">
				{certs?.map((cert, index) => (
					<li key={index}>
						<CertBox certData={cert} />
					</li>
				))}
			</ul>

			<Pagination curPage={curPage} onPageChange={onPageChange} totalPages={totalPages} numOfPageBtn={5} />
		</div>
	);
}

export default CertificationsScreen;
