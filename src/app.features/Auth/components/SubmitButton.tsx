import Button from 'app.components/Button';
import React from 'react';

interface Props {
	disabled: boolean;
}
function SubmitButton({ disabled }: Props) {
	return (
		<Button
			variant="solid"
			size="lg"
			bgColor={`${disabled ? 'buttonGray-300' : 'primaryOrange-200'}`}
			textColor={`${disabled ? 'buttonGray-400' : 'primaryWhite'}`}
			disabled={disabled}
		>
			이메일 인증
		</Button>
	);
}

export default SubmitButton;
