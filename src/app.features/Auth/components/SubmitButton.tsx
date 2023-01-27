import Button from 'app.components/Button';
import React from 'react';

interface Props {
	disabled?: boolean;
	children: React.ReactNode;
	isLoading: boolean;
	onClick: () => void;
}
function SubmitButton({ disabled, children, isLoading, onClick }: Props) {
	return (
		<Button
			onClick={onClick}
			variant="solid"
			size="lg"
			bgColor={`${!disabled ? 'primaryOrange-200' : 'buttonGray-300'}`}
			textColor={`${!disabled ? 'white' : 'buttonGray-400'}`}
			disabled={disabled}
			isLoading={isLoading}
		>
			{children}
		</Button>
	);
}

export default SubmitButton;
