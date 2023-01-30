import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import SideBarButton from './SideBarButton';

function Aside() {
	const navigate = useNavigate();

	/*

	if (memberInfoLoading || menuInfoLoading)
		return (
			<div className="rounded-[16px] w-[278px] p-[24px] border-[1px] border-borderGray overflow-hidden bg-white h-[674px]" />
		);*/

	return (
		<aside className="mr-[2.8rem] rounded-[16px] w-[278px] p-[24px] border-[1px] border-borderGray overflow-hidden bg-white">
			<div className="border-b-[1px] border-borderGray pb-[16px] mb-[16px]">
				<div className="test-[22px] font-[600] leading-[30px] mb-[4px]">닉네임</div>
				<div className="text-[16px] text-primaryOrange-200 font-[600px] leading-[19px]">goalkeeper@gmail.com</div>
			</div>
			<div className="mb-[30px]">
				<div className="text-[16px] font-[600] leading-[19px] mb-[8px]">목표등록현황</div>
				<ul className="p-[16px] rounded-[8px] bg-primaryOrange-100 text-[16px] font-[500] leading-[19px]">
					<li className="flex justify-between mb-[16px]">
						<div className="flex items-center">목표 등록</div>
						<div className="text-primaryOrange-200"> 0</div>
					</li>
					<li className="flex justify-between mb-[16px]">
						<div className="flex items-center">목표 진행</div>
						<div className="text-primaryOrange-200">0</div>
					</li>
					<li className="flex justify-between mb-[16px]">
						<div className="flex items-center">목표 성공</div>
						<div className="text-primaryOrange-200">0</div>
					</li>
					<li className="flex justify-between">
						<div className="flex items-center">목표 실패</div>
						<div className="text-primaryOrange-200">0</div>
					</li>
				</ul>
			</div>
			<div className="mb-[30px]">
				<div className="text-[16px] font-[600] leading-[19px] mb-[8px]">목표등록현황</div>
				<Link to="#">
					<div className="mb-[7px]">
						<SideBarButton onClick={() => {}} bgColor="orange">
							<div className="flex justify-between w-full">
								<span className="flex-1 text-left truncate text-primaryWhite">이젠정말살을빼자</span>
								<span className="text-primaryWhite ml-[10px]">
									📅 {new Date('2023-04-04').getMonth() + 1}. {new Date('2023-04-16').getDate()}
								</span>
							</div>
						</SideBarButton>
					</div>
				</Link>
			</div>
			<div className="mb-[30px]">
				<div className="text-[16px] font-[600] leading-[19px] mb-[8px]">목표인증현황</div>

				<Link to="#">
					<div className="mb-[7px]">
						<SideBarButton onClick={() => {}} bgColor="black">
							<div className="flex justify-between w-full">
								<span className="flex-1 text-left truncate text-primaryWhite">고구마</span>
								<span className="text-primaryWhite ml-[10px]"># 라떼</span>
							</div>
						</SideBarButton>
					</div>
				</Link>
			</div>

			<div>
				<div className="text-[16px] font-[600] leading-[19px] mb-[8px]">내 목표머니</div>
				<div className="text-[22px] font-[600] leading-[30px] mb-[4px]">0원</div>
				<div className="flex gap-[10px]">
					<SideBarButton label="충전" onClick={() => null} bgColor="gray" />
					<SideBarButton label="이체" onClick={() => null} bgColor="gray" />
				</div>
			</div>
		</aside>
	);
}

export default Aside;
