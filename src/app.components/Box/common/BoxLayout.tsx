import React from 'react';

interface Props {
	children: React.ReactNode;
	onOpenModal: () => void;
	mode?: 'init' | 'default';
}
function BoxLayout({ children, onOpenModal, mode = 'default' }: Props) {
	return (
		<button
			onClick={onOpenModal}
			type="button"
			className={`${
				mode === 'init' ? 'text-[#828282]' : 'text-primaryBlack-500'
			} rounded-[0.8rem] pc:rounded-[1.6rem]   pc:w-[27.7rem]  pc:h-[29.1rem]   relative`}
		>
			{children}
		</button>
	);
}

export default BoxLayout;
