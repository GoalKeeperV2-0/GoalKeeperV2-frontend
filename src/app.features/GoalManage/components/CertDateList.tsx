import Button from 'app.components/App.base/Button';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { CertStateType, CertType, MappedCertState } from '../types';
interface Props {
	certDates?: string[];
	certifications: CertType[] | null;
	endDate: string;
	todayString: string;
	onSelectCert: (index: number) => void;
}
// TODO: 인증일에 인증 안올린 경우 처리 -> UI 처리도 필요
function CertDateList({ certifications, certDates, endDate, todayString, onSelectCert }: Props) {
	const getDateString = (certDate: string) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const [_, goalMonth, goalDate] = certDate.split('-');
		return `${+goalMonth}월 ${+goalDate}일`;
	};
	const getDday = (certDate: string) => {
		return getDayDiff(todayString, certDate);
	};
	const getBgColor = (certDate: string, index: number) => {
		if (certifications === null) return 'bg-buttonGray-200';
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'bg-buttonRed-100';
		if (certifications[index]?.state === 'ONGOING') return 'bg-primaryOrange-100';
		if (certifications[index]?.state === 'SUCCESS') return 'bg-primaryOrange-200';

		if (dday === 0) return 'bg-primaryBlack-500';
		return 'bg-buttonGray-200';
	};
	const getTextColor1 = (certDate: string, index: number) => {
		if (certifications === null) return 'text-[#828282]';
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'text-primaryRed-200';
		if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
		if (certifications[index]?.state === 'SUCCESS') return 'text-white';

		if (dday === 0) return 'text-white';
		return 'text-[#828282]';
	};
	const getTextColor2 = (certDate: string, index: number) => {
		if (certifications === null) return 'text-primaryOrange-200';
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'text-buttonRed-200';
		if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
		if (certifications[index]?.state === 'SUCCESS') return 'text-primaryOrange-200';

		if (dday === 0) return 'text-primaryBlack-500';
		return 'text-primaryOrange-200';
	};
	const getMessage = (certDate: string, index: number) => {
		if (certifications === null) return '';
		const dday = getDday(certDate);
		if (dday === 0 && !certifications[index]) return '인증';
		return MappedCertState[certifications[index]?.state as CertStateType] ?? '실패';
	};
	return (
		<ul className="space-y-[0.8rem]">
			{(certDates ?? [endDate]).map((item, index) => (
				<Button
					key={index}
					onClick={() => onSelectCert(index)}
					variant="solid"
					size="xs"
					bgColor={getBgColor(item, index)}
					className="text-[#828282] flex items-center  space-x-[1.6rem] w-fit p-[0.8rem]"
				>
					<span className={`${getTextColor1(item, index)}`}>{getDateString(item)}</span>
					{getDday(item) <= 0 ? (
						<span
							className={` ${getTextColor2(
								item,
								index
							)} bg-white rounded-[0.6rem] px-[0.6rem] max-h-[2rem] text-[1.2rem] flex items-center`}
						>
							{getMessage(item, index)}
						</span>
					) : (
						<span
							className={` text-[#828282]
							 bg-white rounded-[0.6rem] px-[0.6rem] max-h-[2rem] flex items-center text-[1.2rem]`}
						>
							{`D-${getDday(item)}`}
						</span>
					)}
				</Button>
			))}
		</ul>
	);
}

export default CertDateList;
