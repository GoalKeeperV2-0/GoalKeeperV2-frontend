import { useQuery } from '@tanstack/react-query';
import Button from 'app.components/App.base/Button';
import DetailGoal from 'app.features/GoalManage/modalContents/DetailGoal';
import { GoalDataType, MappedCategory } from 'app.features/GoalManage/types';
import UploadOnetimeGoal from 'app.features/GoalUpload/modalContents/UploadGoal';
import { getTodayCertGoal, getUserPoints, getUserStatistics } from 'app.modules/api/overview';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { useMyGoals } from 'app.modules/hooks/useMyGoals';
import { modalState } from 'app.modules/store/modal';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getTodayString } from 'app.modules/utils/getTodayString';

import React from 'react';
import { ReactComponent as BallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserProfile } from 'app.modules/api/user';
import OverviewTemplate from './OverviewTemplate';

import SideBarButton from './SideBarButton';
// TODO: field & value mapping 시키기
function Aside() {
	const [modal, setModal] = useRecoilState(modalState);
	const { data: userStatisticsData } = useQuery(['user', 'statistics'], getUserStatistics, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { data: user } = useQuery(['user'], getUserProfile, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const { data: userPoints } = useQuery(['user', 'statistics', 'point'], getUserPoints, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const { data: todayCertGoal } = useQuery(['user', 'statistics', 'todayCert'], getTodayCertGoal, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const UserStatisticsMap = {
		totalGoalCount: '등록한 목표',
		totalOngoingGoalCount: '진행중인 목표',
		totalSuccessGoalCount: '성공한 목표',
		totalFailGoalCount: '실패한 목표',
	};
	const closeModalHandler = () => {
		setModal({
			render: null,
			isOpen: false,
		});
	};
	const openModalHandler = (goalData: GoalDataType) => {
		setModal({ render: <DetailGoal goal={goalData} onCloseModal={closeModalHandler} />, isOpen: true });
	};

	return (
		<aside className="h-fit min-w-[27.8rem] mr-[2.8rem] rounded-[1.6rem] w-[27.8rem] p-[2.4rem] border-[0.1rem] border-borderGray  bg-white space-y-[2rem]">
			<div className="space-y-[0.4rem]">
				<div className="pc:text-body6-pc ">{user?.name}</div>
				<div className="pc:text-body2-pc text-primaryOrange-200 ">{user?.email}</div>
			</div>
			<div className="space-y-[3rem]">
				<OverviewTemplate title="">
					<ul className="p-[1.6rem]   rounded-[0.8rem] bg-buttonGray-100 pc:text-body1-pc space-y-[1.6rem]">
						{Object.entries(UserStatisticsMap)?.map(([key, value], index) => (
							<li className="flex justify-between items-center" key={index}>
								<div className="flex items-center">{value}</div>
								<div className="text-primaryOrange-200">{userStatisticsData?.[key]}</div>
							</li>
						))}
					</ul>
				</OverviewTemplate>
				<OverviewTemplate title="오늘 인증해주세요">
					<Link to={SERVICE_URL.manageGoal}>
						<span className="absolute top-0 right-0 text-[1.6rem] mb-[0.8rem] font-semibold leading-[1.92rem] text-primaryBlack-200">
							더보기
						</span>
					</Link>
					<ul className="space-y-[0.7rem]">
						{todayCertGoal?.map((goal: GoalDataType) => (
							<Button
								key={goal.id}
								size="sm"
								variant="solid"
								bgColor="bg-primaryOrange-200"
								textColor="text-white"
								onClick={() => openModalHandler(goal)}
							>
								<div className="flex justify-between w-full h-full p-[1.6rem] truncate text-[1.6rem] leading-[1.92rem]">
									<span className="truncate">{goal.title}</span>
									<span>🗓 지금</span>
								</div>
							</Button>
						))}

						<Button
							size="sm"
							variant="solid"
							bgColor="bg-buttonGray-200"
							onClick={() => setModal({ render: <UploadOnetimeGoal />, isOpen: true })}
						>
							<span className="text-center  truncate text-[1.6rem] leading-[1.92rem]">목표등록 하기</span>
						</Button>
					</ul>
				</OverviewTemplate>

				<OverviewTemplate title="포인트">
					<ul className="p-[1.6rem] rounded-[0.8rem] bg-buttonGray-100 pc:text-body1-pc space-y-[1.6rem]">
						<li className="flex justify-between items-center">
							<div className="flex items-center text-primaryOrange-200">사용 가능</div>
							<div className="flex items-center space-x-[0.6rem]">
								<span>{userPoints?.usablePoint.toLocaleString()}</span>
								<BallIcon className="w-[1.6rem] h-[1.6rem]" />
							</div>
						</li>
						{Object.entries(MappedCategory).map(([key, value], index) => (
							<li className="flex justify-between items-center pc:text-body1-pc" key={index}>
								<div>{value}</div>
								<div className="flex items-center space-x-[0.6rem]">
									<span>{userPoints?.categoryPoints?.[key].toLocaleString()}</span>
									<BallIcon className="w-[1.6rem] h-[1.6rem]" />
								</div>
							</li>
						))}
					</ul>
				</OverviewTemplate>
			</div>
		</aside>
	);
}

export default Aside;
