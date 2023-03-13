import React from 'react';

interface Props {
	title: string;
}
function BoxTitle({ title }: Props) {
	return (
		<div className="max-w-[19rem] w-[19rem] overflow-hidden  whitespace-normal">
			<p className="pc:text-body7-pc   ">
				{title.slice(0, 26)}
				{title.length > 26 && '...'}
			</p>
		</div>
	);
}

export default BoxTitle;
