import React from 'react';
interface Props {
	color: 'primaryRed-300' | 'primaryOrange-200' | null;
	content: string;
}
function ErrorMessage({ color, content }: Props) {
	return (
		<p
			className={`text-${
				color ?? 'inherit'
			} block font-semibold text-[1rem] h-[1.2rem] pc:h-[1.68rem] pc:text-[1.4rem]`}
		>
			{content}
		</p>
	);
}

export default ErrorMessage;
