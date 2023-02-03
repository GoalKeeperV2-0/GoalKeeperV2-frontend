import Button from 'app.components/App.base/Button';
import React from 'react';
import { ReactComponent as ArrowRightIcon } from 'app.modules/assets/icons/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from 'app.modules/assets/icons/arrow-left.svg';
interface Props {
	direction: 'left' | 'right';
	disabled?: boolean;
	onClick: () => void;
}
function ArrowButton({ direction, disabled, onClick }: Props) {
	return (
		<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" onClick={onClick}>
			{direction === 'left' ? <ArrowLeftIcon className="mx-auto" /> : <ArrowRightIcon className="mx-auto" />}
		</Button>
	);
}

export default ArrowButton;
