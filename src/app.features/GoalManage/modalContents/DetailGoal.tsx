import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React, { useState } from 'react';
import { MY_GOALS } from '../mockData';
import {
	CategoryType,
	CertStateType,
	CertType,
	GoalDataType,
	MappedCategory,
	MappedCertState,
	MappedReward,
	RewardType,
} from '../types';
import { getDdayMessage } from '../utils/getDdayMessage';

interface TempProps {
	certDates: string[];
	certifications: CertType[];
	endDate: string;
	todayString: string;
	selectCertHandler: (index: number) => void;
}
// TODO: 인증일에 인증 안올린 경우 처리 -> UI 처리도 필요
function CertDateList({ certifications, certDates, endDate, todayString, selectCertHandler }: TempProps) {
	const getDateString = (certDate: string) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const [_, goalMonth, goalDate] = certDate.split('-');
		return `${+goalMonth}월 ${+goalDate}일`;
	};
	const getDday = (certDate: string) => {
		return getDayDiff(todayString, certDate);
	};
	const getBgColor = (certDate: string, index: number) => {
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'bg-buttonRed-100';
		if (certifications[index]?.state === 'ONGOING') return 'bg-primaryOrange-100';
		if (certifications[index]?.state === 'SUCCESS') return 'bg-primaryOrange-200';

		if (dday === 0) return 'bg-primaryBlack-500';
		return 'bg-buttonGray-200';
	};
	const getTextColor1 = (certDate: string, index: number) => {
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'text-primaryRed-200';
		if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
		if (certifications[index]?.state === 'SUCCESS') return 'text-white';

		if (dday === 0) return 'text-white';
		return 'text-[#828282]';
	};
	const getTextColor2 = (certDate: string, index: number) => {
		const dday = getDday(certDate);

		if ((dday < 0 && !certifications[index]) || certifications[index]?.state === 'FAIL') return 'text-buttonRed-200';
		if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
		if (certifications[index]?.state === 'SUCCESS') return 'text-primaryOrange-200';

		if (dday === 0) return 'text-primaryBlack-500';
		return 'text-primaryOrange-200';
	};
	const getMessage = (certDate: string, index: number) => {
		const dday = getDday(certDate);
		if (dday === 0 && !certifications[index]) return '인증';
		return MappedCertState[certifications[index]?.state as CertStateType] ?? '실패';
	};
	return (
		<ul className="space-y-[0.8rem]">
			{(certDates ?? [endDate]).map((item, index) => (
				<Button
					key={index}
					onClick={() => selectCertHandler(index)}
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
interface ImageProps {
	todayString: string;
	certification: CertType | null;
	certDate: string;
}
function CertImage({ todayString, certification, certDate }: ImageProps) {
	const getDday = () => {
		return getDayDiff(todayString, certDate);
	};
	const getBoxMessage = () => {
		const res = '';
		/*if (!goal.certifications) return res;
		const { state } = goal.certifications[0];
		switch (state) {
			case 'SUCCESS':
				res = '인증을 성공했어요';
				break;
			case 'FAIL':
				if (goal.state === 'HOLD') res = '검토를 요청할 수 있어요';
				else res = '인증을 실패했어요';
				break;

			default:
				res = '';
				break;
		}
*/
		return res;
	};
	console.log(getDday());
	return (
		<>
			{/* TODO: cert 없는 경우 처리*/}

			<div className="flex flex-col space-y-[1.2rem]">
				<Label
					required
					htmlFor="certImage"
					content="인증 사진"
					className={`${getDday() < 0 ? 'text-[#828282]' : ''}`}
				/>
				{certification === null && getDday() >= 0 ? (
					<label
						htmlFor="certImage"
						className="w-[46.4rem] h-[24.5rem] border-[0.1rem] border-[#E7E7E7] rounded-[0.8rem] grid place-content-center "
					>
						<div className="flex flex-col items-center space-y-[1rem]">
							<CameraIcon />
							<span className="text-primaryBlack-300 pc:text-body1-pc">
								{getDday() > 0 ? `${getDday()}일 후 등록 할 수 있어요.` : '0/1'}
							</span>
						</div>
						<input id="certImage" disabled={getDday() !== 0} type="file" accept="image/*" className=" hidden" />
					</label>
				) : (
					<div
						className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
						style={{ backgroundImage: `url(${certification?.picture})` }}
					>
						<div className=" w-full   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[0.8rem] text-white pc:text-body1-pc text-start  space-x-[0.8rem]">
							{certification?.state !== 'ONGOING' && (
								<img alt="" src={`/images/goalBox/icon/${certification?.state}.svg`} className="mr-[0.8rem]" />
							)}
							{getBoxMessage()}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

interface Props {
	id: number;
}

function DetailGoal({ id }: Props) {
	console.log('detail-goal');
	const goal: GoalDataType = MY_GOALS.filter((item) => item.id === id)[0] as unknown as GoalDataType;
	const { year, month, date } = getKoreaToday();
	const todayString = formatDate(year, month, date);

	const [selectedCertIdx, setSelectedCertIdx] = useState<number>(0);
	// TODO:recoil로 이 상태들을 관리할까?
	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
	};
	const isJustRegister = () => {
		if (isManyTimeGoal()) return goal.state === 'ONGOING' && getDayDiff(todayString, goal.certDates[0]) > 0;
		return goal.state === 'ONGOING' && getDayDiff(todayString, goal.endDate) > 0;
	};

	const dDayString = getDayDiff(todayString, goal.endDate);

	const selectCertHandler = (index: number) => {
		setSelectedCertIdx(index);
	};
	const getCert = () => {
		const cert = goal.certifications.filter(
			(item) => item.date === (goal.certDates ?? [goal.endDate])[selectedCertIdx]
		);

		if (cert.length) {
			return cert[0];
		}

		return null;
	};

	return (
		<div className="space-y-[3.2rem]">
			<div className="flex justify-between">
				<span className="pc:text-body7-pc">{goal.title}</span>
				<div className="w-[46.4rem] h-[9.5rem] flex flex-col justify-between">
					<p className="whitespace-pre-wrap h-[4.4rem] w-full truncate pc:text-body4-pc">{goal.content}</p>

					<div className="flex justify-between items-center">
						<div className="flex space-x-[0.8rem]">
							<Badge bgColor="bg-buttonGray-200">{MappedCategory[goal.categoryType as CategoryType]}</Badge>
							<Badge bgColor="bg-buttonGray-200" className="pc:text-body2-pc flex items-center  space-x-[0.8rem] ">
								<div className="flex items-center space-x-[0.2rem]">
									<span>{goal.point}</span>

									<BlackBallIcon className="w-[1.8rem] h-[1.8rem] mt-[0.3rem]" />
								</div>
								<div className="w-[0.1rem] h-full bg-[#D3D3D3]" />
								<span>{MappedReward[goal?.reward as RewardType]}</span>
							</Badge>
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">
							🗓{' '}
							{getDdayMessage({
								state: goal.state,
								endDate: goal.endDate,
								isManyTimeGoal: isManyTimeGoal(),
								certDates: goal.certDates,
								todayString,
							})}
						</div>
					</div>
				</div>
			</div>

			<form className="space-y-[3.2rem]">
				<div className="flex justify-between items-start">
					<CertDateList {...goal} todayString={`${todayString}`} selectCertHandler={selectCertHandler} />
					<CertImage
						todayString={todayString}
						certification={getCert()}
						certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
					/>
				</div>
				<div className="flex flex-col space-y-[1.2rem]">
					<Label required htmlFor="certContent" content="인증 내용" className="text-[#828282]" />
					<textarea
						id="certContent"
						placeholder={isJustRegister() ? `${dDayString}일 후 인증 할 수 있어요.` : '인증내용을 작성해주세요.'}
						required
						disabled={isJustRegister()}
						name="content"
						onChange={() => null}
						className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem]"
					/>
				</div>
			</form>
			<Button variant="solid" size="lg" bgColor="bg-buttonGray-200">
				닫기
			</Button>
		</div>
	);
}

export default DetailGoal;
