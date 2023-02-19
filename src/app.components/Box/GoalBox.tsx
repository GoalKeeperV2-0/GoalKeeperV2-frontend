import Button from 'app.components/App.base/Button';
import { formatDate } from 'app.modules/utils/formatDate';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import BoxImage from './common/BoxImage';
import BoxLayout from './common/BoxLayout';

type GoalStateType = 'ONGOING' | 'WAITING_CERT_COMPLETE' | 'SUCCESS' | 'FAIL' | 'HOLD';
type MappedState = { [K in GoalStateType]: string };
type CertType = {
	date: '2023-01-12';
	picture: string;
};
export type GoalDataType = {
	id: number;
	title: string;
	state: GoalStateType;
	endDate: string;
	certDates: string[];
	certification: Partial<CertType> | null;
	certifications: CertType[];
};

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
	const { state, certDates, certifications, certification, endDate } = goalData;

	const getDday = () => {};
	const getBgUrl = () => {
		let res = '';
		const { year, month, date } = getKoreaToday();

		switch (state) {
			case 'WAITING_CERT_COMPLETE':
				res = certDates ? `images/goalBox/manytime/ongoingInactive.svg` : certification?.picture ?? '';
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
					: certDates?.includes(formatDate(year, month, date))
					? '/images/goalBox/manytime/ongoingActive.svg'
					: '/images/goalBox/manytime/ongoingInactive.svg';

				// eslint-disable-next-line no-case-declarations
				const oneTimeUrl =
					endDate === formatDate(year, month, date)
						? '/images/goalBox/onetime/ongoingActive.svg'
						: '/images/goalBox/onetime/ongoingInactive.svg';

				res = certDates ? manyTimeUrl : oneTimeUrl;
				break;
		}

		return res;
	};
	return (
		<BoxLayout openModalHandler={() => null}>
			<BoxImage bgUrl={getBgUrl()} />
			<div className="h-1/2 p-[1.6rem] flex flex-col justify-between">
				<div className="flex items-center justify-between">
					<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" className="w-[7.6rem] ">
						{goalState[state]}
					</Button>
					<div>
						🗓 <span />
						<span />
					</div>
				</div>
				<div className="text-left flex flex-col space-y-[0.3rem]">
					<span className="pc:text-body1-pc text-primaryBlack-200">일반,지속</span>
					<span className="pc:text-body6-pc ">목표인증을 시작하세요!</span>
					<span className="pc:text-body1-pc text-primaryBlack-200">클릭해서 목표인증을 시작해요.</span>
				</div>
			</div>
		</BoxLayout>
	);
}

export default GoalBox;
