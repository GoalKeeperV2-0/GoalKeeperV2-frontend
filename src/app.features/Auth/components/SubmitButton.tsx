import Button from 'app.components/App.base/Button';
import React from 'react';

interface Props {
	disabled?: boolean;
	children: React.ReactNode;
	isLoading: boolean;
}
function SubmitButton({ disabled, children, isLoading }: Props) {
	return (
		<Button
			type="submit"
			variant="solid"
			size="lg"
			bgColor={`${disabled ? 'bg-buttonGray-300' : 'bg-primaryOrange-200'}`}
			textColor={`${disabled ? 'text-buttonGray-400' : 'text-white'}`}
			disabled={disabled}
			isLoading={isLoading}
		>
			{children}
		</Button>
	);
}

export default SubmitButton;
