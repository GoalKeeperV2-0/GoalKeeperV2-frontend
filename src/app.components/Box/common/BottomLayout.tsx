import React from 'react';

interface Props {
	children: React.ReactNode;
}
function BottomLayout({ children }: Props) {
	return (
		<div className="h-1/2 p-[1.6rem] flex flex-col justify-between border-[0.1rem]  rounded-b-[1.6rem]  border-borderGray">
			{children}
		</div>
	);
}

export default BottomLayout;
