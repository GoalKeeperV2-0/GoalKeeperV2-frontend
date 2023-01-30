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
			bgColor={`${disabled ? 'buttonGray-300' : 'primaryOrange-200'}`}
			textColor={`${disabled ? 'buttonGray-400' : 'white'}`}
			disabled={disabled}
			isLoading={isLoading}
		>
			{children}
		</Button>
	);
}

export default SubmitButton;
