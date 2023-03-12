import Button from 'app.components/App.base/Button';
import { modalState } from 'app.modules/store/modal';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { useRecoilState } from 'recoil';
import { GoalDataType, MappedCategory } from 'app.features/GoalManage/types';
import { CertDataType } from 'app.features/Certification/types';
import DetailCert from 'app.features/Certification/modalContents/DetailCert';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';
import BottomLayout from './common/BottomLayout';
import BottomText from './common/BottomText';

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
					onCloseModal={closeModalHandler}
				/>
			),
			isOpen: true,
		});
	};
	console.log(certData);
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
			<BoxImage bgUrl={`https://api.goalkeeper.co.kr${picture}`} />
			{/*하단에만 border 부여, 상부에도 부여하면 이미지가 꽉 안차보임. */}
			<BottomLayout>
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
				<BottomText goalTypeText={isManyTimeGoal() ? '지속' : '일반'} title={content} />
			</BottomLayout>
		</BoxLayout>
	);
}

export default CertBox;
