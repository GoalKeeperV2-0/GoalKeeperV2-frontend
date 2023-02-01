import Button from 'app.components/Button';
import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import OverviewTemplate from './OverviewTemplate';

import SideBarButton from './SideBarButton';
// TODO: field & value mapping 시키기
function Aside() {
	const navigate = useNavigate();

	/*

	if (memberInfoLoading || menuInfoLoading)
		return (
			<div className="rounded-[16px] w-[278px] p-[24px] border-[1px] border-borderGray overflow-hidden bg-white h-[674px]" />
		);*/
	const OverviewData = [
		{ field: '목표 등록', value: 4 },
		{ field: '목표 인증', value: 2 },
		{ field: '목표 성공', value: 9 },
		{ field: '목표 실패', value: 1 },
	];
	return (
		<aside className="min-w-[27.8rem] mr-[2.8rem] rounded-[1.6rem] w-[27.8rem] p-[2.4rem] border-[0.1rem] border-borderGray  bg-white space-y-[1.6rem]">
			<div className="border-b-[0.1rem] border-borderGray pb-[1.6rem] mb-[16px]">
				<div className="test-[22px] font-[600] leading-[30px] mb-[4px]">닉네임</div>
				<div className="text-[16px] text-primaryOrange-200 font-[600px] leading-[19px]">goalkeeper@gmail.com</div>
			</div>
			<div className="space-y-[3rem]">
				<OverviewTemplate title="전체 목표현황">
					<ul className="p-[1.6rem] rounded-[0.8rem] bg-primaryOrange-100 pc:text-body1-pc space-y-[1.6rem]">
						{OverviewData.map((data) => (
							<li className="flex justify-between ">
								<div className="flex items-center">{data.field}</div>
								<div className="text-primaryOrange-200">{data.value}</div>
							</li>
						))}
					</ul>
				</OverviewTemplate>
				<OverviewTemplate title="목표등록현황">
					<span className="absolute top-0 right-0 text-[1.6rem] mb-[0.8rem] font-semibold leading-[1.92rem] text-primaryBlack-200">
						더보기
					</span>
					<div className="space-y-[0.7rem]">
						<Button size="sm" variant="solid" bgColor="bg-primaryOrange-200" textColor="text-white" onClick={() => {}}>
							<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
								<span>이젠정말살을빼자</span>
								<span>
									🗓 {new Date('2023-04-04').getMonth() + 1}.{new Date('2023-04-16').getDate()}
								</span>
							</div>
						</Button>
						<Button size="sm" variant="solid" bgColor="bg-primaryOrange-200" textColor="text-white" onClick={() => {}}>
							<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
								<span>이젠정말살을빼자</span>
								<span>
									🗓 {new Date('2023-04-04').getMonth() + 1}.{new Date('2023-04-16').getDate()}
								</span>
							</div>
						</Button>
						<Button size="sm" variant="solid" bgColor="bg-buttonGray-200" onClick={() => {}}>
							<span className="text-center  truncate text-[1.6rem] leading-[1.92rem]">목표등록 추가</span>
						</Button>
					</div>
				</OverviewTemplate>
				<OverviewTemplate title="목표인증현황">
					<span className="absolute top-0 right-0 text-[1.6rem] mb-[0.8rem] font-semibold leading-[1.92rem] text-primaryBlack-200">
						더보기
					</span>
					<div className="space-y-[0.7rem]">
						<Button size="sm" variant="solid" bgColor="bg-primaryBlack-500" textColor="text-white" onClick={() => {}}>
							<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
								<span>고구마</span>
								<span>0/10회</span>
							</div>
						</Button>
						<Button size="sm" variant="solid" bgColor="bg-primaryBlack-500" textColor="text-white" onClick={() => {}}>
							<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
								<span>고구마</span>
								<span>0/10회</span>
							</div>
						</Button>
					</div>
				</OverviewTemplate>
				<OverviewTemplate title="적립 포인트">
					<div className="space-y-[0.4rem]">
						<span className="text-[2.2rem]  leading-[3rem]">0Ball</span>
					</div>
				</OverviewTemplate>
			</div>
		</aside>
	);
}

export default Aside;
