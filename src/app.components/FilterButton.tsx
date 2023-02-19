import React from 'react';
import Button from './App.base/Button';
interface Props {
	children: React.ReactNode;
	isPressed: boolean;
	name: string;
	value: string;
	onClick: () => void;
}
function FilterButton({ children, isPressed, name, value, onClick }: Props) {
	return (
		<Button
			name={name}
			value={value}
			onClick={onClick}
			variant="solid"
			size="sm"
			bgColor={isPressed ? 'bg-primaryBlack-500' : 'bg-buttonGray-300'}
			textColor={isPressed ? 'text-white' : 'text-primaryBlack-500'}
			className="px-[1.6rem] "
		>
			{children}
		</Button>
	);
}

export default FilterButton;
