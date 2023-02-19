import Button from 'app.components/App.base/Button';
import { ReactComponent as CancelIcon } from 'app.modules/assets/icons/calendar/cancel.svg';
import React from 'react';
interface Props {
	status: 'init' | 'selected';
	term: number;
	endDate: string;
	certDates: string[];
	deleteCertDateHandler: (date: string) => void;
}
function ManytimeGoalStatusMessages({ status, term, endDate, certDates, deleteCertDateHandler }: Props) {
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
						목표기간은 총 {term}일
					</Button>
					<Button
						variant="solid"
						size="xs"
						bgColor={certDates.length < 3 ? 'bg-buttonRed-100' : 'bg-primaryOrange-100'}
						textColor={certDates.length < 3 ? 'text-buttonRed-200' : 'text-primaryOrange-200'}
						className=" w-fit px-[0.8rem]"
					>
						{certDates.length
							? `${
									certDates.length < 3
										? `최소 인증횟수까지 ${3 - certDates.length}회 남았어요`
										: '최소 인증횟수를 모두 달성했어요 👍🏻'
							  }`
							: '최소 인증횟수는 4회입니다'}
					</Button>
					<div className="flex flex-wrap gap-[0.8rem]  whitespace-nowrap">
						{certDates.map((item, index) => (
							<Button
								key={index}
								variant="solid"
								size="xs"
								bgColor="bg-buttonGray-200"
								className="text-[#828282] w-fit px-[0.8rem]  flex items-center space-x-[1rem]"
							>
								<span>
									{+item.split('-')[1]}월 {+item.split('-')[2]}일
								</span>
								<button type="button" onClick={() => deleteCertDateHandler(item)}>
									<CancelIcon />
								</button>
							</Button>
						))}
					</div>
					<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" className="text-[#828282] w-fit px-[0.8rem]">
						{+endDate.split('-')[1]}월 {+endDate.split('-')[2]}일 (마지막 날은 꼭 인증해야해요)
					</Button>
				</div>
			)}
		</>
	);
}

export default ManytimeGoalStatusMessages;
