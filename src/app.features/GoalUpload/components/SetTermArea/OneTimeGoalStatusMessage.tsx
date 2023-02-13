import Button from 'app.components/App.base/Button';
import React from 'react';

interface Props {
	status: 'init' | 'selected';
}
function OnetimeGoalStatusMessage({ status }: Props) {
	return (
		<Button
			variant="solid"
			size="xs"
			bgColor={status === 'init' ? 'bg-buttonRed-100' : 'bg-primaryOrange-100'}
			textColor={status === 'init' ? 'text-buttonRed-200' : 'text-primaryOrange-200'}
			className=" w-fit px-[0.8rem]"
		>
			{status === 'init' ? '왼쪽 달력에서 목표 마감일을 선택해주세요' : '목표 기간 중 하루만 인증하면 돼요 👍🏻'}
		</Button>
	);
}

export default OnetimeGoalStatusMessage;
