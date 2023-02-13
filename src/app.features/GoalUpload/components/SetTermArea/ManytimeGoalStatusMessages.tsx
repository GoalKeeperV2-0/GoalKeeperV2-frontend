import Button from 'app.components/App.base/Button';
import React from 'react';
interface Props {
	status: 'init' | 'selected';
	dayDiff: number;
}
function ManytimeGoalStatusMessages({ status, dayDiff }: Props) {
	return (
		<>
			{status === 'init' ? (
				<Button
					variant="solid"
					size="xs"
					bgColor="bg-buttonRed-100"
					textColor="text-buttonRed-200"
					className=" w-fit px-[0.8rem]"
				>
					왼쪽 달력에서 목표 마감일을 선택해주세요
				</Button>
			) : (
				<div className="flex flex-col space-y-[0.8rem]">
					<Button
						variant="solid"
						size="xs"
						bgColor="bg-primaryOrange-100"
						textColor="text-primaryOrange-200"
						className=" w-fit px-[0.8rem]"
					>
						목표기간은 총 {dayDiff}일
					</Button>
					<Button
						variant="solid"
						size="xs"
						bgColor="bg-buttonRed-100"
						textColor="text-buttonRed-200"
						className=" w-fit px-[0.8rem]"
					>
						최소 인증횟수는 ?회입니다
					</Button>
					<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" className="text-[#828282] w-fit px-[0.8rem]">
						?월 ?일 (마지막 날은 꼭 인증해야해요)
					</Button>
				</div>
			)}
		</>
	);
}

export default ManytimeGoalStatusMessages;
