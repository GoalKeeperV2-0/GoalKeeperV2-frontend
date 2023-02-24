import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
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
	isJustRegister: boolean;
	todayString: string;
}
// TODO: 인증일에 인증 안올린 경우 처리
function CertDateList({ certifications, certDates, endDate, isJustRegister, todayString }: TempProps) {
	const getDateString = (certDate: string) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const [_, goalMonth, goalDate] = certDate.split('-');
		return `${+goalMonth}월 ${+goalDate}일`;
	};
	const hasCertifications = certifications.length > 0;
	const getDday = (certDate: string) => {
		return getDayDiff(todayString, certDate);
	};
	const getBgColor = (certDate: string, index: number) => {
		if (getDday(certDate) < 0) {
			if (!certifications[index] || certifications[index]?.state === 'FAIL') return 'bg-buttonRed-100';
			if (certifications[index]?.state === 'ONGOING') return 'bg-primaryOrange-100';
			if (certifications[index]?.state === 'SUCCESS') return 'bg-primaryOrange-200';
		}
		return todayString === certDate ? 'bg-primaryBlack-500' : 'bg-buttonGray-200';
	};
	const getTextColor1 = (certDate: string, index: number) => {
		if (getDday(certDate) < 0) {
			if (!certifications[index] || certifications[index]?.state === 'FAIL') return 'text-primaryRed-200';
			if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
			if (certifications[index]?.state === 'SUCCESS') return 'text-white';
		}
		return todayString === certDate ? 'text-white' : 'text-[#828282]';
	};
	const getTextColor2 = (certDate: string, index: number) => {
		if (getDday(certDate) < 0) {
			if (!certifications[index] || certifications[index]?.state === 'FAIL') return 'text-buttonRed-200';
			if (certifications[index]?.state === 'ONGOING') return 'text-primaryOrange-200';
			if (certifications[index]?.state === 'SUCCESS') return 'text-primaryOrange-200';
		}
		return 'text-white';
	};
	const getIsUploaded = (certDate: string) => {
		console.log(
			certifications.filter((item) => item.date === certDate),
			certDate
		);
		return certifications.filter((item) => item.date === certDate).length > 0;
	};
	return (
		<ul className="space-y-[0.8rem]">
			{(certDates ?? [endDate]).map((item, index) => (
				<Badge
					key={index}
					bgColor={getBgColor(item, index)}
					className={`text-[#828282] items-center  space-x-[1.6rem] `}
				>
					<span className={`${getTextColor1(item, index)}`}>{getDateString(item)}</span>
					{getDday(item) < 0 ? (
						<span
							className={` ${getTextColor2(
								item,
								index
							)} bg-white rounded-[0.6rem] px-[0.6rem] py-[0.3rem] text-[1.2rem]`}
						>
							{MappedCertState[certifications[index]?.state as CertStateType] ?? '실패'}
						</span>
					) : (
						<span
							className={`${
								todayString === item ? 'text-primaryBlack-500' : 'text-[#828282]'
							} bg-white rounded-[0.6rem] px-[0.6rem] py-[0.3rem] text-[1.2rem]`}
						>
							{+getDday(item) === 0 ? '인증' : `D-${getDday(item)}`}
						</span>
					)}
				</Badge>
			))}
		</ul>
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

	// TODO:recoil로 이 상태들을 관리할까?
	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
	};
	const isJustRegister = () => {
		if (isManyTimeGoal()) return goal.state === 'ONGOING' && getDayDiff(todayString, goal.certDates[0]) > 0;
		return goal.state === 'ONGOING' && getDayDiff(todayString, goal.endDate) > 0;
	};

	const dDayString = getDayDiff(todayString, goal.endDate);

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
					<CertDateList {...goal} isJustRegister={isJustRegister()} todayString={`${todayString}`} />
					<div className="flex flex-col space-y-[1.2rem]">
						<Label
							required
							htmlFor="certImage"
							content="인증 사진"
							className={`${isJustRegister() ? 'text-[#828282]' : ''}`}
						/>
						{goal.certifications.length ? (
							<div
								className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
								style={{ backgroundImage: `url(${goal.certifications[0].picture})` }}
							>
								<div className=" w-full   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[0.8rem] text-white pc:text-body1-pc text-start  space-x-[0.8rem]">
									{goal.certifications[0].state !== 'ONGOING' && (
										<img alt="" src={`/images/goalBox/icon/${goal.state}.svg`} className="mr-[0.8rem]" />
									)}
									{getBoxMessage()}
								</div>
							</div>
						) : (
							<label
								htmlFor="certImage"
								className="w-[46.4rem] h-[24.5rem] border-[0.1rem] border-[#E7E7E7] rounded-[0.8rem] grid place-content-center "
							>
								<div className="flex flex-col items-center space-y-[1rem]">
									<CameraIcon />
									<span className="text-primaryBlack-300 pc:text-body1-pc">
										{isJustRegister() ? `${dDayString}일 후 등록 할 수 있어요.` : '0/1'}
									</span>
								</div>
								<input id="certImage" disabled={isJustRegister()} type="file" accept="image/*" className=" hidden" />
							</label>
						)}
					</div>
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
