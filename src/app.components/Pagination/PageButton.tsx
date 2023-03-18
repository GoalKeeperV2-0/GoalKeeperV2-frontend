import Button from 'app.components/App.base/Button';
import React from 'react';
interface Props {
	isActive: boolean;
	onClick: () => void;
	pageNum: number;
}
function PageButton({ isActive, onClick, pageNum }: Props) {
	return (
		<Button
			variant="solid"
			size="xs"
			bgColor={isActive ? 'bg-primaryOrange-200' : null}
			textColor={isActive ? 'text-white' : 'text-primaryBlack-500'}
			onClick={onClick}
			name="select page"
			className="pc:max-w-[3.4rem]"
		>
			{pageNum}
		</Button>
	);
}

export default PageButton;
