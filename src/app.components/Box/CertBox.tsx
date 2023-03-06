import Button from 'app.components/App.base/Button';
import { modalState } from 'app.modules/store/modal';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { useRecoilState } from 'recoil';
import DetailGoal from 'app.features/GoalManage/modalContents/DetailGoal';
import { GoalDataType, MappedCategory, MappedGoalState } from 'app.features/GoalManage/types';
import { getDdayMessage } from 'app.features/GoalManage/utils/getDdayMessage';
import { CertDataType } from 'app.features/Certification/types';
import DetailCert from 'app.features/Certification/modalContents/DetailCert';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';

interface Props {
	certData: CertDataType;
}

function CertBox({ certData }: Props) {
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
					closeModalHandler={closeModalHandler}
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
		<BoxLayout openModalHandler={openModalHandler}>
			<BoxImage bgUrl={picture} />
			{/*하단에만 border 부여, 상부에도 부여하면 이미지가 꽉 안차보임. */}
			<div className="h-1/2 p-[1.6rem] flex flex-col justify-between border-[0.1rem] rounded-b-[1.6rem] border-borderGray">
				<div className="flex items-center justify-between ">
					<Button
						variant="solid"
						size="xs"
						bgColor="bg-buttonGray-200"
						textColor="text-primaryBlack-500"
						className="w-[7.6rem]"
					>
						{getCategory()}
					</Button>
					{/*D-0 처리도 같이하기*/}
					<div className="pc:text-body2-pc">
						⏰ D-
						{dday}
					</div>
				</div>
				<div className="text-left flex flex-col space-y-[0.3rem]">
					<span className="pc:text-body1-pc text-primaryOrange-200">{isManyTimeGoal() ? '지속' : '일반'}</span>
					<span className="pc:text-body6-pc ">{content}</span>
				</div>
			</div>
		</BoxLayout>
	);
}

export default CertBox;
