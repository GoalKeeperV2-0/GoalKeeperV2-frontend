import React from 'react';

interface Props {
	children: React.ReactNode;
	openModalHandler: () => void;
	mode?: 'init' | 'default';
}
function BoxLayout({ children, openModalHandler, mode = 'default' }: Props) {
	return (
		<button
			onClick={openModalHandler}
			type="button"
			className={`${
				mode === 'init' ? 'text-[#828282]' : 'text-primaryBlack-500'
			} rounded-[0.8rem] pc:rounded-[1.6rem]  pc:w-[27.7rem]  pc:h-[31.4rem]   relative`}
		>
			{children}
		</button>
	);
}

export default BoxLayout;
