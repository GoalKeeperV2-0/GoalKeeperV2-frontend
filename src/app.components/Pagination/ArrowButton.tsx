import Button from 'app.components/App.base/Button';
import React from 'react';
import { ReactComponent as ArrowRightIcon } from 'app.modules/assets/icons/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from 'app.modules/assets/icons/arrow-left.svg';
interface Props {
	direction: 'left' | 'right';
	disabled?: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
}
function ArrowButton({ direction, disabled, onClick, name }: Props) {
	return (
		<Button
			variant="solid"
			size="xs"
			bgColor="bg-buttonGray-200"
			onClick={onClick}
			name={name}
			className="max-w-[3.4rem]"
			disabled={disabled}
		>
			{direction === 'left' ? (
				<ArrowLeftIcon className="mx-auto w-[3.4rem]" fill={`${disabled ? '#C1C1C1' : '#000000'}`} />
			) : (
				<ArrowRightIcon className="mx-auto w-[3.4rem]" fill={`${disabled ? '#C1C1C1' : '#000000'}`} />
			)}
		</Button>
	);
}

export default ArrowButton;
