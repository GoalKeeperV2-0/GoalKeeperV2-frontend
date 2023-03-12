import Button from 'app.components/App.base/Button';
import { modalState } from 'app.modules/store/modal';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { useRecoilState } from 'recoil';
import DetailGoal from 'app.features/GoalManage/modalContents/DetailGoal';
import { GoalDataType, GoalStateType, MappedState } from 'app.features/GoalManage/types';
import { getDdayMessage } from 'app.features/GoalManage/utils/getDdayMessage';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';
import BottomLayout from './common/BottomLayout';
import BottomText from './common/BottomText';

interface Props {
	goalData: GoalDataType;
}

function GoalBox({ goalData }: Props) {
	const mappedGoalState: MappedState = {
		// TODO: types폴더로 옮기기
		ONGOING: '진행중',
		WAITING_CERT_COMPLETE: '진행완료',
		SUCCESS: '성공',
		FAIL: '실패',
		HOLD: '실패',
	};
	const { id, goalState, certDates, certifications, endDate, title } = goalData;
	const { year, month, date } = getKoreaToday();
	const todayString = formatDate(year, month, date);
	const [modal, setModal] = useRecoilState(modalState);
	const openModalHandler = () => {
		setModal({ render: <DetailGoal goal={goalData} />, isOpen: true });
	};
	// TODO: 함수 네이밍 조정
	const isCertDate = () => {
		return endDate === todayString || certDates?.includes(formatDate(year, month, date));
	};
	const isManyTimeGoal = () => {
		return certDates !== undefined;
	};
	// 목표 등록 상태
	const isJustRegister = () => {
		if (isManyTimeGoal()) return goalState === 'ONGOING' && getDayDiff(todayString, (certDates ?? [])[0]) > 0;
		return goalState === 'ONGOING' && getDayDiff(todayString, endDate) > 0;
	};
	const getBoxMessage = () => {
		let res;

		switch (goalState) {
			case 'WAITING_CERT_COMPLETE':
				res = '정산은 일주일 정도 소요돼요';
				break;
			case 'SUCCESS':
				res = '보상금 지급 완료';
				break;
			case 'FAIL':
				res = '보상금 지급 실패';
				break;
			case 'HOLD':
				res = '검토요청';

				break;
			default:
				if (isCertDate()) {
					res = '목표인증을 해주세요!';
				} else if (isManyTimeGoal()) {
					if ((certifications ?? []).length > 0) {
						const successCtn = (certifications ?? []).filter((cert) => cert.state === 'SUCCESS').length;
						const failCtn = (certifications ?? []).filter((cert) => cert.state === 'FAIL').length;

						// 소수점 첫째자리에서 반올림하기로 백엔드와 통일함
						res = `${Math.round(
							(successCtn / (certDates ?? []).length) * 100
						)}% (${successCtn}회 성공,${failCtn}회 실패)`;
					}
				} else res = '';
				break;
		}

		return res;
	};
	const getBgUrl = () => {
		let res = '';

		switch (goalState) {
			case 'WAITING_CERT_COMPLETE':
				res = `https://api.goalkeeper.co.kr${(certifications ?? [])?.[(certifications ?? []).length - 1]?.picture}`;

				break;
			case 'SUCCESS':
				res = '/images/goalBox/success.svg';
				break;
			case 'FAIL':
				res = '/images/goalBox/fail.svg';
				break;
			case 'HOLD':
				res = '/images/goalBox/hold.svg';
				break;
			default:
				// eslint-disable-next-line no-case-declarations, no-nested-ternary
				const manyTimeUrl = certifications?.[certifications.length - 1]?.picture
					? certifications?.[certifications.length - 1]?.picture
					: isCertDate()
					? '/images/goalBox/manytime/ongoingActive.svg'
					: '/images/goalBox/manytime/ongoingInactive.svg';

				// eslint-disable-next-line no-case-declarations
				const oneTimeUrl = isCertDate()
					? '/images/goalBox/onetime/ongoingActive.svg'
					: '/images/goalBox/onetime/ongoingInactive.svg';

				res = isManyTimeGoal() ? manyTimeUrl : oneTimeUrl;
				break;
		}

		return res;
	};
	const getBgColor = () => {
		if (goalState === 'FAIL' || goalState === 'HOLD') return 'bg-buttonRed-100';
		if (goalState === 'SUCCESS') return 'bg-primaryOrange-100';
		return 'bg-buttonGray-200';
	};
	const getTextColor = () => {
		if (goalState === 'FAIL' || goalState === 'HOLD') return 'text-buttonRed-200';
		if (goalState === 'SUCCESS') return 'text-primaryOrange-200';
		return 'text-primaryBlack-500';
	};

	return (
		<BoxLayout onOpenModal={openModalHandler}>
			{!isJustRegister() && (
				<div className="inset-x-0   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[1.5rem] text-white pc:text-body1-pc text-start space-x-[0.8rem]">
					{goalState !== 'ONGOING' && <img alt="" src={`/images/goalBox/icon/${goalState}.svg`} />}
					{getBoxMessage()}
				</div>
			)}
			<BoxImage bgUrl={getBgUrl()} />
			{/*하단에만 border 부여, 상부에도 부여하면 이미지가 꽉 안차보임. */}
			<BottomLayout>
				<div className="flex items-center justify-between ">
					{/* TODO: 레이아웃을 div로 바꾸든지 해야할듯. 문제의 버튼 */}
					<Button variant="solid" size="xs" bgColor={getBgColor()} textColor={getTextColor()} className="w-[7.6rem] ">
						{mappedGoalState[goalState as GoalStateType]}
					</Button>
					<div className="pc:text-body2-pc">
						🗓 {isManyTimeGoal() && <span />}
						{getDdayMessage({
							goalState: goalState as GoalStateType,
							endDate,
							isManyTimeGoal: isManyTimeGoal(),
							certDates,
							todayString,
						})}
					</div>
				</div>
				<BottomText goalTypeText={isManyTimeGoal() ? '지속' : '일반'} title={title} />
			</BottomLayout>
		</BoxLayout>
	);
}

export default GoalBox;
