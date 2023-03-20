import { modalState } from 'app.modules/store/modal';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { useRecoilState } from 'recoil';
import { GoalDataType, MappedCategory } from 'app.features/GoalManage/types';
import { CertDataType } from 'app.features/Certification/types';
import DetailCert from 'app.features/Certification/modalContents/DetailCert';
import Badge from 'app.components/App.base/Badge';
import { getRequireSuccess } from 'app.modules/utils/getRequireSuccess';
import { useNavigate } from 'react-router-dom';
import BoxLayout from './common/BoxLayout';
import BottomLayout from './common/BottomLayout';
import BottomText from './common/BottomText';

interface Props {
	certData: CertDataType;
	alreadyVerified: boolean;
}

function CertBox({ certData, alreadyVerified }: Props) {
	const { id, content, picture, state, date: certDate, successCount, failCount, oneTimeGoal, manyTimeGoal } = certData;
	const { year, month, date } = getKoreaToday();

	const todayString = formatDate(year, month, date);
	const [modal, setModal] = useRecoilState(modalState);
	const dday = getDayDiff(
		todayString,
		`${certDate.split('-')[0]}-${certDate.split('-')[1]}-${+certDate.split('-')[2] + 7}`
	);
	const closeModalHandler = () => {
		setModal({
			render: null,
			isOpen: false,
		});
	};
	const openModalHandler = () => {
		setModal({
			render: (
				<DetailCert
					certData={certData}
					goal={manyTimeGoal ?? (oneTimeGoal as GoalDataType)}
					dday={dday}
					onCloseModal={closeModalHandler}
				/>
			),
			isOpen: true,
		});
	};

	const isManyTimeGoal = () => {
		return Boolean(certData.manyTimeGoal !== undefined);
	};
	const getCategory = () => {
		if (isManyTimeGoal()) {
			if (certData?.manyTimeGoal === undefined) return '';
			const { categoryType } = certData.manyTimeGoal;
			return MappedCategory[categoryType];
		}
		if (certData?.oneTimeGoal === undefined) return '';
		const { categoryType } = certData.oneTimeGoal;
		return MappedCategory[categoryType];
	};

	return (
		<BoxLayout onOpenModal={openModalHandler}>
			<div
				className="h-1/2 bg-buttonGray-200 pc:rounded-t-[1.5rem] bg-cover border-t-[0.1rem] border-x-[0.1rem]   border-borderGray"
				style={{
					backgroundImage: `url(https://api.goalkeeper.co.kr${picture})`,
				}}
			/>

			{alreadyVerified && (
				<>
					<div className="inset-x-0 top-0 z-[100]  h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[1.5rem] text-white pc:text-body1-pc text-start space-x-[0.8rem]">
						검증완료
					</div>
					<div className="absolute inset-x-0 top-0 bg-black h-1/2 opacity-30 rounded-t-[1.6rem] z-[50]" />
				</>
			)}
			{/*하단에만 border 부여, 상부에도 부여하면 이미지가 꽉 안차보임. */}
			<BottomLayout>
				<div className="flex items-center justify-between ">
					<div className="flex space-x-[0.8rem]">
						<Badge bgColor="bg-buttonGray-200" textColor="text-primaryBlack-500">
							{getCategory()}
						</Badge>
						<Badge bgColor="bg-buttonRed-100" textColor="text-buttonRed-200">
							{successCount}/
							{getRequireSuccess(certData?.oneTimeGoal?.point ?? (certData?.manyTimeGoal?.point as number))}회
						</Badge>
					</div>
					{/*D-0 처리도 같이하기*/}
					<div className="pc:text-body2-pc">
						⏰ D-
						{dday}
					</div>
				</div>
				<BottomText goalTypeText={isManyTimeGoal() ? '지속' : '일반'} title={content} />
			</BottomLayout>
		</BoxLayout>
	);
}

export default CertBox;
