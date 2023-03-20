import React from 'react';

interface Props {
	maxLength: number;
	textLength: number;
}
function CountTextLength({ maxLength, textLength }: Props) {
	return (
		<span className="text-primaryBlack-300 pc:text-body2-pc">
			{textLength}/{maxLength}
		</span>
	);
}

export default CountTextLength;
