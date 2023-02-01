import React from 'react';
interface Props {
	children: React.ReactNode;
	title: string;
}
function OverviewTemplate({ title, children }: Props) {
	return (
		<div className="relative">
			<div className="text-[1.6rem] mb-[0.8rem] font-semibold leading-[1.92rem]">{title}</div>
			{children}
		</div>
	);
}

export default OverviewTemplate;
