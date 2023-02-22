import Button from 'app.components/App.base/Button';
import { modalState } from 'app.modules/store/modal';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { useRecoilState } from 'recoil';
import DetailGoal from 'app.features/GoalManage/modalContents/DetailGoal';
import { CertType, GoalDataType, GoalStateType, MappedState } from 'app.features/GoalManage/types';
import { getDdayMessage } from 'app.features/GoalManage/utils/getDdayMessage';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';

interface Props {
	goalData: GoalDataType;
}

function GoalBox({ goalData }: Props) {
	const goalState: MappedState = {
		ONGOING: '진행중',
		WAITING_CERT_COMPLETE: '진행완료',
		SUCCESS: '성공',
		FAIL: '실패',
		HOLD: '실패',
	};
	const { id, state, certDates, certifications, certification, endDate, startDate, title } = goalData;
	const { year, month, date } = getKoreaToday();
	const todayString = formatDate(year, month, date);
	const [modal, setModal] = useRecoilState(modalState);
	const openModalHandler = () => {
		setModal({ render: <DetailGoal id={id} />, isOpen: true });
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
		if (isManyTimeGoal()) return state === 'ONGOING' && getDayDiff(todayString, certDates[0]) > 0;
		return state === 'ONGOING' && getDayDiff(todayString, endDate) > 0;
	};
	const getBoxMessage = () => {
		let res;

		switch (state) {
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
					if (certifications.length > 0) {
						const successCtn = certifications.filter((cert) => cert.state === 'SUCCESS').length;
						const failCtn = certifications.filter((cert) => cert.state === 'FAIL').length;

						// 소수점 첫째자리에서 반올림하기로 백엔드와 통일함
						res = `${Math.round((successCtn / certDates.length) * 100)}% (${successCtn}회 성공,${failCtn}회 실패)`;
					}
				} else res = '';
				break;
		}

		return res;
	};
	const getBgUrl = () => {
		let res = '';

		switch (state) {
			case 'WAITING_CERT_COMPLETE':
				res = isManyTimeGoal() ? certifications?.[certifications.length - 1]?.picture : certification?.picture ?? '';
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
		if (state === 'FAIL' || state === 'HOLD') return 'bg-buttonRed-100';
		if (state === 'SUCCESS') return 'bg-primaryOrange-100';
		return 'bg-buttonGray-200';
	};
	const getTextColor = () => {
		if (state === 'FAIL' || state === 'HOLD') return 'text-buttonRed-200';
		if (state === 'SUCCESS') return 'text-primaryOrange-200';
		return 'text-primaryBlack-500';
	};

	return (
		<BoxLayout openModalHandler={openModalHandler}>
			{!isJustRegister() && (
				<div className=" w-[27.7rem]   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[1.5rem] text-white pc:text-body1-pc text-start space-x-[0.8rem]">
					{state !== 'ONGOING' && <img alt="" src={`/images/goalBox/icon/${state}.svg`} />}
					{getBoxMessage()}
				</div>
			)}
			<BoxImage bgUrl={getBgUrl()} />
			{/*하단에만 border 부여, 상부에도 부여하면 이미지가 꽉 안차보임. */}
			<div className="h-1/2 p-[1.6rem] flex flex-col justify-between border-[0.1rem] rounded-b-[1.6rem] border-borderGray">
				<div className="flex items-center justify-between ">
					<Button variant="solid" size="xs" bgColor={getBgColor()} textColor={getTextColor()} className="w-[7.6rem] ">
						{goalState[state]}
					</Button>
					<div className="pc:text-body2-pc">
						🗓 {isManyTimeGoal() && <span />}
						{getDdayMessage({ state, endDate, isManyTimeGoal: isManyTimeGoal(), certDates, todayString })}
					</div>
				</div>
				<div className="text-left flex flex-col space-y-[0.3rem]">
					<span className="pc:text-body1-pc text-primaryOrange-200">{isManyTimeGoal() ? '지속' : '일반'}</span>
					<span className="pc:text-body6-pc ">{title}</span>
				</div>
			</div>
		</BoxLayout>
	);
}

export default GoalBox;
