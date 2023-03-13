import Button from 'app.components/App.base/Button';
import UploadGoal from 'app.features/GoalUpload/modalContents/UploadGoal';
import { modalState } from 'app.modules/store/modal';
import React from 'react';
import { useRecoilState } from 'recoil';
import BottomLayout from './common/BottomLayout';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';

function InitGoalBox() {
	const [modal, setModal] = useRecoilState(modalState);
	const openModalHandler = () => {
		setModal({ render: <UploadGoal />, isOpen: true });
	};
	return (
		<BoxLayout onOpenModal={openModalHandler} mode="init">
			<BoxImage bgUrl="/images/goalBox/init.svg" />
			<BottomLayout>
				<div className="flex items-center justify-between ">
					<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" className="w-[7.6rem] ">
						목표등록
					</Button>
					<div>🗓 지금</div>
				</div>
				<div className="text-left flex flex-col space-y-[0.3rem]">
					<span className="pc:text-body1-pc text-primaryBlack-200">일반,지속</span>
					<span className="pc:text-body6-pc ">목표인증을 시작하세요!</span>
				</div>
			</BottomLayout>
		</BoxLayout>
	);
}

export default InitGoalBox;
