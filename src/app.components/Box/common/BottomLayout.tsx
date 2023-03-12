import React from 'react';

interface Props {
	children: React.ReactNode;
}
function BottomLayout({ children }: Props) {
	return (
		<div className="h-1/2 p-[1.6rem] flex flex-col justify-between border-t-[0.1rem]  border-borderGray">
			{children}
		</div>
	);
}

export default BottomLayout;
