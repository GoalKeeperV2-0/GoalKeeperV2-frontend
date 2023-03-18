/* eslint-disable react/no-array-index-key */
import React from 'react';
import ArrowButton from './ArrowButton';
import PageButton from './PageButton';

interface Props {
	totalPages: number;
	numOfPageBtn: number;
	onPageChange: (page: number) => void;
	curPage: number;
}
function Pagination({ totalPages, onPageChange, curPage, numOfPageBtn }: Props) {
	const isLastPage = Math.trunc(curPage / numOfPageBtn) >= Math.trunc(totalPages / numOfPageBtn);
	const curPageNum = Math.trunc(curPage / numOfPageBtn) * numOfPageBtn;
	return (
		<div className="w-full flex justify-center items-center space-x-2">
			<ArrowButton
				direction="left"
				disabled={Math.trunc(curPage / numOfPageBtn) < 1}
				onClick={() => {
					onPageChange(numOfPageBtn * Math.trunc((curPage - numOfPageBtn) / numOfPageBtn));
				}}
				name="prev page"
			/>
			{[...Array(isLastPage ? totalPages % numOfPageBtn : numOfPageBtn)].map((_, idx) => {
				return (
					<PageButton
						key={idx + 1}
						isActive={curPage === curPageNum + idx}
						pageNum={curPageNum + idx + 1}
						onClick={() => onPageChange(idx + curPageNum)}
					/>
				);
			})}
			<ArrowButton
				direction="right"
				disabled={isLastPage}
				onClick={() => {
					onPageChange(numOfPageBtn * Math.trunc((curPage + numOfPageBtn) / numOfPageBtn));
				}}
				name="next page"
			/>
		</div>
	);
}

export default Pagination;
