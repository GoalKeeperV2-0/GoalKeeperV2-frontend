import Button from 'app.components/App.base/Button';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { CertStateType, CertType, MappedCertState } from '../types';
interface Props {
	certDates?: string[];
	certifications: Partial<CertType>[] | null;
	endDate: string;
	todayString: string;
	onSelectCert?: (index: number) => void;
	clickDisabled?: boolean;
	isCertPost?: boolean;
	focusedCertDate: string;
}
// TODO: 인증일에 인증 안올린 경우 처리 -> UI 처리도 필요
function CertDateList({
	certifications,
	certDates,
	endDate,
	todayString,
	onSelectCert,
	clickDisabled = false,
	isCertPost = false,
	focusedCertDate,
}: Props) {
	const sortCerts = [...(certifications ?? [])].sort((a, b) => {
		const x = a.date ?? '';
		const y = b.date ?? '';
		if (x < y) return -1;
		if (x > y) return 1;
		return 0;
	});
	const isManyTimeGoal = Boolean(certDates?.length);
	const mapCertResult = () => {
		if (!isManyTimeGoal) {
			//일반 목표의 경우

			if (sortCerts?.length) {
				return [sortCerts[0].state];
			}
			if (getDayDiff(todayString, endDate) < 0 && !isCertPost) return ['FAIL']; // 목표를 안올린 경우
			return [null];
		}
		//지속 목표

		return certDates?.map((item) => {
			const filterCert = sortCerts?.filter((cert) => cert.date === item);
			if (filterCert?.length) {
				return filterCert[0].state;
			}
			if (getDayDiff(todayString, item) < 0) return 'FAIL';
			return null;
		});
	};
	console.log(mapCertResult());
	const getDateString = (certDate: string) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const [_, goalMonth, goalDate] = certDate.split('-');
		return `${+goalMonth}월 ${+goalDate}일`;
	};
	const getDday = (certDate: string) => {
		return getDayDiff(todayString, certDate);
	};
	const getBgColor = (certDate: string, index: number) => {
		if (getDday(certDate) > 0) return 'bg-buttonGray-200';
		if (mapCertResult()?.[index] === 'SUCCESS') return 'bg-primaryOrange-200';
		if (mapCertResult()?.[index] === 'FAIL') return 'bg-buttonRed-100';
		if (mapCertResult()?.[index] === 'ONGOING' || (isCertPost && mapCertResult()?.[index] === null))
			//인증 & goal 범용적으로 사용하기 위한 코드
			return 'bg-primaryOrange-100';
		// dday === 0
		return 'bg-primaryBlack-500';
	};

	const getTextColor1 = (certDate: string, index: number) => {
		if (getDday(certDate) > 0) return 'text-[#828282]';
		if (mapCertResult()?.[index] === 'SUCCESS') return 'text-white';
		if (mapCertResult()?.[index] === 'FAIL') return 'text-primaryRed-200';
		if (mapCertResult()?.[index] === 'ONGOING' || (isCertPost && mapCertResult()?.[index] === null))
			return 'text-primaryOrange-200';
		// dday === 0
		return 'text-white';
	};
	const getTextColor2 = (certDate: string, index: number) => {
		if (getDday(certDate) > 0) return 'text-[#828282]';
		if (mapCertResult()?.[index] === 'SUCCESS') return 'text-primaryOrange-200';
		if (mapCertResult()?.[index] === 'FAIL') return 'text-buttonRed-200';
		if (mapCertResult()?.[index] === 'ONGOING' || (isCertPost && mapCertResult()?.[index] === null))
			return 'text-primaryOrange-200';

		return 'text-primaryBlack-500';
	};
	const getMessage = (certDate: string, index: number) => {
		if (mapCertResult()?.[index] === null) {
			if (!isCertPost) return '인증';
			return '검증 중';
		}
		return MappedCertState[mapCertResult()?.[index] as CertStateType] ?? '실패';
	};

	return (
		<ul className="space-y-[0.8rem] h-full w-[18.5rem] overflow-y-auto certdates-scrollbar">
			{(certDates ?? [endDate]).map((item, index) => (
				<li key={index} className="flex items-center space-x-[0.8rem]">
					<Button
						onClick={() => {
							if (!onSelectCert) return;
							onSelectCert(index);
						}}
						disabled={clickDisabled}
						variant="solid"
						size="xs"
						ariaPressed={focusedCertDate === item}
						bgColor={getBgColor(item, index)}
						className="text-[#828282] flex items-center  space-x-[1.6rem] w-fit p-[0.8rem]"
					>
						<span className={`${getTextColor1(item, index)}`}>{getDateString(item)}</span>

						<span
							className={` ${getTextColor2(
								item,
								index
							)} bg-white rounded-[0.6rem] px-[0.6rem] max-h-[2rem] text-[1.2rem] flex items-center`}
						>
							{getDday(item) <= 0 ? getMessage(item, index) : `D-${getDday(item)}`}
						</span>
					</Button>
					{focusedCertDate === item && <span className=" text-[0.8rem]">◀</span>}
				</li>
			))}
		</ul>
	);
}

export default CertDateList;
