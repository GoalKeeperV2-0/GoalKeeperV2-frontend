/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

interface Props {
	children: React.ReactNode;
}
function AuthLayout({ children }: Props) {
	return (
		<div className=" mx-auto overflow-hidden h-full pc:w-[1200px] pc:h-[762px]  pc:mt-[20px] pc:flex pc:justify-between">
			{children}
		</div>
	);
}

export default AuthLayout;
